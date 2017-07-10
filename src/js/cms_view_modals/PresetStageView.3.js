
var PresetStage_PagesView 		 = (function(){

	var view;

	function init(){
		view = $('#PresetStage_PagesView');
	}
	
	/* ---------- ---------- ---------- */
 	
	function _has_ps (_id){
		for (var i = 0; i < _ids.length ; i++) {
			if(_ids[i] == _id) return true;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	var _ids = [];
	var _ps = [];
	var _current;
	
	function openPage (_param){
		if(_has_ps(_param.id) == false){
			_ids.push(_param.id);
			_ps.push(new PresetStage_PageClass(view, _param));
		}
		for (var i = 0; i < _ids.length ; i++) {
			if(_ids[i] == _param.id) {
				_current = _ps[i];
				_ps[i].stageIn();
			} else{
				_ps[i].stageOut();
			}
		}
		
	}
	function save (){ 
		if(_current){
			_current.saveData();
		}
	}

	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_pageModel){
		if(! isOpen){ isOpen = true;
			view.show();
			openPage(_pageModel);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		save: save,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();

