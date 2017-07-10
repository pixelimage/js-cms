
var CMS_U = (function(){
	
	function defaultVal(_v,_def){
		var s = (_def != undefined) ? _def:"";
		if(_v != undefined){
			if(_v != ""){
				s = _v ;
			}
		}
		return s
	}
	window.defaultVal = defaultVal;
	
	function clone(obj) { 
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor(); 
	    for (var attr in obj) { 
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]; 
	    } 
	    return copy; 
	}  
	window.clone = clone;
	
	function isFilledText(_s){
		var b = true;
		if(_s == "") b = false;
		if(_s == undefined) b = false;
		if(_s == null) b = false;
		if(_s == "<br>") b = false;
		if(_s == "</br>") b = false;
		return b;
	}
	window.isFilledText = isFilledText;
	
	/* ---------- ---------- ---------- */
	
	function getPublicList(_a){
		var a = [];
		if(_a){
			for (var i = 0; i < _a.length ; i++) {
				if(_a[i]["publicData"] == "1"){
					a.push(_a[i]);
				}
			}
		}
		return a;
	}
	function addString(_sp,_s){
		var b = true;
		if(_s === "") b = false;
		if(_s === undefined) b = false;
		if(_s === "undefined") b = false;
		if(_s === null) b = false;
		if(b){
			return _sp + _s;
		} else{
			return "";
		}
	}
	
	function roundText(_s ,_n) {
		_n = _n || 15;
		if(_s.length > _n) _s = _s.substr(0,_n) + "..."
		return _s;
	}
	
	/* ---------- ---------- ---------- */

	function getSplitTextAt(_s,_n,_split){
		if(!_split) _split = ",";
		if(!_s)return "";
		if(_s.charAt(0) == " ") _s = _s.substr(1,_s.length);
		if(_s.charAt(0) == " ") _s = _s.substr(1,_s.length);
		if(_s.charAt(0) == " ") _s = _s.substr(1,_s.length);
		if(_n == undefined )return _s;
		if(_s.indexOf(",") == 0) return _s;
		var a = _s.split(_split);
		if(a.length > _n){
			return a[_n]
		} else{
			return "";
		}
	}
	
	/* ---------- ---------- ---------- */
	//CMS_U.openURL_blank();
	function openURL_blank(_u,_t){
		var t = (_t) ? _t : _u ;
			t = t.split("/").join("");
			t = t.split(".").join("");
		if(t == "") t = "_index";
		window.open(_u,t);
	}
	
	/* ---------- ---------- ---------- */
	
	/**
	 * {id:"",val:""}の形式の配列２つをマージする
	 * */
	function meargeGrid(_g1,_g2){
		var g1 = JSON.parse(JSON.stringify(_g1));
		var g2 = JSON.parse(JSON.stringify(_g2));
		var g3 = []
		for (var i = 0; i <  g1.length ; i++) {
			if(g1[i].id != undefined){
				//
				var id_1 = g1[i].id.split(" ").join("")
				for (var ii = 0; ii < g2.length ; ii++) {
					if(g2[ii].id != undefined){
						var id_2 = g2[ii].id.split(" ").join("")
						if(id_1 == id_2){
							if(g2[ii].val != "") {
								g1[i].val = g2[ii].val;
							}
							g2[ii] = "";
						}
					}
				}
			}
		}
		for (var i = 0; i < g2.length ; i++) {
			if(g2[i] != ""){
				g1.push(g2[i])
			}
		}	
		return g1;
	}
	
	/* ---------- ---------- ---------- */

	return { 
		defaultVal:defaultVal,
		clone:clone,
		isFilledText:isFilledText,
		
		getPublicList:getPublicList,
		addString:addString,
		roundText:roundText,
		getSplitTextAt:getSplitTextAt,
		
		openURL_blank:openURL_blank,
		
		meargeGrid:meargeGrid
	 }
})();

