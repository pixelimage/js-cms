
EditableView.BaseGridState = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function() {
	}
	
	p.maxRow = (window["GRID_EDIT_MAX_ROW"]) ? GRID_EDIT_MAX_ROW :50;
	
	p.currentRow = -1
	p.currentPage = 0
	p.fitWide = true
	p.hideCols = ""
	
	p.setData = function(_state) {
		var o = _state;
		if(o == undefined) o = {}
		if(o["currentRow"]  === undefined ) o.currentRow = -1;
		if(o["currentPage"] === undefined ) o.currentPage = 0;
		if(o["fitWide"]  === undefined ) o.fitWide = true;
		if(o["hideCols"]  === undefined ) o.hideCols = "";
		this.currentRow  = o.currentRow;
		this.currentPage  = o.currentPage;
		this.fitWide 	 = o.fitWide;
		this.hideCols 	 = o.hideCols;
	}
	p.getData = function() {
		return {
			currentRow: this.currentRow,
			currentPage: this.currentPage,
			fitWide: this.fitWide,
			hideCols: this.hideCols
		};
	}
	
	//setter
 	p.setCurrentPage = function(_n) { this.currentPage = _n; }
 	p.setCurrentRow = function(_n) { this.currentRow = _n; }
 	p.setFitWide = function(_n) { this.fitWide = _n; }
 	p.setHideCols = function(_n) { this.hideCols = _n; }
	
	//ページにおける現在の行を取得
	p.getRowAtPage = function(_r) {
		if(_r === undefined) _r = this.currentRow
		var s = this.currentPage * this.maxRow;
		var r = (_r - s) + 1;
		return r;
	}
	
	//指定行は、現在の表示ページに含まれるか
	p.isCurrentPage = function(_r) {
		if(_r == undefined) _r = this.currentRow
		var s = this.currentPage * this.maxRow;
		var e = s + this.maxRow;
		if(s <= _r){
			if(e > _r) return true;
		}
		return false;
	}
	
	//ページ調整
	p.adjustPage = function(_pageLeng) {
 		if (_pageLeng <= this.maxRow * this.currentPage) {
 			this.currentPage  = Math.floor(_pageLeng / this.maxRow) - 1;
 		}
 		//-1などになる場合は、0にまるめる
 		if(this.currentPage < 0) this.currentPage = 0;
	}
	
	return c;
})();