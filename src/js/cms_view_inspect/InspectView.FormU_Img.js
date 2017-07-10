
InspectView.FormU_Img = (function(){
	
	var updateCallback;
	function init(_updateCallback){
		updateCallback = InspectView.updateCallerView;
	}
	
	/* ---------- ---------- ---------- */

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
	
	/* ---------- ---------- ---------- */

	//画像ブロック
	function getIMG(_param,_extra){
		var tag = "";
			tag += '<div class="_mode_switch">';
			//
			tag += '	<div class="_cms_btn_alpha _btn_mode _btn_mode_simple">'
			tag += '		<i class="fa fa-lg fa-circle-o"></i><i class="fa fa-lg fa-dot-circle-o "></i>';
			tag += '		シンプルモード';
			tag += '		<span class="ss_inspect3 _img_simple"></span>'
			tag += '	</div>';
			tag += '	<div class="_mode_switch_body _body_img_simple">';
			tag += '		<table class="_mainlayout">';
			tag += '		<tr><td>';
			tag += '			<span class="_in_data_img_t">' + _param.data.img + '</span>'
			tag += '			<table style="width:auto">';
			tag += '			<tr><td>';
			tag += '			<div class="_cms_btn_alphaS _in_data_img _cms_bg_trans">'
			
			tag += CMS_ImgBlockU.getImageTag({
				path	: _param.data.img,
				isPub	: false,
				width	: "100%",
				ratio	: "",
				alt		: "",
				attr	: ""
			});
			tag += '			</div>'
			tag += '			</td><td>';
			tag += '				<span class="_cms_btn_alpha _in_data_img_list ss_img_select img_select_img"></span>'
			tag += '				<span class="_cms_btn_alpha _in_data_img_mock ss_img_select img_select_dummy"></span>'
			tag += '			</td></tr></table>';
			tag += '			<div class="_cms_btn_alpha _btn_image_tag_ng "><i class="fa fa-check-square "></i> IMGタグのみ出力</div>'
			tag += '			<div class="_cms_btn_alpha _btn_image_tag_ac "><i class="fa fa-square-o "></i>  IMGタグのみ出力</div>'
			tag += '		</td></tr>';
			tag += '		</table>';
			// tag += '		<div class="_wide_preset">';
			// tag += '			<span class="_btn_w">100%</span> <span class="_btn_w">400px</span><br>';
			// tag += '			<span class="_btn_w"> 50%</span> <span class="_btn_w">200px</span><br>';
			// tag += '			<span class="_btn_w"> 25%</span> <span class="_btn_w">100px</span><br>';
			// tag += '		</div>';
			tag += '	</div>'
			//
			tag += '	<div class="_mode_switch_body_hr"></div>';
			//
			tag += '	<div class="_cms_btn_alpha _btn_mode _btn_mode_layout">'
			tag += '		<i class="fa fa-lg fa-circle-o"></i><i class="fa fa-lg fa-dot-circle-o "></i>';
			tag += '		レイアウトモード';
			tag += '		<span class="ss_inspect3 _img_layout"></span>'
			tag += '	</div>';
			tag += '	<div class="_mode_switch_body _body_img_layout">';
			tag += '		<div>'
			tag += '			<span class="_cms_btn _cms_btn_edit" '+TIP_ENTER+'>'
			tag += '			<i class="fa fa-object-ungroup "></i> レイアウト編集</span>';
			tag += '		</div>'
			tag += '	</div>'
			//
			tag += '	<div class="_mode_switch_body_hr"></div>';
			tag += '	<table class="_mainlayout">';
			tag += '		<tr>';
			tag += '			<td>　幅：<span><input class="_in_data_extra _in_data_w _sub _w50" data-type="width" placeholder="100px" data-candidate="_cms_image_width"></span></td>';
			tag += '			<td>ALT：<span><input class="_in_data_extra _in_data_alt _sub _w50" data-type="alt" placeholder="代替テキストを入力"></span></td>';
			tag += '		</tr>';
			tag += '		<tr>';
			tag += '			<td>比率：<span><input class="_in_data_extra _in_data_h _sub _w50" data-type="height" placeholder="3:2" data-candidate="_cms_image_ratio"></span></td>';
			tag += '			<td>注釈：<span><input class="_in_data_extra _in_data_cap _sub _w50" data-type="caption" placeholder="キャプションを入力"></span></td>';
			tag += '		</tr>';
			tag += '	</table>';
			tag += '	<table class="_mainlayout">';
			tag += '		<tr>';
			tag += '			<td>';
			tag += '			<div class="_cms_btn_alpha _btn_image_check_ng " style="margin-bottom:5px"><i class="fa fa-check-square "></i> クリックで拡大</div>'
			tag += '			<div class="_cms_btn_alpha _btn_image_check_ac " style="margin-bottom:5px"><i class="fa fa-square-o "></i>  クリックで拡大</div>'
			tag += '			</td>';
			tag += '			<td><div class="_cms_btn_alpha _btn_anchor" data-type=""></div></td>';
			tag += '		</tr>';
			tag += '	</table>';
			tag += '</div>'
		var node = $(tag);
		assignEvent_simple(node,_param,_extra);
		assignEvent_layout(node,_param,_extra);
		assignExtraInput(node,_param);
		
		return node;
	}
	//シングルイメージ
	function assignEvent_simple(node,_param,_extra){
		 
		node.find("._body_img_simple ._in_data_img")			.click(function(){ clickImageThumb(); });
		node.find("._body_img_simple ._in_data_img_t")			.click(function(){ editImagePath($(this).html()); });
		node.find("._body_img_simple ._in_data_img_list")		.click(function(){ showImageList(); });
		node.find("._body_img_simple ._in_data_img_mock")		.click(function(){ showImageMock(); });
		// node.find("._body_img_simple ._wide_preset ._btn_w")	.click(function(){ setImageWide($(this).html()) });
		
		/* ---------- ---------- ---------- */
		//タグのみ出力
		var tag_ng = node.find('._btn_image_tag_ng');
		var tag_ac = node.find('._btn_image_tag_ac');
		function _updateOnlyBtn(_update){
			if(_param.data.onlyImgTag){
				tag_ng.show(); tag_ac.hide();
			} else{
				tag_ng.hide(); tag_ac.show();
			}
			if(_update) updateCallback();
		}
		tag_ng.click(function(){ _param.data.onlyImgTag = false;_updateOnlyBtn(true); });
		tag_ac.click(function(){ _param.data.onlyImgTag = true;_updateOnlyBtn(true) });
		_updateOnlyBtn();
		//

		/* ---------- ---------- ---------- */
		
		node.find("._in_data_alt")	.val(defaultVal(_extra["alt"],""));
		node.find("._in_data_cap")	.val(defaultVal(_extra["caption"],""));
		node.find("._in_data_w")	.val(defaultVal(_extra["width"],""));
		node.find("._in_data_h")	.val(defaultVal(_extra["height"],""));
		
		function updateImageView(_s){
			_param.data.img = _s;
			setTimeout(function(){
				setImage(_s);
				updateCallback();
			}, 200);
		}
		function setImage(_s){
			node.find("._body_img_simple ._in_data_img").html(CMS_Path.MEDIA.getPreviewImageTag(_s));
			node.find("._body_img_simple ._in_data_img_t").html(_s);
		}
		function clickImageThumb(){
			showImageList();
		}
		function showImageList(){
			var s = _param.data.img;
			if(DummyImageService.isMock(_param.data.img) ) s = CMS_Path.UPLOAD.ABS;
			//パスを相対パスに変換して、コールする
			CMS_MainController.openAssetSelectRel("image", s ,function(_s){
				updateImageView(_s);
			});
		}
		function showImageMock(){
			var s = _param.data.img;
			if(DummyImageService.isMock(_param.data.img) == false) s = "";
			DummyImageView.stageIn(s,function(_s){ updateImageView(_s); });
		}
		function editImagePath(_val){
			var _s = prompt("画像URLを入力してください", _val);
	 		if(_s != null){ if(_val != _s){ updateImageView(_s); }}
		}
		
		
		/* ---------- ---------- ---------- */
		//リンクボタン
		var zoom_ng = node.find('._btn_image_check_ng');
		var zoom_ac = node.find('._btn_image_check_ac');
		var libtn = node.find('._btn_anchor');
		function _updateBtn(_update){
			if(_param.data.isZoom){
				zoom_ng.show(); zoom_ac.hide(); libtn.hide();
			} else{
				zoom_ng.hide(); zoom_ac.show(); libtn.show();
			}
			if(_update) updateCallback();
		}
		zoom_ng.click(function(){ _param.data.isZoom = false;_updateBtn(true); });
		zoom_ac.click(function(){ _param.data.isZoom = true;_updateBtn(true) });
		
		new InspectView.AnchorClass(
			node.find('._btn_anchor'),
			defaultVal(_param.data.link,{}),
			function (_val){
				_param.data.link = _val;
				updateCallback();
			}
		);
		_updateBtn();
	}
	
	//レイアウトモード
	function assignEvent_layout(node,_param,_extra){
		
		node.find("._cms_btn_edit").click(function(){
			if(_param.data["layout"] == undefined) _param.data.layout = {}
			ImageMapView.stageIn(_param.data.layout,function(_s){
				_param.data.layout = _s;
				_param.data.isLayoutMode = true;
				setTimeout(function(){
					updateCallback();
				}, 200);
			});
		});
		//モード切り替え
		var btn_off = node.find('._btn_mode_simple');
		var btn_on = node.find('._btn_mode_layout');
		var body_01 = node.find('._body_img_simple');
		var body_02 = node.find('._body_img_layout');
		
		function _updateBtn(_update){
			if(_param.data.isLayoutMode){
				btn_off.removeClass("_current");
				btn_on.addClass("_current");
				if(_update) {
					body_01.slideUp();body_02.slideDown();
				} else{
					body_01.hide();body_02.show();
				}
			} else{
				btn_off.addClass("_current");
				btn_on.removeClass("_current");
				if(_update) {
					body_01.slideDown();body_02.slideUp();
				} else{
					body_01.show();body_02.hide();
				}
			}
			if(_update) {
				updateCallback();
			}
		}
		btn_off.click(function(){ _param.data.isLayoutMode = false;_updateBtn(true); });
		btn_on.click(function(){ _param.data.isLayoutMode = true;_updateBtn(true) });
		
		_updateBtn();
		
		return node;
	}

	/* ---------- ---------- ---------- */

	//コンテナブロック用背景画像設定
	function getBGIMG(_param,_extra){
		if(!_param.extra) _param.extra = {}
		if(!_param.extra.bg) _param.extra.bg = {};
		if(!_param.extra.bg.img) _param.extra.bg.img = "";
		if(!_param.extra.bg.color) _param.extra.bg.color = "";
		if(!_param.extra.bg.use) _param.extra.bg.use = false;
		var param = _param.extra.bg;
		
		var tag = ""
			tag += '<div style="margin:20px 0;">';
			tag += '	<div>';
			tag += '		<div class="_cms_btn_alpha _btn_image_on " style="margin-bottom:5px"><i class="fa fa-check-square "></i> 背景画像を設定する</div>'
			tag += '		<div class="_cms_btn_alpha _btn_image_off " style="margin-bottom:5px"><i class="fa fa-square-o "></i>  背景画像を設定する</div>'
			tag += '	</div>';
			tag += '	<div class="_setting_bg" style="margin:0 0 0 10px;">';
			tag += '		<table class="_mainlayout ">';
			tag += '		<tr><td>';
			tag += '			<span class="_in_data_img_t">' + param.img + '</span>'
			tag += '			<table style="width:auto">';
			tag += '			<tr><td>';
			tag += '			<div class="_cms_btn_alphaS _in_data_img">'
			if(param.img){
				tag += CMS_ImgBlockU.getImageTag({
					path	: param.img,
					isPub	: false,
					width	: "100%",
					ratio	: "",
					alt		: "",
					attr	: ""
				});
			}
			tag += '			</div>'
			tag += '			</td><td>';
			tag += '				<span class="_cms_btn_alpha _in_data_img_list ss_img_select img_select_img"></span>'
			// tag += '				<span class="_cms_btn_alpha _in_data_img_mock ss_img_select img_select_dummy"></span>'
			tag += '			</td></tr></table>';
			tag += '		</td></tr>';
			tag += '		</table>';
			tag += '	<p>※ デザインタブのstyle設定で直接CSSで指定するのと同じです。</p>';
			tag += '	</div>';
			tag += '</div>';
		var node = $(tag);
		
		node.find("._in_data_img")			.click(function(){ clickImageThumb(); });
		node.find("._in_data_img_t")			.click(function(){ editImagePath($(this).html()); });
		node.find("._in_data_img_list")		.click(function(){ showImageList(); });
		// node.find("._in_data_img_mock")		.click(function(){ showImageMock(); });

		function updateImageView(_s){
			param.img = _s;
			setTimeout(function(){
				setImage(_s);
				updateCallback();
			}, 200);
		}
		function setImage(_s){
			if(_s){
				node.find("._in_data_img").html(CMS_Path.MEDIA.getPreviewImageTag(_s));
				node.find("._in_data_img_t").html(_s);
			} else{
				node.find("._in_data_img").html("--");
				node.find("._in_data_img_t").html("--");
			}
		}
		function clickImageThumb(){
			showImageList();
		}
		function showImageList(){
			var s = param.img;
			if(DummyImageService.isMock(param.img) ) s = CMS_Path.UPLOAD.ABS;
			//パスを相対パスに変換して、コールする
			CMS_MainController.openAssetSelectRel("image", s ,function(_s){
				updateImageView(_s);
			});
		}
		// function showImageMock(){
		// 	var s = param.img;
		// 	if(DummyImageService.isMock(_param.data.img) == false) s = "";
		// 	DummyImageView.stageIn(s,function(_s){ updateImageView(_s); });
		// }
		function editImagePath(_val){
			var _s = prompt("画像URLを入力してください", _val);
	 		if(_s != null){ if(_val != _s){ updateImageView(_s); }}
		}
		
		var on_ = node.find('._btn_image_on');
		var off_ = node.find('._btn_image_off');
		var bgs = node.find("._setting_bg");
		
		function _updateBtn(_update){
			if(_param.extra.bg.use){
				on_.show(); off_.hide();bgs.show();
			} else{
				on_.hide(); off_.show();bgs.hide();
			}
			if(_update) updateCallback();
		}
		on_.click(function(){ _param.extra.bg.use = false;_updateBtn(true); });
		off_.click(function(){ _param.extra.bg.use = true;_updateBtn(true) });
		_updateBtn();
		
		return node;
	}

	/* ---------- ---------- ---------- */

	//画像リスト
	function getImages(_param,_extra){
		var tag = "";
			tag += '<div>';
			tag += '	<table class="_mainlayout">';
			tag += '		<tr><td>　幅：<input class="_in_data_extra _in_data_w _sub _w60" data-type="width" placeholder="100px" data-candidate="_cms_image_width"></td></tr>';
			// tag += '		<tr><td>比率：<input class="_in_data_extra _in_data_h _sub _w60" data-type="height" placeholder="3:2" data-candidate="_cms_image_ratio"></td></tr>';
			tag += '	</table>';
			tag += '	<table class="_mainlayout">';
			tag += '		<tr><td>マージン<br>(上右下左)</td><td><input class="_in_data_extra _in_data_mg _sub _w100" data-type="margin" placeholder="0 10px 10px 0" data-candidate="_cms_images_margin"></td></tr>';
			tag += '	</table>';
			tag += '	<div class="_row">';
			tag += '		<div class="_in_check_extra">';
			tag += '			<div class="_off"><i class="fa fa-lg fa-check-square "></i> 横に並べる</div>';
			tag += '			<div class="_on" style="display:none;"><i class="fa fa-lg fa-square-o "></i> 横に並べる</div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '</div>';
			
		var node = $(tag);
			node.find("._in_data_w").val(defaultVal(_extra["width"],""));
			// node.find("._in_data_h").val(defaultVal(_extra["height"],""));
			node.find("._in_data_mg").val(defaultVal(_extra["margin"],""));
		//
		function toggle(_s,_update){
			if(_s == "1"){
				_on.hide();
				_off.show();
				if(_update)updateExtra(_param,"1","float");
			} else{
				_on.show();
				_off.hide();
				if(_update)updateExtra(_param,"","float");
			}
			updateCallback();
		}
		var _off = node.find("._in_check_extra ._off");
		var _on = node.find("._in_check_extra ._on");
			_off.click(function(){ toggle("",true) });
			_on.click(function(){ toggle("1",true) });
		toggle(defaultVal(_extra["float"],""),false);
		
		assignExtraInput(node,_param);
		
		return node;
	}

	return { 
		init:init,
		getIMG			: getIMG,
		getBGIMG		: getBGIMG,
		getImages		: getImages
	}
})();
