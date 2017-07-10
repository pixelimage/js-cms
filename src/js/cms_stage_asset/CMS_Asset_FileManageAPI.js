var CMS_Asset_FileManageAPI = (function(){

	function isImageFile(_s){
		var ex = _s.toLowerCase();
		var b = false;
		if(_s == "gif") return true;
		if(_s == "jpg") return true;
		if(_s == "jpeg") return true;
		if(_s == "svg") return true;
		if(_s == "png") return true;
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	function upload(_targetDir,_view,_callback){
	    var fd = new FormData(_view);
	    // var fd = new FormData($('#uploadFile').get(0));
	    var u = "?action=upload&upload_dir=" + escape_url(_targetDir);
		var url = CMS_Path.PHP_FILEPATH + u;
	    $.ajax({
	        url: url,
	        type: "POST",
	        data: fd,
	        processData		: false,
	        contentType		: false,
			dataType		: 'json',
			success			: function(data) { _callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
	    });
	    
	}
	
	/* ---------- ---------- ---------- */
	
	function addFile(_targetDir,_s,_callback){
		var this_ = this;
		var param = {}
			param.action 	 = "write";
			param.file_name  = _s;
			param.dir_name  = escape_url(_targetDir);
			param.text  = "";
		
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: param,
			dataType		: 'json',
			success			: function(data) {_callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}
	
	/* ---------- ---------- ---------- */
	
	function deleteFile(_targetDir,_s,_callback){
		var this_ = this;
		var param ={}
			param.action 	 = "delete";
			param.deleteFile  = escape_url(_s);
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: param,
			dataType		: 'json',
			success			: function(data) {_callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}
	
	/* ---------- ---------- ---------- */
	
	function rename(_targetDir,_s1,_s2,_callback){
		// var newName = (function(){ 
		// 	// var ex = URL_U.getExtention(_s);
		// 	// var nn = URL_U.getFileID(_s);
		// 	var s = prompt("ファイル名を入力してください",_s);
		// 	if(s == null) return "";
		// 	if(s.match(/[^0-9a-zA-Z_./-]+/) != null ){
		// 		alert("半角英数字 ( 0-9 a-z A-Z _ . )で入力してください。");
		// 		return "";
		// 	}
		// 	if(s){
		// 		return s;
		// 	} else{
		// 		return "";
		// 	}
		// })();
		// if(newName == "") return;
		// if(newName == _s) return;
		
		var this_ = this;
		var param ={}
			param.action 	 = "rename";
			param.rename_old  = escape_url(_targetDir) + _s1;
			param.rename_new  = escape_url(_targetDir) + _s2;
			
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: param,
			dataType		: 'json',
			success			: function(data) {_callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}
	
	/* ---------- ---------- ---------- */
	
	function addDir(_targetDir,_s,_callback){
		var this_ = this;
		var param ={}
			param.action 	 = "createDir";
			param.dir_name  = escape_url(_targetDir) + _s;
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: param,
			dataType		: 'json',
			success			: function(data) {_callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}
	
	function renameDir(_targetDir,_s1,_s2,_callback){
		// var newName = (function(){ 
		// 	var s = prompt("ディレクトリ名を入力してください",_s);
		// 	if(s == null) return "";
		// 	if(s.match(/[^0-9a-zA-Z_/-]+/) != null ){
		// 		alert("半角英数字で入力してください。");
		// 		return "";
		// 	}
		// 	if(s){
		// 		return s;
		// 	} else{
		// 		return ""
		// 	}
		// })();
		
		// if(newName == "") return;
		// if(newName == _s) return;
		var this_ = this;
		var param ={}
			param.action 	 = "renameDir";
			param.dir_name  = escape_url(_targetDir) + _s1;
			param.dir_rename  = escape_url(_targetDir) + _s2;
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: param,
			dataType		: 'json',
			success			: function(data) {_callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}

	function deleteDir(_targetDir,_s,_callback){
		var this_ = this;
		var param ={}
			param.action 	= "deleteDir";
			param.dir_name  = escape_url(_s);
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: param,
			dataType		: 'json',
			success			: function(data) {_callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}
// 	action:write
// file_name:aa.txt
// dir_name:../_____html/
// text:
// CMS_Asset_FileManageAPI.createDir("../_____html/","_01",function(){alert(1)})

	/* ---------- ---------- ---------- */
	
	
	return { 
		isImageFile:isImageFile,
		upload:upload,
		addFile:addFile,
		deleteFile:deleteFile,
		rename:rename,
		
		addDir:addDir,
		renameDir:renameDir,
		deleteDir:deleteDir
	}
})();
