

var PageElement_Util = (function(){

	function _traceElementInfo(){
		var a = ["layout","replace","tag","object"];
		for (var i = 0; i <  a.length ; i++) {
			var tar = PageElement[a[i]];
			for (var m in tar) {
				console.log([tar[m].pageInfo.id,tar[m].pageInfo.name]);
			}
		}
	}
	//現在登録されているブロックを調べる。開発用。
	window.traceElementInfo = _traceElementInfo;

	/* ---------- ---------- ---------- */
	
	function getElementInfo(_type){
		var o = {}
		if(!_type) return o;
		if(_type == "replace.div"){ o = PageElement.replace.div;}
		if(_type == "layout.div"){ o = PageElement.layout.div;}
		if(_type == "layout.cols"){ o = PageElement.layout.cols;}
		if(_type == "layout.colDiv"){ o = PageElement.layout.colDiv;}
		if(isElement(_type)){
			var t = _type.split(".")[1];
			if (_type.indexOf("tag.") == 0) {
				o = PageElement.tag[t];
			}
			if (_type.indexOf("object.") == 0) {
				o = PageElement.object[t];
			}
		}
		return o;
	}
	window.getElementInfo = getElementInfo;
	
	/* ---------- ---------- ---------- */

	//初期データ取得
	function getInitData(_type,_param){
		var tar = getElementInfo(_type)
		var o = tar.getInitData(_param);
		o["class"] = o.css;
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	//プレビューHTMLデータ取得
	function getPreview(param){
		//
		var attr = (function(_p){ 
			var s  = defaultVal(_p.attr["style"],"");
			var c = defaultVal(_p.attr["class"],"");
			return ' class="' + c + '" style="' + s + '" ';
		})(param);
		
		var o = createParam(param);
			o.attrs = attr;
			o.extra = (param["extra"]) ? param.extra : {};
		
		if(isElement(param.type)){
			
			var ts = param.type.split(".");
			if(PageElement[ts[0]]){
				var tar = PageElement[ts[0]][ts[1]];
				if(tar) return tar.getPreview(o);
			}
		}
		return "";
	}
	

	/* ---------- ---------- ---------- */

	//HTMLデータ取得
	function getHTML(param,attr,tab){
		var o = createParam(param)
			o.attrs = attr;
			o.extra = (param["extra"]) ? param.extra : {};
		
		if(isElement(param.type)){
			var tar;
			var t = param.type.split(".")[1];
			if (param.type.indexOf("tag.") == 0) tar = PageElement.tag[t];
			if (param.type.indexOf("object.") == 0) tar = PageElement.object[t];
			if(tar) return tar.getHTML(o,tab);
		}
		return "";
	}
	
	/* ---------- ---------- ---------- */

	function createParam(param){
		var o = {}
			o.type 		 = param.type;
			o.data 		 = param.data;
			o.link 		 = defaultVal(param.attr["link"], "");
			o.preview 	 = defaultVal(param.attr["preview"], "");//HTMLのプレビュ
			o.id 		 = defaultVal(param.attr["id"], "");
		return o;
	}
	
	/* ---------- ---------- ---------- */

	//tabもしくはobjectか？
	function isElement(_type){
		var b = false
		if (_type.indexOf("tag.") == 0) b = true;
		if (_type.indexOf("object.") == 0) b = true;
		return b;
	}

	/* ---------- ---------- ---------- */
	
	function hasAttr(_attr){
		var s = _attr;
			s = s.split(" ").join("");
			s = s.split('class=""').join('');
			s = s.split('style=""').join('');
		if(s == "") return false;
		return true;
	}
	
	/* ---------- ---------- ---------- */

	//インスペクタビューでの名前取得
	function getTypeName(_type){
		var list = PageElement_DIC;
		var n = "";
		for (var i = 0; i <list.length ; i++) {
			if(_type == list[i].type){
				n = '<span class="_t1">'+ list[i].name + "ブロック</span>"
				// n += '<span class="_t2">'+ list[i].name2 + "</span>"
			}
		}
		n = n.split("<br>").join("")
		return n;
	}
	function getTypeName_t1(_type){
		var list = PageElement_DIC;
		var n = "";
		for (var i = 0; i <list.length ; i++) {
			if(_type == list[i].type){
				return list[i].name;
			}
		}
		return "";
	}

	/* ---------- ---------- ---------- */

	//インスペクタビューの入力可能タイプの取得
	function hasInputType(_type,_input){
		var list = PageElement_DIC;
		var n = "";
		for (var i = 0; i <list.length ; i++) {
			if(_type == list[i].type){
				var inputs = list[i].inputs;
				for (var ii = 0; ii <inputs.length ; ii++) {
					if(inputs[ii] == _input) return true;
					
				}
			}
		}
		return false;
	}

	/* ---------- ---------- ---------- */
	
	//データグリッドでの値の範囲を取得
	function getGridMaxLeng(_a,_leng){
		var max = 0
		for (var i = 0; i < _a.length ; i++) {
			for (var ii = 0; ii < _leng ; ii++) {
				if(_a[i]["c"+(ii+1)]){
					if(max < ii){
						max = ii
					}
				}
			}
		}
		return max;
	}
	
	/* ---------- ---------- ---------- */
	
	/* ---------- ---------- ---------- */
	
	function _getMaxLeng(_type){
		var n;
		if(window["GRID_PREVIEW_MAX_ROW"]){
			var o = GRID_PREVIEW_MAX_ROW;
			if(_type == "news") n = o["NEWS"];
			if(_type == "table") n = o["TABLE"];
			if(_type == "custom") n = o["CUSTOM"];
			if(_type == "data") n = o["DATA"];
		}
		if(isNaN(n)) n = 50;
		return n;
	}
	function getOmitLeng(_n,_type,_isPub){
		if (_isPub) return _n;
		var max = _getMaxLeng(_type);
		if(max < _n){
			return max;
		}
		return _n;
	}
	function getOmitPreviewTag(_n,_type,_isPub){
		if (_isPub) return "";
		var max = _getMaxLeng(_type);
		if(max < _n){
			 return '<div class="_cms_blockAnno">※ページ編集画面では、'+max+"件以上は、省略して表示されます。</div>" ;
		}
		return "";
	}
	function getListLeng(_data,_leng){
		if(!_data.setting) _data.setting = {}
		if(!_data.setting.texts) _data.setting.texts = {}
		if(!_data.setting.texts.max) _data.setting.texts.max = _leng;
		var max = _data.setting.texts.max;
		if(max){
			if(!isNaN(max)){
				_leng = (_leng < max) ? _leng : max;
			}
		}
		return _leng;
	}
	/* ---------- ---------- ---------- */
	
	function isReplaceTag(_type){
		if(!_type) return false;
		if(_type == "object.replaceTexts") return true;
		if(_type == "replace.div")return true;
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	function getCaption(_extra){
		var tag = "";
		if(_extra){
			if(_extra.head){
				tag += '<div class="caption">' +_extra.head+ '</div>\n'
			}
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	return {
		getElementInfo: getElementInfo,
		getInitData: getInitData,
		getPreview: getPreview,
		getHTML: getHTML,
		isElement: isElement,
		hasAttr: hasAttr,
		getTypeName: getTypeName,
		getTypeName_t1: getTypeName_t1,
		hasInputType: hasInputType,
		getGridMaxLeng: getGridMaxLeng,
		
		getOmitLeng:getOmitLeng,
		getOmitPreviewTag:getOmitPreviewTag,
		getListLeng:getListLeng,
		
		isReplaceTag:isReplaceTag,
		
		getCaption: getCaption
	}
})();

window.PageElement_Util = PageElement_Util;


