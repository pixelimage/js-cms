
PageElement.tag.anchor = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.anchor", 
		name	: "ページ内リンク",
		name2	: "＜A＞",
		inputs	: []
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = "anchor_id";
		o.attr = {};
		return o;
	}
	
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		if(data == ""){
			tag += '<span class="_no-input-data">IDを入力...</span>'
		} else{
			tag += '<div class="_element_anchor"> ' + data + '</div>';
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
			tag += tab+'<div class="_element_anchor" id="'+data+'">　</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();