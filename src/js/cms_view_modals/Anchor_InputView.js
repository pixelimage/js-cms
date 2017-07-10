var Anchor_InputView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Anchor_InputView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_InputView,view);
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("window/link","_BASE_")+'</div>'
			tag += '<div class="_title">リンク設定</div>'
		v.header.html(tag);
		
		var tag = "";
			tag += '<table class="_layoutTable">';
			tag += '	<tr>';
			tag += '		<th class="_cellTitle">リンクURL</th>';
			tag += '		<td><input class="_editableNode _link_href _colorAnchor _w400" > ';
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
			tag += '</table>';
		v.body.html(tag);
		v.link_href	 = view.find('._link_href');
		v.link_tar	 = view.find('._link_tar');
		v.link_attr	 = view.find('._link_attr');
		v.input_href_anno = view.find('._input_href_anno');
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
			tag += '<div class="_cms_btn _cms_btn_red _btn_del">リセット</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 設定する</div> ';
		v.footer.html(tag);
		
		setBtn();
	}
		
	function setBtn(){

		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		v.btn_do = view.find('._btn_do');
		v.btn_do.click(function(){ 
			compliteEdit()
		});
		
		v.btn_del = view.find('._btn_del');
		v.btn_del.click(function(){ 
			callback(getEmptyData());
			stageOut();
		});
		
		view.on("click",'._btn_pages',function(){
			Anchor_PageListView.stageIn(function(_val){
				v.link_href.val(_val).keyup();
			})
		});
		view.on("click",'._btn_files',function(){
			var s = v.link_href.val();
			CMS_MainController.openAssetSelectRel("link", s ,function(_val){
				UpdateDelay.delay(function(){
					v.link_href.val(_val).keyup();
				});
			});
		});
		view.on("click",'._target_ref_btn',function(){
			Anchor_TargetListView.stageIn(function(_val){
				v.link_tar.val(_val)
			})
		});
		view.on("keyup",'._link_href',function(){
			updatePathPreview($(this).val());
		});
	}
	
	function updateBtnClass(){}

	function update(){
		var this_ = this;
		
		if(!val) val = {};
		var _url  = defaultVal(val.href,"");
		var _tar  = defaultVal(val.target,"");
		var _attr  = defaultVal(val.attr,"");
		
		if(_url == "")_url = "#";
		
		v.link_href.val(_url)
		v.link_tar.val(_tar)
		v.link_attr.val(_attr)
		
		updatePathPreview()
	}
	function updatePathPreview(){
		var id = v.link_href.val();
		v.input_href_anno.html("リンクURLプレビュー："+CMS_Path.MEDIA.getAnchorPath_deco(id));
	}
	
	/* ---------- ---------- ---------- */
	//class style

	function getData(){
		var vals = {
			href:defaultVal(v.link_href.val(),""),
			target:defaultVal(v.link_tar.val(),""),
			attr:defaultVal(v.link_attr.val(),"")
		};
		return vals
	}
	function getEmptyData(){
		var vals = {
			href:"",
			target:""
		};
		return vals
	}
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		callback(getData());
		stageOut();
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
})();//modal