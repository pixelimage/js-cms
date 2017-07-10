EditableView.FreeLayoutCols = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_gridType) {
	  this.init(_gridType);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init 			 = function () {
		this.v = {};
	}
	p.registParent 	 = function (_parent,_parentView,_pageParam,_deep){
		this.parent 	 = _parent;
		this.parentView  = _parentView;
		this.pageParam = _pageParam;
		this.deep = (_deep == null) ? 0 : _deep;
	}
	
	/* ---------- ---------- ---------- */
	//#Data
	p.initData 		 = function (_data,_no){
		this.no = _no;
		this.type = _data.type;
		this.attr = _data.attr;
		this.gridData = new EditableView.GridClass();
		if(_data.data.length == 0) _data.data = [];
		this.gridData.initRecords(_data.data);
		this.setInitView();
		this.update();
	}
	p.changeData  	 = function (data,no){
		this.gridData.overrideRecordAt(data,no);
		this.parent.updateSubData();
	}
	p.duplicateData   = function (no){
		this.gridData.duplicateAt(no);
		this.parent.update();
		this.parent.updateSubData();
	}
	p.removeData 	  = function (no){
		this.gridData.removeRecordAt(no);
		this.parent.update();
		this.parent.updateSubData();
		InspectView.stageOut();
	}
	p.setInitView  	 = function (){
		var list = this.gridData.getRecords();
		var self = this;
		var style = CMS_BlockAttrU.getStyle(this.attr);
		var class_ = CMS_BlockAttrU.getClass(this.attr);
		
		var blockInfo = CMS_BlockAttrU.getMarkTag(this.attr,true)
		var tag = '';
			tag += '<div class="_freeLayoutTable _freeLayoutToggle " data-no="'+this.no+'" style="'+style+'">';
			tag += '<div class="cms-column ' + class_ + '">';
			for (var i = 0; i < list.length ; i++) {
			tag += '	<div class="cms-column-col " data-no="'+i+'"></div>';
			}
			tag += '</div>';
			tag += blockInfo;
			tag += '<span class="_btn_delete"></span>';
			if(this.deep == 1){
				if(this.attr.narrow){
					tag += '<span class="_block_toggle _block_toggle_close"></span>';
				} else{
					tag += '<span class="_block_toggle"></span>';
				}
			}
			tag += '</div>';
		this.view = $(tag);
		this.parentView.append(this.view);
		this.v.replaceView  = this.view.find('> .cms-column > .cms-column-col');
		this.view.find(' > ._btn_delete').click(function(){
			$(this).parent().click();
			InspectView.doCommand("delete");
		});
		
		this.view.find(' > ._block_toggle').click(function(){
			$(this).parent().click();
			$(this).toggleClass("_block_toggle_close");
			InspectView.doCommand("toggle");
		});
	}
	
	p.update 		 = function (){
		var self = this;
		var list = this.gridData.getRecords();
		for (var i = 0; i < list.length ; i++) {
			var divNode = new EditableView.FreeLayout();
				divNode.registParent(this,this.v.replaceView.eq(i),this.pageParam,this.deep +1);
				divNode.initData(list[i],i);
				divNode.view.click(function(event){
					event.stopPropagation();
					event.preventDefault();
					InspectView.setPageData(self.pageParam);
					InspectView.setData("layout.colDiv",$(this),self,$(this),$(this));
				});
		}
		DragController.setDrag(this.parent,this.view,DragController.FREE_DROP);
		this.updateSubData();
	}
	p.updateSubData  = function (){
		this.parent.updateSubData();
	}
	return c;
})();