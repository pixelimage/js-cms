
var AddElements 		 = (function(){
	var view;
	var v = {}
	function init(){
		view = $('#AddElements');
		var tag = "";
			tag += '<div id="AddElementsArrow">';
			tag += '	<span class="_icon"><i class="fa fa-plus "></i>';
			tag += '	<span class="_text">ブロック追加</span>';
			tag += '</div>';
			tag += '<div id="AddElementsArrowClose">';
			tag += '	<span class="_icon"><i class="fa fa-minus "></i></span>';
			tag += '</div>';
			tag += '<div id="AddElementsView"></div>';
			tag += '<div id="AddElementsBtnSet"></div>';
		view.html(tag);
		
		v.arrow = $('#AddElementsArrow');
		v.arrowClose = $('#AddElementsArrowClose');
		 v.arrow.click(function() { show(); });
		 v.arrowClose.click(function() { hide(); });

		update();
		
		AddElementsView 	.init();
		AddElementsBtnSet 	.init();
		stageInit();
	}
	
	var prevY = -1;
	function update(){
	}
	var isShow = false;
	function show(){
		$("body").addClass("_showAddPanel");
	}
	var tID;
	function hide(){
		$("body").removeClass("_showAddPanel");
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
	function setVisible(_b){
		if(_b){
			stageIn()
		} else{
			stageOut();
		}
		
	}
	return {
		init: init,
		stageIn:stageIn,
		stageOut:stageOut,
		update: update,
		setVisible:setVisible
	}
})();
