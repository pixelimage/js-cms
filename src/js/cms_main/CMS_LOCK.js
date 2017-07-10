
var CMS_LOCK = (function(){
	var view;
	var v = {};
	function init(){
		view = $('#CMS_LOCK');
		stageInit();
		stageIn();
		createlayout();
		setBtn();
		
		window.isLocked = CMS_LOCK.getIsLocked;
		
		if(USE_EDIT_LOCK == false){
			v.btn_lock.hide();
			v.btn_unlock.hide();
			window.isLocked = function(){
				return false;
			}
		}
		
		// if(window.location.href.indexOf("http://192.168.1.23:999") == 0){
		// 	setIsLocked(false);
		// 	return;
		// }
		setIsLocked(true);
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_btn _btn_lock " '+TIP("#+L","R")+'><i class="fa fa-lock "></i><span>ロック</span></div>';
			tag += '<div class="_btn _btn_unlock "'+TIP("#+L","R")+'><i class="fa fa-unlock-alt "></i><span>ロック</span></div>';
		view.html(tag);
	}
	
	function setBtn(){
		v.btn_lock = view.find('._btn_lock');
		v.btn_lock.click(function(){ 
			setIsLocked(false)
		});
		
		v.btn_unlock = view.find('._btn_unlock');
		v.btn_unlock.click(function(){ 
			setIsLocked(true)
		});
	}
	
	/* ---------- ---------- ---------- */
	
	var isLocked = true;
	function getIsLocked(_b){
		if(! USE_EDIT_LOCK )return;
		
		if(isLocked){
			if(_b){
				CMS_AlertLockView.stageIn()
			}
		}
		return isLocked;
	}
	function setIsLocked_toggle(){
		if(! USE_EDIT_LOCK )return;
		setIsLocked((isLocked) ? false:true);
	}
	function setIsLocked(_b){
		if(! USE_EDIT_LOCK )return;
		
		isLocked = _b;
		if(_b){
			view.removeClass("_unlock");
		} else{
			view.addClass("_unlock");
		}
		isLocked = _b;
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
		stageIn: stageIn,
		stageOut: stageOut,
		getIsLocked: getIsLocked,
		setIsLocked: setIsLocked,
		setIsLocked_toggle: setIsLocked_toggle
}
})();
