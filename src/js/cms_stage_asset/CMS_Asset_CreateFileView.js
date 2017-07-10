
var CMS_Asset_CreateFileView = (function(){
	var view;
	var v = {};
	
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_Asset_CreateFileView');
		
		var tag = ''
			tag += '<div class="_btn_close"><i class="fa fa-lg fa-times-circle "></i> </div>'
			tag += '<div class="_body">'
			tag += '	<div class="_dir_area">'
			tag += '		<div class="_title"><span class="_icon_dir"></span> ディレクトリを追加</div>'
			tag += '		<input type="text" placeholder="ディレクトリ名を入力" value="">'
			tag += '		<div class="_cms_btn _cms_btn_disable _btn_add_dis">追加する</div>'
			tag += '		<div class="_cms_btn _cms_btn_active _btn_add">追加する</div>'
			tag += '		<div class="_atten"></div>'
			tag += '	</div>'
			tag += '	<div class="_file_area">'
			tag += '		<div class="_title"><i class="fa fa-fw fa-file-text"></i> ファイルを追加</div>'
			tag += '		<input type="text" placeholder="ファイル名を入力" value="">'
			tag += '		<div class="_cms_btn _cms_btn_disable _btn_add_dis">追加する</div>'
			tag += '		<div class="_cms_btn _cms_btn_active _btn_add">追加する</div>'
			tag += '		<div class="_atten"></div>'
			tag += '	</div>'
			tag += '</div>'
		view.append(tag);
		
		v.btn_close = view.find('._btn_close');
		
		v.file_input = view.find("._file_area input");
		v.file_input.keyup(function(){ keyup(); })
		v.file_btn_add_dis = view.find("._file_area ._btn_add_dis");
		v.file_btn_add = view.find("._file_area ._btn_add");
		v.file_atten = view.find('._file_area ._atten');
		
		v.dir_input = view.find("._dir_area input");
		v.dir_input.keyup(function(){ keyup(); })
		v.dir_btn_add_dis = view.find("._dir_area ._btn_add_dis");
		v.dir_btn_add = view.find("._dir_area ._btn_add");
		v.dir_atten = view.find('._dir_area ._atten');
		
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
	}
	
	function setBtn(){
		v.btn_close.click(function(){ stageOut() });
		v.file_btn_add.click(function(){ file_add(); });
		v.dir_btn_add.click(function(){ dir_add(); });
		registAssetFloatView(function(){stageOut()});
	}
	
	
	/* ---------- ---------- ---------- */
	//個別処理
	var callback
	function update(_fileListClass,_callback){
		callback = _callback;
		checkFileNameInit(_fileListClass);
		
		v.file_btn_add.hide()
		v.file_btn_add_dis.show()
		v.file_input.val("").keyup();
		v.dir_input.val("").keyup();
	}
	
	function keyup(){
		keyup_file()
		keyup_dir()
	}
	function keyup_file(){
		var s = v.file_input.val();
		var errs = []
		var b = false;
		if(s){
			var e = CMS_Asset_UploadU.checkFileName(s);
			if(e) errs.push(e);
			if(checkFileName(s)){
				errs.push('<i class="fa fa-exclamation "></i> 同名ファイルが存在します。')
			} else{
				b = true;
			}
		}
		if(b){
			v.file_btn_add.show()
			v.file_btn_add_dis.hide()
			v.file_atten.html("");
		} else{
			v.file_btn_add.hide()
			v.file_btn_add_dis.show()
		}
		if(errs.length == 0){
			v.file_atten.html("");
		} else{
			v.file_atten.html(errs.join(""));
		}
	}
	function keyup_dir(){
		var s = v.dir_input.val();
		var errs = []
		var b = false;
		if(s){
			var e = CMS_Asset_UploadU.checkFileName(s);
			if(e) errs.push(e);
			if(checkFileName(s)){
				errs.push('<i class="fa fa-exclamation "></i> 同名ファイルが存在します。')
			} else{
				b = true;
			}
		}
		if(b){
			v.dir_btn_add.show()
			v.dir_btn_add_dis.hide()
			v.dir_atten.html("");
		} else{
			v.dir_btn_add.hide()
			v.dir_btn_add_dis.show()
		}
		if(errs.length == 0){
			v.dir_atten.html("");
		} else{
			v.dir_atten.html(errs.join(""));
		}
	}
	
	/* ---------- ---------- ---------- */
	
	function file_add(){
		if(window.isLocked(true))return;
		var s = v.file_input.val();
		if(s){ callback ("file",s); }
		stageOut();
	}
	function dir_add(){
		if(window.isLocked(true))return;
		var s = v.dir_input.val();
		if(s){ callback ("dir",s); }
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var currentFilenames;
	function checkFileNameInit(_fileListClass){
		currentFilenames = _fileListClass.getCurrentFilelist();
	}
	function checkFileName(_s){
		for (var i = 0; i <  currentFilenames.length ; i++) {
			if(_s == currentFilenames[i]) return true;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_fileListClass,_callback){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
			update(_fileListClass,_callback);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();


var CMS_Asset_RenameFileView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_Asset_RenameFileView');
		
		var tag = ''
			tag += '<div class="_btn_close"><i class="fa fa-lg fa-times-circle "></i> </div>'
			tag += '<div class="_body">'
			tag += '	<div class="_title">変更後の名称を入力</div>'
			tag += '	<input type="text" placeholder="ファイル名を入力" value="">'
			tag += '	<div class="_cms_btn _cms_btn_disable _btn_rename_dis">変更する</div>'
			tag += '	<div class="_cms_btn _cms_btn_active _btn_rename">変更する</div>'
			tag += '	<div class="_atten"></div>'
			tag += '</div>'
		view.append(tag);
		
		v.btn_close = view.find('._btn_close');
		
		v.input = view.find(" input");
		v.input.keyup(function(){ keyup(); })
		v.btn_rename_dis = view.find(" ._btn_rename_dis");
		v.btn_rename = view.find(" ._btn_rename");
		v.atten = view.find(' ._atten');
		
		
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
	}
	
	function setBtn(){
		v.btn_close.click(function(){ stageOut() });
		v.btn_rename.click(function(){ rename(); });
		registAssetFloatView(function(){stageOut()});
	}
	
	
	/* ---------- ---------- ---------- */
	//個別処理
	var callback
	var defName = ""
	function update(_fileListClass,_name,_callback,_pos){
		callback = _callback;
		checkFileNameInit(_fileListClass);
		defName = _name;
		v.btn_rename.hide()
		v.btn_rename_dis.show()
		v.input.val(defName).keyup();
		
		if(_pos){
			
		}
	}
	
	function keyup(){
		var s = v.input.val();
		var errs = []
		var b = false;
		
		if(s != defName){
			if(s){
				var e = CMS_Asset_UploadU.checkFileName(s);
				if(e) errs.push(e);
				if(checkFileName(s)){
					errs.push('<i class="fa fa-exclamation "></i> 同名ファイルが存在します。')
				} else{
					b = true;
				}
			}
		}
		if(b){
			v.btn_rename.show()
			v.btn_rename_dis.hide()
			v.atten.html("");
		} else{
			v.btn_rename.hide()
			v.btn_rename_dis.show()
		}
		if(errs.length == 0){
			v.atten.html("");
		} else{
			v.atten.html(errs.join(""));
		}
	}
	/* ---------- ---------- ---------- */
	
	function rename(){
		if(window.isLocked(true))return;
		var s = v.input.val();
		if(s){ callback (s); }
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var currentFilenames;
	function checkFileNameInit(_fileListClass){
		currentFilenames = _fileListClass.getCurrentFilelist();
	}
	function checkFileName(_s){
		for (var i = 0; i <  currentFilenames.length ; i++) {
			if(_s == currentFilenames[i]) return true;
		}
		return false;
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_fileListClass,_name,_callback,_pos){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
			update(_fileListClass,_name,_callback,_pos);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();



