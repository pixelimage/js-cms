
var MiniEditer = (function(){
	
	var view;
	var v = {};
	
	function init(){
		view = $('#MiniEditer');
		v.body = $("body");
		stageInit();
	}
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_bg"></div>';
			tag += '<div class="_anno">編集完了：背景クリック or '+TIP2("#+Enter") + '</div>';
			tag += '<div class="_modalBox">';
			tag += '	<div class="_header _header_def clearfix">';
			tag += '		<div class="_title">'+Dic.I.Edit+' <span></span></div>';
			tag += '		<div class="_btn_full ss_icon _icon_full" '+TIP("F11","T")+'></div>';
			tag += '		<div class="_dragBar"></div>';
			tag += '	</div>';
			tag += '	<div class="_header _header_full clearfix">';
			tag += '		<div class="_title">'+Dic.I.Edit+' <span></span></div>';
			tag += '		<div class="_btn_full_off ss_icon _icon_full_off" '+TIP("F11","T")+'></div>';
			tag += '	</div>';
			tag += '	<div class="_body clearfix"></div>';
			tag += '</div>';
		view.html(tag)

		v.bg 			= view.find('._bg');
		v.anno 			= view.find('._anno');
		v.header 		= view.find('._header');
		v.headerD 		= view.find('._header_def');
		v.headerF 		= view.find('._header_full');
		v.modalBox 		= view.find('._modalBox');
		v.bodyArea 		= view.find('._body');
		v.title 		= view.find('._title span');
		v.btn_full 		= view.find('._btn_full');
		v.btn_full_off 	= view.find('._btn_full_off');
		v.btn_full		.click(toggleFullScreen);
		v.btn_full_off	.click(toggleFullScreen);
		
		MiniEditer.Editors.init(v.bodyArea);
		
		setEvent();
		setBtn();
		CMS_ScreenManager.registResize(function(){
			resize()
		});
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		v.bg.bind("mousedown",function(){stageOut();});
		v.anno.bind("mousedown",function(){stageOut();});
	}
	
	/* ---------- ---------- ---------- */

	function setEvent(){
		v.modalBox.draggable({ distance: 5, handle: v.headerD });
		 v.modalBox.resizable( {
			resize: onResuze, stop: onResuzeStop,
			minWidth:350,
		});
		v.headerD.bind("dblclick",function(){
			startFullScreen();
		})
		v.headerF.bind("click",function(){
			endFullScreen();
		})
	}
	
	var tID;
	function onResuze(event,ui){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){ 
			setTextareaSize(ui.size.height-100); 
		},10);
	}
	function onResuzeStop(event,ui){
		setTextareaSizeEnd(ui.size.height-100);
	}
	var currentTextareaH = 150;
	function setTextareaSize(_h){
		currentTextareaH = _h ;
		MiniEditer.Editors.resize(currentTextareaH);
	}
	function getTextareaSize(){
		return currentTextareaH;
	}
	function setTextareaSizeEnd(_h){
		setTextareaSize(_h);
		v.modalBox.css("height","auto");
	}
	
	/* ---------- ---------- ---------- */
	
	var defVal = "";
	var prevVal = "";
	var currentVal = "";
	
	function setData(_s){
		if(_s == undefined) _s = "";
		currentVal = defVal = _s;
		MiniEditer.Editors.setData(
			_s,
			type,
			function(_s){
				currentVal = _s;
				if(isFull == false){
					_callback();
				}
			}
		);
		
		updateTitle(type);
		
		if(type.indexOf("input:") != -1){
			v.modalBox.css("width",200+"px")
		}
		
		if(type.indexOf("input:") != -1){
			v.modalBox.css("width",ws.single+"px");
		} else{
			v.modalBox.css("width",ws.multi+"px");
		}
	}
	
		var callbackTID;
	function _callback(){
		if(callbackTID) clearTimeout(callbackTID);
		callbackTID = setTimeout(function(){
				callback(currentVal);
		},200);
	}
	/* ---------- ---------- ---------- */
	
	function updateTitle(_s){
		var t = _s.split(":")[1]
		var s = "テキスト編集"
		if (t == "style") s = "style属性編集";
		if (t == "single-class") s = "class属性編集";
		if (t == "markdown") s = "Markdown編集";
		if (t == "html") s = "HTML編集";
		if (t == "js") s = "JavaScript編集";
		v.title.html(s);
	}
	
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var type;
	var callback;
	
	function stageIn(_s,_callback,_type){
		stageOut()
		if(! isOpen){ isOpen = true;
			showModalView(this);
			if (isFirst) { createlayout(); } 
			isFirst = false;
			view.show();
			callback = _callback;
			type = _type;
			setData(_s);
			v.body.addClass("_modalTextEditing");
			updatePos();
			//
			v.anno.hide().delay(100).fadeIn(100);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			
			view.hide();
			v.body.removeClass("_modalTextEditing");
			endFullScreen()
			memoryW();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var defW = 400;
 	var ws = { single:defW, multi:defW }
 	
	function memoryW(){
		if(type){
			if(type.indexOf("input:") != -1){
				ws.single = v.modalBox.width()
			} else{
				ws.multi = v.modalBox.width()
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var currentPos = {x:0,y:0};
	var closeTime = new Date();
	function updatePos(){
		var y = 0;
		var x = 0;
		
		//
		if (CMS_Status.mouseX  > CMS_StatusW*0.66) {
			x = CMS_Status.mouseX - v.modalBox.width()- 20;
		} else{
			x = CMS_Status.mouseX + 20;
			// x = CMS_Status.mouseX - 50;
		}
		if (CMS_Status.mouseY  > CMS_StatusH*0.8) {
			y = CMS_Status.mouseY - v.modalBox.height() - 20;
		} else{
			y = CMS_Status.mouseY + 15;
			// y = CMS_Status.mouseY - 25;
		}
		
		if (CMS_Status.mouseY == 0) {
			y = 200;
			x = 200;
		}
		var w = v.modalBox.width() + 10;
		var h = v.modalBox.height() + 10;
		if (window.isFireEnterClick) {
			x = CMS_StatusW / 2 - (w / 2);
			y = CMS_StatusH / 2 - (h / 2);
		}
		if (x + w > CMS_StatusW) { x = CMS_StatusW - w }
		if (y + h > CMS_StatusH) { y = CMS_StatusH - h }
		if (x < 0) { x = 10 }
		if (y < 0) { y = 10 }
		
		//前回の表示位置や時間があまり変わらない場合は、同じ位置に
		var saX = Math.abs(currentPos.x - x);
		var saY = Math.abs(currentPos.y - y);
		var saT = new Date().getTime() - closeTime.getTime();
		var b = false;
		if(saX + saY > 150) b = true;
		if(saT > 1000) b = true;
		if(b){
			v.modalBox.css({ left: x, top: y });
			currentPos = {x:x,y:y};
		}
		closeTime = new Date();
	}
	
	function resize(){
		if(isFull){
			setTextareaSize(CMS_StatusH-70);
		}
	}
	
	
	/* ---------- ---------- ---------- */
	var isFull = false
	var modalRect = {x:0,y:0,w:0,h:0}
	var tempH = 0
	
	function startFullScreen(){
		if(isFull == true)return;
		isFull = true;
		updateFullScreen();
	}
	function endFullScreen(){
		if(isFull == false)return;
		isFull = false;
		updateFullScreen();
	}
		
	function toggleFullScreen(){
		if(isFull == false){
			isFull = true;
		} else{
			isFull = false;
		}
		updateFullScreen()
	}
	window.editFullScreen = toggleFullScreen;
	function updateFullScreen(){
		if(isFull){
			modalRect = {
				y : v.modalBox.offset().top,
				x : v.modalBox.offset().left,
				w : v.modalBox.width(),
				h : v.modalBox.height()
			}
			$("body").addClass("_editFullscreen");
			v.modalBox.css({
				top:"0px",
				bottom:"0px",
				left:"0px",
				right:"0px",
				width:"100%",
				height:"100%"
			})
			tempH = currentTextareaH;
			setTextareaSizeEnd(CMS_StatusH-70);
		} else{
			$("body").removeClass("_editFullscreen");
			v.modalBox.css({
				top		: modalRect.y + "px",
				bottom	: "auto",
				left	: modalRect.x + "px",
				right	: "auto",
				width	: modalRect.w + "px",
				height	: modalRect.h + "px"
			})
			setTextareaSizeEnd(tempH);
			_callback(currentVal);
		}
	}
	
	function setRect(_rect){
		
	}
	/* ---------- ---------- ---------- */

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		resize: resize,
		compliteEdit: compliteEdit
	}
})();