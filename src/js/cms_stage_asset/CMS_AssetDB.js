
var CMS_AssetDB 		 = (function(){
	
	var pages = [];
	
	//ページ追加
	function addPage(_pageModel){
		if(hasPages(_pageModel) == false){
			pages.push(_pageModel);
		}
	}
	//ページにDBに存在するか
	function hasPages (_pageModel){
		for (var i = 0; i < pages.length ; i++) {
			if(pages[i].id == _pageModel.id) {
				if(pages[i].dir == _pageModel.dir) {
					return true;
				}
			}
		}
		return false;
	}

	function setCurrent(_page){
		addPage(_page.pageModel);
		currentPage = _page;
	}
	var currentPage;
	
	//現在のページを取得
	function getCurrentPage()		{ return currentPage; }
	
	function hasCurrent()	{
		if(currentPage == undefined) return false;
		return true;
	}
	
	function getID(_id,_dir){
		if(_dir == undefined) _dir = "";
		if(_id == undefined) _id = "";
		if(typeof _dir == "number") _dir = String(_dir);
		if(typeof _id == "number") _id = String(_id);
		var dir = _dir.split("/").join("__SP__")
		var dir = dir.split(".").join("")
		var id = _id.split(".").join("")
		
		return dir + "_" + id;
	}
	
	/* ---------- ---------- ---------- */
	
	return {
		addPage : addPage,
		hasPages : hasPages,
		setCurrent : setCurrent,
		getCurrentPage : getCurrentPage,
		hasCurrent : hasCurrent,
		getID : getID
	}
})();