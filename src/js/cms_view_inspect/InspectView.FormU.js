
InspectView.FormU = (function(){
	
	var updateCallback;
	function init(){
		updateCallback = InspectView.updateCallerView;
		InspectView.FormU_Img.init();
		InspectView.FormU_Preset.init()
		//フォームのイベントアサインは、CMS_FormUで行う
	}
	
	/* ---------- ---------- ---------- */
	
	function assignMainInput(_node,_param){
		_node.find("._in_data").keyup(function() {
			updateMainParam(_param,$(this).val());
		});
	}
	function updateMainParam(_param,_v){
		if(_param.data == _v)return;
		_param.data = _v;
		updateCallback();
	}
	//
	function assignExtraInput(_node,_param){
		_node.find("._in_data_extra").keyup(function(){
			updateExtra( _param,$(this).val() ,$(this).data("type"));
		});
	}
	function updateExtra(_param,val,_tar){
		if(_param["extra"] ==undefined) _param.extra = {}
		_param.extra[_tar] = val;
		updateCallback();
	}
	//
	function assignAttrInput(_node,_param){
		_node.find("._in_data_attr").keyup(function(){
			updateAttr( _param,$(this).val() ,$(this).data("type"));
		});
	}
	function updateAttr(_param,val,_tar){
		InspectView.setAtt(_tar,val);
	}
	
	/* ---------- ---------- ---------- */

	function getHeadlineTag(_param){
		function _core(_name,_type,_placeholder,_layout){
			var s = ""
				s += '	<tr>';
				s += '		<td>{NAME}</td>';
				s += '		<td>';
				s += '			<div class="_input-with-btns">'
				s += '			<input class="_in_data_H " data-type="{TYPE}" placeholder="{PH}" value="{DATA}">'
				s += '			<div class="_btns"><span class="_btn_input _edit_single" data-type="input:text">'+Dic.I.Edit+'</span></div>'
				s += '			</div>'
				s += '		</td>';
				s += '		<td style="text-align:right;"><div class="_cms_btn_alpha _btn_anchor" data-type="{TYPE}"></div></td>';
				s += '	</tr>';
				s = s.split("{NAME}").join(_name)
				s = s.split("{PH}").join(_placeholder)
				s = s.split("{TYPE}").join(_type)
			return s;
		}
		var tag = ""
			tag += '<div>'
			tag += '	<input class="_in_data_H_Type" style="display:none;" value="'+_param.data.heading+'">'
			tag += '	<div class="_selectArea"></div>';
			tag += '	<table class="_mainlayout">';
			tag += 			_core("","main","テキストを入力","main");
			tag += '	</table>';
			tag += '	<table class="_mainlayout more_detail">';
			tag += 			_core("","right","サブテキストを入力","");
			tag += '	</table>';
			tag += '</div>'

		var node = $(tag);
			node.find("._in_data_H").eq(0).val(_param.data["main"].text);
			node.find("._in_data_H").eq(1).val(_param.data["right"].text);
			_setAnchorEvents(node,_param);
			InspectView.FormU_Heading.setNode(node,_param.data.heading);

		node.find("._in_data_H")		.keyup(function(){ editTextHeader( $(this).val() ,$(this).data("type")); });
		node.find("._in_data_H_Type")	.keyup(function(){ editTextH_Type( $(this).val()); });

		function editTextHeader(val,_tar){
			var node = _param.data[_tar]
			if(node.text == val)return;
			node.text = val;
			updateCallback();
		}
		function editTextH_Type(val,_tar){
			var node = _param.data;
			if(node.heading == val)return;
			node.heading = val;
			updateCallback();
		}
		return node;
	}
	/* ---------- ---------- ---------- */

	function getCaptionTag(_param,_extra){
		var tag = ""
			tag += '<table class="_mainlayout" style="margin-bottom:10px;">';
			tag += '<tr><th>見出し</th><td>'
			tag += '	<div class="_input-with-btns">'
			tag += '	<input class="_in_data_extra" data-type="head" placeholder="キャプション" value="">'
			tag += '	<div class="_btns"><span class="_btn_input _edit_single" data-type="input:text">'+Dic.I.Edit+'</span></div>'
			tag += '	</div>'
			tag += '</td></tr>';
			tag += '</table>';
		var node = $(tag);
			node.find("._in_data_extra").val(defaultVal(_extra.head,""));
		assignExtraInput(node,_param);
		return node;
	}
	
	function getAnchor(_param){
		var tag = "";
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>ページ内<br>リンク用ID</th><td><input class="_in_data"></td></tr>';
			tag += '</table>';
		var node = $(tag);
			node.find("input").val(_param.data);
		assignMainInput(node,_param);
		return node;
	}
	
	function getTextarea(_param){
		var tag = ""
			tag += '<div class="_input-with-btns _input-textarea">'
			tag += '	<textarea class="_textarea-scroll _in_data" placeholder="テキストを入力"></textarea><br>'
			tag += '	<div class="_btns">'
			tag += '		<span class="_btn_input _edit" data-type="textarea:p">'+Dic.I.Edit+' 編集</span> '
			tag += '	</div>'
			tag += '</div>'
		var node = $(tag);
			node.find("textarea").val(_param.data);
		assignMainInput(node,_param);
		
		return node;
	}
	function getMarkdown(_param){
		var tag = "";
			tag += '<div class="_input-with-btns _input-textarea">'
			tag += '	<textarea class="_textarea-scroll _in_data" placeholder="テキストを入力"></textarea><br>'
			tag += '	<div class="_btns">'
			tag += '		<span class="_btn_input _edit" data-type="textarea:markdown">'+Dic.I.Edit+' 編集</span> '
			tag += '	</div>'
			tag += '</div>'
		var node = $(tag);
			node.find("textarea").val(_param.data);
		assignMainInput(node,_param);
		return node;
	}
	function getCode(_param){
		var tag = "";
			tag += '<div class="_input-with-btns _input-textarea">'
			tag += '	<textarea class="_textarea-scroll _in_data _color-html" placeholder="テキストを入力"></textarea><br>'
			tag += '	<div class="_btns">'
			tag += 			'<span class="_btn_input _edit" data-type="textarea:code">'+Dic.I.Edit+' 編集</span> '
			tag += '	</div>'
			tag += '</div>'
		var node = $(tag);
		if(_param) node.find("textarea").val(_param.data);
		assignMainInput(node,_param);
		return node;
	}
	function getHtml(_param,_preview,_callback){
		var tag = "";
			tag += '<div>'
			tag += '	<div class="_input-with-btns _input-textarea">'
			tag += '		<textarea class="_textarea-scroll _in_data _color-html" placeholder="テキストを入力"></textarea><br>'
			tag += '		<div class="_btns">'
			tag += 				'<span class="_btn_input _edit" data-type="textarea:html">'+Dic.I.Edit+' 編集</span> '
			tag += '		</div>'
			tag += '	</div>'
			tag += '	<div class="_in_preview_on" style="margin:5px 0;"><i class="fa fa-lg fa-square-o "></i> プレビューする (JSも実行されます)</div>'
			tag += '	<div class="_in_preview_off" style="margin:5px 0;"><i class="fa fa-lg fa-check-square "></i> プレビューする (JSも実行されます)</div>'
			tag += '</div>'
		var node = $(tag);
		if(_param) node.find("textarea").val(_param.data);
		assignMainInput(node,_param);
		
		function _toggle(_v){
			node.find("._in_preview_on").hide();
			node.find("._in_preview_off").hide();
			if(_v == ""){
				node.find("._in_preview_on").show();
			} else{
				node.find("._in_preview_off").show();
			}
			InspectView.setAttr_preview(_v);
		}
		node.find("._in_preview_on").click(function(){ _toggle("1")})
		node.find("._in_preview_off").click(function(){ _toggle("")})
		_toggle(_preview);
		return node;
	}
	function getJS(_param,_preview,_callback){
		var tag = "";
			tag += '<div>'
			tag += '	<div class="_input-with-btns _input-textarea">'
			tag += '		<textarea class="_textarea-scroll _in_data _color-html" placeholder="JavaScriptを入力"></textarea><br>'
			tag += '		<div class="_btns">'
			tag += 				'<span class="_btn_input _edit" data-type="textarea:js">'+Dic.I.Edit+' 編集</span> '
			tag += '		</div>'
			tag += '	</div>'
			tag += '</div>'
		var node = $(tag);
		if(_param) node.find("textarea").val(_param.data);
		assignMainInput(node,_param);
		return node;
	}
	function getMargin(_param){
		var tag = "";
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>高さマージン</th><td><input class="_in_data"></td></tr>';
			tag += '<tr><td colspan="2">'
			tag += 'マイナスマージンも設定できます。<br>例：-100px';
			tag += '</td></tr>';
			tag += '</table>';
		var node = $(tag);
			node.find("input").val(_param.data);
		assignMainInput(node,_param);
		return node;
	}
	function getNote(_param){
		var tag = "";
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>ノート</th><td>'
			tag += '	<div class="_input-with-btns _input-textarea">'
			tag += '		<textarea class="_textarea-scroll _in_data" placeholder="テキストを入力"></textarea><br>'
			tag += '		<div class="_btns">'
			tag += '		<span class="_btn_input _edit" data-type="textarea:multi">'+Dic.I.Edit+' 編集</span> '
			tag += '		</div>'
			tag += '	</div>'
			tag += '</td></tr>';
			tag += '</table>';
		var node = $(tag);
			node.find("textarea").val(_param.data);
		assignMainInput(node,_param);
		return node;
	}
	function getPlace(_param,_extra){
		var tag = "";
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>ノート</th><td>'
			tag += '	<div class="_input-with-btns _input-textarea">'
			tag += '		<textarea class="_textarea-scroll _in_data" placeholder="テキストを入力"></textarea><br>'
			tag += '		<div class="_btns">'
			tag += '		<span class="_btn_input _edit" data-type="textarea:multi">'+Dic.I.Edit+' 編集</span> '
			tag += '		</div>'
			tag += '	</div>'
			tag += '</td></tr>';
			tag += '<tr><th>サイズ</th><td>';
			tag += '幅: <input class="_in_data_extra _w50" data-type="width"><br>';
			tag += '高: <input class="_in_data_extra _w50" data-type="height">';
			tag += '</td></tr>';
			tag += '</table>';
		var node = $(tag);
			node.find("textarea").val(_param.data);
			node.find("._in_data_extra").eq(0).val(defaultVal(_extra.width,""));
			node.find("._in_data_extra").eq(1).val(defaultVal(_extra.height,""));
		assignMainInput(node,_param);
		assignExtraInput(node,_param);

		return node;
	}

	function getBtn(_param){
		var tag = "";
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>リンク</th><td><div class="_btn_TextAnchor _cms_btn_alpha"></div></td></tr>';
			tag += '</table>';
		var node = $(tag);
	
		new InspectView.TextAnchorClass(
			node.find('._btn_TextAnchor'),
			defaultVal(_param.data,""),
			function (_val){
				_param.data = _val;
				updateCallback();
			}
		);
		
		return node;
	}
	
	function _setAnchorEvents(_node,_param){
		//リンク設定
		var btns = _node.find('._btn_anchor');
		btns.each(function (index, dom) {
			var tar = $(this);
			var type = tar.data("type");
			var _link = (type == "") ? _param.data : _param.data[type];
			new InspectView.AnchorClass(
				tar,
				defaultVal(_link.link,{}),
				function (_val){
					_link.link = _val;
					updateCallback();
				}
			);
		});
	}
	/* ---------- ---------- ---------- */
	
	
	function getDetail(_blockType,_currentDiv){
		var tag = "";
			tag += '<div>'
			tag += '<span class="_cms_btn _cms_btn_edit" '+TIP_ENTER+'>'
			tag += Dic.I.Grid+' データの編集</span>';
			tag += '</div>'
		var node = $(tag);
			node.find("._cms_btn_edit").click(function(){
				var id = _blockType.split(".")[1];
				var d = PageElement.object[id];
				if(d) _currentDiv.showInlineGridEditor(InspectView.getCurrentNo() ,d);
			});
		return node;
	}
	function getReload(_blockType,_currentDiv){
		var tag = "";
			tag += '<div>'
			tag += '<span class="_cms_btn _cms_btn_reload">'
			tag += '<i class="fa fa-refresh "></i> プレビュー更新</span>';
			tag += '</div>'
		var node = $(tag);
			node.find("._cms_btn_reload").click(function(){
				// updateCallback();
				InspectView.refreshBlock();
			});
		return node;
	}
	function getTree(_param){
		var tag = "";
			tag += '<div>'
			tag += '<span class="_cms_btn _cms_btn_edit" '+TIP_ENTER+'>'
			tag += Dic.I.Grid+' データの編集</span>';
			tag += '</div>'
		var node = $(tag);
			node.find("._cms_btn_edit").click(function(){
				var val = _param.data;
				var htmlAbs = CMS_Path.PAGE.ABS;
				var tree = CMS_Data.Sitemap.getData();
				TreeViewMakerView.stageIn(htmlAbs,tree,val,function(_s){
					_param.data = _s;
					setTimeout(function(){
						updateCallback();
					}, 200);
				});
			});
		return node;
	}
	
	/* ---------- ---------- ---------- */

	//画像リスト
	// function getImageMap(_param){
		
	// 	var tag = "";
	// 		tag += '<div>'
	// 		tag += '<span class="_cms_btn _cms_btn_edit" '+TIP_ENTER+'>'
	// 		tag += Dic.I.Grid+' データの編集</span>';
	// 		tag += '</div>'
	// 	var node = $(tag);
	// 		node.find("._cms_btn_edit").click(function(){
	// 			ImageMapView.stageIn(_param.data,function(_s){
	// 				_param.data = _s;
	// 				setTimeout(function(){
	// 					updateCallback();
	// 				}, 200);
	// 			});
	// 		});
			
	// 	return node;
	// }
	
	function getLayoutCol(){
		return $('<div class="ss_guide _inspect"></div>');
	}
	function getReplaceDiv(_param){
		var tag = "";
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>Myタグ<br>ID</th><td><input class="_in_data_attr" data-type="replaceID"></td></tr>';
			tag += '<tr><th>説明</th><td><input class="_in_data_attr" data-type="replaceTitle"></td></tr>';
			tag += '</table>';
		if(_param.attr["replaceID"] ==undefined)_param.attr.replaceID = "";
		if(_param.attr["replaceTitle"] ==undefined)_param.attr.replaceTitle = "";
		var node = $(tag);
			node.find("._in_data_attr").eq(0).val(_param.attr.replaceID);
			node.find("._in_data_attr").eq(1).val(_param.attr.replaceTitle);
		assignAttrInput(node,_param);
		
		return node;
	}
	function getGuide(_type){
		var s = '<div style="height:5px;"></div>'
			s += CMS_GuideU.getGuideTag("block/"+_type,PageElement_Util.getTypeName(_type) + "について","dark");
		return $(s);
	}
	function getDesginGuide(){
		var s = '<div style="height:5px;"></div>'
			s += CMS_GuideU.getGuideTag("inspect/design","デザインタブについて","dark");
		return $(s);
	}
	/* ---------- ---------- ---------- */

	function getDesignTag(_val,_blockType,_extra){
		var tag = ""
			tag += '<div class="_body_css_class">';
			tag += 'class="値"<br>';
			tag += '<div class="_input-with-btns" style="margin:2px 0;">'
			tag += '	<input class="_design _color-style _bold" placeholder="クラス名を入力 (例：designA)">';
			tag += '	<div class="_btns">'
			tag += '		<span class="_btn_input _edit_single" data-type="input:class">'+Dic.I.Edit+'</span> '
			tag += '	</div>'
			tag += '</div>'
			tag += '</div>';
		var node = $(tag);
			node.find("input").val(_val)
			node.find("input").keyup(function(){
				InspectView.setAttr_css($(this).val());
			});
		InspectView.FormU_Preset.setNode( node,_blockType,_extra );
		return node;
	}
	function getStyleTag(_val){
		var tag = ""
			tag += '<div class="_body_css_style">';
			tag += 'style="値"<br>';
			tag += '<div class="_input-with-btns _input-textarea" style="margin:2px 0;">'
			tag += '	<textarea class="_style _color-style" placeholder="CSSを入力 (例：font-size:12px)"></textarea><br>'
			tag += '	<div class="_btns">'
			tag += '		<span class="_btn_input _edit" data-type="textarea:style">'+Dic.I.Edit+'</span> '
			tag += '	</div>'
			tag += '</div>'
			tag += '</div>'
		var node = $(tag);
		node.find("textarea").val(_val)
		node.find("textarea").keyup(function(){
			InspectView.setAttr_style($(this).val());
		});
		return node;
	}

	return {
		init	: init,
		
		getHeadlineTag		: getHeadlineTag,
		getCaptionTag		: getCaptionTag,
		getAnchor		: getAnchor,
		getTextarea		: getTextarea,
		getMarkdown		: getMarkdown,
		getCode			: getCode,
		getHtml			: getHtml,
		getJS			: getJS,
		getMargin		: getMargin,
		getNote			: getNote,
		getPlace		: getPlace,
		getBtn			: getBtn,
		
		getDetail		: getDetail,
		getReload		: getReload,
		getTree			: getTree,
		// getImageMap		: getImageMap,
		getLayoutCol	: getLayoutCol,
		getReplaceDiv	: getReplaceDiv,
		
		getGuide		: getGuide,
		getDesginGuide	: getDesginGuide,
		
		getDesignTag	: getDesignTag,
		getStyleTag		: getStyleTag
	}
})();
	
	