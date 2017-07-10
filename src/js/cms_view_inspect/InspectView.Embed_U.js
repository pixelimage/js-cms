
InspectView.Embed_U = (function(){

	/* ---------- ---------- ---------- */
	//埋込み用チェック
	function checkFileExist(_path,_callback){
		//メモリリストチェック
		if(checkExistFileList(_path)) {
			_callback(_path, "" );
			return;
		}
		//PHPで実際にチェック
		Storage.Embed.checkFileExist(_path, function(error){
			if(error){
				_callback(_path,error);
			} else{
				//メモリリストに追加
				addExistFileList(_path);
				_callback(_path,"");
			}
		});
	}
	//ファイル確認済みのリスト
	var existFileList = []
	function checkExistFileList(_s){
		for (var i = 0; i <  existFileList.length ; i++) {
			if(existFileList[i] == _s) return true;
		}
		return false;
	}
	function addExistFileList(_s){
		if(checkExistFileList(_s) == false){
			existFileList.push(_s)
		}
	}
	
	/* ---------- ---------- ---------- */
	//書出し用チェック
	
	function checkDirExist(_path,_callback){
		//メモリリストチェック
		if(checkExistDirList(_path)) {
			_callback(_path, "" );
			return;
		}
		//PHPで実際にチェック
		Storage.Embed.checkDirExist(_path, function(error){
			if(error){
				_callback(_path,error);
			} else{
				//メモリリストに追加
				addExistDirList(_path);
				_callback(_path,"");
			}
		});
	}
	//ディレクトリ確認済みのリスト
	var existDirList = []
	function checkExistDirList(_s){
		var dir = CMS_Path.SITE.REL + URL_U.getBaseDir(_s);
		for (var i = 0; i <  existDirList.length ; i++) {
			if(existDirList[i] == dir) return true;
		}
		return false;
	}
	function addExistDirList(_s){
		var dir = CMS_Path.SITE.REL + URL_U.getBaseDir(_s);
		if(checkExistDirList(dir) == false){
			existDirList.push(dir)
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//ファイルパスをチェック
	function checkFilePath(_path,_param){
		_param = (_param) ? _param : {};
		if(_path == ""){
			return "-1";
		}
		if(_path.indexOf("_cms") == 0 ){
			return "CMSディレクトリ内には埋め込めません";
		}
		if(_path.charAt(_path.length -1) == "/" ){
			return "ファイルパスを入力してください";
		}
		if(_path.charAt(0) == "/" ){
			return "相対パスで入力してください";
		}
		if(_path.match(/[^0-9a-zA-Z_-¥.¥/]+/) != null){
			return "正しいファイルパスを入力してください";
		}
		var ex = URL_U.getExtention(_path);
		if(_param["isHTML"]){
			if(ex == "html" || ex == "htm"){
				//
			} else{
				return "HTMLファイル名を入力してください";
			}
		}
		return "";
	}
	
	/* ---------- ---------- ---------- */
	
	//埋め込みタグ
	function getEmbedTag(_id,_b){
		if(!_id) return "";
		if(_b){
			return ["<!-- EMBED:" + _id + " -->", "<!-- \/EMBED:" + _id + " -->"].join("");
		} else{
			return ["&lt;!-- EMBED:" + _id + " --&gt;", "&lt;!-- \/EMBED:" + _id + " --&gt;"].join("");
		}
	}
	function replaceEmbedText(_s,_id,_tag){
		var es = ["<!-- EMBED:" + _id + " -->", "<!-- \/EMBED:" + _id + " -->"];
		var rep = es[0] + "\n" + _tag + "\n" + es[1];
		var reg = new RegExp(es[0] + "(\n|.)*?" + es[1] , 'ig');
		if(_s.match(reg)){
			return _s.replace(reg, rep);
		} else{
			return false;
		}
	}
	return { 
		checkFileExist:checkFileExist,
		checkDirExist:checkDirExist,
		checkFilePath:checkFilePath,
		getEmbedTag:getEmbedTag,
		replaceEmbedText:replaceEmbedText
	}
})();

