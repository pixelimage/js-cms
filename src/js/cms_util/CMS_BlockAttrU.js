
var CMS_BlockAttrU = (function(){
	var view;
	var v = {};
	
	function getHTMLArrs(_attr) {
		var attr = clone(_attr);
		var s = " ";
		attr["class"] = defaultVal(attr["class"], " ");
		if (attr["style"]) {
			attr["style"] = attr["style"].split("\n").join(" ")
		}
		for (var n in attr) {
			var b = true;
			if (n == "link") b = false;
			if (n == "narrow") b = false;
			if (n == "hidePC") b = false;
			if (n == "hideMO") b = false;
			if (n == "css") b = false;
			if (n == "pubFileName") b = false;
			if (n == "embedName") b = false;
			if (n == "embedID") b = false;
			if (n == "attr") b = false;
			if (!attr[n]) b = false;
			if (b) s += n + '="' + attr[n] + '" ';
		}
		if (attr.hidePC == true) s = s.split('class="').join('class="cms-sp ');
		if (attr.hideMO == true) s = s.split('class="').join('class="cms-pc ');
		if (attr.attr) s += attr.attr;
		return s;
	}
	
	/* ---------- ---------- ---------- */

	function setAttr(_attr,_s,_v){
		_attr[_s] 	 = _v;
		_attr["class"] = clucuCss(_attr);
	}
	
	/* ---------- ---------- ---------- */

	function getStyle(_attr){
		var s = defaultVal(_attr["style"]);
		return s;
	}
	
	function getClass(_attr){
		var s = defaultVal(_attr["css"]);
		if( defaultVal(_attr["hide"] )) s+=" _hide-element";
		if( defaultVal(_attr["narrow"] )) s+=" _narrow-element";
		return s;
	}
	
	function clucuCss(_attr){
		var s  =""
		if(_attr["css"]) s += _attr["css"];
		if(_attr["hide"]) s += " _hide-element";
		if(_attr["narrow"]) s += " _narrow-element";
		return s;
	}
	
	/* ---------- ---------- ---------- */

	function isMarkAttr(_s){
		if(_s == "id") return true;
		if(_s == "pubFileName") return true;
		if(_s == "embedName") return true;
		if(_s == "embedID") return true;
		if(_s == "hide") return true;
		if(_s == "hidePC") return true;
		if(_s == "hideMO") return true;
		if(_s == "replaceID") return true;
		if(_s == "replaceTitle") return true;
		return false;
	}
	function getMarkTag(_attr,isInit){
		var _id  	= get_id(_attr);
		var _pub  	= get_pubFileName(_attr);
		var _embed1 = get_embedName(_attr);
		var _embed2 = get_embedID(_attr);
		
		var _hide 	= get_hide(_attr);
		var _hidePC = get_hidePC(_attr);
		var _hideMO = get_hideMO(_attr);
		
		var _replaceID = get_replaceID(_attr);
		var _replaceTitle = get_replacTitle(_attr);
		
		var s = "";
		if(_id) s += '<div class="_id">#'+_id+'</div>'
		if(_hide) s += '<div class="_pub">非公開</div>';
		if(_hidePC) s += '<div class="_pub">PC非表示</div>';
		if(_hideMO) s += '<div class="_pub">スマホ非表示</div>';
		
		if(_pub) {
			var u = CMS_Path.SITE.REL +_pub;
			s += '<div class="_pub">'
			s += '	ブロックを';
			s += '	<span class="_icon_dir_mini"></span>'
			s += '	<span class="_btn _btn_link" data-command="export_link" data-extra="'+u+'">' + _pub +" "+Dic.I.External +'</span>';
			s += '	として ... ';
			//inspect_export
			s += '	<span class="_btn _btn_fill" data-command="export">書出す <i class="fa fa-angle-right "></i> <i class="fa fa-file-text"></i></span>';
			s += '</div>'
		}
		if(_embed1 && _embed2) {
			var u = CMS_Path.SITE.REL +_embed1;
			s += '<div class="_embed">'
			s += '	ブロックを埋込み先 ';
			s += '	<span class="_icon_dir_mini"></span>'
			s += '	<span class="_btn _btn_link" data-command="export_link" data-extra="'+u+'">' + _embed1 +' '+Dic.I.External+' <small>&lt;'+ _embed2 + '&gt;</small></span>';
			s += '	へ ... ';
			//inspect_embed
			s += '	<span class="_btn _btn_fill" data-command="embed">埋込む <i class="fa fa-sign-in"></i></span>';
			s += '</div>'
		}
		//
		var tag = '';
			tag += '<div class="_left_area">' + s + '</div>'
		if(_replaceID){
			tag += '<div class="_right_area">'
			tag += '	<div class="_replace_area">'
			tag += '		<div class="_replace_id">{{'+_replaceID+'}}</div>'
			tag += '		<div class="_replace_title">'+_replaceTitle+'</div>'
			tag += '	</div>'
			tag += '</div>'
		}
		
		if(isInit) {
			tag = '<div class="_block_info">' + tag + '</div>'
		}
		return tag;
	}
	
	function getCommandTag(_type){
		if(_type == "tag.margin")return "";
		if(_type == "tag.anchor")return "";
		
		var icon = (function(_type){ 
		   var s = Dic.I.Edit;
			if(_type == "tag.img") s=  Dic.I.Grid;
			if(_type.indexOf("object.") == 0) s= Dic.I.Grid;
			return s;
		})(_type);
		
		var s = ""
			s += '<div class="_block_command">'
			// s += '	<div class="_text">操作ヒント &gt; 編集：Ctrl-Enter or ダブルクリック , 選択変更：[↑][↓] , 移動：ドラッグ</div>'
			s += '	<div class="_text">ヒント：ダブルクリックでも編集できます。右クリックでコンテクストメニューを表示します。</div>'
			s += '	<div class="_btn" data-command="openDetail"><span><span>'+icon+' 編集</span></span></div>'
			s += '</div>'
		return s;
	}

	/* ---------- ---------- ---------- */

	function get_style		(_attr)	{ return defaultVal(_attr["style"],""); }
	function get_css		(_attr)	{ return defaultVal(_attr["css"],""); }
	function get_class		(_attr)	{ return defaultVal(_attr["class"],""); }
	function get_id			(_attr)	{ return defaultVal(_attr["id"],""); }
	function get_attr		(_attr)	{ return defaultVal(_attr["attr"],""); }
	function get_preview	(_attr)	{ return defaultVal(_attr["preview"],""); }
	
	function get_narrow		(_attr)	{ return defaultVal(_attr["narrow"],false); }
	function get_hide		(_attr)	{ return defaultVal(_attr["hide"],false); }
	function get_hidePC		(_attr)	{ return defaultVal(_attr["hidePC"],false); }
	function get_hideMO		(_attr)	{ return defaultVal(_attr["hideMO"],false); }
	
	function get_pubFileName(_attr) { return defaultVal(_attr["pubFileName"] , "" ) }
	function get_embedName	(_attr) { return defaultVal(_attr["embedName"], "" ) }
	function get_embedID	(_attr) { return defaultVal(_attr["embedID"] , "" ) }
	function get_replaceID	(_attr) { return defaultVal(_attr["replaceID"] , "" ) }
	function get_replacTitle	(_attr) { return defaultVal(_attr["replaceTitle"] , "" ) }
		
	 return {
		getHTMLArrs: getHTMLArrs,
		setAttr:setAttr,
		getStyle:getStyle,
		getClass:getClass,
		clucuCss: clucuCss,
		isMarkAttr: isMarkAttr,
		getMarkTag: getMarkTag,
		getCommandTag: getCommandTag,
		//
		get_style		: get_style,
		get_css			: get_css,
		get_class		: get_class,
		get_id			: get_id,
		get_attr		: get_attr,
		get_preview		: get_preview,
		get_narrow		: get_narrow,
		get_hide		: get_hide,
		get_hidePC		: get_hidePC,
		get_hideMO		: get_hideMO,
		get_pubFileName	: get_pubFileName,
		get_embedName	: get_embedName,
		get_embedID		: get_embedID,
		get_replaceID	: get_replaceID,
		get_replacTitle	: get_replacTitle
		
	 }
})();