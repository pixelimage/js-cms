var Anchor_BtnView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Anchor_BtnView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_BtnView,view);
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("window/btn","_BASE_")+'</div>'
			tag += '<div class="_title">ボタン設定</div>'
		v.header.html(tag);
		
		var tag = "";
			tag += '<table class="_layoutTable">';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">リンクURL</th>';
			tag += '		<td><input class="_editableNode _link_href _colorAnchor _w400"> ';
			tag += '		<span class="_btn_pages _cms_btn-nano "><i class="fa fa-lg fa-file-text"></i> ページ</span>'
			tag += '		<span class="_btn_files _cms_btn-nano "><span class="_icon_dir"></span>ファイル</span>'
			tag += '		<div class="_t_path_preview _input_href_anno">aa</div>'
			tag += '		</td>';
			tag += '	</tr>';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">リンク<br>ターゲット</th>';
			tag += '		<td><input class="_editableNode _link_tar _colorAnchor _w400" list="">';
			tag += '		<span class="_target_ref_btn _cms_btn-nano "><i class="fa fa-lg fa-external-link-square "></i> ターゲット</span></td>';
			tag += '	</tr>';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">Aタグ属性</th>';
			tag += '		<td><input class="_editableNode _link_attr _colorAnchor _w400" list=""></td>';
			tag += '	</tr>';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">リンクテキスト</th>';
			tag += '		<td><input class="_editableNode _link_text _colorName _w500" style="margin:0 0 5px 0"><br>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-angle-right "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-caret-right "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-arrow-right "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-chevron-circle-right"></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-check "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-external-link-square "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-envelope "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-file "></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-file-text"></i></span>';
			tag += '			<span class="_icon_copy _cms_btn-nano "><i class="fa fa-file-pdf-o"></i></span>';
			tag += '			<span class="_icon_ref_btn _cms_btn-nano "><i class="fa fa-book "></i> その他アイコン</span>';
			tag += '		</td>'
			tag += '	</tr>';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">画像パス</th>';
			tag += '		<td><input class="_editableNode _link_image _colorPath _w500">'
			tag += '		<span class="_image_ref_btn _cms_btn-nano "><i class="fa fa-book "></i> 画像</span>';
			tag += '		<p>画像パスを入力した場合は、リンクテキストの値が上書きされます</p>';
			tag += '	</tr>';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">デザイン<br>(クラス)</th>';
			tag += '		<td>';
			tag += '			<input class="_link_class _color-style _w500" style="margin:5px 0;font-size:12px;" value="">';
			tag += '			<div class="_selectClass"></div>';
			tag += '			<p>文字サイズについては、ブロック情報パネルで設定</p>';
			tag += '		</td>';
			tag += '	</tr>';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">プレビュー</th>';
			tag += '		<td><div class="_preview"></div></td>';
			tag += '	</tr>';
			tag += '</table>';
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
			tag += '<div class="_cms_btn _cms_btn_red _btn_del">リセット</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 設定する</div> ';
		v.footer.html(tag);
		
		v.previeFrame = view.find('._previeFrame');
		v.link_text	 = view.find('._link_text');
		v.link_image = view.find('._link_image');
		v.link_class  = view.find('._link_class');
		v.link_href	 = view.find('._link_href');
		v.link_tar	 = view.find('._link_tar');
		v.link_attr	 = view.find('._link_attr');
		v.preview	 = view.find('._preview');
		v.input_href_anno = view.find('._input_href_anno');
		v.selectClass = view.find('._selectClass');
		
		setBtn();
	}
	
	function setBtn(){

		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		v.btn_do = view.find('._btn_do');
		
		view.on("click", '._btn_do', function() {
			compliteEdit()
		});
		v.btn_del = view.find('._btn_del');
		v.btn_del.click(function(){ 
			callback(getEmptyData());
			stageOut();
		});
		
		view.on("keyup",'._link_text',function(){ updateBtnClass() });
		view.on("keyup",'._link_image',function(){ updateBtnClass() });
		view.on("keyup",'._link_class',function(){
			currentClass = $(this).val();
			updateBtnClass();
		})
		view.on("click",'._link_image',function(){
			var val = v.link_image.val()
			var s = prompt("画像URLを入力してください", val);
	 		if(s != undefined) s = "";
			v.link_image.val(s);
			updateBtnClass();
		});
		view.on("click",'._image_ref_btn',function(){
			var val = v.link_image.val();
			
			CMS_MainController.openAssetSelectRel("image",  val ,function(_val){
				v.link_image.val(_val)
				updateBtnClass();
			});
		});
		view.on("click",'._btn_pages',function(){
			Anchor_PageListView.stageIn(function(_val){
				v.link_href.val(_val).keyup()
			})
		});
		view.on("click",'._btn_files',function(){
			var s = v.link_href.val();
			CMS_MainController.openAssetSelectRel("link", s ,function(_val){
				UpdateDelay.delay(function(){
					v.link_href.val(_val).keyup();
					updateBtnClass();
				});
			});
		});
		view.on("click",'._target_ref_btn',function(){
			Anchor_TargetListView.stageIn(function(_val){
				v.link_tar.val(_val)
			})
		});
		view.on("click",'._icon_ref_btn',function(){
			Preset_IconView.stageIn(function(_icon){
				var s = v.link_text.val();
				v.link_text.val(_icon + " " + s);
				v.link_text.keyup();
			});
		});
		view.on("click",'._icon_copy',function(){
			var s = v.link_text.val();
			v.link_text.val($(this).html()+ " " + s);
			v.link_text.keyup();
		});
		
		view.on("change",'._pageList',function(){
			var val = $(this).val();
			if(val != "") v.link_href.val(val+".html").keyup();
		})
		
		view.on("keyup",'._link_href',function(){
			updatePathPreview($(this).val());
		});
	}

	function updateBtnClass(){
		var a = currentClass.split(" ");
		v.btnCopyMCs.removeClass("_active");
		for (var i = 0; i < a.length ; i++) {
			view.find('._area_' + a[i]).addClass("_active");
		}
		var t = ""
		if(v.link_image.val().length > 0){
			t = '<img src="' + CMS_Path.MEDIA.getImagePath(v.link_image.val(),false) + '">';
		} else{
			t = defaultVal(v.link_text.val(),v.link_href.val());
		}
		var tag = "";
		tag += '<span class="'+v.link_class.val()+'" >'+t+'</span>'
		v.preview.html(tag)
	}

	function update(){
		var this_ = this;

		if(!val) val = {};
		
		var _url  = defaultVal(val.href,"");
		var _tar  = defaultVal(val.target,"");
		var _attr  = defaultVal(val.attr,"");
		var _label = defaultVal(val.text,"");
		var _class  = defaultVal(val.class_,"");
		var _image  = defaultVal(val.image,"");
		
		if(_url == "")_url = "#";
		if(_label == "")_label = "ボタン名";
		if(_image == "")_image = "";
		if(_class == "")_class = ""
		
		v.link_href.val(_url)
		v.link_tar.val(_tar)
		v.link_attr.val(_attr)
		v.link_text.val(_label)
		v.link_image.val(_image)
		
		getBtnClassTag();
		setBtnClass(_class);
		updateBtnClass();
		updatePathPreview()
	}
	function updatePathPreview(){
		var id = v.link_href.val();
		// v.input_href_anno.html(CMS_Path.MEDIA.getAnchorPath(id,false));
		v.input_href_anno.html("リンクURLプレビュー："+CMS_Path.MEDIA.getAnchorPath_deco(id));
	}
	
		
	/* ---------- ---------- ---------- */
	//class style

	function getBtnClassTag(){
		var list = classList
		var tag = '<img src="images/btn_select_bg.png?3" width="346" height="166" border="0" alt="" >';
		for (var i = 0; i < list.length ; i++) {
			var temp = '<div class="_btnCopyMC _area_{1}" data="{1}" data-type="{0}" style="left:{2}px;top:{3}px;width:{4}px;height:{5}px;"></div>'
				temp = temp.split("{0}").join(list[i][0]);
				temp = temp.split("{1}").join(list[i][1]);
				temp = temp.split("{2}").join(list[i][2]-2);
				temp = temp.split("{3}").join(list[i][3]-1);
				temp = temp.split("{4}").join(list[i][4]);
				temp = temp.split("{5}").join(list[i][5]);
				tag += temp;
		}
		v.selectClass.html(tag);
		v.btnCopyMCs = view.find('._btnCopyMC')
		v.btnCopyMCs.click(function(){ 
			addBtnClass([$(this).attr("data-type"),$(this).attr("data")]);
		});
	}
		
	var classList = [
		["type","cms-btn-lightglay"		,41,3,60,21],
		["type","cms-btn-flat"			,104,3,60,21],
		["type","cms-btn-text-box"		,167,3,50,21],
		["type","cms-btn-text-white"	,224,3,49,21],
		["type","cms-btn-text-simple"	,280,3,45,21],
		
		["type","cms-btn-black"		,41,27,32,24],
		["type","cms-btn-white"		,75,27,32,24],
		["type","cms-btn-blue"		,109,27,32,24],
		["type","cms-btn-blue2"		,143,27,32,24],
		["type","cms-btn-green"		,177,27,32,24],
		["type","cms-btn-yellow"	,210,27,32,24],
		["type","cms-btn-orange"	,245,27,32,24],
		["type","cms-btn-red"		,279,27,32,24],
		["type","cms-btn-pink"		,313,27,32,24],
		
		["type","cms-btn-black-f"	,41,27+25,32,24],
		["type","cms-btn-white-f"	,75,27+25,32,24],
		["type","cms-btn-blue-f"	,109,27+25,32,24],
		["type","cms-btn-blue2-f"	,143,27+25,32,24],
		["type","cms-btn-green-f"	,177,27+25,32,24],
		["type","cms-btn-yellow-f"	,210,27+25,32,24],
		["type","cms-btn-orange-f"	,245,27+25,32,24],
		["type","cms-btn-red-f"		,279,27+25,32,24],
		["type","cms-btn-pink-f"	,313,27+25,32,24],
		
		["round","cms-btn-round-0"		,40,61+25,46,19],
		["round","cms-btn-round-5"		,86,61+25,46,19],
		["round","cms-btn-round-100"	,132,61+25,46,19],
		
		["size","cms-btn-size-ss"		,46,92+25,27,10],
		["size","cms-btn-size-s"		,76,91+25,32,12],
		["size","cms-btn-size-m"		,112,90+25,42,14],
		["size","cms-btn-size-l"		,158,88+25,52,17],
		["size","cms-btn-size-ll"		,214,85+25,62,21],

		["shadow","cms-btn-shadow-0"		,43,115+25,27,23],
		["shadow","cms-btn-shadow-1"		,73,115+25,27,23],
		["shadow","cms-btn-shadow-5"		,103,115+25,27,23],
		["shadow","cms-btn-shadow-10"		,133,115+25,27,23],
	];
	
	var currentClass = "";
	function addBtnClass(_s){
		var t = _s[0];
		var c = _s[1];
		var a = currentClass.split(" ");
		
		var types = {
			type:"",
			round:"",
			size:"",
			shadow:""
		}
		for (var i = 0; i < a.length ; i++) {
			for (var ii = 0; ii < classList.length ; ii++) {
				if(a[i] == classList[ii][1]){
					var _type = classList[ii][0]
					types[_type] = a[i]
				}
			}
		}
		
		types[t] = c;
		var ss = "";
		for (var n in types) {ss += types[n] + " " }
		setBtnClass(ss);
	}
	function setBtnClass(_c){
		currentClass = _c;
		v.link_class.val(currentClass);
		updateBtnClass();
	}
	function getData(){
		var o = {
			href	: defaultVal(v.link_href.val(),""),
			target	: defaultVal(v.link_tar.val(),""),
			attr	: defaultVal(v.link_attr.val(),""),
			text	: defaultVal(v.link_text.val(),""),
			class_	: defaultVal(v.link_class.val(),""),
			image	: defaultVal(v.link_image.val(),"")
		};
		return o
	}
	function getEmptyData(){
		var o = {
			href	: "",
			target	: "",
			attr	: "",
			text	: "",
			class_	: "",
			image	: ""
		};
		return o
	}
	
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
			callback(getData());
			stageOut()
	}
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback
	var val
	function stageIn(_val,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			val = _val;
			callback = _callback;
			if(isFirst){createlayout();}
			isFirst = false;
			
			view.show();
			update();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}
	function resize(){
		if(isOpen){
		}
	}
	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize,compliteEdit:compliteEdit }
})();

