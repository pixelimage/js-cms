 
PageElement.tag.btn = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.btn", 
		name	: "ボタン",
		name2	: "＜A＞",
		inputs	: ["CLASS","CSS"],
		cssDef	: {selector:".cms-btn"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(_param){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = CMS_AnchorU.getInitData();
		o.data.href="#"
		
		if(_param){
			o.data.href = _param.url;	
			o.data.text = URL_U.getFileName(_param.url);
		}
		o.attr = {}
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-btn ');
		var tag = ""
			tag += '<div '+attr+'>' + CMS_AnchorU.getAnchorTag(data,"",false,true) + '</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-btn ');
		var tab = (_tab != undefined) ? _tab:"";
		
		var idTag = ""
		if(_o.id) idTag = ' id="'+_o.id+'"';
		var tag = "";
			tag += _tab + '<div '+attr+'>' + CMS_AnchorU.getAnchorTag(data , idTag,true,true) + '</div>';
		
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();