/**
 * PageViewとSupPabeViewで使用されるビュー
 * 
 * 	PageView...設定ページとパーツ・ひながたページにて使用
 * 	SupPabeView...フリーレイアウト時のオブジェクト編集画面や、META情報編集
 * 
 * 具体的に、BaseTEXTとBaseGridを同時に扱うビュー
 * 上に、M_GRIDがくる場合がある（現状は、カード検索のみ）
 * 
 */

EditableView.BaseBlock 		 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_gridType,_mGrid_deep,_no) {
	  this.init(_gridType,_mGrid_deep,_no);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.hasTextData = false;
	p.hasGridData = false;
	p.isActive_as_SubPage = false;
	
	p.init 			 = function(_gridType,_mGrid_deep,_mGrid_no) {
		this.gridType = _gridType;
		
		//M_GRID
		this.mGrid_deep = (_mGrid_deep != undefined) ? _mGrid_deep : 0;
		this.mGrid_no = (_mGrid_no != undefined) ? _mGrid_no : 0;
		
		this.v = {}
		this.parent;
		this.setParam()
	}
	p.setParam 		 = function (){
		this.gridInfo	 = this.gridType.gridInfo;
		
		if(this.gridType.textData !=null) this.hasTextData = true;
		if(this.gridType.gridData !=null) this.hasGridData = true;
		
		if(this.hasTextData) this.textView = new EditableView.BaseTexts(this.gridType);
		if(this.hasGridData) this.gridView = new EditableView.BaseGrid(this.gridType);
	}
	
	/* ---------- ---------- ---------- */
	//#registParent
	
	p.registParent 	 = function (_parent){
		this.parent = _parent;
	}
	
	/* ---------- ---------- ---------- */
	//#Data
	
	p.initData 		 = function (_array){
		var this_ = this;
		var className = "_editableBlock";
		if(this.mGrid_deep > 0 ) className = "_editableBlock_in_MGRID";
		var tag = '';
			tag += '<div class="'+className+'">';
			tag += 		this.gridInfo.getHeadTag();
			tag += '	<div class="_replaceAreaTexts"></div>';
			tag += '	<div class="_replaceAreaGrid"></div>';
			tag += '	<div class="_replaceAreaOutput"></div>';
			tag += 		this.gridInfo.getFootTag();
			tag += '</div>';
		this.view = $(tag)
		this.parent.v.replaceArea.append(this.view);
		this.v.replaceAreaTexts = this.view.find('._replaceAreaTexts');
		this.v.replaceAreaGrid = this.view.find('._replaceAreaGrid');
		this.v.replaceAreaOutput= this.view.find('._replaceAreaOutput');
		
		if(this.hasTextData) this.textView.registParent(this);
		if(this.hasGridData) this.gridView.registParent(this);
		
		//M_GRID
		if(this.mGrid_deep > 0 ) {
			this.view.click(function(){
				if(!this_.isActive_as_SubPage){
				this_.parent.openTab(this_.mGrid_no)
				}
			})
		}
		if(_array == null){
			if(this.gridType.gridInfo.def != undefined){
				_array = JSON.parse(JSON.stringify(this.gridType.gridInfo.def));
			} else{
				_array = {}
				_array.texts = null
				_array.grid = null;
			}
		}
		
		if(this.hasTextData) this.textView.initData(_array.texts)
		if(this.hasGridData) {
			this.gridView.initState(_array._state)
			this.gridView.initData(_array.grid)
		}
		this.updateOutput();
	}
	
	p.getData 		 = function (){
		var o = {
			texts:{},
			grid:[]
		}
		if(this.hasTextData) o.texts = this.textView.getData();
		if(this.hasGridData){
			o.grid = this.gridView.getData();
			var state = this.gridView.getState()
			if(state != null) o._state = state;
		} 
		return o;
	}
	
	/* ---------- ---------- ---------- */
	//#update
	
	p.updateSubData  = function(){
		this.parent.updateSubData();
		this.updateOutput();
	}
	p.updateOutput  = function(){
		var s = this.gridInfo.update(this.getData());
		if(s){
			this.v.replaceAreaOutput.html(s);
		}
	}
	
	/* ---------- ---------- ---------- */
	//#M_GRID時に、タブを開いたときにコールされる
	
	p.mGrid_startEditMode  = function(){
		this.isActive_as_SubPage = true;
		this.view.addClass("_active");
		if(this.hasTextData) this.textView.mGrid_startEditMode();
		if(this.hasGridData) this.gridView.mGrid_startEditMode();
	}
	p.mGrid_stopEditMode 	 = function(){
		this.isActive_as_SubPage = false;
		this.view.removeClass("_active");
		if(this.hasTextData) this.textView.mGrid_stopEditMode();
		if(this.hasGridData) this.gridView.mGrid_stopEditMode();
	}
	return c;
})();