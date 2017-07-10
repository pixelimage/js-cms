
var CMS_PageStage = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_PageStage');
		// stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = ""
			tag += '		<div id="CMS_PageListView"></div>';
			tag += '		<div id="CMS_PageListBgView"></div>';
			tag += '		<div id="CMS_PagesView"></div>';
			tag += '		<div id="CMS_IntroView"></div>';
			tag += '		<div id="AddElements"></div>';
		view.append(tag);
		
	 	CMS_PageListView.init();
	 	CMS_PageListBgView.init();
		CMS_PagesView.init();
		CMS_IntroView.init();
		AddElements.init();
	}
	
	function setBtn(){
		view.on("mousedown",function(){
			CMS_KeyManager.setType("");
		})
		
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				CMS_PageListView.stageIn();
			}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();
