

InspectView.Embed	 = (function(){

	var view;
	var v = {};
	var _U
	
	/* ---------- ---------- ---------- */
	//ブロック公開
	
	function init(_view){
		_U = InspectView.Embed_U;
		view = $("<div>");
		
		var t_guide = '<i class="fa fa-level-down fa-rotate-180"></i> 既に存在するHTMLファイルパスを指定してください。文字コードはUTF-8のみです。'
		var tag = ""
			tag += '<div class="_view_active">';
			tag += '<div class="_notes">CMS管理外のHTML内に、選択ブロックを書出せます。</div>'
			tag += '<div class="ss_guide _embed _picture"></div>'
			tag += '<table class="_step" style="width:100%;">';
			//
			tag += '	<tr class="">';
			tag += '		<td width="20"><div class="_stepNo">1</div></td>';
			tag += '		<td colspan="2">'
			tag += '			<div style="margin:0 0 4px 0;">埋込み先HTMLファイルパス</div>'
			tag += '			<table>';
			tag += '			<tr>';
			tag += '				<td><input class="_path _in_data_path" value="" placeholder="../index.html"></td>'
			tag += '				<td nowrap><div class="_btn_file_ref"><span class="_icon_dir"></span><br>参照</div></td>';
			tag += '			</tr>';
			tag += '			</table>';
			tag += '			<div class="_guideText" style="margin:5px 0 5px 0">'+t_guide+'</div>';
			tag += '			<div class="_btn_public_path"></div>';
			tag += '			<div class="_errorText_path"></div>';
			tag += '		</td>';
			tag += '	</tr>';
			//
			tag += '	<tr class="_row_id">';
			tag += '		<td><div class="_stepNo">2</div></td>';
			tag += '		<td colspan="2">'
			tag += '			<input type="hidden" class="_in_data_ID" value="" placeholder="埋込みIDを入力">';
			tag += '			<div class="_btn_embed_code">埋込コードの配置</div>';
			tag += '			<div style="margin:5px 0;">';
			tag += '				ID：<span class="_embedcode"></span> ( ';
			tag += '					<span class="_embedLink _preview_embed">取得</span>,';
			tag += '					<span class="_embedLink _change_embed">変更</span>';
			tag += '				)';
			tag += '			</div>';
			tag += '		</td>';
			tag += '	</tr>';
			//
			tag += '	<tr class="_row_do">';
			tag += '		<td><div class="_stepNo" style="margin-top:5px;">3</div></td>';
			tag += '		<td>'
			tag += '			<div class=" _btn_pub _btn_public_block">埋込む <i class="fa fa-sign-in fa-lg"></i></div>';
			tag += '		</td>'
			tag += '		<td>'
			tag += '			<div class=" _btn_pub _btn_public_clear">クリア</div>';
			tag += '		<td>'
			tag += '		</td>';
			tag += '	</tr>';
			tag += '</table>';
			tag += '<br>';
			tag += CMS_GuideU.getGuideTag("inspect/embed","埋込みについて","dark");
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
		
		v.in_data_path	 	= view.find('._in_data_path');
		v.in_data_ID	 	= view.find('._in_data_ID');
		v.btn_public_block 	= view.find('._btn_public_block');
		v.btn_public_clear 	= view.find('._btn_public_clear');
		v.btn_public_path 	= view.find('._btn_public_path');
		v.btn_file_ref 		= view.find('._btn_file_ref');
		v.btn_embed_code 	= view.find('._btn_embed_code');
		v.embedcode 		= view.find('._embedcode');
		v.guideText		 	= view.find('._guideText');
		
		v.row_id = view.find('._row_id');
		v.row_do = view.find('._row_do');
		
		v.errorText_path = view.find('._errorText_path').hide();
		// v.error_id		 = view.find('._error_id').hide();
		// v.error_id.click(function(){$(this).hide()})
		
		v.change_embed = view.find('._change_embed');
	 	v.change_embed.click(function() { 
 			var def = v.in_data_ID.val();
 			var s = prompt("埋込IDを入力してください",v.in_data_ID.val());
 			if(!s)return;
 			if(def == s)return;
 			v.in_data_ID.val(s).keyup();
	 	});
		
		v.preview_embed = view.find('._preview_embed');
	 	v.preview_embed.click(function() { 
 			prompt("IDをコピーし、埋込み先HTMLファイルにペーストしてください",getEmbedTag(true));
	 	});
		
		v.in_data_path		.keyup(function(){ changeFilename($(this).val()); });
		v.in_data_ID		.keyup(function(){ changeID($(this).val()); });
		v.btn_public_block	.click(function(){ publicBlock(true)});
		v.btn_public_clear	.click(function(){ publicBlock(false)});
		v.btn_public_path	.click(function(){ publicOpen()});
		//***
		v.btn_file_ref	.click(function(){ 
			var s = v.in_data_path.val();
			CMS_MainController.openAssetSelectRel("link", s ,function(_val){
				UpdateDelay.delay(function(){
					v.in_data_path.val(_val).keyup();
				});
			});
		});
		v.btn_embed_code	.click(function(){ 
			var s = v.in_data_path.val();
			var param = URL_U.getPageObject( CMS_Path.SITE.REL + s);
				param.extra = {
					addText :{
						label:'カーソルを移動して埋め込んでください',
						data:getEmbedTag(true)
					}
				}
			CMS_MainController.openAssetFile(param);
		});
		
		if(window["sc"] == undefined) window.sc = {}
		window.sc.inspect_embed = function(){
			publicBlock_from_external();
		}
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	
	//ファイル名変更
	function changeFilename(_s){
		if (pubFile == _s) return;
		InspectView.setAttr_embedName(_s);
		pubFile = _s;
		update();
	}
	var prevPubID = ""
	function changeID(_s){
		if (pubID == _s) return;
		InspectView.setAttr_embedID(_s);
		pubID = _s;
		v.embedcode.html(_s);
		update();
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	
	var param;
	var pubFile = "";
	var pubID = "";
	
	function setData(_blockType,_file,_id,_param){
		if(_blockType == "layout.colDiv") {
			v.view_active.hide()
			v.view_negative.show()
			return;
		}
		v.view_active.show()
		v.view_negative.hide()
		//
		pubFile = _file;
		pubID = _id;
		param = _param;
		v.in_data_path.val(pubFile);
		v.in_data_ID.val(pubID);
		v.embedcode.html(pubID);
		
		resetView();
		update_core();
	}
	function hasExportData(){
		if(pubFile && pubID) return true;
		return false
	}
	
	function resetView(){
		resetPublicBlock();
		if(tID) clearTimeout(tID);
		if(e_tID2) clearTimeout(e_tID2);
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
		var error = _U.checkFilePath(pubFile,{isHTML:true});
		if(error == ""){
		 	_U.checkFileExist(pubFile,updatePath);
		} else{
			updatePath(pubFile,error);
		}
	}
	
	function updatePath(_path,_error){
		v.row_id.hide();
		v.row_do.hide();
		if(_error){
			v.btn_public_path.hide();
			if(_error == "-1") _error = "";
			_error = CMS_E.getText(_error)
			if(_error == ""){
				v.errorText_path.hide();
				v.guideText.show()
			} else{
				v.errorText_path.html(_error).show();
				v.guideText.hide()
			}
		} else{
			if(hasExportData()){
				v.row_id.show();
				v.row_do.show();
			} else{
				v.row_id.show();
				if(! pubID){
					v.in_data_ID.val("block").keyup();
				}
			}
			v.btn_public_path.html('<span class="_icon_dir_mini"></span>' + _path + ' ' + Dic.I.External).show();
			v.errorText_path.hide();
			v.guideText.hide()
		}
		// v.preview_embed.html(getEmbedTag());
	}
	function getEmbedTag(_b){
		return _U.getEmbedTag(pubID,_b);
	}
	
	/* ! ---------- ---------- ---------- ---------- ---------- */
	
	//書き出し
	var tID_write;
	function resetPublicBlock(){
		if(tID_write) clearTimeout(tID_write);
	}
	var isEmbed = false;
	function publicBlock_from_external(){
		setTimeout(function(){
			publicBlock(true);
		},100);
	}
	function publicBlock(_b){
		if(window.isLocked(true))return;
		if(!hasExportData())return;
		isEmbed = _b;
		CMS_ProccessView.stageIn();
		if(tID_write) clearTimeout(tID_write);
		tID_write = setTimeout(function(){
			Storage.Embed.loadFile(pubFile, publicBlock_loaded);
		},600);
	}
	
	function _getParam(url) {
		var dir = url.substring(0, url.lastIndexOf("/")+1);
		return { id:"", dir: "/" + dir };
	}

	function publicBlock_loaded(_b,data){
		if(!_b) {
			showWriteError();
			return;
		}
		
		var tag = PageElement_HTMLService.getExportTag(param);
			tag = HTMLServiceU.setSiteRoot(tag , pubFile);
			tag = HTMLServiceU.getReplacedHTML(tag,_getParam(pubFile));//追加 20160901
		
		if(!isEmbed) tag = "";
		var out = _U.replaceEmbedText(data, pubID, tag);
		if(out == false) {
			showError_id();
			return;
		}
		Storage.Embed.writeFile(pubFile, out, publicBlock_writed);
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
	
	var e_tID2;
	function showError_id(){
		if(e_tID2) clearTimeout(e_tID2);
		CMS_ProccessView.stageOut();
		var s = '<span class="_small">埋込み先に埋込みタグが存在しません。<br>';
			s += '<em>' +pubFile+'</em>へ、以下のタグを埋め込んでください。<br>';
			s += '<em>' + getEmbedTag() + '</em></span>';
		CMS_AlertView.stageIn("エラー", s );
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



