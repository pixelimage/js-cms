
var Float_PreviewFull = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Float_PreviewFull');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = "";
			tag += '<div class="_arrow"></div>';
			tag += '<div class="_zoomArea"></div>';
			tag += '<div class="_inner"></div>';
			tag += '<div class="_cms_btn_alpha _btn_preview_close"><i class="fa fa-caret-up "></i> プレビューを閉じる</div>';
			view.html(tag)
			
			v.inner = view.find('._inner');
			v.arrow = view.find('._arrow');
			
			v.zoomArea = view.find('._zoomArea');
			Float_PreviewFullZoom.init(view,v.zoomArea);
	}
	
	function setBtn(){
		
		view.hover(function(){
			if(tID) clearTimeout(tID)
		} , function(){
			stageOut();
		})
		
		v.btn_preview_close = view.find('._btn_preview_close');
		v.btn_preview_close.click(function(){ 
			Float_Preview.switchPreview(false);
		});
		
	}
	
	/* ---------- ---------- ---------- */
	
	function update(_type,_xy,_param){
		updatePos(_xy);
		
		if(prevPage) prevPage.stageOut();
		var tar = hasPage(_type,_param);
		if(tar == null){
			tar = new Float_PreviewFrame(_type,v.inner,_param);
			pages.push(tar);
		}
		tar.stageIn();
		prevPage = tar;
		current = prevPage;
		
		if(_type == Dic.ListType.DIR)v.btn_preview_close.hide();
		if(_type == Dic.ListType.PAGE)v.btn_preview_close.show();
		
	}
	var current;
	function getCurrent(){
		return current;
	}

	var prevPage;
	var pages = [];
	
	function hasPage(_type,_param){
		var u = CMS_Path.PAGE.getRelPath(_param.id,_param.dir)
		for (var i = 0; i <  pages.length ; i++) {
			if(_type == Dic.ListType.PAGE){
				if(pages[i].type == _type){
					if(pages[i].url == u){
						return pages[i];
					}
				}
			}
			if(_type == Dic.ListType.DIR){
				if(pages[i].type == _type){
					if(pages[i].id == _param.id){
						return pages[i];
					}
				}
			}
		}
		return null;
	}
	
	/* ---------- ---------- ---------- */
	
	var prevY = -1;
	var currentY = -1;
	function updatePos(_xy){
		v.arrow.css("top", (_xy.y-35) + "px");
		/*
		var tarY = _xy.y
		var saH = CMS_StatusH - view.height() ;
		
		if(saH < tarY) tarY = saH;
		if(tarY < 100)  tarY = 100;
		if(prevY == -1){
			currentY = tarY - 50
			view.css("top",currentY+ "px");
		}
		var saY = tarY - currentY;
		v.arrow.css("top", _xy.y + "px");
		prevY = tarY
		*/
	}
	
	/* ---------- ---------- ---------- */

	function updateSitemapDate(){
		for (var i = 0; i <  pages.length ; i++) {
			pages[i].resetDate();
		}
	}
	/* ---------- ---------- ---------- */

	function getPages(){
		return pages;
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_type,_xy,_param){
		// if(! isOpen){ isOpen = true;
			if(isFirst){}
			
			if(tID) clearTimeout(tID)
			tID = setTimeout(function(){
				view.show();
				isFirst = false;
				update(_type,_xy,_param)
			},50);
		// }
	}
	var tID;
	function stageOut(){
		if(tID) clearTimeout(tID)
		tID = setTimeout(function(){
			view.hide();
			prevY = -1;
		},500);
	}
	function stageOut_core(){
		if(tID) clearTimeout(tID)
		view.hide();
		prevY = -1
	}
	return {
		init: init,
		getPages: getPages,
		getCurrent: getCurrent,
		stageIn: stageIn,
		stageOut: stageOut,
		stageOut_core: stageOut_core,
		updateSitemapDate: updateSitemapDate
	}
})();

