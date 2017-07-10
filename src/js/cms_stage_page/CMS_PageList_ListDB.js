

var CMS_PageList_ListEditNo = 0;

var CMS_PageList_ListDB = (function(){
	var list =[]
	function add_(a){
		list.push(a)
	}
	
	function closeAll(){
		for (var i = 0; i <  list.length ; i++) {
			list[i].trigger("_closeAll");
		}
		CMS_PageListViewTree.saveDirManager();
	}
	function openAll(){
		for (var i = 0; i <  list.length ; i++) {
			list[i].trigger("_openAll");
		}
		CMS_PageListViewTree.saveDirManager();
	}
	
	return {
		add_: add_,
		closeAll: closeAll,
		openAll: openAll
	}
})();
