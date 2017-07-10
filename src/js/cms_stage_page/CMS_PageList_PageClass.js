
var CMS_PageList_PageClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_parentV,_param,_no) {
	  this.init(_parent,_parentV,_param,_no);
	}
	var p = c.prototype;
	
	/* ---------- ---------- ---------- */

	p.init = function(_parent,_parentV,_param,_no) {
		this.type = Dic.ListType.PAGE;
		this.parent = _parent;
		this.parentView = _parentV;
		this.param = _param;
		this.no = _no;
		this.v = {}
		
		this.createLayout();
	}
	
	p.createLayout = function() {
		var this_ = this;
		
		var param = this.param;
		var name = param.name;
		var name15 = CMS_U.roundText(CMS_TagU.treatTag(param.name),15);
		var name20 = CMS_U.roundText(CMS_TagU.treatTag(param.name),20);

		var path =  CMS_Path.PAGE.getAbsPath(param.id,param.dir);
		var _save = CMS_SaveDateU.getRelatedDate(param.saveDate);
		var _pub = CMS_SaveDateU.getRelatedDate(param.publicDate);
		
		this.pageID  = CMS_PageID.getID(param.id,param.dir);
		var pubText  = CMS_PateStateU.getStateText(param.state);
		var pubClass = CMS_PateStateU.getPubClass(param.state);
		var cmsClass = CMS_PateStateU.getCMSClass(param.stateCMS);

		var tags = (param.tag) ? param.tag : '--';
		var dd = (param.date) ? param.date : '--';

		var tag  = '<div class="_table _btn_page '+pubClass+" "+cmsClass+'" data-no="'+this.no+'" id="'+this.pageID+'">'
			tag += '	<div class="_cell" style="width:17px;"><i class="fa fa-lg fa-file-text" style="margin:2px 2px 0 2px;"></i></div>';
			tag += '	<div class="_cell _wideHide"><span class="_btn_file_text">'+name15 + pubText+'</span></div>';
			tag += '	<div class="_cell _wideShow"><span class="_btn_file_text">'+name20 + pubText+'</span><span class="_path">'+path+'</span></div>';
			// tag += '	<div class="_cell _settingTD _settingTD_file"><span class=" _btn_file_setting ss_icon _fileinfo2"></span></div>';
			tag += '	<div class="_cell _settingTD _settingTD_file"><span class=" _btn_file_setting "><i class="fa fa-exclamation"></i> 設定</span></div>';
			tag += '	<div class="_cell _wideShow" style="width:400px;">';
			tag += '			<div class="_right _w50 _fs10 _date _date_publish">' + _pub + '</div>'
			tag += '			<div class="_right _cms_btn_alpha _commandBtnsN _btn_publish_more"><i class="fa fa-external-link-square "></i></div>'
			tag += '			<div class="_right _cms_btn_alpha _commandBtnsA _btn_publish"><i class="fa fa-globe "></i> 公開</div>'
			tag += '			<div class="_right _w50 _fs10 _date _date_save">' + _save + '</div>';
			tag += '			<div class="_right _cms_btn_alpha _commandBtnsN _btn_save"><i class="fa fa-check "></i> 保存済</div>'
			tag += '			<div class="_right _cms_btn_alpha _commandBtnsN _btn_save_pre"><i class="fa fa-pencil "></i> 保 存</div>'
			tag += '			<div class="_right _op5 _fs10 _pd5"><i class="fa fa-lg fa-calendar "></i> '+dd+' </div>'
			tag += '			<div class="_right _op5 _fs10 _pd5"><i class="fa fa-lg fa-tags "></i> '+tags+' </div>'
			tag += '		</div>';
			tag += '	</div>';
		this.view = $(tag);
		this.parentView.append(this.view);
		
		//ページボタン
		this.view.click( function(event){ 
			this_.clickPage(this);
			event.stopPropagation();
		});
		this.view.hover( 
			function(event){ 
				this_.hoverPage(this);
				event.stopPropagation()
			},
			function(){ 
				Float_Preview.stageOut();
			}
		);
		
		
		this.v.btn_setting = this.view.find(' ._btn_file_setting');
		this.v.btn_setting.click(function(event) {
			this_.clickSetting(this);
			event.stopPropagation();
		});
		
		//公開ボタン
		this.v.btn_save = this.view.find('._btn_save');
		this.v.btn_save_pre = this.view.find('._btn_save_pre');
		this.v.btn_save_pre.click(function(event) {
			this_.save();
			event.stopPropagation();
		});	
		this.v.btn_save_pre.hide();
		
		//公開ボタン
		this.v.btn_publish = this.view.find('._btn_publish');
		this.v.btn_publish.click(function(event) {
			this_.publish();
			event.stopPropagation();
		});	
		
		//開く
		this.v.btn_publish_more = this.view.find('._btn_publish_more');
		this.v.btn_publish_more.click(function(event) {
			this_.openURL();
			event.stopPropagation();
		});	
		
		this.v.publish = this.view.find(' ._date_publish');
		this.v.save = this.view.find(' ._date_save');
		
		this.isRemoved = false;
		CMS_PageList_PageDB.add_(this);
	}
	
	p.openURL = function(){
		var u = CMS_Path.PAGE.getRelPath(this.param.id,this.param.dir);
		var t = u;
			t = t.split("/").join("");
			t = t.split(".").join("");
		window.open(u,t);
	}
	
	//ページクリック
	p.clickPage = function(){
		CMS_MainController.openPage(this.param);
		Float_Preview.stageOut_core();
	}
	
	//ホバープレビュー
	
	p.hoverPage = function(_tar){
		var no = Number($(_tar).attr("data-no"));
		var xy= { x:$(_tar).offset().left, y:$(_tar).offset().top };
		Float_Preview.stageIn( Dic.ListType.PAGE ,xy,this.param);
	}
	
	//設定クリック
	p.clickSetting = function(_tar){
		CMS_PageList_ListEditNo = this.no;
		this.parent.openEditFileInfo_EditFile(this.no);
	}
	
	//保存処理
	p.save = function(){
		if(window.isLocked(true))return;
		CMS_MainController.savePageByID(this.param.id, this.param.dir);
	}
	
	//公開処理
	p.publish = function(){
		if (window.isLocked(true)) return;
		
		var this_ = this;
		var storage = new Storage.Online(Dic.PageType.PAGE,this.param.id,this.param.dir,"{}")
			storage.load(function(_storage){
				_storage.publicData(function(){
					CMS_PageList_PageDB.updateState();
				})
			});
	}
	//時間ステート更新
	p.updateState = function(){
		this.v.publish.html( CMS_SaveDateU.getRelatedDate(this.param.publicDate) );
		this.updateEditState()
	}
	
	//編集中ステート更新
	p.updateEditState = function(){
		if(CMS_PageList_StateManager.isEdited(this.param.id,this.param.dir)){
			this.v.btn_save_pre.show();
			this.v.btn_save.hide();
		} else{
			this.v.btn_save_pre.hide();
			this.v.btn_save.show();
		}
		this.v.save.html( CMS_SaveDateU.getRelatedDate(this.param.saveDate) );
	}
	
	p.remove = function(){
		this.isRemoved = true;
	}
	
	return c;
})();