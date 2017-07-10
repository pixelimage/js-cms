
	/* ---------- ---------- ---------- */
	//#選択要素へ、選択クラスをアサイン
	
	var prevClickNode;
	var _SN = "_selected";
	function setSelected(){
		$(prevClickNode).removeClass(_SN);
		$(currentNode).addClass(_SN);
		stageIn();
	}
	function unselect(){
		if(currentNode) $(currentNode).removeClass(_SN);
		_unselect_select_target();
	}
	
	/* ---------- ---------- ---------- */
	//選択ブロックを操作
	
	//次のブロック選択
	function selectNodeNext(_n){
		if(currentDiv){
			if(currentDiv["selectNodeNext"]){
				currentDiv.selectNodeNext(currentNo+_n);
			}
		}
		updateScrollPos();
	}
	window.selectNodeNext = selectNodeNext;
	
	//ブロックの複製
	function duplicateData(){
		currentDiv.duplicateData(currentNo);
		updateNodeNo();
		updateScrollPos();
		hilightElement();
	}
	
	//ブロックの移動
	function historyBack(){
		currentDiv.historyBack();
	}
	function moveData(_n){
		if(! currentDiv.canMove(currentNo,currentNo + _n))return;
		currentDiv.moveData(currentNo,currentNo + _n);
		currentNo += _n;
		updateNodeNo();
		updateScrollPos();
	}
	function moveDataToFirst(){
		currentDiv.moveDataToFirst(currentNo);
		currentNo = 0;
		updateNodeNo();
		updateScrollPos();
	}
	function moveDataToLast(){
		var _move = currentDiv.moveDataLast(currentNo);
		currentNo = _move;
		updateNodeNo();
		updateScrollPos();
	}
	
	//画面スクロール位置の調整
	function updateScrollPos(_b){
		if(currentNode){
			CMS_ScreenManager.updatePageScroll($(currentNode).offset().top,_b);
		}
	}
	
	/* ---------- ---------- ---------- */
	//attr
	
	function setAttr_attr		(val){ setAtt("attr",val); }
	function setAttr_id			(val){ setAtt("id",val); }
	function setAttr_css		(val){ setAtt("css",val); }
	function setAttr_style		(val){ setAtt("style",val); }
	function setAttr_preview	(val){ setAtt("preview",val); }
	function setAttr_pubFileName(val){ setAtt("pubFileName",val); }
	function setAttr_embedName	(val){ setAtt("embedName",val); }
	function setAttr_embedID	(val){ setAtt("embedID",val); }
	function setAttr_narrow		(val){ setAtt("narrow",val); }
	function setAttr_hide		(val){ setAtt("hide",val); }
	function setAttr_hidePC		(val){ setAtt("hidePC",val); }
	function setAttr_hideMO		(val){ setAtt("hideMO",val); }
	function setAttr_replaceID	(val){ setAtt("replaceID",val); }
	// function setAttr_hidePC		(val){ (val) ? setAtt("hidePC",val) : delAtt("hidePC"); }
	// function setAttr_hideMO		(val){ (val) ? setAtt("hideMO",val) : delAtt("hideMO"); }
	
	/* ---------- ---------- ---------- */
	//#タグのattributeを計算
	
	function setAtt(_s,_v){
		if(param.attr[_s] == _v)return;
		CMS_BlockAttrU.setAttr(param.attr,_s,_v);
		
		var t = blockType;
		//コンテナの背景対応
		if(t == "layout.div" && _s == "style") {
			_v = CMS_ImgBlockU.getBgStyle(param.extra) +_v;
		}
		replacePropNode.attr(_s,_v);
		if(t == "layout.cols"){
			replacePropNode.attr("class","cms-column " + CMS_BlockAttrU.clucuCss(param.attr));
			updateTagPreview();
		} else if( t == "layout.div" || t == "replace.div"){
			replacePropNode.attr("class","cms-layout " + CMS_BlockAttrU.clucuCss(param.attr));
			updateTagPreview();
		} else if( t == "layout.colDiv"){
			replacePropNode.attr("class","cms-column-col " + CMS_BlockAttrU.clucuCss(param.attr));
			updateTagPreview();
		} else {
			updateCallerView();
		}
		//レイアウトDIVのIDを変更した場合は、
		//_block_infoを探して上書きする。
		if(CMS_BlockAttrU.isMarkAttr(_s)){
			if(t ==  "layout.cols" || t == "layout.div" || t == "replace.div"){
				var tar = currentNode.find("> ._block_info");
					tar.html(CMS_BlockAttrU.getMarkTag(param.attr));
				updateTagPreview();
			}
		}
		currentDiv.updateSubData();
	}
	/*
	function delAtt(_s){
		if(param.attr[_s]){
			delete param.attr[_s];
			updateTagPreview();
			currentDiv.updateSubData();
		}
	}*/
	
	/* ---------- ---------- ---------- */
	//#選択元の要素をアップデート
	
	var tID_update
	
	function updateCallerView(){
		var cs = "_updating_block";
		if(blockType=="layout.div"){
			replacePropNode.attr("style", CMS_ImgBlockU.getBgStyle(param.extra) + param.attr["style"]);
			return;
		}
		var tar = replaceNode.find(' > *').eq(0);
			tar.addClass(cs);
			//
		if(tID_update) clearTimeout(tID_update)
		tID_update = setTimeout(function(){
			tar.removeClass(cs);
			updateCallerView_core();
		},200);
	}
	function updateCallerView_core(){
		updateTagPreview();
		//プレビュー更新
		var tar = replaceNode.find(' > *').eq(0);
		var tag = PageElement_Util.getPreview(param);
			tag = HTMLServiceU.getReplacedHTML(tag,pageParam,"",false);
			
			try{
				tar.replaceWith(tag);
			}catch( e ){
				tar.replaceWith(CMS_E.PARSE_ERROR);
			}
		//マーク更新
		var tar = replaceNode.find(' > ._block_info');
		var tag = CMS_BlockAttrU.getMarkTag(param.attr);
			tar.html(tag);
		currentDiv.updateSubData();
	}
	
	/* ---------- ---------- ---------- */
	//#タグプレビュー アップデート
	
	function updateTagPreview(){
		var s = ""
		if(JSON.stringify(param).length > 10000){
			//データが多い場合は、時間がかかるのでプレビューしない
			s = "選択ブロックのデータ量が多く、プレビューに時間がかかるため、このブロックはHTMLプレビューできません。"
		} else{
			s = PageElement_HTMLService.getTag(param);
			s = HTMLServiceU.getReplacedHTML(s,{},"",false);
			s = s.split("\n").join("");
			s = CMS_TagU.tag_2_t(s);
		}
		v.miniPreviw.html(s.substr(0,200));
	}
	
	/* ---------- ---------- ---------- */
	//ハイライト表示
	
	var hilght_tID;
	function hilightElement(){
		$("body").addClass("_copyBlock");
		if(hilght_tID) clearTimeout(hilght_tID);
		hilght_tID = setTimeout(function(){
			$("body").removeClass("_copyBlock");
		},200);
	}
	
	/* ---------- ---------- ---------- */
	//#コンテナ開閉トグル
	
	function toogleDivView(){
		InspectView.View.toggleNarrow();
	}
	
	/* ---------- ---------- ---------- */
	//#コピペ
	
	
	function deleteData(){
		currentDiv.removeData(currentNo);
		updateNodeNo();
	}
	function copyData(){
		CMS_Status.clipBord = JSON.stringify(param);
		hilightElement();
	}
	function cutData(){
		copyData();
		deleteData();
	}
	function pastData(){
		param = JSON.parse(CMS_Status.clipBord)
		AddElementsManager.addElement_by_object(param);
		updateNodeNo();
		updateScrollPos();
		hilightElement();
	}
	function pastData2(){
		param = JSON.parse(CMS_Status.clipBord)
		currentDiv.changeData(param,currentNo);
		if(currentDiv.parent.update != undefined){
			currentDiv.parent.update();
		} else{
			currentDiv.update();
		}
		updateNodeNo();
		updateScrollPos();
		hilightElement();
	}
	
	//ノードの順番情報をアップデート
	function updateNodeNo(){
		$(currentNode).data("no",currentNo);
		AddElementsManager.setData( currentDiv , currentNo);
	}
	
	function getCurrentNo(val) {
		return currentNo;
	}
	
	/* ---------- ---------- ---------- */
	//#タグ表示
	
	function showTag(){
		var this_ = this;
		var s = PageElement_HTMLService.getTag(param)
			s = HTMLServiceU.getReplacedHTML(s,{},"",false);
		Editer_TAGView.stageIn(s,function(_s){});
	}
	
	/* ---------- ---------- ---------- */
	//#JSON表示と編集
	
	function editJSON(){
		Editer_JSONView.stageIn(
			JSON.stringify(param, null, "	"),
			function(_s){
				editJSON_core(_s);
			}
		)
	}
	function editJSON_core(_s){
		try{
			var d = JSON.parse(_s);
		}catch( e ){
			alert("データ形式が正しくありません。");
			return false;
		};
		if(_s != null){
			UpdateDelay.delay(function(){
				var o = JSON.parse(_s);
				param = o;
				currentDiv.changeData(param,currentNo);
				if(currentDiv.parent.update != undefined){
					currentDiv.parent.update();
				} else{
					currentDiv.update();
				}
			});
		}
	}
	
	/* ---------- ---------- ---------- */
	//#JSON表示と編集
	
	function addToMyBlock(){
	}
	
	/* ---------- ---------- ---------- */
	//#Stage
	
	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	
	function stageIn() {
		if(isFirst){
			var w = view.width();
			var h = view.height();
			
			var offsetX = 70;
			var offsetY = 160;
			if(CMS_StatusW > 1300) {
				offsetX = 140;
			}
			
			view.css("left",( CMS_StatusW - w - offsetX ) +"px");
			view.css("top", offsetY + "px");
			isFirst = false;
		}
		updatePosition()
		view.show();
	}
	function updatePosition() {
		var W = CMS_StatusW
		var H = CMS_StatusH
		
		var l = Number(view.css("left").split("px").join(""));
		var t = Number(view.css("top").split("px").join(""));
		var w = view.width();
		var h = view.height();
		
		if(l + 50 > W) view.css("left",(W - w -50) +"px");
		if(t + 50 > H) view.css("top",(H - h -20) +"px");
	}

	function stageOut() {
		unselect();
		currentNode = null;
		view.hide();
	}

	function stageOut_core() {
		view.hide();
	}
	
	/* ---------- ---------- ---------- */
	//ひな形ブロックリロードのみで使用
	
	function refreshBlock(){
		hilightElement();
		setTimeout(function(){
			currentDiv.update();
		},100);
	}
	
	/* ---------- ---------- ---------- */
	
	//プリセットステージで使用。
	//ブロックが選択されたら、コールする
	
	var select_target;
	function addSelectCallback(_tar){
		select_target = _tar;
	}
	function resetSelectCallback(){
		select_target = null;
	}
		
	function _select_select_target(){
		if(select_target){
			if(select_target.select) select_target.select();
		}
	}
	function _unselect_select_target(){
		if(select_target){
			if(select_target.unselect) select_target.unselect();
		}
	}
	/* ---------- ---------- ---------- */

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		doCommand: doCommand,
		
		setPageData: setPageData,
		setData: setData,
		setData_DoubleClick: setData_DoubleClick,
		
		setAtt 	: setAtt,
		setAttr_attr : setAttr_attr,
		setAttr_id : setAttr_id,
		setAttr_css : setAttr_css,
		setAttr_style : setAttr_style,
		setAttr_preview : setAttr_preview,
		setAttr_pubFileName : setAttr_pubFileName,
		setAttr_embedName : setAttr_embedName,
		setAttr_embedID	: setAttr_embedID,
		setAttr_narrow 	: setAttr_narrow,
		setAttr_hide	: setAttr_hide, 
		setAttr_hidePC 	: setAttr_hidePC,
		setAttr_hideMO 	: setAttr_hideMO,
		setAttr_replaceID 	: setAttr_replaceID,
		
		updateScrollPos: updateScrollPos,
		updateCallerView: updateCallerView,
		getCurrentNo: getCurrentNo,
		updateBodyH: updateBodyH,
		refreshBlock: refreshBlock,
		
		addSelectCallback:addSelectCallback,
		resetSelectCallback:resetSelectCallback
	}
})();
