
PageElement.setting.note = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "setting.note", 
		name	: "ノート",
		inputs	: ["TEXTAREA"]
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = "この文書はサンプルのテキストです。注釈ノートとして利用します。"
		o.attr = {css:"default"}
		return o;
	}
	
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		if(data == "") {
			tag += '<span class="_no-input-data">テキストを入力...</span>';
		} else{
			tag += '<div class="_setting_note">' + data.split("\n").join("<br>\n") + '</div>'
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

