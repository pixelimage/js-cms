
var CMS_PageList_ListClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view) {
	  this.init(_view);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_view) {
		this.type = Dic.ListType.DIR;
		this.v = {};
	}
	
	/* ---------- ---------- ---------- */
	
	p.path = ""
	p.registParent 		 = function (_parent,_parentView,_deep,_n){
		this.parent = _parent;
		this.parentView = _parentView;
		this.deep = (_deep == null) ? 0:_deep;
		this.numb = (_n == null) ? 0:_n;
		
		if(_parent.path == undefined)_parent.path = "";
		this.path += _parent.path + this.numb + "_";
	}
	
	/* ---------- ---------- ---------- */
	//#Data
	
	p.getData 	 		 = function (){
		return this.gridData.getRecords();
	}
	p.getDataAt 	 	 = function (_n){
		return this.gridData.getRecordAt(_n);
	}
	p.addData 	 		 = function (_param){
		this.gridData.addRecord(_param);
		this.update();
	}
	p.addDataAt 	 	 = function (data,_n){
		this.gridData.addRecordAt(data,_n);
	}
	p.changeData 	 	 = function (data,no){
		this.gridData.overrideRecordAt(data,no);
	}
	p.removeData 	 	 = function (no){
		this.gridData.removeRecordAt(no);
		this.update();
	}
	p.removeDataAll 	 = function (no){
		Storage.Util.deleteSubFiles(this.gridData.getRecordAt(no));
		this.gridData.removeRecordAt(no);
		this.update();
	}
	p.moveData 	 		 = function (targetNo,_move){	
		this.gridData.moveRecord(targetNo,_move);
		this.update();
	}
	p.initData 	 		 = function (_data,_no){
		this.no = _no;
		this.data = _data;
		this.gloupUID = _data.uid;
		this.gloupID = _data.id;
		this.gloupName = _data.name;
		this.gridData = new EditableView.GridClass();
		this.gridData.initRecords(_data.list);
		this.setInitView();
		this.update();
	}
	
	/* ---------- ---------- ---------- */
	//#setInitView
	var btnsCount = 0;
	p.setInitView 		 = function (){
		var this_ = this;
		var tag = '';
		if(this.data.id == undefined) this.data.id = "sitemap_root";
		this.uid = "sitemap_" +this.data.id;
		if(this.deep > 0){
			var pubText = CMS_PateStateU.getStateText(this.data.state);
			var pubClass = CMS_PateStateU.getPubClass(this.data.state);
			var cmsClass = CMS_PateStateU.getCMSClass(this.data.stateCMS);
			tag += '<div class="_subDir '+pubClass + " " + cmsClass +'" data-no="'+this.no+'" id="'+this.uid+'" data-isOpen="1" >';
			tag += '	<div class="_table _btn_dir ">';
			tag += '		<div class="_cell">';
			tag += '			<span data-no="'+this.no+'" class="_btn_dir_text" data-id="'+this.uid+'" data-name="'+this.data.name+'" data-myid="'+this.data.id+'">'
			tag += '			<span class="_icon"><i class="fa fa-folder-open fa-lg"></i> </span>'+this.data.name+pubText+'</span>';
			tag += '		</div>';
			tag += '		<div class="_cell _settingTD _pdt5">'
			tag += '			<span data-no="'+this.no+'" class=" _btn_dir_setting"><i class="fa fa-exclamation"></i> 設定</span>'
			tag += '		</div>';
			tag += '		<div class="_cell _wideShow _cell_edit">'
			tag += '			<div class="_right _pdt5"><div class="_cms_btn_alpha _btn_setting_all"><i class="fa fa-level-up fa-rotate-180 "></i> まとめて設定</div></div>';
			tag += '		</div>';
			tag += '		<div class="_cell _wideShow _cell_pub">'
			tag += '			<div class="_right _pdt5"><div class="_cms_btn_alpha _btn_publish_all"><i class="fa fa-level-up fa-rotate-180 "></i> まとめて公開</div></div>';
			tag += '		</div>';
			tag += '	</div>';
		} else{
			tag += '<div id="'+this.uid+'">';
		}
		
		//置換えエリア
			tag += '	<div class="_replaceAreaClose">'+this.getState()+'</div>';
			tag += '	<div class="_replaceArea"></div>';
			if(this.deep <= 1){
				tag += '<div class="_btnInfo clearfix" >'
				tag += '	<div class="_btnAdd  _btn_add _btn_add_file ss_icon _file_add2" data-tooltip2="ページ追加"></div>';
				tag += '</div>';
			}
			tag += '	<div class="clearfix _btns _btns_'+ this.path +' _show">';
			tag += '		<span class="_label">先頭に追加</span>';
			tag += '		<span class="_cms_btn_alpha _btn_add_t _btn_add_dir_t ss_icon _dir_add" data-tooltip="グループ追加"></span>';
			tag += '		<span class="_cms_btn_alpha _btn_add_t _btn_add_html_t ss_icon _html_add" data-tooltip="見出し追加"></span>';
			tag += '		<span class="_cms_btn_alpha _btn_add_t _btn_add_file_t ss_icon _file_add" data-tooltip="ページ追加"></span>';
			tag += '		<span class="_label" style="margin:0 0 0 20px;">最後に追加</span>';
			tag += '		<span class="_cms_btn_alpha _btn_add _btn_add_dir ss_icon _dir_add" data-tooltip="グループ追加"></span>';
			tag += '		<span class="_cms_btn_alpha _btn_add _btn_add_html ss_icon _html_add" data-tooltip="見出し追加"></span>';
			tag += '		<span class="_cms_btn_alpha _btn_add _btn_add_file ss_icon _file_add" data-tooltip="ページ追加"></span>';
			tag += '	</div>';
			tag += '</div>';
			
		this.view = $(tag);
		this.parentView.append(this.view);
		this.v.replaceAreaClose  = this.view.find('> ._replaceAreaClose');
		this.v.replaceView  = this.view.find('> ._replaceArea');
		this.v.replaceView.append(DragControllerFileList.getDropTag(this.no));

		this.v._btnInfoBtn = this.view.find('._btnInfo ._btn_add');
		this.v._btnInfoBtn.click(function(){ this_.openEditFileInfo_NewFile("LAST") });

		this.v.btn_setting_all = this.view.find('._btn_setting_all');
		this.v.btn_setting_all.click(function(){ this_.editSubFiles() });
		this.v.btn_setting_all.hover(
			function(){ this_.view.addClass("_hoverSetAll") },
			function(){ this_.view.removeClass("_hoverSetAll") }
		);

		this.v.btn_publish_all = this.view.find('._btn_publish_all');
		this.v.btn_publish_all.click(function(){ this_.publishAll() });
		this.v.btn_publish_all.hover(
			function(){ this_.view.addClass("_hoverPubAll") },
			function(){ this_.view.removeClass("_hoverPubAll") }
		);
		
		this.v.btn_dir = this.view.find('._btn_dir_text');
		this.v.btn_dir.click(function(){ this_.openCloseSubDir(this_.view) });
		this.v.btn_dir.bind("_closeAll",function(){ this_.closeSubDir(this_.view) });
		this.v.btn_dir.bind("_openAll" ,function(){ this_.openSubDir(this_.view) });
		// this.v.btn_dir.hover( 
		// 	function(event){this_.showFlowtPreview(this); event.stopPropagation();},
		// 	function(){Float_Preview.stageOut();}
		// );
		CMS_PageList_ListDB.add_(this.v.btn_dir);
		
		//初期開閉の判別
		if(this.data.id == "sitemap_root"){
			this.isInitOpen = true;
		} else{
			if(CMS_StatusFunc.checkSitemapDirOpens_by_id(this.data.id)){
				this.isInitOpen = true;
				
			} else{
				this.isInitOpen = false;
				this.closeSubDir(this.view);
			}
		}
		if(this.isInitOpen){
			this.v.replaceAreaClose.hide();
		}
		
		this.v.btn_add_t = this.view.find('._btn_add_t');
		this.v.btn_add_t.hover(
			function(){this_.firstDrops.addClass("_active")},
			function(){this_.firstDrops.removeClass("_active")}
		);
		this.v.btn_add = this.view.find('._btn_add');
		this.v.btn_add.hover(
			function(){this_.lastDrops.addClass("_active")},
			function(){this_.lastDrops.removeClass("_active")}
		);
		
		this.v.btn_setting = this.view.find('._btn_dir_setting');
		this.v.btn_setting.click(function(){ this_.showSetting(this); });
		
		this.v.add_dir_t = this.view.find('> ._btns > ._btn_add_dir_t');
		this.v.add_dir = this.view.find('> ._btns > ._btn_add_dir');
		this.v.add_dir_t	.click( function(){ this_.openEditFileInfo_NewDir("FIRST") });
		this.v.add_dir		.click( function(){ this_.openEditFileInfo_NewDir("LAST") });
		
		this.v.add_file_t = this.view.find('> ._btns > ._btn_add_file_t');
		this.v.add_file = this.view.find('> ._btns > ._btn_add_file');
		this.v.add_file_t	.click( function(){ this_.openEditFileInfo_NewFile("FIRST") });
		this.v.add_file		.click( function(){ this_.openEditFileInfo_NewFile("LAST") });
		
		if(this.deep > 0){ 
			DragControllerFileList.setDrag(this.parent,this.view,DragController.FILE_DROP);
		}
		
		this.v._btn_add_html_t = this.view.find('> ._btns > ._btn_add_html_t');
		this.v._btn_add_html = this.view.find('> ._btns > ._btn_add_html');
		this.v._btn_add_html_t	.click( function(){ this_.openEditFileInfo_NewHTML("FIRST") });
		this.v._btn_add_html	.click( function(){ this_.openEditFileInfo_NewHTML("LAST") });
	}
		
	p.getState = function(){
		return "";
	}
	
	p.showSetting = function(_tar){
		var no = Number($(_tar).attr("data-no"));
		CMS_PageList_ListEditNo = no;
		this.openEditFileInfo_EditDir(no);
	}
	
	// p.showFlowtPreview = function(_tar){
	// 	var tar = $(_tar);
	// 	var param = { id: tar.data("myid"), name: tar.data("name") }
	// 	var xy= { x:tar.offset().left, y:tar.offset().top }
	// 	Float_Preview.stageIn(Dic.ListType.DIR,xy,param);
	// }
	
	/* ---------- ---------- ---------- */
	
	p.isInitOpen
	
	/* ---------- ---------- ---------- */
	//#メニュー開閉 ディレクトリクリック時にコール
	
	p.openCloseSubDir 	 = function (tar){
		
		//ファイルドラッグ後にコールされるので、そのときはブロック
		if(DragControllerFileList.isDraging())return;
		
		//
		if(tar.attr("data-isOpen") == "1"){
			this.closeSubDir(tar);
		} else {
			this.openSubDir(tar);
		}
		CMS_PageListViewTree.saveDirManager();
	}
	p.closeSubDir  		 = function (tar){
		tar.addClass("_close");
		tar.find("._replaceAreaClose:first").show();
		tar.find("._replaceArea:first").hide();
		tar.find("._btns:last").removeClass("_show");
		tar.find("._icon:first").html('<i class="fa fa-folder fa-lg"></i> ');
		tar.attr("data-isOpen","0");
		
		
	}
	p.openSubDir  		 = function (tar){
		if(this.isInitOpen == false){
			this.isInitOpen = true;
			this.update();
		}
		tar.removeClass("_close");
		tar.find("._replaceAreaClose:first").hide();
		tar.find("._replaceArea:first").slideDown(200);
		tar.find("._btns:last").addClass("_show");
		tar.find("._icon:first").html('<i class="fa fa-folder-open fa-lg"></i> ');
		tar.attr("data-isOpen","1");
	}
	
	/* ---------- ---------- ---------- */
	//#フォルダ・ファイルの作成・編集・削除
	
	//新規フォルダ
	p.openEditFileInfo_NewDir   = function (_pos){
		if(window.isLocked(true))return;
		this.openEditFileInfo_comp("dir_new",FileInfoView_U.getParam("dir_new"),"",_pos);
	}
	p.openEditFileInfo_NewFile  = function (_pos){
		if(window.isLocked(true))return;
		var extra = { uid : this.gloupUID }
		// var ss = FileInfoView_U.getParam("file_new",{ uid : this.gloupUID });
		// console.log([ss.id,ss.dir,ss.name]);
		// return 
		this.openEditFileInfo_comp("file_new",FileInfoView_U.getParam("file_new",extra),"",_pos);
	}
	p.openEditFileInfo_NewHTML  = function (_pos){
		if(window.isLocked(true))return;
		this.openEditFileInfo_comp("html_new",FileInfoView_U.getParam("html_new"),"",_pos);
	}
	//それぞれ編集
	p.openEditFileInfo_EditDir  = function (_no){
		FileInfoView.stageIn("dir_edit",this.parent,this.parent.getDataAt(_no));
	}
	p.openEditFileInfo_EditFile = function (_no){
		editOriginData = clone(this.getDataAt(_no));
		FileInfoView.stageIn("file_edit",this,this.getDataAt(_no));
	}
	p.openEditFileInfo_EditHTML = function (_no){
		editOriginData = clone(this.getDataAt(_no));
		FileInfoView.stageIn("html_edit",this,this.getDataAt(_no));
	}
	
	//それぞれのコールバック
	p.openEditFileInfo_comp   = function (_action,_param,_extra,_pos){
		var this_ = this;
		
		//自動テスト用
		window._lastAddFile = _param;
		
		//new
		if(_pos == "FIRST"){
			if (_action == "dir_new") this.addDataAt(_param,0);
			if (_action == "file_new") this.addDataAt(_param,0);
			if (_action == "html_new") this.addDataAt(_param,0);
		} else {
			if (_action == "dir_new") this.addData(_param);
			if (_action == "file_new") this.addData(_param);
			if (_action == "html_new") this.addData(_param);
		}
		
		//edit
		if(_action == "dir_edit"){
			if(_extra =="delete"){
				var s1 = "削除の確認"
				var s2 = "グループ内のページも削除されますが、削除しますか？"
				CMS_ConfirmView.stageIn(s1,s2,function(){
					this_.removeDataAll(CMS_PageList_ListEditNo);
				},"DELL")
			} else{
				this.changeData(_param,CMS_PageList_ListEditNo);
			}
		}
		if(_action == "file_edit" || _action == "html_edit"){
			//ファイル編集削除の場合は、出力ファイル名の変更を行う
			editedData = clone(this.getDataAt(CMS_PageList_ListEditNo));
			if(_extra =="delete"){
				CMS_PageListViewTree.deleteFile(editedData);
				this.removeData(CMS_PageList_ListEditNo);
			} else{
				CMS_PageListViewTree.changeFileName(editedData,editOriginData);
				this.changeData(_param,CMS_PageList_ListEditNo);
			}
		}
		this.update();
	}
	
	/* ---------- ---------- ---------- */

	//#Update		
	p.tID;
	p.update = function (){
		//ドラッグ時になんどもコールされるので、ディレイ
		var this_ = this;
		if(this.tID) clearTimeout(this.tID);
		this.tID = setTimeout(function(){
			this_.update_delay();
		},50);
	}
	
	p.update_delay = function (){
		//初期に開いてないディレクトリは、レンダリングしない
		//開いたときに、レンダリング
		if(this.isInitOpen == false) return;
		
		//
		var this_ = this;
		var list = this.gridData.getRecords();
		
		if(this.nodeList != undefined){
			for (var i = 0; i <  this.nodeList.length ; i++) {
				this.nodeList[i].remove();
				this.nodeList[i] = null;
			}
		}
		this.nodeList = [];
		
		this.v.replaceView.html("");
		this.v.replaceView.append(DragControllerFileList.getDropTag(0));
		var dirCount = 0;
		for (var i = 0; i < list.length ; i++) {
			if(list[i]){
				var type = list[i].type;
				var name = list[i].name;
				var name15 = CMS_U.roundText(list[i].name,15);
				if(type == Dic.ListType.DIR ){
					var filelist = new CMS_PageList_ListClass();
						filelist.registParent(this_,this_.v.replaceView,this.deep+1,dirCount++);
						filelist.initData(list[i],i);
					this.nodeList.push(filelist);
				}
				if(type == Dic.ListType.PAGE){
					var page = new CMS_PageList_PageClass(this, this.v.replaceView , list[i],i);
					this.nodeList.push(page);
				} 
				if(type == Dic.ListType.HTML){
					var tag  = '<div class="_table _btn_html" data-no="'+i+'">'
						tag += '	<div class="_cell" style="width:17px;"><i class="fa fa-lg fa-font" style="margin:0px 2px 0 2px;"></i></div>';
						tag += '	<div class="_cell"><span class="_btn_file_text">'+name15+'</span></div>';
						// tag += '	<div class="_cell _settingTD " ><span data-no="'+i+'" class="_btn_html_setting ss_icon _fileinfo2"></span></div>';
						tag += '	<div class="_cell _settingTD " ><span data-no="'+i+'" class="_btn_html_setting"><i class="fa fa-exclamation"></i> 設定</span></div>';
						tag += '	<div class="_cell _wideShow " style="width:400px;"></div>';
						tag += '</div>';
					this.v.replaceView.append(tag);
				}
				this.v.replaceView.append(DragControllerFileList.getFileDropTag(i+1));
			}
		}
		
		//
		var drops = this.v.replaceView.find("._dropArea");
		this.firstDrops = drops.eq(0);
		this.lastDrops = drops.eq(drops.length-1);
		
		//ドラッグイベントアサイン
		DragControllerFileList.setDrag(this,this.v.replaceView.find(' > ._btn_page'),DragController.FILE_DROP)
		DragControllerFileList.setDrag(this,this.v.replaceView.find(' > ._btn_html'),DragController.FILE_DROP)
		DragControllerFileList.setDrop(this,this.v.replaceView.find(' > ._dropArea'),DragController.FILE_DROP);
		
		//HTMLの[i]ボタン
		this.v.btn_html_setting = this.v.replaceView.find(' > ._table > ._cell > ._btn_html_setting');
		this.v.btn_html_setting.click( function(event){ this_.clickHTML(this);event.stopPropagation(); });
		
		this.isRemoved = false;
		CMS_PageListViewTree.updatedSitemap();
		CMS_PageDB.updateSitemap();
	}
	
	//HTML設定クリック
	p.clickHTML = function(_tar){
		var no = Number($(_tar).attr("data-no"));
		CMS_PageList_ListEditNo = no;
		this.openEditFileInfo_EditHTML(no);
	}
	
	p.remove = function(){
		this.isRemoved = true;
		if(this.nodeList){
			for (var i = 0; i <  this.nodeList.length ; i++) {
				this.nodeList[i].remove();
			}
		}
		this.nodeList = null;
	}
	
	/* ---------- ---------- ---------- */
	
	//まとめて編集
	p.editSubFiles = function(){
		var this_ = this;
		SitemapEditView.stageIn(this.data,function(_list,_changeNameList){
			this_.update();
			this_.renameAll(_changeNameList);
		});
	}
	p.renameAll = function(_a){
		if(_a == undefined) return;
		if(_a.length == 0) return;
		Storage.Util.renameAll(_a);
	}
	
	//まとめて書き出し
	p.publishAll = function(){
		if(window.isLocked(true))return;
		//
		this.subPages = [];
		this.getAllPage(this.gridData.getRecords());
		BatchPublishView.stageIn(this.subPages);
	}
	
	p.getAllPage = function(_list){
		for (var i = 0; i <  _list.length ; i++) {
			if(_list[i].type == Dic.ListType.DIR){
				this.getAllPage(_list[i].list);
			}
			if(_list[i].type == Dic.ListType.PAGE){
				this.subPages.push(_list[i])
			}
		}
	}
	return c;
})();