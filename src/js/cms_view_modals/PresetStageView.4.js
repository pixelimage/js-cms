
var PresetStage_PageClass = (function() {
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
		this.storageClass = new Storage.Online(this.type, this.id, this.dir, {});
		this.storageClass.load(function() {
			this_.loadData();
		});
	}
	
	p.loadData = function() {
		this.pageView = new EditableView.PageView (this.pageModel,this.storageClass,this.parentView);
		this.pageView.stageIn();
	}
	p.saveData =function () { if(this.pageView) this.pageView.saveData() }
	
	/* ---------- ---------- ---------- */

	p.stageInit = function() {}
	
	p.stageIn = function() {
		if(this.pageView){
			this.pageView.stageIn();
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
