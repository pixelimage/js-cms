var CMS_INFO = {
	name:"JS CMS",
	lastUpdate:"2018-10-12 22:56:41",
	version:"4.1.5.3",
	url:"http://www.js-cms.jp/",
	loginAbout:'<a href="http://js-cms.jp/" target="_blank">CMS紹介サイト</a>'
}

var CMS_LINKs = {};
	CMS_LINKs.waf = '<a href="http://www.js-cms.jp/waf.html" target="_blank">サーバーについて</a>';

window.SITE_DIR_PATH = "../";

if(window["HEADER_TOOL_BTNS"] == undefined) window.HEADER_TOOL_BTNS = [];
if(window["HEADER_EXTRA_BTNS"] == undefined) window.HEADER_EXTRA_BTNS = [];

if(window["ASSET_DIR_PATH"] == undefined) window.ASSET_DIR_PATH = "../html/";
if(window["DEFAULT_DIR_PATH"] == undefined) window.DEFAULT_DIR_PATH = window.ASSET_DIR_PATH;
if(window["UPLOAD_DIR_PATH"] == undefined) window.UPLOAD_DIR_PATH = "../images/";
if(window["BACKUP_DIR_PATH"] == undefined) window.BACKUP_DIR_PATH = "";
if(window["SITE_NAME"] == undefined) window.SITE_NAME = "サイト管理";
if(window["ASSET_CSS_DIRS"] == undefined) window.ASSET_CSS_DIRS = [];
if(window["DEFAULT_PAGE_W"] == undefined) window.DEFAULT_PAGE_W = 720;
if(window["FILEMANAGER_PREVIEW_LIMIT_MB"] == undefined) window.FILEMANAGER_PREVIEW_LIMIT_MB = 0.5;
if(window["BATCH_EXPORT_COUNT"] == undefined) window.BATCH_EXPORT_COUNT = 5;
if(window["IMAGE_BLOCK_BMP_ZOOM"] == undefined) window.IMAGE_BLOCK_BMP_ZOOM = 1.5;
if(window["DEFAULT_PAGE_WIDES"] == undefined) window.DEFAULT_PAGE_WIDES = [720];
if(window["USE_EDIT_LOCK"] == undefined) window.USE_EDIT_LOCK  = true;
if(window["IS_CHECK_ENV"] == undefined) window.IS_CHECK_ENV = true;
if(window["IS_DEMO"] == undefined) window.IS_DEMO = false;
if(window["IS_ESCAPE_WAF"] == undefined) window.IS_ESCAPE_WAF = false;
if(isSleniumTest) { window.ADD_BTN_SHOW_DEPTH = 9;}

// window.IS_ESCAPE_WAF = true;

$(function(){
	if(window["IS_TEST"] == true) return;
	CMS_InitController.init();
});


//テストフラグ
var isLog = false;
var isSleniumTest = false;
if(location.hash == "#cms_test") isSleniumTest = true;

//定数、ステータスなど
var CONST 				 = {
	SIDEVEIW_PAGE_PREFIX : "_sideview_page_",
	SITE_DIR : "{{SITE_DIR}}"
}

