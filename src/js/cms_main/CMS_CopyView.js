
var CMS_CopyView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_CopyView');
		stageInit();
		
		$("body").on("click","._cms_btn_copy_text",function(){
			var s = $(this).data("text");
			CMS_CopyView.stageIn(s);
		})
		$("body").on("click","._cms_btn_copy_page_id",function(){
			var s = $(this).text();
			CMS_CopyView.stageIn(s);
		});
	}
	
	/* ---------- ---------- ---------- */	
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_InputView,view);
		var tag = ""
		v.header.html(tag);
		
			tag = ""
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag);
		setBtn();
	}
		
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		// view.find('._btn_do').click(function(){ callback(); stageOut() });
	}
	
	/* ---------- ---------- ---------- */
		
	function update(_s){
		var tag = '<div class="_title">コピーしてください</div>'
		v.header.html(tag);
		var tag = '';
			tag +='<textarea>'+_s+'</textarea>';
		
		v.body.html(tag);
		view.find("textarea").select()
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(_s,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			callback = _callback
			update(_s);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();


