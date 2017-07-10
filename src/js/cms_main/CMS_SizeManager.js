/**
 * フリーレイアウト時のレイアウト幅を管理する
*/

var CMS_SizeManager = (function() {

	var currentW = "";
	var n100P = "100%";
	
	function init() { }
	
	//ページを開いた時にコールされる
	function getTag_FreePageBar() {
		return _getTag_FreePageBar_core(_getCurrentPageWide());
	}
	
	//ページ幅update時にコールされる
	function updateTag_FreePageBar() {
		return _getTag_FreePageBar_core(currentW);
	}
	function _getTag_FreePageBar_core(_w) {
		currentW = treat(_w);
		var icon = "";
			icon += '<svg viewBox="0 0 30 30" width="30px" height="30px">';
			icon += '	<g><path d="M 5 17 L 11 17 L 11 25 L 19 25 L 19 17 L 25 17 L 15 6 L 5 17 Z" fill="#5b77b1"/></g>';
			icon += '</svg>';
			
		var tag = ""
		if (currentW == n100P) {
			tag += '<div class="_sizeWap" style="left:auto;right:10px">';
			tag += '	<div class="_sizeBar">'+icon+'</div>';
			tag += '	<div class="_sizeText">コンテンツ幅：100% <i class="fa fa-caret-down "></i></div>';
		} else  {
			var w = Number(currentW) + 6;
			tag += '<div class="_sizeWap" style="left:' + w + 'px">';
			tag += '	<div class="_sizeBar">'+icon+'</div>';
			tag += '	<div class="_sizeText">コンテンツ幅：'+ currentW +'px <i class="fa fa-caret-down "></i></div>';
		}
			tag += '	<div class="_float">';
			tag += 			_sizeListTag();
			tag += '	</div>';
			tag += '</div>';
		
		return tag;
	}

	/**
	 * editableViewから呼ばれ、コンテンツ幅CSSを返す
	 */
	function getContentsWidth(_type) {
		if(_type == Dic.PageType.PRESET){
			return "width:" + _def()+"px";
		} else{
			return "width:" + _getUnitNum();
		}
	}

	function setWideInput() {
		var s = prompt("編集エリアの幅を入力してください(500px以上)。\n例) " + _def(), _def())
		if (s === null) return;
		if (isNaN(s)) return;
		if(Number(s) < 500) s= 500;
		currentW = s;
		_update();
	}
	
	function setWide100p() {
		currentW = n100P;
		_update();
	}
	
	function setWide(_s) {
		currentW = _s;
		_update();
	}
	
	function _update() {
		_setCurrentPageWide();
		var tar = EditableView.PageViewState.getCurretPage().view;
		if(tar){
			tar.find('._freeLayoutRoot > ._replaceArea').width( _getUnitNum() );
			tar.find('._memori_area').html(updateTag_FreePageBar());
		}
	}
	
	/* ---------- ---------- ---------- */
	
	function _getUnitNum() {
		if(currentW == n100P){
			 return currentW;
		} else{
			return currentW +"px";
		}
	}
	/* ---------- ---------- ---------- */
	
	//保持
	function _setCurrentPageWide() {
		var page = CMS_PageDB.getCurrentPage();
		if(page){
			try{
				if(_def() == currentW){
					page.storageClass.storeData.meta.wide = "";
				} else{
					page.storageClass.storeData.meta.wide = currentW;
				}
				page.pageView.updateSubData();
			}catch( e ){}
		}
	}
	
	function _getCurrentPageWide() {
		var w = ""
		var page = CMS_PageDB.getCurrentPage();
		if(page){
			try{
				w = treat(page.storageClass.storeData.meta.wide);
			}catch( e ){}
		}
		return w;
	}
	
	/* ---------- ---------- ---------- */
	
	function _def() {
		return DEFAULT_PAGE_WIDES[0];
	}
	function _sizeListTag() {
		var tag = ""
		var wides = DEFAULT_PAGE_WIDES;
		for (var i = 0; i < wides.length ; i++) {
			tag += '		<div class="_btn" onclick="javascript:CMS_SizeManager.setWide('+wides[i]+');"><i class="fa fa-arrows-h "></i> 編集幅指定 : '+wides[i]+'px</div>';
		}
		tag += '		<div class="_btn" onclick="javascript:CMS_SizeManager.setWide100p();"><i class="fa fa-arrows-h "></i> 編集幅指定 : 100%</div>';
		tag += '		<div class="_btn" onclick="javascript:CMS_SizeManager.setWideInput();"><i class="fa fa-arrows-h "></i> 編集幅指定 : 自分で入力</div>';
		tag += 			CMS_GuideU.getGuideTag("setting/wide","コンテンツ幅について");
		return tag;
	}
	
	function treat(_s) {
		if(_s == n100P) return _s;
		var b = false;
		if(!_s) b = true;
		if(isNaN(_s)) b = true;
		if(Number(_s) < 500) b = true;
		if(b) return _def();
		return _s;
	}
	
	/* ---------- ---------- ---------- */

	return {
		init: init,
		getContentsWidth: getContentsWidth,
		getTag_FreePageBar: getTag_FreePageBar,
		
		setWideInput: setWideInput,
		setWide100p: setWide100p,
		setWide: setWide
	}
})();
