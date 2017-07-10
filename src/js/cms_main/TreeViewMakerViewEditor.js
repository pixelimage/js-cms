
var TreeViewMakerViewEditor 	 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#TreeViewMakerViewEditor');
		stageInit();
		// stageIn("test",function(){},[800,200]);
	}
var ids = [
["{ID}","IDに置き換えられます"],
["{NAME}","ラベル名に置き換えられます"],
["{NAME[0]}","ラベル名にカンマ区切り(,)が入ってる場合、1つめのラベル名に置き換えられます"],
["{NAME[1]}","ラベル名にカンマ区切り(,)が入ってる場合、2つめのラベル名に置き換えられます"],
["{NAME[2]}","ラベル名にカンマ区切り(,)が入ってる場合、3つめのラベル名に置き換えられます"],
["{NAME[3]}","ラベル名にカンマ区切り(,)が入ってる場合、4つめのラベル名に置き換えられます"],
["{NAME[4]}","ラベル名にカンマ区切り(,)が入ってる場合、5つめのラベル名に置き換えられます"],
["{NAME.noTag}","ラベル名にタグが入ってる場合、タグを取り除いた値に置き換えられます"],
["{HREF}"	,"リンク先に置き換えられます"],
["{TAR}"	,"リンクターゲットに置き換えられます"],
["{TAG}"	,"タグに置き換えられる予定です"],
["{READ}"	,"ページ説明に置き換えられる予定です"],
["{DATE}"	,"日付に置き換えられる予定です"],

["{SUM}"	,"グループ配下のページ数を表示する"],
["{NO}"		,"階層内での連番に置き換えられます"],
["{LEVEL}"	,"階層のレベルに置き換えられます"],
["{CSS.B}"	,"CMSでデフォルトで設定されているボタンクラス ( _btn_default ) に置き換えられます"],
["{HOME}"	,"ホームページのリンクパスに置き換えられます"],

["{I.D}"	,'<i class="fa fa-lg fa-folder "></i> アイコンに置き換えられます'],
["{I.D2}"	,'<i class="fa fa-lg fa-folder-open "></i> アイコンに置き換えられます'],
["{I.P}"	,'<i class="fa fa-lg fa-caret-right "></i> アイコンに置き換えられます'],
["{I.P2}"	,'<i class="fa fa-lg fa-chevron-circle-right "></i> アイコンに置き換えられます'],
["{I.P3}"	,'<i class="fa fa-lg fa-angle-right "></i> アイコンに置き換えられます'],
["{I.T}"	,'<i class="fa fa-lg fa-tag "></i> アイコンに置き換えられます'],
["{I.B}"	,'<i class="fa fa-lg fa-external-link-square "></i> リンクターゲットが_blankの場合、別ウィンドウアイコンに置き換えられます'],
]

	var ids2 = [
	 ["{HTML}","見出しテンプレで使用し、HTMLに置き換えられます"]
	]
	function createlayout(){
		var tag = ""
			tag += '<div class="_btn_close"></div>';
			tag += '<div class="_body"></div>'
			tag += '<div class="_cms_anno"></div>'
			tag += '<div class="_typeDef">'
			tag += '	<div class="_presets">'
			tag += '		<div class="_btn_preset" data-id="reset"><i class="fa fa-times "></i> リセット</div>'
			tag += '		<div class="_btn_preset" data-id="link1"><i class="fa fa-code "></i> リンク1</div>'
			tag += '		<div class="_btn_preset" data-id="link2"><i class="fa fa-code "></i> リンク2</div>'
			tag += '	</div>'
			tag += '	<div class="_snippets">'
			tag += '		<div class="_title"><i class="fa fa-caret-down "></i> 置き換えキー</div>'
			tag += '		<div class="_inner">'
			tag += '		<div class="_p">グループ、ページ設定画面で設定した値などを取得できます。</div>'
		
			for (var i = 0; i <  ids.length ; i++) {
				tag += '<div class="_btn_rep_id">'+ids[i][0]+'</div>'
			}
			tag += '		<div class="_p _disc"></div>'
			tag += '		</div>'
			tag += '	</div>'
			tag += '</div>'
			tag += '<div class="_typeHtml">'
			tag += '	<div class="_presets">'
			tag += '		<div class="_btn_preset" data-id="reset"><i class="fa fa-times "></i> リセット</div>'
			tag += '	</div>'
			tag += '	<div class="_snippets">'
			tag += '		<div class="_title"><i class="fa fa-caret-down "></i> 置き換えキー</div>'
			tag += '		<div class="_inner">'
			for (var i = 0; i <  ids2.length ; i++) {
				tag += '<div class="_btn_rep_id" >'+ids2[i][0]+'</div>'
			}
			tag += '		</div>'
			tag += '	</div>'
			tag += '</div>'
		view.html(tag);
		v.body = view.find('._body');
		
		v.body.html(CMS_FormU.getTextarea("","html"))
		
		v.textarea	 = view.find('textarea');
		v._btn_close = view.find('._btn_close');
		v.cms_anno = view.find('._cms_anno');
		
		
		v.typeDef = view.find('._typeDef');
		v.typeHtml = view.find('._typeHtml');
		
		v.btn_rep_id = view.find('._btn_rep_id');
		v.btn_rep_id.click(function(){ appendID($(this).text())});
		v.btn_rep_id.hover(function(){ showPresetDisc( $(this).text()  )});
		v.disc = view.find('._disc');
		
		v.btn_preset = view.find('._btn_preset');
		v.btn_preset.click(function(){ presetText($(this).data("id"))});
		setBtn();
	}
	function setBtn(){
		v._btn_close.click(function(){  stageOut() });
		v.textarea.keyup(function(){ getData(); });
	}
	
	/* ---------- ---------- ---------- */
	
	function showPresetDisc(_s1){
		var desc = ""
		for (var i = 0; i <  ids.length ; i++) {
			if(_s1 == ids[i][0]) desc = ids[i][1];
		}
		v.disc.html('<b>' + _s1 + '</b>' + " : " + desc);	
	}
	function presetText(_s){
		var s = ""
		if(_s =="link1"){
			s = '<a href="{HREF}" target="{TAR}">{NAME}</a>'
		}
		if(_s =="link2"){
			s = '<a href="{HREF}" target="{TAR}" class="{CSS.B}"><span class="t1">{NAME.1}</span><span class="t2">{NAME.2}</span></a>'
		}
		v.textarea.val(s).keyup();
	}
	function appendID(_s){
		var s = v.textarea.val();
		v.textarea.val(s + _s).keyup();
	}
	
	/* ---------- ---------- ---------- */
	
	// var defS = ""
	function setValue(_s,_type){
		v.textarea.focus().val(_s);
		//
		v.typeDef.hide();
		v.typeHtml.hide();
		if(_type == "html"){
			v.typeHtml.show();
		} else{
			v.typeDef.show();
		}
	}
	function getData(){
		var s = v.textarea.val();
		callback_main(s);
	}
	
	var tID
	function callback_main(s){
		if(tID)clearTimeout(tID);
		tID = setTimeout(function(){
			callback(s);
		},200);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback
	function stageIn(_s,_callback,_xy,_type){
		if(view === undefined) return;
		if(isFirst){
			createlayout();
			isFirst = false;
		}
		callback = _callback
		view.show();
		// if(CMS_StatusW-300 < _xy[0]){_xy[0] = CMS_StatusW-300}
		view.css("left",_xy[0]+25);
		view.css("top",_xy[1]+15);
		setValue(_s,_type)
	}
	function stageOut(){
		if(view === undefined) return;
		view.hide();
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();//