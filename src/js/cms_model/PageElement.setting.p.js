
PageElement.setting.p = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "setting.p", 
		name	: "文書",
		inputs	: ["TEXTAREA"]
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = PageElement_JText.P
		o.attr = {css:"default"}
		return o;
	}
	
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var jquery = _o.jquery;
		var id = _o.id
		
		var tag = ""
		if(data == "") {
			tag += '<span class="_no-input-data">テキストを入力...</span>';
		} else{
			var genTag = data.split("\n").join("<br>\n")
			tag += PageElement.settingU.getTag(id,jquery,data,genTag);
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		return "";
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

