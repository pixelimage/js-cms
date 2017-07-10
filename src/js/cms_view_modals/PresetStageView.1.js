
var PresetStageView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#PresetStageView');
		
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){

		var tag = "";
			tag += '<div class="_bg"></div>';
			tag += '<div class="_modalBox">';
			tag += '	<div class="_body">';
			tag += '		<div id="PresetStage_PagesView"></div>';
			tag += '	</div>';
			tag += '	<div class="_navi">';
			tag += '		<div id="PresetStage_PageListView"></div>';
			tag += '	</div>';
			tag += '	<div class="_btn_add_dis">配置<br>する</div>';
			tag += '	<div class="_btn_add ">配置<br>する</div>';
			tag += '</div>';
			tag += '<div class="_btn_close">閉じる</div>';
		view.html(tag);
		
		//
		PresetStage_PagesView.init();
		PresetStage_PageListView.init();
		PresetStage_PageListView.stageIn();
		
		v.btn_disable = view.find("._btn_add_dis");
		v.btn_active = view.find("._btn_add");
		v.btn_active.hide();
		
		setBtn();
	}

	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.find('._btn_add').click(function(){ addBlock() });
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	function openPage(_param){
		PresetStage_PagesView.stageOut();
		PresetStage_PagesView.stageIn(_param);
	}
	
	function addBlock(){
		window.sc.copyCurrent();
		stageOut();
		setTimeout(function(){
			var param = JSON.parse(CMS_Status.clipBord);
			AddElementsManager.addElement_by_object(param);
		},200);
		//ページが空のときや、選択がないときも、実装する
	}

	function select(){
		v.btn_disable.hide()
		v.btn_active.show()
	}
	function unselect(){
		v.btn_disable.show()
		v.btn_active.hide()
	}

	function save (){ 
		PresetStage_PagesView.save();
	}
		
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
		
			if(isFirst){
				createlayout();
			}
			unselect();
			
			CMS_KeyManager.setType("preset");
			//プリセットビュー表示時は、ページステートOFF
			EditableView.PageViewState.setOff();
			InspectView.stageOut();
			InspectView.addSelectCallback(PresetStageView);
			CMS_Header.stageOut();
			view.show();
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
			
			CMS_KeyManager.setType("");
			InspectView.stageOut();
			InspectView.resetSelectCallback();
			CMS_Header.stageIn();
			//ページステートもとに戻す 
			EditableView.PageViewState.setOn();
			
		}
	}

	return {
		init: init,
		openPage: openPage,
		select: select,
		unselect: unselect,
		save: save,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();


