
PageElement.tag.html = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.html", 
		name	: "HTML",
		name2	: "",
		inputs	: []
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		var s = ""
			s += '<b>\n'
			s += 'HTML\n'
			s += '</b>\n'
			s += '<style></style>\n'
			s += '<script></script>\n'
		o.data = s
		o.attr ={preview:""}
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";

		if(data == ""){
			tag += '<span class="_no-input-data">HTML,JS,CSSデータを入力...</span>'
		} else{
			if(_o.preview) {
				tag += '<div class="_element_html">' + data + '</div>';
			} else{
				tag += '<div class="_element_html_code">'+CMS_TagU.tag_2_t(data).split("\n").join("<br>")+'</div>';
			}
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
			tag += data
			// tag += data;
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
