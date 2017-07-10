
var CMS_Asset_FileListClass_List = (function() {
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
		this.v.update = this.view.find('._update');
		
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

		this.v.update.html(CMS_Asset_FileListU.getUpdateTime(this.updateTime));
		
		var tag = ""
			tag += '<table class="_filelist">'
		
		if(this.list["nodes"]){
			var dirs = this.list.nodes.nodes;
			dirs.sort(function(a, b){
				return ( a.name > b.name ? 1 : -1);
			});
			for (var i = 0; i <  dirs.length ; i++) {
				var node = dirs[i]
				var cnt = Number(node.dirCount) + Number(node.fileCount);
				var temp = '';
					temp += '<tr class="_row_dir">'
					temp += '	<td><div class="_btn_dir" data-path="{PATH_ABS}" data-path_rel="{PATH}"><span class="{DIR_ICON}"></span> {NAME}{CNT}</div></td>';
					temp += '	<td width="50" class="_hideNarrow _date">{UPDATE}</td>'
					temp += '	<td width="50" class="_hideNarrow _size"></td>'
					temp += ' <td width="100" class="_hideNarrow">';
					temp += ' 	<div class="_btn_rename _btn_rename_dir" data-path="{PATH}" data-name="{NAME}"><i class="fa fa-wrench "></i> リネーム</div>'
					temp += ' 	<div class="_btn_del _btn_del_dir" data-path="{PATH}"><i class="fa fa-trash "></i></div>'
					temp += ' </td>';
					temp += '</tr>'
 					temp = temp.split("{DIR_ICON}").join((Number(node.dirCount)) ? '_icon_dir_has_sub':'_icon_dir_no_sub');
 					temp = temp.split("{CNT}").join( (cnt == 0) ? "" : '<span class="_cnt">'+ cnt+'</span>');
					temp = temp.split("{NAME}").join(node.name);
					temp = temp.split("{PATH}").join(node.path);
					temp = temp.split("{PATH_ABS}").join(node.path.split("../").join(""));
					temp = temp.split("{UPDATE}").join(CMS_SaveDateU.getRelatedDate(node.filemtime));
				tag += temp
			}
		}
		
		if(this.list["files"]){
			var files = this.list.files;
			files.sort(function(a, b){
				return ( a.name > b.name ? 1 : -1);
			});
			if(files.length > 0){
				for (var i = 0; i <  files.length ; i++) {
					var node = files[i];
					var name_ = node.name;
					var ex = CMS_AssetFileU.getExtention(name_);
					var cs = ["_btn_file"] ;
					// var isClickable = CMS_AssetFileU.isExtentionAll(ex);
					// var isEdtable = CMS_AssetFileU.isExtention(ex,"editable");
					// if(isClickable) cs.push("_btn_file");
					
					var temp = '';
						temp += '<tr class="_row_file" id="{ID}">'
						temp += ' <td><div class="{CLASS}" data-name="{NAME}">{ICON} {NAME}</div></td>'
						// temp += ' <td width="50" class="_hideNarrow" ><div class="_btn_add" data-name="{NAME}"><i class="fa fa-arrow-up"></i> 配置</div></td>'
						temp += ' <td width="50" class="_hideNarrow _date">{UPDATE}</td>'
						temp += ' <td width="50" class="_hideNarrow _size">{SIZE}</td>'
						temp += ' <td width="100" class="_hideNarrow">';
						temp += ' 	<div class="_btn_rename _btn_rename_file" data-path="{PATH}" data-name="{NAME}"><i class="fa fa-wrench "></i> リネーム</div>'
						temp += ' 	<div class="_btn_del _btn_del_file" data-path="{PATH}"><i class="fa fa-trash "></i></div>'
						temp += ' </td>';
						temp += '</tr>'
						temp = temp.split("{ID}").join( this.getID( node.name ));
						temp = temp.split("{NAME}").join(node.name);
						temp = temp.split("{PATH}").join(node.path);
						temp = temp.split("{PATH_ABS}").join(node.path.split("../").join(""));
						temp = temp.split("{UPDATE}").join(CMS_SaveDateU.getRelatedDate(node.filemtime));
						temp = temp.split("{SIZE}").join(FileU.formatFilesize(node.filesize));
						temp = temp.split("{CLASS}").join(cs.join(" "));
						temp = temp.split("{ICON}").join(CMS_AssetFileU.getFileIcon(ex));
					tag += temp;
				}
				tag += "</table>"
				tag += '<div class="_note">ダブルクリックすると、ファイルをボタンブロックとして、ページへ配置できます。<br>画像の場合は、画像ブロックとして配置されます。</div>'
			}
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
		this.loadedCallback = null
		var self = this;
		if(this.isLoaded){
			self.selectFile_core(_param);
		} else{
			this.loadedCallback = function(){
				self.selectFile_core(_param);
			}
		}
	}
	p.selectFile_core = function(_param){
		var files = this.list.files;
		for (var i = 0; i <  files.length ; i++) {
			if(files[i].path == _param.dir + _param.id ){
				if(_param.extra){
					this.clickFile(files[i].name,_param.extra);
				} else {
					this.clickFile(files[i].name);
				}
			}
		}
	}
	// p.addFile2page = function(_id){
	// 	CMS_AssetStage.addFile2page(this.targetDir + _id);
	// }
	p.clickFile = function(_id,_extra){
		var param = { dir: this.targetDir, id: _id }
		if(_extra) param.extra = _extra;
		CMS_Asset_FileDetailView.stageIn(param);
		CMS_Asset_FileListView.resetSelect(param);
		this.view.find("#" + this.getID(_id)).addClass("_current");
	}
	p.dClickFile = function(_id,_extra){
		CMS_AssetStage.addFile2page(this.targetDir + _id);
	}
	
	/* ---------- ---------- ---------- */
	
	p.getID = function(_id){
		return "_asset_" + CMS_AssetDB.getID( _id,this.targetDir );
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