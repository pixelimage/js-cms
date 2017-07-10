var Editer_ExcelView 	 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Editer_ExcelView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	var codeminerEditor;
	var codeminerView;
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Editer_ExcelView,view);
		var tag = ""
			tag = '<div class="_title">表計算ソフト用データ</div>'
		v.header.html(tag);
		
			tag = ""
			tag += '<div class="_read">以下のテキストエリアのテキストを表計算ソフトにコピペして編集してください。<br>';
			tag += '表計算ソフトでの編集がおわったら、セルを選択して、以下のエリアにコピペしてください。<br>';
			tag += 'なお、レイアウトモードの画像セルの場合は、ランダムIDを書き出します。表計算ソフト上では編集はできません。</div>';
			tag += '<div class="_texts _text-editor ">'
			tag += '	<textarea class="codemirror"></textarea>'
			tag += '</div>';
		v.body.html(tag)
		
		v.textEditor = view.find('._text-editor');
		v.textEditor.addClass(CodeMirrorU.getColorType("json"));
		
		var changeFirst = true
		codeminerEditor = CodeMirrorU.createEditor(view.find("textarea").get(0),"text",false);
		codeminerEditor.foldCode(CodeMirror.Pos(0,0));
		codeminerView = view.find(".CodeMirror");
		
			tag = ""
			tag += '<div class="_cms_btn _btn_close">キャンセル</div> ';
			tag += '<div class="_cms_btn _cms_btn_excel _btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 編集完了</div> ';
		v.footer.html(tag);
		
		v.textarea		 = view.find('textarea');
		setBtn();
	}
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		v.btn_do = view.find('._btn_do');
		v.btn_do.click(function(){ 
			callback(getData());
			stageOut();
		});
	}
	
	function update(_s){
		codeminerEditor.setValue(_s);
		// codeminerEditor.selectAll();
		codeminerEditor.execCommand("selectAll");
	}
	
	/* ---------- ---------- ---------- */
	//class style

	function getData(){
		return codeminerEditor.getValue();
	}
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		callback(getData());
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
			var h = $(window).height() -400;
			codeminerView.height(h);
		}
	}
	
	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		resize: resize,
		compliteEdit: compliteEdit
	}

})();
