
var CMS_PageList_PageDB = (function(){
	
	var list = [];
	
	function _trace(){
		return list;
	}
	function add_(_page){
		var a = []
		for (var i = 0; i <  list.length ; i++) {
			if(list[i].isRemoved == false){
				a.push(list[i])
			}
		}
		list = a;
		list.push(_page);
	}

	/* ---------- ---------- ---------- */
	
	function getPage(_id,_dir){
		for (var i = 0; i <  list.length ; i++) {
			if(list[i].param.id == _id){
			if(list[i].param.dir == _dir){
				return list[i];
			}
			}
		}
		return null;
	}

	/* ---------- ---------- ---------- */

	var tID;
	function updateState(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			updateState_delay()
		},200);
	}
	function updateState_delay(){
		for (var i = 0; i <  list.length ; i++) {
			list[i].updateState();
		}
	}
	
	/* ---------- ---------- ---------- */

	var tID2;
	function updateEditState(){
		if(tID2) clearTimeout(tID2);
		tID2 = setTimeout(function(){
			updateState_delay()
		},200);
	}
	function updateEditState_delay(){
		for (var i = 0; i <  list.length ; i++) {
			list[i].updateEditState();
		}
	}
	return {
		_trace: _trace,
		add_: add_,
		getPage: getPage,
		updateState: updateState,
		updateEditState: updateEditState
	}
})();