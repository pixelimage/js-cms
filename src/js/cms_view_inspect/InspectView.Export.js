
InspectView.Export	 = (function(){

	var view;
	var v = {};
	var _U
	
	/* ---------- ---------- ---------- */
	//ブロック公開
	
	function init(_view){
		_U = InspectView.Embed_U;
		view = $("<div>");
		var t_guide = '<i class="fa fa-level-down fa-rotate-180"></i> 書出したいファイル名を指定してください。既存ファイルを上書きしないように注意してください。'
		var tag = ""
			tag += '<div class="_view_active">';
			tag += '<div class="_notes">選択ブロックを、個別にファイルとして書出せます。RSSブロックの書出しなど。</div>'
			tag += '<div class="ss_guide _export _picture"></div>'
			tag += '<table class="_step" style="width:100%;">';
			tag += '	<tr class="">';
			tag += '		<td width="20"><div class="_stepNo">1</div></td>';
			tag += '		<td colspan="2">'
			tag += '			<div style="margin:0 0 4px 0;">書出しファイルパス</div>'
			tag += '			<input class="_path _in_data_path" value="" placeholder="./text.txt">'
			tag += '			<div class="_guideText" style="margin:5px 0 5px 0">'+t_guide+'</div>';
			tag += '			<div class="_btn_public_path"></div>';
			tag += '			<div class="_errorText_path"></div>';
			tag += '		</td>';
			tag += '	</tr>';
			tag += '	<tr class="_row_do">';
			tag += '		<td><div class="_stepNo" style="margin-top:5px;">2</div></td>';
			tag += '		<td>'
			tag += '			<div class=" _btn_pub _btn_public_block">書出す <i class="fa fa-angle-right "></i> <i class="fa fa-file-text fa-lg"></i></div>';
			tag += '		</td>'
			tag += '		<td>'
			tag += '			<div class=" _btn_pub _btn_public_clear">削除</div>';
			tag += '		<td>'
			tag += '		</td>';
			tag += '	</tr>';
			tag += '</table>';
			tag += '<br>';
			tag += CMS_GuideU.getGuideTag("inspect/export","書出について","dark");
			tag += '</div>';
			tag += '<div class="_view_negative">';
			tag += '<div class="_dont_use _notes">このブロックでは利用できません。</div>';
			tag += '</div>';
		view.html(tag);
		
		v.view_active = view.find("._view_active").hide();
		v.view_negative = view.find("._view_negative").hide();
		
		setBtn();
		return view;
	}
	function setBtn(){
		
		v.in_data_path = view.find('._in_data_path');
		v.btn_public_block = view.find('._btn_public_block');
		v.btn_public_clear = view.find('._btn_public_clear');
		v.btn_public_path = view.find('._btn_public_path');
		
		v.row_do = view.find('._row_do');
		
		v.errorText_path = view.find('._errorText_path').hide();
		
		v.in_data_path		.keyup(function(){ changeFilename($(this).val()); });
		v.btn_public_block	.click(function(){ publicBlock()});
		v.btn_public_clear	.click(function(){ unPublicBlock()});
		v.btn_public_path	.click(function(){ publicOpen()});
		v.guideText		 = view.find('._guideText');
		
		if(window["sc"] == undefined) window.sc = {}
		window.sc.inspect_export = function(){
			publicBlock_from_external()
		}
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	
	//ファイル名変更
	function changeFilename(_s){
		if (pubFile == _s) return;
		InspectView.setAttr_pubFileName(_s);
		pubFile = _s;
		update();
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	
	var param;
	var pubFile = "";
	
	function setData(_blockType,_file,_param){
		if(_blockType == "layout.colDiv") {
			v.view_active.hide()
			v.view_negative.show()
			return;
		}
		v.view_active.show()
		v.view_negative.hide()
		//
		//
		pubFile = _file;
		param = _param;
		v.in_data_path.val(pubFile);
		
		resetView();
		update_core();
	}
	
	function hasExportData(){
		if(pubFile) return true;
		return false
	}
	function resetView(){
		resetPublicBlock();
		if(tID) clearTimeout(tID);
	}
	
	/* ---------- ---------- ---------- */

	var tID;
	function update(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			update_core();
		},200);
	}
	
	function update_core(){
		var b = false;
		var error = _U.checkFilePath(pubFile);
		if(error == ""){
		 	_U.checkDirExist(pubFile,updatePath);
		} else{
			updatePath(pubFile,error);
		}
	}
	
	function updatePath(_path,_error){
		v.row_do.hide();
		if(_error){
			v.btn_public_path.hide();
			if(_error == "-1") _error = "";
			_error = CMS_E.getText(_error)
			if(_error){
				v.errorText_path.html(_error).show();
				v.guideText.hide()
			} else {
				v.errorText_path.hide();
				v.guideText.show()
			}
		} else{
			v.btn_public_path.html('<span class="_icon_dir_mini"></span>' + _path + ' ' + Dic.I.External).show();
			v.errorText_path.hide();
			v.row_do.show();
			v.guideText.hide()
		}
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	//書き出し
	
	var tID_write;
	function resetPublicBlock(){
		if(tID_write) clearTimeout(tID_write);
	}
	function publicBlock_from_external(){
		setTimeout(function(){
			publicBlock(true);
		},100);
	}
	function _getParam(url) {
		var dir = url.substring(0, url.lastIndexOf("/")+1);
		return { id:"", dir: "/" + dir };
	}
	function publicBlock(){
		if(window.isLocked(true))return;
		if(!hasExportData())return;
		CMS_ProccessView.stageIn();
		
		var tag = PageElement_HTMLService.getExportTag(param);
			tag = HTMLServiceU.setSiteRoot(tag,pubFile);
			tag = HTMLServiceU.getReplacedHTML(tag,_getParam(pubFile));//追加 20160901
			
		if(tID_write) clearTimeout(tID_write);
		tID_write = setTimeout(function(){
			Storage.Embed.writeFile(pubFile, tag, publicBlock_writed);
		},600);
	}
	function publicBlock_writed(_b){
		if(!_b){
			showWriteError();
			return;
		}
		CMS_ProccessView.stageOut();
		var s = '';
			s += '書き出しました。<br>'
			s += '<i class="fa fa-external-link-square "></i> '
			s += '<a href="'+CMS_Path.SITE.REL + pubFile+'" target="_blank">' + pubFile + '</a>';
		CMS_AlertView.stageIn("書出完了",s);
	}
	function showWriteError(){
		CMS_ProccessView.stageOut();
		CMS_AlertView.stageIn("エラー","書出し出来ませんでした。");
	}
	
	/* ---------- ---------- ---------- */
	//削除
	
	function unPublicBlock(){
		if(window.isLocked(true))return;
		Storage.Embed.deleteFile(pubFile, unPublicBlock_comp);
	}
	function unPublicBlock_comp(_b){
		if(!_b){
			showDeleteError();
			return;
		}
		var s = '';
			s += '削除しました。<br>'
		CMS_AlertView.stageIn("削除完了",s);
	}
	function showDeleteError(){
		CMS_AlertView.stageIn("エラー","削除は出来ませんでした。");
	}
	
	/* ---------- ---------- ---------- */

	//書き出したファイルを開く
	function publicOpen(){
		CMS_U.openURL_blank(CMS_Path.SITE.REL + pubFile);
	}
	
	return {
		init:init,
		setData:setData 
	}
})();

