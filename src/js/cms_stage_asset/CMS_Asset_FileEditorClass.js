
var CMS_Asset_FileEditorClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_pageModel) {
	  this.init(_view,_pageModel);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_view,_pageModel) {
		var self 		= this;
		this.parentView = _view;
		this.pageModel 	= _pageModel;
		this.id = this.pageModel.id;
		this.dir = this.pageModel.dir;
		
		this.storageClass = new Storage.SimpleIO( this.id , this.dir );
		this.storageClass.load(function() {
			self.loadData();
		});
	}
	
	p.loadData = function() {
		var self = this;
		var dir = this.pageModel.dir;
		var id = this.pageModel.id;
		
		this.pageView = new EditableView.TextPageView (
			this.pageModel,
			this.storageClass,
			this.parentView,
			CMS_AssetStage
		);
		this.stageIn(this.pageModel.extra);
	}
	
	/* ---------- ---------- ---------- */
	//そのままリレー
	
	p.saveData =function () { if(this.pageView) this.pageView.saveData() }
	
	/* ---------- ---------- ---------- */

	p.stageInit = function() {}
	
	p.stageIn = function(_extra) {
		if(this.pageView){
			this.pageView.stageIn(_extra);
			CMS_AssetDB.setCurrent(this);
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