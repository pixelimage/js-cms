
var CMS_PageID = (function(){
	function getID(_id,_dir){
		if(_dir == undefined) _dir = "";
		if(_id == undefined) _id = "";
		var dir = _dir.split("/").join("__SP__")
		var id = _id.split(".").join("")
		return CMS_PageID.PAGE_PREFIX + dir + "_" + id;
	}
	function getID_s(_id,_dir){
		if(_dir == undefined) _dir = "";
		if(_id == undefined) _id = "";
		var dir = _dir.split("/").join("__SP__")
		var id = _id.split(".").join("")
		
		return dir + "_" + id;
	}
	function getID_s2(_id){
		if(_id == undefined) _id = "";
		var _id = _id.split("/").join("__SP__")
			_id	 = _id.split(".").join("")
		return _id;
	}
	return {
		getID: getID,
		getID_s: getID_s,
		getID_s2: getID_s2
	}
})();

CMS_PageID.PAGE_PREFIX = "_SVP_";
