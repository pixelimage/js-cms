EditableView.SubPageView  = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.editCheckData = ""
	
	p.init  	 = function () {
		this.subs = [];
		this.v = {};
	}
	p.setObjectType = function (_objectType){
		this.type  = _objectType;
	}
	p.className = ""
	p.setStyle = function (_s){
		this.className = _s;
	}
	p.registParent  = function (_parent){
		var this_ = this;
		this.parent 	 = _parent;
		this.parentView  = $('#SubPageView');
		this.subs = [];
		
		//分岐
		var grids = this.type.grids;
		for (var i = 0; i < grids.length ; i++) {
			switch(grids[i].gridType){
				case Dic.GridType.BASE: 	this.subs.push(new EditableView.BaseBlock(grids[i])); break;
				case Dic.GridType.M_GRID:	this.subs.push(new EditableView.M_Grid(grids[i])); break;
				case Dic.GridType.TEMPLATE:	this.subs.push(new EditableView.CustomList(grids[i])); break;
			}
		}
		var tag = (function(_param,_class){ 
			var s = "";
				s += '<div class="_modalBox ' + _class + '">'
				s += '	<div class="_header">'
				s += '		<div style="float:right;">' + _param.getGuideTag() + '</div>'
				s += '		<div class="_title">' + _param.name + '</div>'
				s += '	</div>'
				s += '	<div class="_body _simple-scroll"><div class="_replaceArea"></div></div>'
				s += '	<div class="_footer">'
				s += '		<div class="_cms_btn _btn_close">キャンセル</div>'
				s += '		<div class="_cms_btn _cms_btn_active _btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 編集完了</div>'
				s += '	</div>'
				s += '</div>'
			return s;
		})(this.type.pageInfo,this.className);		
		this.v.bg = $('<div class="_bg"></div>');
		this.view = $(tag);
		
		this.parentView.empty();
		this.parentView.append(this.v.bg);
		this.parentView.append(this.view);
		this.v.replaceArea = this.view.find('._replaceArea:first');
		
		this.stageInit();
		this.setBtn();
		
		this.v.bg						.click(function(){ this_.stageOut() });
		this.view.find('._btn_close')	.click(function(){ this_.stageOut() });
		this.view.find('._btn_do')		.click(function(){ this_.compliteEdit(); });
	}
	
	p.compliteEdit = function(){
		var this_ = this;
		UpdateDelay.delay(function(){
			var b = (JSON.stringify(this_.getData()) != this_.editCheckData);
			this_.parent.hideInlineGridEditor(b);
		});
		this_.stageOut();
	}
	
	p.createView = function(){
		var this_ = this;
		for (var i = 0; i < this.subs.length ; i++) {
			this.subs[i].registParent(this_,this_.v.replaceArea);
		}
	}
	p.setBtn = function (){
		var this_ = this;
	}
	
	/* ---------- ---------- ---------- */
	//#データ
	p.initData 	 = function (_data,_no){
		this.v.replaceArea.html("");
		this.editCheckData = JSON.stringify(_data);
		this.gridsData = JSON.parse(this.editCheckData);
		if(this.gridsData == undefined) this.gridsData = {}
		for (var i = 0; i < this.subs.length ; i++) {
			var list = this.gridsData[this.subs[i].gridInfo.id];
			this.subs[i].initData(list);
		}		
	}
	p.getData 	 = function (){
		var o = {};
		for (var i = 0; i < this.subs.length ; i++) {
			o[this.subs[i].gridInfo.id] = this.subs[i].getData()
		}
		this.gridsData = o;
		return this.gridsData;
	}
	p.updateSubData = function (){}
	
	/* ---------- ---------- ---------- */
	//#Stage
	
	p.isOpen = false;
	p.isFirst = true;
	p.stageInit  = function (){
		this.view.hide();
	}
	p.stageIn 	 = function (){
		if(! this.isOpen){ this.isOpen = true;
			showModalView(this);
			this.view.show();
			this.parentView.delay(50).show();
			CMS_ScreenManager.setSubView(this);
			this.resize();
		}
	}
	p.stageOut 	 = function (){
		if(this.isOpen){ this.isOpen = false;
			hideModalView();
			this.view.hide();
			this.parentView.hide();
		}
	}
	p.resize 	 = function (){}	
	return c;
})();