
//__placeholder__.init();
var DummyImageView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#DummyImageView');
		stageInit();
		setBtn();
		// setTimeout(function(){
		// 	stageIn("width:200,height:100,color:,text:,font:",function(){})
		// },500);
	}
	
	/* ---------- ---------- ---------- */
	var fonts = [
		'Verdana',
		'Arial',
		// 'Comic Sans MS',
		'Courier',
		// 'Courier New',
		'Georgia',
		// 'Impact',
		// 'Times New Roman',
		// 'Trebuchet MS'
	]
 	var cols = [ "#fff","#eee", "#ddd", "#ccc", "#999", "#666", "#333", "#000", "#900", "#990", "#090", "#099", "#009", "#909", "#F00", "#FF0", "#0F0", "#0FF", "#00F", "#F0F", "#FCC", "#FFC", "#CFC", "#CFF", "#CCF", "#FCF" ]

	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_InputView,view);
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("window/dummy","_BASE_")+'</div>'
			tag += '<div class="_title">ダミー画像設定</div>'
		v.header.html(tag);
		
			tag = "";
			tag += '<div class="_read">ダミー画像設定では、アタリ用の画像を設定できます。<br>縦横のサイズを指定できるほか、色の設定や、文字の入力もできます。</div>'
			tag += '<div class="_mockStage">'
			
			// tag += '<canvas id="DummyImageView_canvas" width="800" height="300"></canvas>'
			tag += '<div class="_image_placeholder"></div>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:75px;">50</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:125px;">100</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:225px;">200</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:325px;">300</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:425px;">400</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:525px;">500</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:625px;">600</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:725px;">700</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_width" style="top:10px ;left:825px;">800</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_height" style="top:75px ;left:10px;">50</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_height" style="top:125px ;left:0px;">100</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_height" style="top:225px ;left:0px;">200</span>'
			tag += '<span class="_btn_preset _btn_pos _btn_height" style="top:325px ;left:0px;">300</span>'
			tag += '</div>';
			tag += '<table class="_values">';
			tag += '	<tr><td>縦横サイズ : </td><td>'
			tag += '		<input type="text" class="_in_ _in_width _w50" >x'
			tag += '		<input type="text" class="_in_ _in_height _w50" >'
			tag += '	 背景色:'
			tag += '		<input type="text" class="_in_ _in_color _w100">'
			
			for (var i = 0; i <  cols.length ; i++) {
			tag += '<span class="_btn_color" data-color="'+cols[i]+'" style="color:'+cols[i]+';"><i class="fa fa-circle "></i> </span> \n'
			}
			tag += '	</td></tr>';
			//text
			tag += '	<tr><td>テキスト : </td><td>'
			tag += '		<input type="text" class="_in_ _in_text _w200">'
			tag += '		font :'
			tag += '		<select class="_sel_ _in_family" >';
			for (var i = 0; i <  fonts.length ; i++) {
				tag += '	<option value="'+fonts[i]+'">'+fonts[i]+'</option>';
			}
			tag += '		</select>';
			tag += '		style :'
			tag += '		<select class="_sel_ _in_style" >';
			tag += '		<option value="">なし</option>';
			tag += '		<option value="bold">bold</option>';
			tag += '		<option value="italic">italic</option>';
			tag += '		</select>';
			tag += '		size :'
			tag += '		<input type="text" class="_in_ _in_font _w50">'
			tag += '		<span class="_btn_preset _btn_font">10</span>'
			tag += '		<span class="_btn_preset _btn_font">12</span>'
			tag += '		<span class="_btn_preset _btn_font">14</span>'
			tag += '		<span class="_btn_preset _btn_font">18</span>'
			tag += '		<span class="_btn_preset _btn_font">24</span>'
			tag += '		<span class="_btn_preset _btn_font">36</span>'
			tag += '		<span class="_btn_preset _btn_font">48</span>'
			tag += '	</td></tr>';
			
			tag += '	<tr><td>サブテキスト : </td><td>'
			tag += '		<input type="text" class="_in_ _in_text2 _w200">'
			tag += '		font :'
			tag += '		<select class="_sel_ _in_family2" >';
			for (var i = 0; i <  fonts.length ; i++) {
				tag += '	<option value="'+fonts[i]+'">'+fonts[i]+'</option>';
			}
			tag += '		</select>';
			tag += '		style :'
			tag += '		<select class="_sel_ _in_style2" >';
			tag += '		<option value="">なし</option>';
			tag += '		<option value="bold">bold</option>';
			tag += '		<option value="italic">italic</option>';
			tag += '		</select>';
			tag += '		size :'
			tag += '		<input type="text" class="_in_ _in_font2 _w50">'
			tag += '		<span class="_btn_preset _btn_font2">10</span>'
			tag += '		<span class="_btn_preset _btn_font2">12</span>'
			tag += '		<span class="_btn_preset _btn_font2">14</span>'
			tag += '		<span class="_btn_preset _btn_font2">18</span>'
			tag += '		<span class="_btn_preset _btn_font2">24</span>'
			tag += '		<span class="_btn_preset _btn_font2">36</span>'
			tag += '		<span class="_btn_preset _btn_font2">48</span>'
			tag += '	</td></tr>';
			
			tag += '	<tr><td  style="vertical-align: top;">プリセット : </td><td>'
			tag += '		<table class="_prest_rects">';
			tag += '			<tr>';
			tag += '				<td><div class="_preset_rect" data-src="width:80,height:60"></div></td>';
			tag += '				<td><div class="_preset_rect" data-src="width:100,height:80"></div></td>';
			tag += '				<td><div class="_preset_rect" data-src="width:200,height:140"></div></td>';
			tag += '				<td><div class="_preset_rect" data-src="width:300,height:200"></div></td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '		<table class="_prest_rects">';
			tag += '			<tr>';
			tag += '				<td><div class="_preset_rect" data-src="width:720,height:300"></div></td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '	</td></tr>';
			tag += '	<tr><td  style="vertical-align: top;">捕足 : </td><td>'
			tag += '	※ダミー画像は、ページ表示時にデータURIスキームを利用して表示されます。<br>'
			tag += '	※IE6,7,8など、データURIスキームに対応していないブラウザの場合は、<br>同じ縦横サイズのインラインエレメントに置き換えて表示されます。<br>'
			tag += '	※幅・高さともに、10〜1200pxまで指定できます。<br>'
			tag += '	※文字色は、背景色の濃さによって、白か黒色が自動で指定されます。直接指定する事はできません。<br>'
			tag += '	※幅・高さが小さい場合は、テキストは表示されません。<br>'
			tag += '	</td></tr>';
			tag += '</table>';
			tag += '';
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 設定する</div> ';
		v.footer.html(tag);

		
		setBtn();
	}
		
	function setBtn(){

		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.find('._btn_do').click(function(){ pressOK() });
		
		view.find('._in_').keyup(function(){update_pre()})
		view.find('._sel_').change(function(){update()})
		
		v.placeholder = view.find('._image_placeholder');
		
		v.in_width = view.find('._in_width')
		v.in_height = view.find('._in_height')
		v.in_color = view.find('._in_color')
		
		v.in_text = view.find('._in_text')
		v.in_text2 = view.find('._in_text2')
		
		v.in_font = view.find('._in_font')
		v.in_font2 = view.find('._in_font2')
		
		v.in_family = view.find('._in_family')
		v.in_family2= view.find('._in_family2')
		
		v.in_style = view.find('._in_style')
		v.in_style2 = view.find('._in_style2')
		
		v.btn_width = view.find('._btn_width')
		v.btn_width.click(function(){ 
			var s = $(this).text();
			v.in_width.val(s)
			update()
		});
		v.btn_height = view.find('._btn_height')
		v.btn_height.click(function(){ 
			var s = $(this).text();
			v.in_height.val(s)
			update()
		});
		
		v.btn_color = view.find('._btn_color')
		v.btn_color.click(function(){ 
			var s = $(this).data("color").toLowerCase()
			v.in_color.val(s)
			update()
		});
		
		v.btn_font = view.find('._btn_font')
		v.btn_font.click(function(){ 
			var s = $(this).text()
			v.in_font.val(s)
			update()
		});
		v.btn_font2 = view.find('._btn_font2')
		v.btn_font2.click(function(){ 
			var s = $(this).text()
			v.in_font2.val(s)
			update()
		});
		
		v.preset_rect = view.find('._preset_rect')
		v.preset_rect.each(function (index, dom) {
			createPresetImage(dom)
		});
		v.preset_rect.click(function(){ 
			var s = $(this).data("src")
			var p = DummyImageService.text_2_param(s)
			v.in_width.val(p.width)
			v.in_height.val(p.height)
			update()

		});
	}
	
	
	/* ---------- ---------- ---------- */
	function createPresetImage(_tar){
		var s = $(_tar).data("src");
		var data = DummyImageService.getImage(s);
		var tag = '<img src="'+data+'">' 
		$(_tar).html(tag);
	}
	
	/* ---------- ---------- ---------- */
	function initView(_s){
		var param = DummyImageService.text_2_param(_s);
		v.in_width	.val(param.width);
		v.in_height	.val(param.height);
		v.in_color	.val(param.color);
		
		v.in_text	.val(param.text);
		v.in_text2	.val(param.text2);
		
		v.in_font	.val(param.font);
		v.in_font2	.val(param.font2);
		
		v.in_family	.val(param.family);
		v.in_family2.val(param.family2);
		
		v.in_style	.val(param.style);
		v.in_style2	.val(param.style2);
		
		update()
	}
	
	
	
	/* ---------- ---------- ---------- */
	var canvas
	var ctx
	function getCurrentParam(){
		function f(_s){
			if(_s == false) return "";
			var s = _s;
				s = s.split(",").join("");
				s = s.split(":").join("");
			return s;
		}
		var param = {}
			param.width  = Number(f(v.in_width.val()));
			param.height  = Number(f(v.in_height.val()));
			param.color  = f(v.in_color.val());
			
			param.text 	 = f(v.in_text.val());
			param.text2  = f(v.in_text2.val());
			
			param.font 	 = f(v.in_font.val());
			param.font2  = f(v.in_font2.val());
			
			param.family  = f(v.in_family.val());
			param.family2  = f(v.in_family2.val());
			
			param.style  = f(v.in_style.val());
			param.style2  = f(v.in_style2.val());
		
		if(isNaN(param.width))return;
		if(isNaN(param.height))return;
		if(param.width > 1200) {
			param.width = 1200;
			v.in_width.val(param.width)
		}
		if(param.width < 10) {
			param.width = 10;
			v.in_width.val(param.width)
		}
		if(param.height > 1200) {
			param.height = 1200;
			v.in_height.val(param.height)
		}
		if(param.height < 10) {
			param.height = 10;
			v.in_height.val(param.height)
		}
		return param;
	}
	var tID
	function update_pre(){
		if(tID) clearTimeout(tID)
		tID = setTimeout(function(){
			update()
		},400);
	}
	function update(){
		var s = DummyImageService.param_2_text(getCurrentParam());
		var src = DummyImageService.getImage(s);
		if(v.placeholder){
			v.placeholder.html('<img src="'+src+'">')
		}
	}
	/* ---------- ---------- ---------- */
	
	function pressOK(){
		if(callback){
			callback(DummyImageService.param_2_text(getCurrentParam()));
		}
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback 
	function stageIn(_s,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			if(isFirst){
			createlayout();
			}
			callback = _callback
			initView(_s);
			isFirst = false;
			//
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}
	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();
