
var CMS_Header 			 = (function(){
	var view;
	var v = {};
	
	function init(){
		
		var toolBtns = (function(_a){ 
			var tag = "";
			for (var i = 0; i < _a.length ; i++) {
				if(_a[i] == "UPLOAD"){
				tag += '	<div class="_cms_btn_alpha _btn_file"><span class="ss_icon _file"></span><span class="_t">アップロード</span></div>';
				}
				if(_a[i] == "BACKUP"){
				tag += '	<div class="_cms_btn_alpha _btn_zip"></span><span class="_t"><i class="fa fa-download "></i> サイトバックアップ</span></div>';
				}
				if(_a[i] == "ICON"){
				tag += '	<div class="_cms_btn_alpha _btn_icon"><span class="_t"><i class="fa fa-leaf "></i> アイコン</span></div>';
				}
				if(_a[i] == "EMBED_TAG"){
				tag += '	<div class="_cms_btn_alpha _btn_embedtag"><span class="_t">{{ 埋込みタグ }}</span></div>';
				}
				if(_a[i] == "GRID"){
				tag += '	<div class="_cms_btn_alpha _btn_grid"><span class="_t"><i class="fa fa-th "></i> グリッド</span></div>';
				}
			}
			return tag;
		})(HEADER_TOOL_BTNS);
		
		var gudieTag = CMS_GuideU.getGuideTag("","利用ガイド","header") + " ";
		
		var loginTag = (function(_b){ 
			var tag = "";
				tag += '<div class="_menuset">';
			if(_b){
			 	tag += '<div class="_menu">設定・ログアウト <i class="fa fa-caret-down "></i></div>';
			 	// tag += '<div class="_menu _cms_btn_alpha _btn_logout"><i class="fa fa-user "></i> ログアウト <i class="fa fa-caret-down "></i></div>';
			} else{
				tag += '<div class="_menu">CMS設定 <i class="fa fa-caret-down "></i></div>';
			}
			tag += '	<div class="_float">';
			tag += '		<div class="_item _cms_btn_alpha _btn_setting"><i class="fa fa-lg fa-cog "></i> CMS設定</div>';
			tag += '		<div class="_item _cms_btn_alpha _btn_setting_php"><i class="fa fa-lg fa-cog "></i> ログイン設定</div>';
			tag += '		<div class="_item _cms_btn_alpha _btn_sever"><i class="fa fa-lg fa-globe "></i> サーバー情報</div>';
			
			if(_b){
			tag += '		<div class="_item _cms_btn_alpha _btn_logout"><i class="fa fa-lg fa-user "></i> ログアウト</div>';
			}
			tag += '		<div class="_item _cms_btn_alpha">'+gudieTag+'</div>';
			tag += '		<div class="_item _cms_btn_alpha _btn_cms">Powered by<br>JS CMS<br>version '+CMS_INFO.version+'</div>';
			tag += '	</div>'
			tag += '	</div>'
			return tag;
		})(CMS_LoginView.getLogout());
		
		var extraBtns = (function(_a){
			if(!_a)return;
			var tag = "";
			for (var i = 0; i <  _a.length ; i++) {
				var ls = _a[i]
				tag += '<div class="_menuset">';
				tag += '	<div class="_menu ">'+ls.label+'  <i class="fa fa-caret-down "></i></div>';
				tag += '	<div class="_float">';
				for (var u = 0; u < ls.items.length ; u++) {
					tag += '	<div class="_item _cms_btn_alpha">' + ls.items[u] + '</div>'
				}
				tag += '	</div>';
				tag += '</div>';
			}
			return tag;
		})(HEADER_EXTRA_BTNS);
		
		/* ---------- ---------- ---------- */
		
		view = $('#CMS_Header');
		var tag = "";
			tag += '<div class="_sitename _cms_ellipsis _cms_btn_alpha">' + SITE_NAME + '</div>';
			tag += '<div class="_header_btns">' + toolBtns + '</div>';
			tag += '<div class="_cmsBlock">' + loginTag + '</div>'
			tag += '<div class="_freeBlock">' + extraBtns + '</div>';
		view.html(tag)
		stageInit();
		stageIn();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */	
	
	function setBtn(){
		view.find('._sitename').click(function(){ CMS_U.openURL_blank(CMS_Path.SITE.REL); });
		
		view.find('._btn_icon').click(function(){ openIcon()});
		view.find('._btn_file').click(function(){ CMS_MainController.openUploadDir(); });
		view.find('._btn_zip').click(function(){ BackupView.stageIn(); });
		view.find('._btn_embedtag').click(function(){ openEmbed(); });
		view.find('._btn_grid').click(function(){ openGrid(); });
		
		view.find('._btn_setting').click(function(){ CMS_MainController.openCMSSetting("setting.js"); });
		view.find('._btn_setting_php').click(function(){ CMS_MainController.openCMSSetting("setting.php"); });
		view.find('._btn_sever').click(function(){ ServerInfoView.stageIn(); });
		view.find('._btn_logout').click(function(){CMS_LoginView.logout()});
		view.find('._btn_cms').click(function(){ window.open(CMS_INFO.url); });
		
		new CMS_UtilClass.HoverMenu(view.find('._menuset'),"._float");
	}
	
	function createlayout(){
	}
	
	/* ---------- ---------- ---------- */
	
	function openIcon(){
		Preset_IconView.stageIn();
		// Preset_IconView.stageIn(function(_s){
		// 	CMS_MainController.addTextToPage(_s);
		// });
	}
	function openEmbed(){
		EmbedTagListView.stageIn();
		// EmbedTagListView.stageIn("my",function(_s){
		// 	CMS_MainController.addHinagataToPage(_s);
		// 	// CMS_MainController.addTextToPage(_s);
		// });
	}
	function openGrid(){
		window.open("./grid/","grid_preview");
	}
	
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();


