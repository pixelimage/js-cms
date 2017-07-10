
var ImageMapBMPText = (function(){

	var DEF_FONT = "";
	
	var view;
	function init(){
		$("body").append('<div id="ImageMapBMPText" style="display:none;"></div>')
		 view = $("#ImageMapBMPText");
	}
	
	function treatParam(_param){
		if(!_param) _param = {}
		
		if(! _param["pixel"]) _param.rect = {};
		if(! _param.rect["pixel"]) _param.rect.pixel = 300;
		if(! _param.rect["pixel"]) _param.rect.pixel = 50;
		
		if(! _param["data"]) _param.data = {};
		if(! _param.data["width"]) _param.data.width = 300;
		if(! _param.data["height"]) _param.data.height = 50;
		if(! _param.data["text"]) _param.data.text = "サンプルのタイトル";
		if(! _param.data["size"]) _param.data.size = "24px";
		if(! _param.data["line"]) _param.data.line = 1.2;
		if(! _param.data["color"]) _param.data.color = "";
		if(! _param.data["align"]) _param.data.align = "";
		if(! _param.data["font"]) _param.data.font = "";
		if(! _param.data["bold"]) _param.data.bold = "";
		if(! _param.data["sdw"]) _param.data.sdw = "";
		return _param;
	}
	
	var CANVAS_ID = "_ImageMapCanvas_";
	//
	var zoom = IMAGE_BLOCK_BMP_ZOOM;
	function getImage(_param){
		if(typeof _param == "string") return "";
		_param = treatParam(_param);
		
		var w = _param.pixel.width *zoom;
		var h = _param.pixel.height *zoom;
		
		var temp = '<canvas id="{CANVAS_ID}" style="hidden" width="{W}" height="{H}"></canvas>';
			temp = temp.split("{CANVAS_ID}").join(CANVAS_ID);
			temp = temp.split("{W}").join(w);
			temp = temp.split("{H}").join(h);
		view.html(temp);
		
		var canvas = document.getElementById(CANVAS_ID);
		var size = (function(_s){ 
		    return Number( _s.split("px")[0]) * zoom;
		})(_param.data.size);
		
		var _ctx = canvas.getContext('2d');
			_ctx.clearRect(0,0,w,h);
			_ctx.beginPath();
			_ctx.fillStyle = _param.data.color;
			_ctx.font = _getFont(size,_param.data.font); 
			
			if(_param.data.sdw){
				_ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
				_ctx.shadowBlur = _param.data.sdw;
			}
			
			var param = {
				ctx:_ctx,
				text:_param.data.text,
				width:w,
				line:size * Number(_param.data.line),
				align:(_param.data.align) ?_param.data.align : ""
			}
			_createText(param);
		
		return canvas.toDataURL();
	}
	
	function _getFont(_f,_fa,_st){
		var size = (_f != "") ?  _f : "10";
		var s2 = (_fa != "") ?  _fa : "Verdana";
		var s3 = (_st != "") ? _st : "";
		return [ s3 , size + 'px' ,"'"+s2+"'" ].join(" ");
	}
	
	function _createText(_param) {
		//各行のテキスト
		var rows = _createText_getRows(_param.ctx, _param.text, _param.width);
		
		//行揃え
		var startX = 0;
		if(_param.align == "center"){
			_param.ctx.textAlign = _param.align;
			startX = _param.width/2;
		}
		if(_param.align == "right"){
			_param.ctx.textAlign = _param.align;
			startX = _param.width;
		}
		//1行づつレンダー
		for (var i = 0; i < rows.length; ++i) {
			_param.ctx.fillText(rows[i], startX, _param.line * (i+1));
		}
	}
	function _createText_getRows(_ctx, text, _w) {
		if (text.length < 1) { return []; }
		var rows = [];
		var _row = "";
		for (var i = 0; i < text.length; i++) {
			var c = text.charAt(i);
			if (c == "\n") {
				rows.push(_row);
				_row = "";
			} else{
				var w = _ctx.measureText(_row + c).width;
				if (w <= _w) {
					_row += c;
				} else {
					rows.push(_row);
					_row = c;
				}
			}
		}
		if (_row.length > 0) rows.push(_row);
		return rows;
	}
	
	return {
		init:init,
		getImage:getImage 
	}
})();

