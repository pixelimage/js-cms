
EditableView.PageViewState = (function(){
	
	//プリセットビューのときは、OFFにして、記録しないように
	var isOn = true;
	function setOn() {
		isOn = true;
		if(currentPage)currentPage.stageIn();
	}

	function setOff() {
		isOn = false;
		if(currentPage)currentPage.stageOut();
	}
	
	//
	var currentPage;
	function setCurretPage (_page){
		if(isOn){
			currentPage = _page;
		}
	}
	//EditableView.PageViewState.getCurretPage();
	function getCurretPage (){
		return currentPage;
	}
	function setCurretSelect(_node){
		if(isOn){
			currentPage.setCurrentSelect(_node);
		}
	}
	
	return {
		setOn: setOn,
		setOff: setOff,
		setCurretPage: setCurretPage,
		getCurretPage: getCurretPage,
		setCurretSelect: setCurretSelect
	}
})();


EditableView.PageView_U = (function(){
	
	/* ---------- ---------- ---------- */

	function getMainView(_o){
		var tag = "";
			if(_o.type == Dic.PageType.PAGE){
				tag += '<div class="_cms_page">';
				tag += '	<div class="_page_header">';
				tag += '		<div class="_row1">{ROW1}</div>';
				tag += '		<div class="_row2">{MENUS}</div>';
				tag += '		{ZOOM_BTNS}';
				tag += '		{PUB_BTNS}';
				tag += '		{ICON_BTNS}';
				tag += '	</div>';
				tag += '	<div class="_page_inner">';
				tag += '		<div class="_page_inner_zoom _mainArea-scroll">';
				tag += '			<div class="_page_body _replaceRootArea __cms_edit_area__ {PAGE_CLASS}" id="{PAGE_ID}"></div>';
				tag += '			<div class="_page_footer">';
				tag += '				{WIDE}';
				tag += '				{FOOTER}';
				tag += '				{EDIT_CSS_CLASS}';
				tag += '			</div>';
				tag += '		</div>';
				tag += '	</div>';
				tag += '</div>';
			} else if(_o.type == Dic.PageType.CMS_MYTAG){
				tag += '<div class="_cms_page _cms_page_setting">';
				tag += '	<div class="_page_header">';
				tag += '		<div class="_row1">{ROW1}</div>';
				tag += '		<div class="_row2">{MENUS}</div>';
				tag += '		{ZOOM_BTNS}';
				tag += '		{ICON_BTNS}';
				tag += '		{PUB_BTNS_SETTTING}';
				tag += '	</div>';
				tag += '	<div class="_page_inner">';
				tag += '		<div class="_page_inner_zoom _mainArea-scroll">';
				tag += '			<div class="_page_body _replaceRootArea"></div>';
				tag += '			<div class="_page_footer">';
				tag += '				{WIDE}';
				tag += '			</div>';
				tag += '		</div>';
				tag += '	</div>';
				tag += '</div>';
			} else if(_o.type == Dic.PageType.PRESET){
				tag += '<div class="_cms_page">';
				tag += '	<div class="_page_header">';
				tag += '		<div class="_row1">{ROW1}</div>';
				tag += '		{ZOOM_BTNS}';
				tag += '		{ICON_BTNS}';
				tag += '		{PUB_BTNS_PRESET}';
				tag += '	</div>';
				tag += '	<div class="_page_inner">';
				tag += '		<div class="_page_inner_zoom _mainArea-scroll">';
				tag += '			<div class="_page_body _replaceRootArea"></div>';
				// tag += '			<div class="_page_footer">';
				// tag += '				{WIDE}';
				// tag += '			</div>';
				tag += '		</div>';
				tag += '	</div>';
				tag += '</div>';
			}

		var row1 = '';
		if(_o.type == Dic.PageType.CMS_MYTAG){
			row1 += '<span class="_page_title">{{Myタグ設定}} <span class="_rep">' + _o.name + '</span></span>'
		} else {
			row1 += '<span class="_page_title">' + CMS_U.roundText(_o.name,20) + '</span>';
		}
		
		var memus = '';
		if(_o.type == Dic.PageType.CMS_MYTAG){
			//
		} else {
			memus += ' <span class="_filePath _cms_btn_alpha">' + CMS_Path.PAGE.getAbsPath_deco(_o.id, _o.dir) + '</span>';
			memus += '<div class="_page_state"></div>';
			memus += '<div class="_page_menus">';
			memus += '	<div class="_item _float_item _btn_template_edit">';
			memus += '		<div><i class="fa fa-pencil "></i> 編集</div>';
			memus += '		<div class="_float_fuki">';
			memus += '			<div class="_fuki_title">テンプレ編集</div>';
			memus += '			<div class="_fuki_read">このページで使用されているテンプレHTMLを編集します。</div>';
			memus += '		</div>';
			memus += '	</div>';
			memus += '</div>';
			memus += '<div class="_page_menus_left _cms_wide">';
			memus += '	<div class="_item _float_item _btn_import">';
			memus += '		<div>JSON編集</div>';
			memus += '		<div class="_float_fuki">';
			memus += '			<div class="_fuki_title">JSON直接編集</div>';
			memus += '			<div class="_fuki_read">直接、生データ(JSON)を編集できます。このデータをPCにテキストファイルに保存しておけば、簡易なバックアップになります。</div>';
			memus += '		</div>';
			memus += '	</div>';
			memus += '	<div class="_item _float_item  _btn_tagAll">';
			memus += '		<div>HTML確認</div>';
			memus += '		<div class="_float_fuki">';
			memus += '			<div class="_fuki_title">HTML確認</div>';
			memus += '			<div class="_fuki_read">公開時に生成されるHTMLファイルを確認出来ます。</div>';
			memus += '		</div>';
			memus += '	</div>';
			memus += '</div>';
		}
			
		var pubBtns = '';
			pubBtns += '	<div class="_page_btns_pre">';
			pubBtns += '		<div class="_cms_btn_alpha _btn_preview">プレビュ生成</div>';
			pubBtns += '		<div class="_cms_btn_alpha _btn_preview_more"><i class="fa fa-external-link-square "></i></div>';
			pubBtns += '		<div class="_btn_previewing"><i class="fa fa-cog fa-spin"></i></div>';
			pubBtns += '	</div>';

			pubBtns += '	<div class="_page_btns_pub">';
			pubBtns += '		<div class="_save_wapper">';
			pubBtns += '			<div class="_saveDate_wapper _float_save">';
			pubBtns += '				<div class="_icon_bar"><i class="fa fa-bars"></i></div>';
			pubBtns += '				<div class="_saveDate"><i class="fa fa-clock-o"></i> <span></span></div>';
			pubBtns += '				<div class="_float_fuki">';
			pubBtns += '					<div class="_page_revision"></div>';
			pubBtns += '				</div>';
			pubBtns += '			</div>';
			pubBtns += '			<div class="_btn_save_wapper ">';
			pubBtns += '				<div class="_cms_btn_alpha _btn_save" '+TIP("#+S")+'><i class="fa fa-check "></i> 保存済み</div>';
			pubBtns += '				<div class="_cms_btn_alpha _btn_save_pre" '+TIP("#+S")+'><i class="fa fa-pencil "></i> 保存する</div>';
			pubBtns += '				<div class="_btn_saveing"><i class="fa fa-cog fa-spin"></i></div>';
			pubBtns += '			</div>';
			pubBtns += '		</div>';
			
			pubBtns += '		<div class="_public_wapper">';
			pubBtns += '			<div class="_publicDate_wapper _float_pub">';
			pubBtns += '				<div class="_publicDate"><i class="fa fa-clock-o"></i> <span></span></div>';
			pubBtns += '				<div class="_float_fuki">';
			pubBtns += '					<div class="_float_btn _btn_pageUnPub"><i class="fa fa-trash "></i> 公開取消し</div>';
			pubBtns += '				</div>';
			pubBtns += '			</div>';
			pubBtns += '			<div class=" _btn_public_wapper ">';
			pubBtns += '				<div class="_cms_btn_alpha _btn_public" '+TIP("#+P")+'><i class="fa fa-globe "></i> 公開する</div>';
			pubBtns += '				<div class="_btn_publishing"><i class="fa fa-cog fa-spin"></i></div>';
			pubBtns += '			</div>';
			pubBtns += '		</div>';
			pubBtns += '		<div class="_cms_btn_alpha _btn_public_more" '+TIP("#+O")+'><i class="fa fa-external-link-square "></i></div>';
			pubBtns += '	</div>';

		var pubBtns_seti = '';
			pubBtns_seti += '	<div class="_page_btns_pub">';
			pubBtns_seti += '		<div class="_btn_save_wapper ">';
			pubBtns_seti += '			<div class="_cms_btn_alpha _btn_save" '+TIP("#+S")+'><i class="fa fa-check "></i> 保存済み</div>';
			pubBtns_seti += '			<div class="_cms_btn_alpha _btn_save_pre" '+TIP("#+S")+'><i class="fa fa-pencil "></i> 保存する</div>';
			pubBtns_seti += '			<div class="_btn_saveing"><i class="fa fa-cog fa-spin"></i></div>';
			pubBtns_seti += '		</div>';
			pubBtns_seti += '	</div>';
			
			
		var pubBtns_pre = '';
			pubBtns_pre += '	<div class="_page_btns_pre">';
			pubBtns_pre += '		<div class="_cms_btn_alpha _btn_preview">プレビュ生成</div>';
			pubBtns_pre += '		<div class="_cms_btn_alpha _btn_preview_more"><i class="fa fa-external-link-square "></i></div>';
			pubBtns_pre += '		<div class="_btn_previewing"><i class="fa fa-cog fa-spin"></i></div>';
			pubBtns_pre += '	</div>';
			pubBtns_pre += '	<div class="_page_btns_pub">';
			pubBtns_pre += '		<div class="_btn_save_wapper ">';
			pubBtns_pre += '			<div class="_cms_btn_alpha _btn_save" '+TIP("#+S")+'><i class="fa fa-check "></i> 保存済み</div>';
			pubBtns_pre += '			<div class="_cms_btn_alpha _btn_save_pre" '+TIP("#+S")+'><i class="fa fa-pencil "></i> 保存する</div>';
			pubBtns_pre += '			<div class="_btn_saveing"><i class="fa fa-cog fa-spin"></i></div>';
			pubBtns_pre += '		</div>';
			pubBtns_pre += '	</div>';
			
		var zoomBtns = ''
			zoomBtns += '	<div class="_page_side_opener">';
			zoomBtns += '		<span>編集用CSS設定</span>';
			zoomBtns += '	</div>';
			zoomBtns += '	<div class="_page_side_opener">';
			zoomBtns += '		<span>コンテナ：</span>';
			zoomBtns += '		<span class="_cms_btn_alpha _btn_open_all"><span>+</span> 開く</span>';
			zoomBtns += '		<span class="_cms_btn_alpha _btn_close_all"><span>-</span> 閉じる</span>';
			zoomBtns += '	</div>';
			zoomBtns += '	<div class="_page_side_zoom">';
			zoomBtns += '		<div class="_page_zooms ">';
			zoomBtns += '			<span class="_cms_btn_alpha _btn_zoomIn" '+TIP("#+→")+'><i class="fa fa-fw fa-plus-circle "></i> </span>';
			zoomBtns += '			<span class="_cms_btn_alpha _btn_zoom">100%</span>';
			zoomBtns += '			<span class="_cms_btn_alpha _btn_zoomOut" '+TIP("#+←")+'><i class="fa fa-fw fa-minus-circle "></i> </span>';
			zoomBtns += '		</div>';
			zoomBtns += '	</div>';
			
		var iconBtns = ''
			iconBtns += '	<div class="_page_icon_btns">';
			// iconBtns += '		<div class="_item _float_item">';
			// iconBtns += '			<div class=" _side_btn _btn_restore"><i class="fa fa-fw fa-reply-all"></i></div>';
			// iconBtns += '			<div class=" _side_btn _btn_restore_ng" style="opacity:0.5;"><i class="fa fa-fw fa-reply-all"></i></div>';
			// iconBtns += '			<div class="_float_fuki">';
			// iconBtns += '				<div class="_fuki_title">編集前に復帰</div>';
			// iconBtns += '				<div class="_fuki_read">ページを編集前に復帰します。</div>';
			// iconBtns += '			</div>';
			// iconBtns += '		</div>';
			
			// iconBtns += '				<div class="_float_btn "><i class="fa fa-fw fa-reply-all"></i></div>';

			iconBtns += '		<div class="_item _float_item">';
			iconBtns += '			<div class=" _side_btn _btn_reset"><i class="fa fa-file-o "></i></div>';
			iconBtns += '			<div class="_float_fuki">';
			iconBtns += '				<div class="_fuki_title">ページリセット</div>';
			iconBtns += '				<div class="_fuki_read">コンテンツをリセットします</div>';
			iconBtns += '			</div>';
			iconBtns += '		</div>';
			iconBtns += '		<div class="_item _float_item">';
			iconBtns += '			<div class=" _side_btn _btn_restore"><i class="fa fa-fw fa-fast-backward"></i></div>';
			iconBtns += '			<div class="_float_fuki">';
			iconBtns += '				<div class="_fuki_title">編集前に復帰</div>';
			iconBtns += '				<div class="_fuki_read">初期状態に復帰します。</div>';
			iconBtns += '			</div>';
			iconBtns += '		</div>';
			iconBtns += '		<div class="_item _float_item">';
			iconBtns += '			<div class=" _side_btn _btn_undo"><i class="fa fa-fw fa-step-backward"></i></div>';
			iconBtns += '			<div class="_float_fuki">';
			iconBtns += '				<div class="_fuki_title">取り消す(ひとつ前に) '+TIP2("#+Z")+'</div>';
			iconBtns += '				<div class="_fuki_read">ひとつ前のブロックの操作を、取り消します。</div>';
			iconBtns += '			</div>';
			iconBtns += '		</div>';
			iconBtns += '		<div class="_item _float_item">';
			iconBtns += '			<div class=" _side_btn _btn_pageCopy"><i class="fa fa-caret-right "></i><i class="fa fa-fw fa-clipboard"></i></div>';
			iconBtns += '			<div class="_float_fuki">';
			iconBtns += '				<div class="_fuki_title">ページコピー</div>';
			iconBtns += '				<div class="_fuki_read">現在のページをコピーします。その後、ページを移動し、ページをペーストします。</div>';
			// iconBtns += '				<div class="_messa _btn_pageCopy_message"></div>';
			iconBtns += '			</div>';
			iconBtns += '		</div>';
			iconBtns += '		<div class="_item _float_item">';
			iconBtns += '			<div class=" _side_btn _btn_pagePaste"><i class="fa fa-fw fa-clipboard"></i><i class="fa fa-caret-right "></i></div>';
			iconBtns += '			<div class="_float_fuki">';
			iconBtns += '				<div class="_fuki_title">ページペースト</div>';
			iconBtns += '				<div class="_fuki_read">コピーしたページをペーストします</div>';
			// iconBtns += '				<div class="_messa _btn_pagePaste_message"></div>';
			iconBtns += '			</div>';
			iconBtns += '		</div>';
			iconBtns += '	</div>';

		var wide = ''
			wide += '			<div class="_memori_area">';
			wide += 				CMS_SizeManager.getTag_FreePageBar();
			wide += '			</div>';

		var footer = ''
			footer += '			<div class=" _toggle-wap">';
			footer += '				<div class="_toggle-head _m" data-isopen="1"><span><i class="fa fa-minus "></i></span> ファイル情報</div>';
			footer += '				<div class="_f1 _toggle-inner" style="display:block;"></div>';
			footer += '			</div>';
			footer += '			<div class=" _toggle-wap">';
			footer += '				<div class="_toggle-head _m" data-isopen=""><span><i class="fa fa-plus-square "></i></span> ページタグ</div>';
			footer += '				<div class="_f2 _toggle-inner"></div>';
			footer += '			</div>';
			
		tag = tag.split("{ROW1}").join(row1);
		tag = tag.split("{MENUS}").join(memus);
		tag = tag.split("{PUB_BTNS}").join(pubBtns);
		tag = tag.split("{PUB_BTNS_PRESET}").join(pubBtns_pre);
		tag = tag.split("{PUB_BTNS_SETTTING}").join(pubBtns_seti);
		tag = tag.split("{ICON_BTNS}").join(iconBtns);
		tag = tag.split("{ZOOM_BTNS}").join(zoomBtns);
		tag = tag.split("{WIDE}").join(wide);
		tag = tag.split("{FOOTER}").join(footer);
		
		/* ---------- ---------- ---------- */
		//編集時のCSS設定用クラス
		var dir = _o.dir;
		var id = _o.id;
		var g_ids  = CMS_Data.Sitemap.getGloupPath_by_id(id,dir).split("/").join(" ");
		var editCSS_ID = "__CMS_EDIT_AREA__" + id
		var editCSS_CS = (function(_s){ 
			var css = [];
			for (var i = 0; i < 3 ; i++) {
				var s = CMS_U.getSplitTextAt(g_ids,i," ");
				if(s) css.push("__cms_edit_area__" + s);
			}
			return css.join(" ")
		})(g_ids);
		var editcss = "";
			editcss += '<div class="_editclass">';
			editcss += '● CMS編集画面用CSS (html/css/cms.cssや、free.cssなどに設定)<br>'
			editcss += '　サイト全体のセレクタ : <b>.__cms_edit_area__{ background:#ccc; }</b><br>'
			editcss += '　現在のグループのセレクタ : '
			editcss +=  (function(_s){ 
				var a = _s.split(" ")
				var css = [];
				for (var i = 0; i < a.length ; i++) {
					if(a[i]){
						css.push('.' + a[i] + "{ background:#ccc; }")
					}
				}
				if(css.length == 0) return '<br>'
				return  "<b>" + css.join(" , ") + "</b><br>"
			})(editCSS_CS);
			editcss += '　現在のページのセレクタ : <b>#' + editCSS_ID + '{ background:#ccc; }</b><br>'
			editcss += '</div>';
			
			tag = tag.split("{PAGE_ID}").join(editCSS_ID );
			tag = tag.split("{PAGE_CLASS}").join(editCSS_CS);
			tag = tag.split("{EDIT_CSS_CLASS}").join(editcss);
		
		return $(tag);
	}
	
	/* ---------- ---------- ---------- */

	var isToggleInited = false
	function toggleInit(){
		if(isToggleInited)return;
		isToggleInited = true;
		$("body").on("click","._toggle-wap ._toggle-head",function(){
			if($(this).data("isopen") == "1"){
				$(this).parent().find("._toggle-inner").slideUp();
				$(this).find("span").html('<i class="fa fa-plus-square "></i>')
				$(this).data("isopen","")
			} else{
				$(this).parent().find("._toggle-inner").slideDown();
				$(this).find("span").html('<i class="fa fa-minus "></i>')
				$(this).data("isopen","1")
			}
		})
	}
	function updateFooterTag1(_o){
		toggleInit();
		var dir = _o.dir;
		var id = _o.id;
		var _s = ""
			_s += '<table>';
			_s += '<tr><th>保存データ</th>	<td><a href="{JSON_URL}" target="_blank">{JSON_URL} {IC}</a></td></tr>';
			_s += '<tr><th></th>			<td class="_saveDate"><i class="fa fa-clock-o"></i> 保存日時 : <span>{JSON_DATE}</span></td></tr>';
			_s += '<tr><th>公開HTML</th>	<td><a href="{HTML_URL}" target="_blank">{HTML_URL} {IC}</a></td></tr>';
			_s += '<tr><th></th>			<td class="_publicDate"><i class="fa fa-clock-o"></i> 公開日時 : <span>{HTML_DATE}</span></td></tr>';
			_s += '</table>';
			
			_s = _s.split("{JSON_URL}").join(CMS_Path.JSON.getURL(id,dir));
			_s = _s.split("{HTML_URL}").join(CMS_Path.PAGE.getURL(id,dir));
			_s = _s.split("{JSON_DATE}").join(_o.save);
			_s = _s.split("{HTML_DATE}").join(_o.pub);
			_s = _s.split("{IC}").join(Dic.I.External);
			
		return _s;
	}
	function updateFooterTag2(_o){
		
		var dir = _o.dir;
		var id = _o.id;
		var _s = ""
			_s += '	<p>ページ公開時に、置き換えられる置き換えタグの一覧です。</p>';
			_s += '	<table>';
			_s += '		<tr>				<th></th><th>ページタグ</th>			<th></th><th>書き出される値</th></tr>';
			_s += '		<tr class="_hr">	<th>編集内容</th><th><span class="_cms_btn_copy_page_id">**PAGE_CONTENTS**</span></th>					<th>_AR_</th><td>HTMLページの編集内容がはいります</td></tr>';
			_s += '		<tr class="_hr">	<th>ディレクトリ情報</th><th><span class="_cms_btn_copy_page_id">**SITE_DIR**</span></th>		<th>_AR_</th><td><em>{SITE_DIR}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**ASSET_DIR**</span></th>							<th>_AR_</th><td><em>{ASSET_DIR}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**DEF_DIR**</span></th>							<th>_AR_</th><td><em>{DEF_DIR}</em></td></tr>';
			_s += '		<tr class="_hr">	<th>ページ関連	</th><th><span class="_cms_btn_copy_page_id">**PAGE_DIR**</span></th>			<th>_AR_</th><td><em>{PAGE_DIR}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_ID**</span></th>							<th>_AR_</th><td><em>{PAGE_ID}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_NAME**</span></th>							<th>_AR_</th><td><em>{PAGE_NAME}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_GROUP_IDS**</span></th>					<th>_AR_</th><td><em>{PAGE_GROUP_IDS}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_GROUP_IDS[0]**</span></th>					<th>_AR_</th><td><em>{PAGE_GROUP_IDS[0]}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_GROUP_IDS[1]**</span></th>					<th>_AR_</th><td><em>{PAGE_GROUP_IDS[1]}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_GROUP_IDS[2]**</span></th>					<th>_AR_</th><td><em>{PAGE_GROUP_IDS[2]}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_GROUP_NAMES**</span></th>					<th>_AR_</th><td><em>{PAGE_GROUP_NAMES}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_BREADLIST**</span></th>					<th>_AR_</th><td>公開ページで確認してください</td></tr>';
			_s += '		<tr class="_hr">	<th>ブログ関連	</th><th><span class="_cms_btn_copy_page_id">**PAGE_TAG**</span></th>			<th>_AR_</th><td><em>{PAGE_TAG}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_READ**</span></th>							<th>_AR_</th><td><em>{PAGE_READ}</em></td></tr>';
			_s += '		<tr><th>			</th><th><span class="_cms_btn_copy_page_id">**PAGE_DATE**</span></th>							<th>_AR_</th><td><em>{PAGE_DATE}</em></td></tr>';
			_s += '		<tr class="_hr">	<th>その他		</th><th><span class="_cms_btn_copy_page_id">**PAGE_PUB_DATE**</span></th>		<th>_AR_</th><td><em>{PAGE_PUB_DATE}</em></td></tr>';
			// _s += '		<tr><th>		</th><th><span>**PAGE_TEMPLATE**</span></th>						<th>_AR_</th><td><em>{PAGE_TEMPLATE}</em></td></tr>';
			_s += '	</table>';

		var site_dir = CMS_Path.SITE.getTopRelPath_from_html(dir);
		var g_ids  = CMS_Data.Sitemap.getGloupPath_by_id(id,dir).split("/").join(" ");
		var g_names  = CMS_Data.Sitemap.getGloupName_by_id(id,dir).split("/").join(" ");
		
		var pageName = "";
		var tagName = "";
		var dateName= "";
		var readName= "";
		
		var current = CMS_Data.Sitemap.getData_by_id(id,dir);
		if(current != null) {
			pageName  = current.name || "";
			tagName	 = current.tag || "";
			dateName = current.date || "";
			readName = current.read || "";
		}
			_s = _s.split("{SITE_DIR}").join(site_dir);
			_s = _s.split("{ASSET_DIR}").join(CMS_Path.ASSET.ABS2);
			_s = _s.split("{DEF_DIR}").join(CMS_Path.PAGE.ABS2);
			
			_s = _s.split("{PAGE_DIR}").join(CMS_Path.PAGE.getAbsDirPath(dir));
			_s = _s.split("{PAGE_ID}").join(id);
			_s = _s.split("{PAGE_NAME}").join(pageName);
			
			var _split = CMS_U.getSplitTextAt;
			_s = _s.split("{PAGE_GROUP_IDS}").join(g_ids);
			_s = _s.split("{PAGE_GROUP_IDS[0]}").join(_split(g_ids,0," "));
			_s = _s.split("{PAGE_GROUP_IDS[1]}").join(_split(g_ids,1," "));
			_s = _s.split("{PAGE_GROUP_IDS[2]}").join(_split(g_ids,2," "));
			_s = _s.split("{PAGE_GROUP_NAMES}").join(g_names);
			
			_s = _s.split("{PAGE_TAG}").join(tagName);
			_s = _s.split("{PAGE_READ}").join(readName);
			_s = _s.split("{PAGE_DATE}").join(dateName);
			
			_s = _s.split("{PAGE_PUB_DATE}").join(_o.pub);
			// _s = _s.split("{PAGE_TEMPLATE}").join(_o.template);
			_s = _s.split(">**").join(">{{");
			_s = _s.split("**<").join("}}<");
			_s = _s.split("_AR_").join('<i class="fa fa-long-arrow-right "></i> ');
			
			return _s;
	}
	return {
		getMainView: getMainView,
		updateFooterTag1: updateFooterTag1,
		updateFooterTag2: updateFooterTag2
	}})();
