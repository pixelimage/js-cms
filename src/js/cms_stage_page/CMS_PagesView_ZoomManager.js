
var CMS_PagesView_ZoomManager = (function(){
	var view;
	var v = {};
	
	function setView(_view){
		view = _view;
		setBtn();
		zoom(Storage.Memo.getZoomVal());
	}
	function setBtn(_view){
		view.find("._btn_zoom").click(function(){ 
			var s = parseInt(prompt("ズーム値を指定してください(10〜100%)",currentZoom*100));
			zoom(s/100);
		});
		v._btn_zoomIn = view.find('._btn_zoomIn');
		v._btn_zoomOut = view.find('._btn_zoomOut');
		v._btn_zoomIn.click(function(){ zoomIn()});
		v._btn_zoomOut.click(function(){ zoomOut()});
	}
	var currentZoom = 1
	var zooms = [
		0.25,
		0.33,
		0.5,
		0.75,
		1
	]
	function zoomIn(){
		var s = 1
		for (var i = 0; i < zooms.length ; i++) {
			if(currentZoom < zooms[i]){
				s = zooms[i];
				break;
			}
		}
		zoom(s);
	}
	function zoomOut(){
		var s = zooms[0]
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
		if(_s > 1) _s = 1;
		if(_s < zooms[0]) _s = zooms[0];
		currentZoom = _s;
		//
		_setZoom( $('#CMS_PagesView > ._cms_page > ._page_inner > ._page_inner_zoom') , currentZoom,true) ;
		
		Storage.Memo.setZoomVal(_s);
		updateViewState();
	}
	function _setZoom(_tar,_s,_isW){
		_tar.css("-webkit-transform" , "scale(" + _s + ")" );
		_tar.css("transform" , "scale(" + _s + ")" );
		if(_isW)_tar.css("width" ,100* (1/_s)+ "%" );
		if(_isW)_tar.css("height" ,100* (1/_s)+ "%" );
	}
	
	function updateViewState(){
		var btns = $("#CMS_PagesView ._page_zooms");
			btns.find("._btn_zoom").text( currentZoom * 100 +"%");
			btns.find("._btn_zoomIn").removeClass("_btn_disable");
			btns.find("._btn_zoomOut").removeClass("_btn_disable");
		if(currentZoom == 1){
			btns.find("._btn_zoomIn").addClass("_btn_disable");
		}
		if(currentZoom == zooms[0]){
			btns.find("._btn_zoomOut").addClass("_btn_disable");
		}
	}
	return {
		setView: setView,
		zoomIn: zoomIn,
		zoomOut: zoomOut,
		zoom: zoom
	}
})();

var CMS_PresetView_ZoomManager = (function(){
	var view;
	var v = {};
	
	function setView(_view){
		view = _view;
		setBtn();
		zoom(currentZoom);
	}
	function setBtn(_view){
		view.find("._btn_zoom").click(function(){ 
			var s = parseInt(prompt("ズーム値を指定してください(10〜100%)",currentZoom*100));
			zoom(s/100);
		});
		v._btn_zoomIn = view.find('._btn_zoomIn');
		v._btn_zoomOut = view.find('._btn_zoomOut');
		v._btn_zoomIn.click(function(){ zoomIn()});
		v._btn_zoomOut.click(function(){ zoomOut()});
	}
	var currentZoom = 1
	var zooms = [
		0.25,
		0.33,
		0.5,
		0.75,
		1
	]
	function zoomIn(){
		var s = 1
		for (var i = 0; i < zooms.length ; i++) {
			if(currentZoom < zooms[i]){
				s = zooms[i];
				break;
			}
		}
		zoom(s);
	}
	function zoomOut(){
		var s = zooms[0]
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
		if(_s > 1) _s = 1;
		if(_s < zooms[0]) _s = zooms[0];
		currentZoom = _s;
		//
		_setZoom( $('#PresetStage_PagesView > ._cms_page > ._page_inner > ._page_inner_zoom') , currentZoom,true) ;
		
		// Storage.Memo.setZoomVal(_s);
		updateViewState();
	}
	function _setZoom(_tar,_s,_isW){
		_tar.css("-webkit-transform" , "scale(" + _s + ")" );
		_tar.css("transform" , "scale(" + _s + ")" );
		if(_isW)_tar.css("width" ,100* (1/_s)+ "%" );
		if(_isW)_tar.css("height" ,100* (1/_s)+ "%" );
	}
	
	function updateViewState(){
		var btns = $("#PresetStage_PagesView ._page_zooms");
			btns.find("._btn_zoom").text( currentZoom * 100 +"%");
			btns.find("._btn_zoomIn").removeClass("_btn_disable");
			btns.find("._btn_zoomOut").removeClass("_btn_disable");
		if(currentZoom == 1){
			btns.find("._btn_zoomIn").addClass("_btn_disable");
		}
		if(currentZoom == zooms[0]){
			btns.find("._btn_zoomOut").addClass("_btn_disable");
		}
	}
	return {
		setView: setView,
		zoomIn: zoomIn,
		zoomOut: zoomOut,
		zoom: zoom
	}
})();