var FloatPreviewState = {
	currentWs:["1000"],
	currentZoom:0.33
}

var Float_PreviewFullZoom = (function(){
	var parentView;
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(_parentView,_view){
		parentView = _parentView;
		view = _view;
		createlayout();
		setBtn();
		initStage();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = ""
			tag += '		<div class="_btnSet">幅 :';
			tag += '			<span class="_btn_ws _cms_btn_alpha">1000px</span>';
			tag += '		</div>';
			tag += '		<div class="_btnSet">拡大 :';
			tag += '			<span class="_cms_btn_alpha _btn_zoomOut"><i class="fa fa-lg fa-minus-circle "></i> ';
			tag += '			</span>';
			tag += '			<span class="_cms_btn_alpha _btn_zoom">33%</span>';
			tag += '			<span class="_cms_btn_alpha _btn_zoomIn"><i class="fa fa-lg fa-plus-circle "></i> ';
			tag += '			</span>';
			tag += '		</div>';
		view.html(tag);
	}
	
	function setBtn(){
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
	}
	
	/* ---------- ---------- ---------- */
	
	var currentWs
	
	function updateState(){
		Storage.Memo.setListPreviewState([ currentZoom , currentWs.join(",") ]);
		var pages = Float_PreviewFull.getPages();
		var current = Float_PreviewFull.getCurrent();
		updateStateView();
		for (var i = 0; i <  pages.length ; i++) {
			pages[i].reset();
		}
		if(current) current.updateWS_State();
	}
	function updateStateView(){
		FloatPreviewState.currentWs = currentWs;
		FloatPreviewState.currentZoom = currentZoom;
		
		v._btn_zoom.html(currentZoom+"%");
		v.btn_ws.html(currentWs.join(",")+"px");
		
		var ww = (function(_w,_z){ 
			var w = 0;
			for (var i = 0; i <  _w.length ; i++) {
				w += Number(_w[i]);
			}
			var ss = (w * (_z/100)) + 30;
			if(ss < 250)ss = 250;
			return ss;
		})(currentWs, currentZoom);
		parentView.width(ww);
		
		updateZoomState();
	}
	
	function initStage(){
		var state = Storage.Memo.getListPreviewState();
		currentZoom = parseInt(state[0]);
		if(currentZoom < minZoom)currentZoom = minZoom;
		if(currentZoom > maxZoom)currentZoom = maxZoom;
		currentWs = state[1].split(",");
		
		updateStateView();
	}
	function setW(_s){
		if(!_s) return;
		var a = _s.split(",")
		for (var i = 0; i < a.length ; i++) {
			if(isNaN(a[i]))return;
		}
		currentWs = _s.split(",");
		for (var i = 0; i < currentWs.length ; i++) {
			var s = currentWs[i]
			if(s < 320) s = 320;
			if(s > 2000)s = 2000;
			currentWs[i] = s
		}
		updateState();
	}
	
	/* ---------- ---------- ---------- */
	
	var currentZoom = 50;
	var zooms = [10,20, 25, 33, 50 ];
	function zoomInput(){
		zoom(parseInt(prompt("ズーム値を指定してください(10〜50%)",currentZoom)));
	}
	var minZoom = 10;
	var maxZoom = 50;
	function zoomIn(){
		var s = maxZoom;
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
		 if(_s >= maxZoom) { _s = maxZoom; }
		 if(_s <= zooms[0]) { _s = zooms[0]; }
		currentZoom = _s;
		updateState();
	}
	function updateZoomState(){
		v._btn_zoomIn.removeClass("_btn_disable");
		v._btn_zoomOut.removeClass("_btn_disable");
		if(currentZoom == maxZoom) {
			v._btn_zoomIn.addClass("_btn_disable");
		}
		if(currentZoom == zooms[0]) {
			v._btn_zoomOut.addClass("_btn_disable");
		}
	}

	return { init:init }
})();
