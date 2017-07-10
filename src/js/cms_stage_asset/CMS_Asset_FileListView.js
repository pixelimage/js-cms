
var CMS_Asset_FileListView 	 = (function(){
	var view;
	var v = {};
	var baseDir = "";
	var targetDir = ""
	
	function init(){
		view = $('#CMS_Asset_FileListView');
		v.root = $("body");
		stageInit();
	}
	
	function createlayout(){

		var tag = "";
			tag += '<div class="_header">';
			tag += '	<span class="_btn_icon _normalList"><i class="fa fa-fw fa-bars" ></i></span>'
			tag += '	<span class="_btn_icon _normalList2"><i class="fa fa-fw fa-list-ul "></i></span>'
			tag += '	<span class="_btn_icon _thumbList"><i class="fa fa fa-fw fa-th-large "></i></span>'
			tag += '	<div class="_right"> '
			// tag += '		<span class="_btn_icon _btn_reload"><i class="fa fa-repeat "></i></span> '
			tag += '	</div>'
			tag += '</div>'
			tag += '<div class="_header2">'
			tag += '	<div class="_btn_parent"><i class="fa fa-level-down fa-rotate-180 "></i> 上階層へ</div>'
			tag += '	<div class=" _sizeList">'
			tag += '		<div class="_btn _brn_S">S</div>'
			tag += '		<div class="_btn _brn_M">M</div>'
			tag += '		<div class="_btn _brn_L">L</div>'
			tag += '	</div>'
			tag += '	<span class="_btn_icon _btn_reload"><i class="fa fa-repeat "></i></span> '
			tag += '</div>'
			tag += '<div class="_body _asset-scroll2"></div>';
			tag += '<div class="_replaceFile"></div>'
			tag += '<div class="_bottom_btns">'
			tag += '	<div class="_btn_add_file"><i class="fa fa-plus-circle "></i> 追加</div>'
			tag += '	<div class="_btn_upload"><i class="fa fa-upload "></i> アップロード</div>'
			tag += '</div>'
		view.html(tag);
		
		v.body 	= view.find('._body');
		v.btn_parent 	= view.find('._btn_parent');
		v.btn_add_file 	= view.find('._btn_add_file');
		v.btn_upload 	= view.find('._btn_upload');
		
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		v.btn_parent	.click(function(){ openParent() });
		v.btn_add_file	.click(function(){ addFile() });
		v.btn_upload	.click(function(){ uploadFile() });
		
		initReload();
		initSize();
		initListType();
	}
	
	/* ---------- ---------- ---------- */
	//リロード
	function initReload(){
		v.btn_reload = view.find('._btn_reload');
		v.btn_reload.click(function(){ updateList()});
		v.btn_parent.hide();
	}
	function updateList(){
		currentFileList.update();
	}
	
	function updateParentBtn(){
		if(currentDir == CMS_Path.SITE.REL){
			v.btn_parent.hide();
		} else{
			v.btn_parent.show();
		}
	}
	
	/* ---------- ---------- ---------- */
	//切替
	function initListType(){
		v.normalList = view.find('._normalList');
		v.normalList2 = view.find('._normalList2');
		v.thumbList = view.find('._thumbList');
		v.normalList.click(function(){ selectListNormal()});
		v.normalList2.click(function(){ selectListNormal2()});
		v.thumbList.click(function(){ selectListThumb()});
		updateListType();
	}
	function selectListNormal(){ updateListType("normal") }
	function selectListNormal2(){ updateListType("normal2") }
	function selectListThumb(){ updateListType("thumb") }
	
	window.asset_selectListNormal = selectListNormal;
	window.asset_selectListNormal2 = selectListNormal2;
	window.asset_selectListThumb = selectListThumb;
	
	function updateListType(_s){
		if(!_s) _s = CMS_Asset_FileListState.getListType();
		CMS_Asset_FileListState.setListType(_s);
		
		//btn
		v.normalList.removeClass("_current");
		v.normalList2.removeClass("_current");
		v.thumbList.removeClass("_current");
		if(_s == "normal")	{ v.normalList.addClass("_current"); }
		if(_s == "normal2")	{ v.normalList2.addClass("_current") }
		if(_s == "thumb")	{ v.thumbList.addClass("_current") }
		if(_s == "thumb")	{ 
			v.sizeList.show()
		} else{
			v.sizeList.hide()
		}
		
		v.root.removeClass("_assetList_normal");
		v.root.removeClass("_assetList_normal2");
		v.root.removeClass("_assetList_thumb");
		v.root.addClass("_assetList_"+_s);
		
		// v.sizeList
		// currentFileList.updateListType();
		for (var i = 0; i < dirs.length ; i++) {
			dirs[i].updateListType();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	function initSize(){
		v.sizeList = view.find('._sizeList')
		v.brn_S = v.sizeList.find('._brn_S')
		v.brn_M = v.sizeList.find('._brn_M')
		v.brn_L = v.sizeList.find('._brn_L')
		
		v.brn_S.click(function(){ setSize("S")});
		v.brn_M.click(function(){ setSize("M")});
		v.brn_L.click(function(){ setSize("L")});
		updateSize();
	}
	function updateSize(){
		setSize(CMS_Asset_FileListState.getSize());
	}
	
	var currentSize;
	function setSize(_s){
		if(currentSize == _s) return;
		currentSize = _s;
		view.removeClass("_S");
		view.removeClass("_M");
		view.removeClass("_L");
		if(_s == "S")view.addClass("_S");
		if(_s == "M")view.addClass("_M");
		if(_s == "L")view.addClass("_L");
		
		v.brn_S.removeClass("_current");
		v.brn_M.removeClass("_current");
		v.brn_L.removeClass("_current");
		if(_s == "S")v.brn_S.addClass("_current");
		if(_s == "M")v.brn_M.addClass("_current");
		if(_s == "L")v.brn_L.addClass("_current");
		CMS_Asset_FileListState.setSize(_s);
	}
	
	/* ---------- ---------- ---------- */
	
	function openParent(){
		var d = URL_U.getParentDir(currentDir);
		CMS_Asset_DirArea.openFile({dir: d ,id:""});
	}
	function addFile(){
		if(currentFileList) currentFileList.addFile();
	}
	function uploadFile(){
		if(currentFileList) currentFileList.uploadFile();
	}
	
	/* ---------- ---------- ---------- */
	//file
	
	var dirs = [];
	var currentFileList;
	var currentDir;
	function openPath(_param){
		if(isFirst) stageIn();
		if(currentFileList) currentFileList.stageOut();
		//
		var b = true;
		for (var i = 0; i <  dirs.length ; i++) {
			if(dirs[i].targetDir == _param.dir) {
				b = false;
				currentFileList = dirs[i]
			}
		}
		if(b){
			var img = new CMS_Asset_FileListClass(v.body,_param.dir,_param.extra);
			dirs.push(img);
			img.stageIn();
			currentFileList = img;
		}
		currentDir = _param.dir;
		currentFileList.stageIn()
		currentFileList.selectFile(_param);
		//
		updateParentBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function resetSelect(_param){
		//ファイルリスト中のクラスのみ削除
		view.find("tr._current").removeClass("_current");
		view.find("._btn_file._current").removeClass("_current");
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			view.show()
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		// selectDir: selectDir,
		openPath: openPath,
		resetSelect: resetSelect,
		
		selectListNormal: selectListNormal,
		selectListNormal2: selectListNormal2,
		selectListThumb: selectListThumb,
		
		uploadFile: uploadFile,
		
		// addParam: addParam
 }
})();