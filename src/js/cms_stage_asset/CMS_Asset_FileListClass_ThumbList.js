
var CMS_Asset_FileListClass_ThumbList = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_view,_path) {
	  this.init(_parent,_view,_path);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function(_parent,_view,_path) {
		this.parent = _parent;
		this.view = _view;
		this.targetDir = _path;
		this.v = {}
		this.createlayout()
		this.stageInit()
	}
	
	/* ---------- ---------- ---------- */

	p.createlayout=function(){
		var self = this;
		var tag = "";
			tag += '<div class="_replaceArea"></div>'
			// tag += '<div class="_update"></div>'
		this.view.append(tag)
		this.v.replaceArea = this.view.find('._replaceArea');
		// this.v.update = this.view.find('._update');
		
		this.view.on("click","._btn_file",function(){
			self.clickFile($(this).data("name"));
		})
		this.view.on("dblclick","._btn_file",function(){
			self.dClickFile($(this).data("name"));
		})
		// this.view.on("click","._btn_add",function(){
		// 	self.addFile2page($(this).data("name"));
		// })
	}
	
	/* ---------- ---------- ---------- */
	
	p.list
	p.updateTime
	p.updateViewTime
	p.update = function(_list,_updateTime) {
		var self = this;
		if(_list == undefined) return;
		this.updateTime = _updateTime;
		
		this.list = _list;
		if (!this.openFlg) return;
		if (!this.updateTime) return;
		
		if(this.updateTime == this.updateViewTime) return;
		this.updateViewTime = this.updateTime;

		// this.v.update.html(CMS_Asset_FileListU.getUpdateTime(this.updateTime));
		
		var tag = ""
		
			// tag += '<br><br><div>画像リスト</div>'
			tag += '<div class="_imagelist">'
		var imageCount = 0;
		if(this.list["files"]){
			var files = this.list.files;
			files.sort(function(a, b){
				return ( a.name > b.name ? 1 : -1);
			});
			for (var i = 0; i < files.length ; i++) {
				var node = files[i]
				var name_ = node.name
				var ns = name_.split(".");
				if(CMS_Asset_FileManageAPI.isImageFile(ns[ns.length-1])){
					var temp = '<div id="{ID}" class="_btn_file " data-name="{NAME}" data-path="{PATH_ABS}" data-path_rel="{PATH}">'
						temp += CMS_Asset_FileListU.getImagePreviewTag(node.filesize);
						// temp += '	<div class="_btn_add" data-path="{PATH}" data-name="{NAME}"><i class="fa fa-arrow-up"></i> 配置</div>'
						temp += '	<div class="_name">{NAME}</div>'
						temp += '	<div>'
						temp += '		<span class="_date">{DATE}</span>'
						temp += '		<span class="_size">{SIZE}</span>'
						temp += '	</div>';
						temp += '	<div class="_thumb_btns">'
						temp += '		<div class="_cms_btn-nano-icon _btn_rename_file" data-path="{PATH}" data-name="{NAME}"><i class="fa fa-wrench "></i> </div>'
						temp += '		<div class="_cms_btn-nano-icon-red _btn_del_file" data-path="{PATH}"><i class="fa fa-times "></i> </div>'
						temp += '	</div>';
						temp += '</div>';
						temp = temp.split("{ID}").join( this.getID( node.name ));
						temp = temp.split("{SRC}").join(this.targetDir + name_);
						temp = temp.split("{PATH}").join(node.path);
						temp = temp.split("{PATH_ABS}").join(node.path.split("../").join(""));
						temp = temp.split("{NAME}").join(name_);
						temp = temp.split("{DATE}").join(CMS_SaveDateU.getRelatedDate(node.filemtime));
						temp = temp.split("{SIZE}").join(FileU.formatFilesize(node.filesize));
					tag += temp;
					imageCount ++;
				}
			}
		}
		if(imageCount == 0){
			tag += '<div class="_anno">このディレクトリには、画像ファイル(PNG,GIF,JPG,SVG)画像がありません。</div>'
		} else{
			tag += '<div class="_note">ダブルクリックすると、画像ブロックとして、ページへ配置できます。</div>'
		}
		tag += '</div>';
		
		if(this.list["nodes"]){
			tag += '<table class="_filelist">'
			var dirs = this.list.nodes.nodes;
			dirs.sort(function(a, b){
				return ( a.name > b.name ? 1 : -1);
			});
			for (var i = 0; i <  dirs.length ; i++) {
				var node = dirs[i]
				var cnt = Number(node.dirCount) + Number(node.fileCount);
				var temp = '';
					temp += '<tr class="_row_dir">';
					temp += '<td><div class="_btn_dir" data-path="{PATH_ABS}" data-path_rel="{PATH}"><span class="{DIR_ICON}"></span> {NAME}{CNT}</div></td>';
					temp += '</tr>';
 					temp = temp.split("{DIR_ICON}").join((Number(node.dirCount)) ? '_icon_dir_has_sub':'_icon_dir_no_sub');
 					temp = temp.split("{CNT}").join( (cnt == 0) ? "" : '<span class="_cnt">'+ cnt+'</span>');
					temp = temp.split("{NAME}").join(node.name);
					temp = temp.split("{PATH}").join(node.path);
					temp = temp.split("{PATH_ABS}").join(node.path.split("../").join(""));
				tag += temp
			}
			tag += '</table>';
		}
		
		this.v.replaceArea.html(tag);
		
		this.isLoaded = this;
		if(this.loadedCallback) {
			this.loadedCallback();
			this.loadedCallback = null;
		}
	}
	/* ---------- ---------- ---------- */

	p.loadedCallback
	p.isLoaded = false;
	p.selectFile = function(_param){
		this.loadedCallback = null;
		var self = this;
		if(this.isLoaded){
			self.selectFile_core(_param);
		} else{
			this.loadedCallback = function(){
				self.selectFile_core(_param);
			}
		}
	}
	p.selectFile_core = function(_param,_cnt){
		var files = this.list.files;
		var self = this;
		var b = false;
		for (var i = 0; i <  files.length ; i++) {
			if(files[i].path == _param.dir + _param.id ){
				var id = files[i].name;
				if(_param.extra){
					this.clickFile(id,_param.extra);
				} else {
					this.clickFile(id);
				}
				this.updateCurrentPath(id);
				this.scrollCurrentPos(id);
				b = true;
			}
		}
		//該当ファイルがなければ、リトライ
		if(!b){
			if(_cnt == undefined){
				this.parent.update();
				setTimeout(function(){
					self.selectFile_core(_param,1);
				},500);
			}
		}
	}
	p.selectFile_core2 = function(_param){
	}
	// this.view.find("#" + this.getID(_id))
	p.clickFile = function(_id,_extra){
		var param = { dir: this.targetDir, id: _id }
		if(_extra) param.extra = _extra;
		CMS_Asset_FileDetailView.stageIn(param);
		CMS_Asset_FileListView.resetSelect(param);
		
		var tar = this.view.find("#" + this.getID(_id));
			tar.addClass("_current");
	}
	p.dClickFile = function(_id,_extra){
		CMS_AssetStage.addFile2page(this.targetDir + _id);
	}
	//画像URLリロード
	p.updateCurrentPath = function(_id){
		var tar = this.view.find("#" + this.getID(_id)).find("img");
		var rr = DateUtil.getRandamCharas(5);
		var src = tar.attr("src").split("?")[0]+"?"+rr;
		tar.attr("src",src);
	}
	
	//選択中のファイルへスクロール
	p.scrollCurrentPos = function(_id){
		var tar = this.view.find("#" + this.getID(_id));
		var y = tar.offset().top;
		var paY = tar.parent().offset().top;
		tar.closest("._body").scrollTop(y- paY);
	}
	
	/* ---------- ---------- ---------- */
	
	p.getID = function(_id){
		return "_assetThumb_" + CMS_AssetDB.getID( _id , this.targetDir );
	}
	
	/* ---------- ---------- ---------- */

	
	/**/
	p.openFlg = false;
	p.stageInit=function(){
		this.openFlg = false
		this.view.hide()
	}
	p.stageIn=function( )  {
		if (! this.openFlg) { 
			this.openFlg = true;
			this.view.show();
			this.loadedCallback = null;
			this.update(this.list,this.updateTime);
		}
	}
	p.stageOut=function( )  {
		if (this.openFlg) { this.openFlg = false
			this.view.hide()
		}
	}
	return c;
})();