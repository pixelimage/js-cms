
var Editer_CodeCopyView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Editer_CodeCopyView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Editer_CodeCopyView,view);
		var tag = "";
			tag = '<div class="_title">コードコピー</div>';
		v.header.html(tag);
		
			tag = "";
			tag += '<div class="_read"></div>';
			tag += '<textarea id="codeFrame" wrap="off" readonly></textarea> ';
		v.body.html(tag);
		v.read = v.body.find("._read");
		
		v.codeFrame = view.find('#codeFrame');
		
			tag = "";
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag);
		
		v.textarea		 = view.find('textarea');
		setBtn();
	}
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
	}
	
	function update(_type,_a){
		if(_type == "formMail"){
			updateFormMail(_a);
		}
	}
	
	function updateFormMail(_a){
		v.read.html("以下のコードを、<b>php/mail.php</b>へコピーし保存してください。");
		var temp = CMS_Data.CodeDic.getCode("mailform.php");
			temp = temp.split("{MAIL}").join(_a[0]);
			temp = temp.split("{FORMS}").join(_a[1]);
		v.codeFrame.val(temp);
	}
	
	/* ---------- ---------- ---------- */
	//class style

	function getData(){
		return ""
	}
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
		createlayout();
	}
	var callback
	function stageIn(_type,_a,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback;
			view.show();
			if(isFirst){}
			isFirst = false;
			update(_type,_a);
			resize();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}
	function resize(){
		if(isOpen){
			var h = $(window).height() -300;
			v.codeFrame.height(h);
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize,compliteEdit:compliteEdit }
})();
