
var ImageMapExport = (function(){
	
	var isRect 			= ImageMapCode.isRect;
	var isLine 			= ImageMapCode.isLine;
	var isImage 		= ImageMapCode.isImage;
	var isSVG 			= ImageMapCode.isSVG;
	var isText 			= ImageMapCode.isText;
	var isLink 			= ImageMapCode.isLink;
	var isHTML 			= ImageMapCode.isHTML;

	/* ---------- ---------- ---------- */
	//プレビュー用タグ取得
	
	function getItemTag(type,_view,__){
		if(isRect(type)){
			var bg = "";
			if(__.data.color){
				bg = __.data.color;
			}
			var bd = "";
			if(__.data.border_size){
				bd = __.data.border_size + ' solid ' + __.data.border_color;
			}
			var rad = ""
			if(__.data.round){
				rad = __.data.round;
			}
			_view.css({
				"position":"absolute",
				"top":"0",
				"left":"0",
				"right":"0",
				"bottom":"0",
				"border":bd,
				"overflow":"hidden",
				"border-radius":rad,
				"background":bg
			});
		}
		if(isLine(type)){
			var svg = getLineSVG({
				W:__.rect.width,
				H:__.rect.height,
				arrowW:(__.data.arrow_w) ? Number(__.data.arrow_w) : 10,
				arrowL:(__.data.arrow_l) ? Number(__.data.arrow_l) : 0,
				arrowR:(__.data.arrow_r) ? Number(__.data.arrow_r) : 0
			});
			_view.html(svg);
			_view.find("svg").css({
				"fill":__.data.color
			});
		}
		
		if(isImage(type)){
			var rad = ""
			if(__.data.round){
				rad = __.data.round;
			}
			var img_st = (__.data.fix == "1") ? "" :"width:100%;";
			_view.empty();
			_view.css({
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%",
				"overflow":"hidden"
			});
			var imgPath = CMS_Path.MEDIA.getImagePath( __.data.src , false );
			var ratio = ImageMapU.getRatio(__.data.ratio);
			if(isNaN(ratio)){
				_view.css({
					"overflow":"hidden",
					"border-radius":rad
				});
				if(! DummyImageService.isMock(__.data.src)){
					imgPath += "?"+ DateUtil.getRandamCharas(5)
				}
				_view.append($('<img src="'+ imgPath + '" style="'+img_st+'">'));//***
			} else {
				_view.append('<div style="width:100%;padding-top:'+ratio+'%;border:solid 1px #888;"></div>');
				_view.css({
					"background":"url(" + imgPath + ") center center no-repeat",
					"background-size":"cover",
					"overflow":"hidden",
					"border-radius":rad
				});
			}
		}
		
		if(isSVG(type)){
			_view.html(__.data.svg);
			_view.find("svg").css({
				"fill":__.data.color
			});
		}
		if(isText(type)){
			var tag = ""
			if(__.data.bmp){
				tag = '<img src="' + ImageMapBMPText.getImage(__) + '" style="width:100%">';
			} else{
				tag = '<p style="{STYLE}">{TEXT}</p>';
				var s = __.data.text;
					s = s.split("\n").join("<br>");
				tag = tag.split("{TEXT}").join(s);
				tag = tag.split("{STYLE}").join(getFontStyle(__.data));
			}
			_view.html(tag);
		}
		
		if(isLink(type)){
			// _view.html(__.data.link);
		}
		
		if(isHTML(type)){
			if(__.data.preview){
				_view.html(__.data.html);
			} else{
				_view.html(CMS_TagU.tag_2_t(__.data.html));
			}
			_view.css({
				"position":"absolute",
				"top":"0",
				"left":"0",
				"right":"0",
				"bottom":"0"
			});
		}
		// _view.css(_getRotCss(__.rect.rotate));
		_view.css(_getOpaCss(__.rect.opacity));
		_view.attr("class" , _view.data("defclass") +" " + __.rect.class);
	}
	
	/* ---------- ---------- ---------- */
	//HTML
	
	function treatParam(_data){
		if(_data == undefined) _data = {}
		if(_data.canvas == undefined) _data.canvas = {}
		if(_data.canvas.width == undefined) _data.canvas.width = 300;
		if(_data.canvas.height == undefined) _data.canvas.height = 200;
		if(_data.canvas.background == undefined) _data.canvas.background = "";
		if(_data.canvas.color == undefined) _data.canvas.color = "";
		if(_data.canvas.dark == undefined) _data.canvas.dark = false;
		if(_data.canvas.grid == undefined) _data.canvas.grid = 0;
		if(_data.list == undefined) _data.list = [];
		return _data;
	}
	    
	var svgColor = ""
	function getHTML(_data,_w,_isPub){
		_data = treatParam (_data);
		/* ---------- ---------- ---------- */
		var wapCSSs = "";
		if(!_w){
			wapCSSs += "display:inline-block;";
		}
			wapCSSs += "position:relative;overflow:hidden;vertical-align:bottom;"//width:" + w + ";"
		if(_data.canvas.background){
 			wapCSSs += "background:"+ _data.canvas.background+";"
 		}
		if(_data.canvas.color){
 			wapCSSs += "color:"+ _data.canvas.color+";"
 			svgColor = _data.canvas.color;
 		} else{
 			svgColor = ""
 		}
 		
		/* ---------- ---------- ---------- */
		
 		var dummnyCSS = "display:block;"
		if(_w){
			wapCSSs += "width:" + _w + ";";
			dummnyCSS += "width:100%;";
		}
		if(!_isPub){
			wapCSSs += "outline:dashed 1px rgba(74, 102, 160, 0.6);box-shadow:0px 0px 5px rgba(0,0,0,0.2);";
		}
		
		/* ---------- ---------- ---------- */
		var dummy = DummyImageService.getImage("width:"+_data.canvas.width+",height:1,color:trans")

		/* ---------- ---------- ---------- */
		var ratio = ImageMapU.getRatio(_data.canvas.width+":"+_data.canvas.height);

		/* ---------- ---------- ---------- */
		var tag = "";
		for (var i = 0; i < _data.list.length ; i++) {
			if(! _data.list[i].hide){
				tag += getHTML_item( _data.list[i] , i,_isPub);
			}
		}
		var html = ""
			html += '<div class="cms-img-layout" style="' + wapCSSs + '">\n';
			html += '	<img src="'+dummy+'" class="cms-img-width" style="'+dummnyCSS+'">\n';
			html += '	<div class="cms-img-height" style="margin-top:-1px;padding-top:'+ ratio +'%"></div>\n';
			html += tag;
			html += '</div>\n';
		return html;
	}
	
	function getHTML_item(_data,_no,_isPub){
		var baseSel = ImageMap.State.ID;
		var type = _data.type;
		var cls = "_" + type.split(".").join("-");
		
		var tag = '	<{TAG} {ATTR} style="{STYLE}">{MAIN}</{TAG}>\n';
		
		var style = "";
			style = 'position:absolute;top:{Y};left:{X};width:{W};height:{H};{STYLE_ONE}{STYLE_COM}';
			style = style.split("{X}").join(ImageMapU.treat(_data.rect.left) + "%");
			style = style.split("{Y}").join(ImageMapU.treat(_data.rect.top) + "%");
			style = style.split("{W}").join(ImageMapU.treat(_data.rect.width) + "%");
			style = style.split("{H}").join(ImageMapU.treat(_data.rect.height) + "%");
	
		/* ---------- ---------- ---------- */
		
		if(isRect(type)){
			var bg = "";
			var bd = "";
			if(_data.data.color){ bg = "background:" + _data.data.color + ";"; }
			if(_data.data.border_size){ bd = "border:" + _data.data.border_size + ' solid ' + _data.data.border_color + ";"; }
			var rad = "";
			if(_data.data.round){ 
				rad += "-webkit-border-radius:"+_data.data.round +";";
				rad += "border-radius:"+_data.data.round +";";
			}
			style = style.split("{STYLE_ONE}").join( bg + bd + rad );
		} 
		
		if(isLine(type)){
			var svg = getLineSVG({
				W:_data.pixel.width,
				H:_data.pixel.height,
				col:_data.data.color,
				arrowW:(_data.data.arrow_w) ? Number(_data.data.arrow_w) : 10,
				arrowL:(_data.data.arrow_l) ? Number(_data.data.arrow_l) : 0,
				arrowR:(_data.data.arrow_r) ? Number(_data.data.arrow_r) : 0
			});
			tag = tag.split("{MAIN}").join(svg);
			/*
			var svgAttr = ""
			_col = ""
			if(svgColor) _col = svgColor;
			if(_data.data.color) _col = _data.data.color;
			if(_col){
				svgAttr += 'fill:' + _col + ';';
			}
			*/
		}
		
		/* ---------- ---------- ---------- */
		
		if(isImage(type)){
			var ratio = ImageMapU.getRatio(_data.data.ratio);
			var img_st = (_data.data.fix == "1") ? "" :"width:100%;";
			var _main = "";
			var _st = "";
			var src = _data.data.src;
			
			if(_isPub && DummyImageService.isMock(src)){
				_main += '<img src="" class="cms_mock_image" data-src="'+src+'" style="'+img_st+'">'
			} else{
				var imgPath = CMS_Path.MEDIA.getImagePath( src , _isPub );
				if(_data.date){
					if(! DummyImageService.isMock(src)){
						imgPath += "?"+_data.date;
					}
				}
				if(isNaN(ratio)){
					_main += '<img src="' + imgPath + '" style="'+img_st+'">';//***
				} else{
					_main += '<div style="width:100%;padding-top:'+ratio+'%"></div>';
					_st = "background:url("+imgPath+") center center no-repeat;background-size:cover;";
				}
			}
			
			var rad = "";
			if(_data.data.round){ 
				rad += "-webkit-border-radius:"+_data.data.round +";";
				rad += "border-radius:"+_data.data.round +";overflow:hidden;";
			}
			tag = tag.split("{MAIN}").join(_main);
			style = style.split("{STYLE_ONE}").join( _st + rad );
		}
		
		/* ---------- ---------- ---------- */
		
		if(isSVG(type)){
			var svg = _data.data.svg;
			// var svgAttr = "position:absolute;top:0;left:0;right:0;bottom:0;"
			var svgAttr = "position:absolute;top:0;left:0;width:100%;height:100%;"
			_col = ""
			if(svgColor) _col = svgColor;
			if(_data.data.color) _col = _data.data.color;
			if(_col){
				svgAttr += 'fill:' + _col + ';';
			}
			svg = svg.split('<svg').join('<svg style="' + svgAttr + '" ');
			svg = svg.split('	').join(' ');
			svg = svg.split('\n').join('');
			//
			tag = tag.split("{MAIN}").join(svg);
		}
		
		/* ---------- ---------- ---------- */
		
		if(isText(type)){
			if(_data.data.bmp){
				var _b64 = "";
				if(_data.data.bmpData){
					_b64 = _data.data.bmpData;
				} else{
					_b64 = ImageMapBMPText.getImage(_data);
				}
				var alt = _data.data.text;
					alt = alt.split("\n").join(" ");
				var ss = '<img src="' + _b64 + '"  alt="'+alt+'" style="width:100%">';
				tag = tag.split("{MAIN}").join(ss);
			} else{
				var s = _data.data.text;
					s = s.split("\n").join("<br>");
				tag = tag.split("{MAIN}").join(s);
				style = style.split("{STYLE_ONE}").join(getFontStyle(_data.data));
			}
		}
		
		/* ---------- ---------- ---------- */
		
		if (isLink(type)) {
			if(!_isPub){
			style = style.split("{STYLE_ONE}").join("background:rgba(0,0,255,0.05);");
			}
		}
		
		/* ---------- ---------- ---------- */
		
		if(isHTML(type)){
			tag = tag.split("{MAIN}").join(_data.data.html);
		}
		
		/* ---------- ---------- ---------- */
		/* ---------- ---------- ---------- */
		/* ---------- ---------- ---------- */
		//最後
		
		style = style.split("{STYLE_ONE}").join("");
		tag = tag.split("{MAIN}").join("");
		
		//共通変形
		var sts = [
			_getRotCssText(_data.rect.rotate),
			_getOpaCssText(_data.rect.opacity)
		]
		style = style.split("{STYLE_COM}").join(sts.join(""));
	
		/* ---------- ---------- ---------- */
		//リンク設定
		
		var hasLink = (function(_link){ 
			if(!_link)return;
			if(_link.href) return true;
			return false;
		})(_data.rect.link);
		
		var tagName = 'div';
		var class_ = (_data.rect.class) ? " " + _data.rect.class : "";
		var attr_ = (_data.rect.attr) ? " " + _data.rect.attr : "";
		var extraStyle = (_data.rect.style) ? " " + _data.rect.style : "";
		
		var attr = '';
		if(hasLink){
			tagName = 'a';
			attr = ' href="{URL}" target="{TARGET}" ';
			attr = attr.split("{URL}").join( CMS_Path.MEDIA.getAnchorPath(_data.rect.link.href,_isPub) );
			attr = attr.split("{TARGET}").join( defaultVal(_data.rect.link.target));
			if(_data.rect.attr){
				attr += " " + _data.rect.attr;
			}
		}
		if(class_){
			attr += ' class="' + class_ + '"';
		}
		if(attr_){
			attr += attr_;
		}
		if(_data.data){
			if(_data.data.meta){
				attr += ' data-meta="' + _data.data.meta + '"';
			}
		}
		
		tag = tag.split("{TAG}").join(tagName);
		tag = tag.split("{ATTR}").join(attr);
		tag = tag.split("{STYLE}").join(style +" "+ extraStyle);
		tag = tag.split("   ").join(" ");
		tag = tag.split("  ").join(" ");
		return tag;
	}

	/* ---------- ---------- ---------- */
	
	function getFontStyle(__){
		var _s = '{COLOR}{SIZE}{ALIGN}{LINE}{FONT}{BOLD}{SDW}';
			_s = _s.split("{SIZE}")		.join(__.size ? ("font-size:"+__.size +';') : "");
			_s = _s.split("{COLOR}")	.join(__.color ? ("color:"+__.color +';') : "");
			_s = _s.split("{ALIGN}")	.join(__.align ? ("text-align:"+__.align +';') : "");
			_s = _s.split("{LINE}")		.join(__.line ? ("line-height:"+__.line +';') : "");
			_s = _s.split("{FONT}")		.join(__.font ? ("font-family:"+__.font +";") : "");
			_s = _s.split("{BOLD}")		.join(__.bold ? ("font-weight:"+__.bold +';') : "");
			_s = _s.split("{SDW}")		.join(__.sdw ? ("text-shadow:0 0 "+__.sdw+"px rgba(0,0,0,0.5);") : "");
		return _s
	}
	
	/* ---------- ---------- ---------- */


	function _getRotCss(_rot){
		var css = {}
		if(Number(_rot) == 0){
			css = {
				"-webkit-transform":"",
				"transform":""
			}
		} else{
			css = {
				"-webkit-transform":"rotate("+_rot+"deg)",
				"-ms-transform":"rotate("+_rot+"deg)",
				"transform":"rotate("+_rot+"deg)"
			}
		}
		return css;
	}
	function _getRotCssText(_rot){
		var s = ""
		if(Number(_rot)){
			s += '-webkit-transform:rotate('+_rot+'deg);'
			s += '-ms-transform:rotate('+_rot+'deg);'
			s += 'transform:rotate('+_rot+'deg);'
		}
		return s;
	}
	
	function _getOpaCss(_opa){
		var css = {}
		if(Number(_opa) == 1){
			css = { "opacity":"" }
		} else{
			css = { "opacity":Number(_opa) }
		}
		return css;
	}
	function _getOpaCssText(_opa){
		var s = "";
		if(Number(_opa)){
			if(Number(_opa) == 1){
				//	
			}else{
				s += 'opacity:'+Number(_opa)+';'
			}
		}	
		return s;
	}

	function getLineSVG(_param){
		var W = ImageMapU.treat(_param.W);
		var H = ImageMapU.treat(_param.H);
		var w = ImageMapU.treat(_param.arrowW);
		var attr = "position:absolute;top:0;left:0;width:100%;height:100%;";
		if(_param.col) attr += "fill:" + _param.col + ';'
		var svg = "";
		svg += '<svg style="'+attr+'" width="100%" height="100%" viewBox=" 0 0 {W} {H}" >';
		var L = _param.arrowL;
		var R = _param.arrowR;
		var h = _param.arrowW;
		var WmR = ImageMapU.treat(W-R);
		var cent = ImageMapU.treat(H/2);
		var cent2 = ImageMapU.treat(cent*2);
		if(_param.arrowR){
			svg += [
				'<path d="',
				" M " + (WmR-1) + " " + 0,
				" L " + (W) + " " + (cent),
				" L " + (WmR-1) + " " + (cent2),
				" L " + (WmR-1) + " " + 0,
				" Z ",
				'" />'
			].join("");
		}
		if(_param.arrowL){
			svg += [
				'<path d="',
				" M " + (L+1) + " " + 0,
				" L " + 0 + " " + (cent),
				" L " + (L+1) + " " + (cent2),
				" L " + (L+1) + " " + 0,
				" Z ",
				'" />'
			].join("");
		}
		var y = ImageMapU.treat(cent - (h/2));
		svg += [
			'<path d="',
			" M " + L + " " + y,
			" L " + L + " " + (y+h),
			" L " + (WmR) + " " + (y+h),
			" L " + (WmR) + " " + y,
			" L " + L + " " + y,
			" Z ",
			'" />'
		].join("");
		
		svg += '</svg>'
		svg = svg.split("{W}").join(W);
		svg = svg.split("{H}").join(H);
		
		return svg;
	}

	return {
		getItemTag:getItemTag,
		getHTML:getHTML,
		getHTML_item:getHTML_item,
		treatParam:treatParam
	}
})();

