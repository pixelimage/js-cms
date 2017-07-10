/**
 * リピートオブジェクトビューの管理
*/

EditableView.CustomList 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_gridType) {
	  this.init(_gridType);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init			 = function (_gridType) {
		this.gridType = _gridType;
		this.v = {}
		this.setParam()
		this.customList = new EditableView.CustomListClass()
	}
	p.setParam 		 = function (){
		this.gridInfo	 = this.gridType.gridInfo;
	}
	p.registParent 	 = function (_parent){
		this.parent = _parent;
		this.customList.registParent(_parent);
		
	}
	p.initData 		 = function (_data){
		this.customList.initData([_data[0],_data[1],_data[2],_data[3]]);
	}
	p.getData 		 = function (){
		return this.customList.getData();
	}
	p.updateSubData = function (){}
	return c;
})();

EditableView.CustomListClass 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init= function () {
		this.v = {}
	}
	p.registParent 	 = function (_parent){
		this.parent = _parent;
	}
	p.initData 		 = function (_data){
		
		if(_data == null) _data = ["","",null];
		var this_ = this;
		var tag = '';
			tag += '<div class="_editableBlock _editableTemplate">';
			tag += '	<div class="_left">';
			tag += '		<div class="_h2" style="margin-top:0px;">テンプレート</div>';
			tag += '		<table>';
			tag += '			<tr>';
			tag += '				<td><div class="_title">CSS用ID名 {ID}</div></td>';
			tag += '				<td><input class="_id _color-style" style="width:150px;margin:0 0 5px 5px;" value=""></td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '		<div class="_tabBlock">';
			tag += '			<span class="_btn_html ">HTML or JS</span>';
			tag += '			<span class="_btn_css ">CSS</span>';
			tag += '		</div>';
			tag += '		<div class="_htmlArea"></div>';
			tag += '		<div class="_cssArea"></div>';
			tag += '	</div>';
			tag += '	<div class="_main">'
			tag += '		<div class="_core">'
			tag += '			<div class="_h2" style="margin-top:0px;">プレビュー<span style="font-weight:normal;"> (リストデータ×テンプレート)</span></div>';
			tag += '			<div class="_cms_btn-mini _btn_relaod"><i class="fa fa-repeat"></i> リストデータを反映</div>';
			tag += '			<div class="_tabBlock">';
			tag += '				<span class="_btn_preview">表示プレビュー</span>';
			tag += '				<span class="_btn_code">HTMLプレビュー</span>';
			tag += '			</div>';
			tag += '			<div class="_previewAreaWapper">'
			tag += '			<iframe class="_previewArea" src ="blank.html" frameborder="0" ></iframe>'
			tag += '			<div class="_codeArea"><textarea readonly></textarea></div>'
			tag += '			</div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '	<div class="_preset" style="position:relative">'
			tag += '	</div>';
			tag += '</div>';
			
		this.view = $(tag);
		this.parent.v.replaceArea.append(this.view);
		this.v.preview = this.view.find('._previewArea');
		this.v.code = this.view.find('._codeArea textarea');
		
		//
		this.v._htmlArea = this.view.find('._htmlArea');
		this.v._cssArea = this.view.find('._cssArea');
		//
		this.v._htmlArea.append(CMS_FormU.getTextarea("","html"))
		this.v._htmlArea.append('<div class="_cms_btn-mini _btn_js">JSでの実装サンプル</div>')
		this.v._cssArea.append(CMS_FormU.getTextarea("","style"))
		//
		this.v.in_html = this.v._htmlArea.find("textarea");
		this.v.in_css = this.v._cssArea.find("textarea");
	
		this.v.in_html.css({width:"350px",height:"280px"}).prop("wrap","off");
		this.v.in_css.css({width:"350px",height:"280px"}).prop("wrap","off");
		
		this.v._btn_html = this.view.find('._btn_html');
		this.v._btn_html.click(function(){  this_.openHTML(true)});
		this.v._btn_css = this.view.find('._btn_css');
		this.v._btn_css.click(function(){  this_.openHTML(false)});
		this.v._btn_js = this.view.find('._btn_js');
		this.v._btn_js.click(function(){  this_.addJS()});
		this.openHTML(true);
		
		//
		this.v._previewArea = this.v.preview
		this.v._codeArea = this.view.find('._codeArea');
		
		this.v.btn_preview = this.view.find('._btn_preview');
		this.v.btn_preview.click(function(){  this_.openPreview(true)});
		this.v._btn_code = this.view.find('._btn_code');
		this.v._btn_code.click(function(){  this_.openPreview(false)});
		this.openPreview(true);
		//
		this.v._btn_relaod = this.view.find('._btn_relaod');
		this.v._btn_relaod.click(function(){ this_.updatePreview()});
		
		this.v.temps = [
			this.view.find("._id"),
			this.v.in_html,
			this.v.in_css
		]
		this.v.temps[0].val(_data[0])
		this.v.temps[1].val(_data[1])
		this.v.temps[2].val(_data[2])
		
		this.view.find("textarea,input").keyup(function(){ 
			this_.updatePreview();
		});
		
		this.updatePreview();
		
		var presetView = new EditableView.CustomListPreset(this.view.find('._preset'));
			presetView.setData(_data[3]);
			presetView.stageIn(function(o,_param){
				this_.setPreset(o);
				this_.setSetting(_param);
			})
		this.templateSetting = _data[3];
		this.updateiFrameW();
	}
	
	p.setPreset = function (_o){
		this.v.temps[1].val(_o.html);
		this.v.temps[2].val(_o.css);
		this.updatePreview();
	}
	p.updateiFrameW = function (){
		var p = this.templateSetting;
		if(p.ww == 0){
			this.v.preview.css("width" ,this.templateSetting.t_ww )
		} else{
			this.v.preview.css("width" ,"100%" )
		}
		
	}
	p.setSetting = function (_o){
		this.templateSetting = _o;
		this.updateiFrameW();
	}
	var AC = "_active";
	p.openHTML 		 = function (_b){
		this.v._btn_html.removeClass(AC)
		this.v._btn_css.removeClass(AC)
		this.v._htmlArea.hide()
		this.v._cssArea.hide()
		if(_b){
			this.v._btn_html.addClass(AC)
			this.v._htmlArea.show()
		} else{
			this.v._btn_css.addClass(AC)
			this.v._cssArea.show()
		}
	}
	p.openPreview 	 = function (_b){
		this.v.btn_preview.removeClass(AC);
		this.v._btn_code.removeClass(AC);
		this.v._previewArea.hide();
		this.v._codeArea.hide();
		if(_b){
			this.v.btn_preview.addClass(AC);
			this.v._previewArea.show();
		} else{
			this.v._btn_code.addClass(AC);
			this.v._codeArea.show();
		}
	}
	p.getData 		 = function (){
		return [
			this.v.temps[0].val(),
			this.v.temps[1].val(),
			this.v.temps[2].val(),
			this.templateSetting
		];
	}
	p.updatePreview  = function (){
		var this_ = this;
		if(this.tID) clearTimeout(this.tID);
		this.tID = setTimeout(function(){
			this_.updatePreview_core()
		},200);
	}
	p.prevHTML = ""
	p.updatePreview_core= function (){
		
		var list = CMS_U.getPublicList( EditableView.currentGrid.getData() );
		var tag = ""; 
		
		if(ASSET_CSS_DIRS){
			for (var i = 0; i <  ASSET_CSS_DIRS.length ; i++) {
				tag += '<link rel="stylesheet" class="asset" type="text/css" href="'+ ASSET_CSS_DIRS[i]+'" />';
			}
		}
		
		tag += CMS_TemplateU.doTemplate( {
				id : this.v.temps[0].val(),
				htmls : this.v.temps[1].val(),
				css : this.v.temps[2].val(),
				//
				isPub : false,
				list : list,
				leng : list.length,
				isEdit : true
			});
		this.v.preview.contents().find('#REPLACE').html(tag);
		this.v.code.val(tag);    
		
		this.updatePreview_jsView(this.v.temps[1].val());

	}
	
	p.isJS = false;
	p.updatePreview_jsView = function (_s){
		if(CMS_TemplateU.isJS(_s)){
			if(this.isJS== false){
				var tar = this.v.temps[1];
					tar.removeClass("_color-html");
					tar.addClass("_color-js");
					tar.parent().find("._btn_input").data("type","textarea:js")
			}
			this.isJS = true;
		} else {
			if(this.isJS){
				var tar = this.v.temps[1];
					tar.removeClass("_color-js");
					tar.addClass("_color-html");
					tar.parent().find("._btn_input").data("type","textarea:html")
			}
			this.isJS = false;
		}
	}
	
	p.addJS = function (_o){
		this.v.temps[1].val(CMS_Data.CodeDic.getCode("block.replace.js"));
		this.updatePreview();
	}
	
	return c;
})();
