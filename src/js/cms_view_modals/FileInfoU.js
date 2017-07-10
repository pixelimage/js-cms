//グループチェック
var FileInfo_CheckGID = (function(){
	
	var v = {}
	var callback
	var checkFileInit = true
	function setCallback(_filelist,_callback){
		callback = _callback;
		ids = [];
		// _filelist = [
		// 	 {dir:"/",id:"index"},
		// 	{dir:"",id:"index"},
		// 	{dir:"",id:"index2"}
		// ]
		var list =_filelist;
		if(list != undefined) {
			findID(list);
		}
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var ids = [];
	function findID(list){
		for (var i = 0; i < list.length ; i++) {
			if(list[i].type == Dic.ListType.HTML){
				ids.push(list[i].id)
				if(list[i].list != undefined){
					findID(list[i].list);
				}
			}
		}
	}
	function checkID(_id){
		for (var i = 0; i < ids.length ; i++) {
			if(_id == ids[i]){
				if(_id == defID){
				} else{
					return true;
				}
			}
		}
		return false;
	}

	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var action
	var annos = []
	
	function checkInit(_action,_id){
		 defID = _id
		 check(_action,_id);
	}
	function check(_action,_id){
		action = _action;
		
		annos = [];
		{
			if(_id == undefined) _id = "";
			if(_id == "") annos.push('<span class="_red">グループIDを入力してください。</span>');
			if(_id.charAt(0) =="_") annos.push('<span class="_red">1文字目は、アンダースコアは使用できません。</span>');
			if(_id.match(/[^0-9a-zA-Z_-]+/) != null )annos.push('<span class="_red">グループIDに、半角英数字以外の文字が含まれています。</span>');
		}
		
		if(checkID(_id)){
			annos.push('<span class="_red">すでに同じグループIDが存在します</span>');
		}
		var res = {}
			res.annos = annos
			// res.path = path;
		callback(res)
	}
	return {
		setCallback: setCallback,
		checkInit: checkInit,
		check: check
	}
})();

//IDチェック
var FileInfo_CheckID = (function(){
	
	var v = {}
	var callback
	var checkFileInit = true
	function setCallback(_filelist,_callback){
		callback = _callback;
		paths = [];
		// _filelist = [
		// 	 {dir:"/",id:"index"},
		// 	{dir:"",id:"index"},
		// 	{dir:"",id:"index2"}
		// ]
		var list =_filelist;
		if(list != undefined) {
			findID(list);
		}
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	//
	var paths = [];
	function findID(list){
		for (var i = 0; i < list.length ; i++) {
				var id = list[i].id;
				var dir = URL_U.treatDirName(list[i].dir);
				if(dir == "") dir = CMS_Path.PAGE.ABS
				if(list[i].type == Dic.ListType.PAGE){
					paths.push([id,dir])
				}
				if(list[i].list != undefined){
					findID(list[i].list);
				}
		}
	}
	function checkID(_id,_dir){
		for (var i = 0; i < paths.length ; i++) {
			if(_id == paths[i][0]){
				if(_dir == paths[i][1]){
					if(_dir == defDIR && _id == defID){
					} else{
						return true;
					}
				}
			}
		}
		return false;
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var tID
	function checkDir(_dir){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			checkDir_core(_dir)
		},300);
	}
	var checkDirDic = [];
	function checkDir_core(_dir){
		for (var i = 0; i <  checkDirDic.length ; i++) {
			if(checkDirDic[i][0] == _dir){
				return checkDirDic[i][1]
			}
		}
		checkDirDic.push([_dir,true]);
		
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var action
	var annos = []
	var defID = ""
	var defDIR = ""
	function checkInit(_action,_id,_dir){
		 defID = _id
		if(_dir == "") _dir = CMS_Path.PAGE.ABS
		 defDIR = URL_U.treatDirName(_dir);
		 check(_action,_id,_dir);
	}
	function check(_action,_id,_dir){
		action = _action
		if(action == "dir_edit")return;
		if(action == "html_edit")return;
		//
		annos = checkValidID(_id);
		_dir = URL_U.treatDirName(_dir)
		checkDir(_dir);
		var dirAnnos = [];
		{
			_dir = URL_U.treatDirName(_dir);
			if(_dir == "") _dir = CMS_Path.PAGE.ABS;
			if(_dir.match(/[^\/0-9a-zA-Z_-]+/) != null )annos.push('<span class="_red">ディレクトリ名に、半角英数字以外の文字が含まれています。</span>');
		}
		
		if(checkID(_id,_dir)){
			annos.push('<span class="_red">すでに同じファイル名が存在します</span>');
		}
		
		//DIR
		var siteURL = (function(_u){ 
		   if(_u.charAt(_u.length-1) == "/"){
				_u = _u.substr(0,_u.length -1)
			}
			return _u;
		})(CMS_Path.SITE.URL);
		
		var path = "公開URL : " + siteURL;
			path +=  "<span>"+ _dir+ _id+ ".html</span>";
		
		var res = {}
			res.annos = annos;
			res.path = path;
		callback(res)
	}
	
	
	function checkValidID(_id){
		var a = []
		if(_id == undefined) _id = "";
		if(_id == "") a.push('<span class="_red">ファイル名を入力してください。</span>');
		if(_id.charAt(0) =="_") a.push('<span class="_red">1文字目は、アンダースコアは使用できません。</span>');
		if(_id.match(/[^0-9a-zA-Z_-]+/) != null )a.push('<span class="_red">ファイル名に、半角英数字以外の文字が含まれています。</span>');
		return a;
	}
	
	return {
		setCallback: setCallback,
		checkInit: checkInit,
		check: check,
		checkValidID: checkValidID
	}
})();

var FileInfoU = (function(){
	
	/* ---------- ---------- ---------- */
	
	function getDirPath(param){
		if(param["dir"] != undefined){
			if(param["dir"] != ""){
				return param["dir"];
			}
		}
		if(CMS_Path.PAGE == undefined) return "";
		return CMS_Path.PAGE.ABS;
	}
	
	function getDirVal(_v){
		if(CMS_Path.PAGE == undefined) return "";
		if(_v == CMS_Path.PAGE.ABS) return "";
		return URL_U.treatDirName(_v);
	}
	return {
		getDirPath: getDirPath,
		getDirVal: getDirVal
	}
})();

