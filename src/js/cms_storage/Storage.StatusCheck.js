
var API_StatusCheck = (function(){
	var view;
	var v = {};
	
	function openAlert(_s){
		if(CMS_AlertView){
			CMS_AlertView.stageIn("エラー",_s);
		} else{
			alert(_s);
		}
	}
	
	function check(data){
		if(data["status"] != undefined){
			if(data.status == -1) {
				openAlert("ログインしていません。再度、ログインしてください。");
				window.location.reload();
				return false;
			}
			if(data.status == 0){
				var b = true
				if(data["level"] != undefined){
					if(data.level == "0") b = false;
				}
				if(b){
					var mm = data.message
					if(data.message == CMS_E.DIR_ERROR) {
						mm = "";
						if(data["extra"] != undefined) mm += data.extra
						mm += "ディレクトリが存在しないか、書き込み権限がありません。"
					}
					openAlert("処理が正常に終了しませんでした。\n"+mm)
					return false;
				} else{
					return true;
				}
			}
			if(data.status == 1){
				return true;
			}
		}
		return true;
	}
	
	function checkWeak(data){
		if(data["status"] != undefined){
			if(data.status == -1) {
				openAlert("ログインしていません。再度、ログインしてください。");
				window.location.reload();
				return false;
			}
			if(data.status == 0){
				return false;
			}
			if(data.status == 1){
				return true;
			}
		}
		return true;
	}
	
	/**
	 * ファイル名のリネームや、削除時のチェック
	 * ファイルが存在しない場合があるので,0の場合もtrue
	*/
	/*
	function checkRename(data){
		if(data["status"] != undefined){
			if(data.status == -1) {
				openAlert("ログインしていません。再度、ログインしてください。");
				window.location.reload();
				return false;
			}
			if(data.status == 0){
				return true;
			}
			if(data.status == 1){
				return true;
			}
		}
		return true;
	}
	*/
	
	return {
		check: check,
		checkWeak: checkWeak
	}})();
