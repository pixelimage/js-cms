
var CMS_TagU = (function(){
		
	function hasLink(_o){
		if(_o == undefined) return false;
		if(isFilledText(_o.href)){
			return true;
		} else{
			return false;
		}
	}
	
	/**
	 * リンクテキスト変換
	 */
	function getLinkTag(_o){
		if(_o == undefined) return "";
		var tag = ""
			tag += ' href="'+CMS_Path.MEDIA.getAnchorPath(_o.href)+'" ';
			if(isFilledText(_o.target)){
			tag += ' target="'+_o.target+'" ';
			}
		return tag;
	}
	
	/**
	 * リンクテキスト変換（繰り返しオブジェクト用）
	 */
	function getLinkTag_data(o){
		if(!o)return "";
		var href  = o.href
		var target  = o.target
		var tag = "";
		if(isFilledText(href)){
			tag += '<a'
			tag += ' href="'+ CMS_Path.MEDIA.getAnchorPath(href)+'" ';
			if(isFilledText(target)){
				tag += ' target="'+target+'" ';
			}
			tag += '>詳細へ</a>'
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	/**
	 * 繰り返しオブジェクトでつかってる
	 */
	function convertUniqueCSS(_css,id){
		if (_css == undefined) return ""; 
		_css = _css.split("\n").join("");
		_css = _css.split("	").join(" ");
		var a = _css.split("}");
		var baseC = (id == null || id == "") ? "	" : "	." + id;
		for (var i = 0; i < a.length -1; i++) {
			a[i] = baseC + " " + a[i]+ "}"
		}
		return a.join("\n");
	}
	
	/**
	* object.tableで、[[colspan=2]]みたいにする
	*/
	function getCellAttr(_s){
		if (_s == undefined) return ""; 
		var ms = _s.match(/\[\[.*\]\]/g);
		var att = "";
		if(ms){
			 att = ms[0];
			 att = att.split('[[').join('');
			 att = att.split(']]').join('');
		}
		return att;
	}
	function deleteCellAttr(_s){
		if (_s == undefined) return ""; 
		return _s.replace(/\[\[.*\]\]/g,'');
	}
	
	window.NOT_BR = '{_NOT_BR_}';
	function convertCellBR(_s){
		if (_s == undefined) return "";
		_s = String(_s);
		if(_s.indexOf(NOT_BR) != -1) {
			_s = _s.split("\n").join("");
		} else{
			_s = _s.split("\n").join("<br>")
		}
		_s = deleteCellBR(_s);
		return _s;
	}
	function deleteCellBR(_s){
		if (_s == undefined) return ""; 
		return _s.split(NOT_BR).join("");
	}
	function hasCellBR(_s){
		if(_s.indexOf(NOT_BR) != -1) {
			return true;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */

	function treatTag(_s){
	 	return _s.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
	}
	function t_2_tag(_s){
		if (_s == undefined) return ""; 
		if (_s == "") return ""; 
		if( typeof(_s) != "string" ) return _s;
		
		var t = _s;
		// t = t.split("&amp;").join("&");
		// t = t.split("&lt;").join("<");
		// t = t.split("&gt;").join(">");
		t = convertCellBR(t);
		return t;
	}

	function tag_2_t(_s){
		if (_s == undefined) return ""; 
		var t = _s;
		t = t.split("&").join("&amp;");
		t = t.split("<").join("&lt;");
		t = t.split(">").join("&gt;");
		return t;
	}
			
	
	return {
		getLinkTag: getLinkTag,
		getLinkTag_data: getLinkTag_data,
		hasLink: hasLink,
		
		t_2_tag: t_2_tag,
		tag_2_t: tag_2_t,
		convertUniqueCSS: convertUniqueCSS,
		getCellAttr: getCellAttr,
		deleteCellAttr: deleteCellAttr,
		
		convertCellBR: convertCellBR,
		deleteCellBR: deleteCellBR,
		hasCellBR: hasCellBR,
		
		treatTag: treatTag
	}
})();