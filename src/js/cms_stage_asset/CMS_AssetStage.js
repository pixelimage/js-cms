
var CMS_AssetStage = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_AssetStage');
		v.bg = $('#CMS_AssetStageBG');
		v.side_bg = $('#CMS_AssetStageSideBG');
		var tag = ''
			tag += '<div id="CMS_Asset_DirArea"></div>';
			tag += '<div id="CMS_Asset_FilesArea"></div>';
			tag += '<div class="_cms_btn_alpha ss_icon asset_full _btn_full_on"></div>';
			tag += '<div class="_cms_btn_alpha ss_icon asset_full_off _btn_full_off"></div>';
			tag += '<div class="_selectHeader">'
			tag += '	<div class="_bg"></div>';
			tag += '	<div class="_title"></div>';
			tag += '	<div class="_path"></div>';
			tag += '	<div class="_cms_btn_alpha _btn_select _cms_anim_zoom"><i class=" fa fa-check "></i> 選択する</div>';
			tag += '	<div class="_cms_btn_alpha _btn_close">キャンセル</div>';
			tag += '</div>';
		view.html(tag);	
	
		CMS_AssetStageClose.init();
		CMS_AssetStageResizeView.init();
		
		initFull();
		initSelectHeader();
		
		stageInit();
		initResize();
		// stageIn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		setBtn();
		
		CMS_Asset_DirArea.init();
		CMS_Asset_FilesArea.init();
		CMS_Asset_DirArea.stageIn();
	}
	
	function setBtn(){
		view.on("mousedown",function(){
			CMS_KeyManager.setType("setting");
		})
		v.bg.click(function(){
			closeAssetSelect();
		});
	}
	
	/* ---------- ---------- ---------- */
	
	function refresh(_path){
		CMS_Asset_DirArea.resetDir();
		openFile({dir:_path,id:""});
	}
	// CMS_AssetStage.refresh("../aa/");
	// CMS_AssetStage.refresh({dir:"../aa/",id:""});

	
	/* ---------- ---------- ---------- */
	//個別処理
	//外からコールされる
	var tID_open;
	function openFile(_param,_delay){

		if(!isOpen) stageIn();
		if(!_delay) _delay = 10;
		CMS_StageController.openAssetStage(true);
		
		//パスのみの場合は、オブジェクトに変換
		if(typeof _param == "string"){
			_param = URL_U.getPageObject(_param);
		}
		//ディレクトリ名を整える
		_param.dir = URL_U.treatDirName(_param.dir);
		
		//外からひらいたとき、わかりやすくするため、ディレイかける
		if(tID_open) clearTimeout(tID_open);
		tID_open = setTimeout(function(){
			CMS_Asset_DirArea.openFile(_param);
		},_delay);
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	//ショートカットSでコール
	function save(){
		if(isOpen){
			CMS_Asset_FileDetailView.save();
		}
	}
	//テキストエディターで開いた時コール
	function openedTextPage(_param){
		CMS_Data.AssetFile.addFile(_param.dir,_param.id);
	}
	//テキストエディターで保存した時コール
	function savedTextPage(_param){
		CMS_Data.update(_param.id , _param.dir);
		CMS_LivePreviewController.savedPage();
	}
		
	/* ---------- ---------- ---------- */
	
	//画像選択や、リンク選択時にコールされる
	
	var SELECT_ADD = "add";
	var SELECT_IMAGE = "image";
	var SELECT_LINK = "link";
	
	var select_type = SELECT_ADD;
	var select_callback;
	
	function openAssetSelect(_type,_path,_callback){
		if(!isOpen) stageIn();
		
		select_type = _type;
		select_callback = _callback;
		$("body").addClass("_modalAsset");
		
		setSelectPath(_path,false);
		v.selectHeader.show();
		
		if(select_type == SELECT_IMAGE ){ 
			v.header_title.html("画像ファイルを選択");
			window.asset_selectListThumb();
		}
		if(select_type == SELECT_LINK ){ 
			v.header_title.html("リンク先ファイルを選択");
			window.asset_selectListNormal2();
		}
		openFile(_path,200);
		CMS_StageController.openSettingSelectStage(true);
	}
	function closeAssetSelect(){
		select_type = SELECT_ADD;
		$("body").removeClass("_modalAsset");
		v.selectHeader.hide();
		CMS_StageController.openAssetStage(false);
		CMS_StageController.openSettingSelectStage(false);
	}
	function addFile2page(_u){
		if(select_type == SELECT_ADD	){ CMS_MainController.addAssetToPage(_u); }
		if(select_type == SELECT_IMAGE 	){ select_callback(_u); }
		if(select_type == SELECT_LINK 	){ select_callback(_u); }
		closeAssetSelect();
	}
	
	/* ---------- ---------- ---------- */
	
	//パスでもparamでも対応
	function openAssetFile(_path){
		openFile(_path,200);
		window.asset_selectListNormal();
	}
	/* ---------- ---------- ---------- */
	
	function initSelectHeader(){
		v.selectHeader = view.find("._selectHeader");
		v.header_title = view.find("._title");
		v.header_path = view.find("._path");
		v.btn_close = view.find("._btn_close");
		v.btn_close.click(function(){
			closeAssetSelect();
		});
		v.header_select = view.find("._btn_select");
		v.header_select.click(function(){ 
			var s = v.header_path.html();
			if(select_callback) select_callback(s);
			closeAssetSelect();
		});
		v.selectHeader.hide();
	}
	
	//詳細画面で開いた時に、こーるされる
	function openedDetailPage(_param){
		var s = _param.dir + _param.id;
		setSelectPath(s,true);
	}
		
	var prevText = ""
	function setSelectPath(_s,_anno){
		var s = URL_U.treatURL(_s);
			s = s.split(CMS_Path.SITE.REL).join("");
		if(prevText == s)return;
		prevText = s;
		v.header_path.html(s).hide().fadeIn(200);
		if(_anno){
			// AnimU.attention({v:v.header_select.find("i"),d:200});
			AnimU.attention({v:v.header_select,d:200});
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//プリセットCSSを表示し、指定したキーに移動する
	function openPresetCSSFile(_key){
		var _param;
		if(ASSET_CSS_DIRS.length > 0){
			_param = URL_U.getPageObject(ASSET_CSS_DIRS[0]);
			_param.extra = { findCss : _key }
		} else {
			_param = { dir : CMS_Path.ASSET.REL + "css/" , id : "" };
		}
		openFile(_param);
		window.asset_selectListNormal();
	}	
	function openTemplateHTMLFile(_file){
		openFile({dir:CMS_Path.ASSET.REL + Dic.DirName.TEMPLATE + "/" , id : _file});
		window.asset_selectListNormal();
	}
	function openMyTagFile(_file){
		openFile({dir:CMS_Path.ASSET.REL + Dic.DirName.MYTAG + "/" , id : _file + ".json"});
		window.asset_selectListNormal();
	}
	function openUploadDir(){
		openFile({
			dir:CMS_Path.UPLOAD.REL,
			id:"",
			extra:{ when_opened:function(){
				setTimeout(function(){
					CMS_Asset_FileListView.uploadFile();
				},200);
			}}
		});
		window.asset_selectListThumb();
	}
	
	function openCMSSetting(_s){
		openFile({dir:CMS_Path.CMS.REL + "setting/" , id : _s });
		window.asset_selectListNormal();
	}
	
	/* ---------- ---------- ---------- */
	//アセットフルスクリーン
	
	function initFull(){
		v.btn_full_on = view.find("._btn_full_on");
		v.btn_full_off = view.find("._btn_full_off");
		v.btn_full_off.hide();
		
		v.btn_full_on.click(function(){
			CMS_StageController.openSettingFull(true);
		});
		v.btn_full_off.click(function(){
			CMS_StageController.openSettingFull(false);
		});
		
		CMS_StageController.registAssetCallback(function(_b){
			if(_b){
				v.btn_full_on.hide()
				v.btn_full_off.show()
			} else{
				v.btn_full_on.show()
				v.btn_full_off.hide()
			}
		})
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
		v.side_bg.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			v.side_bg.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			CMS_KeyManager.setType("setting");
			CMS_AssetStageResizeView.stageIn();
			CMS_AssetStageClose.stageOut();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
			v.side_bg.hide();
			setTimeout(function(){
				CMS_KeyManager.setType("");
			},100);
			CMS_AssetStageResizeView.stageOut();
			CMS_AssetStageClose.stageIn();
		}
	}
	/* ---------- ---------- ---------- */
	
	var _winds = [];
	function initResize(){
		CMS_StageController.registResize(function(){
			for (var i = 0; i < _winds.length ; i++) {
				if(_winds[i]) _winds[i]();
			}
		})
	}
	function registResize(_cs){
		_winds.push(_cs);
	}
	function getH(){
		return view.height();
	}
	/* ---------- ---------- ---------- */
	
	 return {
		init:init,
		stageIn:stageIn,
		stageOut:stageOut,
		
		refresh:refresh,
		openFile:openFile,
		openAssetSelect:openAssetSelect,
		openAssetFile:openAssetFile,
		addFile2page:addFile2page,
		openedDetailPage:openedDetailPage,
		
		openPresetCSSFile:openPresetCSSFile,
		openTemplateHTMLFile:openTemplateHTMLFile,
		openMyTagFile:openMyTagFile,
		openUploadDir:openUploadDir,
		openCMSSetting:openCMSSetting,
		
		openedTextPage: openedTextPage,
		savedTextPage: savedTextPage,
		save: save,
		
		registResize: registResize,
		getH: getH,
	}
})();

