
PageElement.layout.div = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "layout.div", 
		name	: "コンテナ",
		name2	: "＜DIV＞",
		inputs	: ["CLASS","CSS"],
		// cssDef	: {file:"block",key:"[コンテナブロック]"},
		cssDef	: {selector:".cms-layout"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var _p = PageElement_JText.P;
		
		var o = {};
			o.type = _.pageInfo.id;
			o.data = [{
				type: "tag.p",
				attr: {
					"class": "default",
					css: "default"
				},
				data: _p
			}];
			o.attr = {
				"class": "default p20 waku",
				css: "default p20 waku",
				style: ""
			}
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		return "";
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		return "";
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

