/**
 * フォーム入力のリスト
 * 設定画面や、オブジェクト編集にて、使用される
 * 
 * EditableView.BaseBlockでのみ使用される
 * 
 */
EditableView.BaseTexts 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_gridType) {
	  this.init(_gridType);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	this.gridType
	this.param;
	//
	this.view;
	this.v
	this.parent;
	this.gridParam;
	
	p.init 			 = function(_gridType) {
		this.gridType = _gridType;
		this.v = {}
		this.setParam();
	}
	p.setParam 		 = function (){
		this.gridParam = this.gridType.textData;
	}
	
	/* ---------- ---------- ---------- */
	//#registParent
	
	p.registParent 	 = function (_parent){
		this.parent = _parent;
		var tag = '';
			tag += '<div class="clearfix">';
			tag += 		this.gridParam.info.getHeadTag();
			tag += '	<table style="width:100%;"><tr><td width="100%">';
			tag += '		<div class="_replaceArea"></div>';
			tag += '		<div class="_replaceAreaSummary"></div>';
			tag += 			this.gridParam.info.getFootTag();
			tag += '	</td>';
			tag += '	<td>' + this.gridParam.info.getGuideImageTag()+ '</td></tr></table>';
			tag += '</div>';
		this.view = $(tag);
		this.parent.v.replaceAreaTexts.append(this.view);
		this.v.head		 = this.view.find('._head');
		this.v.replaceArea = this.view.find('._replaceArea');
		this.v.replaceAreaSummary = this.view.find('._replaceAreaSummary');
		this.v.replaceAreaSummary.hide();
		
		//イベントアサイン
		EditableView.InputEvent.assign(this.view,this);
		
	}
	
	/* ---------- ---------- ---------- */
	//#Data
	
	p.initData = function(_array) {
		this.gridData = new EditableView.GridClass();
		if (_array == undefined) {
			this.gridData.initRecords([]);
			this.addData();
		} else {
			this.gridData.initRecords([_array]);
		}
		this.update();
	}
	p.getData = function() {
		return this.gridData.getRecords()[0];
	}
	p.addData = function() {
		var o = EditableView.InputU.addData(this.gridParam.cells);
		this.gridData.addRecord(o);
		this.update();
		this.parent.updateSubData();
	}
	p.changeData = function(data, no) {
		this.gridData.overrideRecordAt(data, no);
		this.parent.updateSubData();
	}
	p.removeData = function(no) {
		//
	}
	p.moveData = function(targetNo, _move) {
		//
	}
	/* ---------- ---------- ---------- */
	//#update
	
	p.update = function (){
		var list = this.gridData.getRecords();
		this.v.replaceArea.empty().append(EditableView.BaseTextsU.getTextsTag(this.gridParam,list));
	}
	
	/* ---------- ---------- ---------- */
	//#M_GRID時に、タブを開いたときにコールされる
	
	p.mGrid_startEditMode = function() {
		this.v.head.show();
		this.v.replaceArea.show();
		this.v.replaceAreaSummary.hide();
	}
	p.mGrid_stopEditMode = function() {
		this.v.head.hide();
		this.v.replaceArea.hide();
		this.v.replaceAreaSummary.show();
		//
		var list = this.gridData.getRecords();
		this.v.replaceAreaSummary.html(EditableView.BaseTextsU.getTextsTagSum(this.gridParam, list));
	}
	return c;
})();