//ブラウザ環境特定
var Env_ = {
	isIE 		: false,
	isIE6 		: false,
	isIE7 		: false,
	isIE8 		: false,
	isIE78 		: false,
	isIE9 		: false,
	isIE10 		: false,
	isIE11 		: false,
	ieEdge 		: false,
	isFirefox 	: false,
	isOpera 	: false,
	isSafari 	: false,
	isChrome 	: false,

	isWin		: false,
	isMac		: false,
	isMobile	: false,
	isIPad		: false,
	isIPhone	: false,
	isAndroid	: false,
	isAndroidTablet : false,

	isSmartPhone:false,
	isTablet:false,

	init:function (){

		var ua = navigator.userAgent;
		{
			if(ua.indexOf('MSIE') != -1) this.isIE = true;
			if(ua.indexOf('trident') != -1) this.isIE = true;
			if(ua.indexOf('MSIE 6') != -1) this.isIE6 = true;
			if(ua.indexOf('MSIE 7') != -1) this.isIE7 = true;
			if(ua.indexOf('MSIE 8') != -1) this.isIE8 = true;
			if(ua.indexOf('MSIE 9') != -1) this.isIE9 = true;
			if(ua.indexOf('MSIE 10') != -1) this.isIE10 = true;
			if(ua.indexOf('Trident') != -1) {
				if(ua.indexOf('rv:11.0') != -1) {
					this.isIE11 = true;
				}
			}
			if(ua.indexOf('Edge') != -1) this.ieEdge = true;
			if(ua.indexOf('Firefox') != -1) 	this.isFirefox = true;
			if(ua.indexOf('Opera') != -1) 	this.isOpera = true;
			if(ua.indexOf('Safari') != -1) 	this.isSafari = true;
			if(ua.indexOf('Chrome') != -1) 	this.isChrome = true;
			if(ua.indexOf('Win') != -1)			this.isWin = true;
			if(ua.indexOf('Mac') != -1) 		this.isMac = true;
			if(ua.indexOf('iPad') != -1) 		this.isIPad = true;
			if(ua.indexOf('iPhone') != -1) 		this.isIPhone = true;
			if(ua.indexOf('Android') != -1){
				this.isAndroid = true;
				if(ua.indexOf('Mobile') != -1) {
				//
				} else{
					this.isAndroidTablet = true;
				}
			}
		}
		{
			if(this.isSafari) 	this.isFirefox = false;
			if(this.isChrome) 	this.isSafari = false;
			if(this.isIE7)		this.isIE78 = true;
			if(this.isIE8)		this.isIE78 = true;
			if(this.isIPad || this.isIPhone || this.isAndroid ||this.isAndroidTablet){
				this.isMobile = true;
			}
			if(this.isIPhone || this.isAndroid) 		this.isSmartPhone = true;
			if(this.isIPad || this.isAndroidTablet) 	this.isTablet = true;
		}
	}
}
Env_.init();

var Dic = {}
Dic.PageType = {
	PAGE: "page",
	FILE: "file",
	SYSTEM: "system",
	PRESET: "preset",
	CMS_MYTAG: "_cms_mytag",
	CMS_SITEMAP: "_cms_sitemap"
}

Dic.DirName	 = {
	SETTING :  "_setting",
	MYTAG :  "_mytag",
	PRESET :  "_preset",
	TEMPLATE :  "_template",
	JSON 	: "_json",
	JSON_REV : "_json"
}
Dic.ListType	 = {
	PAGE 	:  "page",
	DIR 	:  "dir",
	HTML 	:  "html"
}
Dic.GridType	 = {
	BASE 	:  "base",
	M_GRID 	:  "mgrid",
	FREE 	:  "free",
	TEMPLATE:  "template"
}
Dic.DEFAULT_TEMPLATE = "default.html";

Dic.SettingList = {
	dir: Dic.DirName.SETTING,
	id: "sitemap",
	type: Dic.PageType.CMS_SITEMAP,
	name: "サイトマップ"
}

//Myタグファイルリストが格納される
Dic.MyTagList = [];
//リストがない場合のデフォルト
Dic.MyTagListDef = {
	dir: Dic.DirName.MYTAG,
	id: "template",
	type: Dic.PageType.CMS_MYTAG,
	name: "ヘッダ等のUI用"
}

Dic.I = {
	// Edit : '<i class="fa fa-bars"></i>',
	Edit : '<i class="fa fa-align-left "></i> ',
	Grid : '<i class="fa fa-th "></i>',
	External : '<i class="fa fa-external-link-square "></i>'
}
//Dic.I.Grid

var UpdateDelay = (function() {
	var _time = 200;

	function init() {
		if(window["isSleniumTest"]) _time = 0;
	}
	function delay(_func) {
		if(_time == 0) {
			_func();
			return;
		}
		setTimeout(function(){
			_func();
		},_time);
	}
	return {
		init: init,
		delay: delay
	}
})();
UpdateDelay.init();

function escape_url(_s){
	if(window.IS_ESCAPE_WAF){
		_s = _s.split("../").join("__DIR__");
	}
	return _s;
}

function _run_script(_path){
	var script = document.createElement('script');
	script.setAttribute('src', _path + "?r"+ new Date().getTime() );
	var head = document.getElementsByTagName('head');
	head[0].appendChild(script);
}
