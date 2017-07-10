
var BackupView 		 = (function(){
	var view;
	var v = {};
	var baseDir = "";
	var targetDir = ""
	
	var mustVersion ="5.2.0";
	var enableBackup = true
	
	function init(){
		view = $('#BackupView');
		stageInit();
		// setTimeout(function(){
		// 	BackupView.stageIn()
		// },500);
		if(CMS_ServerStatusFunc.checkCoverVersion(mustVersion) == false){
			enableBackup = false;
		}
	}
	function createlayout(){
		v = ModalViewCreater.createBaseView(BackupView,view);

		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("window/backup","_BASE_")+'</div>'
			tag += '<div class="_title"><i class="fa fa-download "></i> サイトバックアップとダウンロード</div>'
		v.header.html(tag);
		
			tag = ''
		if(enableBackup ){
			tag += '<div class="_read">サイトディレクトリ以下の、任意のディレクトリを、ZIPファイルでバックアップすることができます。<br>ZIPファイルは、バックアップ用ディレクトリ( <span class="_icon_dir"></span> ' +CMS_Path.BACKUP.ABS +' )に配置されます。</div><br>'
			tag += '<div id="BackupView_notWritable" style="display:none">';
			tag += 'バックアップディレクトリ（<span class="_icon_dir"></span> ' + CMS_Path.BACKUP.ABS + "）が存在しないか、書き込み権限がありません。 <br>";
			tag += "FTPソフト等で、ディレクトリを作成のうえ、書き込み権限(707など)を設定してください。";
			tag += '</div>';
			tag += '<div id="BackupViewCore" style="display:none">';
			tag += '	<div class="createBlock clearfix">';
			tag += '	<div id="BackupTargetView" class=""></div>';
			tag += '	<div id="BackupTargetArrow" class=""><i class="fa fa-arrow-right "></i> </div>';
			tag += '	<div id="BackupCreateView" class=""></div>';
			tag += '	</div>';
			tag += '	<div id="BackupListView"></div>';
			tag += '</div>';
		}else{
			tag += '<div class="_read">このウェブサーバーでは、バックアップ機能はご利用できません。</div>';
			tag += '<div class="_read">利用中のサーバーのPHPバージョン：<b>'+CMS_ServerStatus.version+'</b></div>';
			tag += '<div class="_read">バックアップ機能に必要なPHPバージョン：<b>'+mustVersion+'〜</b></div>';
		}
		
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close" '+TIP_ENTER+'>閉じる</div> ';
		v.footer.html(tag)
		
		v._btn_close = view.find('._btn_close');
		setBtn();

		if(enableBackup){
			BackupTargetView.init();
			BackupCreateView.init();
			BackupListView.init();
		}
	}
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
	}
	
	/* ---------- ---------- ---------- */
	
	function checkDir(){
		if(enableBackup == false)return;
		var p = "?action=getDirList&dir_name=" + escape_url(CMS_Path.BACKUP.REL);
			p += '&is_detail=1';
		var url = CMS_Path.PHP_DIRECTORY + p;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'json',
			success			: function(data) { checkDir_comp(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		})
	}
	function checkDir_comp(json){
		if(json.w == "1"){
			$("#BackupViewCore").show()
			BackupTargetView.stageIn();
			BackupListView.stageIn();
		} else{
			$("#BackupView_notWritable").show()
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback = true;
	// var currentPath = "";
	function stageInit(){
		view.hide();
	}
	function stageIn(_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback;
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			view.show();
			
			checkDir();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	function resize(){
		if(isOpen){}
	}
	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		resize: resize
	}
})();

