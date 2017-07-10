
var CMS_Asset_UploaderView 	= (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_Asset_UploaderView');
		stageInit();
	}
	
	function createlayout(){

		var tag = "";
			tag += '<div class="_header">'
			tag += '	<div class="_guide">'+CMS_GuideU.getGuideTag("window/upload","_BASE_")+'</div>'
			tag += '	<div class="_title"><i class="fa fa-upload "></i> ファイルアップロード</div>'
			tag += '	<div class="_btn_close"><i class="fa fa-lg fa-times-circle "></i> </div>'
			tag += '</div>'
			tag += '<div class="_body">';
		if(Env_.isIE9){
			tag += '	<div style="padding:10px;color:red;font-size:18px;">'
			tag += '		ファイルアップロードは、ご利用のブラウザでは利用出来ません。<br>'
			tag += '		GoogleChoromeか、IE10以上を利用してください。'
			tag += '	</div>';
		} else{
			tag += '	<div class="_path"></div>';
			tag += '	<div class="_uploadArea"></div>';
			tag += '	<div class="_alertArea">'
			tag += '		<i class="fa fa-exclamation-triangle "></i> このディレクトリには、書き込み権限が無いため、ファイルをアップロードできません。<BR>'
			tag += '		FTPソフトなどで書き込み権限(707など)のパーミッションを設定してください。<br><br>';
			tag += '		<div class="_cms_btn-mini _btn_check_reload ">再度チェック</div>'
			tag += '	</div>';
		}
			tag += '</div>';
		view.html(tag);
		
		v.btn_check_reload = view.find('._btn_check_reload')
		v.btn_check_reload.click(function(){ 
			v.alertArea.hide()
			setTimeout(function(){ checkDir() },200);
		});

		v.btn_close = view.find('._btn_close');
		v.path = view.find('._path')
		v.alertArea = view.find('._alertArea')
		v.uploadArea = view.find('._uploadArea')
		v.alertArea.hide()
		v.uploadArea.hide();
		
		setBtn();
	}
	
	function setBtn(){
		v.btn_close.click(function(){ stageOut() });
		registAssetFloatView(function(){stageOut()});
	}
	/* ---------- ---------- ---------- */
	
	var dir
	var callback
	var fileListClass
	
	function initUpload(_dir,_fileListClass,_callback){
		if(uploaderView){
			uploaderView.remove();
			uploaderView = null;
		}
		
		var this_ = this;
		dir = _dir;
		fileListClass = _fileListClass;
		callback = _callback;
		var path = dir.split(CMS_Path.SITE.REL).join("");
		v.path.html('アップ先ディレクトリ：<span class="_bold"><span class="_icon_dir_mini"></span>' + path +'</span>');
		
		createMain()
	}
	var uploaderView
	function createMain(){
		checkDir();
	}
	function checkDir(){
		var param = '?action=checkDir';
			param += '&upload_dir=' + escape_url(dir);
		var url = CMS_Path.PHP_UPLOAD + param;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'json',
			success			: function(data) {
				if(data.status == "1"){
					createMain_uploader();
				} else{
					createMain_error();
				}
			},
			error: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		});
	}
	
	var isWriteable
	function createMain_uploader(){
		isWriteable = true;
		v.alertArea.hide()
		v.uploadArea.show();
		if(uploaderView) return;
		uploaderView = new CMS_Asset_UploaderView2( v.uploadArea , dir , fileListClass , callback );
		
	}
	function createMain_error(){
		isWriteable = false;
		v.alertArea.show()
		v.uploadArea.hide();
	}
	
	/* ---------- ---------- ---------- */
	
	function updateFileList(){
		if(uploaderView) uploaderView.updateFileList()
	}
	
	/* ---------- ---------- ---------- */
	
	var uploadWapView
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback = true;
	// var currentPath = "";
	function stageInit(){
		view.hide();
	}
	function stageIn(_dir,_fileListClass,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			
			if(isFirst){ createlayout(); }
			isFirst = false;
			
			initUpload(_dir,_fileListClass,_callback);
			view.show();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	return {
		init: init,
		// updateFileList: updateFileList,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();