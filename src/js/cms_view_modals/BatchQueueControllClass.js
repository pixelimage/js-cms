//バッチ用のキューコントローラ
var BatchQueueControllClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_a,_row) {
	  this.init(_a,_row);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	p.max
	p.current
	p.callback
	p.interval
	
	p.init = function(_a,_row){
		this.list = [];
		var row = _row;
		var pages = []
		this.max =  Math.ceil(_a.length / row);
		for(var i = 0; i < this.max; i++) {
			var n = i * row;
			var p = _a.slice(n, n + row);
			pages.push(p);
		}
		
		for (var i = 0; i < pages.length ; i++) {
			this.list.push(new BatchPublishPagesQueueClass(i,pages[i]))
		}
	}
	p.isLive
	p.stop = function() {
		clearInterval(this.tID);
		this.isLive = false;
	}
	p.start = function(_interval,_callbackOne,_callbackAll) {
		this.callbackOne = _callbackOne;
		this.callbackAll = _callbackAll;
		this.interval = _interval;
		this.isLive = true;
		this.current = 0;
		this.next()
	}
	p.next = function() {
		if(this.isLive == false) return;
		var this_ = this;
		this.callbackOne(this.current,this.list[this.current]);
		this.list[this.current].queue(function(){
			this_.nexted()
		})
	}
	p.nexted = function() {
		this.current++;
		if(this.current > this.max-1){
			this.callbackAll();
		} else{
			this.next_pre()
		}
	}
	p.tID
	p.next_pre = function() {
		var this_ = this;
		if(this.interval == 0){
			this.next()
		} else{
			this.tID = setTimeout(function(){
				this_.next()	
			},this.interval);
		}
	}
	return c;
})();

