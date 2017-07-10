
var BatchPublishView 		 = (function(){
	
	var view;
	var v = {};
	
	function init(){
		view = $('#BatchPublishView');
		stageInit();
		// stageIn();
	}
	/* ---------- ---------- ---------- */
	function createlayout(){
		var tag = ""
			tag += '<div class="_bg"></div>'
			tag += '<div class="_modalBox ">'
			tag += '	<div class="_progress">'
			tag += '		<div class="_bar"></div>'
			tag += '	</div>'
			tag += '	<div class="_t_result"><div class="_core"></div></div>'
			tag += '	<div class="_btns">'
			tag += '		<div class="_cms_btn _cms_btn_active _cms_btn-big _btn_start ">スタート</div> ';
			tag += '		<div class="_cms_btn _btn_close">閉じる</div> ';
			tag += '		<div class="_cms_btn _cms_btn_red _cms_btn-big _btn_cancel">キャンセル</div> ';
			tag += '	</div>'
			tag += '</div>'
		view.html(tag);
		
		v.progress 		= view.find('._progress');
		v.bar	 		= view.find('._bar');
		v.t_result 		= view.find('._t_result ._core');
		v.btn_start 	= view.find('._btn_start');
		v.btn_close 	= view.find('._btn_close');
		v.btn_cancel = view.find('._btn_cancel');
		v.bg = view.find('._bg');
		
		setBtn();
	} 
	
	function setBtn(){
		v.btn_start.click(function(){ start_core() });
		v.btn_cancel.click(function(){ stop() });
		
		v.btn_close.click(function(){ stageOut() });
		v.bg.click(function(){ stageOut() });
	}
	
	/* ---------- ---------- ---------- */
	
	var tID;
	var leng;
	var pubList;
	
	function start(_list){
		leng = _list.length;
		
		//あらかじめ、公開日時を設定してやる。TreeAPIの仕様対策
		for (var i = 0; i <  _list.length ; i++) {
			_list[i].publicDate = CMS_SaveDateU.getDate();
		}
		//
		pubList = _list;
		var tag = '<span class="_fs14"><b>' + _list.length + '<b> ページをまとめて公開します...';
		v.t_result.html(tag);
		
		v.btn_start.show();
		v.btn_close.show();
		v.btn_cancel.hide();
	}
	
	var queue;
	function start_core(_list){
		
		v.btn_start.hide();
		v.btn_close.hide();
		v.btn_cancel.show();
		
		queue = new BatchQueueControllClass(pubList,BATCH_EXPORT_COUNT);
		
		queue.start(10,function(_i,_param){
			stepResult(_i,_param);
		},function(){
			lastResult();
			end();
		});
	}
	function stop(){
		if(queue) queue.stop()
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			stageOut()
		},400);	
	}
	function end(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			stageOut();
		},600);	
	}
	
	/* ---------- ---------- ---------- */
	
	var W = 240;
	function stepResult(_i,_param ){
		var num = ((_i*BATCH_EXPORT_COUNT)+1);
		var tag = ""
			tag += '<b> ' + num + " / " + leng + ' </b><br>' 
			// tag += _param.page.name.split("<br>");
		v.t_result.html(tag);
		var per = Number( num / leng);
		v.bar.css("width", per*W+"px" )
	}
	function lastResult( ){
		v.t_result.html("すべて公開しました");
		v.bar.css("width", W + "px" )
		CMS_PageList_PageDB.updateState();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback
	function stageIn(_list,_callback){
		if(! isOpen){ isOpen = true;
			callback = _callback;
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
			
			if(_list) start(_list);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
			v.t_result.html("");
			v.bar.css("width","0px" );
			stop()
		}
	}
	function resize(){
		if(isOpen){
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize }
})();
