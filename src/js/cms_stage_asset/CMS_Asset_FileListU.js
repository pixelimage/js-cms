
var CMS_Asset_FileListU = (function(){

	function getUpdateTime(_time){
		return "ファイルリスト更新時間：<br>"+ DateUtil.getFormattedDate(_time,"YYYY/MM/DD hh:mm:ss");
	}
	//
	function getImagePreviewTag(_size){
		var s = ""
		if(_size > (FILEMANAGER_PREVIEW_LIMIT_MB * 1000 * 1000)){
			s += '	<div class="_img _img_big _btn_file_img_hover"><i class="fa fa-2x fa-hand-o-up "></i><br>';
			s += FILEMANAGER_PREVIEW_LIMIT_MB;
			s += 'MB〜</div>';
		} else{
			s += '	<div class="_img"><img src="{SRC}" class="_cms_bg_trans"></div>';
		}
		return s
	}

	return {
		getUpdateTime: getUpdateTime,
		getImagePreviewTag: getImagePreviewTag
	}
})();



window.registAssetFloatView = function(_callback){
	var vs = [
		"#CMS_Asset_DirArea",
		"#CMS_Asset_FileListView",
		"#CMS_Asset_FileDetailView"
	]
	$(vs.join(",")).on("mousedown",function(){
		_callback();
	})
}