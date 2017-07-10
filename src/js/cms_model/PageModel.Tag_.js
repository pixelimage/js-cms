
PageModel.Tag_ = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	 this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.param 
	p.pageType 
	p.pageInfo 
	p.grids
	
	p.init = function() {
	}
	p.getInitData = function() {
		//overrdie
	}
	p.getPreview = function() {
		//overrdie
		return "";
	}
	p.getHTML = function() {
		//overrdie
		return "";
	}
	p.getTestTag = function() {
		return "--";
	}
	return c;
})();