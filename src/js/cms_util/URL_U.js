
var URL_U = (function(){
	
	function trimSS(_u){
		if(!_u)return "";
		_u = _u.split("///////").join("/");
		_u = _u.split("/////").join("/");
		_u = _u.split("///").join("/");
		_u = _u.split("//").join("/");
		return _u
	}
	function treatURL(_u){
		if(isMailTo(_u))return _u;
		if(isFullPath(_u)){
			var sep = "://"
			var s = _u.split(sep);
			_u = s[0] + sep + trimSS(s[1])
		} else{
			_u = trimSS(_u);
		}
		return _u;
	}
	
	function treatDirName(_dir){
		if(_dir == undefined) return ""
		if(_dir == "") return ""
		if(_dir == "/") return "/";
		if(_dir.indexOf("//") != -1){
			_dir = trimSS(_dir);
		}
		if(_dir.indexOf("../") == 0 ){
			//
		} else{
			if(_dir.charAt(0) != "/") _dir = "/" + _dir
		}
		if(_dir.charAt(_dir.length-1) != "/") _dir = _dir + "/"
		return _dir;
	}
	
	function isMailTo (_u){
		if(_u.indexOf("mailto:") == 0) return true;
		return false;
	}
	function isFullPath (_u){
		if(_u.indexOf("http://") == 0) return true;
		if(_u.indexOf("https://") == 0) return true;
		if(_u.indexOf("mailto:") == 0) return true;
		if(_u.indexOf("javascript:") == 0) return true;
		return false;
	}
	function isTextFile(_s){
		if(_s == null) return false;
		var b = false;
		var ext = getExtention(_s)
		if(ext == "") b = true;
		if(ext == "html") b = true;
		if(ext == "htm") b = true;
		if(ext == "css") b = true;
		if(ext == "js") b = true;
		if(ext == "json") b = true;
		if(ext == "xml") b = true;
		if(ext == "csv") b = true;
		if(ext == "tsv") b = true;
		if(ext == "as") b = true;
		if(ext == "php") b = true;
		return b;
	}
	function getCurrentDir(_s,_deep){
		if(_deep == undefined) _deep = 1;
		if(_deep == 0) return "/"
		_s = _s.split("#")[0];
		var ss = _s.split("/");
		
		var a = []
		for (var i = 0; i < _deep ; i++) {
			a.push( ss[ss.length - (2 + i)])
		}
		return "/" + a.reverse().join("/")
	}
	function getFileID(_s){
		var s = getFileName(_s)
		return s.split(".")[0]
	}
	function getFileName(_s){
		var ss = _s.split("/")
		var fn = ss[ss.length-1]
			fn = fn.split("#")[0]
			fn = fn.split("?")[0]
		return fn
		
		//http://192.168.1.23:1000/release/_cms/index.html
	}
	function getExtention(_s){
		if(_s == null)return "";
		if(typeof _s == "number") _s = String(_s);
		var p1 = _s.split("#")[0];
		var p2 = p1.split("?")[0];
		var ss = p2.split(".");
		if(ss.length == 1)return "";
		var ex = ss[ss.length-1];
		if(ex.indexOf("/") != -1) return "";
		return ex.toLowerCase();
	}
	function getURLParam(_s){
		if(_s ==null)return {};
		var url = _s;
		var p1 = url.split("#")[0];
		var p2 = p1.split("?")[1];
		if(p2.length == 0) return;
		var ps = p2.split("&");
		var o = {}
		for (var i = 0; i < ps.length ; i++) {
			var s = ps[i].split("=")
			o[s[0]] = s[1]
		}
		return o
	}
	function getBaseDir(_s){
		_s = _s.split("?")[0];
		var a = _s.split("/");
		var u = "";
		for (var i = 0; i < a.length -1 ; i++) {
			u += a[i] + "/"
		}
		return u
	}
	
	var protcolList = ["http://","https://","//"];
	//現在のHTMLの絶対パス、相対パスのCSSなどのファイルから、
	//絶対パスを生成する。
	function getDomain(_s){
		if(_s ==null)return "";
		var out = ""
		if(_s ==null) return out;
		for (var i = 0; i < protcolList.length ; i++) {
			var ss = protcolList[i]
			if(_s.substr(0, ss.length) == ss){
				var a = _s.split(ss);
				var a = a[1].split("/");
				out += ss + a[0] + "/";
			}
		}
		return out;
	}
	function getDomain_and_dir(_s){
		if(_s ==null)return "";
		var out = "";
		_s = _s.split("?")[0]
		var a = _s.split("/");
		if(a.length < 4) return _s;
		for (var i = 0; i < a.length-1 ; i++) {
			out += a[i] + "/"
		}
		return out;
	}
	function isSameDomain(_s,_s2){
		if(_s ==null)return false;
		if(_s2 ==null)return false;
		var s = getDomain(_s);
		var s2 = getDomain(_s2);
		return (s == s2);
	}
	function isDomain(_s){
		if(_s == null) return false;
		var b = false;
		_s = _s.split(" ").join("")
		_s = _s.split("	").join("")
		if(_s == "") return false;
		if(_s.substr(0, 5) == "http:") b = true;
		if(_s.substr(0, 6) == "https:") b = true;
		if(_s.substr(0, 2) == "//") b = true;
		return b
	}
	//
	function joinURL(_s,_s2){
		if(_s ==null)return "";
		if(_s2 ==null)return "";
		if(! isDomain(_s)) return _s2;
		if(isDomain(_s2)) return _s2;
	
		var a = _s2.split("../");
		
		var ss =_s.split("/");
		var u = ""
		var leng = ss.length - a.length
		for (var i = 0; i < leng ; i++) {
			u += ss[i] + "/"
		}
		var g = _s2.split("../").join("");
			g = g.split("./").join("");
		return treatURL(u + g);
	}
	function trimDomain(_s){
		if(_s ==null)return "";
		var d = getDomain(_s);
		return _s.split(d).join("")
	}
	function getRelativePath(_s,_s2){
		if(_s == null)return "";
		if(_s2 == null)return "";
		var out = "";
		if(! isSameDomain(_s,_s2)) return "";
		_s = trimDomain(_s);
		_s2 = trimDomain(_s2);
		var g = _s.split("?")[0].split("/");
		var ps = "";
		for (var i = 0; i < g.length-1 ; i++) {
			if(g[i] != ""){
				ps += "../";
			}
		}
		return ps + _s2;
	}
	//
	function getHash(){
		var path = window.location.hash;
			path = path.split("#").join("");
			path = path.split("*").join("");
		return path;
	}
	//URL_U.getParentDir
	function getParentDir(_dir){
		if(_dir.charAt(_dir.length-1) != "/"){
			_dir = _dir + "/";
		}
		var a = _dir.split("/");
		var s = []
		for (var i = 0; i < a.length - 2; i++) {
			s.push(a[i])
		}
		return s.join("/") + "/";
	}
	/*
	equal(getParentDir("/aa"),"/");
	equal(getParentDir("/aa/bb"),"/aa/");
	equal(getParentDir("/aa/"),"/");
	equal(getParentDir("/aa/bb/"),"/aa/");
	equal(getParentDir("../"),"/");
	equal(getParentDir("../aa/"),"../");
	equal(getParentDir("../aa/bb/"),"../aa/");
	*/
	
	function getPageObject(_s){
		var o = {}
		o.dir = getBaseDir(_s);
		o.id = getFileName(_s);
		return o;
	}


	return { 
		trimSS:trimSS,
		treatURL:treatURL,
		isMailTo:isMailTo,
		isFullPath:isFullPath ,
		treatDirName:treatDirName ,
		
		isTextFile:isTextFile,
		getCurrentDir:getCurrentDir,
		getFileID:getFileID,
		getFileName:getFileName,
		getExtention:getExtention,
		getURLParam:getURLParam,
		getDomain:getDomain,
		getDomain_and_dir:getDomain_and_dir,
		isSameDomain:isSameDomain,
		getBaseDir:getBaseDir,
		joinURL:joinURL,
		getRelativePath:getRelativePath,
		getHash:getHash,
		getParentDir:getParentDir,
		getPageObject:getPageObject
	 }
})();

