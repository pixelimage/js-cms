var CMS_AlertView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_AlertView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */	
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_InputView,view);
		var tag = ""
		v.header.html(tag);
		
			tag = ""
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">キャンセル</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do"><i class="fa fa-check"></i> OK</div> ';
		v.footer.html(tag);
		setBtn();
	}
		
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.find('._btn_do').click(function(){ callback(); stageOut() });
	}
	
	/* ---------- ---------- ---------- */
		
	function update(_s,_s2){
		
		
		var tag = '<div class="_title">'+_s+'</div>'
		v.header.html(tag);
		var tag = '<div class="_p">'+_s2+'</div>'
		v.body.html(tag);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(_s,_s2,_callback){
		if(!view){
			$("body").append('<div id="CMS_AlertView" class="_modalView"></div>');
			init();
		}
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			callback = _callback;
			if(callback ==undefined) callback = function(){}
			update(_s,_s2);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();

