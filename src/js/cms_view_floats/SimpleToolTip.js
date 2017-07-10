
var SimpleToolTip = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#SimpleToolTip');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
	}
	
	function setBtn(){
	}
	
	
	/* ---------- ---------- ---------- */
	
	function update(_xy,_html){
		view.css("left",_xy.x)
		view.css("top",_xy.y)
		view.html(_html)
	}
	
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_xy,_html){
		// if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
			update(_xy,_html);
		// }
	}
	function stageOut(){
		// if(isOpen){ isOpen = false;
			view.hide();
		view.html("")
		// }
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();