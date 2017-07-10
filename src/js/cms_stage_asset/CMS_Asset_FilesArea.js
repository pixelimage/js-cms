
var CMS_Asset_FilesArea = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_Asset_FilesArea');
		
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = "";
			tag += '<div id="CMS_Asset_FileListView"></div>';
			tag += '<div id="CMS_Asset_FileDetailView"></div>';
			
			tag += '<div id="CMS_Asset_UploaderView"></div>';
			tag += '<div id="CMS_Asset_CreateFileView"></div>';
			tag += '<div id="CMS_Asset_RenameFileView"></div>';
		view.html(tag);

		CMS_Asset_FileListView.init();
		CMS_Asset_FileDetailView.init();
		
		CMS_Asset_UploaderView.init();
		CMS_Asset_CreateFileView.init();
		CMS_Asset_RenameFileView.init();
	}
	
	function setBtn(){
	}
	
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	function openPath(_param){
		CMS_Asset_FileListView.openPath(_param);
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				CMS_Asset_FileListView.stageIn();
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
		init: init,
		openPath: openPath,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();