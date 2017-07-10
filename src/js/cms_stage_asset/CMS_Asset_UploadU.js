
var CMS_Asset_UploadU = (function(){
	
	var maxW = 800;
	var maxH = 600;
	var isInited = false;
	function init(){
		if(isInited == false){
			if (window["UPLOAD_IMAGE_MAX_W"] ) {
				maxW = window["UPLOAD_IMAGE_MAX_W"];
			}
			if (window["UPLOAD_IMAGE_MAX_H"] ) {
				maxH = window["UPLOAD_IMAGE_MAX_H"];
			}
			isInited = true;
		}
	}
	var tempW;
	function getMaxW(){
		if(tempW) return tempW;
		return maxW;
	}
	var tempH;
	function getMaxH(){
		if(tempH) return tempH;
		return maxH;
	}
	
	/* ---------- ---------- ---------- */

	function isOverSize(_w,_h){
		init();
		var w = _w;
		var h = _h;
		if(w > h) {
			if(getMaxW() < w) return true;
		} else{
			if(getMaxH() < h) return true;
		}
		return false;
	}
	function getWH(_w,_h){
		init();
		var w = _w;
		var h = _h;
		var rate = _w / _h
		
		if(_w > getMaxW()){
			w = getMaxW();
			h = w / rate;
		}
		
		if(h > getMaxH()){
			h = getMaxH();
			w = h * rate;
		}
		return { 
			w : Math.round(w),
			h: Math.round(h)
		}
		/*
		function getMaxW(){ return 1000}
		function getMaxH(){ return 500}
		var f = getWH;
		deepEqual(f(1400,600),{w:1000,h:429})
		deepEqual(f(2000,1000),{w:1000,h:500})
		deepEqual(f(1200,1000),{w:600,h:500})
	
		deepEqual(f(700,1000),{w:350,h:500})
	
		deepEqual(f(1000,2000),{w:250,h:500})
		deepEqual(f(1000,500),{w:1000,h:500})
		deepEqual(f(100,50),{w:100,h:50})
		*/
	}
	
	/* ---------- ---------- ---------- */

	function resize(_raw,_callback,_rect){
		if(_rect){
			tempW = _rect.w;
			tempH = _rect.h;
		} else{
			tempW = null;
			tempH = null;
		}
		var reader = new FileReader();
			reader.onload = function(event) {
				var img = new Image();
					img.onload = function(){
						var wh_org = {w:img.width , h:img.height};
						var wh_re = getWH(img.width , img.height);
						if(isOverSize(img.width , img.height)){
							var cv = document.createElement( "canvas" );
								cv.width = wh_re.w;
								cv.height = wh_re.h;
								cv.getContext("2d").drawImage( img, 0, 0, wh_re.w, wh_re.h );
							var tt = (_raw.type.indexOf("png") != -1) ? "image/png" : "image/jpeg";
							var bin = atob(cv.toDataURL(tt).replace(/^.*,/, ''));
							var buffer = new Uint8Array(bin.length);
							for (var i = 0; i < bin.length; i++) {
								buffer[i] = bin.charCodeAt(i);
							}
							var o = {
								size: bin.length,
								type: _raw.type,
								lastModified:_raw.lastModified,
								lastModifiedDate:_raw.lastModifiedDate
							}
							_callback(wh_org,wh_re,new Blob( [buffer.buffer], o));
						} else{
							_callback(wh_org,wh_re);
						}
					};
					img.src = event.target.result;
			}
			reader.readAsDataURL(_raw);
	}
	
	function checkFileName(_s) {
		if(_s.match(/[^0-9a-zA-Z_.-]+/) != null ) return "半角英字数字にリネームしてください。";
		if(_s.charAt(0) == "." ) return ".(ドット)ではじまるファイルはアップできません";
		return "";
	}

	function checkUploadableFile(_s) {
		//.xleファイルの型が取得できんかったので、とりあえずスルー
		// if (_s == "") return false;
		return true;
	}
	return {
		resize: resize,
		getMaxW: getMaxW,
		getMaxH: getMaxH,
		isOverSize: isOverSize,
		checkFileName: checkFileName,
		checkUploadableFile: checkUploadableFile
	}
})();