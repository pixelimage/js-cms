
var CMS_AlertLockView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_AlertLockView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */	
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_bg"></div>'
			tag += '<div class="_modalBox">'
			tag += '<div class="_read">更新ロックを解除してください<br><i class="fa fa-2x fa-lock "></i> <i class="fa fa-long-arrow-right "></i>  <i class="fa fa-2x fa-unlock-alt "></i>  </div>'
			// tag += '<div class="_btn_close">閉じる</div>'
			tag += '<div class="_mark"></div>'
			tag += '</div>'
		view.html(tag)
		setBtn();
	}
		
	function setBtn(){
		view.click(function(){ stageOut() });
		// view.find('._btn_close').click(function(){ stageOut() });
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	var tID
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			setTimeout(function(){
				view.addClass("_show");
			},10);
			if(tID) clearTimeout(tID)
			tID = setTimeout(function(){
				stageOut()
			},3500);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
			view.removeClass("_show");
			if(tID)clearTimeout(tID)
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();
