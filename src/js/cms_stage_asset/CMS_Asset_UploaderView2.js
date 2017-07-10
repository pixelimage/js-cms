
var CMS_Asset_UploaderView2 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_dir,_fileListClass,_callback) {
	  this.init(_view,_dir,_fileListClass,_callback);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.callback;
	p.v;
	
	p.init = function(_view,_dir,_fileListClass,_callback) {
		
		CMS_Asset_UploaderState.init();
	
		var this_ = this;
		this.view = _view;
		this.dir = _dir;
		this.callback = _callback;
		this.fileListClass = _fileListClass;
		this.v = {}
		this.createView();
		
	}
	p.createView= function(_view) {
		var this_ = this;
		var tag = "";
			tag += '<div class="_list"></div>';
			tag += '<div class="_list_btns ">';
			tag += '	<div class="_upload_btn_uploads _cms_btn _cms_btn_active"><i class="fa fa-upload "></i> まとめてアップロード</div>';
			tag += '	<div class="_upload_btn_deletes _cms_btn "><i class="fa fa-minus-circle " style="color:red"></i> クリア</div>';
			tag += '</div>';
			tag += '<div class="_dragStage"><i class="fa fa-sign-in "></i> ここにファイルをドラッグ＆ドロップしてください。</div>';
			tag += '<div class="_notes" style="margin:10px 0">'
			tag += '	※ファイル名は、半角英数字小文字でアップロードする必要があります。<br>'
			tag += '	 - 大文字は小文字に自動変換されます<br>'
			tag += '	 - 全角文字の場合は、リネームしてください<br>'
			tag += '	※画像ファイルの場合は、最大寸法を超える場合は、収まるようにリサイズされます。<br>'
			tag += '	　最大寸法は、/_cms/setting/setting.jsで設定できます。'
			tag += '</div>';

		this.view.html(tag);
		
		this.v.dragStage  = this.view.find("._dragStage");
		this.v.list 	 = this.view.find("._list");
		this.v.list_btns  = this.view.find("._list_btns");
		
		this.v.upload_btn_uploads  = this.view.find("._upload_btn_uploads");
		this.v.upload_btn_uploads.click(function(){ 
			if(window.isLocked(true))return;
			this_.uploads();
		});
		
		this.v.upload_btn_deletes  = this.view.find("._upload_btn_deletes");
		this.v.upload_btn_deletes.click(function(){ this_.clearAll(); });
		
		this.setEvent()
		this.checkServer();
	}
	p.setEvent = function() {
		var this_ = this;
		var dragStage = this.v.dragStage;
		dragStage.on('dragenter', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css('border', '1px solid #0B85A1');
			CMS_Asset_UploaderState.setCurrentDragStage($(this))
		});
		dragStage.on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		dragStage.on('drop', function(e) {
			$(this).css('border', '1px dashed #0B85A1');
			e.preventDefault();
			this_.dragFileCheck(e.originalEvent.dataTransfer.files);
		});
	}
	p.checkServer = function() {
		CMS_Asset_UploaderState.checkServer(function(){});
	}
	p.removeFile = function(_id) {
		var a = []
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			if(this.CMS_Asset_UploadClass[i].id != _id) a.push(this.CMS_Asset_UploadClass[i])
		}
		this.CMS_Asset_UploadClass = a;
		this.updateList();
	}
	
	p.CMS_Asset_UploadClass
	p.reset = function() {
		this.CMS_Asset_UploadClass = []
	}
		
	p.dragFileCheck = function(files) {
		if(this.CMS_Asset_UploadClass ==undefined) this.reset();
		for (var i = 0; i < files.length; i++) {
			if(isLog) console.log(files[i]);
			if (CMS_Asset_UploadU.checkUploadableFile(files[i].type)) {
				if(this.checkSameFile(files[i].name) ==false){
					var uid = "_upload" + DateUtil.getRandamCharas(10);
					this.CMS_Asset_UploadClass.push(new CMS_Asset_UploadClass(this,files[i],this.dir,uid));
				}
			}
		}
		this.initStart();
	}
	p.initStart = function() {
		var this_ = this;
		var initedCount = 0
		var leng = this.CMS_Asset_UploadClass.length
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			this.CMS_Asset_UploadClass[i].initStart(function(){
				initedCount ++
				if(leng == initedCount){
					this_.updateList();
				}
			})
		}
	}
	p.checkSameFile = function(_s) {
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			if(this.CMS_Asset_UploadClass[i].name == _s)return;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */

	p.currentFilenames 
	p.checkFileNameInit = function() {
		this.currentFilenames = this.fileListClass.getCurrentFilelist();
	}
	p.checkFileName = function(_s) {
		for (var i = 0; i <  this.currentFilenames.length ; i++) {
			if(_s == this.currentFilenames[i])return true;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	//ファイルリストが更新された時にコールされる
	p.updateFileList = function() {
		if(this.CMS_Asset_UploadClass==undefined) return;
		this.checkFileNameInit()
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			this.CMS_Asset_UploadClass[i].updateFileList();
		}
	}
	
	/* ---------- ---------- ---------- */

	p.updateList = function(files) {
		this.checkFileNameInit();
		
		var a = []
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			if(this.CMS_Asset_UploadClass[i].state != "comp") a.push(this.CMS_Asset_UploadClass[i])
		}
		this.CMS_Asset_UploadClass = a;
		
		if(this.CMS_Asset_UploadClass.length == 0){
			this.v.list_btns.hide();
			this.v.list.html("");
			return;
		} else{
			this.v.list_btns.show();
		}
		
		var tag = "";
		tag += '<table class="_dragList">'
			tag += '<tr>'
			tag += '<th width="80" style="">サムネイル</th>'
			tag += '<th>ファイル名</th>'
			tag += '<th width="70" style="">画像<br>リサイズ</th>'
			tag += '<th width="70" style="">リネーム</th>'
			tag += '<th width="100" style="text-align:center;">更新日時<br>ファイル種類</th>'
			tag += '<th width="80" style="text-align:right;">ファイルサイズ</th>'
			tag += '<th width="90" style="text-align:center;">状態</th>'
			tag += '<th width="25" style="text-align:center;"></th>'
			tag += '</tr>'
		for (var i = 0; i < this.CMS_Asset_UploadClass.length; i++) {
			var info = this.CMS_Asset_UploadClass[i];
			tag += '<tr id="'+info.id+'">'
			tag += '<td class="_thumb"></td>'
			tag += '<td class="_names">'
			tag += '	<div class="_name_org"></div>'
			tag += '	<div class="_name_up"></div>'
			tag += '	<div class="_name_e _atten"></div>'
			tag += '	<div class="_size_wh_messe "></div>'
			tag += '</td>'
			tag += '<td class="_resize"><div class="_cms_btn-nano _upload_btn_resize">リサイズ</div></td>'
			tag += '<td class="_rename"><div class="_cms_btn-nano _upload_btn_rename">リネーム</div></td>'
			tag += '<td class="_date">'
			tag += '	' + CMS_SaveDateU.getRelatedDate(new Date(info.raw.lastModifiedDate)) + '<br>'
			tag += '	' + info.raw.type
			tag += '</td>'
			tag += '<td class="_size">'
			tag += '	' +FileU.formatFilesize(info.filesize)
			tag += '	<div class="_size_e _atten fs10"></div>'
			tag += '</td>'
			tag += '<td class="_controllArea">'
			tag += '	<div class="_progressArea">'
			tag += '		<div class="_progressText"></div>'
			tag += '		<div class="_progressBar"><div class="_bar"></div><div class="_bar_comp"></div></div>'
			tag += '	</div>'
			tag += '	<div class="_stateBtns">'
			tag += '		<div class="_upload_btn_upload"><i class="fa fa-upload "></i> </div>'
			tag += '		<div class="_upload_btn_cancel"><i class="fa fa-pause "></i> </div>'
			tag += '		<div class="_mark_error"><i class="fa fa-exclamation "></i> </div>'
			tag += '		<div class="_mark_done"><i class="fa fa-check "></i> </div>'
			tag += '	</div>'
			tag += '</td>'
			tag += '<td class="_delete"><div class="_upload_btn_delete"><i class="fa fa-minus-circle "></i> </div></td>'
			tag += '</tr>'
		}
		tag += "</table>"
		this.v.list.html(tag);
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			this.CMS_Asset_UploadClass[i].setView(this.v.list);
		}
	}
	p.clearAll = function() {
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			this.CMS_Asset_UploadClass[i].clear_()
		}
		this.CMS_Asset_UploadClass = [];
		this.updateList()
	}
	p.uploads = function() {
		for (var i = 0; i <  this.CMS_Asset_UploadClass.length ; i++) {
			this.CMS_Asset_UploadClass[i].upload()
		}
	}
	p.updateTID
	p.uploaded = function() {
		var this_ = this;
		if(this.updateTID)clearTimeout(this.updateTID);
		this.updateTID = setTimeout(function(){
			this_.uploaded_laater()
		},500);
	}
	p.uploaded_laater = function() {
		if(this.callback) this.callback();
		// this.updateList();
		CMS_Asset_UploaderView.stageOut();
	}
	p.remove = function() {
		this.view.empty();
	}
	
	return c;
})();