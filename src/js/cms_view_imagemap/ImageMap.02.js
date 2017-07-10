

var ImageMap = {}

ImageMap.MainStage = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(_view){
		view = _view;
		createlayout();
		updateWH();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = "";
			tag += '<div class="_canvas_tools">';
			tag += '	<input type="checkbox" class="_in_bg_dark" id="_imagemap_bg_dark" /><label for="_imagemap_bg_dark">プレビュー背景</label>';
			tag += '	　サイズ：<input type="number" step="10" class="_w50 _in_size_w " />';
			tag += '	☓<input type="number" step="10" class="_w50 _in_size_h" />px';
			tag += '	　背景色：<input type="text" class="_w60 _in_bg_color _colorPicker" />';
			tag += '	　文字色：<input type="text" class="_w60 _in_tx_color _colorPicker" />';
			tag += '	　吸着：<input type="text" class="_w30 _in_grid" />%';
			//tag += '	　ズーム：<input type="text" class="_w30 _in_zoom" />%';
			tag += '	　ズーム：';
			tag += '		<select class="_in_zoom">';
			tag += '			<option value="6.0">600%</option>';
			tag += '			<option value="4.0">400%</option>';
			tag += '			<option value="2.0">200%</option>';
			tag += '			<option value="1.5">150%</option>';
			tag += '			<option value="1.0">100%</option>';
			tag += '			<option value="0.75">75%</option>';
			tag += '			<option value="0.5" >50%</option>';
			tag += '			<option value="0.25">25%</option>';
			tag += '		</select>';
			tag += '		<span class="_move _move_up"><i class="fa fa-arrow-up "></i></span>';
			tag += '		<span class="_move _move_down"><i class="fa fa-arrow-down "></i></span>';
			tag += '		<span class="_move _move_left"><i class="fa fa-arrow-left "></i></span>';
			tag += '		<span class="_move _move_right"><i class="fa fa-arrow-right "></i></span>';
			tag += '	<div class="_right_area">';
			tag += '	　<div class="_btn _btn_reset"><i class="fa fa-trash "></i> リセット</div>';
			tag += '	</div>';
			tag += '	<div class="_top_area">';
			tag += '	　<div class="_btn _btn_json">{...} JSON編集</div>';
			tag += '	</div>';
			tag += '</div>';
			tag += '<div class="_add_btns">';
			tag += '	<div class="ss_add_image _read"></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _rect" 	data-type="item.rect" data-extra=""></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _line" 	data-type="item.line" data-extra=""></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _image" 	data-type="item.image" data-extra=""></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _svg" 		data-type="item.svg" data-extra=""></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _text" 	data-type="item.text" data-extra="multi"></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _text2" 	data-type="item.text" data-extra=""></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _html" 	data-type="item.html" data-extra=""></div>';
			tag += '	<div class="_btn_add _cms_btn_alpha ss_add_image _link" 	data-type="item.link" data-extra=""></div>';
			tag += '</div>';
			tag += '<div class="_layoutView">';
			tag += '	<div class="_imageStageWapper">';
			tag += '		<div class="_imageStageInner">';
			tag += '			<div class="_cms-design-stage _cms_bg_trans"></div>';
			tag += '			<div class="_cms-design-mask"></div>';
			tag += '			<div class="_cms-design-mask"></div>';
			tag += '			<div class="_cms-design-mask"></div>';
			tag += '			<div class="_cms-design-mask"></div>';
			tag += '			<div class="_cms-design-mask"></div>';
			tag += '			<div class="_cms-design-mask"></div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '	<div class="_layersView"></div>';
			// tag += '	<div class="_zoomVal">0</div>';
			tag += '</div>';
		view.html(tag);

		ImageMap.InspectView.init();
		ImageMap.LayersView.init(view.find("._layersView"));
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	var in_ = {}
	
	function setBtn(){
		v.canvas_tools = view.find("._canvas_tools");
		// v.zoomVal = view.find("._zoomVal");
		
		v.all = v.canvas_tools.find("input");
		v.all.keyup(function(){ updateState(600)})
		v.all.change(function(){ updateState()})//checkbox
		
		in_.size_w 		= v.canvas_tools.find("._in_size_w");
		in_.size_h 		= v.canvas_tools.find("._in_size_h");
		in_.bg_color 	= v.canvas_tools.find("._in_bg_color");
		in_.tx_color 	= v.canvas_tools.find("._in_tx_color");
		in_.bg_dark 	= v.canvas_tools.find("._in_bg_dark");
		in_.grid 		= v.canvas_tools.find("._in_grid");
		
		initZoom()
		
		v.designStage 	= view.find("._cms-design-stage");
		v.designMask 	= view.find("._cms-design-mask");
		v.layers 		= view.find("._layersView");
		
		v.btn_reset 	= view.find("._btn_reset");
		v.btn_json 		= view.find("._btn_json");
		v.btn_add 		= view.find("._btn_add");
		
		v.btn_reset		.click(function(){ resetAll(); })
		v.btn_json		.click(function(){ editJson(); })
		v.btn_add		.click(function(){ 
			addItem($(this).data("type"), undefined, $(this).data("extra"));
			updateViewList();
		})
		
		view.on("dblclick","._design-item-image",function(){
			ImageMap.InspectView.dClick("image");
		})
		view.on("dblclick","._design-item-text",function(){
			ImageMap.InspectView.dClick("text");
		})
		view.on("dblclick","._design-item-svg",function(){
			ImageMap.InspectView.dClick("svg");
		})
		view.on("dblclick","._design-item-html",function(){
			ImageMap.InspectView.dClick("html");
		})
	}
	
	/* ---------- ---------- ---------- */
	//カンバスステート更新
	
	var tID_state;
	function updateState(_delay){
		if(tID_state) clearTimeout(tID_state);
		tID_state = setTimeout(function(){
			updateState_delay()
		},(_delay) ? _delay :200 );
	}
	function limit(_s,_low,_hight){
		if(_s < _low)_s = _low;
		if(_s > _hight)_s = _hight;
		return _s;
	}
	function updateState_delay(){
		var b = false;
		var cv = canvasData.canvas;
		if(cv.width != Number(in_.size_w.val()) ) {
			cv.width = limit(Number(in_.size_w.val()) ,10,2000)
			b = true;
		}
		if(cv.height != Number(in_.size_h.val()) ) {
			cv.height = limit(Number(in_.size_h.val()) ,10,2000)
			b = true;
		}
		if(cv.background != in_.bg_color.val() ) {
			cv.background = in_.bg_color.val()
			b = true;
		}
		if(cv.color != in_.tx_color.val() ) {
			cv.color = in_.tx_color.val()
			b = true;
		}
		if(cv.dark != in_.bg_dark.prop("checked") ) {
			cv.dark = in_.bg_dark.prop("checked")
			b = true;
		}
		if(cv.grid != Number(in_.grid.val()) ) {
			cv.grid = limit(Number(in_.grid.val()) ,0,100);
			ImageMap.State.grid = cv.grid;
		}
		
		if(b){
			update(false);
		}
	}
	
	/* ---------- ---------- ---------- */
	//データセット
	
	var canvasData;
	
	function setData(_data){
		canvasData = JSON.parse(JSON.stringify(_data));
		resetZoom();
		update(true);
	}
	
	function update(_initDate){
		if(! _initDate){
			canvasData = getData();
		}
		resetItem();
		ImageMap.InspectView.reset();
		ImageMap.LayersView.reset();
		
		if(canvasData == undefined) {
			canvasData.list = [];
		}
		if(canvasData.list == undefined) {
			canvasData.list = [];
		}
		if(canvasData.canvas == undefined) {
			canvasData.canvas = { width:"300",height:"200", background:"", grid:"" }
		}
		
		//サイズ
		var S = ImageMap.State;
			S.imageW = Number(canvasData.canvas.width);
			S.imageH = Number(canvasData.canvas.height);
			S.grid = Number(canvasData.canvas.grid);
			
		var ratio = ImageMapU.getRatio(S.imageW+":"+S.imageH);
		
		in_.size_w.val(S.imageW);
		in_.size_h.val(S.imageH);
		
		//背景色
		in_.bg_color.val(canvasData.canvas.background);
		in_.tx_color.val(canvasData.canvas.color);
		if(canvasData.canvas.dark) { in_.bg_dark.prop("checked",true) }
		
		//グリッド
		in_.grid.val(S.grid);
		
		/* ---------- ---------- ---------- */
		
		var cs1 = "";
		var cv = canvasData.canvas;
		if(cv.dark){ cs1 = "background:rgba(0,0,0,0.75)!important;"; }
		if(cv.background){ cs1 = "background:"+cv.background+"!important;"; } 
		var cs2 = "";
		if(cv.color){
			cs1 += "color:"+cv.color+";";
			cs2 += "fill:"+cv.color+";";
		}
		var tag = "";
			tag += '<style>';
			tag += '._cms-design-stage { position: absolute; width:100%; '+cs1+'}';
			tag += '._cms-design-stage svg{'+cs2+'}';
			tag += '._cms-design-stage svg{1: #fff;}';
			tag += '._cms-design-stage:before { content:""; display: block; padding-top:'+ ratio +'%;}';
			tag += '._cms-design-mask {position: absolute; width:100%; background: rgba(51,51,51,0.5);}';
			tag += '</style>';
		v.designStage.empty();
		v.designStage.html(tag);
		
		v.inner = v.designStage;
		
		//カンバス位置サイズ計算
		// var _wh = ImageMapU.resize( { w: S.imageW, h: S.imageH }, { w: S.stageW, h: S.stageH }, false );
		S.canvasW = S.imageW * getZoom();
		S.canvasH = S.imageH * getZoom();
		
		S.left = (S.stageW - S.canvasW) / 2;
		S.top = (S.stageH - S.canvasH) / 2;
		
		//サイズ・位置・背景指定
		v.designStage.width(S.canvasW);
		v.designStage.height(S.canvasH);
		v.designStage.css("left",S.left +"px");
		v.designStage.css("top",S.top +"px");
		
		//こまごま
		_updateGrid();
		// _updateZoomView();
		
		//組み立てなおし
		var _list = canvasData.list;
		for (var i = 0; i <  _list.length ; i++) {
			addItem(_list[i]);
		}
		updateViewList();
	}
	
	function _updateGrid(){
		var S = ImageMap.State;
		//枠作成
		var BD = 4;
		v.designMask.eq(0).width(S.canvasW+(BD*2));
		v.designMask.eq(0).height(BD);
		v.designMask.eq(0).css("left",S.left-BD +"px");
		v.designMask.eq(0).css("top",S.top-BD +"px");
		
		v.designMask.eq(1).width(BD);
		v.designMask.eq(1).height(S.canvasH);
		v.designMask.eq(1).css("left",S.left+S.canvasW +"px");
		v.designMask.eq(1).css("top",S.top +"px");
		
		v.designMask.eq(2).width(S.canvasW+(BD*2));
		v.designMask.eq(2).height(BD);
		v.designMask.eq(2).css("left",S.left-BD +"px");
		v.designMask.eq(2).css("top",S.top + S.canvasH +"px");
		
		v.designMask.eq(3).width(BD);
		v.designMask.eq(3).height(S.canvasH);
		v.designMask.eq(3).css("left",S.left -BD +"px");
		v.designMask.eq(3).css("top",S.top +"px");
		
		v.designMask.eq(4).width(S.canvasW+(BD*2));
		v.designMask.eq(4).height(1);
		v.designMask.eq(4).css("left",S.left +"px");
		v.designMask.eq(4).css("top",S.top + (S.canvasH/2) +"px");
		v.designMask.eq(4).css("opacity",0.2);
		
		v.designMask.eq(5).width(1);
		v.designMask.eq(5).height(S.canvasH);
		v.designMask.eq(5).css("left",S.left + (S.canvasW/2) +"px");
		v.designMask.eq(5).css("top",S.top +"px");
		v.designMask.eq(5).css("opacity",0.2);
	}
	
	/*
	function _updateZoomView(){
		var S = ImageMap.State;
		var sw = Math.round((S.canvasW/S.imageW)*100);
		var sh = Math.round((S.canvasH/S.imageH)*100);
		v.zoomVal.html( (sw > sh) ? sh + "%" : sw + "%" );
	}
	*/
	
	/* ---------- ---------- ---------- */
	//データ出力
	
	function getData(_updated){
		var out_ = JSON.parse(JSON.stringify(canvasData));
			out_.list = [];
		for (var i = 0; i <  items.length ; i++) {
			var data = items[i].getData();
				data.rect = ImageMapU.convertPixel_2_Percent(data.rect);
				if(_updated){
					if(data.type == "item.text"){
						if(data.data.bmp){
							data.data.bmpData = ImageMapBMPText.getImage(data);
						} else{
							data.data.bmpData = "";
						}
					}
					data.date = new Date().getTime();
				}
			out_.list.push(data);
		}
		return out_;
	}
	/* ---------- ---------- ---------- */
	
	function resetAll(){
		canvasData.list = [];
		update(true);
	}
		
	/* ---------- ---------- ---------- */
	
	function setJson(_s){
		var data
		try{
		  data = JSON.parse(_s);
		} catch( e ){
			alert("データ形式が正しくありません。");
			return;
		}
		if(data){
			setData(data);
		}
		
	}
	function editJson(){
		Editer_JSONView.stageIn(
			JSON.stringify(canvasData, null, "	"),
			function(_s){ setJson(_s) }
		);
	}
	
	/* ---------- ---------- ---------- */
	
	var items;
	
	//追加
	function resetItem(){
		if(items){
			for (var i = 0; i < items.length ; i++) {
				items[i].remove();
			}
		}
		items = [];
	}
	function addItem(_data,_pos,_extra){
		var data;
		if(typeof _data == "string"){
			data = ImageMapCode.getInitData(_data,_extra);
		} else{
			data = JSON.parse(JSON.stringify(_data));
		}
		data.rect = ImageMapU.convertPercent_2_Pixel(data.rect);
		var rectView = new ImageMap.RectViewClass(data.type);
			rectView.setData(data);
			if(_pos!= undefined){
				items.splice(_pos,0,rectView);
			} else{
				items.push(rectView);
			}
		return rectView;
	}
	
	//削除
	function removeItem(){
		if(!currentItem) return;
		var a = [];
		for (var i = 0; i < items.length ; i++) {
			if(items[i] == currentItem) {
				items[i].remove();
			} else{
				a.push(items[i])
			}
		}
		items = a;
		currentItem = null;
		//
		selectLast();
		updateViewList();
	}
	function selectLast(){
		if(items.length > 0){
			items[items.length -1].select();
		}
	}
	
	//JSON編集
	function editItem(){
		if(!currentItem) return;
		currentItem.editJson();
	}
	
	/* ---------- ---------- ---------- */

	//複製
	function dupItem_right(){
		if(!currentItem)return;
		var dup = currentItem.getData();
			dup.rect.left += dup.rect.width;
			dup.rect = ImageMapU.convertPixel_2_Percent(dup.rect);
		
		var item = addItem(dup,currentItem.no+1);
			item.select();
		updateViewList();
	}
	function dupItem_bottom(){
		if(!currentItem)return;
		var dup = currentItem.getData();
			dup.rect.top += dup.rect.height;
			dup.rect = ImageMapU.convertPixel_2_Percent(dup.rect);
		var item = addItem(dup,currentItem.no+1);
			item.select();
		updateViewList();
	}
	
	/* ---------- ---------- ---------- */
	//レイヤー順移動
	
	function swapItem(_items,_from,_to){
		var from_ 	 = items[_from];
		var to_ 	 = items[_to];
		if(from_ ==undefined)return;
		if(to_ ==undefined)return;
		_items[_to]  = from_;
		_items[_from]  = to_;
		return _items;
	}
	//全面へ
	function moveFront(){
		var n = currentItem.no;
		swapItem(items,n,n+1);
		updateViewList();
	}
		
	function moveBack(){
		var n = currentItem.no;
		swapItem(items,n,n-1);
		updateViewList();
	}
	function moveFront2(){
		var n = currentItem.no;
		swapItem(items,n,items.length-1);
		updateViewList();
	}
	function moveBack2(){
		var n = currentItem.no;
		swapItem(items,n,0);
		updateViewList();
	}
	
	//ビューの並びを更新
	function updateViewList(){
		var tag = ""
		for (var i = 0; i <  items.length ; i++) {
			items[i].setNo(i);
			items[i].updateImage();
			v.inner.append(items[i].getView());
		}
		ImageMap.LayersView.update(items);
	}
	
	function assingText2Image(_src){
		var src = CMS_PathFunc.treatRel(_src);
		var b = false;
		for (var i = 0; i <  items.length ; i++) {
			var data = items[i].getData();
			if(src == data.data.src) b = true;
		}
		if(! b){
			addItem("item.image",undefined,{ src:_src });
		}
		updateViewList();
	}
	
	/* ---------- ---------- ---------- */

	//選択セット
	var currentItem
	function selectItem(_item){
		currentItem = _item;
		ImageMap.InspectView.selectedItem(_item);
		ImageMap.LayersView.selectedItem(_item);
	}

	function hideItem(_no,_b){
		items[_no].hideItem(_b)
	}
	
	function lockItem(_no,_b){
		items[_no].lockItem(_b)
	}
		
	/* ---------- ---------- ---------- */
	
	function initZoom(){
		in_.zoom 		= v.canvas_tools.find("._in_zoom");
		in_.zoom.change(function(){updateZoom()})
		
		in_.move_left 		= v.canvas_tools.find("._move_left");
		in_.move_right 		= v.canvas_tools.find("._move_right");
		in_.move_up 		= v.canvas_tools.find("._move_up");
		in_.move_down 		= v.canvas_tools.find("._move_down");
		in_.move_left	.click(function(){moveCanvasLeft(100)})
		in_.move_right	.click(function(){moveCanvasLeft(-100)})
		in_.move_up		.click(function(){moveCanvasTop(100)})
		in_.move_down	.click(function(){moveCanvasTop(-100)})
	}
	
	var _zoom;
	function resetZoom(){
		in_.zoom.val("1.0");
		_zoom = 1;
	}
	function updateZoom(){
		_zoom = limit(Number(in_.zoom.val()) ,0,10);
		resize();
	}
	function getZoom(){
		return _zoom;
	}
	
	function __moveCanvas(_tar,_d,_n){
		var nn = _tar.css(_d).split("px").join("");
		_tar.css(_d, Number(nn) + _n);
	}
	function moveCanvasLeft(_n){
		__moveCanvas(v.designStage, "left", _n);
		__moveCanvas(v.designMask.eq(0), "left", _n);
		__moveCanvas(v.designMask.eq(1), "left", _n);
		__moveCanvas(v.designMask.eq(2), "left", _n);
		__moveCanvas(v.designMask.eq(3), "left", _n);
		__moveCanvas(v.designMask.eq(4), "left", _n);
		__moveCanvas(v.designMask.eq(5), "left", _n);
	}
	function moveCanvasTop(_n){
		__moveCanvas(v.designStage, "top", _n);
		__moveCanvas(v.designMask.eq(0), "top", _n);
		__moveCanvas(v.designMask.eq(1), "top", _n);
		__moveCanvas(v.designMask.eq(2), "top", _n);
		__moveCanvas(v.designMask.eq(3), "top", _n);
		__moveCanvas(v.designMask.eq(4), "top", _n);
		__moveCanvas(v.designMask.eq(5), "top", _n);
	}

	/* ---------- ---------- ---------- */
	
	function resize(){
		updateWH();
		update(false);
	}
	
	var canvasOffset = 40;
	var marginW = 30*2;
	var marginH = 220;
	var layerW = 180;
	
	function updateWH(){
		var _w = CMS_StatusW - ( marginW + layerW + canvasOffset );
		var _h = CMS_StatusH - ( marginH + canvasOffset );
		ImageMap.State.stageW = _w;
		ImageMap.State.stageH = _h;
		$("#ImageMapView ._imageStageWapper").width( _w + canvasOffset);
		$("#ImageMapView ._imageStageWapper").height( _h + canvasOffset);
		$("#ImageMapView ._layoutView").width( _w  + canvasOffset + layerW );
		$("#ImageMapView ._layoutView").height( _h  + canvasOffset );
	}
	
	/* ---------- ---------- ---------- */
	
	return {
		init: init,
		setData:setData,
		getData:getData,
		selectItem:selectItem,
		hideItem:hideItem,
		lockItem:lockItem,
		
		removeItem:removeItem,
		editItem:editItem,
		dupItem_right:dupItem_right,
		dupItem_bottom:dupItem_bottom,
		moveFront:moveFront,
		moveBack:moveBack,
		moveFront2:moveFront2,
		moveBack2:moveBack2,
		
		addItem:addItem,
		updateViewList:updateViewList,
		assingText2Image:assingText2Image,
		
		resize:resize
	}
})();

