PageElement.replace.div = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "replace.div", 
		name	: "Myタグ-コンテナ定義",
		name2	: "",
		inputs	: [],
		// cssDef	: {file:"block",key:"[コンテナブロック]"},
		cssDef	: {selector:".cms-replace-div"}
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
				"class": "_cms_replace",
				css: " _cms_replace",
				style: "",
				replaceID: "ID名を入力",
				replaceTitle: "説明を入力"
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
