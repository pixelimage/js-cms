
var CMS_SidePreviewPage = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_pageModel) {
	  this.init(_parent,_pageModel);
	}
	var p = c.prototype;
	
	/* ---------- ---------- ---------- */

	p.init = function(_parent,_pageModel) {
		this.parentView = _parent;
		this.pageModel = _pageModel;
		this.url = CMS_Path.PAGE.getRelPath(_pageModel.id,_pageModel.dir);
		var tag =  '<div>';
			tag += '<div class="_frame_pub"></div>';
			tag += '<div class="_frame_live"></div>';
			tag += '</div>';
		this.view = $(tag);
		this.parentView.append(this.view);
		
		this.v = {}
		this.v.frame_pub  = this.view.find("._frame_pub");
		this.v.frame_live  = this.view.find("._frame_live");
		this.v.frame_live.hide()
		
		this.viewURL = this.pageModel.id + ".html"
		this.stageInit();
		
		this.initViewPub = false;
		//
		this.lastEditDateTime = new Date().getTime();
		this.lastLivePreviewTime = 0;
		//
		this.lastPublishDate = new Date().getTime();
	}
	
	/* ---------- ---------- ---------- */

	p.reset = function() {
		this.initViewPub = false;
		this.lastLivePreviewTime = 0;
		this.v.frame_pub.html("")
		this.v.frame_live.html("")
	}
	
	p.updateWS_State = function() {
		if(this.isLiveTab){
			this.update_liveView();
		} else{
			this.update_pubView();
		}
	}
	p.reload = function() {
		if(this.isLiveTab){
			this.lastLivePreviewTime = 0;
			this.update_liveView();
		} else{
			this.initViewPub = false;
			this.update_pubView();
		}
	}
	p.updateTabState = function() {
		this.showLive(CMS_SidePreviewState.isLiveTab);
	}
	
	/* ---------- ---------- ---------- */
	
	p.isLiveTab = false;
	//タブきりかえ
	p.showLive = function(_b) {
		if(this.isLiveTab == _b)return ;
		this.isLiveTab = CMS_SidePreviewState.isLiveTab;
		this.v.frame_pub.hide();
		this.v.frame_live.hide();
		
		if(this.isLiveTab){
			this.v.frame_live.show();
			this.update_liveView();
		} else{
			this.v.frame_pub.show();
			this.update_pubView();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//公開ページ
	p.initViewPub;
	p.update_pubView = function() {
		if(this.initViewPub)return;
		this.initViewPub = true;
		this.v.frame_pub.html(this.update_common(false));
	}
	
	//ライブプレビュー
	p.lastLivePreviewTime;
	p.update_liveView = function() {
		if(this.isLiveTab == false) return;
		var this_ = this;
		//
		var page = CMS_PageDB.getLivePreviewPage();
		if(page == undefined ) return;
		
		var d = this.lastEditDateTime;
		if(this.lastLivePreviewTime == d) return;
		this.lastLivePreviewTime = d;
		
		page.previewData(function(){
			this_.v.frame_live.html(this_.update_common(true));
		})
	}
	
	/* ---------- ---------- ---------- */
	
	p.update_common = function(_isLiveTab) {
		
		var currentWs = CMS_SidePreviewState.currentWs
		var s = CMS_SidePreviewState.currentZoom /100;
		var tag = "";
		var ww = 0;
		
		
		if(_isLiveTab){
			this.loadURL = CMS_Path.ASSET.REL + CMS_Path.PREVIEW_HTML;
			this.loadURL += "?p=" + DateUtil.getRandamCharas(10);
			this.loadURL += "&url=" + this.url;
		} else{
			this.loadURL = this.url;
			this.loadURL += "?p=" + DateUtil.getRandamCharas(10)
		}
		for (var i = 0; i < currentWs.length ; i++) {
			var ts = '';
				ts +="-webkit-transform: scale("+s+");"
				ts +="-moz-transform: scale("+s+");"
				ts +="-ms-transform: scale("+s+");"
				ts +="transform: scale("+s+");"
				ts += "width:"+(100/s)+"%;";
				ts += "height:"+(100/s)+"%;";
			
			var temp = '';
				temp += '<div class="_iframeDiv" style="width:{WW}px;">';
				temp += '	<iframe src="{U}" width="{W}" style="{S}"></iframe>';
				temp += '</div>';
			
			// if(CMS_PageDB.isCurrent_is_Setting()){
			// 	//外部JSONファイルを、キャッシュなしで読み込むように
			// 	this.loadURL += "&c=noChash";
			// }
			temp = temp.split("{U}").join(this.loadURL);
			temp = temp.split("{WW}").join(currentWs[i]*s);
			ww += currentWs[i] * s;
			temp = temp.split("{W}").join(currentWs[i]);
			temp = temp.split("{S}").join(ts);
			tag += temp;
		}
		return tag;
	}
	//p.c = 0
	p.openedPage = function() {
		this.updateTabState();
		if(this.isLiveTab){
			this.update_liveView();
		} else{
			this.update_pubView();
		}
	}
	p.editedPage = function() {
		if(!this.isLiveTab) return;
		if(CMS_SidePreviewState.isLiveCheck == false) return;
		var this_ = this;
		var page = CMS_PageDB.getLivePreviewPage();
		if(page == undefined ) return;
		//
		this.lastEditDateTime = new Date().getTime();
		page.previewData(function(){
			this_.update_liveView()
		})
	}
	p.savedPage = function() {
		var this_ = this;
		if(CMS_SidePreviewState.isLiveCheck == false) return;
		// if(CMS_PageDB.isFreePage() ) {
		// 	//
		// } else{
			var page = CMS_PageDB.getLivePreviewPage()
			if(page == undefined ) return;
			page.previewData(function(){
				this_.lastLivePreviewTime = 0;
				this_.v.frame_live.html(this_.update_common(true));
				// this_.update_liveView();
			})
		// }
	}
	
	p.lastPublishDate
	p.publishedPage = function() {
		if(this.isLiveTab) return;
		var currentDate = new Date().getTime();
		if(currentDate - this.lastPublishDate < 1000) return;
		this.lastPublishDate = currentDate;
		//
		this.initViewPub = false;
		this.update_pubView()
	}
	
	/* ---------- ---------- ---------- */
	
	p.getPageTitle = function() {
		return this.viewURL;
	}
	
	p.openExternal = function() {
		var u = ""
		var p = ""
		if(this.isLiveTab){
			p = u = CMS_Path.ASSET.REL + CMS_Path.PREVIEW_HTML;
			p += "?p=" + DateUtil.getRandamCharas(10);
			p += "&url=" + this.url;
		} else{
			p = u = this.url;
			p += "?p=" + DateUtil.getRandamCharas(10)
		}
		CMS_U.openURL_blank(p,u);
	}
	
	/* ---------- ---------- ---------- */

	/**/
	p.openFlg = false;
	p.stageInit = function() {
		this.openFlg = false
		//this.view.hide()
	}
	p.stageIn = function() {
		if (!this.openFlg) {
			this.openFlg = true;
			this.view.show();
			this.openedPage();
			
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
