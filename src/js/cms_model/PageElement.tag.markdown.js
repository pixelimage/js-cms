
PageElement.tag.markdown = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.markdown", 
		name	: "フリーテキスト",
		name2	: "＜Markdown＞",
		inputs	: ["CLASS","CSS"],
		// cssDef	: {file:"block",key:"[フリーテキストブロック]"}
		cssDef	: {selector:".cms-markdown"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		var s = this.getInitText();
		o.data = s
		o.attr = { css:"default " }
		o.attr.class = o.attr.css;
		return o;
	}
	/* ---------- ---------- ---------- */
	
	_.getInitText = function(){
		var s = "";
			s += '#タイトル\n';
			s += '\n';
			s += '##大見出し\n';
			s += '文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。\n';
			s += '\n';
			s += '###中見出し\n';
			s += '文書が入ります。文書が入ります。文書が入ります。文書が入ります。\n';
			s += '\n';
			s += '####小見出し\n';
			s += '文書が入ります。文書が入ります。文書が入ります。\n';
			s += '\n';
			s += ' * 項目1\n';
			s += ' * 項目2\n';
			s += ' * 項目3\n';
			s += '';
		return s
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-markdown ')
		var tag = "";
		if(data == ""){
			tag += '<span class="_no-input-data">マークダウンデータを入力...</span>'
		} else{
			tag += '<div  ' + attr + ' >' + marked(data) + '</div>';
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-markdown ')
		var tab = (_tab != undefined) ? _tab:"";
		var s = marked(data);
			s = s.split('id="-"').join("");
		var tag = ""
			tag += '<div  ' + attr + ' >' + s + '</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();