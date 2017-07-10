var Float_DateInputView 	 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Float_DateInputView');
		stageInit();
	}
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_btn_close"></div>';
			tag += '<div class="_body"><div class="_date"></div></div>'
		view.html(tag);
		v.body = view.find('._body');
		v.date = view.find('._date');
		//
		v._btn_close = view.find('._btn_close');
		setBtn();
	}
	function setBtn(){
		v._btn_close.click(function(){  stageOut() });
	}
	
	/* ---------- ---------- ---------- */
	
	var curretDate = ""
	function setValue(_s){
		curretDate = _s;
		v.date.datetimepicker({
			value:curretDate,
			format:'Y/m/d H:i',
			inline:true,
			lang:'ja',
			onChangeDateTime: function( dp,$input ){
				updateValue(dp,$input)
  			}
		});
	}
	
	function updateValue(dp,$input){
	    curretDate = $input.val();
		callback(curretDate);
	    stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback
	function stageIn(_s,_callback,_xy){
		if(view === undefined) return;
		callback = _callback;
		if(isFirst){
			createlayout();
			isFirst = false;
		}
		view.show();
		if(CMS_StatusW-300 < _xy[0]){_xy[0] = CMS_StatusW-300}
		view.css("left",_xy[0]);
		view.css("top",_xy[1]);
		setValue(_s);
	}
	function stageOut(){
		if(view === undefined) return;
		view.hide();
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();//

