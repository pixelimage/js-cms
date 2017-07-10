
var Float_PreviewState = {
	isPreview:false
}


var Float_Preview = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Float_Preview');
		var tag = ""
			tag += '<div id="Float_PreviewFull"></div>'
			tag += '<div id="Float_PreviewMini"></div>'
			tag += '<div id="Float_PreviewTab"></div>'
		view.html(tag)
		
		Float_PreviewFull.init()
		Float_PreviewMini.init()
		Float_PreviewTab.init()
		
		S.isPreview = Storage.Memo.getListPreviewFull();
	}
		
	var S = Float_PreviewState
	
	/* ---------- ---------- ---------- */
	
	function updateSitemapDate(){
		Float_PreviewFull.updateSitemapDate()
		Float_PreviewMini.updateSitemapDate()
	}
	
	/* ---------- ---------- ---------- */
	
	function getGloupIDs(_di,_dir){
		var _s = CMS_Data.Sitemap.getGloupPath_by_id(_di,_dir)
		var tag = ""
		var gs = _s.split("/");
		for (var i = 0; i <  gs.length ; i++) {
			if(gs[i] != ""){
			tag += '<i class="fa fa-folder-open "></i> ' + gs[i] + " "
			}
		}
		if(tag != ""){
			return '<b>' + tag + '</b>';
		}
		return "なし"
	}
	function DoTemplate(_temp , _param){
		var urlRel = CMS_Path.PAGE.getRelPath(_param.id,_param.dir);
		var urlAbs = CMS_Path.PAGE.getAbsPath_deco(_param.id,_param.dir);
		var _sav = CMS_Data.Sitemap.getSaveDate(_param.id,_param.dir);
		var _pub = CMS_Data.Sitemap.getPublishDate(_param.id,_param.dir);
		var gl = Float_Preview.getGloupIDs(_param.id,_param.dir);
		if(gl == "") gl = "なし"
		_temp = _temp.split("{ID}")			.join(_param.id);
		_temp = _temp.split("{NAME}")		.join(String(_param.name).split("<br>").join(""));
		_temp = _temp.split("{G}")			.join(gl);
		_temp = _temp.split("{SAVE_DATE}")	.join(_pub + " " + CMS_SaveDateU.getRelatedDate(_sav));
		_temp = _temp.split("{PUB_DATE}")	.join(_pub + " " + CMS_SaveDateU.getRelatedDate(_pub));
		_temp = _temp.split("{URL}")		.join(urlRel);
		_temp = _temp.split("{URL_R}")		.join(urlRel + "?r=" + _param.prevPub + "&c=noChash");
		_temp = _temp.split("{URL_ABS}")	.join(urlAbs);
		return _temp;
	}
		
	/* ---------- ---------- ---------- */
	
	//プレビュ表示切替
	function switchPreview(_b){
		Storage.Memo.setListPreviewFull(_b);
		S.isPreview = _b;
		//
		Float_PreviewFull.stageOut_core()
		Float_PreviewMini.stageOut_core()
		stageIn(ps[0],ps[1],ps[2])
		
		
	}
		
	/* ---------- ---------- ---------- */
	
	function stageInit(){
	}
	var ps = []
	function stageIn(_type,_xy,_param){
		ps = [_type,_xy,_param]
		if(S.isPreview){
			Float_PreviewFull.stageIn(_type,_xy,_param);
		} else{
			Float_PreviewMini.stageIn(_type,_xy,_param);
		}
	}
	function stageOut(){
		if(S.isPreview){
			Float_PreviewFull.stageOut()
		} else{
			Float_PreviewMini.stageOut()
		}
	}
	function stageOut_core(){
		if(S.isPreview){
			Float_PreviewFull.stageOut_core()
		} else{
			Float_PreviewMini.stageOut_core()
		}
	}
	return {
		init: init,
			stageIn: stageIn,
			stageOut: stageOut,
			stageOut_core: stageOut_core,
			getGloupIDs: getGloupIDs,
			DoTemplate: DoTemplate,
			updateSitemapDate: updateSitemapDate,
			switchPreview: switchPreview
	}
})();