if(!USE_SITE_MANAGER){
	var CMS_AssetStage = (function(){
		
		 return {
			init:function(){},
			stageIn:function(){},
			stageOut:function(){},
			
			refresh:function(){},
			openFile:function(){},
			openAssetSelect:function(){},
			openAssetFile:function(){},
			addFile2page:function(){},
			openedDetailPage:function(){},
			
			openPresetCSSFile:function(){},
			openTemplateHTMLFile:function(){},
			openMyTagFile:function(){},
			openUploadDir:function(){},
			openCMSSetting:function(){},
			
			openedTextPage: function(){},
			savedTextPage: function(){},
			save: function(){},
			
			registResize: function(){},
			getH: function(){},
		}
	})();
}

// setTimeout(function(){
// 	CMS_AssetStage.stageIn()
// 	CMS_AssetStage.openFile({dir:"../_____html/_json/",id:"_html_.AAAZZ.json"});
// },1000);
// setTimeout(function(){
// 	CMS_AssetStage.stageIn()
// 	CMS_AssetStage.openFile({dir:"../_____html/css/",id:"site.css"});
// },2000);
// setTimeout(function(){
	// $("body").addClass("_modalAsset");
	// CMS_AssetStage.openFile({dir:"../images/",id:"header_logo.png",extra:{find:"IE 6"}});
	// window.asset_selectListThumb();
	// CMS_AssetStage.openFile({dir:"../__test_file/",id:"test.html",extra:{find:"IE 6"}});
	// CMS_AssetStage.openFile({dir:"../__test_file/brand_site/sb-include/common/subdomain/recommend/",id:"ad-card-register-complete-pc.html"});
		// CMS_AssetStage.openFile({dir:"../aa/",id:""});
// },1500);

