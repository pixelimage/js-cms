
PageElement.tag.margin = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.margin", 
		name	: "高さマージン",
		name2	: "＜DIV＞",
		inputs	: []
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = "20px";
		o.attr ={css:"default"}
		o.attr.class = o.attr.css;
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-margin ');
		var tag = ""
	
		if(data == ""){
			tag += '<span class="_no-input-data">数値を入力...</span>'
		} else{
			data = data.split(" ").join("");
			if(data.charAt(0) == "-"){
				attr = attr.split('style="').join('style="height:15px;"');
			} else{
				attr = attr.split('style="').join('style="height:'+data+'"');
			}
		}
		tag += '<div '+ attr +'>マージン'+data+'</div>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-margin ');
		//
		var tag = "";
		data = data.split(" ").join("");
		if(data.charAt(0) == "-"){
			attr += ' style="height:0px;margin-top:'+data+'"';
		} else{
			attr += ' style="height:'+data+'"';
		}
		tag += '<div '+ attr +'></div>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();