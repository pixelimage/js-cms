/**
 * グリッド編集
 * 設定画面や、オブジェクト編集にて、使用される
 * 
 * EditableView.BaseBlockでのみ使用される
 */


EditableView.BaseGrid 	 = (function() {
	
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

	p.init = function(_gridType) {
		EditableView.currentGrid = this;
		this.gridType = _gridType;
		this.v = {}
		this.setParam();
	}
	p.setParam = function() {
		this.gridParam = this.gridType.gridData;
	}
	
	/* ---------- ---------- ---------- */
	//#registParent
	
	p.registParent 	 = function (_parent){
		this.parent = _parent;
		var tag = "";
			tag += '<div class="clearfix">'
			tag += 		this.gridParam.info.getHeadTag();
			tag += '	<div style="width:100%;">'
			tag += '		<table class="_editableTableBtns">';
			tag += '			<tr>';
			tag += '			<td style="padding-left:20px;"><i class="fa fa-level-up fa-rotate-180"></i> ';
			tag += '				<span class="_cms_btn-mini _cms_btn_active _btn_add">＋</span>';
			tag += '				<span class="_cms_btn-mini _cms_btn_red _btn_remove">ー</span>';
			tag += '				<span class="_cms_btn-mini _cms_btn_edited _btn_stateReset"><i class="fa fa-refresh "></i> <span class="_edited">編集跡</span>リセット</span>';
			tag += '			</td>';
			tag += '			<td style="text-align:right">';
			tag += '				<span class="_cms_btn_alpha _btn_wide_fit_ng"><i class="fa fa-square-o "></i> 画面フィット</span>';
			tag += '				<span class="_cms_btn_alpha _btn_wide_fit"><i class="fa fa-check-square "></i> 画面フィット</span>';
			tag += '				<span class="_cms_btn-mini _cms_btn_active _btn_restore"><i class="fa fa-reply "></i> 編集前に復帰</span>';
			tag += '				<span class="_cms_btn-mini _cms_btn_excel _btn_csv_im"><i class="fa fa-pencil"></i> 表計算ソフトで編集</span>';
			tag += '			</td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '		<div class="_tableWapper">';
			tag += '			<div class="_replaceArea _tableWapperSc"></div>';
			tag += '		</div>';
			tag += '		<div class="_replaceAreaSummary"></div>';
			tag += '		<table class="_editableTableBtns">';
			tag += '			<tr>';
			tag += '			<td style="padding-left:20px;"><i class="fa fa-level-down fa-rotate-180"></i>';
			tag += '				<span class="_cms_btn-mini _cms_btn_active _btn_add2">＋</span>';
			tag += '				<span class="_cms_btn-mini _cms_btn_red _btn_remove2">ー</span>';
			tag += '			</td>';
			tag += '			<td style="text-align:right;padding:3px 5px 0 0;">';
			tag += CMS_GuideU.getGuideTag("misk/grid","グリッド編集について");
			tag += '			</td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += 			this.gridParam.info.getFootTag();
			tag += '	</div>';
			tag += '</div>'

		this.view = $(tag);
		this.parent.v.replaceAreaGrid.append(this.view);
		this.v.head				 = this.view.find('._head');
		this.v.replaceArea		 = this.view.find('._replaceArea');
		this.v.replaceAreaSummary = this.view.find('._replaceAreaSummary');
		this.v.tableWapper		 = this.view.find('._tableWapper');
		this.v.btns				 = this.view.find('._editableTableBtns');
		
		if(this.gridType.isNarrow){
			this.view.find("._btn_wide_fit_ng").html("")
			this.view.find("._btn_wide_fit").html("")
			this.view.find("._btn_restore").html("").hide()
			this.view.find("._btn_csv_im").html("").hide()
		}
		
		//イベントアサイン
		var this_ = this;
		var U = EditableView.InputU;
		
		//グリッド編集アサイン
		this.view.find('._btn_add')			.click(function(){ this_.addDataFirst(); });
		this.view.find('._btn_add2')		.click(function(){ this_.addData(); });
		this.view.find('._btn_remove')		.click(function(){ this_.removeAnimTop(); });
		this.view.find('._btn_remove2')		.click(function(){ this_.removeAnimLast(); });
		this.view.find('._btn_restore')		.click(function(){ this_.restreData(); });
		this.view.find('._btn_stateReset')	.click(function(){ this_.resetState(); });
		this.view.find('._btn_csv_im')		.click(function(){ this_.importCSV(); });
		
		this.view.on("click","._btn_move_up"	,function(){this_.moveData(U.getNo(this),-1);})
		this.view.on("click","._btn_move_down"	,function(){this_.moveData(U.getNo(this),1);})
		this.view.on("click","._btn_dup"		,function(){this_.duplicateData(U.getNo(this));})
		this.view.on("click","._btn_cell_show"	,function(){this_.hideCol(this)})
		this.view.on('click',"._btn_wide_fit",function(){this_.setWideFit(false)})
		this.view.on('click',"._btn_wide_fit_ng",function(){this_.setWideFit(true)})
		
		//ページ遷移
		this.view.on('click',"._gridPager span",function(){ this_.openPage(U.getNo(this)) })
		
		//公開
		this.view.on("click","[data-id='publicData']"	,function(){ this_.pubDate(U.getNo(this)) });
		
		//hover時のイベントアサイン
		this.setBtn_hover()
		
		//イベントアサイン
		EditableView.InputEvent.assign(this.view,this);
		
		//CSV編集ボタン非表示
		if(this.gridParam.hideGridEdit){
			this.view.find('._btn_csv_im').css("visibility","hidden")
		}
		
		//テーブルセル イベントアサイン
		this.view.on("click","td",function(){ 
			var no = $(this).data("no")
			if(no != undefined){
				var id = $(this).data("id")
				this_.showCurrentRowClick(no,id)
			}
		});
	}
	/* ---------- ---------- ---------- */
	
	p.openPage = function (_n){
		this.state.setCurrentPage (_n)
		this.update();
	}
	
	p.pubDate = function (_n){
		var r = this.state.getRowAtPage(_n);
		var tar = this.v.trs.eq(r)
		if(tar.hasClass("_tr-hide")){
			tar.removeClass("_tr-hide");
		} else{
			tar.addClass("_tr-hide");
		}
	}
	
	/* ---------- ---------- ---------- */
	//#State 現在編集中のセルや、表示列を保持する
	//initDataよりも先にコールすること
	
	p.state;
	p.initState 		 = function (_state){
		this.state = new EditableView.BaseGridState()
		this.state.setData(_state)
	}
	p.getState = function (){
		return this.state.getData();
	}
	
	/* ---------- ---------- ---------- */
	//#Data
	
	p.initDataS =""
	p.initData 		 = function (_array,_isInit){
		if(this.state == undefined) this.initState();
		
		_isInit =  (_isInit == undefined) ? true : _isInit;
		if(_isInit) this.initDataS = JSON.stringify(_array)
		this.gridData = new EditableView.GridClass();
		if(_array == null){
			this.gridData.initRecords([]);
		} else{
			this.gridData.initRecords(_array);
		}
		
		this.update();
	}
	p.getData 		 = function (){
		return this.gridData.getRecords();
	}
	p.addDataFirst 	 = function (){
		var o = EditableView.InputU.addData(this.gridParam.cells)
		this.gridData.addRecordAt(o,0);
		this.state.setCurrentPage(0);
		this.update();
		this.parent.updateSubData();
	}
	p.addData 		 = function (){
		var o = EditableView.InputU.addData(this.gridParam.cells)
		this.gridData.addRecord(o);
		this.state.setCurrentPage(this.getLastPage());
		this.update();
		this.parent.updateSubData();
	}
	p.importCSV 	 = function (){
		this.startDirectArea();
	}
	
	p.changeData 	 = function (data,no){
		this.gridData.overrideRecordAt(data,no);
		this.parent.updateSubData();
	}
	p.removeData 	 = function (no){
		this.gridData.removeRecordAt(no);
		this.state.setCurrentRow(-1);
		this.update();
		this.parent.updateSubData();
	}
	p.removeDataLast  = function (){
		this.gridData.removeRecordLast();
		this.update();
		this.parent.updateSubData();
	}
	p.moveData 		 = function (targetNo,_move){
		this.gridData.moveRecord(targetNo,targetNo+_move);
		this.state.setCurrentRow(targetNo + _move);
		this.update();
		this.parent.updateSubData();
	}
	p.duplicateData 		 = function (targetNo){
		this.gridData.duplicateAt(targetNo);
		this.state.setCurrentRow (targetNo +1);
		this.update();
		this.parent.updateSubData();
	}
	p.restreData 		 = function (){
		this.initData(JSON.parse(this.initDataS));
	}
	p.resetState 		 = function (){
		var list = this.gridData.getRecords();
		for (var i = 0; i <  list.length ; i++) { list[i]._state = []; }
		this.update();
		this.parent.updateSubData();
	}
	
	p.getLastPage = function() {
		return Math.floor((this.gridData.getRecordLeng() - 1) / this.state.maxRow);
	}
	
	p.getLastRowNo = function() {
		return this.gridData.getRecordLeng() - 1;
	}
	
	/* ---------- ---------- ---------- */
	//#update
	//グリッドを再描画する
	
	p.update = function (){
		var _param  = this.gridParam;
		var _list  = this.gridData.getRecords();
		
		//ページ調整
		this.state.adjustPage(_list.length);
 		
 		//var t = new Date()
 		
 		//グリッドタグ取得
 		var h = this.v.replaceArea.height();
 		this.v.replaceArea.css("height",h);
		this.v.replaceArea.empty();
		
		var tag = EditableView.BaseGridU.getGridTag(_param, _list, this.state);
		try{
			this.v.replaceArea.append(tag);
		}catch( e ){
			this.v.replaceArea.append(CMS_E.PARSE_ERROR);
		}
		this.v.replaceArea.css("height","auto");
 		// console.log("Grid " , new Date().getTime() - t.getTime());
 		
		this.v.trs = this.v.replaceArea.find("tr")
		
		this.showCurrentRow(this.state.currentRow);
		this.setWideFit(this.state.fitWide);
		
		// Float_SimpleInputView.stageOut()
	}
	
	/* ---------- ---------- ---------- */
	
	//行移動、複製ボタンhover処理
	p.setBtn_hover = function (){
		var this_ = this;
		var U = EditableView.InputU;
		this.view.on('click',"._btn_delete",function(){this_.removeAnim(U.getNo(this))})
		this.view.on('mouseenter',"._btn_delete",function(){this_.removeAnimHover(U.getNo(this),true) })
		this.view.on('mouseleave',"._btn_delete",function(){this_.removeAnimHover(U.getNo(this),false) })
		this.view.on('mouseenter',"._btn_move_up",function(){this_.actionAnimUPHover(U.getNo(this),true) })
		this.view.on('mouseleave',"._btn_move_up",function(){this_.actionAnimUPHover(U.getNo(this),false) })
		this.view.on('mouseenter',"._btn_move_down",function(){this_.actionAnimDownHover(U.getNo(this),true) })
		this.view.on('mouseleave',"._btn_move_down",function(){this_.actionAnimDownHover(U.getNo(this),false) })
		this.view.on('mouseenter',"._btn_dup",function(){this_.actionAnimDup(U.getNo(this),true) })
		this.view.on('mouseleave',"._btn_dup",function(){this_.actionAnimDup(U.getNo(this),false) })
		
	}
	
 	p.actionAnimUPHover  = function(_n, _b) { this.switchClass(_b ,_n ,"_willActionUPHover")}
 	p.actionAnimDownHover  = function(_n, _b) { this.switchClass(_b ,_n ,"_willActionDownHover")}
 	p.actionAnimDup 	 = function(_n, _b) { this.switchClass(_b ,_n ,"_willActionDup")}
 	p.removeAnimHover 	 = function(_n, _b) { this.switchClass(_b ,_n ,"_willRemoveHover")}
 	
 	p.getRowTar = function(_n) { return this.v.trs.eq(this.state.getRowAtPage(_n)) }
 	p.switchClass = function(_b,_n,_id) {
		var tar = this.getRowTar(_n);
		(_b) ? tar.addClass(_id): tar.removeClass(_id);
 	}
 	
	//行削除アニメーション
	p.removeAnim = function (_n){
		var this_ = this;
		var tar = this.v.trs.eq( this.state.getRowAtPage(_n) )
		tar.addClass("_willRemove");
		setTimeout(function(){ this_.removeData(_n); },100);
	}
	//先頭の行削除アニメーション
	p.removeAnimTop = function (){
		this.state.setCurrentPage(0);
		this.update();
		this.removeAnim(0);
	}
	//最後の行削除アニメーション
	p.removeAnimLast = function (){
		this.state.setCurrentPage(this.getLastPage());
		this.update();
		this.removeAnim(this.getLastRowNo());
	}
	
	/* ---------- ---------- ---------- */
	
	//行選択の強調表示
	p.showCurrentRowClick = function (_n,_id){
		this.showCurrentRow(_n,_id)
	}
	
	// p.currentPage = 0;
	// p.currentRow = -1;
	p.currenID = ""
	p.showCurrentRow = function (_row,_id){
		//remove mark
		if(this.state.isCurrentPage()){
			var r = this.state.getRowAtPage();
			if(this.state.currentRow != -1) 	this.v.trs.eq(r).removeClass("_currentRow")
			if(this.currenID != "") 	this.v.trs.eq(r).find("td").removeClass("_currentTD")
		}
		
		this.state.setCurrentRow (_row);
		this.currenID = _id;
		
		//mark current row
		if(this.state.isCurrentPage()){
			var r = this.state.getRowAtPage();
			this.v.trs.eq(r).addClass("_currentRow");
			this.v.trs.eq(r).find("td[data-id='"+this.currenID+"']").addClass("_currentTD");
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//セルの列の表示・非表示きりかえ
	p.setWideFit = function (_b){
		if(_b){
			this.state.setFitWide(true)
			this.view.find('._btn_wide_fit').show()
			this.view.find('._btn_wide_fit_ng').hide()
			this.v.tableWapper.removeClass("_wide")
		} else{
			this.state.setFitWide(false)
			this.view.find('._btn_wide_fit').hide()
			this.view.find('._btn_wide_fit_ng').show()
			this.v.tableWapper.addClass("_wide")
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//セルの列の表示・非表示きりかえ 編集ステートに保持する
	
	p.hideCol = function (_this){
		var no = $(_this).data("no");
		var s = EditableView.BaseGridU.strintState(this.state.hideCols,no);
		this.state.setHideCols(s);
		this.update();
	}
	
	/* ---------- ---------- ---------- */
	//直接編集(表計算と連携)
	
	p.startDirectArea 	 = function (){
		var self = this;
		// Float_SimpleInputView.stageOut();
		var list = this.gridData.getRecords();
		var cells = this.gridParam.cells;
		var s = EditableView.BaseGridU.arrayToText(list,cells);
		
		Editer_ExcelView.stageIn(s,function(_s){
			setTimeout(function(){
				self.initData(EditableView.BaseGridU.textToArray(_s, cells), false);
				self.parent.updateSubData();
			},200);
		});
	}
	
	/* ---------- ---------- ---------- */
	//#M_GRID時に、タブを開いたときにコールされる
	
	p.mGrid_startEditMode  = function (){
		this.v.head.show();
		this.v.replaceArea.show();
		this.v.replaceAreaSummary.hide();
		this.v.btns.show()
	}
	p.mGrid_stopEditMode 	 = function (){
		this.v.head.hide();
		this.v.replaceArea.hide();
		this.v.replaceAreaSummary.show();
		this.v.btns.hide();
		
		var list = this.gridData.getRecords();
		this.v.replaceAreaSummary.html(EditableView.BaseGridU.getGridTagSum(this.gridParam,list));
	}
	return c;
})();

