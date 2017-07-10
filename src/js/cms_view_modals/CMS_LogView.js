var CMS_LogView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_LogView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function log(_s){
		stageIn();
		view.html(_s);
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
	return {
		init: init,
		log: log,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();
