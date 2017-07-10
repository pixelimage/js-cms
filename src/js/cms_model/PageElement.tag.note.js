
PageElement.tag.note = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.note", 
		name	: "制作用ノート",
		name2	: "",
		inputs	: []
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = "このテキストは制作用のノートです。HTMLには出力されません。";
		o.attr ={}
		return o;
	}
	
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
	
		if(data == ""){
			tag += '<span class="_no-input-data">制作用ノートを入力...</span>'
		} else{
			tag += '<div class="_element_note"><i class="fa fa-lg fa-comment-o"></i> <b>制作用ノート：</b>' + CMS_TagU.t_2_tag(data) + '</div>';
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