/**
 * メインのコントーローラ
 * 重要な操作は、このコントローラを経由する
 */

var CMS_MainController = (function(){

	/* ---------- ---------- ---------- */
	
	//初期時
	function init(){
		//URLハッシュチェック
		init_core(CMS_History.getInitParam(),500);
		CMS_ModalManager.init();
		CMS_RootView.stageIn();
		CMS_PageStage.stageIn();
		CMS_AssetStageClose.stageIn();
	}
	
	function init_core(state,_delay){
		var param = CMS_Data.Sitemap.getData_by_id(state.id,state.dir);
		
		//Myタグの場合
		if(!param){
			if(state.dir == Dic.DirName.MYTAG){
				param = CMS_Data.MyTag.getParam_by_ID(state.id);
			}
		}
		if(param){
			setTimeout(function(){
				openPage(param,false);
			},_delay);
		} else{
			openIntroPage();
		}
	}
	
	//ガイドビューからコールされる
	function openPage_by_hash(_s){
		var state = "/" + _s.split("#").join("");
		var param = CMS_Path.PAGE.getAbsPath_reverse(state);
		init_core(param,100);
	}
	
	//イントロビュー
	function openIntroPage(){
		CMS_PagesView.stageOut();
		if(_currentBtn) _currentBtn.removeClass("_active");
		CMS_IntroView.stageIn();
	}
	
	//テストからコールされる
	// CMS_MainController.openPage_for_test("html/company_outline.html")
	// CMS_MainController.openPage_for_test("html/products.html")
	function openPage_for_test(_s){
		var state = CMS_Path.PAGE.getAbsPath_reverse("/" + _s);
		var param = CMS_Data.Sitemap.getData_by_id(state.id,state.dir);
		openPage(param);
	}
	
	//ID指定でページを開く。sitemapや、検索リストからコールされる
	function openPage_by_id(_id,_dir){
		var param = CMS_Data.Sitemap.getData_by_id(_id,_dir);
		if(param){
			openPage(param);
		} else{
			openIntroPage();
		}
	}
	
	/**
	 * ページを開く
	 * 
	 * 基本的に、サイトマップからコールされるが、戻るボタンなどからも、コールされる
	 * 
	 * @_param ページパラメータ
	 * @_addHistory 履歴に追加するか
	 */
	var isOpening = false;
	function openPage(_param,_addHistory){
		if(isOpening) return;
		isOpening = true;
		 if(isLog) console.log("●CMS_MainController.openPage()" , _param);
		if(_addHistory == undefined)_addHistory = true;
		CMS_ScreenManager.memoryCurrentScroll();
		
		//履歴追加
		if(_addHistory && _param != null) CMS_History.addPage(_param);
		
		//パラメータなければ、イントロビュー表示
		if(_param == null) openIntroPage();
		
		//表示初期化
		hideFloatView();
		CMS_IntroView.stageOut();
		CMS_PagesView.stageOut();
	
		//ボタンアクティブ処理
		_updateBtn(_param);
		
		//JSブロックのプレビュー用
		HTML_ExportState.setCurrent({id: _param.id, dir: _param.dir});
		
		//メイン処理
		CMS_PagesView.stageIn(_param);
		CMS_PageListViewSearch.openPage_(_currentBtn);
	}
	
	//Myタグ設定ページを開く
	function openPageSetting(_no){
		openPage( Dic.MyTagList[_no] );
	}
	
	/* ---------- ---------- ---------- */
	
	var _currentBtn;
	function _updateBtn(_param){
		if(_currentBtn) _currentBtn.removeClass("_active");
		_currentBtn = $("#"+CMS_PageID.getID(_param.id,_param.dir))
		_currentBtn.addClass("_active");
		_currentBtn.addClass("_opened");
	}
	
	/* ---------- ---------- ---------- */
	
	//リセット用
	function removePage(_id,_dir){
		CMS_PagesView.removePage(_id,_dir);
		CMS_PageDB.removePage(_id,_dir);
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//ページステートが変化したらコールされる
	
	//ページを開いたとき
	function openedPage(_page){
		isOpening = false;
		CMS_PageDB.setCurrent(_page);
	}
	function openedPage2(_page){
		CMS_LivePreviewController.openedPage();
		CMS_ScreenManager.setCurrentScroll(_page);
		//MEMO openedPage,openedPage2と分割してる理由
		// ページ表示時に、ローカルなMyタグを表示するときに、
		// 分割しないと初期表示がうまくいかないので分割
	}
	
	//ページ内の要素を編集したとき（しょっちゅうコールされる）
	function editedPage(_id,_dir){
		CMS_PageDB.editedPage();
		CMS_LivePreviewController.editedPage();	
		CMS_PageList_StateManager.editedPage(_id,_dir);
	}
	
	//ページを保存したとき
	function savedPage(_id,_dir){
		if(! CMS_PageDB.hasCurrent())return;
		//
		CMS_PageDB.savedPage();
		CMS_LivePreviewController.savedPage();	
		CMS_PageList_StateManager.savedPage(_id,_dir);
		
		CMS_Data.MyTag.savedPage(_id,_dir);
	}
	
	//ページを公開したとき
	function publishedPage(_id,_dir){
		if(! CMS_PageDB.hasCurrent())return;
		//
		CMS_PageDB.publishedPage();
		CMS_LivePreviewController.publishedPage();
		CMS_PageList_StateManager.publishedPage(_id,_dir);
	}
	//公開削除したとき
	function unPublishedPage(_id,_dir){
		CMS_PageList_StateManager.unPublishedPage(_id,_dir);
	}
	
	//ページリストから、ページ保存
	function savePageByID(_id,_dir){
		CMS_PagesView.savePageByID(_id,_dir);
	}
	
	/* ---------- ---------- ---------- */
	//アセット関連
	
	//そのままアセットへリレー
	function openAssetSelect(_type,_path,_cb){ CMS_AssetStage.openAssetSelect(_type,_path,_cb); }
	function openAssetSelectRel(_type,_path,_cb){ 
		var s = CMS_Path.SITE.REL + _path;
		CMS_AssetStage.openAssetSelect(_type,s,function(_s){
			_cb(_s.split(CMS_Path.SITE.REL).join(""));
		});
	}
	function openAssetFile(_path)			{ CMS_AssetStage.openAssetFile(_path); }
	function openPresetCSSFile(_key)		{ CMS_AssetStage.openPresetCSSFile(_key) } 
	function openTemplateHTMLFile(_file)	{ CMS_AssetStage.openTemplateHTMLFile(_file) }
	function openMyTagFile(_file)			{ CMS_AssetStage.openMyTagFile(_file) }
	function openUploadDir()				{ CMS_AssetStage.openUploadDir() }
	function openCMSSetting(_s)				{ CMS_AssetStage.openCMSSetting(_s) }
	 
	//アセットで選択したブロックをページへ追加
	function addAssetToPage(_u){
		_u = _u.split(CMS_Path.SITE.REL).join("");
		UpdateDelay.delay(function(){
			if( FileU.isImageFile(_u) ){
				window.addBlock("tag.img",{url:_u });
			} else{
				window.addBlock("tag.btn",{url:_u });
			}
		});
	}
	
	//
	function addTextToPage(_s){
		addBlockToPage("tag.p",{text:_s });
	}
	function addHinagataToPage(_id){
		window.addBlock("object.hinagata",{id:_id });
	}
	function addBlockToPage(_type,_param){
		window.addBlock(_type,_param);
	}
	
	/* ---------- ---------- ---------- */
	//
	function closeInspectView(){
		InspectView.stageOut();
	}
	
	/* ---------- ---------- ---------- */

	return {
		init: init,
		openIntroPage: openIntroPage,
		removePage: removePage,
		openPage_for_test: openPage_for_test,
		openPage_by_hash: openPage_by_hash,
		openPage_by_id: openPage_by_id,
		openPage: openPage,
		openPageSetting: openPageSetting,
		//
		openedPage: openedPage,
		openedPage2: openedPage2,
		editedPage: editedPage,
		savedPage: savedPage,
		publishedPage: publishedPage,
		unPublishedPage: unPublishedPage,
		//
		savePageByID: savePageByID,
		//
		openAssetSelect: openAssetSelect,
		openAssetSelectRel: openAssetSelectRel,
		openAssetFile: openAssetFile,
		openPresetCSSFile: openPresetCSSFile,
		openTemplateHTMLFile: openTemplateHTMLFile,
		openMyTagFile: openMyTagFile,
		openUploadDir: openUploadDir,
		openCMSSetting: openCMSSetting,
		
		addAssetToPage: addAssetToPage,
		addTextToPage: addTextToPage,
		addHinagataToPage: addHinagataToPage,
		addBlockToPage: addBlockToPage,
		
		closeInspectView: closeInspectView
		
	}
})();



