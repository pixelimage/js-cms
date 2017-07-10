
var CMS_AssetFileU = (function(){
	function treadExtention(_s){
		var exs = [".jpg",".jpeg",".png",".gif",".bmp",".svg"];
		for (var i = 0; i < exs.length ; i++) {
			var ex = exs[i]
			var cc = ex.length;
			if(_s.substr(_s.length - cc , cc) == ex){
				return _s.substr(0 , _s.length - cc)
			}
		}
		return _s;
	}	

	function checkIsImage (_s) {
		var b = false;
		var ex = _s.toLowerCase();
		if (ex.indexOf(".png") != -1) b = true;
		if (ex.indexOf(".jpeg") != -1) b = true;
		if (ex.indexOf(".jpg") != -1) b = true;
		if (ex.indexOf(".gif") != -1) b = true;
		if (ex.indexOf(".svg") != -1) b = true;
		if (ex.indexOf(".bmp") != -1) b = true;
		return b;
	}
	
	var exs = {
		editable:["html","htm","text","txt","xml","json","js","css","php","rb","as","md"],
		html:["html","htm"],
		img:["gif","png","jpg","jpeg","bmp","svg"],
		text:["text","txt","xml","json","js","css","rb","as","md"],
		mov:["mp3","mp4","mov"],
		pdf:["pdf"]
	}
	function isExtention(_ex ,_type){
		var _a = exs[_type]
		for (var i = 0; i <  _a.length ; i++) {
			if(_ex.toLowerCase() == _a[i]) return true;
		}
		return false;
	}
	function isExtentionAll(_ex){
		for (var n in exs) {
			var _a = exs[n]
			for (var i = 0; i <  _a.length ; i++) {
				if(_ex.toLowerCase() == _a[i]) return true;
			}
		}
		return false;
	}
	function getExtention(_s){
		return URL_U.getExtention(_s);
	}
	function isHeavyImage(_n){
		if(_n > 10*1000)return true;
		return false;
	}

	/* ---------- ---------- ---------- */

	function getFileIcon(_ex){
		var icon = '<i class="fa fa-fw fa-file-o "></i>';
			if(isExtention(_ex ,"editable")) icon = '<i class="fa fa-fw fa-file-text-o"></i>';
			if(isExtention(_ex ,"html")) icon = '<i class="fa fa-fw fa-file-text"></i>';
			// if(isExtention(ex ,"text")) icon = '<i class="fa fa-fw fa-file-text-o "></i>';
			if(isExtention(_ex ,"img")) icon = '<i class="fa fa-fw fa-picture-o "></i>';
			if(isExtention(_ex ,"mov")) icon = '<i class="fa fa-fw fa-file-movie-o"></i>';
			if(isExtention(_ex ,"pdf")) icon = '<i class="fa fa-fw fa-file-pdf-o"></i> ';
		return icon;	
	}
	
	return {
		treadExtention: treadExtention,
		checkIsImage: checkIsImage,
		isExtention: isExtention,
		isExtentionAll: isExtentionAll,
		getExtention: getExtention,
		isHeavyImage:isHeavyImage,
		getFileIcon:getFileIcon
	}
})();
