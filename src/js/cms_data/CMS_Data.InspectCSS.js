//インスペクトビューのCSSプリセット管理
CMS_Data.InspectCSS = (function(){
	
	var css = ""
	var url = ""
	var _hasData = false;
	
	function load(_callback) {
		url = ASSET_CSS_DIRS[0];
		var urlR = url + "?" +  new Date().getTime();
		new CMS_Data.TextLoader(
			"TEXT",
			urlR,
			function(_text) {
				_hasData = true;
				css = parse(_text);
				if(_callback)_callback(url);
			},function(_text){
				css = parse("");
				if(_callback)_callback(url);
			}
		);
	}
	
	var listCommon;
	var listTag;
	
	function hasData() {
		return _hasData;
	}
	
	function parse(_text) {
		listCommon = [];
		listTag = [];
		// var re = new RegExp('\\/\\*.*{.*?}.*\\*\\/' ,"ig");
		var re = new RegExp('\\/\\*.*\\[.*?\\].*\\*\\/' ,"ig");
		var ss = _text.match(re);
		if(!ss ) return {};
		listTag = [];
		for (var i = 0; i < ss.length ; i++) {
			var _vs = getPresetVal(ss[i]).split(",");
			if(_vs.length>1){
				var selc = _vs[0]
				var label = _vs[1]
				if(selc.charAt(0) == "." && selc.split(".").length == 2){
					if(isOwnPreset(listCommon,selc) == false){
						listCommon.push({ selector:selc, label:label });
					}
				}
				if(selc.split(".").length > 1){
					if(isOwnPreset(listTag,selc) == false){
						listTag.push({ selector:selc, label:label });
					}
				}
			}
		}
		listCommon	= _cluc(listCommon);
		listTag		= _cluc(listTag);
		// console.log(listCommon);
		// console.log(listTag);
	}
	
	function _cluc (_defs){
		var _list = [];
		for (var i = 0; i < _defs.length ; i++) {
			var l = _defs[i].label;
			var sel = _defs[i].selector;
			if(l.indexOf("/") != -1){
				var gp = l.split("/")[0];
				if(! _hasItem(_list,gp)){
					_list.push({label:gp,selector:sel,subs:[]});
				} 
				_addSubItem(_list,gp,l,sel);
			} else{
				_list.push({label:l,selector:sel,subs:[]});
			}
		}
		return _list;
	}
	function _hasItem(_list,_g){
		var b = false;
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i].label == _g){ b = true; }
		}
		return b;
	}
	function _addSubItem(_list,_g,_s,_sel){
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i].label == _g){
				var s = _s.split(_g+"/")[1];
				_list[i].subs.push({label:s,selector:_sel});
			}
		}
	}
	
	/* ---------- ---------- ---------- */

	function getPresetVal(_s) {
		_s = _s.split(" ").join("");
		_s = _s.split("	").join("");
		_s = _s.split("/*").join("");
		_s = _s.split("*/").join("");
		_s = _s.split("[").join("");
		_s = _s.split("]").join("");
		return _s;
	}
	function isOwnPreset(_list,_s) {
		var b = false;
		if(_s.indexOf("---") != -1) return false;
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i].selector == _s) b = true;
		}
		return b;
	}
	
	function getList(_base,_type){
		var ls = [];
		if(_type == "common"){
			var _list = listCommon;
			for (var i = 0; i < _list.length ; i++) {
				_list[i].class = _list[i].selector.split(".").join("");
				for (var ii = 0; ii < _list[i].subs.length ; ii++) {
					_list[i].subs[ii].class = _list[i].subs[ii].selector.split(".").join("");
				}
				ls.push(_list[i]);
			}
		} else{
			var _list = listTag;
			for (var i = 0; i < _list.length ; i++) {
				var sel = getFirstSel(_list[i].selector);
				if(sel == _base){
					_list[i].class = _list[i].selector.split(_base + ".").join("");
					for (var ii = 0; ii < _list[i].subs.length ; ii++) {
						_list[i].subs[ii].class = _list[i].subs[ii].selector.split(_base + ".").join("");
					}
					ls.push(_list[i]);
				}
			}
		}
		return ls;
	}

	/* ---------- ---------- ---------- */
	
	//セレクタの先頭のノードを返す
	function getFirstSel(_s){
		if(_s.charAt(0) == "."){
			var s = _s.split(".");
			return "." + s[1];
		} else{
			var s = _s.split(".");
			return s[0];
		}
	}
	/*
	equal(_f(".clearfix"),".clearfix");
	equal(_f(".w100p"),".w100p");
	equal(_f(".fs36"),".fs36");
	equal(_f(".cms-layout.default"),".cms-layout");
	equal(_f(".cms-layout.designA"),".cms-layout");
	equal(_f(".cms-layout.designB"),".cms-layout");
	equal(_f(".cms-markdown.default"),".cms-markdown");
	equal(_f("h1.default"),"h1");
	equal(_f(".cms-layout.free"),".cms-layout");
	equal(_f(".cms-layout-table.free"),".cms-layout-table");
	*/
	
	/* ---------- ---------- ---------- */
	
	var updateCallback = null;
	function registUpdateCallback(_cb){
		updateCallback = _cb;
	}
	
	/* ---------- ---------- ---------- */
	
	function reload(_s){
		if(url.indexOf(_s)!= -1){
			load(function(){
				if(updateCallback){
					updateCallback();
				}
			});
		}
	}
	
	return { 
		load:load,
		hasData:hasData,
		getList:getList,
		reload:reload,
		registUpdateCallback:registUpdateCallback
	}
})();


