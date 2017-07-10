/**
 * TemplateFileEdi..で使用するIOクラス
 */

Storage.SimpleIO 	 = (function(_filename,_dir) {

	/* ---------- ---------- ---------- */
	var c = function(_filename,_dir) {
	 this.init(_filename,_dir);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.filename;
	p.text;
	
	p.init = function(_filename,_dir) {
		this.dir 	 = _dir;
		// if(this.dir.indexOf("/") == -1) this.dir = this.dir+  "/";
		this.filename  = _filename;
		this.text 	 = "";
	}
	p.reload = function(_callback) { 
		this.load(_callback);
	}
	p.load = function(_callback) { 
		var this_ = this;
		var path = this.dir+"/"+ this.filename;
		var url = CMS_Path.PHP_FILEPATH + '?action=read&path=' + path;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'text',
			success			: function(data) {this_.text = data;_callback(data)},
			error			: function(data) { 
				CMS_ErrorView.stageIn("NET",url,null,data);
				// alert("ファイルのロードに失敗しました。");
			}
		});
		if(isLog)console.log( ["Storage.SimpleIO.load ", path]);
	}
	p.preview = function(_callback) { }
	p.save = function(_t,_callback) { 
		
		var param ={}
			param.action  = "write";
			param.dir_name  = this.dir;
			param.file_name = this.filename;
			param.text 	 = _t;
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {
				if(API_StatusCheck.check(data) == false) return;
				_callback(data)
			},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		});
		if(isLog)console.log( ["Storage.SimpleIO.save ", param.file_name , param]);
	}
	return c;
})();


