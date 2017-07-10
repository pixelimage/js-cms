
var CMS_PagesView 		 = (function(){

	var view;

	function init(){
		view = $('#CMS_PagesView');
	}
	
	/* ---------- ---------- ---------- */
	
	function _getID 		(_id,_dir){ return CMS_PageID.getID_s(_id,_dir) }
 	function _has 			(){ 		return CMS_PageDB.hasCurrent(); }
 	function _getCurrent 	(){ 		return CMS_PageDB.getCurrentPage(); }
 	function getCurrent 	(){ 		return _getCurrent(); }
 	
	function _has_ps (_id,_dir){
		for (var i = 0; i < _ps.length ; i++) {
			var id1 = _getID(_id,_dir);
			var id2 = _getID(_ps[i].id,_ps[i].dir);
			if(id1 == id2)return true;
		}
		return false;
	}
	function _getPageByID(_id,_dir){
		for (var i = 0; i < _ps.length ; i++) {
			var id1 = _getID(_id,_dir);
			var id2 = _getID(_ps[i].id,_ps[i].dir);
			if(id1 == id2) return _ps[i];
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	function historyBack 	(){ if(_has()) _getCurrent().historyBack(); }
	function save 			(){ if(_has()) _getCurrent().saveData(); }
	function publish 		(){ if(_has()) _getCurrent().publishData(); }
	function openURL 		(){ if(_has()) _getCurrent().openURL(); }
	function editMeta 		(){ if(_has()) _getCurrent().editMeta(); }
	
	function refresh (){ openPage(); } 
	
	/* ---------- ---------- ---------- */
	
	var _ps = [];
	var _current;
	
	function removePage (_id,_dir){
		var tar = -1;
		for (var i = 0; i < _ps.length ; i++) {
			if(_ps[i].id == _id) {
				if(_ps[i].dir == _dir) {
					_ps[i].stageOut();
					_ps[i].remove();
					_ps[i] = null;
					_ps.splice(i,1);
				}
			}
		}
	}
	function openPage (_param){
		if(_param == undefined) {
			if(_current == undefined)return;
			_param = _current;
		}
		
		//ページ作成
		if(_has_ps(_param.id,_param.dir) == false){
			_ps.push(new CMS_PageClass(view, _param));
		}
		_current = _param;
		
		//前のページは非表示にして、現在のページを表示
		// if(_has()) _getCurrent().stageOut();
		for (var i = 0; i < _ps.length ; i++) {
			var id1 = _getID(_param.id,_param.dir)
			var id2 = _getID(_ps[i].id,_ps[i].dir)
			if(id1 == id2) {
				_ps[i].stageIn();
			} else{
				_ps[i].stageOut();
			}
		}
	}

	/* ---------- ---------- ---------- */
	
	//外からIDとDIRを指定して保存、公開
	
	function savePageByID(_id,_dir){
		var tar = _getPageByID(_id,_dir)
		if(tar)tar.saveData()
	}
	
	function publishPageByID(_id,_dir){
		var tar = _getPageByID(_id,_dir);
		if(tar)tar.publishData();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_pageModel,_extra){
		if(! isOpen){ isOpen = true;
			view.show();
			openPage(_pageModel,_extra);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		removePage: removePage,
		stageIn: stageIn,
		stageOut: stageOut,
		historyBack: historyBack,
		save: save,
		publish: publish,
		openURL: openURL,
		editMeta: editMeta,
		refresh: refresh,
		
		savePageByID : savePageByID,
		publishPageByID : publishPageByID,
		getCurrent : getCurrent	
	}
})();

