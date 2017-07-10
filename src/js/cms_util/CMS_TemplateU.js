
var CMS_TemplateU = (function(){
	
	function getTemplateHTML(_s){
		if(!_s)return ["","",""]
		var a = _s.split("{REPEAT_START}")
		if (a.length == 1) return ["", "", ""];
		var b = a[1].split("{REPEAT_END}")
		if (b.length == 1) return ["", "", ""];
		return [a[0], b[0], b[1]];
	}
	
	/* ---------- ---------- ---------- */

	function doTemplate(_param){
		var list = _param.list;
		var leng = _param.leng;
		var isPub = _param.isPub;
		var isEdit = _param.isEdit;
		
		var id,htmls,css;
		try{
			id = _param.id;
			htmls = CMS_TemplateU.getTemplateHTML(_param.htmls.split("{ID}").join(id) );
			css = _param.css.split("{ID}").join(id);
		}catch( e ){}
	
		var tag = "";
		
		//CSS
		if(isEdit){
			tag += getDefCSSTag();
		}
			tag += getStyleTag(css);
		
		//HTML or JS
		if(isJS(_param.htmls)){
			//JS
			try{
				tag += eval(_param.htmls)(list,id,isPub);
			}catch( e ){
				return "JavaScriptの構文エラーです。"
			}
		} else {
			//HTML
			
			tag += htmls[0]+"\n"
			for (var i = 0; i < leng ; i++) {
				var tempText = htmls[1];
				for (var ii = 0; ii < 10 ; ii++) {
					var data = CMS_TagU.t_2_tag(list[i]["a"+ii]);
					if(!data) data = "";
					tempText = tempText.split("{"+ii+"}").join(data);
				}
				if(isEdit){
					tempText = tempText.split(CONST.SITE_DIR).join("");
				}
				if(list[i]["anchor"]){
					tempText = replaceLinkTag(list[i].anchor,tempText);
				}
				tempText = removeLinkTag(tempText);
				var img = list[i]["image"];
				var imgTag = CMS_ImgBlockU.getImageTag({
					path	: img.path,
					isPub	: isPub,
					// width	: "100%",
					width	: img.width,//20161220
					ratio	: img.ratio,
					alt		: "",
					attr	: ""
				});
				tempText = tempText.split("{IMG}").join(imgTag);
				tag += tempText;
			}
			tag += htmls[2]+"\n";
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	function getDefCSSTag(){
		var tag = ""
		for (var i = 0; i <  ASSET_CSS_DIRS.length ; i++) {
			tag +=('<link rel="stylesheet" class="asset" type="text/css" href="'+ ASSET_CSS_DIRS[i]+'" />\n');
		}
		return tag;
	}
	function getStyleTag(_css){
		var tag = "";
		if(_css != ""){
			tag += '<style type="text/css">\n'
			tag += _css + "\n";
			tag += '</style>\n\n';
		}
		return tag;
	}
	
	function replaceLinkTag(anchor,s){
		if(anchor){
			if(isFilledText(anchor)){
				s = s.split("{LINK}").join(CMS_TagU.getLinkTag_data(anchor));
				//
				if(isFilledText(anchor.href)){
					s = s.split("{LINK.href}").join(CMS_Path.MEDIA.getAnchorPath(anchor.href))
				}
				if(isFilledText(anchor.target)){
					s = s.split("{LINK.target}").join(anchor.target)
				} 
			}
		}
		return s;
	}
	function removeLinkTag(s){
		s = s.split("{LINK}").join("");
		s = s.split("{LINK.href}").join("");
		s = s.split("{LINK.target}").join("");
		return s;
	}

	function isJS(_s){
		if(_s.indexOf("(function") == 0){
			return true;
		} else{
			return false;
		}
		// if(_param.htmls.indexOf("(function") == 0){
	}
	return {
		getTemplateHTML:getTemplateHTML,
		doTemplate:doTemplate,
		isJS:isJS
	}
})();

if(window._cms == undefined) window._cms = {}
window._cms.getImageTag = function(_data,_isPub){
	var img = _data.image
	return CMS_ImgBlockU.getImageTag({
		path	: img.path,
		isPub	: _isPub,
		width	: "100%",
		ratio	: img.ratio,
		alt		: "",
		attr	: ""
	});
}

