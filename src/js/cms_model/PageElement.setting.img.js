
PageElement.setting.img = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "setting.img", 
		name	: "画像",
		inputs	: ["IMG"]
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = "width:200,height:140"
		//o.attr = {style:"max-width:100%;"};
		o.attr ={css:""}
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var jquery = _o.jquery;
		var link = _o.link;
		var id = _o.id
		var tag = ""
	
		if(data == ""){
			tag += '<span class="_no-input-data">画像URLを入力...</span>'
		} else{
			var imgTag = CMS_Path.MEDIA.getImageTag(data,false);
			var genTag = CMS_AnchorU.getWapperTag(link, imgTag,false);
			tag += PageElement.settingU.getTag(id,jquery,data,genTag);
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();