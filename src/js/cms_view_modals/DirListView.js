var DirListView 		 = (function(){
	var view;
	var v = {};
	var baseDir = "";
	var targetDir = ""
	
	function init(){
		view = $('#DirListView');
		stageInit();
	}
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(DirListView,view);

		var tag = ""
			tag = '<div class="_title">ディレクトリ選択</div>'
		v.header.html(tag);
		
			tag = ""
			tag += '<div class="_read">HTMLファイルの書き出し先ディレクトリを選択してください。</div>'
			tag += '<div style="text-align:right;">'
			tag += '	<div class="_cms_btn-mini _btn_rootDir_reload" style="margin:0 0 10px 0;"><i class="fa fa-repeat "></i> リスト更新</div>'
			tag += '</div>'
			tag += '<div class="_replaceDir _dirTreeView "></div>'

		v.body.html(tag);
		
		v.replaceDir = view.find('._replaceDir');
		v.tagetPath = view.find('._tagetPath');
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		v._btn_close = view.find('._btn_close');
		setBtn();
	}
	
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		v.btn_rootDir_reload = view.find('._btn_rootDir_reload');
		v.btn_rootDir_reload.click(function(){ reload_dir() });
		v.btn_rootDir_reload.hide()
	}
	
	/* ---------- ---------- ---------- */
	//dir
	var reload_tID
	function reload_dir(){
		v.btn_rootDir_reload.hide()
		if(dirTree){
			dirTree.remove();
			dirTree = null;
			v.replaceDir.empty()
		}
		if(reload_tID)clearTimeout(reload_tID);
		reload_tID = setTimeout(function(){
			load_dir()
			if(currentPath){
				openCurrent(currentPath);	
			}
		},200);
	}
	var dirTree;
	function load_dir(){
		dirTree = new DirTreeViewNode(
			v.replaceDir,null,0,
			{
				initDeep :1,
				def :{ path: "", name: ""},
				showCMSDir :true,
				showWriteDir :true,
				isClickNGDir :false,
				currentSelect :null,
				extentions :"",
				settingDirs :[ 
					{path:CMS_Path.CMS.REL		,label:"CMS管理画面"},
					{path:CMS_Path.UPLOAD.REL	,label:"アップロード"},
					{path:CMS_Path.BACKUP.REL	,label:"バックアップ"},
					{path:CMS_Path.ASSET.REL	,label:"サイト設定"}
				],
				callback:function(s){},
				showSelectBtn:true,
				callback_select:function(s){
					openDir(s.path);
				}
			}
		);
		v.btn_rootDir_reload.show()
	}
	var currentSelectFile
	var tID;
	var currentPath;
	function openCurrent(_currentDir){
		currentPath = _currentDir
		var s = CMS_Path.SITE.REL + _currentDir;
			s = URL_U.getBaseDir(s.split("//").join("/"));	
		dirTree.setCurrent({dir:s,id:""},false);
	}
	function openDir(_d){
		var _dir = URL_U.treatDirName(_d.split("../").join("/"))
		UpdateDelay.delay(function(){
			stageOut();
			UpdateDelay.delay(function(){
				callback(_dir);
			});
		});
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(_val,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback;
			if(isFirst){
				createlayout();
				load_dir();
			}
			openCurrent(_val);
			isFirst = false;
			view.show()
			resize();
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
	return { init:init, stageIn:stageIn, stageOut:stageOut,
	resize:resize
 }
})();//modal