
var CMS_E = {}
	CMS_E.DIR_ERROR = "dir error";
	CMS_E.PARSE_ERROR = '<div style="color:red;background:#ff0;">パースエラー</div>';
	CMS_E.NOT_FOUND = "file or directory not found";
	CMS_E.getText = function(_s){
		if(_s == this.DIR_ERROR) return "ディレクトリがありません";
		if(_s == this.NOT_FOUND) return "ディレクトリかファイルがありません";
		return _s;
	}
	
	