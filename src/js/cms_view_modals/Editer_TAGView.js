var Editer_TAGView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Editer_TAGView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	var codeminerEditor;
	var codeminerView;
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Editer_TAGView,view);
		var tag = "";
			tag = '<div class="_title">生成されるHTMLの確認</div>';
		v.header.html(tag);
		
			tag = ""
			tag += '<div class="_read">ページ公開時に生成される、選択要素のHTMLを表示・確認できます。<span class="_colorRed" style="background:yellow;">編集はできません。</span></div>';
			tag += '<div class="_texts _text-editor ">'
			tag += '	<textarea class="codemirror"></textarea>'
			tag += '</div>';
		v.body.html(tag);
		
		v.textEditor = view.find('._text-editor');
		v.textEditor.addClass(CodeMirrorU.getColorType("html"));
		
		var changeFirst = true
		codeminerEditor = CodeMirrorU.createEditor(view.find("textarea").get(0),"html",true);
		codeminerView = view.find(".CodeMirror");
		
			tag = "";
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag);
		
		v.textarea		 = view.find('textarea');
		setBtn();
	}
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
	}
	
	function update(_s){
		codeminerEditor.setValue(_s);
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
	}
	var callback
	function stageIn(_s,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback;
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
			
			update(_s);
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
			var h = $(window).height() -250;
			codeminerView.height(h)
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize,compliteEdit:compliteEdit }
})();
