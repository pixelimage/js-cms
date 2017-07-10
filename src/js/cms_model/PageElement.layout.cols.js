
PageElement.layout.cols = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "layout.cols", 
		name	: "段組み",
		name2	: "＜TABLE＞",
		inputs	: ["CLASS","CSS"],
		cssDef	: {selector:".cms-column"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(_param){
		var _p = PageElement_JText.P;
		var n = Number(_param);
		
		var o = {};
		o.type = _.pageInfo.id;
		o.data = [];
		o.attr ={css:"col-p40",class:"col-p40"}
		for (var i = 0; i < n ; i++) {
			o.data.push({
				type: "layout.div",
				attr: {
					style: ""
				},
				data: [{
					type: "tag.p",
					attr: {
						"class": "default",
						css: "default"
					},
					data: _p
				}]
			});
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