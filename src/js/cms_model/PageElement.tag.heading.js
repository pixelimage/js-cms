

PageElement.tag.heading = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.heading", 
		name	: "見出し",
		name2	: "＜H1＞〜＜H6＞",
		inputs	: ["HEADLINE","CLASS","CSS"],
		// cssDef	: {file:"block",key:"[見出しブロック]",tag:"heading"}
		cssDef	: {selector:"{h1-h6}"}
	});
	
/* {  "node" : "h1.designA", "name" : "注釈" } */

	/* ---------- ---------- ---------- */

	_.getInitData = function(_param){
		
		var o = {};
		o.type = _.pageInfo.id;
		o.data = {
			heading: "h1",
			main: 	{ text: "", link: null },
			right: 	{ text: "", link: null }
		}
		o.data.heading = _param;
		if(_param == "h1")o.data.main.text = "<em>h1</em> {{PAGE_NAME}} <small>headline1</small>";//<em>H1</em> 
		if(_param == "h2")o.data.main.text = "<em>h2</em> 大見出し <small>headline2</small>";//<em>H2</em> 
		if(_param == "h3")o.data.main.text = "<em>h3</em> 中見出し <small>headline3</small>";//<em>H3</em> 
		if(_param == "h4")o.data.main.text = "<em>h4</em> 小見出し <small>headline4</small>";//<em>H4</em> 
		if(_param == "h5")o.data.main.text = "<em>h5</em> 小見出し2 <small>headline5</small>";//<em>H4</em> 
		if(_param == "h6")o.data.main.text = "<em>h6</em> 小見出し3 <small>headline6</small>";//<em>H4</em> 
		
		o.attr = { css:"default " }
		o.attr.class = o.attr.css;
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		if(data.main.text == "" ){
			tag += '<span class="_no-input-data">データを入力...</span>'
		} else{
			var nn = data.heading.split("h").join("");
			tag += getHeaderTag(nn, data,attr, "");
		}
		return tag;
	}
	
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		var tab = (_tab != undefined) ? _tab:"";
		var tag = "";
		{
			var nn = data.heading.split("h").join("")
			tag += getHeaderTag(nn, data,attr, _tab);
		}
		return tag;
		
	}
	
	function getHeaderTag (_tag,_data,_attr,_tab) {
		_attr = _attr.split('class="').join('class="cms-h ');
		var s = {
			main : "",
			right : ""
		}
		try{
			s.main 	 = CMS_AnchorU.getWapperTag(_data.main.link, 		_data.main.text);
			s.right  = CMS_AnchorU.getWapperTag(_data.right.link, 	_data.right.text);
		}catch( e ){}
		
		var tag = "";
						tag += _tab + '	<h{TAG} '+_attr+'>' 
		if(s.right) 	tag += _tab + '<span class="cms-h-right">' + s.right + '</span>'
						tag += s.main
						tag += '</h{TAG}>\n'
		tag = tag.split("{TAG}").join(_tag);
		
		return tag;
	}

	/* ---------- ---------- ---------- */

    return _;
})();