
var CMS_PateStateU 		 = (function(){
	var def = "0,0,0";
	function getState(_s){
		if(_s == undefined) _s = def;
		if(_s == "") _s = def;
		return _s.split(",");
	}
	function getPubClass(_s){
		if(_s == undefined) _s = def;
		if(_s == "") _s = def;
		var ss = _s.split(",");
		return (ss[0] != "1") ? "" : '_isHide';
	}
	function getStateText(_s){
		if(_s == undefined) _s = def;
		if(_s == "") _s = def;
		var ss = _s.split(",");
		var t = "";
			t +=(ss[0] != "1") ? "" : '<b style="color:#999">(非公開)</b>';
			t += (ss[1] != "1") ? "" : '<b style="color:#999">(メニュ非表示)</b>';
			t += (ss[2] != "1") ? "" : '<b style="color:#999">(工事中)</b>';
		return t;
	}
	function createState(_a){
		return _a.join(",")
	}
	
	var defCMS = "0,0,0";
	function getCMSClass(_s){
		if(_s == undefined) _s = defCMS;
		if(_s == "") _s = defCMS;
		var ss = _s.split(",");
		var c = ""
			c += (ss[0] != "1") ? "" : '_fileEM ';
		return c;
	}
	
	return { 
		getState:getState,
		getPubClass:getPubClass,
		getStateText:getStateText,
		createState:createState,
		getCMSClass:getCMSClass
	}
})();