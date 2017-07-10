var CMS_PageListViewTree 	  = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_PageListViewTree');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	//サイトマップデータロード
	function loadSitemapData (){
		loadDirManager();
	}
	
	/* ---------- ---------- ---------- */
	//#サイトマップのフォルダ開閉状態のメモリ
	
	var listOpenManager
	
	//ロード
	function loadDirManager(){
		listOpenManager= new Storage.Local("cms_listOpenManager",[]);
		listOpenManager.load(function(){
			showSitemap();
		});
	}
	//保存
	function saveDirManager(){
		var dirs = $('._subDir');
		var list = [];
		for (var i = 0; i < dirs.length ; i++) {
			list[i] = [ dirs.eq(i).attr("id"), 1 ];
			if(dirs.eq(i).attr("data-isOpen") == "0") list[i][1] = 0;
		}
		listOpenManager.setData(list);
		listOpenManager.save(function(){});
		CMS_StatusFunc.setSitemapDirOpens(listOpenManager.getData());
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	function editSubFiles(){
		filelist.editSubFiles()
	}
	
	function publishAll(){
		filelist.publishAll()
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var filelist;
	function showSitemap(){
		
		//開閉リストを登録
		CMS_StatusFunc.setSitemapDirOpens(listOpenManager.getData());
		filelist = new CMS_PageList_ListClass();
		filelist.registParent(this,view,0);
		filelist.initData(CMS_Data.Sitemap.getData(),0);
		
		//CMS_MainController.openPage();
		
		view.scrollTop(Storage.Memo.getSideMenuY())
		setTimeout(function(){
			isSaveable = true;
		},500);
	}
	
	//ファイル名変更
	function changeFileName(_edited,_original){	
		if(_edited.id != _original.id || _edited.dir != _original.dir){
			if(isLog)console.log("●changeFileName : " + _original.id + " > " + _edited.id );
			Storage.Util.rename(_original , _edited);
		}
		UpdateDelay.delay(function(){
			CMS_MainController.removePage(_original.id,_original.dir);
			CMS_MainController.openPage_by_id(_edited.id,_edited.dir);
		})
	}
	
	//ファイル削除
	function deleteFile(_edited){
		//削除
		if(isLog)console.log("●deleteFile : " + _edited.id );
		Storage.Util.delete_(_edited);
		UpdateDelay.delay(function(){
			CMS_MainController.removePage(_edited.id,_edited.dir);
			CMS_MainController.openIntroPage();
		})
	}
	
	//アップデート
	var isSaveable = false
	function updatedSitemap(){
		if(!isSaveable) return;
		CMS_Data.Sitemap.save();
		// Float_Preview.updateSitemapDate()
	}
	
	/* ---------- ---------- ---------- */
	//ページを開く
	
	function openPage_(){
		//CMS_MainController.openPage(_param);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				loadSitemapData();
			}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}
	 return {
		init:init, stageIn:stageIn, stageOut:stageOut ,
		openPage_ 		:openPage_,
		updatedSitemap 	:updatedSitemap,
		changeFileName 	:changeFileName,
		deleteFile 		:deleteFile,
		saveDirManager:saveDirManager,
		editSubFiles:editSubFiles,
		publishAll:publishAll
	}

})();

