
var CMS_Asset_UploaderState = (function(){
	
	var isInited = false
	function init(){
		if(isInited == false){
			setEvent();
		}
		isInited = true;
	}
	
	/* ---------- ---------- ---------- */
	
	var isChecked = false
	function checkServer(_callback){
		if(isChecked)return;
		isChecked = true;
		
		var url = CMS_Path.PHP_UPLOAD + "?action=check";
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'json',
			success			: function(data) { checkServer_comp(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		})
	}
	var maxSize = -1;
	function getMaxSize(){return maxSize}
	function getMaxSizeMB(){return maxMB}
	function getN(_s){
		var n = parseInt(_s.split("M").join(""));
		if(isNaN(n)) {
			return defMAX;
		} else{
			return n;
		}
	}
	var defMAX = 32;
	//var defMAX = 1;
	var maxMB = -1
	function checkServer_comp(json){
		var m1 = getN(json.post_max_size)
		var m2 = getN(json.upload_max_filesize)
		var m3 = getN(json.memory_limit)
		maxMB = Math.min(Math.min(defMAX,m1),Math.min(m2,m3));
		maxSize = maxMB * 1024*1024;
	}
	function checkFileSize(_s){
		if(_s < maxSize) return true;
		return false;
	}
	
	/* ---------- ---------- ---------- */
	
	function setEvent(){
		$(document).on('dragenter', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		$(document).on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
			if(currentDragStage){
				currentDragStage.css('border', '1px dashed #0B85A1');
			}
		});
		$(document).on('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
	}
	
	var currentDragStage
	
	function setCurrentDragStage(_d){
		currentDragStage = _d;
	}
	/* ---------- ---------- ---------- */
	
	return {
		init: init,
		checkServer: checkServer,
		getMaxSize: getMaxSize,
		getMaxSizeMB: getMaxSizeMB,
		checkFileSize: checkFileSize,
		setCurrentDragStage: setCurrentDragStage
	}})();