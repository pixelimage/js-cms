

var DummyImageService = (function(){
	
	var DEF_FONT = "Verdana";
	
	var view;
	// var isInited = false
	function init(){
		$("body").append('<div id="DummyImageServiceView" style="display:none;"></div>')
		 view = $("#DummyImageServiceView");
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	
	function isMock(_s){
		if(_s == undefined) return false;
		if(typeof _s != "string") return false;
		if(_s.indexOf(",") != -1) return true;
		return false;
	}
	function isDummy(_s){
		return isMock(_s)
	}
	
	function param_2_text(_param){
		var a = [];
		function f (_p,_id,_def,_a){
			if(_p[_id]){
				if(_def == ""){
					_a.push( _id +":" +_p[_id] )
				} else{
					if(_p[_id] != _def){
						_a.push( _id +":" +_p[_id] )
					}
				}
			}
		}
		f(_param,"width","" ,a);
		f(_param,"height","" ,a);
		f(_param,"color","#666" ,a);
		f(_param,"text","" ,a);
		f(_param,"text2","" ,a);
		f(_param,"font",10 ,a);
		f(_param,"font2",10 ,a);
		f(_param,"family",DEF_FONT ,a);
		f(_param,"family2",DEF_FONT ,a);
		f(_param,"style","" ,a);
		f(_param,"style2","" ,a);
		
		return a.join(",");
	}
	function getInitParam(){
		return{
			width: 200,
			height: 140,
			color: "#666",
			text: "",
			text2: "",
			font: 10,
			font2: 10,
			family: DEF_FONT,
			family2: DEF_FONT,
			style: "",
			style2: ""
		}
	}
	function text_2_param(_s){
			if(_s === undefined) _s = ""
			var a =  _s.split(",");
			var o = getInitParam();
			for (var i = 0; i <  a.length ; i++) {
				var aa = a[i].split(":");
				if(aa[0] == "width" 	&& aa[1] !="") o.width = Number(aa[1]);
				if(aa[0] == "height" 	&& aa[1] !="") o.height = Number(aa[1]);
				if(aa[0] == "color" 	&& aa[1] !="") o.color = aa[1];
				if(aa[0] == "text" 		&& aa[1] !="") o.text = aa[1];
				if(aa[0] == "text2" 	&& aa[1] !="") o.text2 = aa[1];
				if(aa[0] == "font" 		&& aa[1] !="") o.font = Number(aa[1]);
				if(aa[0] == "font2" 	&& aa[1] !="") o.font2 = Number(aa[1]);
				if(aa[0] == "family" 	&& aa[1] !="") o.family = aa[1];
				if(aa[0] == "family2" 	&& aa[1] !="") o.family2 = aa[1];
				if(aa[0] == "style" 	&& aa[1] !="") o.style = aa[1];
				if(aa[0] == "style2" 	&& aa[1] !="") o.style2 = aa[1];
			}
			return o;
	}
	function treatParam(_param){
		if(_param["width"]) _param.width = Number(_param.width);
		if(_param["height"]) _param.height = Number(_param.height);
		if(_param["font"]) _param.font = Number(_param.font);
		if(_param["font2"]) _param.font2 = Number(_param.font2);
		return _param;
	}
	var CANVAS_ID = "_DummyImageCanvas_"
	function getImage(_s){
		var param = text_2_param (_s);
		var temp = '<canvas id="{CANVAS_ID}" style="hidden" width="{W}" height="{H}"></canvas>';
			temp = temp.split("{CANVAS_ID}").join(CANVAS_ID);
			temp = temp.split("{W}").join(param.width);
			temp = temp.split("{H}").join(param.height);
		view.html(temp);
		var canvas = document.getElementById(CANVAS_ID);
			setImage_2_CTX(canvas.getContext('2d') ,param)
		return canvas.toDataURL();
	}
	
	function setImage_2_CTX(_ctx,_param){
		treatParam(_param)
		setImage_2_CTX_rect(_ctx,_param);
		if(_param.width >= 50 && _param.height >= 20){
		setImage_2_CTX_text(_ctx,_param);
		} 
	}
	function setImage_2_CTX_rect(_ctx,_param){
		_ctx.clearRect(0,0,800,400);
		_ctx.beginPath();
		if(_param.color != "trans"){
			_ctx.fillStyle = _param.color;
			_ctx.fillRect(0, 0, _param.width, _param.height);
		}
	}
	function setImage_2_CTX_text(_ctx,_param){
		var w = _param.width;
		var h = _param.height;
		
		_ctx.textBaseline = "middle"
		_ctx.textAlign = "center"
		_ctx.fillStyle = getTextColor(_param.color);
		_ctx.font = _getFont(_param.font,_param.family,_param.style); 
		var s = w + " x " + h;
		if(_param.text != "") s = _param.text;
		var tarH = (h/2) 
		if(_param.text2 != ""){
			tarH -= (_param.font2 / 2)
		}
		_ctx.fillText(s, w /2, tarH );
		
		if(_param.text2 != ""){
			_ctx.font = _getFont(_param.font2,_param.family2,_param.style2); 
			var s = _param.text2;
				tarH += (_param.font / 2) + (_param.font / 4) + (_param.font2 / 4)
			_ctx.fillText(_param.text2, w /2, tarH);
		}
	}
	function _getFont(_f,_fa,_st){
		 var s1 = (_f != "") ?  _f : "10";
		 var s2 = (_fa != "") ?  _fa : "Verdana";
		 var s3 = (_st != "") ? _st : "";
		return s3 +" " + s1  + "px '"+s2+"'";
	}
	
	var textColorBK= 'rgba(0,0,0,0.6)';
	var textColorWH= 'rgba(255,255,255,0.8)';
	
	var textColorBK2= 'rgba(0,0,0,0.05)';
	var textColorWH2= 'rgba(255,255,255,0.15)';
	function getTextColor(colorCode,_bk,_wh){
		if(_bk == undefined ) _bk = textColorBK
		if(_wh == undefined ) _wh = textColorWH
		if(colorCode.length == 4){
			var s = "#"
			s += colorCode.charAt(1) + colorCode.charAt(1)
			s += colorCode.charAt(2) + colorCode.charAt(2)
			s += colorCode.charAt(3) + colorCode.charAt(3)
			colorCode = s;
		}
		
		if(colorCode.length != 7)return _bk;
		
		var rgb = { red: 0, green: 0, blue: 0 }; 
		rgb.red   = parseInt(colorCode.substring(1, 3), 16);
		rgb.green = parseInt(colorCode.substring(3, 5), 16);
		rgb.blue  = parseInt(colorCode.substring(5, 7), 16);
		var brightness = (rgb.red + rgb.green + rgb.blue ) / (3*255);
		return brightness >= 0.5 ? _bk:_wh;
	}
	return {
		init:init,
		param_2_text:param_2_text,
		text_2_param:text_2_param,
		isMock:isMock,
		isDummy:isDummy,
		getImage:getImage,
		setImage_2_CTX:setImage_2_CTX
	}
})();