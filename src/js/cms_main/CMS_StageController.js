//全体のレイアウトを管理する

var CMS_StageController = (function(){
	var v = {};
	
	function init(){
		v.body 			= $("body");
		v.mainStage 	= $("#CMS_PageStage");
		v.mainStageC 	= $("#CMS_PagesView_DisableView");
		v.header 		= $("#CMS_Header");
		v.headerR 		= $('#CMS_HeaderRight');
		v.right 		= $("#CMS_SidePreview");
		v.asset 		= $("#CMS_AssetStage");
		v.assetSBG 		= $("#CMS_AssetStageSideBG");
		v.assetC 		= $("#CMS_AssetStageClose");
		v.preBottom 	= $("#CMS_SidePreviewClose ._bottom");
		
		var state = Storage.Memo.getPreviewState();
		currentS = parseInt(state[0]);
		currentWs = state[1].split(",");
		var ww = 0
		for (var i = 0; i <  currentWs.length ; i++) {
			ww += Number(currentWs[i])*(currentS/100);
		}
		setSideW(ww);
		initView();
		
		CMS_ScreenManager.registResize(function(){resize();})
	}
	
	/* ---------- ---------- ---------- */

	function initView(){
		if(Storage.Memo.getPreviewVisible() == "1"){
			openPreviewStage(true);
		} else{
			openPreviewStage(false);
		}
	}
	var isOpenPreviewStage = false
	// function openPreviewStageToggle(){
	// 	openPreviewStage((isOpenPreviewStage) ? false: true);
	// }
	function openPreviewStage(_b){
		if(_b){
			// v.body.addClass("_sidePreview");
			isOpenPreviewStage = true;
			CMS_SidePreview.stageIn();
			CMS_SidePreviewClose.stageOut();
			Storage.Memo.setPreviewVisible("1");
		} else{
			// v.body.removeClass("_sidePreview");
			isOpenPreviewStage = false;
			CMS_SidePreview.stageOut();
			CMS_SidePreviewClose.stageIn();
			Storage.Memo.setPreviewVisible("0");
		}
		update();
	}
	
	/* ---------- ---------- ---------- */
	//アセット
	
	var isOpenAssetStage = false
	function openAssetStage(_b){
		isOpenAssetStage = _b;
		isAssetFull = false;
		update();
	}
	
	var isSettingSelectStage = false;
	function openSettingSelectStage(_b){
		isSettingSelectStage = _b;
		isOpenAssetStage = _b;
		update();
	}
	
	var isAssetFull = false;
	var isPrevAssetOpen = false
	// var isPrevPreviewOpen = false
	function openSettingFull(_b){
		isAssetFull = _b;
		//アセットひらいてたか
		if(_b) {
			isPrevAssetOpen = isOpenAssetStage;
			isOpenAssetStage = true;
		} else{
			isOpenAssetStage = isPrevAssetOpen;
		}
		//サイドプレビュー開いてたか
		// if(_b) {
		// 	isPrevPreviewOpen = isOpenPreviewStage;
		// 	isOpenPreviewStage = false;
		// } else{
		// 	isOpenPreviewStage = isPrevPreviewOpen;
		// }
		update();
	}
	var asset_update_cb;
	function registAssetCallback(_cb){
		asset_update_cb = _cb;
	}
	
	/* ---------- ---------- ---------- */

	function setSideW(_w){
		currentSideW = _w
		update()
	}
	function update(){
		updateAssetView();
		updateW();
		updateH();
		resize();
		if(asset_update_cb) asset_update_cb(isAssetFull);
	}
	
	function updateAssetView(){
		if(isOpenAssetStage){
			CMS_AssetStage.stageIn();
		} else{
			CMS_AssetStage.stageOut();
		}
	}
	
	//幅
	var currentSideW = 250;
	var minW = 250;
	function updateW(){
		var w = 0;
		if(isOpenPreviewStage){
			if(currentSideW < minW ) currentSideW = minW;
			w = currentSideW;
		} else {
			w = 40;
		}
		v.header.css("right",w);
		v.headerR.css("width",w);
		v.mainStage.css("right",w);
		v.right.css("width",currentSideW);
		//
		if(isSettingSelectStage){
			v.asset.css("right",0);
			v.assetC.css("right",0);
		} else{
			v.asset.css("right",w);
			v.assetC.css("right",w);
		}
	}
	
	//高さ
	var currentSettingH = 500;
	var minH = 100;
	function updateH(){
		var h = 0;
		if(isOpenAssetStage){
			if(currentSettingH < minH ) currentSettingH = minH;
			h = currentSettingH;
		} else {
			h = 40;
		}
		if(isAssetFull){
			v.body.addClass("_assetStageFull");
			v.mainStage.css("bottom","0");
			v.mainStageC.css("bottom","0");
			v.asset.css("height","auto");
			v.assetSBG.css("height","auto");
			v.preBottom.css("height","auto");
		} else{
			v.body.removeClass("_assetStageFull");
			v.mainStage.css("bottom",h);
			v.mainStageC.css("bottom",h);
			v.asset.css("height",h);
			v.assetSBG.css("height",h);
			v.preBottom.css("height",h);
		}
	}
	
	var prevHeight = 500;
	
	/* ---------- ---------- ---------- */
	
	function offsetY(_y){
		currentSettingH = CMS_StatusH - ( _y );
		update();
	}
	/* ---------- ---------- ---------- */

	var cbs = []
	function registResize(_cb){
		cbs.push(_cb);
	}
	/* ---------- ---------- ---------- */


	var tID;
	function resize(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			resize_core()
		},200);
	}
	function resize_core(){
		for (var i = 0; i <  cbs.length ; i++) {
			cbs[i]();
		}
	}

	/* ---------- ---------- ---------- */
	
	return {
		init: init,
		// openPreviewStageToggle: openPreviewStageToggle,
		openPreviewStage: openPreviewStage,
		
		openAssetStage: openAssetStage,
		openSettingFull: openSettingFull,
		openSettingSelectStage: openSettingSelectStage,
		registAssetCallback: registAssetCallback,
		
		setSideW: setSideW,
		offsetY: offsetY,
		
		registResize: registResize
	}
})();

