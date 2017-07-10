
//ページ編集ステートを管理する。サイトマップのDate更新用
var CMS_PageList_StateManager = (function() {

	var list = []
	function hasData(_id,_dir) {
		_dir = _dir || "";
		for (var i = 0; i < list.length; i++) {
			if (_id == list[i][0]) {
			if (_dir == list[i][1]) {
				return true;
			}
			}
		}
		return false;
	}

	/* ---------- ---------- ---------- */

	function isEdited(_id,_dir){
		var b = hasData(_id,_dir);
		// console.log([b,_id,_dir]);
		return b;
	}
	/* ---------- ---------- ---------- */

	function openedPage(_page){
		//
	}
	
	var lastEeditID;
	var lastEeditDIR;
	
	function editedPage(_id,_dir){
		_dir = _dir || "";
		if (hasData(_id,_dir) == false) {
			list.push([_id,_dir]);
		}
		
		var b  = true
		if(lastEeditID == _id){
			if(lastEeditDIR == _dir){
				b = false;
			}
		}
		if(b)CMS_PageList_PageDB.updateEditState();
		lastEeditID = _id;
		lastEeditDIR = _dir;
	}
	function savedPage(_id,_dir){
		_dir = _dir || "";
		var a = []
		for (var i = 0; i < list.length; i++) {
			var b = true;
			if (_id == list[i][0]) {
				if (_dir == list[i][1]) {
					b = false;
				}
			}
			if(b)a.push(list[i]);
		}
		list = a;
		CMS_PageList_PageDB.updateEditState();
		lastEeditID = false;
		lastEeditDIR = false;
	}
	
	function publishedPage(_id,_dir){
		_dir = _dir || "";
		CMS_PageList_PageDB.updateEditState();
	}
		
	function unPublishedPage(_id,_dir){
		_dir = _dir || "";
		CMS_PageList_PageDB.updateEditState();
	}	
	
	/* ---------- ---------- ---------- */

	return {
		openedPage:openedPage,
		editedPage:editedPage,
		savedPage:savedPage,
		publishedPage:publishedPage,
		unPublishedPage:unPublishedPage,
		isEdited:isEdited
	}
})();