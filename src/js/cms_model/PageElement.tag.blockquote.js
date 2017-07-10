
PageElement.tag.blockquote = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.blockquote", 
		name	: "引用",
		name2	: "＜BLOCKQUOTE＞",
		inputs	: ["TEXTAREA","CLASS","CSS"],
		// cssDef	: {file:"block",key:"[引用ブロック]"}
		cssDef	: {selector:".cms-bq"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = '文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。\n<small>文書が入ります。文書が入ります。文書が入ります。</small>'
		o.attr = { css:"default" }
		o.attr.class = o.attr.css;
		return o;
	}
	
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-bq ');
		var tag = "";
		if(data == "") {
			tag += '<span class="_no-input-data">テキストを入力...</span>';
		} else{
			tag += '<blockquote ' + attr + '>' + data.split("\n").join("<br>\n") + '</blockquote>';
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-bq ');
		var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
			tag += tab + '<blockquote ' + attr+'>' + data.split("\n").join("<br>\n" + tab) + '</blockquote>\n' ;
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
