
var CMS_SidePreviewClose = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_SidePreviewClose');
		//stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = ''
			tag += '<div class="_header">';
			tag += '	<div class="_cms_btn_alpha _btn_open"><i class="fa fa-caret-left "></i> <i class="fa fa-desktop "></i> </div>';
			tag += '</div>';
			// tag += '<div class="_bottom"><div class="_core"></div></div>';
			// tag += '<div class="_bottom _b1"><div class="_core">+</div></div>';
			// tag += '<div class="_bottom _b2"><div class="_core">-</div></div>';
			
		view.append(tag);
		v.btn_open = view.find('._btn_open');
		v.btn_open.click(function() {
			CMS_StageController.openPreviewStage(true);
		});
	}
	
	function setBtn(){
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
