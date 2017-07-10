
var CMS_LivePreviewController = (function(){
	
	//ページ開いた時にコールされる
	
	function openedPage(){
		if(! CMS_PageDB.hasCurrent())return;
		CMS_SidePreview.openedPage();
	}
	
	//ページ更新があったら、コールされる
	//ブロック操作時、保存時など
	function editedPage(_delay){
		if(! CMS_PageDB.hasCurrent())return;
		CMS_SidePreview.editedPage(_delay);
	}
	
	//保存時にコールされる
	function savedPage(){
		if(! CMS_PageDB.hasCurrent())return;
		CMS_SidePreview.savedPage();
	}
	function publishedPage(){
		if(! CMS_PageDB.hasCurrent())return;
		CMS_SidePreview.publishedPage();
	}
 
	return {
		openedPage: openedPage,
		editedPage: editedPage,
		savedPage: savedPage,
		publishedPage: publishedPage
	}
})();
