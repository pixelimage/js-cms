
var CMS_Asset_FileListClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_path,_extra) {
	  this.init(_parent,_path,_extra);
	}
	var p = c.prototype;
	
	/* ---------- ---------- ---------- */

	p.parentView 
	p.view
	p.v
	p.no
	
	p.init = function(_parent,_path,_extra) {
		this.parentView = _parent;
		this.targetDir = _path;
		this.extra = _extra;
		this.v = {}
		this.view = $('<div></div>');
		this.parentView.append(this.view);	
		this.setBtn();
		this.createlayout();
	}
	p.setBtn = function() {
		var self = this;
		
		//リネーム
		this.view.on("click","._btn_dir"	,function(){ self.openFile($(this).data("path_rel"))})
		this.view.on("click","._btn_rename_file"	,function(){ self.renameFile($(this).data("name")); })
		this.view.on("click","._btn_rename_dir"		,function(){ self.renameDir($(this).data("name")); })
		this.view.on("click","._btn_del_file"		,function(){ self.deleteFile($(this).data("path")); })
		this.view.on("click","._btn_del_dir"		,function(){ self.deleteDir($(this).data("path")); })
		this.view.on("mouseover","._btn_file_img_hover"	,function(){ self.hoverImage($(this)); });
	}
		
	p.createlayout = function() {
		var tag = ""
			tag += '<div class="_filelistArea">'
			tag += '	<div class="_files_thumb"></div>'
			tag += '	<div class="_files_list"></div>'
			tag += '</div>';
		this.view.html(tag);
		
		this.v.files_list = this.view.find('._files_list')
		this.v.files_thumb = this.view.find('._files_thumb')
		this.normalList 	= new CMS_Asset_FileListClass_List(this,this.v.files_list,this.targetDir)
		this.thumbList 		= new CMS_Asset_FileListClass_ThumbList(this,this.v.files_thumb,this.targetDir);
		
		this.updateListType();
		this.update();
	}
	/* ---------- ---------- ---------- */

	p.updateListType = function() {
		var _s = CMS_Asset_FileListState.getListType();
		if(_s == "normal"){
			this.normalList.stageIn();
			this.thumbList.stageOut();
		}
		if(_s == "normal2"){
			this.normalList.stageIn();
			this.thumbList.stageOut();
		}
		if(_s == "thumb"){
			this.normalList.stageOut();
			this.thumbList.stageIn();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	p.update = function() {
		var this_ = this;
		var p = "?action=getFileList"
			p += "&dir_name=" +escape_url(this.targetDir);
			// p += "&extentions=png_gif_jpeg_jpg";
			p += "&extentions=";
			p += "&showDir=1";
		var url = CMS_Path.PHP_DIRECTORY + p;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'json',
			success			: function(data) { this_.loaeded(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		});
		this.v.files_list.addClass("_process")
		this.v.files_thumb.addClass("_process")
	}
	p.currentList 
	p.loaeded = function(data) {
		if(API_StatusCheck.check(data) == false) return;
		
		this.currentList = data;
		var this_ = this
		setTimeout(function(){
			this_.v.files_list.removeClass("_process")
			this_.v.files_thumb.removeClass("_process")
		},100);
		
		var time = new Date()
		this.thumbList.update(data,time);
		this.normalList.update(data,time);
		// this.uploadWapView.updateFileList();
	}
	p.getCurrentFilelist = function() {
		var a = [];
		if(this.currentList){
			var fs = this.currentList.files;
			for (var i = 0; i <  fs.length ; i++) {
				a.push(fs[i].name)
			}
			var fs = this.currentList.nodes.nodes;
			for (var i = 0; i <  fs.length ; i++) {
				a.push(fs[i].name)
			}
		}
		return a;
	}
	
	/* ---------- ---------- ---------- */
	//ファイル追加	
	p.addFile = function() {
		var self = this;
		CMS_Asset_CreateFileView.stageIn(this,function(_type,_s){
			if(_type == "file"){
				CMS_Asset_FileManageAPI.addFile(self.targetDir,_s,function(){
					self.update();
				})
			}
			if(_type == "dir"){
				CMS_Asset_FileManageAPI.addDir(self.targetDir,_s,function(){
					self.update();
					CMS_AssetStage.refresh(self.targetDir);
				})
			}
		})
	}

	//アップロード
	p.uploadFile = function() {
		var self = this;
		CMS_Asset_UploaderView.stageIn(this.targetDir,this,function(){
			self.update();
		})
	}
	
	//大きい画像
	p.hoverImage = function(_v) {
		_v.removeClass("_img_big");
		_v.removeClass("_btn_file_img_hover");
		_v.html('<img src="' + _v.parent().data("path_rel") + '" >');
	}
	
	//ファイル削除
	p.deleteFile = function(_s) {
		if(window.isLocked(true))return;
		var self = this;
		var s = 'ファイルを削除しますか？<br><br><i class="fa fa-fw fa-file-text"></i> '  + _s;
		CMS_ConfirmView.stageIn("削除の確認",s,function(){
			CMS_Asset_FileManageAPI.deleteFile(self.targetDir, _s ,function(){
				self.update();
			})
		},"DELL");
	}
	
	//ファイル名変更
	p.renameFile = function(_s) {
		var self = this;
		CMS_Asset_RenameFileView.stageIn(this,_s,function(_new){
			CMS_Asset_FileManageAPI.rename(self.targetDir,_s,_new,function(){
				self.update();
			})
		})
	}
	
	/* ---------- ---------- ---------- */
	//DIR削除
	p.deleteDir = function(_s) {
		if(window.isLocked(true))return;
		var self = this;
		var s = 'ディレクトリを削除しますか？<br><br><span class="_icon_dir"></span> '  + _s;
		CMS_ConfirmView.stageIn("削除の確認",s,function(){
			CMS_Asset_FileManageAPI.deleteDir(self.targetDir, _s ,function(){
				self.update();
				CMS_AssetStage.refresh(self.targetDir);
			})
		},"DELL");
	}
	
	//DIR名変更
	p.renameDir = function(_s) {
		var self = this;
		
		CMS_Asset_RenameFileView.stageIn(this,_s,function(_new){
			CMS_Asset_FileManageAPI.rename(self.targetDir,_s,_new,function(){
				self.update();
				CMS_AssetStage.refresh(self.targetDir);
			})
		})
	}
		
	/* ---------- ---------- ---------- */
	
	p.openFile = function(_path) {
		CMS_Asset_DirArea.openFile({dir:_path,id:""})
	}
	
	/* ---------- ---------- ---------- */
	
	p.selectFile = function(_param) {
		this.thumbList.selectFile(_param);
		this.normalList.selectFile(_param);
	}
		
	/* ---------- ---------- ---------- */
	
	p.doExtra = function() {
		if(this.extra){
			if(this.extra.when_opened){
				this.extra.when_opened();
				this.extra.when_opened = null;
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	/**/
	p.openFlg = false;
	p.stageInit = function() {
		this.openFlg = false
		this.view.hide()
	}
	p.stageIn = function() {
		if (!this.openFlg) {
			this.openFlg = true;
			this.view.show();
			this.doExtra();
		}
	}
	p.stageOut = function() {
		if (this.openFlg) {
			this.openFlg = false
			this.view.hide()
		}
	}
	return c;
})();