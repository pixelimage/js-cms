
var FileU = (function() {

	function formatFilesize(_s) {
		var s = "";
		var nn =1000
		var sizeKB = _s / nn;
		if (parseInt(sizeKB) > nn) {
			var sizeMB = sizeKB / nn;
			s = "<b>" + sizeMB.toFixed(1) + " MB</b>" ;
		} else {
			s = sizeKB.toFixed(1) + " KB";
		}
		return s;
	}
	
	function getFileName(_s){
		if(_s.indexOf(".") == -1)return _s;
		var ss = _s.split(".")
			ss.pop()
		return ss.join(".")
	}
	function getExtention(_s){
		if(_s == null) return "";
		var ss = _s.split(".");
		if(ss.length == 1)return "";
		var ex = ss[ss.length-1];
		return ex.toLowerCase();
	}

	function isImageFile(_s){
		var ex = getExtention(_s.toLowerCase());
		if(ex == "gif") return true;
		if(ex == "jpg") return true;
		if(ex == "jpeg") return true;
		if(ex == "png") return true;
		if(ex == "svg") return true;
		return false;
	}
	//
	function isEditableFile(_s){
		var ex = getExtention(_s.toLowerCase());
		if(ex == "html") return true;
		if(ex == "htm") return true;
		if(ex == "js") return true;
		if(ex == "json") return true;
		if(ex == "css") return true;
		if(ex == "txt") return true;
		if(ex == "md") return true;
		if(ex == "php") return true;
		
		if(ex == "shtml") return true;
		if(ex == "xhtml") return true;
		if(ex == "xml") return true;
		if(ex == "rss") return true;
		
		if(ex == "pl") return true;
		if(ex == "asp") return true;
		if(ex == "cgi") return true;
		if(ex == "log") return true;
		return false;
	}
	function isPreviewableFile(_s){
		var ex = getExtention(_s.toLowerCase());
		if(ex == "html") return true;
		if(ex == "htm") return true;
		if(ex == "pdf") return true;
		if(ex == "txt") return true;
		if(ex == "js") return true;
		if(ex == "css") return true;
		return false;
	}
	return {
		formatFilesize: formatFilesize,
		getFileName:getFileName,
		getExtention:getExtention,
		isImageFile:isImageFile,
		isEditableFile:isEditableFile,
		isPreviewableFile:isPreviewableFile
	}
})();
