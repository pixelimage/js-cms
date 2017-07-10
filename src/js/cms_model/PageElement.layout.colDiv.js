
PageElement.layout.colDiv = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "layout.colDiv", 
		name	: "段組みセル",
		name2	: "＜TD＞",
		inputs	: ["CLASS","CSS"],
		cssDef	: {selector:".cms-column-col"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		return {};
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