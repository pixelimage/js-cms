
var CMS_Asset_FileDetailView 		 = (function(){

	var view;
	var v = {};

	function init(){
		view = $('#CMS_Asset_FileDetailView');
		view.append($('<div id="CMS_Asset_FileEditorView"></div>'));
		view.append($('<div id="CMS_Asset_FilePreviewView"></div>'));
		
		CMS_Asset_FileEditorView.init();
		CMS_Asset_FilePreviewView.init();
		
	}
	/* ---------- ---------- ---------- */
	
	function save (){ 
		CMS_Asset_FileEditorView.save();
	}
	
	/* ---------- ---------- ---------- */
	
	var _ps = [];
	var _current;
	function openPage (_param){
		var ex = CMS_AssetFileU.getExtention(_param.id);
		var isClickable = CMS_AssetFileU.isExtentionAll(ex);
		var isEdtable = CMS_AssetFileU.isExtention(ex,"editable");
		
		if(isEdtable){
			CMS_Asset_FileEditorView.stageIn(_param);
			CMS_Asset_FilePreviewView.stageOut();
		} else {
			CMS_Asset_FileEditorView.stageOut();
			CMS_Asset_FilePreviewView.stageIn(_param);
		}
		CMS_AssetStage.openedDetailPage(_param);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_param){
		// if(! isOpen){ isOpen = true;
			view.show();
			if(_param) openPage(_param);
		// }
	}
	function stageOut(){
		// if(isOpen){ isOpen = false;
			view.hide();
		// }
	}
	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		save: save
	}
})();