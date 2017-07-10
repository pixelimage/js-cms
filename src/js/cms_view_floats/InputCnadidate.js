
var InputCnadidate = (function(){
	var view
	function init(){
		view = $("#InputCnadidate");

		$(document).on("click","._candidate_item",function(){
			clickItem($(this).data("val"));
		})
		$(document).on("focus","input[data-candidate]",function(){
			stageIn($(this));
		});
		$(document).on("click","input[data-candidate]",function(){
			stageIn($(this));
		});
		// $(document).on("mouseout","input[data-candidate]",function(){
		// 	stageOut_delay();
		// });
		
		view.on("mouseover",function(){ clearTimer(); });
		view.on("mouseout",function(){ stageOut_delay(); });
		
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	var currentTar 
	function showList(_tar){
		if(!_tar.data("candidate"))return;
		var id = _tar.data("candidate");
		var ls = InputCnadidateDic.getList(id)
		if(!ls)return;
		currentTar = _tar;
		
		var tag = ""
		for (var i = 0; i <  ls.length ; i++) {
			if(ls[i][1] == "") ls[i][1] = ls[i][0];
			tag += '<div class="_candidate_item" data-val="'+ls[i][1]+'">' + ls[i][0] + '</div>'
		}
		// view.css({
		// 	top:_tar.offset().top + 18,
		// 	left:_tar.offset().left + 30
		// })
		view.html(tag);
		_tar.parent().css("position","relative").append(view);
		// _tar.parent().css("border","solid 1px #888").append(view);
	}

	/* ---------- ---------- ---------- */
	
	function clickItem(_val){
		if(!currentTar)return;
		if(_val == "")return;
		if(_val == undefined)return;
		if(_val == "--"){
			currentTar.val("").keyup();
		} else{
			currentTar.val(_val).keyup();
		}
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	// var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_tar){
		stageOut();
		if(! isOpen){ isOpen = true;
			// if(isFirst){}
			// isFirst = false;
			view.show();
			showList(_tar);
		}
	}
	var tID;
	function clearTimer(){
		if(tID) clearTimeout(tID);
	}
	function stageOut_delay(){
		clearTimer();
		tID = setTimeout(function(){
			stageOut();
		},200);
	}
	function stageOut(){
		clearTimer();
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut
	}
	
})();

var InputCnadidateDic = (function(){

	var dic = {}
	dic._cms_image_width = [
		["100%",""],
		["50%",""],
		["25%",""],
		["600px",""],
		["400px",""],
		["200px",""],
		["100px",""],
		["リセット","--"]
	]
	dic._cms_image_ratio = [
		["1:1",""],
		["2:1",""],
		["2:3",""],
		["3:2",""],
		["16:9",""]	,
		["リセット","--"]	
	]
	dic._cms_images_margin = [
		["0",""],
		["0 10px 10px 0",""],
		["0 20px 20px 0",""],
		["リセット","--"]	
	]
	dic._cms_text_size = [
		["10px",""],
		["12px",""],
		["14px",""],
		["16px",""],
		["18px",""],
		["24px",""],
		["32px",""],
		["42px",""],
		["60px",""],
		["80px",""],
		["120px",""],
		["リセット","--"]	
	]
	dic._cms_text_align = [
		["left",""],
		["center",""],
		["right",""],
		["リセット","--"]
	]
	dic._cms_line_heiht = [
		["1",""],
		["1.2",""],
		["1.4",""],
		["1.6",""],
		["1.8",""],
		["2",""],
		["リセット","--"]
	]
	dic._cms_box_round = [
		["2px",""],
		["5px",""],
		["10px",""],
		["5%",""],
		["10%",""],
		["25%",""],
		["50%",""],
		["リセット","--"]
	]
	dic._cms_border_w = [
		["1px",""],
		["2px",""],
		["4px",""],
		["リセット","--"]
	]
	
	dic._cms_text_bold = [
		["太字","bold"],
		["リセット","--"]
	]
	
	dic._cms_text_font = [
		["明朝体","serif"],
		["ゴシック体","sans-serif"],
		["筆記体","cursive"],
		["装飾体","fantasy"],
		["等幅体","monospace"],
		["リセット","--"]
	]
	dic._cms_text_sdw = [
		["1","1"],
		["2","2"],
		["4","4"],
		["8","8"],
		["16","16"],
		["32","32"],
		["リセット","--"]
	]

	function getList(_v){
		if(!dic)return;
		if(!dic[_v])return;
		return dic[_v];
	}

	return { getList:getList }
})();

var ColorPickerView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#ColorPickerView');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = '';
			tag += '<div class="_color_preview">***</div>';
			tag += '<canvas id="CMS_ColorCanvas" width="255" height="181"></canvas>';
			tag += '<div class="_btn_reset">色をクリア</div>';
		view.append(tag);
		
		v.color_preview = view.find("._color_preview");
		
		v.btn_reset = view.find("._btn_reset");
		v.btn_reset.click(function(){ reset() });
		
		initCanvas();
	}
	
	var currentSel;
	function setBtn(){
		$(document).on("focus","input._colorPicker",function(){
			currentSel = $(this);
			previewColor(currentSel.val());
			stageIn(currentSel,function(_val){
				currentSel.val(_val).keyup();
				stageOut();
			});
		});
		$(document).on("click","input._colorPicker",function(){
			currentSel = $(this);
			previewColor(currentSel.val());
			stageIn(currentSel,function(_val){
				currentSel.val(_val).keyup();
				stageOut();
			});
		})
		$(document).on("mouseout","input._colorPicker",function(){
			stageOut_delay();
		});
		view.on("mouseover",function(){ clearTimer(); });
		view.on("mouseout",function(){ stageOut_delay(); });
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	var canvas;
	var ctx;
	
	function initCanvas(){
		canvas = document.getElementById("CMS_ColorCanvas");
		ctx = canvas.getContext("2d");
		
		var image = new Image();
		    image.src = "./images/colorlist.png";
		    image.onload = function(){
				ctx.clearRect(0, 0, canvas.width, canvas.height); 
				var x = (canvas.width - image.width) / 2;
				var y = (canvas.height - image.height) / 2;      
				ctx.drawImage(image, x, y);
			};
		canvas.onclick = function(e){ selectColor(getColor(e)); }
		canvas.onmousemove = function(e){ previewColor(getColor(e)); }
	}
	
	function getColor(e) {
		var x = parseInt(e.offsetX);
		var y = parseInt(e.offsetY);
		var imagedata = ctx.getImageData(x, y, 1, 1);
		return rgba2hex(imagedata.data[0],imagedata.data[1],imagedata.data[2]);
	}
	function previewColor(_val) {
		v.color_preview.css( { background : _val } );
		v.color_preview.html( _val );
	}
	function selectColor(_val) {
		if(cb){
			cb(_val);
		}
	}
	function rgba2hex(r,g,b) {
		r = r.toString(16);
		if (r.length == 1) r = "0" + r;
		g = g.toString(16);
		if (g.length == 1) g = "0" + g;
		b = b.toString(16);
		if (b.length == 1) b = "0" + b;
		return '#' + r + g + b;  
	}  
	
	/* ---------- ---------- ---------- */
	
	function reset() {
		currentSel.val("").keyup();
		stageOut();
	}
	/* ---------- ---------- ---------- */
	
	function showList(_tar) {
		view.css({
			top:_tar.offset().top + 22,
			left:_tar.offset().left
		})
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	var cb;
	function stageInit(){
		view.hide();
	}
	function stageIn(_tar,_cb){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
			cb = _cb;
			showList(_tar);
		}
	}
	var tID;
	function clearTimer(){
		if(tID) clearTimeout(tID);
	}
	function stageOut_delay(){
		clearTimer();
		tID = setTimeout(function(){
			stageOut();
		},200);
	}
	function stageOut(){
		clearTimer();
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();
