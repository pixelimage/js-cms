
var CMS_Asset_UploadClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_raw,_dir,_id) {
	  this.init(_parent,_raw,_dir,_id);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	p.state
	p.parent
	p.raw 
	p.name 
	p.formData 
	p.img_url 
	p.id
	
	p.init = function(_parent,_raw,_dir,_id) {
		var this_ = this;
		this.state = ""
		this.v = {}
		this.parent  = _parent;
		this.raw 	 = _raw;
		this.type 	 = _raw.type;
		this.dir 	 = _dir;
		this.name 	 = _raw.name;
		this.nemeID  = FileU.getFileName(this.name);
		this.extention  = FileU.getExtention(this.name);
		this.name_up  = this.nemeID + "." + this.extention;
		this.isImage  = FileU.isImageFile(this.name);
		this.id 	 = _id;
	}
	
	/* ---------- ---------- ---------- */
	
	p.initStart = function(_callback) {
		this.initCallback = _callback;
		var this_ = this;
		if(this.isImage){
			CMS_Asset_UploadU.resize(this.raw, function(_w1,_w2,_file){
				this_.initStartImage(_w1,_w2,_file);
			});
		}else{
			this.formData = new FormData();
			this.formData.append('upfile',this.raw);
			this.filesize = this.raw.size;
			if(this.initCallback) this.initCallback();
		}
	}
	p.initStartImage = function(_wh_org,_wh_re,_file){
		this.wh_org = _wh_org;
		this.wh_re = _wh_re;
		//
		if(_file == undefined) _file = this.raw;
		this.img_url = window.URL.createObjectURL(_file);
		this.filesize = _file.size;
		this.formData = new FormData();
		this.formData.append('upfile',_file);
		if(this.initCallback) this.initCallback();
	}
	
	/* ---------- ---------- ---------- */
	
	p.resize = function() {
		var this_ = this;
		this.initCallback = null;
		var _U = CMS_Asset_UploadU;
		var ss = prompt("最大幅・高さを入力してください",_U.getMaxW() +"," +_U.getMaxH());
		var a = ss.split(",");
		if(a.length!=2){ return; }
		var rect = { w:a[0] , h:a[1] };
		CMS_Asset_UploadU.resize(this.raw, function(_w1,_w2,_file){
			this_.initStartImage(_w1,_w2,_file);
			this_.updateCheckWHSize()
			this_.updateCheckFileSize()
			this_.updateImage()
		},rect);
	}
	
	/* ---------- ---------- ---------- */

	p.setView = function(_parentView) {
		var this_ = this;
		this.view = _parentView.find("#"+this.id)
		this.v.state = this.view.find("._state")
		this.initCheckWHSize()
		this.initCheckFileSize()
		this.initCheckName()
		
		this.initBtns();
		this.initProgressBar();
		this.updateState();
		
	}
	
	/* ---------- ---------- ---------- */

	p.initCheckWHSize = function() {
		this.v.size_wh_messe = this.view.find("._size_wh_messe");
		this.updateCheckWHSize();
	}
	p.updateCheckWHSize = function() {
		if(this.wh_org == undefined ) return;
		if(this.wh_org.w != this.wh_re.w){
			if(this.wh_org.h != this.wh_re.h){
				var s = "";
					s += '<i class="fa fa-exclamation "></i> 画像寸法(幅x高)を変更します。<br>';
					s += this.wh_org.w + " x " + this.wh_org.h + 'px <i class="fa fa-long-arrow-right "></i>';
					s += "<b>" + this.wh_re.w + " x " + this.wh_re.h + "px</b>";
				this.v.size_wh_messe.html(s);
				this.v.size_wh_messe.show();
			}
		}
	}
	
	/* ---------- ---------- ---------- */

	p.isValidFileSize = false;
	p.initCheckFileSize = function() {
		this.v.size = this.view.find("._size")
		this.v.size_e = this.view.find("._size_e")
		this.updateCheckFileSize();
	}
	p.updateCheckFileSize = function() {
		this.isValidFileSize = CMS_Asset_UploaderState.checkFileSize(this.filesize);
		if(this.isValidFileSize == false){
			this.v.size.addClass("_overSize")
			this.v.size_e.html('<i class="fa fa-exclamation "></i> サイズオーバー<br>( '+CMS_Asset_UploaderState.getMaxSizeMB()+'MBまで )')
		}
	}
	
	/* ---------- ---------- ---------- */

	p.initCheckName = function() {
		var this_ = this;
		this.v.upload_btn_rename = this.view.find("._upload_btn_rename")
		this.v.upload_btn_rename.click(function(){ this_.rename();});
		this.v.upload_btn_resize = this.view.find("._upload_btn_resize")
		this.v.upload_btn_resize.click(function(){ this_.resize();});
		if(! this.isImage) this.v.upload_btn_resize.hide();
		
		this.v.name_org = this.view.find("._name_org");
		this.v.name_up = this.view.find("._name_up");
		this.v.name_e = this.view.find("._name_e");
		this.v._thumb = this.view.find("._thumb")
		this.updateImage();
		this.updateName();
	}
	p.updateImage = function() {
		if(this.img_url) this.v._thumb.html('<img src="'+this.img_url+'">')
	}
	p.updateName = function() {
		this.checkName();
		var this_ = this;
		this.v.name_org.html('<i class="fa fa-file-o "></i> ' + this.name +'<br>　　<i class="fa fa-long-arrow-down "></i> ');
		this.v.name_up.html('<i class="fa fa-file "></i> ' + this.name_up);
		if(this.name == this.name_up) this.v.name_org.html("")
	}
	p.isValidFilename = false;
	p.isSameFilename = false;
	p.checkName = function() {
		var this_ = this;
		this.isValidFilename = true;
		this.isSameFilename = false;
		if(this.parent.checkFileName(this.name_up) ){
			this.isSameFilename = true;
			this.v.name_e.show();
			this.v.name_e.html('<i class="fa fa-exclamation "></i> ' + "同名ファイルを上書します。");
		} else{
			var s = CMS_Asset_UploadU.checkFileName(this.name_up);
			if(s == ""){
				this.v.name_e.hide();
			} else{
				this.v.name_e.show();
				this.v.name_e.html('<i class="fa fa-exclamation "></i> ' + s);
				this.isValidFilename = false;
			}
		}
	}
	p.rename = function() {
		var this_ = this;
		var nn = FileU.getFileName(this.name_up)
		var s = prompt("リネームを行います。ファイル名を入力してください",nn)
		if(s){
			this.name_up = s + "." + this.extention;
			this.updateName();
		}
		this.updateState();
	}
	/* ---------- ---------- ---------- */
	//ファイルリストが更新された時にコールされる
	p.updateFileList = function() {
		this.updateName();
		this.updateState();
	}
	
	/* ---------- ---------- ---------- */

	p.initBtns = function() {
		var this_ = this;
		this.v.upload_btn_delete = this.view.find("._upload_btn_delete");
		this.v.upload_btn_cancel = this.view.find("._upload_btn_cancel");
		this.v.upload_btn_upload = this.view.find("._upload_btn_upload");
		
		this.v.upload_btn_delete.click(function(){ this_.parent.removeFile(this_.id);});
		this.v.upload_btn_cancel.click(function(){ this_.uploadAbort();});
		this.v.upload_btn_upload.click(function(){ 
			if(window.isLocked(true))return;
			this_.upload();
		});
		
		this.v.mark_done = this.view.find("._mark_done")
		this.v.mark_error = this.view.find("._mark_error")
	}
	
	p.initProgressBar = function() {
		this.v.progressText = this.view.find("._progressText");
		this.v.progressBar = this.view.find("._progressBar");
		this.v.progressBar_bar = this.view.find("._progressBar ._bar");
		this.v.progressBar_bar_comp = this.view.find("._progressBar ._bar_comp");
	}
	
	/* ---------- ---------- ---------- */

	p.updateState = function() {
		if(this.isValidFileSize == false){
			this.overSize();
			return;
		}
		if(this.state =="")			this.uploadPre();
		if(this.state =="wait")		this.uploadPre();
		if(this.state =="uploading")this.uploadProggress();
		if(this.state =="error")	this.errorUpload();
		if(this.state =="comp")		this.successUpload();
	}

	p.isValid = function() {
		var b = true;
		if(this.isValidFilename == false) b = false;
		return b
	}
	p.upload = function() {
		if (this.isValid() == false) return;
		if (this.state != "wait") return;
		this.uploadStart();
		
		var param = '?action=upload';
			param += '&upload_dir=' + escape_url(this.dir);
			param += '&fileName='+ this.name_up;
			
		var this_ = this;
		this.jqXHR = $.ajax({
			xhr: function() {
				var xhrobj = $.ajaxSettings.xhr();
				if (xhrobj.upload) {
					xhrobj.upload.addEventListener('progress', function(event) {
						var percent = 0;
						var position = event.loaded || event.position;
						var total = event.total;
						if (event.lengthComputable) {
							percent = Math.ceil(position / total * 100);
						}
						this_.uploadProggress(percent);
					}, false);
				}
				return xhrobj;
			},
			url: CMS_Path.PHP_UPLOAD + param,
			type: "POST",
			contentType: false,
			processData: false,
			cache: false,
			data: this.formData,
			success: function(data) {
				if (data.status == "1") this_.successUpload();
				if (data.status == "0") this_.errorUpload();
			},
			error: function(data) {
				this_.errorUpload();
			}
		});
	}
	
	//待機
	p.uploadPre = function() {
		this.resetState()
		this.state = "wait"
		this.v.state.html('<i class="fa fa-upload "></i> ')
		this.v.upload_btn_delete.show();
		this.v.upload_btn_rename.show();
		if(this.isValid()){
			this.v.upload_btn_upload.show()
		}
	}
	p.overSize = function() {
		this.resetState()
		this.state = "over";
		
	}
	//キャンセル
	p.uploadAbort = function() {
		this.resetState()
		this.state = "abort"
		this.jqXHR.abort();
		this.uploadPre();
	}
	//アップスタート
	p.uploadStart = function() {
		this.resetState()
		this.state = "start"
		this.v.upload_btn_cancel.show()
	}
	//アップ中
	p.uploadProggress = function(_s) {
		this.resetState()
		this.state = "uploading"
		this.v.upload_btn_cancel.show();
		this.view.addClass("_" + this.state)
		this.v.progressBar_bar.show()
		this.v.progressBar_bar.css("width",_s/2)
	}
	//エラー
	p.errorUpload = function() {
		this.resetState()
		this.state = "error"
		this.v.mark_error.show()
		this.v.progressText.html('エラー')
		this.view.addClass("_" + this.state)
		this.v.upload_btn_delete.show()
	}
	//完了
	p.successUpload = function() {
		this.resetState()
		this.state = "comp"
		this.v.mark_done.show()
		this.view.addClass("_" + this.state)
		this.v.progressBar_bar_comp.show();
		this.parent.uploaded();
	}
	//
	p.resetState = function() {
		this.v.progressBar_bar.hide()
		this.v.progressBar_bar_comp.hide()
		this.v.progressText.html('');
		this.v.upload_btn_upload.hide();
		this.v.upload_btn_cancel.hide();
		this.v.mark_done.hide();
		this.v.mark_error.hide();
		this.v.upload_btn_delete.hide();//
		this.v.upload_btn_rename.hide();
		this.view.removeClass("_" + "uploading")
		this.view.removeClass("_" + "error")
		this.view.removeClass("_" + "comp")
	}
	//
	p.clear_ = function() {
		this.raw = null;
		this.formData = null;
		this.jqXHR = null;
	}
	return c;
})();