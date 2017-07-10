
var CMS_CheckedView = (function(){
	var view;
	var v = {};
	var useLogin = true;
	
	function init(){
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){

		//バージョン
		checkVersion(function(_v){
			CMS_ServerStatusFunc.setVersion(_v)
			//WAFチェック
			checkWAF(function(){
				//書き込み権限チェック
				checkWritable(function(_s){
					if(_s.status == "0")showLoginView(_s);
					if(_s.status == "1")checked();
				});
			})
			//,function(){
				// errorWAF();
			//	IS_ESCAPE_WAF = true;
			//});
		},function(_s){
			errorPHP(_s);
		});
	}
	
	function setBtn(){
	}
	function treat(_s){
		_s = _s.split("../").join("/");
		_s = _s.split("///").join("/");
		_s = _s.split("//").join("/");
		return _s;
	}
		
	/* ---------- ---------- ---------- */

	function errorPHP(_s){
		var m = ""
			m += '<div class="_title">エラーが発生しました<div>'
			m += '<div>'+_s+'<div>'
		showError(m);
	}
	/*
	function errorWAF(_s){
		var m = '<div class="_title"><i class="fa fa-warning" style="color:red"></i> JS CMS サーバーチェック</div>'
			m += '<br><div class="_attention">WAF機能はOFFにしてください。</div><br>';
			m += 'お使いのウェブサーバーでは、WAF<span class="_small"> (Webアプリケーションファイヤーウォール) </span>機能が有効の可能性があります。<br>';
			m += '有効の場合、JS CMSの管理画面は、うまく動作しないため、CMSの設定か、ウェブサーバーの設定を変更していただく必要があります。<br>';
			m += '以下の、どちらかの方法で対応してください。<br>'
			m += '<br>'
			// m += '<span class="_h">■方法A .haccessを設置</span>';
			// m += 'JS CMSの管理画面のみ、WAF機能の一部をOFFにします。<br>';
			// m += 'アップロードした_cms/ディレクトリ内の以下のファイルをリネームしてください。<br>';
			// m += '　・変更前：_.htaccess<br>';
			// m += '　・変更後：.htaccess<br>';
			// m += '<br>'
			
			m += '<span class="_h">■方法A ―― CMS設定ファイルを変更</span>';
			m += '設定ファイル <b>/_cms/setting/setting.js</b> の 300行目あたりを以下のように変更してください。<br>';
 			m += '<div class="_box-sett">';
			m += 'var IS_ESCAPE_WAF = false;<br>';
			m += ' ↓ 変更<br>';
			m += 'var IS_ESCAPE_WAF = true;<br>';
			m += '</div>'
			
			m += '<span class="_h">■方法B ―― サーバー管理画面で設定</span>';
			m += 'レンタルサーバーを利用であれば、各サーバー会社さまの管理画面より、WAF機能をOFFにしてください。<br>';
			m += '( OFFにしても、反映されるまで5分〜1時間程度、時間がかかります )<br>';
			m += '独自サーバーの場合は、サーバー管理者に相談してください。<br>';
			m += '<br>'
			m += 'JS CMS紹介サイトでは、各レンタルサーバー会社さまごとの、情報を掲載してますので、そちらも参考にしてください。<br>';
			m += '<br>'
			m += '- '+CMS_LINKs.waf;
		showError(m);
	}
	*/
	function showLoginView(_s) {
		var m = '<div class="_title"><i class="fa fa-warning color:red"></i> JS CMS サーバーチェック</div>'
		if(_s.message == CMS_E.DIR_ERROR) {
			m += 'サイトルート、およびHTML書き出し用ディレクトリに、書き込み権限がありません。<br>'
			m += 'FTPソフトなどで、以下のディレクトリに対して、<span class="_attention">書き込み権限（707など）</span>を設定してください。<br>'
			m += '以下のディレクトリが無い場合は、作成してください。<br>'
			m += 'HTML書き出し用のサブディレクトリも同様に設定してください。'
			m += '<ul class="_errorList">'
			var files = _s.extra.split(",")
			for (var i = 0; i <  files.length ; i++) {
				files[i] = treat( files[i]+"/" );
				if(files[i] == "/"){
					m += '<li><span class="_icon_dir"></span>/ (サイトディレクトリ)</li>'
				} else{
					m += '<li><span class="_icon_dir"></span>' + files[i] + '</li>'
				}
			}
			m += '</ul>'
		}
		showError(m);
	}
	function showError(_s) {
		var tag = "";
			tag += '<div id="CMS_CheckedView">';
			tag += _s
			tag += '</div>';
		$("body").html(tag);
		view = $('#CMS_CheckedView');
		view.show();
	}
	function checked() {
		callback();
	}
	function checkVersion(_callback,_callback_e) {
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: "check.php?action=checkVersion" ,
			dataType		: 'json',
			success : function(data) { _callback(data); },
			error : function(data) { _callback_e(data.responseText); }
		});
	}
	function checkWritable(_callback) {
		var r = "&publish_dir=" + escape_url(ASSET_DIR_PATH);
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: "check.php?action=checkEditable" + r,
			dataType		: 'json',
			success			: function(data) {
				_callback(data);
			},
			error : function(data) { _callback_e(data.responseText); }
		});
	}
	function checkWAF(_callback,_callback_e) {
		var param = {}
			param.action = 'waf';
			param.text = '<script type="text/javascript" src=""></script>'
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: "check.php",
			data			: param,
			dataType		: 'json',
			success			: function(data) {
				_callback(data);
			},
			error : function(data) { 
				window.IS_ESCAPE_WAF = true;
				_callback(data);
				// _callback_e(data.responseText);
			}
		});
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
	}
	var callback = true;
	function stageIn(_callback){
		if(window.IS_CHECK_ENV != true){
			_callback();
			return;
		}
		if(! isOpen){ isOpen = true;
			callback = _callback
			if(isFirst){
				createlayout();
				setBtn();
			}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();
