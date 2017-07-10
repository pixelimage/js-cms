
ImageMap.InspectView = (function(){
	
	var view;
	var v = {};
	
	function init(){
		view = $("#ImageMapInspectView");
		createlayout();
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){

		var tag = ""
			tag += '<div class="_header">';
			tag += '	<div class="_dragBar"></div>';
			tag += '	<div class="_inspect_title">選択アイテム設定</div>';
			tag += '</div>';
			
			tag += '<div class="_body_com">';
			tag += '	<div class="_subtitle">共通設定</div>';
			tag += '	<div class="_basic_tabs">'
			tag += '		<div class="_basic_tab" data-no="0">基本設定</div>'
			tag += '		<div class="_basic_tab" data-no="1">詳細</div>'
			tag += '	</div>'
			tag += '	<div class="_presetItems">';
			tag += '		<div class="_basic_tab_body">' 
			tag += '			<table class="_table">';
			tag += '				<tr>';
			tag += '					<th>X:</th><td><span><input type="number" class="_w50 _in_left" />%</span></td>';
			tag += '					<th>幅:</th><td><span><input type="number" class="_w50 _in_width" />%</span></td>';
			tag += '				</tr>';
			tag += '				<tr>';
			tag += '					<th>Y:</th><td><span><input type="number" class="_w50 _in_top" />%</span></td>';
			tag += '					<th>高:</th><td><span><input type="number" class="_w50 _in_height" />%</span></td>';
			tag += '				</tr>';
			// tag += '				<tr>';
			// tag += '					<td colspan="4"><div class="_btn_round">値を丸める</div>';
			// tag += '				</tr>';
			tag += '				<tr>';
			tag += '					<th>透明:</th><td><span><input type="number" step="0.1" max="1" min="0" class="_w50 _in_opacity" /></span></td>';
			tag += '					<th>回転:</th><td><span><input type="number" class="_w50 _in_rotate" /></span></td>';
			tag += '				</tr>';
			tag += '			</table>';
			tag += '			<table class="_table">';
			tag += '				<tr>';
			tag += '					<th>リンク</th><td><div class="_cms_btn_alpha _btn_anchor" data-type=""></div></td>';
			tag += '				</tr>';
			tag += '			</table>';
			tag += '		</div>';
			tag += '		<div class="_basic_tab_body">';
			tag += '			<table class="_table">';
			tag += '				<tr><th>class:</th><td><span><input type="text" class="_w100 _in_class" placeholder="クラス" /></span></td></tr>';
			tag += '				<tr><th>style:</th><td><span><input type="text" class="_w100 _in_style" placeholder="スタイル" /></span></td></tr>';
			tag += '				<tr><th>タグ属性:</th><td><span><input type="text" class="_w100 _in_attr" placeholder="タグ属性" /></span></td></tr>';
			tag += '			</table>';
			tag += '		</div>';
			tag += '	</div>'
			tag += '</div>'
			
			tag += '<div class="_body_uni">';
			//rect
			tag += '	<div class="_type_in _type_rect">';
			tag += '		<div class="_subtitle">四角設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr><th>塗色:</th><td><span><input type="text" class="_w50 _in_rect_color _colorPicker" /></span></td></tr>';
			tag += '			<tr>';
			tag += '				<th>線色:</th><td><span><input type="text" class="_w50 _in_rect_border_color _colorPicker" /></span></td>';
			tag += '				<th>線幅:</th><td><span><input type="text" class="_w50 _in_rect_border_size" data-candidate="_cms_border_w" /></span></td>';
			tag += '			</tr>';
			tag += '			<tr><th>角丸:</th><td><span><input type="text" class="_w50 _in_rect_round" data-candidate="_cms_box_round" /></span></td></tr>';
			tag += '		</table>';
			tag += '	</div>';
			
			tag += '	<div class="_type_in _type_line">';
			tag += '		<div class="_subtitle">線設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr><th>塗色:</th><td><span><input type="text" class="_w50 _in_line_color _colorPicker" /></span></td></tr>';
			tag += '			<tr><th>太さ:</th><td><span><input type="number" class="_w50 _in_line_w" /></span></td></tr>';
			tag += '			<tr><th>←:</th><td><span><input type="number" class="_w50 _in_line_l" /></span></td></tr>';
			tag += '			<tr><th>→:</th><td><span><input type="number" class="_w50 _in_line_r" /></span></td></tr>';
			tag += '		</table>';
			tag += '	</div>';
			
			//text
			tag += '	<div class="_type_in _type_text">';
			tag += '		<div class="_subtitle">テキスト設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr><th>テキスト:</th><td colspan="3">'
			tag += '				<div class="_input-with-btns _input-textarea">'
			tag += '					<textarea class="_textarea-scroll _in_text" placeholder="テキストを入力"></textarea><br>'
			tag += '					<div class="_btns">'
			tag += '						<span class="_btn_input _edit" data-type="textarea:p">'+Dic.I.Edit+' 編集</span> '
			tag += '					</div>'
			tag += '				</div>'
			tag += '				</td>';
			tag += '			</tr>';
			tag += '			<tr>';
			tag += '				<th>サイズ:</th><td><span><input type="text" class="_w50 _in_text_size" data-candidate="_cms_text_size" /></span></td>';
			tag += '				<th>文字色:</th><td><span><input type="text" class="_w50 _in_text_color _colorPicker" /></span></td>';
			tag += '			</tr>';
			tag += '			<tr>';
			tag += '				<th>行揃え:</th><td><span><input type="text" class="_w50 _in_text_align" data-candidate="_cms_text_align" /></span></td>';
			tag += '				<th>行間:</th><td><span><input type="text" class="_w50 _in_text_line" data-candidate="_cms_line_heiht" /></span></td>';
			tag += '			</tr>';
			tag += '			<tr>';
			tag += '				<th>太字:</th><td><span><input type="text" class="_w50 _in_text_bold" data-candidate="_cms_text_bold" /></span></td>';
			tag += '				<th>影:</th><td><span><input type="text" class="_w50 _in_text_sdw" data-candidate="_cms_text_sdw" /></span></td>';
			tag += '			</tr>';
			tag += '			<tr>';
			tag += '				<th>フォント:</th><td colspan="3"><span><input type="text" class="_w130 _in_text_font" data-candidate="_cms_text_font" /></span></td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '		<div class="_btn_wide _btn_bmp_text">フォントリスト <i class="fa fa-external-link-square "></i></div>';
			tag += '		<div class="_em_box">';
			tag += '			<input type="hidden" class="_in_text_bmp" />';
			tag += '			<div class="_text_bmp_on"><i class="fa fa-lg fa-check-square "></i> ビットマップで書出す</div>';
			tag += '			<div class="_text_bmp_off"><i class="fa fa-lg fa-square-o "></i> ビットマップで書出す</div>';
			tag += '			<div class="_em_box_inner">';
			// tag += '				<div class="_em_box_read">';
			// tag += '					IMGタグにBase64でビットマップとして埋め込みます。<br>';
			// tag += '					複数ページで利用する場合は、画像ファイルへ書出して配置してください。<br>';
			// tag += '				</div>';
			tag += '				<div class="_btn_wide _btn_export_image"><i class="fa fa-image"></i> 画像ファイルへ変換し配置</div>';
			tag += '			</div>';
			tag += '		</div>';
			tag += '	</div>';
			
			//image
			tag += '	<div class="_type_in _type_image">';
			tag += '		<div class="_subtitle">画像設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr><th>画像:</th><td><div class="_in_data_image_path" /></div></td></tr>';
			tag += '			<tr><th></th><td><div class="_in_data_image _cms_bg_trans" /></div></td></tr>';
			tag += '			<tr><th>角丸:</th><td><span><input type="text" class="_w50 _in_image_round" data-candidate="_cms_box_round" /></span></td></tr>';
			tag += '			<tr><th>横☓縦比:</th><td><span><input type="text" class="_w50 _in_image_ratio" data-candidate="_cms_image_ratio" /></span></td></tr>';
			tag += '			<tr><th></th><th>';
			tag += '				<input type="hidden" class="_in_image_fix" />';
			tag += '				<div class="_image_fix_on"><i class="fa fa-lg fa-check-square "></i> 原寸で表示</div>';
			tag += '				<div class="_image_fix_off"><i class="fa fa-lg fa-square-o "></i> 原寸で表示</div>';
			tag += '			</th></tr>'
			tag += '		</table>';
			tag += '		<input type="hidden" class="_w100 _in_image" />';
			tag += '	</div>';
			
			//svg
			tag += '	<div class="_type_in _type_svg">';
			tag += '		<div class="_subtitle">図形(SVG)設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr><th>SVG:</th><td>'
			tag += '				<div class="_input-with-btns _input-textarea">'
			tag += '					<textarea class="_textarea-scroll _in_svg" placeholder="テキストを入力"></textarea><br>'
			tag += '					<div class="_btns">'
			tag += '						<span class="_btn_input _edit" data-type="textarea:svg">'+Dic.I.Edit+' 編集</span> '
			tag += '					</div>'
			tag += '				</div>'
			tag += '			</tr>';
			tag += '			<tr><th>色:</th><td><input type="text" class="_w50 _in_svg_color _colorPicker" /></td></tr>';
			tag += '		</table>';
			tag += '		<div class="_btn_wide _btn_svg_lib">図形(SVG)ライブラリ <i class="fa fa-external-link-square "></i></div>';
			tag += '	</div>';
			
			//Link
			tag += '	<div class="_type_in _type_link">';
			tag += '		<div class="_subtitle">リンク設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr>';
			tag += '				<th>メタ<br>データ:</th><td colspan="3"><span><input type="text" class="_w130 _in_meta" /></span></td>';
			tag += '			</tr>';
			tag += '			<tr>';
			tag += '				<th></th><td colspan="3">data-meta=""として出力</td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '	</div>';
			
			//html
			tag += '	<div class="_type_in _type_html">';
			tag += '		<div class="_subtitle">HTML設定</div>';
			tag += '		<table class="_table">';
			tag += '			<tr><th>HTML:</th><td>'
			tag += '				<div class="_input-with-btns _input-textarea">'
			tag += '					<textarea class="_textarea-scroll _in_html" placeholder="テキストを入力"></textarea><br>'
			tag += '					<div class="_btns">'
			tag += '						<span class="_btn_input _edit" data-type="textarea:html">'+Dic.I.Edit+' 編集</span> '
			tag += '					</div>'
			tag += '				</div>'
			tag += '			</tr>';
			tag += '			<tr><th></th><th>';
			tag += '				<input type="hidden" class="_in_html_preview" /><br>';
			tag += '				<div class="_html_preview_on"><i class="fa fa-lg fa-check-square "></i> プレビューする</div>';
			tag += '				<div class="_html_preview_off"><i class="fa fa-lg fa-square-o "></i> プレビューする</div>';
			tag += '			</th></tr>'
			tag += '		</table>';
			tag += '	</div>';
			tag += '</div>';
			//tag += '	font-size:6vw;<br>';
			
			tag += '<div class="_preview">';
			tag += '	<div class="_miniPreviw"></div>';
			tag += '</div>';
			tag += '<div class="_footer">';
			tag += '	<div>';
			tag += '		<table>';
			tag += '			<tr>';
			tag += '				<td>';
			tag += '					<span class="_cms_btn_alpha _btn_edit ss_imgInspect _edit"></span>';
			tag += '				</td>';
			tag += '				<td>';
			tag += '					<span class="_cms_btn_alpha _btn_dup_bottom ss_imgInspect _dup_bottom"></span>';
			tag += '				</td>';
			tag += '				<td>';
			tag += '					<span class="_cms_btn_alpha _btn_dup_right ss_imgInspect _dup_right"></span>';
			tag += '				</td>';
			tag += '				<td>';
			tag += '					<span class="_cms_btn_alpha _btn_del ss_imgInspect _del"></span>';
			tag += '				</td>';
			tag += '				<td>';
			tag += '					<div class="_hoverSet">';
			tag += '						<span class="_cms_btn_alpha _btn_next ss_imgInspect _move"></span>';
			tag += '						<div class="_hoverItems" style="top:-65px;">';
			tag += '							<span class="_cms_btn_alpha _btn_prev2 ss_imgInspect _move_top2"></span>';
			tag += '							<span class="_cms_btn_alpha _btn_prev ss_imgInspect _move_top"></span>';
			tag += '							<span class="_cms_btn_alpha _btn_next ss_imgInspect _move_bottom"></span>';
			tag += '							<span class="_cms_btn_alpha _btn_next2 ss_imgInspect _move_bottom2"></span>';
			tag += '						</div>';
			tag += '					</div>';
			tag += '				</td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '	</div>';
			tag += '</div>';
			
		view.append(tag);
		initBaseStage();
		initEditStage();
		
		//
		v.basic_tabs = view.find("._basic_tab");
		v.basic_tabs.click(function(){ openTab($(this).data("no")) })
		v.basic_tab_bodys = view.find("._basic_tab_body");
		openTab(currentTab);
		
		//ドラッグインベント 
		view.draggable({});
	}
	
	var currentTab = 0
	function openTab(_no){
		currentTab = _no;
		v.basic_tabs.removeClass("_current").eq(currentTab).addClass("_current");
		v.basic_tab_bodys.hide().eq(currentTab).show();
	}
	
	/* ---------- ---------- ---------- */
	
	function initBaseStage(){
		v.btn_del 		= view.find("._btn_del");
		v.btn_edit 		= view.find("._btn_edit");
		v.btn_dup_right 	= view.find("._btn_dup_right");
		v.btn_dup_bottom 	= view.find("._btn_dup_bottom");
		v.btn_move_front 	= view.find("._btn_prev");
		v.btn_move_back 	= view.find("._btn_next");
		v.btn_move_front2 	= view.find("._btn_prev2");
		v.btn_move_back2 	= view.find("._btn_next2");
		
		var M = ImageMap.MainStage;
		v.btn_del		.click(function(){ M.removeItem(); })
		v.btn_edit		.click(function(){ M.editItem(); })
		v.btn_dup_right		.click(function(){ M.dupItem_right(); });
		v.btn_dup_bottom	.click(function(){ M.dupItem_bottom(); });
		v.btn_move_front	.click(function(){ M.moveFront(); });
		v.btn_move_back		.click(function(){ M.moveBack(); });
		v.btn_move_front2	.click(function(){ M.moveFront2(); });
		v.btn_move_back2	.click(function(){ M.moveBack2(); });
		
		//
		v.miniPreviw = view.find("._miniPreviw");
		v.miniPreviw.click(function(){showTag()})
		
		//
		v.btn_svg_lib = view.find("._btn_svg_lib");
		v.btn_svg_lib.click(function(){ window.open(SVG_LIB_URL , "cms_asset") });
		//
		v.btn_bmp_text = view.find("._btn_bmp_text");
		v.btn_bmp_text.click(function(){ window.open(BMP_TEXT_URL , "cms_asset") });
		//
		v.btn_export_image = view.find("._btn_export_image");
		v.btn_export_image.click(function(){uploadImage()});
	}
	
	/* ---------- ---------- ---------- */
	
	var uploadDirName = "";
	var uploadFileName = "";
	
	function uploadImage(){
		var d = currentItem.getData();
		if(!d.id) d.id = ImageMapCode.getUID("item.text");
		
		var s = "";
			s += "アップロードする画像ファイル名を入力してください。<br>";
			s += "OKでアップロードします。<br><br>";
			s += 'アップロード先ディレクトリ：<b>' + UPLOAD_DIR_PATH + '<b>';
		
		var o = {
			type:"single",
			title:"画像ファイル名入力",
			read:s,
			notes:"",
			val:d.id
		}
		CMS_InputView.stageIn(o,function(_val){
			currentItem.setID(_val);
			uploadImage_core(_val);
		})
	}
	function uploadImage_core(_s){
		var d = currentItem.getData();
		
		uploadDirName = UPLOAD_DIR_PATH;
		uploadFileName = uploadDirName + _s + ".png";
		
		var u = '?action=upload64';
			u += '&upload_dir=' + uploadDirName;
			u += '&fileName='+ uploadFileName;

		var param = {};
			param.base64 = ImageMapBMPText.getImage(d);
		
		var this_ = this;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: CMS_Path.PHP_UPLOAD+u,
			data			: param,
			dataType		: 'json',
			success: function(data) {
				if (data.status == "1") successUpload();
				if (data.status == "0") errorUpload();
			},
			error: function(data) {
				errorUpload();
			}
		})
	}
	function successUpload(){
		ImageMap.MainStage.assingText2Image(uploadFileName);
	}
	function errorUpload(){
		alert("upload error");
	}
	
	/* ---------- ---------- ---------- */
	
	var in_;
	function initEditStage(){
		v.types 	= view.find("._type_in");
		v.types.hide();
		v.type_rect 	= view.find("._type_rect");
		v.type_line 	= view.find("._type_line");
		v.type_text 	= view.find("._type_text");
		v.type_imageText 	= view.find("._type_text");
		v.type_image 	= view.find("._type_image");
		v.type_svg 		= view.find("._type_svg");
		v.type_link 	= view.find("._type_link");
		v.type_html 	= view.find("._type_html");
		
		/* ---------- ---------- ---------- */
		
		in_ = {};
		// in_.all 	= view.find("input,textarea");
		//in_.all.(function(){ updateState() });
		// in_.all.(function(){ updateState() });
		view.on('keyup',"input,textarea", function(){ updateState() });
		view.on('input',"input,textarea", function(){ updateState() });

		/* ---------- ---------- ---------- */
		//COMMON
		
		in_.top 	= view.find("._in_top");
		in_.left 	= view.find("._in_left");
		in_.width 	= view.find("._in_width");
		in_.height 	= view.find("._in_height");
		in_.opacity = view.find("._in_opacity");
		in_.rotate 	= view.find("._in_rotate");
		// in_.link 	= view.find("._in_link");
		in_.attr 	= view.find("._in_attr");
		in_.class 	= view.find("._in_class");
		in_.style 	= view.find("._in_style");
		in_.btn_anchor = view.find("._btn_anchor");
		
		// v.btn_round 	= view.find("._btn_round");
		// v.btn_round.click(function(){ 
		// 	in_.top.val( roundNo(in_.top.val()))
		// 	in_.left.val( roundNo(in_.left.val()))
		// 	in_.width.val( roundNo(in_.width.val()))
		// 	in_.height.val( roundNo(in_.height.val())).keyup();
		// });
		// function roundNo(_s){
		// 	var s = Number(_s);
		// 	if(isNaN(s)) return 0;
		// 	s = Math.round(s*2)/2;
		// 	return s;
		// }

		/* ---------- ---------- ---------- */
		//TYPEs
		
		//RECT
		in_.rect_color 			= view.find("._in_rect_color");
		in_.rect_border_size	= view.find("._in_rect_border_size");
		in_.rect_border_color 	= view.find("._in_rect_border_color");
		in_.rect_round 			= view.find("._in_rect_round");
		
		//LINE
		in_.line_color 			= view.find("._in_line_color");
		in_.line_w 			= view.find("._in_line_w");
		in_.line_l 			= view.find("._in_line_l");
		in_.line_r 			= view.find("._in_line_r");
		
		//IMAGE
		in_.image 		= view.find("._in_image");
		in_.image_thumb = view.find("._in_data_image");
		in_.image_thumb.click(function(){
			var s = in_.image.val();
			CMS_MainController.openAssetSelectRel("image", s ,function(_s){
				updateImage(_s);
			});
		});
		in_.image_path = view.find("._in_data_image_path");
		in_.image_path.click(function(){
			var val = $(this).html();
			var _s = prompt("画像URLを入力してください",val);
	 		if(_s == val) return;
		 	if(_s == null) return;
		 	updateImage(_s);
		});
		in_.image_round = view.find("._in_image_round");
		in_.image_ratio = view.find("._in_image_ratio");
		
		in_.image_fix 		= view.find("._in_image_fix");
		in_.image_fix_on 	= view.find("._image_fix_on");
		in_.image_fix_off 	= view.find("._image_fix_off");
		in_.image_fix_on.click(function(){
			in_.image_fix_on.hide();
			in_.image_fix_off.show();
			in_.image_fix.val("");
			updateState()
		});
		in_.image_fix_off.click(function(){
			in_.image_fix_on.show();
			in_.image_fix_off.hide();
			in_.image_fix.val("1");
			updateState()
		});
		
		
		//SVG
		in_.svg 		= view.find("._in_svg");
		in_.svg_color 	= view.find("._in_svg_color");
		
		//TEXT
		in_.text 	= view.find("._in_text");
		in_.text_size 	= view.find("._in_text_size");
		in_.text_color 	= view.find("._in_text_color");
		in_.text_align 	= view.find("._in_text_align");
		in_.text_line 	= view.find("._in_text_line");
		in_.text_font 	= view.find("._in_text_font");
		in_.text_bold 	= view.find("._in_text_bold");
		in_.text_sdw 	= view.find("._in_text_sdw");
		
		in_.em_box_inner 	= view.find("._em_box_inner");
		in_.text_bmp 		= view.find("._in_text_bmp");
		in_.text_bmp_on 	= view.find("._text_bmp_on");
		in_.text_bmp_off 	= view.find("._text_bmp_off");
		in_.text_bmp_on.click(function(){
			in_.text_bmp_on.hide();
			in_.text_bmp_off.show();
			in_.text_bmp.val("");
			in_.em_box_inner.hide();
			updateState()
		});
		in_.text_bmp_off.click(function(){
			in_.text_bmp_on.show();
			in_.text_bmp_off.hide();
			in_.text_bmp.val("1");
			in_.em_box_inner.show();
			updateState()
		});
		
		//LINK
		in_.meta 	= view.find("._in_meta");
		
		//HTML
		in_.html 	= view.find("._in_html");
		in_.html_preview 		= view.find("._in_html_preview");
		in_.html_preview_on 	= view.find("._html_preview_on");
		in_.html_preview_off 	= view.find("._html_preview_off");
		in_.html_preview_on.click(function(){
			in_.html_preview_on.hide();
			in_.html_preview_off.show();
			in_.html_preview.val("");
			updateState()
		});
		in_.html_preview_off.click(function(){
			in_.html_preview_on.show();
			in_.html_preview_off.hide();
			in_.html_preview.val("1");
			updateState()
		});
	}
	
	function updateImage(_s){
		in_.image.val(_s);
		var imgPath = CMS_Path.MEDIA.getImagePath( _s , false );
		in_.image_thumb.html('<img src="' + imgPath + '">');
		in_.image_path.html( _s );
		updateState();
	}

	/* ---------- ---------- ---------- */
	
	function reset(){
		
	}
	
	/* ---------- ---------- ---------- */

	var currentItem;
	var currentLinkClass;
	var isHide = false;
	
	function selectedItem(_select){
		stageIn();
		// if(currentItem == _select) return;
		if(currentItem) currentItem.unselect();
			currentItem = _select;
			
		var U = ImageMapU;
		var data = currentItem.getData();
			data.rect = U.convertPixel_2_Percent(data.rect);
		
		if(data["rect"] == undefined) data.rect = {}
		if(data.rect["top"] == undefined) data.rect.top = 0;
		if(data.rect["left"] == undefined) data.rect.left = 0;
		if(data.rect["width"] == undefined) data.rect.width = 0;
		if(data.rect["height"] == undefined) data.rect.height = 0;
		if(data.rect["opacity"] == undefined) data.rect.opacity = 100;
		if(data.rect["rotate"] == undefined) data.rect.rotate = 0;
		if(data.rect["link"] == undefined) data.rect.link = {};
		if(data.rect["attr"] == undefined) data.rect.attr = "";
		if(data.rect["class"] == undefined) data.rect.class = "";
		if(data.rect["style"] == undefined) data.rect.style = "";
		
		/* ---------- ---------- ---------- */
		//COMMON
		
		in_.top		.val(U.treat(data.rect.top));
		in_.left	.val(U.treat(data.rect.left));
		in_.width	.val(U.treat(data.rect.width));
		in_.height	.val(U.treat(data.rect.height));
		in_.opacity	.val(U.treat(data.rect.opacity));
		in_.rotate	.val(U.treat(data.rect.rotate));
		// in_.link	.val(data.rect.link);
		in_.attr	.val(data.rect.attr);
		in_.class	.val(data.rect.class);
		in_.style	.val(data.rect.style);
		// in_.text	.val(data.text);
		isHide 		= data.hide;
		
		currentLinkClass = new InspectView.AnchorClass(
			in_.btn_anchor,
			defaultVal(data.rect.link,{}),
			function (_val){
				updateState() }
		);
		// in_.btn_anchor.
		
		/* ---------- ---------- ---------- */
		//TYPEs
		
		var Code = ImageMapCode;
		v.types.hide();
		if (Code.isRect(data.type)) 		{ v.type_rect.show(); }
		if (Code.isLine(data.type)) 		{ v.type_line.show(); }
		if (Code.isImage(data.type)) 		{ v.type_image.show(); }
		if (Code.isSVG(data.type)) 			{ v.type_svg.show(); }
		if (Code.isText(data.type)) 		{ v.type_text.show(); }
		if (Code.isLink(data.type)) 		{ v.type_link.show(); }
		if (Code.isHTML(data.type)) 		{ v.type_html.show(); }
		
		//値をセット
		Code.setInputValue(data,in_);
		
		//画像テキストの場合は、リサイズでも、描画アップデートするように
		if (Code.isText(data.type)) { 
			updateState();
		}
		
		updateTagPreview();
	}
	
	var tID_state;
	function updateState(){
		if(tID_state) clearTimeout(tID_state);
		tID_state = setTimeout(function(){
			updateState_core();
		},200);
	}
	function updateState_core(){
		if(!currentItem)return;
		
		var data = currentItem.getData();
		
		/* ---------- ---------- ---------- */
		//COMMON
		var _data = {
			type : data.type,
			id : data.id,
			hide : isHide,
			rect : {
				top		: in_.top.val(),
				left	: in_.left.val(),
				width	: in_.width.val(),
				height	: in_.height.val(),
				opacity	: in_.opacity.val(),
				rotate	: in_.rotate.val(),
				// link	: in_.link.val(),
				link	: currentLinkClass.getVal(),
				attr	: in_.attr.val(),
				class	: in_.class.val(),
				style	: in_.style.val()
			},
			data: {}
			// link	: currentLinkClass.getVal(),//*
			// image	: in_.image.val(),
			// text	: in_.text.val()
		}
		_data.rect = ImageMapU.convertPercent_2_Pixel(_data.rect);
		_data.pixel = ImageMapU.copyRect(_data.rect);
		_data.data = ImageMapCode.getInputValue (_data.type,in_);
		currentItem.setData(_data);
		
		updateTagPreview();
	}
	
	/* ---------- ---------- ---------- */
	
	function updateTagPreview(){
		var param = currentItem.getData();
		var s = ""
		if(JSON.stringify(param).length > 1000){
			s = "選択ブロックのデータ量が多く、プレビューに時間がかかるため、このブロックはHTMLプレビューできません。"
		} else{
			s = ImageMapExport.getHTML_item(param,0,true);
			s = HTMLServiceU.getReplacedHTML(s,{},"",false);
			// s = s.split("\n").join("<br>");
			s = CMS_TagU.tag_2_t(s);
		}
		v.miniPreviw.html(s.substr(0,200));
	}
	function showTag(){
		var data = currentItem.getData();
		var this_ = this;
			s = ImageMapExport.getHTML_item(data,0,true);
			s = HTMLServiceU.getReplacedHTML(s,{},"",false);
		Editer_TAGView.stageIn(s,function(_s){});
	}
	
	/* ---------- ---------- ---------- */
	
	function dClick(_type){
		if(_type == "image"){ in_.image_thumb.click(); }
		if(_type == "text"){ view.find("._type_text ._edit").eq(0).click(); }
		if(_type == "svg"){ view.find("._type_svg ._edit").eq(0).click(); }
		if(_type == "html"){ view.find("._type_html ._edit").eq(0).click(); }
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}
	return {
		init: init,
		reset:reset,
		selectedItem:selectedItem,
		dClick:dClick,
		updateState:updateState,
		stageIn:stageIn,
		stageOut:stageOut
	}
})();

