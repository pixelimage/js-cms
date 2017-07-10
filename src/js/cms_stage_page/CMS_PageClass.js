
var CMS_PageClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_pageModel) {
	  this.init(_view,_pageModel);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_view,_pageModel) {
		this.parentView = _view;
		this.pageModel 	= _pageModel;
		this.id 		= this.pageModel.id;
		this.dir 		= this.pageModel.dir;
		this.type 		= this.pageModel.type;
		
		var this_ 		= this;
		// this.storageClass = new Storage.Online(Dic.PageType.PAGE, this.id, this.dir, {});
		this.storageClass = new Storage.Online(this.type, this.id, this.dir, {});
		this.storageClass.load(function() {
			this_.loadData();
		});
	}
	
	p.loadData = function() {
		CMS_MainController.openedPage(this);
		this.pageView = new EditableView.PageView (this.pageModel,this.storageClass,this.parentView);
		this.pageView.stageIn();
		CMS_MainController.openedPage2(this);
	}
	
	/* ---------- ---------- ---------- */
	//そのままリレー
	
	p.previewData =function (_callback)	{ if(this.pageView) this.pageView.previewData(_callback) }
	p.historyBack =function ()			{ if(this.pageView) this.pageView.historyBack() }
	p.saveData =function ()				{ if(this.pageView) this.pageView.saveData() }
	p.publishData =function ()			{ if(this.pageView) this.pageView.publishData() }
	p.editMeta =function ()				{ if(this.pageView) this.pageView.editMeta() }
	p.openURL =function ()				{ if(this.pageView) this.pageView.openURL() }
	
	/* ---------- ---------- ---------- */

	p.stageInit = function() {}
	
	p.stageIn = function() {
		if(this.pageView){
			this.pageView.stageIn();
			CMS_MainController.openedPage(this);
			CMS_MainController.openedPage2(this);
		}
	}
	p.stageOut = function() {
		if(this.pageView){
			this.pageView.stageOut();
		}
	}
	p.remove = function() {
		if(this.pageView){
			this.isShow = false;
			this.pageView.remove();
		}
	}
	return c;
})();
