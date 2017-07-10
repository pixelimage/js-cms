
var CMS_InitController = (function(){
	
	function init(){
		//ブラウザ分岐
		if( Env_.isIE9) $("body").addClass("_ie9");
		if(Env_.isChrome || Env_.isIE9|| Env_.isIE10 || Env_.isIE11){
			CMS_PathFunc	.init();
			CMS_KeyManager	.init();
			CMS_History		.init();
			CMS_CheckedView	.init();
			CMS_CheckedView	.stageIn(login);
		} else{
			NO_CMS.init()	
			NO_CMS.stageIn();
		}
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	//ログイン
	
	function login(){
		CMS_LoginView.init()
		CMS_LoginView.stageIn(logined);
	}
	
	function logined(){
		//設定データでダミー処理がはいるので、先に初期化
		DummyImageService.init();
		
		//設定データロード
		CMS_Data.Loader.start(checked);
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	//ログイン後処理
	
	function checked(){
		var tag = "";
			tag += '<div id="CMS_RootView">';
			
			//コアビュー
			tag += '	<div id="CMS_SidePreview" ></div>';
			tag += '	<div id="CMS_SidePreviewClose"></div>';
			
			tag += '	<div id="CMS_Header"></div>';
			tag += '	<div id="CMS_HeaderRight"></div>';
			
			tag += '	<div id="CMS_PageStage"></div>';
			
			tag += '	<div id="CMS_AssetStageSideBG"><span></span></div>';
			tag += '	<div id="CMS_AssetStageBG"></div>';
			tag += '	<div id="CMS_AssetStage"></div>';
			tag += '	<div id="CMS_AssetStageCloseBG"></div>';
			tag += '	<div id="CMS_AssetStageClose"></div>';
			tag += '	<div id="CMS_AssetStageResizeView"></div>';
			
			tag += '	<div id="CMS_PagesView_DisableView"></div>';
			tag += '	<div id="CMS_LOCK"></div>';
			
			//ダイアログ系
			tag += '	<div id="CMS_AlertView"			class="_modalView"></div>';
			tag += '	<div id="CMS_AlertLockView"		class="_modalView"></div>';
			tag += '	<div id="CMS_ConfirmView"		class="_modalView"></div>';
			tag += '	<div id="CMS_CopyView"			class="_modalView"></div>';
			tag += '	<div id="CMS_InputView"			class="_modalView"></div>';
			tag += '	<div id="CMS_ProccessView"		class="_modalView"></div>';
			tag += '	<div id="CMS_ErrorView"			class="_modalView"></div>';
			
			//編集画面
			tag += '	<div id="GridDetailView"		class="_modalView"></div>';
			tag += '	<div id="SubPageView"			class="_modalView"></div>';
			
			//フロート
			tag += '	<div id="InspectView"></div>';
			tag += '	<div id="Float_Preview"></div>';
			tag += '	<div id="SimpleToolTip"></div>';
			tag += '	<div id="Float_DateInputView"></div>';
			tag += '	<div id="FreeLayoutInfoView"></div>';
			
			//エディター
			tag += '	<div id="MiniEditer"></div>';
			tag += '	<div id="Editer_JSONView" 		class="_modalView"></div>';
			tag += '	<div id="Editer_TAGView" 		class="_modalView"></div>';
			tag += '	<div id="Editer_TextView" 		class="_modalView"></div>';
			tag += '	<div id="Editer_ExcelView" 		class="_modalView"></div>';
			tag += '	<div id="Editer_CodeCopyView" 	class="_modalView"></div>';
			
			tag += '	<div id="Anchor_InputView" 		class="_modalView"></div>';
			tag += '	<div id="Anchor_BtnView" 		class="_modalView"></div>';
			tag += '	<div id="Anchor_PageListView" 	class="_modalView"></div>';
			tag += '	<div id="Anchor_TargetListView" class="_modalView"></div>';
			
			tag += '	<div id="Preset_IconView" 		class="_modalView"></div>';
			tag += '	<div id="ServerInfoView" 		class="_modalView"></div>';
			
			tag += '	<div id="DirListView" 			class="_modalView"></div>';
			tag += '	<div id="DirTreeViewTest" 		class="_modalView"></div>';
			tag += '	<div id="BackupView" 			class="_modalView"></div>';
			tag += '	<div id="DummyImageView" 		class="_modalView"></div>';
			tag += '	<div id="SitemapEditView" 		class="_modalView"></div>';
			
			tag += '	<div id="FileInfoView"			class="_modalView _modalView-nomargin"></div>';
			tag += '	<div id="GadgetListView" 		class="_modalView"></div>';
			
			tag += '	<div id="PresetStageView" 		></div>';
			
			tag += '	<div id="EmbedTagListView" 	class="_modalView"></div>';
			tag += '	<div id="ImageMapView"></div>';
			tag += '	<div id="ImageMapInspectView"></div>';
			tag += '	<div id="CMS_GuideView" 		></div>';
			//
			tag += '	<div id="TreeViewMakerView" 	class="_modalView"></div>';
			tag += '	<div id="TreeViewMakerViewEditor" ></div>';
			tag += '	<div id="BatchPublishView" 		class="_modalView"></div>';
			tag += '	<div id="InputCnadidate"></div>';
			tag += '	<div id="ColorPickerView"></div>';
			
			tag += '	<div id="FormCandidates"></div>';
			// tag += '	<div id="SelectingBlockView"></div>';
			tag += '	<div id="CMS_DemoView">デモモード<span>保存・公開はできません</span></div>';
			tag += '</div>';
		$("body").append(tag);
		$("._loading").hide();
		
		if(Env_.isWin){
			$("body").addClass("_windows");
		}
		initViews();
	}
	
	//各ビューの初期化
	function initViews(){
		if(IS_DEMO)$('#CMS_DemoView').show();
		//
		var cs = [
			CMS_RootView,
			CMS_Header,
			CMS_AlertView,
			CMS_AlertLockView,
			CMS_ConfirmView,
			CMS_CopyView,
			CMS_InputView,
			CMS_ProccessView,
			CMS_ErrorView,
			CMS_LOCK,
			
			CMS_ScreenManager,
			CMS_SizeManager,
			CMS_SidePreview,
			CMS_SidePreviewClose,
			
			CMS_Data,
			FormCandidates,
			
			/* ---------- ---------- ---------- */

			CMS_PageStage,
			CMS_AssetStage,
			
			
			/* ---------- ---------- ---------- */

			FileInfoView,
			GadgetListView,
			PresetStageView,
			EmbedTagListView,
			ImageMapView,
			//
			InspectView,
			Float_Preview,
			SimpleToolTip,
			Float_DateInputView,
			FreeLayoutInfoView,
			//
			MiniEditer,
			Editer_TAGView,
			Editer_JSONView,
			Editer_ExcelView,
			Editer_CodeCopyView,
			
			Anchor_InputView,
			Anchor_BtnView,
			Anchor_PageListView,
			Anchor_TargetListView,
			Preset_IconView,
			ServerInfoView,
			
			SitemapEditView,
			DirListView,
			BackupView,
			DirTreeViewTest,
			
			CMS_GuideView,
			
			DummyImageView,
			
			TreeViewMakerView,
			TreeViewMakerViewEditor,
			
			BatchPublishView,
			InputCnadidate,
			ColorPickerView,
			
			CMS_FormU,
			CMS_StageController,
		];
		//初期化
		for (var i = 0; i < cs.length ; i++) { cs[i].init(); }
		
		//サイトマップロードあとに、メインコントローラ呼び出し
		CMS_Data.Sitemap.load(function(){
			CMS_MainController.init();
		});
		
		if(window.location.hash == "#publish_all"){
			if(USE_EDIT_LOCK) CMS_LOCK.setIsLocked(false);
			setTimeout(function(){
				$("._btn_publish_all").eq(0).click();$('._btn_start').click();
			},1000);
		}
	}
	
	return {
		init: init
	}
})();
	