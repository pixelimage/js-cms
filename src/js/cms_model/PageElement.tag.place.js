
PageElement.tag.place = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.place", 
		name	: "制作用アタリ",
		name2	: "",
		inputs	: []
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = "このテキストは制作用のアタリです。HTMLに出力されます。";
		// o.attr ={width:"",height:"200px"}
		o.attr = {}
		o.extra = {width:"",height:"200px"};
		return o;
	}
	
	
	/* ---------- ---------- ---------- */

	_.getPreview = function(_o) {
		var data = _o.data;
		var attr = _o.attrs;
		
		var extra = _o.extra;
		var tag = ""

		if (data == "") {
			tag += '<span class="_no-input-data">アタリ...</span>';
		} else {
			var _t = '<div class="_element_place" style="{W}{H}"><p><i class="fa fa-lg fa-comment "></i> {V}</p></div>\n';
			var _w = (extra["width"]) ? "width:" + extra.width + ";" : "";
			var _h = (extra["height"]) ? "height:" + extra.height + ";" : "";
				_t = _t.split("{W}").join(_w);
				_t = _t.split("{H}").join(_h);
				_t = _t.split("{V}").join(CMS_TagU.t_2_tag(data));
			tag += _t;
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
		
		var _t = '<div class="_element_place" style="{W}{H}"><p><i class="fa fa-lg fa-comment "></i> {V}</p></div>\n';
		var _w = (extra["width"]) ? "width:" + extra.width + ";" : "";
		var _h = (extra["height"]) ? "height:" + extra.height + ";" : "";
			_t = _t.split("{W}").join(_w);
			_t = _t.split("{H}").join(_h);
			_t = _t.split("{V}").join(CMS_TagU.t_2_tag(data));
		tag += tab+_t;
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();