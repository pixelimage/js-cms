
var CMS_Path = {}

//基本パスデータ管理
CMS_PathFunc = (function(){
	
	function init(_location){
		if(_location == undefined) _location = window.location.href;
		
		var absSett = getAbs(ASSET_DIR_PATH, SITE_DIR_PATH);
		var absDef = getAbs(DEFAULT_DIR_PATH, SITE_DIR_PATH);
		
		//SITE
		CMS_Path.SITE = {}
		CMS_Path.SITE.URL 		= _getBaseDir(_location,SITE_DIR_PATH);
		CMS_Path.SITE.DIR 		= URL_U.getCurrentDir(CMS_Path.SITE.URL,1).split("/").join("");
		CMS_Path.SITE.DOMAIN 	= URL_U.getDomain(CMS_Path.SITE.URL)
		CMS_Path.SITE.REL 		= SITE_DIR_PATH//CMSからみたサイトルート
		CMS_Path.SITE.REL_HTML 	= _getRelTop(DEFAULT_DIR_PATH)//HTMLディレクトリからみたサイトルート
		CMS_Path.SITE.ABS 		= "/"
		CMS_Path.SITE.ABS_PATH 	= window.location.pathname;
		
		//CMS
		CMS_Path.CMS = {}
		CMS_Path.CMS.ABS = URL_U.getCurrentDir(_location) +"/";
		CMS_Path.CMS.REL = URL_U.treatDirName(CMS_Path.SITE.REL + CMS_Path.CMS.ABS)
		
		//UPLOAD
		CMS_Path.UPLOAD = {}
		CMS_Path.UPLOAD.REL = UPLOAD_DIR_PATH;
		CMS_Path.UPLOAD.ABS = getAbs(UPLOAD_DIR_PATH , SITE_DIR_PATH);
		
		//BACKUP
		CMS_Path.BACKUP = {}
		CMS_Path.BACKUP.REL = BACKUP_DIR_PATH;
		CMS_Path.BACKUP.ABS = getAbs(BACKUP_DIR_PATH , SITE_DIR_PATH);
		
		//htmlファイルからみた、トップディレクトリへのパス
		CMS_Path.SITE.getTopRelPath_from_html = function (_dir){
			var s = ""
			if(_dir == undefined ) _dir= "";
			if(_dir == ""){
				s = CMS_Path.SITE.REL_HTML;
			} else if(_dir == "/"){
				s = "./"
			}else {
				_dir = _dir.split("//").join("/");
				var a = _dir.split("/")
				for (var i = 0; i < a.length ; i++) {
					if(a[i] != "") s += "../";
				}
			}
			return s;
		}
		
		/* ---------- ---------- ---------- */

		//MEDIA
		CMS_Path.MEDIA = {}
		CMS_Path.MEDIA.getImagePath = function (_path,_isPub,_isPreview){
			if(DummyImageService.isMock(_path)){
				if(_isPub){
					return "";
				} else {
					return DummyImageService.getImage(_path)
				}
			} else{
				return CMS_Path.MEDIA.getAnchorPath(_path,_isPub,_isPreview)
			}
		}
		CMS_Path.MEDIA.getPreviewImageTag = function (_path){
			return '<img src="' + CMS_Path.MEDIA.getImagePath(_path,false) +'">';
		}
		CMS_Path.MEDIA.getAnchorPath = function (_path,_isPub,_isPreview){
			
			if(typeof _path != "string"){ return "" }
			if(! _path) return "";
			if(_isPub == undefined) _isPub = true;
			if(_isPreview == undefined) _isPreview = false;
			
			//#ページ内リンクは、そのまま返す
			if(_path.charAt(0) == "#") return _path;
			
			//httpからの場合は、そのまま返す
			if(URL_U.isFullPath(_path)) return _path;
	
			_path = _path.split("/////").join("/");
			_path = _path.split("///").join("/");
			_path = _path.split("//").join("/");
			
			function _getPath (_s,_pub){
				var base = (_pub) ? CONST.SITE_DIR : CMS_Path.SITE.REL;
				var s = base + _s;
					s = s.split(base+"/").join(base);
				return s;
			}
			
			//絶対パス
			if(_path.charAt(0) == "/"){
				if(! _isPreview) {
					return _path;
				} else {
					//URLプレビュー
					_path = _path.substr(1,_path.length);
					if(_isPub){
						return CMS_Path.SITE.DOMAIN + _path;
					} else{
						return CMS_Path.SITE.REL + _path;
					}
				}
			}
			//相対パス
			if(_path.substr(0,2) == "./"){
				if(! _isPreview) {
					return _getPath(_path,_isPub);
				} else {
					//URLプレビュー
					return URL_U.joinURL(CMS_Path.SITE.URL,_path)
				}
			}
			if(_path.substr(0,2) == ".."){
				if(! _isPreview) {
					return _getPath(_path,_isPub);
				} else {
					//URLプレビュー
					if(_path.substr(0,3) == "../"){
						return URL_U.joinURL(CMS_Path.SITE.URL,_path)
					}
					return CMS_Path.SITE.URL
				}
			}
			return _getPath(_path,_isPub);
		}
		CMS_Path.MEDIA.getAnchorPath_deco = function (_path,_isPub){
			var path = CMS_Path.MEDIA.getAnchorPath(_path,true,true);
			var icon = (path.indexOf(CONST.SITE_DIR) != -1) ? Dic.I.External :"";
			path = path.split(CONST.SITE_DIR).join(CMS_Path.SITE.URL);
			var tar = _getTargetName(path);
			var s = path.split(_path).join("<span>" + _path + "</span>");
			return '<a href="'+path+'" target="'+tar+'">' + s + ' ' +icon+ '</a>' 
		}
		
		//PAGE 
		CMS_Path.PAGE = {}
		CMS_Path.PAGE.URL = URL_U.treatURL(CMS_Path.SITE.URL + absDef);
		CMS_Path.PAGE.REL = DEFAULT_DIR_PATH
		CMS_Path.PAGE.ABS = absDef;
		CMS_Path.PAGE.ABS2 = (function(_s){ 
			if(_s == "/")return _s;
		   if(_s.charAt(0) == "/") {
		   		return _s.substr(1,_s.length);
		   	}else{
		   		return _s;
		   }
		})(absDef);
		CMS_Path.PAGE.getAbsDirPath = function(_dir){
			_dir = URL_U.treatDirName(_dir)
			var dir = ""
			if(_dir !== "") {
				dir = _dir;
			} else{
				dir = CMS_Path.PAGE.ABS;
			}
			return dir;
		}
		CMS_Path.PAGE.getRelDirPath = function(_dir){
			_dir = URL_U.treatDirName(_dir)
			var s = ""
			if(_dir == ""){
				s = CMS_Path.PAGE.REL;
			} else{
				s = (CMS_Path.SITE.REL + _dir);
				s = s.split("//").join("/");
			}
			return s
		}
		CMS_Path.PAGE.getURL = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var u = CMS_Path.SITE.URL + CMS_Path.PAGE.getAbsPath(_id,_dir);
			return URL_U.treatURL(u);
		}
		CMS_Path.PAGE.getAbsPath_deco = function(_id,_dir,_type){
			var s = CMS_Path.PAGE.getAbsPath(_id,_dir,_type);
			var t = '<span class="_icon_dir_mini"></span><a href="{URL}" target="{TAR}">{T}</a>'
			var u = CMS_Path.PAGE.getRelPath(_id,_dir);
			t = t.split("{URL}").join(u);
			t = t.split("{TAR}").join(_getTargetName(u));
			t = t.split("{T}").join(URL_U.getBaseDir(s) + '<b>' + URL_U.getFileName(s) + '</b> ' +Dic.I.External)
			return t;
		}
		CMS_Path.PAGE.getAbsPath = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			if(!_id ) return "";
			var dir = ""
			if(_dir !== "") {
				dir = _dir;
			} else{
				dir = CMS_Path.PAGE.ABS;
			}
			var s = ""
				s = dir + _id + ".html";
			s = s.split("//").join("/");
			return s;
		}
		CMS_Path.PAGE.getAbsPath_reverse = function(_s){
			var a = _s.split("/")
			var dirs = []
			for (var i = 0; i <  a.length-1 ; i++) {
				dirs.push(a[i])
			}
			var fileName = URL_U.getFileName(_s)
			var id = fileName.split(".")[0]
			var dir = URL_U.treatDirName(dirs.join("/"));
			var type = Dic.PageType.PAGE;
			if(dir.indexOf(CMS_Path.PAGE.ABS) == "0") {
				if(dir == CMS_Path.PAGE.ABS) {
					dir = ""
				}else{
					if(CMS_Path.PAGE.ABS !="/"){
						dir = dir.split(CMS_Path.PAGE.ABS).join("")
						dir = dir.split("/").join("");
					}
				}
			}
			//root
			if(a.length == 2) dir = "/";
			//
			if(CMS_Path.PAGE.ABS == "/") {
				if(dir == "/") dir = "";
			}
			return { id: id, dir: dir, type: type };			
		}
		CMS_Path.PAGE.getRelPath = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var s = ""
			if(_dir == ""){
				s = CMS_Path.PAGE.REL + _id + ".html";
			} else{
				s = CMS_Path.SITE.REL + _dir + _id + ".html";
				s = s.split(".//").join("./");
			}
			return s;
		}
		
		//ASSET
		CMS_Path.ASSET = {}
		CMS_Path.ASSET.URL = URL_U.treatURL(CMS_Path.SITE.URL + absSett);
		CMS_Path.ASSET.REL = ASSET_DIR_PATH
		CMS_Path.ASSET.ABS = absSett;
		CMS_Path.ASSET.ABS2 = (function(_s){ 
			if(_s == "/")return _s;
		   if(_s.charAt(0) == "/") {
		   		return _s.substr(1,_s.length) 
		   	}else{
		   		return _s;
		   }
		})(absSett);
		CMS_Path.ASSET.getAbsDirPath = function(_dir){
			_dir = URL_U.treatDirName(_dir)
			var dir = ""
			if(_dir !== "") {
				dir = _dir;
			} else{
				dir = CMS_Path.ASSET.ABS;
			}
			return dir;
		}
		CMS_Path.ASSET.getRelDirPath = function(_dir){
			_dir = URL_U.treatDirName(_dir)
			var s = ""
			if(_dir == ""){
				s = CMS_Path.ASSET.REL;
			} else{
				s = (CMS_Path.SITE.REL + _dir);
				s = s.split("//").join("/");
			}
			return s
		}
		CMS_Path.ASSET.getURL = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var u = CMS_Path.SITE.URL + CMS_Path.ASSET.getAbsPath(_id,_dir);
			return URL_U.treatURL(u);
		}
		CMS_Path.ASSET.getAbsPath_deco = function(_id,_dir,_type){
			var s = CMS_Path.ASSET.getAbsPath(_id,_dir,_type);
			var t = '<span class="_icon_dir_mini"></span><a href="{URL}" target="{TAR}">{T} </a>'
			var u = CMS_Path.ASSET.getRelPath(_id,_dir,_type);
			t = t.split("{URL}").join(u);
			t = t.split("{TAR}").join(_getTargetName(u));
			t = t.split("{T}").join(URL_U.getBaseDir(s) + '<b>' + URL_U.getFileName(s) + '</b> '+Dic.I.External);
			return t
		}
		CMS_Path.ASSET.getAbsPath_deco_file = function(_id,_dir){
			var s = ( _dir + _id).split(CMS_Path.SITE.REL).join("/");
			var t = '<span class="_icon_dir_mini"></span><a href="{URL}" target="{TAR}">{T} </a>'
			var u =  _dir + _id;
			t = t.split("{URL}").join(u);
			t = t.split("{TAR}").join(_getTargetName(u));
			t = t.split("{T}").join(URL_U.getBaseDir(s) + '<b>' + URL_U.getFileName(s) + '</b> '+Dic.I.External);
			return t
		}
		CMS_Path.ASSET.getAbsPath = function(_id,_dir,_type){
			if(_type == undefined) _type = Dic.PageType.PAGE;
			_dir = URL_U.treatDirName(_dir)
			if(!_id ) return "";
			var dir = ""
			if(_dir !== "") {
				dir = _dir;
			} else{
				dir = CMS_Path.ASSET.ABS;
			}
			var s = ""
			if(_type == Dic.PageType.PAGE){
				s = dir + _id + ".html";
			}
			if(_type.indexOf("_cms_") == 0){
				s = CMS_Path.ASSET.ABS + dir + _id + ".json"
			}
			if(_type == Dic.PageType.FILE){
				s=  CMS_Path.ASSET.ABS + dir + _id;
			}
			s = s.split("//").join("/");
			return s;
		}
		CMS_Path.ASSET.getRelPath = function(_id,_dir,_type){
			if(_type == undefined) _type = Dic.PageType.PAGE;
			_dir = URL_U.treatDirName(_dir)
			var s = "";
			if(_type == "file"){
				s = CMS_Path.ASSET.REL + _dir + _id;
			} else {
				if(_dir == ""){
					s = CMS_Path.ASSET.REL + _id + ".html";
				} else{
					s = CMS_Path.SITE.REL + _dir + _id + ".html";
				}
			}
			s = s.split("//").join("/");
			if(_type.indexOf("_cms_") == 0){
				s = CMS_Path.ASSET.REL + _dir + "/" + _id + ".json";
			}
			return s;
		}
		
		//ASSETとPAGE分岐
		CMS_Path.ASSET_PAGE = {}
		CMS_Path.ASSET_PAGE.getAbsPath = function (_id,_dir,_type){
			if(_type == Dic.PageType.PAGE){
				return CMS_Path.PAGE.getAbsPath(_id,_dir);
			} else{
				return CMS_Path.ASSET.getAbsPath(_id,_dir,_type);
			}
		}

		/* ---------- ---------- ---------- */
		
		CMS_Path.JSON = {}
		CMS_Path.JSON.URL = CMS_Path.ASSET.URL + Dic.DirName.JSON +"/";
		CMS_Path.JSON.REL = CMS_Path.ASSET.REL + Dic.DirName.JSON +"/";
		CMS_Path.JSON.ABS = CMS_Path.ASSET.ABS + Dic.DirName.JSON +"/";
		CMS_Path.JSON.getRelDirPath = function(_type,_dir){
			_dir = URL_U.treatDirName(_dir)
			var s = ""
			if(_type == Dic.PageType.PAGE) s =  CMS_Path.JSON.REL;
			var seti = false
			if(_type == Dic.PageType.PRESET) seti = true;
			if(_type == Dic.PageType.CMS_MYTAG) seti = true;
			if(_type == Dic.PageType.SYSTEM) seti = true;
			if(seti){
				if(_dir != ""){
					if(_dir.indexOf("/") == -1) _dir += "/" ;
					s = CMS_Path.ASSET.REL + _dir;
					s = s.split("//").join("/");
				}
			}
			return s
		}
		CMS_Path.JSON.getURL = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var u = CMS_Path.SITE.URL + CMS_Path.JSON.getAbsPath(_id,_dir)
			return URL_U.treatURL(u);
		}
		CMS_Path.JSON.getAbsPath = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			if(!_id) return "";
			return CMS_Path.JSON.ABS + CMS_Path.JSON.getFileName(Dic.PageType.PAGE,_id,_dir);
		}
		CMS_Path.JSON.getRelPath = function(_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var ff = CMS_Path.JSON.getFileName(Dic.PageType.PAGE,_id,_dir);
			return CMS_Path.JSON.REL + ff;
		}
		CMS_Path.JSON.getFileName = function(_type,_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var r = CMS_Path.JSON.getFileName_core(_type,_id,_dir)
			return r
		}
		CMS_Path.JSON.getFileName_core = function(_type,_id,_dir){
			_dir = URL_U.treatDirName(_dir)
			var ex = ".json"
			if(_type == Dic.PageType.PRESET) return _id + ex
			if(_type == Dic.PageType.CMS_MYTAG) return _id + ex
			if(_type == Dic.PageType.SYSTEM) return _id + ex
			
			//special
			if(_dir == "") return "_html_." + _id  + ex
			if(_dir == "/")return "" + _id  + ex
			
			//先頭の/を削除
			if(_dir.substr(0,1) == "/") {
				_dir = _dir.substr(1,_dir.length-1)
			}
			//最後に/を追加
			if(_dir.substr(_dir.length-1,1) != "/") {
				_dir += "/"
			}
			var s = "";
				s += _dir.split("/").join(".");
				s += _id;
			return s  + ex;
		}

		/* ---------- ---------- ---------- */
		
		//JSON_REV 20160429 revision用
		CMS_Path.JSON_REV = {}
		CMS_Path.JSON_REV.URL = CMS_Path.ASSET.URL + Dic.DirName.JSON_REV +"/";
		CMS_Path.JSON_REV.REL = CMS_Path.ASSET.REL + Dic.DirName.JSON_REV +"/";
		CMS_Path.JSON_REV.ABS = CMS_Path.ASSET.ABS + Dic.DirName.JSON_REV +"/";
		CMS_Path.JSON_REV.getRelDirPath = function(_type,_dir,_date){
			var s = CMS_Path.JSON.getRelDirPath(_type,_dir);
				s = s.split("/"+Dic.DirName.JSON).join("/"+Dic.DirName.JSON_REV);
			return s;
		}
		CMS_Path.JSON_REV.getRelPath = function(_id,_dir,_date){
			_dir = URL_U.treatDirName(_dir)
			var ff = CMS_Path.JSON_REV.getFileName(Dic.PageType.PAGE,_id,_dir,_date);
			return CMS_Path.JSON_REV.REL + ff;
		}
		CMS_Path.JSON_REV.getFileName = function(_type,_id,_dir,_date){
			var s = CMS_Path.JSON.getFileName(_type,_id,_dir);
				s = s.split(".json").join("."+_date+".json");
			return s;
		}
		
		//PHP	
		CMS_Path.PHP_LOGIN 		 = "login.php";
		CMS_Path.PHP_FILEPATH 	 = "storage.php";
		CMS_Path.PHP_DIRECTORY 	 = "directory.php";
		CMS_Path.PHP_EMBED 		 = "embed.php";
		CMS_Path.PHP_UPLOAD 	 = "upload.php";
		CMS_Path.PHP_BACKUP 	 = "backup.php";
		
		//その他
		CMS_Path.PREVIEW_HTML 	 = "_cms_preview.html";
	}

	/* ---------- ---------- ---------- */
	
	function _getTargetName(_u){
		var t = _u;
			t = t.split("/").join("");
			t = t.split(".").join("");
		if(t == "") t = "_blank";
		return t;
	}
	
	/* ---------- ---------- ---------- */
	
	//サイトトップのフルパス
	function _getBaseDir(url, _siteroot) {
		url = url.split("#")[0];
		var dir = url.substring(0, url.lastIndexOf("/"));
		var dd = _siteroot.match(/..\//g)
		if (dd == null) return dir + "/";
		var deep = dd.length;
		var ss = dir.split("/");
		var a = []
		for (var i = 0; i < ss.length - deep; i++) {
			a.push(ss[i])
		}
		return a.join("/") + "/";
	}
	
	/* ---------- ---------- ---------- */
	
	function _getRelTop(_path){
		_path = _path.split("../").join("")
		_path = _path.split("./").join("")
		var a = _path.split("/");
		var s = ""
		for (var i = 0; i <  a.length ; i++) {
			if(a[i] != "") s += "../";
		}
		if(s == "") return "./";
		return s;
	}
	function getAbs(_path,_root){
		if(_path.indexOf(_root) == 0){
			return _path.substr(_root.length-1 ,_path.length)
		}
		return "";
	}
	
	function treatRel(_path){
		_path = _path.split("../").join("");
		_path = _path.split("./").join("");
		return _path;
	}
	
	function imagePathTreat(_s){
		return _s.split("__IMAGE_DIR_SAMPLE__").join(CMS_Path.IMAGE_DIR_SAMPLE)
	}
	
	return {
		init: init,
		_getBaseDir: _getBaseDir,
		_getRelTop: _getRelTop,
		getAbs: getAbs,
		treatRel: treatRel,
		imagePathTreat:imagePathTreat,
}
})();