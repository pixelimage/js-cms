/**
 * スクリーン情報管理
 * カンバスのリサイズや、高、幅などの管理を行う
 */
 
var CMS_StatusW;
var CMS_StatusH;
var CMS_ScreenManager			 = (function(){

	var MAX_W = 800
	var currentSubPageView;
	var v = {}
	function init(){
		
		CMS_StatusW = $(window).width();
		CMS_StatusH = $(window).height();
		if(CMS_StatusW < MAX_W)CMS_StatusW = MAX_W;
		
		//リアルタイムにマウス位置取得
		$(window).mousemove(function(e){
			CMS_Status.mouseX =e.clientX;
			CMS_Status.mouseY =e.clientY;
		});
		
		//リサイズ時に、画面サイズを更新
		$(window).resize(resize);
		
		v.stageView = $("#CMS_PagesView");
		v.sideView = $("#CMS_PageListView");
		
		v.sideView.scroll(function () {
			Storage.Memo.setSideMenuY(v.sideView.scrollTop());
		});
	}	
	
	/* ---------- ---------- ---------- */
	//リサイズイベント
	//CMS_ScreenManager.registResize
	var _winds = []
	function registResize(_f){
		_winds.push(_f)
	}	
	function setSubView(_view){
		currentSubPageView = _view
	}
	
	/* ---------- ---------- ---------- */
	
	var tID_re;
	function resize(e){
		//jqのresizableイベントに、windowリサイズも反応するため、
		//フィルターをかける
  		if (e.target == window){
			if(tID_re) clearTimeout(tID_re);
			tID_re = setTimeout(function(){
				resize_core()
			},200);
  		}
	}
	function resize_core(){
		CMS_StatusW = $(window).width();
		CMS_StatusH = $(window).height();
		if(CMS_StatusW < MAX_W)CMS_StatusW = MAX_W;
		
		if(currentSubPageView != null){
			currentSubPageView.resize();
		}
		for (var i = 0; i < _winds.length ; i++) {
			if(_winds[i]){
				_winds[i]();
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	/*
		ページに要素を追加、削除するときに、要素が一回リセットされ。
		ページ高さが0になるので、それを回避するため、
		一定作業ごとに、min-heigithを設定し、最低限の高さをほしょうする。
		ページ移動で、リセット
	*/
	var scrollView;
	function initCanvas(){
		scrollView = $('#CMS_PagesView');
	}
	var current;
	function memoryCurrentScroll(){
		if(!current) return;
		var c = _getScrollPage(current);
		c[1] = scrollView.scrollTop();
	}
	function setCurrentScroll(_param){
		if(!scrollView) initCanvas();
		var id = CMS_Path.PAGE.getAbsPath(_param.id,_param.dir);
		current = id;
		var r = _getScrollPage(id)[1];
		scrollView.scrollTop(r);
	}
	var scrolls = [];
	function _getScrollPage(_id){
		var b = false;
		var tar;
		for (var i = 0; i < scrolls.length ; i++) {
			if(scrolls[i][0] == _id) {
				tar = scrolls[i];
				b = true;
			}
		}
		if(!b){
			tar = [_id,0];
			scrolls.push(tar);
		}
		return tar;
	}
	
	/* ---------- ---------- ---------- */
	
	//ページのブロックを選択したとコールされる
	//スクロール位置の調整
	
	function updatePageScroll(_top,_smooth){
		if(_smooth == undefined) _smooth = true;
		var H = CMS_StatusH;
		var SC = v.stageView.scrollTop();
		var tarY = _top + SC;
		var currentY = H + SC;
		var b = false;
		if (tarY > currentY - 100) b = true;
		if (tarY < SC) b = true;
		
		if (b){
			tarY2 = tarY - (H / 2)
			if(_smooth){
				v.stageView.animate( {
					scrollTop:tarY2
				}, {  duration: 100});	
			} else{
				v.stageView.scrollTop(tarY2);
			}
			
		}
	}
	
	/* ---------- ---------- ---------- */
	
	return {
		init:init,
		setSubView:setSubView,
		registResize:registResize,
		memoryCurrentScroll:memoryCurrentScroll,
		setCurrentScroll:setCurrentScroll,
		updatePageScroll:updatePageScroll
	}
})();