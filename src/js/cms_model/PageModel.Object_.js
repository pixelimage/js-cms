
PageModel.Object_ = (function() {
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
	p.getDefData = function(_n) {
		var _param = {}
		for (var i = 0; i < this.grids.length ; i++) {
			this.grids[i].getInitData(_param,_n);
		}
		return _param;
	}
	p.getTestTag = function() {
		var infoTag = this.pageInfo.getTestTag();
		var gridTag = ""
		var list = this.grids;
		for (var i = 0; i < list.length; i++) {
			gridTag += list[i].getTestTag()
		}
		var tag = ""
			tag += infoTag
			tag += gridTag
		return tag;
	}
	return c;
})();
 	