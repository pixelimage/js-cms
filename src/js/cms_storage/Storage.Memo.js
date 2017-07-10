/**
 * LocalStorageを使用したメモ。状態の永続化で使用する
 * 
 */
Storage.Memo 	 = (function(){
	
	/* ---------- ---------- ---------- */
	//最後に見たページパラメータを記録
	
	var LASTVIEW_PARAM = "JS_CMS_LASTVIEW_PARAM";
	
	function getPageParam(){
		if(localStorage[LASTVIEW_PARAM]){
			return JSON.parse(localStorage[LASTVIEW_PARAM]);
		} else{
			return null;
		}
	}
	function setPageParam(_param){
		localStorage[LASTVIEW_PARAM] = JSON.stringify(_param);
	}
	
	/* ---------- ---------- ---------- */
	
	var IS_PREVIEW_NO = "JS_CMS_IS_PREVIEW_NO_";
	function getIsPreviewScNO(){
		if(localStorage[IS_PREVIEW_NO]){
			return localStorage[IS_PREVIEW_NO];
		} else{
			return 2;
		}
	}
	function setIsPreviewScNO(_n){
		localStorage[IS_PREVIEW_NO] = _n;
	}
	
	/* ---------- ---------- ---------- */

	var ZOOM_VAL = "JS_CMS_ZOOM_VAL_";
	function getZoomVal(){
		if(localStorage[ZOOM_VAL]){
			return localStorage[ZOOM_VAL];
		} else{
			return "1";
		}
	}
	function setZoomVal(_n){
		localStorage[ZOOM_VAL] = _n;
	}
	/* ---------- ---------- ---------- */
	
	var SIDEMENU_Y = "JS_CMS_SIDEMENU_Y";
	function getSideMenuY(){
		if(localStorage[SIDEMENU_Y]){
			return localStorage[SIDEMENU_Y];
		} else{
			return "0";
		}
	}
	var tID;
	function setSideMenuY(_n){
		if(tID)clearTimeout();
		tID = setTimeout(function(){
			localStorage[SIDEMENU_Y] = _n;
		}, 100);
	}
	
	/* ---------- ---------- ---------- */
	
	
	var PREVIEW_VISIBLE = "JS_CMS_PREVIEW_VISIBLE";
	function getPreviewVisible(){
		if(localStorage[PREVIEW_VISIBLE]){
			return localStorage[PREVIEW_VISIBLE];
		} else{
			return "0";
		}
	}
	
	function setPreviewVisible(_n){
		localStorage[PREVIEW_VISIBLE] = _n;
	}
	/* ---------- ---------- ---------- */
	
	var PREVIEW_STATE = "JS_CMS_PREVIEW_STATE";
	function getPreviewState(){
		if(localStorage[PREVIEW_STATE]){
			return localStorage[PREVIEW_STATE].split("_");
		} else{
			return ["33","1000"];
		}
	}
	function setPreviewState(_n){
		localStorage[PREVIEW_STATE] = _n.join("_");
	}
	/* ---------- ---------- ---------- */
	
	var LIST_PREVIEW_FULL = "JS_LIST_PREVIEW_FULL";
	function getListPreviewFull(){
		var s = "0";
		if(localStorage[LIST_PREVIEW_FULL]){
			s = localStorage[LIST_PREVIEW_FULL];
		} 
		return (s == "1") ? true:false;
	}
	function setListPreviewFull(_b){
		var s = (_b) ? "1" : "0";
		localStorage[LIST_PREVIEW_FULL] = s;
	}
	
	var LIST_PREVIEW_STATE = "JS_LIST_PREVIEW_STATE";
	function getListPreviewState(){
		if(localStorage[LIST_PREVIEW_STATE]){
			return localStorage[LIST_PREVIEW_STATE].split("_");
		} else{
			return ["33","1000"];
		}
	}
	function setListPreviewState(_n){
		localStorage[LIST_PREVIEW_STATE] = _n.join("_");
	}
	/* ---------- ---------- ---------- */
	
	//
	/*
	var PREVIEW_IS_LIVE = "JS_CMS_PREVIEW_IS_LIVE";
	function getSideViewIsOpen(){
		if(localStorage[PREVIEW_IS_LIVE]){
			return localStorage[PREVIEW_IS_LIVE];
		} else{
			return "1";
		}
	}
	function setSideViewIsOpen(_n){
		localStorage[PREVIEW_IS_LIVE] = _n;
	}
	*/
	
	/* ---------- ---------- ---------- */
	
	//サイドビューの表示・非表示
	var SIDEVIEW_IS_OPEN = "JS_CMS_SIDEVIEW_IS_OPEN";
	function getPreviewisLiveTab(){
		if(localStorage[SIDEVIEW_IS_OPEN]){
			return localStorage[SIDEVIEW_IS_OPEN];
		} else{
			return "0";
		}
	}
	function setPreviewisLiveTab(_n){
		localStorage[SIDEVIEW_IS_OPEN] = _n;
	}
	
	//サイドビューの表示・非表示
	var SIDEVIEW_IS_CHECK = "JS_CMS_SIDEVIEW_IS_CHECK";
	function getPreviewisLiveCheck(){
		if(localStorage[SIDEVIEW_IS_CHECK]){
			return localStorage[SIDEVIEW_IS_CHECK];
		} else{
			return "1";
		}
	}
	function setPreviewisLiveCheck(_n){
		localStorage[SIDEVIEW_IS_CHECK] = _n;
	}
	/* ---------- ---------- ---------- */
	
	//サイドビューの、開閉記録
	var SIDEVIEW_OPEN_LIST = "SIDEVIEW_OPEN_LIST";

	function getSideViewOpenList(){
		if(localStorage[SIDEVIEW_OPEN_LIST]){
			return JSON.parse(localStorage[SIDEVIEW_OPEN_LIST]);
		} else{
			return [false,true];
		}
	}
	function setSideViewOpenList(_param){
		localStorage[SIDEVIEW_OPEN_LIST] = JSON.stringify(_param);
	}
	
	/* ---------- ---------- ---------- */
	
	var CUSTOM_BG = ""
	function initCustomBG(){
		if(CUSTOM_BG == ""){
			CUSTOM_BG = "CUSTOM_BG_" + CMS_Path.SITE.ABS_PATH
		}
	}
	function getCustomBG(){
		initCustomBG();
		if(localStorage[CUSTOM_BG]){
			return localStorage[CUSTOM_BG];
		} else{
			return "";
		}
	}
	function setCustomBG(_n){
		initCustomBG();
		localStorage[CUSTOM_BG] = _n;
	}
	
	/* ---------- ---------- ---------- */
	
	var BACKUP_LIST = "BACKUP_LIST";

	function getBK(){
		if(localStorage[BACKUP_LIST]){
			return localStorage[BACKUP_LIST];
		} else{
			return "";
		}
	}
	function setBK(_param){
		localStorage[BACKUP_LIST] = _param;
	}
	
	/* ---------- ---------- ---------- */
	//編集幅指定(width:720px)
	// var EIDT_WIDE = "EIDT_WIDE";

	// function getEditWide(){
	// 	if(localStorage[EIDT_WIDE]){
	// 		return JSON.parse(localStorage[EIDT_WIDE]);
	// 	} else{
	// 		return "720";
	// 	}
	// }
	// function setEditWide(_param){
	// 	localStorage[EIDT_WIDE] = JSON.stringify(_param);
	// }
	/* ---------- ---------- ---------- */
	
	return { 
		getPageParam:getPageParam,
		setPageParam:setPageParam,
		
		getIsPreviewScNO:getIsPreviewScNO,
		setIsPreviewScNO:setIsPreviewScNO,
		
		getZoomVal:getZoomVal,
		setZoomVal:setZoomVal,
		
		getSideMenuY:getSideMenuY,
		setSideMenuY:setSideMenuY,
		
		getPreviewVisible:getPreviewVisible,
		setPreviewVisible:setPreviewVisible,
		
		getPreviewState:getPreviewState,
		setPreviewState:setPreviewState,
		
		getListPreviewFull:getListPreviewFull,
		setListPreviewFull:setListPreviewFull,
		getListPreviewState:getListPreviewState,
		setListPreviewState:setListPreviewState,
		
		getPreviewisLiveTab:getPreviewisLiveTab,
		setPreviewisLiveTab:setPreviewisLiveTab,
		getPreviewisLiveCheck:getPreviewisLiveCheck,
		setPreviewisLiveCheck:setPreviewisLiveCheck,
		
		getSideViewOpenList:getSideViewOpenList,
		setSideViewOpenList:setSideViewOpenList,
		
		getCustomBG:getCustomBG,
		setCustomBG:setCustomBG,
		
		getBK:getBK,
		setBK:setBK
		
		// getEditWide:getEditWide,
		// setEditWide:setEditWide
	}
})();