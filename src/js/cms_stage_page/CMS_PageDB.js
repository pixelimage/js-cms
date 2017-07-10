/**
 * 表示済みのページを管理する
*/
var CMS_PageDB 		 = (function(){
	
	var observer = []
	function registerObserver(_v){
		observer.push(_v)
	}
	
	/* ---------- ---------- ---------- */
	//パラメータがフォーマットにそってるか
	function isPageParam(_pageModel){
		if(_pageModel.type == "")return false;
		if(_pageModel.id == "")return false;
		return true;
	}
	
	/* ---------- ---------- ---------- */
	var pages = [];
	
	//ページ追加
	function addPage(_pageModel){
		if(hasPages(_pageModel) == false){
			pages.push(_pageModel);
			updatedList();
		}
	}
	
	//ページ削除
	function removePage(_id,_dir){
		for (var i = 0; i < pages.length ; i++) {
			if(pages[i].id == _id){
				if(pages[i].dir == _dir){
					pages[i] = null;
					pages.splice(i,1);
					updatedList();
				}
			}
		}
	}
	
	function updatedList(){
		for (var i = 0; i <  observer.length ; i++) {
			observer[i].updateList();
		}
	}
	function updatedCurrent(){
		for (var i = 0; i <  observer.length ; i++) {
			observer[i].updatedCurrent();
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
	/* ---------- ---------- ---------- */

	function setCurrent(_page){
		addPage(_page.pageModel);
		currentPage = _page;
		currentPage_preview = _page;
		updatedCurrent()
	}
	/* ---------- ---------- ---------- */

	function getList(){
		return pages;
	}
	
	/* ---------- ---------- ---------- */

	var currentPage
	var currentPage_preview
	
	//現在のページを取得
	function getCurrentPage()		{ return currentPage; }
	function getCurrentPageModel()	{ return currentPage.pageModel; }
	function getCurrentPageStoreData()	{ 
		if(currentPage){
			if(currentPage.storageClass) {
				return currentPage.storageClass.storeData;
			}
		}
		return null;
	}
	
	var prevCurrent;
	function getPreviewPageModel() {
		var param = getCurrentPageModel();
		if(Dic.PageType.CMS_MYTAG == param.type){
			return prevCurrent;
		} else{
			prevCurrent = param;
			return param;
		}
	}	
	//現在のプレビュページを取得
	//設定系のページは、はいらない。フリーページのみ入る
	function getLivePreviewPage()		{ return currentPage_preview;	}
	function getLivePreviewPageModel()	{ return currentPage_preview.pageModel; }
	function hasCurrent()	{
		if(currentPage == undefined) return false;
		return true;
	}

	
	/* ---------- ---------- ---------- */

	function editedPage(){}
	function savedPage(){}
	function publishedPage(){ }
	
	/* ---------- ---------- ---------- */
	
	function updateSitemap(){
		CMS_Data.Sitemap.update();
	}
	
	/* ---------- ---------- ---------- */
	
	return {
		registerObserver : registerObserver,
		isPageParam : isPageParam,
		
		addPage : addPage,
		removePage : removePage,
		hasPages : hasPages,
		setCurrent : setCurrent,
		
		getCurrentPage : getCurrentPage,
		getCurrentPageModel : getCurrentPageModel,
		getCurrentPageStoreData : getCurrentPageStoreData,
		getPreviewPageModel : getPreviewPageModel,
		
		getLivePreviewPage : getLivePreviewPage,
		getLivePreviewPageModel : getLivePreviewPageModel,
		hasCurrent : hasCurrent,
		
		editedPage : editedPage,
		savedPage : savedPage,
		publishedPage : publishedPage,
		
		getList : getList,
		
		updateSitemap : updateSitemap
	}
})();

