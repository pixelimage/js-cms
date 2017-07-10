
//バッチ用のキュー
var BatchPublishPagesQueueClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_i,_pages) {
	  this.init(_i,_pages);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_i,_pages) {
		this.no = _i;
		this.pages = _pages;
	}
	p.queue = function(_callback) {
		this.callback = _callback;
		var this_ = this;
		var storage = new Storage.OnlineBatch(this.pages);
			storage.start(function(){
				this_.callback();
			});
	}

	return c;
})();

