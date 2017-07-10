
PageElement.tag.code = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.code", 
		name	: "コード",
		name2	: "＜CODE＞",
		inputs	: ["CAPTION","CLASS","CSS"],
		// cssDef	: {file:"block",key:"[コードブロック]"}
		cssDef	: {selector:".cms-code"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = 'var s = "hello world!";'
		o.attr = { css:"default " }
		o.attr.class = o.attr.css;
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-code ');
		var extra = _o.extra;
		
		var tag = "";
		if(data == "") {
			tag += '<span class="_no-input-data">テキストを入力...</span>';
		} else{
			tag += '<div ' + attr + '>\n';
			tag += PageElement_Util.getCaption(extra);
			tag += '<code>' + _core(data) + '</code>\n';
			tag += '</div>\n';
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-code ');
		var extra = _o.extra;
		
		var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
			tag += '<div ' + attr + '>\n';
			tag += PageElement_Util.getCaption(extra);
			tag += '<code>' + _core(data) + '</code>\n';
			tag += '</div>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	function _core(t){
		t = t.split("&").join("&amp;");
		t = t.split("<").join("&lt;");
		t = t.split(">").join("&gt;");
		t = t.split("\t").join('<span class="tag">	</span>');
		t = t.split("\n").join("<br>\n");
		return t;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
