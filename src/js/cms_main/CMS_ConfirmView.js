var CMS_ConfirmView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_ConfirmView');
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
			tag += '<div class="_cms_btn _cms_btn_red _btn_do" '+TIP_ENTER+' ><i class="fa fa-trash-o"></i> 削除</div> ';
		v.footer.html(tag);
		v.btn_active = view.find("._cms_btn_active")
		v.btn_red = view.find("._cms_btn_red")
		setBtn();
	}
		
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.find('._btn_do').click(function(){ callback(); stageOut() });
	}
	
	/* ---------- ---------- ---------- */
		
	function update(_s,_s2,_isDell){
		var tag = '<div class="_title">'+_s+'</div>'
		v.header.html(tag);
		var tag = '<div style="font-size:18px">'+_s2+'</div>'
		v.body.html(tag);
		
		v.btn_red.hide()
		v.btn_active.hide()
		if(_isDell == "DELL"){
			v.btn_red.show()
		} else{
			v.btn_active.show()
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(_s,_s2,_callback,_isDell){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			callback = _callback
			update(_s,_s2,_isDell);
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

