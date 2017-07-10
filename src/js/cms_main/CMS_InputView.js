
var CMS_InputView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_InputView');
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
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do"><i class="fa fa-check"></i> OK</div> ';
		v.footer.html(tag);
		setBtn();
	}
		
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.find('._btn_do').click(function(){ done(); stageOut(); });
	}
	
	/* ---------- ---------- ---------- */
	
	var defParam =  {}
	function update(_param){
		defParam = JSON.parse(JSON.stringify(_param));

		var tag = '<div class="_title">'+_param.title+'</div>'
		v.header.html(tag);
		var tag = '';
			tag += '<div class="_read">'+_param.read+'</div>'
		
		//single
		if(_param.type == "single"){
			tag +='<input>';
		}
		//single以外は、未実装
			tag += '<div class="_notes">'+_param.notes+'</div>'
		v.body.html(tag);
		view.find("input").val(_param.val).select();
	}
	
	/* ---------- ---------- ---------- */
		
	function done(){
		var val = view.find("input").val();
		callback(val);
		
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(_param,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			callback = _callback
			update(_param);
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


