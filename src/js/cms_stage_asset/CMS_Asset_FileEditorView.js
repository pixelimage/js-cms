
var CMS_Asset_FileEditorView 		 = (function(){

	var view;
	var v = {};

	function init(){
		view = $('#CMS_Asset_FileEditorView');
	}
	
	/* ---------- ---------- ---------- */
	
	function _getID 		(_id,_dir){ return CMS_AssetDB.getID(_id,_dir) }
 	function _has 			(){ 		return CMS_AssetDB.hasCurrent(); }
 	function _getCurrent 	(){ 		return CMS_AssetDB.getCurrentPage(); }
 	
	function _has_ps (_id,_dir){
		for (var i = 0; i < _ps.length ; i++) {
			var id1 = _getID(_id,_dir);
			var id2 = _getID(_ps[i].id,_ps[i].dir);
			if(id1 == id2)return true;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	function save (){ 
		if(isOpen){
			if(_has()) _getCurrent().saveData();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var _ps = [];
	var _current;
	
	function openPage (_param){
		if(_param == undefined) {
			if(_current == undefined)return;
			_param = _current;
		}
		
		//ページ作成
		if(_has_ps(_param.id,_param.dir) == false){
			_ps.push(new CMS_Asset_FileEditorClass( view , _param));
		}
		_current = _param;
		
		//前のページは非表示にして、現在のページを表示
		if(_has()) _getCurrent().stageOut();
		for (var i = 0; i < _ps.length ; i++) {
			var id1 = _getID(_param.id,_param.dir)
			var id2 = _getID(_ps[i].id,_ps[i].dir)
			if(id1 == id2) _ps[i].stageIn(_param.extra);//extra
		}
		
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
	/* ---------- ---------- ---------- */
	
	function getH(){
		return view.height();
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		save: save,
		getH: getH
	}
})();