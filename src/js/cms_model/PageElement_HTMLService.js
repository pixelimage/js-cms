
var PageElement_HTMLService = (function(){
	
	var tag = "";
	
	function getExportTag(o, _extra, _deep) {
		return getTag(o, "export", _deep);
	}
	
	/* ---------- ---------- ---------- */

	function getTag(o, _extra, _deep) {
		if(typeof o == "string")return o;
		var tag = "";
		if (_extra == undefined) _extra = "";
		if (_deep == undefined) _deep = 1;
		//
		tag = _core(o, _extra, _deep);
		tag = tagTreatment(tag);
		tag = tag.split("_narrow-element").join("")
		return tag;
	}
	
	function _core(o,_extra,_deep){
		var tag = ""
		//if (o.attr == undefined) return;
        if(o == null) return tag;
		if (o.attr.hide) return tag;
		if(_extra == "export"){
			//
		} else{
			if (o.attr["embedName"])return tag;
			if (o.attr["pubFileName"])return tag;
		}
	
		var tb = getTab(_deep);
		var attr = CMS_BlockAttrU.getHTMLArrs(o.attr);
		
		//基本的なタグや、Objectを処理
		if(PageElement_Util.isElement(o.type)){
			var t = PageElement_Util.getHTML(o,attr,tb);
			if(t != undefined){
				tag += t;
			}
			return tag;
		}
		
		//レイアウトタグ生成
		/* ---------- ---------- ---------- */
		
		var type = o.type;
		var data = o.data;
		
		/* ---------- ---------- ---------- */
		if (_extra == "td") {
			
			attr = attr.split('class="').join('class="cms-column-col ');
			tag += tb + '<div ' + attr + '>\n';
			for (var i = 0; i < data.length; i++) {
				tag += _core(data[i], "", _deep + 1);
			}
			if(data.length == 0) tag += "<br>";
			tag += "\n" + tb + "</div>\n";
		
		/* ---------- ---------- ---------- */
		} else if (type == "replace.div") {
			tag += ""
		
		/* ---------- ---------- ---------- */
		} else if (type == "layout.div")  {
			attr = attr.split('class="').join('class="cms-layout ');
			if(o.extra){
				var bg = CMS_ImgBlockU.getBgStyle(o.extra,true);
				if(attr.indexOf("style=") == -1){
					attr = attr.split('class="').join('style="" class="');
				}
				attr = attr.split('style="').join('style="' + bg);
			}
			
			if (_deep != 0) tag += tb + '<div ' + attr + ' >\n';
			for (var i = 0; i < data.length; i++) {
				tag += _core(data[i], "", _deep + 1); //コンポジット
			}
			if (_deep != 0) tag += tb + "</div>\n";
		
		/* ---------- ---------- ---------- */
		} else if (type == "layout.cols") {
			var _d = o.attr.devide;
			if (o.attr.devide == undefined) _d = ",,,,,,,,,,,,,,,";
			d = _d.split(",");
			//
			attr = attr.split('class="').join('class="cms-column ');
			tag += tb + '<div ' + attr + '>\n';
			for (var i = 0; i < data.length; i++) {
				tag += _core(data[i], "td", _deep + 1); //コンポジット
			}
			tag += tb + "</div>\n";
		
		/* ---------- ---------- ---------- */
		//h1など、上記にでてこなかったタグを処理する
		} else {
			try {
				var ss = data.split("\n").join("<br>\n" + tb);
				tag += tb + '<' + type + attr + '>' + ss + '</' + type + '>\n';
			} catch (e) {}
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	function getTab(_deep){
		var s = ""
		for (var i = 1; i < _deep; i++) { s += "	"; }
		return s;
	}
	
	/* ---------- ---------- ---------- */
	
	function tagTreatment(_s){
		_s = _s.split("  ").join(" ");
		_s = _s.split('=" ').join('="');
		_s = _s.split('class="" ').join('');
		_s = _s.split(' >').join('>');
		return _s;
	}
		
	/* ---------- ---------- ---------- */
	return {
		getExportTag: getExportTag,
		getTag: getTag
	}
})();

window.PageElement_HTMLService = PageElement_HTMLService;
