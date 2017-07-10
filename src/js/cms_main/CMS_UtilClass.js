
var CMS_UtilClass = {}
CMS_UtilClass.HoverMenu = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_float) {
	  this.init(_view,_float);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function(_view,_float) {
		this.view = _view;
		this.view.each(function (index, dom) {
			new CMS_UtilClass.HoverMenuClass($(this),_float);
		});
	}

	return c;
})();
CMS_UtilClass.HoverMenuClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_float) {
	  this.init(_view,_float);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function(_view,_float) {
		this.view = _view;
		this.float = _float;
		var self = this;
		this.view.hover(function(){
			self.show($(this));
		},function(){
			self.hide($(this));
		})
	}
	p.tID;
	p.show = function(_tar){
		var self = this;
		if(self.tID) clearTimeout(self.tID);
		self.tID = setTimeout(function(){
			_tar.find(self.float).show(); 
		},200);
	}
	p.hide = function(_tar){
		var self = this;
		if(self.tID) clearTimeout(self.tID);
		self.tID = setTimeout(function(){
			_tar.find(self.float).hide(); 
		},200);
	}

	return c;
})();

