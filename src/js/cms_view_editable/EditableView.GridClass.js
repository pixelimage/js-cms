
EditableView.GridClass  = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	 this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	this.grid = [];
	p.init 			 = function () {
		this.grid = [];
	}
	p.initRecords 	 = function (_grid){
			this.grid = _grid;
			if(this.grid ==undefined)this.grid = [];
		},
	p.addRecord 	 = function (_item){
			this.grid.push(_item);
		},
	p.addRecordAt 	 = function (_item,_index){
			this.grid.splice(_index,0,_item);
		},
	p.moveRecord 	 = function (_indexFrom,_indexTo){
		this.swapRecord(_indexFrom,_indexTo);
		return;
		},
	p.moveRecordToFirst 	 = function (_indexFrom){
		var n = this.grid[_indexFrom];
		this.grid.splice(_indexFrom,1);
		this.grid.unshift(n);
		return 0;
	},
	p.moveRecordToLast 	 = function (_indexFrom){
		var n = this.grid[_indexFrom];
		this.grid.splice(_indexFrom,1);
		this.grid.push(n);
		return this.grid.length -1;
	},
	p.swapRecord 	 = function (_indexFrom,_indexTo){
			if(! this.isValidArge(_indexFrom,_indexTo))return false;
			//
			var from_ 	 = this.grid[_indexFrom];
			var to_ 	 = this.grid[_indexTo];
			this.grid[_indexTo]  = from_;
			this.grid[_indexFrom]  = to_;
		},
	p.isValidArge	  = function (_indexFrom,_indexTo){
			if(_indexFrom < 0)return false;
			if(_indexFrom > this.grid.length-1)return false;
			if(_indexTo < 0)return false;
			if(_indexTo > this.grid.length-1)return false;
			return true;
		},
	p.overrideRecordAt  = function (_item,_index){
			this.grid[_index] = _item;
		},
	p.removeRecordAt  = function (_index){
			this.grid.splice(_index,1);
		},
	p.removeRecordLast  = function (){
			var n = this.grid.length-1
			this.grid.splice(n,1);
		},
	p.duplicateAt 	 = function (_index){
			var c = JSON.parse(JSON.stringify(this.grid[_index]))
			this.addRecordAt(c,_index);
		},
	p.reset 		 = function (){
			this.grid = [];
		},
	p.getRecords 	 = function (){
			return this.grid
		},
	p.getRecordAt 	 = function (_index){
			return this.grid[_index]
		}
	p.getRecordLeng = function (_index){
			return this.grid.length
		}
	return c;
})();