
var CMS_Asset_FilePreviewView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_Asset_FilePreviewView');
		createlayout();
	}
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_header">'
			tag += '	<div class="_header_inner">'
			tag += '		<div class="_title"></div>'
			tag += '	</div>'
			tag += '</div>'
			tag += '<div class="_body _asset-scroll">'
			tag += '</div>';
			view.html(tag);
		
		v.header = view.find("._header");
		v.title = view.find("._header ._title");
		v.body = view.find("._body");
	}
	
	function openPage(_param){
		
		var _t = CMS_Path.ASSET.getAbsPath_deco_file(_param.id , _param.dir);
		v.title.html('<div class="_fs12 _filePath_wh _cms_btn_alpha">' + _t +'</div>');
		
		var path = _param.dir + _param.id;
		var tag = "";
		var b = false;
		var ex = CMS_AssetFileU.getExtention(_param.id);
		if(CMS_AssetFileU.isExtention(ex,"img")){
			b = true;
			tag += '<div class="_body_core"><img src="{URL}" class="_cms_bg_trans"></div>';
		}
		if(CMS_AssetFileU.isExtention(ex,"mov")){
			b = true;
			tag += '<div class="_body_core"><video controls src="{URL}"></div>';
		}
		if(CMS_AssetFileU.isExtention(ex,"pdf")){
			b = true;
			tag += '<iframe class="_preview" src ="{URL}" ></iframe>';
		}
		if(b){
			tag = tag.split("{URL}").join(path);
		} else{
			tag += '<div class="_body_core"><div class="_anno">このファイルは、プレビューできません</div></div>';
		}
		
		v.body.html(tag);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_param){
		// if(! isOpen){ 
			isOpen = true;
			view.show();
			openPage(_param);
		// }
	}
	function stageOut(){
		// if(isOpen){ 
			isOpen = false;
			view.hide();
		// }
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
	}
})();