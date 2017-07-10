EditableView.PageView 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_pageModel,_data,_parentView) {
	  this.init(_pageModel,_data,_parentView);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init 	 = function(_pageModel,_data,_parentView) {
		this.v = {};
		
		this.v.parentView = _parentView;
		this.id 		= _pageModel.id;
		this.dir 		= _pageModel.dir;
		this.gloupPath  = _pageModel.gloupPath;
		this.name 		= _pageModel.name;
		this.type 		= _pageModel.type;
		
		this.storage = _data;
		this.restoreJsonData = this.storage.exportJSON();
	}

	/* ---------- ---------- ---------- */
	
	p.createView 	 =function(){
		var this_ = this;
		//メインビュー
		var param = { id : this.id, dir : this.dir, name : this.name ,type:this.type};
		
		this.view = EditableView.PageView_U.getMainView(param);
		this.v.parentView.append(this.view);
		this.v.replaceArea = this.view.find('> ._page_inner ._replaceRootArea');
		
		this.v.pageStateArea = this.view.find('._page_state');
		
		this.v.footerF1 = this.view.find('._page_footer ._f1');
		this.v.footerF2 = this.view.find('._page_footer ._f2');
		
		this.v._page_zooms = this.view.find('._page_zooms');
		this.v._page_zooms.show();
		
		if(this.type == Dic.PageType.PRESET){
			CMS_PresetView_ZoomManager.setView(this.v._page_zooms);
		} else{
			CMS_PagesView_ZoomManager.setView(this.v._page_zooms);
		}
		//データ・セット
		this.freeLayout = new EditableView.FreeLayout();
		this.freeLayout.registParent(this, this.v.replaceArea, param, 0);
		
		this.stageInit();
		this.setBtn();
		
		this.initData();
	}
	
	/* ---------- ---------- ---------- */
	
	p.setBtn 		 =function (){
		var this_ = this;
		
		this.v.page_header 		= this.view.find('._page_header');
		this.v.saveDate		 	= this.view.find('._page_header ._saveDate span');
		this.v.publicDate	 	= this.view.find('._page_header ._publicDate span');
		this.v.f_saveDate	 	= this.view.find('._page_footer ._saveDate span');
		this.v.f_publicDate	 	= this.view.find('._page_footer ._publicDate span');
		
		this.v.btn_preview		= this.view.find('._btn_preview');
		this.v.btn_preview_more	= this.view.find('._btn_preview_more');
		this.v.btn_previewing	= this.view.find('._btn_previewing');
		this.v.btn_save		 	= this.view.find('._btn_save');
		this.v.btn_save_pre	 	= this.view.find('._btn_save_pre');
		this.v.btn_saveing	 	= this.view.find('._btn_saveing');
		this.v.btn_public	 	= this.view.find('._btn_public');
		this.v.btn_publishing 	= this.view.find('._btn_publishing');
		this.v.btn_public_more 	= this.view.find('._btn_public_more');
		
		this.v.btn_preview		.click(function(){ this_.previewDataEx(); });
		this.v.btn_preview_more	.click(function(){ this_.windowOpenPreview(); });
		this.v.btn_save			.click(function(){ this_.saveData(); });
		this.v.btn_save_pre		.click(function(){ this_.saveData(); });
		this.v.btn_public 		.click(function(){ this_.publicData(); });
		this.v.btn_public_more 	.click(function(){ this_.openURL()});
		this.v.btn_save_pre.hide();
		
		this.v.btn_template_edit = this.view.find('._btn_template_edit');
		this.v.btn_template_edit.click(function(){ 
			CMS_Data.Template.openTemplate(this_.storage.getData());
		});
		
		this.v.btn_import = this.view.find('._btn_import');
		this.v.btn_import.click(function(){ this_.importJSON()});
		
		this.v.btn_tagAll = this.view.find('._btn_tagAll');
		this.v.btn_tagAll.click(function(){ 
			HTMLService.generateHTML(
				this_.storage.getData(), 
				{
					id		: this_.id,
					dir		: this_.dir,
					gloupPath: this_.gloupPath
				},
				function(_s){
					Editer_TAGView.stageIn(_s),
					function(){}
				})
		});
		this.v.btn_tag = this.view.find('._btn_tag');
		this.v.btn_tag.click(function(){ 
			var s = this_.storage.getData().body.free[0];
			if(s.data.length == 0 ){
				alert("要素が見当たりません");
				return;	
			}
			Editer_TAGView.stageIn(
				PageElement_HTMLService.getTag(s,"",0),
				function(_s){}
			)
		});
		
		//ホバーサブメニュー
		new CMS_UtilClass.HoverMenu(this.view.find('._page_header ._page_state'),"._templatesFloat");
		new CMS_UtilClass.HoverMenu(this.view.find('._page_header ._float_item'),"._float_fuki");
		//new CMS_UtilClass.HoverMenu(this.view.find('._page_header ._save_wapper'),"._float_fuki");
		new CMS_UtilClass.HoverMenu(this.view.find('._page_header ._float_pub'),"._float_fuki");
		//
		
		//コンテナ開閉
		this.v.btn_open_all 	= this.view.find('._btn_open_all');
		this.v.btn_open_all.click(function(){
			this_.view.find("._block_toggle_close").click();
		});
		this.v.btn_close_all 	= this.view.find('._btn_close_all');
		this.v.btn_close_all.click(function(){
			this_.view.find("._block_toggle:not(._block_toggle_close)").click();
		});
		
		this.v.pageSideBtnsArea = this.view.find('._page_side_btns');
		
		//extra menu
		this.initRevision();
		this.pageResetInit();
		this.pageCopyInit();
	}
	
	/* ---------- ---------- ---------- */
	
	p.openURL =function (_type){
		if(_type == undefined) _type = "";
		var u = CMS_Path.PAGE.getRelPath(this.id,this.dir,_type);
		CMS_U.openURL_blank(u);
	}
	
	/* ---------- ---------- ---------- */
	//#データ
	
	p.initData 		 =function (){
		this.v.replaceArea.html("");//IO用にリセット
		
		this.rootData = this.storage.getData();
		if(this.rootData.head == undefined){
			this.rootData = { meta:{} , head:{} , body:{} }
		}
		this.headData = this.rootData.head;
		this.gridsData = this.rootData.body;

		var list;
		if(! this.gridsData["free"]){
			list = JSON.parse(JSON.stringify(PageTypeList.page.grids[0].gridInfo.def));
			// try{
			// 	list[0].data[0].data.main.text = this.name;
			// }catch( e ){}
		} else{
			list = this.gridsData["free"];
		}
		this.freeLayout.initData(list[0],0);

		this.isInited = true;
		this.updateMetaView();
		this.updateDateView();
		this.initSaveBtn();
		this.initPubingBtn();
		this.historyInit();
	}
	
	/* ---------- ---------- ---------- */
	
	p.updateMetaView	 =function (){
		var self = this;
		if(!this.rootData.meta) this.rootData.meta = {}
		var _current = CMS_Data.Template.treatTemplateName(this.rootData.meta);
		var _tag = CMS_Data.Sitemap.getGloupState_by_id(_current);
		
		if(_tag != this.currentStateTag){
			this.v.pageStateArea.html(_tag);
			this.currentStateTag = _tag;
			this.v.pageStateArea.find("._item").click(function(){
				CMS_Data.Template.setTemplateName(self.rootData.meta,$(this).data("id"));
				self.updateMetaView();
				self.activeSaveBtn();
			});
		}
	}
	
	p.currentSaveDateText = "";
	p.currentPubDateText = "";
	p.currentStateTag = "";
	p.updateDateView	 =function (_isAutoUpdate){
		var sd = CMS_Data.Sitemap
		
		var _save = sd.getSaveDate(this.id,this.dir);
		var _saveS = CMS_SaveDateU.getRelatedDate(_save)
		if(this.currentSaveDateText != _saveS){
			this.v.saveDate		.html(_saveS);
			this.v.f_saveDate	.html(_save);
			this.currentSaveDateText = _saveS
		}
		
		var _pub = sd.getPublishDate(this.id,this.dir);
		var _pubS = CMS_SaveDateU.getRelatedDate(_pub)
		if(this.currentPubDateText != _pubS){
			this.v.publicDate	.html(_pubS);
			this.v.f_publicDate	.html(_pub);
			this.currentPubDateText = _pubS
		}
		
		if(!_isAutoUpdate){
			if(!this.rootData.meta)this.rootData.meta = {}
			var _template = CMS_Data.Template.treatTemplateName(this.rootData.meta);
			var o = {
				save	: _save,
				pub		: _pub,
				dir		: this.dir,
				id		: this.id,
				template: _template
			}
			this.v.footerF1.html(EditableView.PageView_U.updateFooterTag1(o));
			this.v.footerF2.html(EditableView.PageView_U.updateFooterTag2(o));
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//リビジョン
	p.initRevision	 =function (){
		var self = this;
		this.revision = new EditableView.PageView_Revision(
			this.storage,
			this.view.find('._page_header ._save_wapper')
		);
		this.revision.registEvent("selectCurrent"	, function(_d){ self.selectRevision(_d); });
		this.revision.registEvent("selectCurrentPre", function(  ){ self.selectCurrentPreRev(); });
		this.revision.registEvent("selectHistory"	, function(_d){ self.selectRevision(_d); });
	}
	p.selectCurrentPreRev = function (){
		this.v.replaceArea.hide().fadeIn(200);
		this.restoreJSON();
	}
	p.selectRevision = function (_s){
		this.v.replaceArea.hide().fadeIn(200);
		this.setJSONData(_s);
	}
	p.saved_revision = function (){
		this.revision.saved();
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//#Save Preview
	p.isSaveingProccess = false;
	p.saveData 		 =function (_isPreview){
		if(window.isLocked(true))return;
		//
		if(this.isSaveingProccess)return;
		this.isSaveingProccess = true;
		//
		this.activeSaveingBtn();
		this.updateRootData();
		var this_ = this;
		this.storage.setData(this.rootData);
		this.storage.save(function(){
			this_.saveData_comp()
		});
	}
	p.saveData_comp = function (){
		this.updateDateView();
		this.disableSaveBtn();
		CMS_MainController.savedPage(this.id,this.dir);
		//
		this.saved_revision();
	}
	/**/
	p.isPublicProccess = false;
	p.publishData 	 =function (){
		this.publicData();
	}
	p.publicData 	 =function (){
		if(window.isLocked(true))return;
		//
		if(this.isPublicProccess)return;
		this.isPublicProccess = true;
		//
		this.activePubingBtn();
		var this_ = this;
		this.storage.publicData(function(){
			this_.publicData_comp()
		});
	}
	p.publicData_comp = function (){
		this.updateDateView();
		this.disablePubingBtn();
		//this.pageModel.published();
		CMS_MainController.publishedPage(this.id,this.dir);
	}
	p.unPublicData =function (){
		if(window.isLocked(true))return;
		var this_ = this;
		this.storage.unPublicData(function(){
			CMS_MainController.unPublishedPage(this.id,this.dir);
		});
		this.updateDateView();
	}
	
	p.updateRootData=function (){
		this.rootData.body.free = [{ 
			type: "layout.div", 
			attr: {},
			data: this.freeLayout.getData()
		}]
	}
	
	/* ---------- ---------- ---------- */
	//#livePreview
	//なにかしらビューを操作したらコールされる
	
	p.tID
	p.isPreviewed
	p.previewData 	 =function (_callback){
		var this_ = this
		this.previeCallback = _callback
		this.updateRootData();
		this.storage.setData(this.rootData);
		this.storage.previewData(function(){
			this_.previeCallback();
		});
	}
	p.isPreviewProccess = false;
	p.previewDataEx 	 =function (){
		if(this.isPreviewProccess)return;
		var this_ = this;
		this.isPreviewProccess = true;
		this_.v.btn_previewing.show();
		this.previewData(function(){
			this_.previewDataEx_comp();
		})
	}
	p.previewDataEx_comp 	 =function (){
		var this_ = this;
		setTimeout(function(){
			this_.isPreviewProccess = false;
			this_.v.btn_previewing.hide();
			this_.v.btn_preview_more.addClass("_hilight");
			setTimeout(function(){
				this_.v.btn_preview_more.removeClass("_hilight");
			},200);
			
		},200);
	}
	p.windowOpenPreview 	 =function (){
		var url = CMS_Path.PAGE.getRelPath(this.storage.id,this.storage.dir);
		var f = CMS_Path.ASSET.REL + CMS_Path.PREVIEW_HTML;
		var p = ""
			p += "?p=" + DateUtil.getRandamCharas(10);
			p += "&url=" + url;
		CMS_U.openURL_blank(f + p,f);
	}
	
	/* ---------- ---------- ---------- */
	//#JSON
	
	p.pageResetInit 		 =function (){
		var this_ = this
		this.v.btn_undo		 = this.view.find('._btn_undo');
		this.v.btn_reset	 = this.view.find('._btn_reset');
		this.v.btn_restore	 = this.view.find('._btn_restore');
		// this.v.btn_restore_ng = this.view.find('._btn_restore_ng');
		
		this.v.btn_undo.click(function(){ this_.historyBack()});
		this.v.btn_reset.click(function(){ this_.resetJSON()});
		this.v.btn_restore.click(function(){ this_.restoreJSON()});
		// this.v.btn_restore.hide();
	}
	
	p.setJSON 	 =function (_s){
		var s = _s;
		try{
			JSON.parse(_s);
		}catch( e ){
			alert("データ形式が正しくありません。")
			s = PageElement_JText.resetJSON
		};
		this.storage.importJSON(s);
		this.refreshAllData();
		this.disableSaveBtn();
		
		// this.v.btn_restore.hide()
		// this.v.btn_restore_ng.show()
	}
	p.restoreJSON 	 =function (){
		var s = this.restoreJsonData;
		this.setJSON(s)
	}
	p.resetJSON 	 =function (){
		var o = JSON.parse(PageElement_JText.resetJSON);
		try{
			o.meta = this.rootData.meta;
			o.head = this.rootData.head;
		}catch( e ){}
		this.storage.importJSON(JSON.stringify(o));
		this.refreshAllData();
		this.activeSaveBtn();
	}
	p.importJSON 	 =function (){
		var this_ = this;
		Editer_JSONView.stageIn(
			this.getJSONData(),
			function(_s){ this_.setJSONData(_s) }
		);
	}
	p.getJSONData =function (){
		return this.storage.exportJSON()
	}
	p.getJSONDataFlat =function (){
		return this.storage.exportJSON_flat()
	}
	p.setJSONData 	 =function (_s){
		try{
			var d = JSON.parse(_s);
		}catch( e ){
			alert("データ形式が正しくありません。")
			return false;
		};
		if(_s != null){
			this.storage.importJSON(_s);
			this.refreshAllData();
			this.activeSaveBtn();
			return true;
		}
	}
	
	/* ---------- ---------- ---------- */

	p.refreshAllData  =function (){
		this.initData();
	}
	p.updateSubData  =function(){
		if(this.isInited == undefined)return;
		if(this.isInited == false)return;
		this.activeSaveBtn();
		
		CMS_MainController.editedPage(this.id,this.dir);
		
		this.setHistory();
		// this.v.btn_restore.show()
		// this.v.btn_restore_ng.hide()
	}
	
	/* ---------- ---------- ---------- */
	
	//ショートカットキー用
	p.current = "";
	p.history = "";
	p.historyInit  =function(){
		var s =  this.getJSONDataFlat();
		this.current = s;
		this.history = s;
	}
	p.historyTID
	p.setHistory  =function(){
		var self = this;
		if(this.historyTID) clearTimeout(this.historyTID);
		this.historyTID = setTimeout(function(){
			self.setHistory_core();
		},400);
	}
	p.setHistory_core  =function(){
		var s =  this.getJSONDataFlat();
		if(this.current != s){
			this.history = this.current;
			this.current = s;
		}
	}
	p.historyBack  =function(){
		this.setJSONData(this.history);
	}

	/* ---------- ---------- ---------- */
	//#保存ボタン表示
	
	p.initSaveBtn  =function(){
		this.disableSaveBtn(true)
	}
	p.activeSaveBtn  =function(){
		this.v.btn_save.hide();
		this.v.btn_save_pre.show();
		this.v.btn_saveing.hide();
	}
	p.activeSaveingBtn  =function(){
		this.v.btn_saveing.show();
		// this.v.btn_saveingF.show();
	}
	p.disableSaveBtn  =function(_b){
		var this_ = this;
		if(_b){
			this.disableSaveBtn_core()
		} else{
			setTimeout(function(){
				this_.disableSaveBtn_core()
			},500);
		}
	}
	p.disableSaveBtn_core  =function(){
		this.isSaveingProccess = false;
		this.v.btn_save.show();
		this.v.btn_save_pre.hide();
		this.v.btn_saveing.hide();
	}
	
	//pub
	p.initPubingBtn  =function(){
		this.disablePubingBtn(true)
	}
	p.activePubingBtn  =function(){
		this.v.btn_publishing.show()
	}
	p.disablePubingBtn  =function(_b){
		var this_ = this;
		if(_b){
			this_.disablePubingBtn_core(false);
		} else{
			setTimeout(function(){
				this_.disablePubingBtn_core(true);
			},500);
		}
	}
	p.disablePubingBtn_core  =function(_b){
		var this_ = this;
		this.isPublicProccess = false;
		this.v.btn_publishing.hide();
	
		if(_b){
			this_.v.btn_public_more.addClass("_hilight");
			setTimeout(function(){
				this_.v.btn_public_more.removeClass("_hilight");
			},200);
		}
	}
	
	/* ---------- ---------- ---------- */
	//ページコピペ
	
	p.pageCopyTID
	p.pageCopyInit =function (){
		var this_ = this
		this.v.btn_pageUnPub		 = this.view.find('._btn_pageUnPub');
		this.v.btn_pageCopy			 = this.view.find('._btn_pageCopy');
		this.v.btn_pagePaste		 = this.view.find('._btn_pagePaste');
		this.v.btn_pageCopy_message	 = this.view.find('._btn_pageCopy_message');
		this.v.btn_pagePaste_message = this.view.find('._btn_pagePaste_message');
		
		this.v.btn_pageUnPub.click(function(){ this_.unPublicData()});
		this.v.btn_pageCopy.click(function(){ this_.pageCopy()});
		this.v.btn_pagePaste.click(function(){ this_.pagePaste()});
	}
	p.pageCopy =function (){
		var this_ = this
		CMS_Status.clipBordPage = this.getJSONData();
		//
		$("body").addClass("_copyPage");
		// this.v.btn_pageCopy_message.html("コピーしました")
		// this.v.btn_pageCopy_message.show()
		if(this.pageCopyTID) clearTimeout(this.pageCopyTID)
		this.pageCopyTID = setTimeout(function(){
				this_.hideMenuMessage()
				$("body").removeClass("_copyPage");
		},200);
	}
	p.pagePaste =function (){
		var this_ = this
		if(CMS_Status.clipBordPage == ""){
			this.v.btn_pagePaste_message.html("データがありません")
			this.v.btn_pagePaste_message.show();
		}
		if(this.setJSONData(CMS_Status.clipBordPage)){
			this.v.btn_pagePaste_message.html("ペーストしました")
			this.v.btn_pagePaste_message.show()
			this.pageCopyTID = setTimeout(function(){
				this_.hideMenuMessage()
			},2000);
		}
	}
	p.hideMenuMessage =function (){
		this.v.btn_pageCopy_message.html("")
		this.v.btn_pageCopy_message.hide()
		this.v.btn_pagePaste_message.html("")
		this.v.btn_pagePaste_message.hide()
	}
	
	/* ---------- ---------- ---------- */
	
	/* ---------- ---------- ---------- */
	
	//ADDボタンのターゲットを保持するため、ルートフリーレイアウトを保持しておく
	p.rootFreeLayout
	p.setFreeLayout =function (_rootFreeLayout){
		this.rootFreeLayout = _rootFreeLayout;
	}
	
	/* ---------- ---------- ---------- */
	//#Stage
	
	p.isOpen = false;
	p.isFirst = true;
	
	p.stageInit 	 = function (){
		this.view.hide();
	}
	p.tID
	p.stageIn 		 = function (){
		if(! this.isOpen){ this.isOpen = true;
			if(this.isFirst){ this.createView() }
			this.isFirst = false;
			//
			AddElements.setVisible(true);
			InspectView.stageOut();
			
			this.view.show();
			
			//追加ブロックの配置先を、このフリーレイアウトに
			if(this.rootFreeLayout) {
				AddElementsManager.setData( this.rootFreeLayout , 0);
			}
			
			var this_ = this;
			this.tID = setInterval(function(){this_.updateDateView(true)}, 1000*10);
			
			EditableView.PageViewState.setCurretPage(this);
			this.selectCurrent();
		}
	}
	p.stageOut = function (){
		if(this.isOpen){ this.isOpen = false;
			this.view.hide();
			if(this.tID){ clearInterval(this.tID)}
		}
	}
	p.remove 		 = function (){
		this.view.remove();
		this.currentSelect = null;
	}
	
	//現在の選択ノード保持用
	p.currentSelect;
	p.setCurrentSelect 		 = function (_node){
		this.currentSelect = _node;
	}
	p.selectCurrent 		 = function (){
		if(this.currentSelect){
			this.currentSelect.trigger("click");
			InspectView.updateScrollPos(false);
		}
	}
	
	return c;
})();

