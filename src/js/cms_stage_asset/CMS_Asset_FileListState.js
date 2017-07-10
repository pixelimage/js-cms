
var CMS_Asset_FileListState = (function(){
	// var listType = "thumb";
	var listType = "normal";
	function setListType(_s){
		_s = _s || "normal"
		listType = _s;
	}
	function getListType(){
		return listType
	}
	
	var size = "M";
	function setSize(_s){
		size = _s
	}
	function getSize(){
		return size
	}
	
	return {
		setListType: setListType,
		getListType: getListType,
		setSize: setSize,
		getSize: getSize
	}
})();