
ImageMap.State = {
	//最大サイズ
	stageW: 800, 
	stageH: 600,
	
	//編集サイズ
	canvasW: 0,
	canvasH: 0,
	
	//オリジナルサイズ
	imageW: 100,
	imageH: 100,
	
	grid:0
}

var ImageMapU = (function(){
	/*
	function resize(_wh,_max,_isFit){
		if(_isFit){
			var ss1 = _wh.w / _wh.h ;
			var ss2 = _max.w / _max.h ;
			if( ss1 > ss2 ) {
				var z = _max.w / _wh.w 
				_wh.w = _max.w;
				_wh.h = z *_wh.h
			} else{
				var z = _max.h / _wh.h 
				_wh.h = _max.h;
				_wh.w = z *_wh.w
			}
		}
		
		var w = _wh.w;
		var h = _wh.h;
		var rate = _wh.w / _wh.h;
		if(_wh.w > _max.w){
			w = _max.w;
			h = w / rate;
		}
		if(h > _max.h){
			h = _max.h;
			w = h * rate;
		}
		return {w: Math.round(w), h:Math.round(h)}
	}
	*/
		// 
	function convertPercent_2_Pixel(_rect){
		var ssW = 100 / ImageMap.State.canvasW;
		var ssH = 100 / ImageMap.State.canvasH;
		return { 
			top		: _rect.top / ssH,
			left	: _rect.left / ssW,
			width	: _rect.width / ssW,
			height	: _rect.height / ssH,
			opacity	: _rect.opacity,
			rotate	: _rect.rotate,
			link	: _rect.link,
			attr	: _rect.attr,
			class	: _rect.class,
			style	: _rect.style
		};
	}
	function convertPixel_2_Percent(_rect){
		var ssW = 100 / ImageMap.State.canvasW;
		var ssH = 100 / ImageMap.State.canvasH;
		return {
			left 	: treat(_rect.left * ssW),
			top 	: treat(_rect.top * ssH),
			width 	: treat(_rect.width * ssW),
			height 	: treat(_rect.height * ssH),
			opacity	: _rect.opacity,
			rotate	: _rect.rotate,
			link	: _rect.link,
			attr	: _rect.attr,
			class	: _rect.class,
			style	: _rect.style
		}
	}
	function adjustW(_s){
		var g = ImageMap.State.grid;
		var ssW = 100 / ImageMap.State.canvasW;
		var s = Number(_s) * ssW;
			s = Math.round(s/g)*g;
			s = s / ssW;
		return s;
	}
	function adjustH(_s){
		var g = ImageMap.State.grid;
		var ssH = 100 / ImageMap.State.canvasH;
		var s = Number(_s) * ssH;
			s = Math.round(s/g)*g;
			s = s / ssH;
		return s;
	}
	
	//ImageMapU.treat
	function treat(_n) {
		return Math.round(_n * 100) / 100;
	}
	//
	function getRatio(_r){
		var ratio;
		if(_r){
			if(_r.indexOf(":") != -1){
				var a = _r.split(":");
				ratio = a[1]/a[0] *100;
				ratio = treat(ratio);
			}
		}
		return ratio;
	}
	
	function copyRect(_rect){
		return {
			top	: _rect.top,
			left: _rect.left,
			width: _rect.width,
			height: _rect.height
		}
	}
	return {
		// resize: resize,
		treat:treat,
		getRatio:getRatio,
		convertPercent_2_Pixel:convertPercent_2_Pixel,
		convertPixel_2_Percent:convertPixel_2_Percent,
		adjustW:adjustW,
		adjustH:adjustH,
		copyRect:copyRect
	}

})();