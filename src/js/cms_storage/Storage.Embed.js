
Storage.Embed 	 = (function(){
	
	/* ---------- ---------- ---------- */
	
	function checkDirExist(_path,_callback){
		var param = {}
			param.action = "checkDir";
			param.dir_name = CMS_Path.SITE.REL + URL_U.getBaseDir(_path);
		//
		checkCommon(param,_callback)
	}
	function checkFileExist(_path,_callback){
		var param = {}
			param.action = "checkFile";
			param.file_name = URL_U.getFileName(_path);
			param.dir_name = CMS_Path.SITE.REL + URL_U.getBaseDir(_path);
		//
		checkCommon(param,_callback)
	}
	function checkCommon(param,_callback){
		var url = CMS_Path.PHP_EMBED;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) { 
				if(API_StatusCheck.checkWeak(data) == false) {
					_callback(data.message);
				} else {
					_callback("");
				}
			},
			error			: function(data) { 
				_callback(false);
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		});
	}
	
	/* ---------- ---------- ---------- */
	
	function loadFile(_path,_callback){
		var param = {}
			param.action = "read";
			param.file_name = URL_U.getFileName(_path);
			param.dir_name = CMS_Path.SITE.REL + URL_U.getBaseDir(_path);
		var url = CMS_Path.PHP_EMBED;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'text',
			success			: function(data) { 
				if(API_StatusCheck.checkWeak(data) == false) {
					_callback(false);
				} else {
					_callback(true,data);
				}
			},
			error			: function(data) { 
				_callback(false);
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		});
	}
	
	/* ---------- ---------- ---------- */
	
	function writeFile(_path,_text,_callback){
		if(_text.length > 1000*10){
			writeFile_temp(_path,_text,_callback);
			return;
		}
		var param = {}
			param.action = "write";
			param.file_name = URL_U.getFileName(_path);
			param.dir_name = CMS_Path.SITE.REL + URL_U.getBaseDir(_path);
			param.text  = _text;
		var url = CMS_Path.PHP_EMBED;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {
				writeFile_comp(_callback,data);
			},
			error			: function(data) { 
				_callback(false);
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		});
	}
	
	function writeFile_temp(_path,_text,_callback){
		var param = {}
			param.action = "writeToTemp";
			param.file_name = URL_U.getFileName(_path);
			param.dir_name = CMS_Path.SITE.REL + URL_U.getBaseDir(_path);
			param.text = _text;
			
		var afterParam = {}
			afterParam.action = "renameTemp";
			afterParam.file_name = param.file_name;
			afterParam.dir_name = param.dir_name;
			
		var url = CMS_Path.PHP_EMBED;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) { writeFile_rename(_callback,data,afterParam)},
			error			: function(data) { 
				CMS_ErrorView.stageIn("NET",url,param,data);
				_callback(false);
			}
		});
	}
	function writeFile_rename (_callback,data,param){
		var this_ = this;
		if(API_StatusCheck.checkWeak(data) == false) {
			_callback(false);
			return;
		}
		var url = CMS_Path.PHP_EMBED;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {writeFile_comp(_callback,data)},
			error			: function(data) { 
				CMS_ErrorView.stageIn("NET",url,param,data);
				_callback(false)
			}
		})
	}
	function writeFile_comp (_callback,data){
		if(API_StatusCheck.checkWeak(data) == false) {
			_callback(false);
		} else{
			_callback(true);
		}
	}
	
	/* ---------- ---------- ---------- */
	//削除
	function deleteFile(_path,_callback){
		var param = {}
			param.action = "delete";
			param.file_name = URL_U.getFileName(_path);
			param.dir_name = CMS_Path.SITE.REL + URL_U.getBaseDir(_path);

		var url = CMS_Path.PHP_EMBED;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {
				if(API_StatusCheck.checkWeak(data) == false) {
					_callback(false);
				} else {
					_callback(true);
				}
			},
			error			: function(data) { 
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		});
	}
	return { 
		checkDirExist	: checkDirExist,
		checkFileExist	: checkFileExist,
		loadFile		: loadFile,
		writeFile		: writeFile,
		deleteFile		: deleteFile
	 }
})();

