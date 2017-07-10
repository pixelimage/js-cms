
var Storage = {}
	
Storage.Util 	 = (function(){
	
	/* ---------- ---------- ---------- */
	//rename
	
	function renameAll(_a){
		var a = [];
		var b = [];
		for (var i = 0; i <  _a.length ; i++) {
			var _old = _a[i].old_;
			var _new = _a[i].new_;
			//JSON
			a.push(CMS_Path.JSON.getRelPath(_old.id,_old.dir));
			b.push(CMS_Path.JSON.getRelPath(_new.id,_new.dir));
			//JSON ヒストリ sitemapは更新されてるので、_oldではなく_newから取得
			var revs = CMS_Data.Sitemap.getRevision( _new.id , _new.dir );
			for (var nn = 0; nn <  revs.length ; nn++) {
				var _date = getFormattedID(revs[nn]);
				a.push(CMS_Path.JSON_REV.getRelPath(_old.id , _old.dir , _date));
				b.push(CMS_Path.JSON_REV.getRelPath(_new.id , _new.dir , _date));
			}
			//HTML
			a.push(CMS_Path.PAGE.getRelPath(_old.id,_old.dir));
			b.push(CMS_Path.PAGE.getRelPath(_new.id,_new.dir));
		}
		
		var param = {}
			param.action 	 = "renameAll";
			param.rename_olds  = escape_url(a.join(","));
			param.rename_news  = escape_url(b.join(","));
		if(isLog)console.log(["Storage.All" , param]);
		ajax(param);
	}
	
	function rename(_param1,_param2){
		var list = [{
			old_:{ id:_param1.id, dir:_param1.dir },
			new_:{ id:_param2.id, dir:_param2.dir }
		}]
		renameAll(list);
	}
	
	/* ---------- ---------- ---------- */
	//delete
	
	function delete_(_param){
		var list = [];
		list.push(CMS_Path.JSON.getRelPath(_param.id,_param.dir));
		
		var revs = CMS_Data.Sitemap.getRevision( _param.id , _param.dir );
		for (var nn = 0; nn <  revs.length ; nn++) {
			var _date = getFormattedID(revs[nn]);
			list.push(CMS_Path.JSON_REV.getRelPath(_param.id , _param.dir , _date));
		}
		list.push(CMS_Path.PAGE.getRelPath(_param.id,_param.dir));
		
		var param ={}
			param.action = "deleteFiles";
			param.file_names = escape_url(list.join(","));
		ajax(param);
	}
	
	/* ---------- ---------- ---------- */
	//まとめて削除
	
	var deleteList =[]
	function deleteSubFiles(_a){
		
		deleteList = []
		if(_a.list){
			_deleteSubFiles_loop(_a.list);
		}
		if(deleteList){
			var param ={}
				param.action = "deleteFiles";
				param.file_names = escape_url(deleteList.join(","));
			ajax(param);
		}
	}
	function _deleteSubFiles_loop(_a){
		for (var i = 0; i < _a.length ; i++) {
			if(_a[i].list){
				_deleteSubFiles_loop(_a[i].list)
			} else{
				//JSON
				deleteList.push(CMS_Path.JSON.getRelPath(_a[i].id,_a[i].dir))
				//JOSN rev
				var revs = CMS_Data.Sitemap.getRevision( _a[i].id , _a[i].dir );
				for (var nn = 0; nn <  revs.length ; nn++) {
					var _date = getFormattedID(revs[nn]);
					deleteList.push(CMS_Path.JSON_REV.getRelPath(_a[i].id , _a[i].dir , _date));
				}
				//HTML
				deleteList.push(CMS_Path.PAGE.getRelPath(_a[i].id,_a[i].dir))
			}
		}
	}
	
	
	/* ---------- ---------- ---------- */

	function ajax(param){
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {
				if(API_StatusCheck.check(data) == false) return;
				if(isLog)console.log(["_____ comp" , data])
			},
			error: function(data) {
				// if(isLog) console.log(data);
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		})
	}
	
	/* ---------- ---------- ---------- */
		
	function escape_(_param){
		if(window.IS_ESCAPE_WAF){
			//パス処理 ../ >> __DIR__
			if(_param.dir_name){ _param.dir_name = escape_url(_param.dir_name);}
			if(_param.dir_rename){ _param.dir_rename = escape_url(_param.dir_rename);}
			//
			//本文処理 ~~
			var b = false;
			if(_param.action == "waf") b = true;
			if(_param.action == "write") b = true;
			if(_param.action == "writeToTemp") b = true;
			if(_param.action == "writeAll") b = true;
			//
			if(b){
				if(_param["text"]){
					var _s = _param.text;
						_s = _s.split("~").join("__TILDE__");				
					var s = "";
					for (var i = 0; i < _s.length ; i++) {
						s += _s[i] + "~";
					}
					_param.waf_escape = "1";
					_param.text = s;
				}
			}
		}
		return _param;
	}
	
	

	/* ---------- ---------- ---------- */
	
	function getFormattedID(_s) {
		if(!_s)return ""
		_s = _s.split("/").join("");
		_s = _s.split(" ").join("_");
		_s = _s.split(":").join("");
		return _s;
	}
	
	return { 
		renameAll			: renameAll,
		rename				: rename,
		delete_				: delete_,
		escape_				: escape_,
		deleteSubFiles:deleteSubFiles
	 }
})();

