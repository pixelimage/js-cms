
var BackupTargetView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#BackupTargetView');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		
		var list = [0,1,2,3,4,5];
		var tag = ""
			tag += '<div class="_p _h2">1. ディレクトリの選択</div>';
			tag += '<div class="_dirList _shadow"></div>';
		
		view.html(tag);
		v.dirList = view.find('._dirList')

		loadList();
	}
	
	function setBtn(){
	}
	
	function loadList(_callback){
		BackupCreateView.stageOut();
		var o = {}
			o.action = "readDirList";
			o.dir_name = escape_url(SITE_DIR_PATH);
		var callback = function(json){	
			update(json);
			BackupCreateView.stageIn();
		}
		BackupU.loadAPI(o,callback);
		
		//test
		/*
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: "../../_test/_backup/backup_test_05.json",
			dataType		: 'json',
			success			: callback
		})
		*/
	}
	function checkName(_memo,_path,_name){
		if(_memo.indexOf(",") == -1){
			if(_name.charAt(0) != "_"){
				return "checked";
			} 
		} else{
			var ls = _memo.split(",");
			for (var i = 0; i < ls.length ; i++) {
				if(ls[i] == _path){
					return "checked";
				}
			}
		}
		return "";
	}
	
	var checkViews = [];
	function update(data){
		var dirs = data.dirs;
		var files = data.files;
		var tag = ''
			tag += '<div class="_p">バックアップの対象となるディレクトリを選択してください。</div>';
			tag += '<div class="_p _arrow"><i class="fa fa-arrow-down "></i></div>'
			tag += '<div class="_p"><span class="_icon_dir"></span>/ (サイトディレクトリ)</div>'
		
		var memoList = Storage.Memo.getBK();
		
		for (var i = 0; i <  dirs.length ; i++) {
			if(dirs[i] != ""){
				
				var uid = "_bk_checkD_" + i;
				var name = dirs[i].split("../").join("");
				var checked = checkName(memoList,dirs[i],name);
				
				if(dirs[i]+"/" == CMS_Path.BACKUP.REL) {
					var temp = "";
						temp+= '<div>'
						temp+= '	-- <span class="_icon_dir"></span> {NAME}</label>'
						temp+= '</div>'
						temp = temp.split("{NAME}").join(name);
						temp = temp.split("{PATH}").join(dirs[i]);
					tag += temp;
				} else{
					var temp = "";
						temp+= '<div>'
						temp+= '	<input type="checkbox" id="{ID}" name="checkbox" {CHECKED} data-type="{TYPE}" data-path="{PATH}" value="checked">'
						temp+= '	<label for="{ID}"><span class="_icon_dir"></span> {NAME}</label>'
						temp+= '</div>'
						temp = temp.split("{ID}").join(uid);
						temp = temp.split("{NAME}").join(name);
						temp = temp.split("{PATH}").join(dirs[i]);
						temp = temp.split("{TYPE}").join("dir");
						temp = temp.split("{CHECKED}").join(checked);
					tag += temp;
				}
			}
		}
		
		for (var i = 0; i <  files.length ; i++) {
			if(files[i] != ""){
				
				var uid = "_bk_checkF_" + i;
				// var checked = "checked";
				// if(name.charAt(0) == "_") checked ="";
				var name = files[i].split("../").join("");
				var checked = checkName(memoList,files[i],name);
				
				var temp = "";
					temp+= '<div>'
					temp+= '	<input type="checkbox" id="{ID}" name="checkbox" {CHECKED} data-type="{TYPE}" data-path="{PATH}" value="checked">'
					temp+= '	<label for="{ID}"> {NAME}</label>'
					temp+= '</div>'
					temp = temp.split("{ID}").join(uid);
					temp = temp.split("{NAME}").join(name);
					temp = temp.split("{PATH}").join(files[i]);
					temp = temp.split("{TYPE}").join("file");
					temp = temp.split("{CHECKED}").join(checked);
				tag += temp;
			}
		}
		
		v.dirList.append(tag);
		checkViews = view.find("input")
		checkViews.change(function() {
			BackupCreateView.selectDirUpdate();
			var ls = BackupTargetView.getSelectsFlat();
			Storage.Memo.setBK(ls);
		});
		
	}
	
	function getSelects(){
		var ds = []
		var fs = []
		checkViews.each(function (index, dom) {
			var tar = $(this);
			if(tar.prop("checked")){
				if(tar.data("type") == "dir"){
					ds.push( tar.data("path"))
				}
				if(tar.data("type") == "file"){
					fs.push( tar.data("path"))
				}
			}
		});
		return { dirs: ds.join(",") , files:fs.join(",") };
	}
	function getSelectsFlat(){
		var ss = getSelects();
		var a = []
		if(getSelects().dirs.length > 0){
			a.push(getSelects().dirs);
		}
		if(getSelects().files.length > 0){
			a.push(getSelects().files);
		}
		return a.join(",")
	}
	//BackupTargetView.getSelectsFlat()]
	// Storage.Memo.getBK();
	
	/* ---------- ---------- ---------- */
	
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
	stageIn: stageIn,
	stageOut: stageOut,
	getSelects: getSelects,
	getSelectsFlat: getSelectsFlat
}
})();

