
var CMS_Asset_DirArea = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_Asset_DirArea');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_header">'
			tag += '	<div class="_btn_close"><i class="fa fa-caret-down "></i></div>';
			tag += '	<div class="_title">ファイルマネージャ</div>'
			tag += '</div>'
			tag += '<div class="_body _asset-scroll">'
			tag += '	<div class="_btn_reload"><i class="fa fa-repeat "></i></div>'
			tag += '	<div class="_replaceDir"></div>'
			tag += '	<div style="margin:20px 0 10px 20px;">'
			tag += 	CMS_GuideU.getGuideTag("window/filemanager","ガイド","dark");
			tag += '	</div>';
			tag += '</div>';
			view.html(tag);
		
		v.replaceDir = view.find("._replaceDir");
		v.body = view.find("._body");
		v.btn_close = view.find("> ._header");
		v.btn_reload = view.find("._btn_reload");
		
		setBtn();
		load_dir();
	}
	
	
	function setBtn(){
		v.btn_close.click(function(){ 
			CMS_StageController.openAssetStage(false);
		});
		v.btn_reload.click(function(){ 
			reload_dir();
		});
	}
	
	/* ---------- ---------- ---------- */
	
	function resetDir(){
		if(dirTree){
			dirTree.remove();
			dirTree = null;
			v.replaceDir.empty();
		}
		load_dir();
	}
	
	/* ---------- ---------- ---------- */
	
	var reload_tID
	function reload_dir(){
		if(dirTree){
			dirTree.remove();
			dirTree = null;
			v.replaceDir.empty()
		}
		if(reload_tID)clearTimeout(reload_tID);
		reload_tID = setTimeout(function(){
			load_dir()
			// if(currentPath){
			// 	openCurrent(currentPath);	
			// }
		},200);
	}
	
	/* ---------- ---------- ---------- */
	var dirTree
	function load_dir(){
		dirTree = new DirTreeViewNode(
			v.replaceDir,null,0,
			{
				initDeep :1,
				def :{ path: "", name: ""},
				showCMSDir :true,
				showWriteDir :true,
				isClickNGDir :true,
				currentSelect :null,
				extentions :"",
				// hideRootNode :true,
				settingDirs :[ 
					{path:CMS_Path.CMS.REL		,label:"CMS管理画面"},
					{path:CMS_Path.UPLOAD.REL	,label:"アップロード"},
					{path:CMS_Path.BACKUP.REL	,label:"バックアップ" },
					{path:CMS_Path.ASSET.REL	,label:"サイト設定" }
				],
				// hideDirs :[ "../__" ],
				// extentions :"png_gif_jpeg_jpg",
				showSelectBtn:false,
				callback:function(s,_view){
					
					//dirクリック時にコールされる
					var param = {
						dir:s.path,
						id:s.fileName,
						extra:s.extra
					}
					CMS_Asset_FilesArea.openPath(param);
					updatePos(_view);
				},
				callback_select:function(s){}
			}
		);
	}
	
	/* ---------- ---------- ---------- */
	
	//スクロール位置を調整
	function updatePos(_view){
		var tarY = _view.offset().top - view.offset().top;
		var scY = v.body.scrollTop();
		
		var b = false;
		if(scY + tarY > scY + v.body.height() ) b = true;
		if(scY + tarY < scY ) b = true;
		//
		if(b) updatePosCore(tarY + scY -50);
	}
	function updatePosCore(_y){
		v.body.delay(200).animate({
			scrollTop:_y
		},{ duration: 200 });
	}
	
	/* ---------- ---------- ---------- */
	//外からコール
	function openFile(_param){	
		dirTree.setCurrent(_param);
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
			if(isFirst){
				CMS_Asset_FilesArea.stageIn();
				createlayout();
			}
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
		resetDir: resetDir,
		openFile: openFile,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();