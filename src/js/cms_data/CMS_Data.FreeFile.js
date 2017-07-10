
//ファイルインクルード
//{{FILE:index.html}}

CMS_Data.FreeFile = (function(){
	/* ---------- ---------- ---------- */
	
	function init(){}
	
	/* ---------- ---------- ---------- */
	
	var tmp = {}
	var callback;
	var replaceText;
	function replace(_s, _callback) {
		replaceText = _s;
		callback = _callback;
		loadedCnt = 0;
		var files = _s.match(/{{FILE.*?}}/g);
		if(files){
			fileCnt = files.length;
			for (var i = 0; i <  files.length ; i++) {
				load(files[i],loaded);
			}
		} else{
			callback(_s);
		}
	}
	
	var loadedCnt = 0;
	var fileCnt = 0;
	function loaded(_string,_file) {
		loadedCnt ++;
		if(loadedCnt == fileCnt){
			loadedAll();
		}
	}
	function loadedAll() {
		for (var n in tmp) {
			replaceText = replaceText.split(n).join(tmp[n]);
		}
		callback(replaceText);
	}
	
	/* ---------- ---------- ---------- */
	
	function load(id, _callback) {
		var url = id;
			url = url.split("{{FILE:").join("");
			url = url.split("}}").join("");
		
		var path = ""
		if(url.charAt(0) == "/"){
			path = CMS_Path.SITE.REL + url;
		} else {
			path = CMS_Path.PAGE.REL + Dic.DirName.TEMPLATE + "/" + url;
		}
		
		var pathR = path + "?" +  Math.round(Math.random() * 10000);
		
		if (tmp[id] == undefined){
			new CMS_Data.TextLoader("TEXT", pathR, function(_text) {
				tmp[id] = _text;
				_callback(tmp[id],id);
			},function(_text){
				tmp[id] = "";
				_callback("",id);
			});
		} else {
			_callback(tmp[id],id);
		}
	}
	
	/* ---------- ---------- ---------- */
	return { 
		init:init,
		replace:replace
	}
})();
