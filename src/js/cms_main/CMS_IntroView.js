var CMS_IntroView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_IntroView');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
	}
	
	function createlayout(){
		var tag = ''
			tag += '<div class="_core">'
			tag += '<p>←左のメニューから、サイト設定やページ作成・編集などの操作できます</p>'
			//tag += '<div class="_guide"><i class="fa fa-arrow-up "></i> 初めての方は、ガイドを確認してください。</div>'
			tag += '</div>'
		view.append(tag)
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
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