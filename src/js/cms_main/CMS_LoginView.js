
var CMS_LoginView = (function(){
	var view;
	var v = {};
	var useLogin = true;
	
	function init(){
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		getLoginState(function(_s){
			if(_s == "0")showLoginView();
			if(_s == "1")logined();
			if(_s == "2"){
				useLogin = false;
				logined();
			}
		});
	}
	
	function setBtn(){
	}
	
	function getLoginState(_callback) {
		var url = CMS_Path.PHP_LOGIN;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url+"?action=state",
			dataType		: 'json',
			success			: function(data) {
				_callback(data.status);
			},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		});
	}
	
	function logined(){
		callback();
		setInterval(function(){
			updateLoginState();
		},1000*60*5);
	}
	
	/* ---------- ---------- ---------- */
	
	function showLoginView(){
		var tag = "";
			tag += '<div id="CMS_LoginView">';
			tag += '	<div class="_title">'+SITE_NAME+'</div>';
			tag += '	<div class="_read">Powered by JS CMS version '+CMS_INFO.version +' <i class=" fa fa-info-circle"></i> '+CMS_INFO.loginAbout+'</div>';
			tag += '	<table>';
			tag += '	<tr><th>ID</th><td><input type="text" class="_in_login_u" /></td></tr>';
			tag += '	<tr><th>PASS</th><td><input type="password" class="_in_login_p" /></td></tr>';
			tag += '	<tr><th></th><td>'
			tag += '		<div class="_cms_btn_alpha _btn_memori_ac"><i class="fa fa-check-square "></i> ID PASSを保存する</div>'
			tag += '		<div class="_cms_btn_alpha _btn_memori"><i class="fa fa-square-o "></i> ID PASSを保存する</div>'
			tag += '	</td></tr>';
			tag += '	<tr><td></td><td><div class="_cms_btn_alpha _btn_login">LOGIN</div></td></tr>';
			tag += '	<tr><td></td><td><div class="_t_message"></div></td></tr>';
			tag += '	</table>';
			tag += '</div>';
		$("body").html(tag);
		view = $('#CMS_LoginView');
		view.show();
		v.btn_login = view.find('._btn_login');
		v.in_login_u = view.find('._in_login_u');
		v.in_login_p = view.find('._in_login_p');
		v.t_message = view.find('._t_message');

		v.btn_login.click(function(){ 
			var id = v.in_login_u.val();
			var ps = v.in_login_p.val();
			login(id,ps);
		});
		
		setMemoriInit()
	}
		
	/* ---------- ---------- ---------- */
	var isSaveLoginInfo = "1"
	function setMemoriInit() {
		if(localStorage["isSaveLoginInfo"]) isSaveLoginInfo = localStorage["isSaveLoginInfo"];
		v.btn_memori_ac = view.find('._btn_memori_ac');
		v.btn_memori = view.find('._btn_memori');	
		v.btn_memori_ac.click(function(){ setMemori("0")});
		v.btn_memori.click(function(){ setMemori("1")});
		setMemori(isSaveLoginInfo);
		
		if(isSaveLoginInfo != "0"){
			var ids = ["",""];
			if(localStorage["saveLoginInfo"]) ids =JSON.parse(localStorage["saveLoginInfo"]);
			v.in_login_u.val(ids[0]);
			v.in_login_p.val(ids[1]);
		}
	}
	function setMemori(_b) {
		v.btn_memori.hide()
		v.btn_memori_ac.hide()
		if(_b == "0"){
			v.btn_memori.show()
		} else{
			v.btn_memori_ac.show()
		}
		localStorage["isSaveLoginInfo"] = _b;
	}
	function setMemoriInfo(_id,_ps) {
		var a = ["",""]
		if(isSaveLoginInfo) a = JSON.stringify([_id,_ps]);
		localStorage["saveLoginInfo"] = a;
	}
	
	/* ---------- ---------- ---------- */
	
	function login(_u,_p) {
		setMemoriInfo(_u,_p);
		var url = CMS_Path.PHP_LOGIN;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url + "?action=login",
			data			: {u:_u,p:_p},
			dataType		: 'json',
			success			: function(data) {login_comp(data) },
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		})
	}
	function login_comp(_json){
		if(_json.status == 1){
			stageOut();
			callback();
		} else{
			v.t_message.html("ID、もしくはPASSが正しくありません");
		}
	}
	
	/* ---------- ---------- ---------- */
	
	function updateLoginState() {
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: "login.php?action=state",
			dataType		: 'json',
			success			: function(data) {
				//
			}
		});
	}
	
	/* ---------- ---------- ---------- */
	
	function getLogout() {
		return useLogin
	}
	function logout() {
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: CMS_Path.PHP_LOGIN + "?action=logout",
			dataType		: 'json',
			success			: function(data) {
				location.reload();
			}
		})
	}

	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		//view.hide();
	}
	var callback = true;
	function stageIn(_callback){
		if(! isOpen){ isOpen = true;
			//view.show();
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
			//view.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		getLogout: getLogout,
		logout: logout
	}
})();
