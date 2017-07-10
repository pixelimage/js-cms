
var CMS_SidePreviewState = {
	isLiveTab:false,
	isLiveCheck:false,
	currentWs:[1000],
	currentZoom:0.33
}
var CMS_SidePreview = (function(){
	var view;
	var viewClose;
	var v = {};
	
	function init(){
		view = $('#CMS_SidePreview');
		v.root = $("body");
		stageInit();
		//setBtn();
		//stageIn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = ''
			tag += '<div class="_header">'
			tag += '	<div class="_cms_btn_alpha _btn_close"><i class="fa fa-desktop "></i> <i class="fa fa-caret-right "></i> </div>';	
			tag += '	<div class="_row _row_init_hide _row_view clearfix">'
			tag += '		<div class="_row_init_hide">'
			tag += '			<div class="_btnSet">'
			tag += '			幅 : ';
			tag += '				<span class="_btn_ws _cms_btn_alpha"> </span>'
			tag += '			</div>';
			tag += '			<div class="_btnSet">'
			tag += '				拡大 : ';
			tag += '				<span class="_cms_btn_alpha _btn_zoomIn"><i class="fa fa-lg fa-plus-circle "></i> </span>';
			tag += '				<span class="_cms_btn_alpha _btn_zoom">100%</span>';
			tag += '				<span class="_cms_btn_alpha _btn_zoomOut"><i class="fa fa-lg fa-minus-circle "></i> </span>';
			tag += '			</div>';
			tag += '		</div>'	
			tag += '	</div>'		
			tag += '	<div class="_row _row_init_hide _row_tab clearfix">'
			tag += '		<div class="_cms_btn_alpha _tab _tab_pub">公開ページ</div>'
			tag += '		<div class="_cms_btn_alpha _tab _active _tab_pub_ac">公開ページ</div>'
			tag += '		<div class="_cms_btn_alpha _tab _tab_live"><i class="fa fa-refresh"></i> ライブプレビュー</div>'
			tag += '		<div class="_cms_btn_alpha _tab _active _tab_live_ac"><i class="_ic1 fa fa-refresh "></i> <i class="_ic2 fa fa-refresh _icon_autorepeat fa-spin"></i> ライブプレビュー</div>'
			tag += '		<div style="float:right;margin:5px 5px 0 0;">'
			tag += 			CMS_GuideU.getGuideTag("window/preview","_BASE_","dark");
			tag += '		</div>'
			tag += '	</div>'	
			tag += '	<div class="_row _row_init_hide _row_function clearfix">'
			tag += '		<div class="_left _live_btns">'
			tag += '			<div class="_btnSet _btn_reload_live _cms_btn_alpha"><i class="fa fa-repeat "></i> リロード</div>'
			tag += '			<div class="_btnSet _btn_live _cms_btn_alpha"><i class="fa fa-square-o "></i> 自動更新</div>'
			tag += '			<div class="_btnSet _btn_live_ac _cms_btn_alpha"><i class="fa fa-check-square "></i>  自動更新</div>'
			tag += '		</div>'	
			tag += '		<div class="_left _pub_btns">'
			tag += '			<div class="_btnSet _btn_reload_pub _cms_btn_alpha"><i class="fa fa-repeat "></i> リロード</div>'
			tag += '		</div>'	
			tag += '		<div class="_right">'
			tag += '			<div class="_btnSet _btn_blank _cms_btn_alpha">別ウィンドウ <i class="fa fa-external-link-square "></i></div>'
			tag += '		</div>'	
			tag += '	</div>'	
			tag += '</div>'	
			tag += '<div class="_body">'
			tag += '</div>'

		view.append(tag);
		v.body = view.find('._body');
		
		v.btn_reload_pub 	= view.find('._btn_reload_pub');
		v.btn_reload_live 	= view.find('._btn_reload_live');
		v.btn_blank 		= view.find('._btn_blank');
		
		v.btn_reload_pub.click(function(){ if(current) current.reload() });
		v.btn_reload_live.click(function(){ if(current) current.reload() });
		v.btn_blank.click(function(){ if(current) current.openExternal() });
		
		v.btn_ws = view.find('._btn_ws');
		v.btn_ws.click(function(){ 
			setW(prompt("プレビュー幅を指定してください(px)。カンマで区切ると複数のプレビューを作成できます。",currentWs.join(",")));
		});
		v._btn_zoom = view.find('._btn_zoom');
		v._btn_zoom.click(function(){ zoomInput() });	
		v._btn_zoomOut = view.find('._btn_zoomOut');
		v._btn_zoomIn = view.find('._btn_zoomIn');
		v._btn_zoomOut.click(function(){ zoomOut() });	
		v._btn_zoomIn.click(function(){ zoomIn() });	
		
		v._btn_close = view.find('._btn_close');
		v._btn_close.click(function(){ CMS_StageController.openPreviewStage(false)});
		
		v._row_init_hide = view.find('._row_init_hide');
		
		setLiveTabInit()
		initStage();
	}
	
	/* ---------- ---------- ---------- */
	
	function setLiveTabInit(){
		v.ic1 = view.find('._ic1');
		v.ic2 = view.find('._ic2');
		
		v.pub_btns = view.find('._pub_btns');
		v.live_btns = view.find('._live_btns');
		
		v._tab_pub	 = view.find('._tab_pub');
		v._tab_pub_ac = view.find('._tab_pub_ac');
		v._tab_live	 = view.find('._tab_live');
		v._tab_live_ac = view.find('._tab_live_ac');
		v._tab_pub.click(function(){ showLive(false) });
		v._tab_live.click(function(){ showLive(true) });
		
		v.btn_live = view.find('._btn_live');
		v.btn_live_ac = view.find('._btn_live_ac');
		v.btn_live.click(function(){ playLive(true) });
		v.btn_live_ac.click(function(){ playLive(false) });
		//
		var b = (Storage.Memo.getPreviewisLiveTab() == "1") ? true:false;
		var b2 = (Storage.Memo.getPreviewisLiveCheck() == "1") ? true:false;
		
		showLive(b,false);
		playLive(b2,false);
		
	}
	var isLiveCheck
	function playLive(_b,_isUpdate){
		if(_isUpdate == undefined) _isUpdate= true;
		isLiveCheck = _b;
		v.btn_live.hide()
		v.btn_live_ac.hide()
		v.ic1.hide()
		v.ic2.hide()
		if(isLiveCheck){
			v.btn_live_ac.show()
			v.ic2.show()
		} else{
			v.btn_live.show()
			v.ic1.show()
		}
		CMS_SidePreviewState.isLiveCheck = isLiveCheck;
		Storage.Memo.setPreviewisLiveCheck( isLiveCheck ? "1" : "0" );
	}
	var isLiveTab
	function showLive(_b,_isUpdate){
		if(_isUpdate == undefined) _isUpdate= true;
		isLiveTab = _b;
		
		v.pub_btns.hide()
		v.live_btns.hide()
		
		v._tab_pub.hide()
		v._tab_pub_ac.hide()
		v._tab_live.hide()
		v._tab_live_ac.hide()
		if(isLiveTab){
			v._tab_pub.show()
			v._tab_live_ac.show()
			v.live_btns.show()
		} else{
			v._tab_pub_ac.show()
			v._tab_live.show()
			v.pub_btns.show()
		}
		CMS_SidePreviewState.isLiveTab = isLiveTab;
		Storage.Memo.setPreviewisLiveTab( isLiveTab ? "1" : "0" );
		if(current) current.updateTabState();
	}
	
	/* ---------- ---------- ---------- */
	
	var currentWs
	
	function updateState(){
		Storage.Memo.setPreviewisLiveCheck( isLiveCheck ? "1" : "0" );
		Storage.Memo.setPreviewisLiveTab( isLiveTab ? "1" : "0" );
		Storage.Memo.setPreviewState([ currentZoom , currentWs.join(",") ]);
		//
		updateStateView();
		for (var i = 0; i <  pages.length ; i++) {
			pages[i].reset();
		}
		if(current) current.updateWS_State();
	}
	function updateStateView(){
		CMS_SidePreviewState.currentWs = currentWs;
		CMS_SidePreviewState.currentZoom = currentZoom;
		
		v._btn_zoom.html(currentZoom+"%");
		v.btn_ws.html(currentWs.join(",")+"px");
		
		var s = currentZoom /100
		var ww = 0
		for (var i = 0; i < currentWs.length ; i++) {
			ww += currentWs[i] * s;
		}
		CMS_StageController.setSideW(ww);
		updateZoomState();
		
	}
	
	function initStage(){
		var state = Storage.Memo.getPreviewState();
		currentZoom = parseInt(state[0]);
		if(currentZoom < 10)currentZoom = 50;
		if(currentZoom > 100)currentZoom = 100;
		currentWs = state[1].split(",");
		
		updateStateView();
	}
	function setW(_s){
		if(!_s)return;
		var a = _s.split(",")
		for (var i = 0; i < a.length ; i++) {
			if(isNaN(a[i]))return;
		}
		currentWs = _s.split(",");
		for (var i = 0; i < currentWs.length ; i++) {
			var s = currentWs[i]
			if(s < 320)s = 320;
			if(s > 2000)s = 2000;
			currentWs[i] = s
		}
		updateState();
	}
	
	/* ---------- ---------- ---------- */
	
	var currentZoom = 50;
	var zooms = [ 25, 33, 50, 75, 100 ];
	function zoomInput(){
		zoom(parseInt(prompt("ズーム値を指定してください(10〜100%)",currentZoom)));
	}
	function zoomIn(){
		var s = 100;
		for (var i = 0; i < zooms.length ; i++) {
			if(currentZoom < zooms[i]){
				s = zooms[i];
				break;
			}
		}
		zoom(s);
	}
	function zoomOut(){
		var s = zooms[0];
		for (var i = 0; i < zooms.length ; i++) {
			if(currentZoom > zooms[i]){
				s = zooms[i];
			}
		}
		zoom(s);
	}
	function zoom(_s){
		if(!_s)return;
		if(isNaN(_s))return;
		if(currentZoom == _s)return;
		 if(_s >= 100) { _s = 100; }
		 if(_s <= zooms[0]) { _s = zooms[0]; }
		currentZoom = _s;
		updateState();
	}
	function updateZoomState(){
		v._btn_zoomIn.removeClass("_btn_disable");
		v._btn_zoomOut.removeClass("_btn_disable");
		if(currentZoom == 100) {
			v._btn_zoomIn.addClass("_btn_disable");
		}
		if(currentZoom == zooms[0]) {
			v._btn_zoomOut.addClass("_btn_disable");
		}
	}
	
	/* ---------- ---------- ---------- */

	var pages = [];
	var current
	function openedPage(){
		if(!isOpen)return;
		if(CMS_PageDB.hasCurrent() == false)return;
		//
		v._row_init_hide.show();
		// var model = CMS_PageDB.getCurrentPageModel();
		var model = CMS_PageDB.getPreviewPageModel();
		var tar;
		for (var i = 0; i < pages.length ; i++) {
			var id1 = CMS_PageID.getID_s(pages[i].pageModel.id,pages[i].pageModel.dir)
			var id2 = CMS_PageID.getID_s(model.id,model.dir)
			if(id1 == id2){
				tar = pages[i];
			} else{
				pages[i].stageOut()
			}
		}
		if(!model) return;
		if(tar == undefined){
			var page = new CMS_SidePreviewPage(v.body,model);
				pages.push(page);
			tar = page;
		}
		current = tar;
		current.stageIn();
	}
	
	var tID
	function editedPage(_delay){
		if(!isOpen)return;
		if(!current) return;
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			current.editedPage()
		},500);
	}
	
	function savedPage(){
		if(!isOpen)return;
		if(!current) return;
		current.savedPage()
	}
	
	function publishedPage(){
		if(!isOpen)return;
		if(!current) return;
		current.publishedPage()
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.addClass("_open");
			v.root.addClass("_openPreview");
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			openedPage();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.removeClass("_open");
			v.root.removeClass("_openPreview");
		}
	}
	return {
		init: init,
		// reload: reload,
		openedPage: openedPage,
		editedPage: editedPage,
		savedPage: savedPage,
		publishedPage: publishedPage,
		
		stageIn: stageIn,
		stageOut: stageOut
	}
})();
