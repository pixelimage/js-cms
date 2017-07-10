EditableView.M_Grid 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_gridType) {
	  this.init(_gridType);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.gridType  
	p.view;
	p.v 
	p.parent;
	p.gridData;
	p.detailView;
	p.detailNo;
	p.subGrids
	
	p.init 			 = function(_gridType) {
		this.gridType = _gridType;
		//
		this.v = {}
		this.subGrids = [] 
		this.setParam();
	}
	p.setParam 		 = function (){
		this.gridInfo = this.gridType.gridInfo;
		this.repeat	 = this.gridType.multiGridRepeat;
	}
	p.registParent 	 = function (_parent){
		this.parent = _parent;
	}
	p.openTab 		 = function (_n){
		for (var i = 0; i < this.subGrids.length ; i++) {
			this.subGrids[i].mGrid_stopEditMode()
		}
		this.subGrids[_n].mGrid_startEditMode();
	}
	
	/* ---------- ---------- ---------- */
	//#Data
	p.initData 		 = function (_array){
		this.subGrids = [];
	
		var tag = "";
			tag += '<div class="_editableBlock">';
			tag += 		this.gridInfo.getHeadTag();
			tag += '	<div class="_replaceArea_MGRID"></div>';
			tag += '</div>';
		this.view = $(tag);
		this.parent.v.replaceArea.append(this.view);
		this.v.replaceArea = this.view.find('._replaceArea_MGRID');
		
		if(_array == null){
			_array = [];
			for (var i = 0; i < this.repeat ; i++) { 
				_array.push(null);
			}
		}
		
		for (var i = 0; i < _array.length ; i++) {
			this.addData(_array[i],i);
		}
		this.openTab(0);
	}
	p.getData 		 = function (){
		var a = [];
		for (var i = 0; i < this.subGrids.length ; i++) {
			a.push(this.subGrids[i].getData())
		}
		return a;
	}
	p.addData 		 = function (_o,_n){
		var o = _o;
		var g = new EditableView.BaseBlock(this.gridType,1,_n);
			g.registParent(this);
			g.initData(o);
			
		this.subGrids.push(g);
		this.parent.updateSubData();
	}
	/* ---------- ---------- ---------- */
	//#update
	p.updateSubData  = function (){
		this.parent.updateSubData();
	}
	return c;
})();