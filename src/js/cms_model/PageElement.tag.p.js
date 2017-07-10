
PageElement.tag.p = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.p", 
		name	: "文書",
		name2	: "＜P＞",
		inputs	: ["TEXTAREA","CLASS","CSS"],
		// cssDef	: { file:"block",key:"[文書ブロック]",tag:"p"}
		cssDef	: {selector:".cms-p"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(_param){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = PageElement_JText.P
		o.attr = { css:"default " }
		o.attr.class = o.attr.css;
		
		if(_param){
			o.data = _param.text;	
		}
		return o;
	}
	
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-p ');
		var tag = "";
		if(data == "") {
			tag += '<span class="_no-input-data">テキストを入力...</span>';
		} else{
			tag += '<div>';
			tag += '<p ' + attr + '>' + data.split("\n").join("<br>\n") + '</p>';
			tag += '</div>';
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-p ');
		var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
			tag += tab + '<p ' + attr+'>' + data.split("\n").join("<br>\n" + tab) + '</p>\n' ;
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
