
var CMS_ImgBlockU = (function(){
	
	function attrInit(_arrt){
		if(_arrt ==undefined) _arrt = "";
		if(_arrt.indexOf('class="') == -1) _arrt += ' class=""'
		if(_arrt.indexOf('style="') == -1) _arrt += ' style=""'
		return _arrt;
	}
	function getCaption(_s){
		var s = ""
		if ( _s){
			s = '<div class="caption">' + _s + '</div>\n';
		}
		return s;
	}

	/* ---------- ---------- ---------- */
	//コンテナブロックのみで利用。dataには入れれないんので、extraに入れる
	
	function getBgStyle(_extra,_isPub){
		if(!_extra) _extra = {}
		if(!_extra.bg) _extra.bg = {};
		if(!_extra.bg.img) _extra.bg.img = "";
		if(!_extra.bg.color) _extra.bg.color = "";
		if(!_extra.bg.use) _extra.bg.use = false;
		if(_extra.bg.img && _extra.bg.use){
			var p = {
				path: _extra.bg.img,
				isPub: _isPub
			}
			return getBgStyleCore(p);
		}
		return "";
	}
	function getBgStyleCore(_param){
	    var defaults={ path:"", isPub:false }
	    var param = $.extend(defaults, _param);
		var imgPath = CMS_Path.MEDIA.getImagePath( param.path , param.isPub );
		var sts = []
			sts.push("background-image: url("+imgPath+");");
			sts.push("background-position: center center;");
			sts.push("background-size:cover;");
		return sts.join("");
	}

	/* ---------- ---------- ---------- */

	function getSimpleImageTag(_param){
		var image = _param.image;
		var isPub = _param.isPub;
		var width = _param.width;
		if(! image )return "";
		return CMS_ImgBlockU.getImageTag({
			path	: image.path,
			isPub	: isPub,
			width	: (width) ? "100%" : image.width ,
			ratio	: image.ratio
		});
	}
	
	/* ---------- ---------- ---------- */

	function getImageTag(_param){
	    var defaults={
	        attr:'',
			path:"",
			isPub:false,
			width:"",
			ratio:"",
			alt:""
	    }
	    var param = $.extend(defaults, _param);
	    var attr = param.attr;
	    	if(attr.indexOf('class="') == -1) attr += ' class=""'
	    	if(attr.indexOf('style="') == -1) attr += ' style=""'
	    	if(attr.indexOf('alt="') == -1)  attr += ' alt=""'
	    param.attr = attr;
	    
	    var tag =""
		if(typeof param.path == "string"){
			tag += _getImageTag2_simple(param);
		} else{
			tag += _getImageTag2_layout(param);
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	function _getImageTag2_simple(param){
	    if(param.alt){
	    	param.attr = param.attr.split('alt="').join('alt="' + param.alt);	
	    }
		if(DummyImageService.isMock(param.path)){
			if(param.isPub){
				param.attr = param.attr.split('class="').join('class="cms_mock_image ')
				param.attr += ' data-src="'+param.path+'"'
			}
		}
		if(param.ratio){
			if(! param.width) param.width = "100%";
		}
		if(param.width){
			param.attr = param.attr.split('style="').join('style="width:' + param.width + ';');
		}
		var tag = "";
		var imgPath = CMS_Path.MEDIA.getImagePath( param.path , param.isPub );
		
		if(param.ratio){
			//背景画像
			var isPubMock = false;
			if(param.isPub){
				if(DummyImageService.isMock(param.path)){
					imgPath = DummyImageService.getImage(param.path);
					isPubMock = true;
				}
			}
			if(isPubMock){
				param.attr = param.attr.split('style="').join('data-src="'+param.path+'" style="');
			} else {
				param.attr = param.attr.split('style="').join('style="background:url(' + imgPath + ') center center;background-size: cover;');
			}
			tag += '<div ' + param.attr + '>\n';
			tag += '	<div style="padding-top:'+ getRatio(param.ratio) + '%"></div>\n';
			tag += '</div>\n';
		} else {
			//IMGタグ
			tag += '<img src="' + imgPath + '" ' + param.attr + ' >';
		}
		return  tag;
	}
	
	var trans = '-ms-transform:translate(0,-50%);-webkit-transform:translate(0,-50%);transform:translate(0,-50%);'
	
	/* ---------- ---------- ---------- */

	function _getImageTag2_layout(param){
		param.path = ImageMapExport.treatParam(param.path);
		param.attr = param.attr.split('alt=""').join('');
	    
		var tag = "";
		if(param.path.list.length == 0){
			var rect = param.path.canvas;
			var cs = ""
				cs += "width:"+ ((rect.width) ? rect.width+'px': '300px') +';';
				cs += "height:"+ ((rect.height) ? rect.height+'px'  : '200') +';';
				cs += "background:"+ ((rect.background) ? rect.background : "")+';';
			tag += '<div style="border:solid 1px #eee;"><div style="'+cs+'">'
			tag += '</div></div>'
		} else{
			if(param.ratio){
		    	tag += '<div style="position:relative;overflow:hidden;width:'+param.width+'">\n';
				tag += '	<div style="padding-top:'+ getRatio(param.ratio) + '%"></div>\n';
				tag += '	<div style="position:absolute;top:50%;left:0;width:100%;height:100%;">\n';
				tag += '		<div style="'+trans+'">\n';
				tag += 			ImageMapExport.getHTML( param.path , param.width,param.isPub );
				tag += '		</div>\n';
				tag += '	</div>\n';
				tag += '</div>\n';
			} else{
				tag = ImageMapExport.getHTML( param.path , param.width,param.isPub );
			}
		}
		return  tag;
	}
	
	/* ---------- ---------- ---------- */

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
	function treat(_n) {
		return Math.round(_n * 100) / 100;
	}
	
	return { 
		attrInit : attrInit,
		getCaption : getCaption,
		getBgStyle : getBgStyle,
		getSimpleImageTag : getSimpleImageTag,
		getImageTag : getImageTag
	}
})();


