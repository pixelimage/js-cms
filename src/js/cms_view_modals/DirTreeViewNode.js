
var DirTreeViewNode = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_param,_deep,_treeParam) {
	  this.init(_parent,_param,_deep,_treeParam);
	}
	var p = c.prototype;
	
	/* ---------- ---------- ---------- */

	var rootParam

	p.init = function(_parent,_param,_deep,_treeParam) {
		var this_ = this;
		this.parentView = _parent;
		this.treeParam = _treeParam;
		if(_param == null) _param = _treeParam.def;
		this.param = _param;
		this.path = _param.path;
		this.deep = _deep;
		this.v = {}
		
		rootParam  = { 
			path: "../", 
			// name: CMS_Path.SITE.ABS_PATH,
			name: "/ サイトルート",
			w:"1"
		}
		
		if(_deep == 0){
			this.isRoot = true
			if(this.param.path == ""){
				this.param.path = rootParam.path;
				this.param.name = rootParam.name;
			} else{
				this.createView(rootParam);
				this.isSubCreated = true;
				this.subs = [ new DirTreeViewNode(this.v.sub,this.param,1,this.treeParam)];
				return;
			}
		} else{
			this.isRoot = false;
		}
		
		if(this.param["w"] == undefined){
			this.load_dir(this.param.path,function(data){
				data.nodes.sort(function(a, b){
					return ( a.name > b.name ? 1 : -1);
				});
				var a = [];
				var b = [];
				for (var i = 0; i < data.nodes.length ; i++) {
					if(this_.isSettingDir(data.nodes[i].path)){
						var s = this_.getSettingDir(data.nodes[i].path);
						data.nodes[i].label = s.label;
						a.push(data.nodes[i])
					} else{
						b.push(data.nodes[i])
					}
				}
				data.nodes = a.concat(b);
				
				this_.createView(data);
				this_.createSubs(data.nodes);
				this_.openDir()
			});
		} else{
			this_.createView(this.param);
			if(this.param.nodes.length > 0) {
				this.isLoadStart = true;
				this_.createSubs(this.param.nodes);
				this_.openDir();
			}
		}
	}
	
	/* ---------- ---------- ---------- */

	p.isLoadStart = false;
	p.load_dir = function(_path,_callback) {
		var this_ = this;
		this.isLoadStart = true;
		var qDeep = 1
		if(this.deep == 0) qDeep = this.treeParam.initDeep;
		var exs = "";
		if(this.treeParam.extentions !="" ) exs = '&extentions=' + this.treeParam.extentions;
		
		var p = '?action=getDirList';
				p += '&dir_name=' + escape_url(_path);
				p += '&limitDeep=' + qDeep;
				p += '&is_detail=1';
				p += exs
		var url = CMS_Path.PHP_DIRECTORY + p;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'json',
			success			: function(data) { _callback(data)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		})
	}
	
	/* ---------- ---------- ---------- */
	
	p.createView = function(data) {
		var this_ = this;
		
		this.isClickable = true;
		//書き込み権限などチェック
		this.isWritable = (data.w == "1") ? true : false
		if(this.treeParam.showWriteDir == false) this.isWritable = true;
		
		//CMS関連のディレクトリか
		//20160523 いったん削除
		/*
		if(data.path.indexOf(CMS_Path.ASSET.REL) == 0 && data.path != CMS_Path.ASSET.REL) {
			this.isCMSDir = true;
			this.isWritable = false;
			data.w = "0";
		} else{
			this.isCMSDir = false;
		}
		if(this.treeParam.showCMSDir == false) {
			this.isCMSDir = false;
		}
		*/
		
		if(this.isWritable == false){
			if(this.treeParam.isClickNGDir == false){
				this.isClickable = false;	
			}
		}
		
		if(this.isNotHideDir(data.path,this.treeParam.hideDirs) ==false){
			return false;
		}
		
		var cs = ""
		if(this.deep == 0) {
			cs +="_btn_dir _btn_home";
		} else{
			cs +="_btn_dir _btn_dir_{DEEP}";
		}
		if(! this.isWritable) cs +=" _notWrite";
		if(! this.isClickable) cs +=" _noClickable";
		if(data.dirCount == "0") {
			cs +=" _notHasSubDir";
			this.isLoadStart = true;
		}
		if(data.name == "..") data.name = rootParam.name;
		var tag = '';
			tag +='<div class="_node">';
			tag +='	<div class="{CLASS}">';
			if(this.treeParam.showSelectBtn){
				tag +='		<span class="_btn_select" >選択</span>';
			}
			tag +='		<span class="_t1"><span class="{CLASS_ICON}"></span> <span class="_btn_name">{NAME}</span></span>';
			tag +='	</div>';
			tag +='	<div class="_subNode" style="padding: 0 0 0 10px;"></div>';
			tag +='</div>';
			tag = tag.split("{CLASS}").join(cs);
			tag = tag.split("{CLASS_ICON}").join(this.getDirIcon(this.deep,data.path));
			tag = tag.split("{DEEP}").join(this.deep);
			
			var nn = data.name;
			if(data.label){ nn += ' <span class="_label">'+data.label + '</span>';}
			tag = tag.split("{NAME}").join(nn);
			
		//ルートノードは表示しない
		if(this.deep == 0 && this.treeParam.hideRootNode) {
			tag = "";
			tag +='<div class="_node">';
			tag +='	<div class="_subNode"></div>';
			tag +='</div>';
		}
		
		this.view = $(tag);
		this.viewNode = this.view.find("._btn_dir");
		this.parentView.append(this.view);
		this.v.btn_select = this.view.find("._btn_select");
		this.v.btn_select.click(function(){
			this_.selectDirFile()
			return false;
		});
		this.v.btn_dir = this.view.find("._btn_dir");
		this.v.sub = this.view.find("._subNode");
		this.v.btn_dir.click(function(){
			this_.openDirFile(true)
			this_.toggleDir() 
			this_.openDir()
		});
		this.v.btn_dir.hover(
			function(){this_.showAttantion(true)},
			function(){this_.showAttantion(false)}
		);
		this.v.icon_dir = this.view.find("._icon_tree_dir,._icon_setting_dir");
		this.v.icon_dir.click(function(event){
			this_.toggleDir() 
			return false;
		})
	}
	/* ---------- ---------- ---------- */

	p.getDirIcon = function (_deep,_path){
		if(_deep == 0) {
			return "_icon_tree _icon_tree_home";
		} else {
			if(this.isSettingDir(_path)){
				return "_icon_tree2 _icon_tree_dir";
			} else{
				return "_icon_tree _icon_tree_dir";
			}
		}
	}
	p.isSettingDir = function (_path){
		if(! this.treeParam.settingDirs)return false;
		var ds = this.treeParam.settingDirs;
		for (var i = 0; i <  ds.length ; i++) {
			if(_path.indexOf(ds[i].path) == 0) return true;
		} 
		return false;
	}
	p.getSettingDir = function (_path){
		var ds = this.treeParam.settingDirs;
		for (var i = 0; i <  ds.length ; i++) {
			if(_path.indexOf(ds[i].path) == 0) return ds[i];
		} 
		return {};
	}
	/* ---------- ---------- ---------- */
	
	p.isNotHideDir = function(_path ,_dirs) {
		if(!_dirs) return true;
		var b = true;
		for (var i = 0; i <  _dirs.length ; i++) {
			if(_path.indexOf(_dirs[i]) == 0) b = false;
		}
		return b;
	}
	/* ---------- ---------- ---------- */
	p.subs
	p.checkDirName = function(_s) {
		return (_s.match(/[^0-9a-zA-Z_.-]+/) == null) ? true :false;
	}
	p.createSubs = function(dirs) {
		this.subs = []
		for (var i = 0; i < dirs.length ; i++) {
			if(this.checkDirName(dirs[i].name)){
				this.subs.push(new DirTreeViewNode(this.v.sub,dirs[i],this.deep+1,this.treeParam));
			}
		}
		this.isSubCreated = true;
		if(this.subCreatedCallback){
			this.subCreatedCallback();
			this.subCreatedCallback = null;
		}
	}
	p.isSubCreated = false;
	p.subCreatedCallback;
	
	/* ---------- ---------- ---------- */
	//アテンション
	
	p.showAttantion = function(_b) {
		if(this.isWritable )return;
		var xy= {
			x:this.v.btn_dir.offset().left+40,
			y:this.v.btn_dir.offset().top + this.v.btn_dir.height() +5
		}
		
		var ss = '<div class="_attention">書き込み権限がありません。<br><small>FTPソフトなどで、書き込み権限(707など)を設定してください</small></div>'
		//if(this.isCMSDir) ss = '<div class="_attention">CMSの設定ファイル用ディレクトリのため、書き出せません</div>'
		
		if(_b){
			SimpleToolTip.stageIn(xy,ss);
		} else{
			SimpleToolTip.stageOut();
		}
	}
	
	//クリック
	p.openDirFile = function(_clickFlg) {
		if(! this.isClickable)return;
		if(_clickFlg == undefined) _clickFlg = true;
		if(_clickFlg) this.treeParam.callback(this.param,this.view);
		//
		this.resetActive();
		this.treeParam.currentSelect = this;
		this.setActive(true);
	}
	p.resetActive = function() {
		if(this.treeParam.currentSelect){
			this.treeParam.currentSelect.setActive(false)
		}
	}
	
	//右の選択ボタンをクリック
	p.selectDirFile = function() {
		this.treeParam.callback_select(this.param);
	}
	
	p.setActive = function(_b) {
		if(_b){
			this.viewNode.addClass("_current")
		} else{
			this.viewNode.removeClass("_current")
		}
	}
	/* ---------- ---------- ---------- */
	//フォルダ開閉
	
	p.toggleDir = function() {
		if(! this.isClickable)return;
		if(this.isOpen){
			this.closeDir()
		} else{
			this.openDir()
		}
	}
	p.isOpen = false
	p.openDir = function() {
		if(! this.isClickable)return;
		var this_ = this;
		if(this.isLoadStart == false){
			this.load_dir(this.param.path,function(data){
				data.nodes.sort(function(a, b){
					return ( a.name > b.name ? 1 : -1);
				});
				this_.createSubs(data.nodes);
			})
		}
		if(this.v.icon_dir)	this.v.icon_dir.addClass("_open")
		if(this.v.sub)	this.v.sub.show()
		this.isOpen = true;
	}
	p.closeDir = function() {
		if(! this.isClickable)return;
		if(this.v.icon_dir)	this.v.icon_dir.removeClass("_open")
		if(this.v.sub)	this.v.sub.hide()
		this.isOpen = false;
	}
	
	/* ---------- ---------- ---------- */
	
	p.setCurrent = function(_param,_clickFlg) {
		if(_clickFlg == undefined) _clickFlg = true; 
		var this_ = this;
		
		if(this.isSubCreated == false){
			this.subCreatedCallback = function(){
				this_.setCurrent_core(_param,_clickFlg)
			}
		} else{
			this.setCurrent_core(_param,_clickFlg)
		}
	}
	
	p.setCurrent_core = function(_param,_clickFlg) {
		if(_clickFlg == undefined) _clickFlg = true; 
		var _path = _param.dir;
		
		for (var i = 0; i <  this.subs.length ; i++) {
			if(_path == "../") {
				this.param.fileName = _param.id;
				this.param.extra = _param.extra;
				this.openDirFile(_clickFlg);
				return;
			}
			if(_path.indexOf(this.subs[i].path) == 0){
				this.subs[i].openDir();
				this.subs[i].setCurrent(_param,_clickFlg);
			}
			if(_path == this.subs[i].path){
				//値セット
				this.subs[i].param.fileName = _param.id;
				this.subs[i].param.extra = _param.extra;
				this.subs[i].openDirFile(_clickFlg);
				
				//値リセット
				this.subs[i].param.fileName = "";
				this.subs[i].param.extra = "";
				return;
			}
		}
	}
	p.remove = function() {
	}
	return c;
})();


var DirTreeViewU = (function(){
	
	function getTag_filecount(_s){
		if(_s ==undefined) return "";
		return '<b>'+_s+'</b> files';
	}
	return { getTag_filecount:getTag_filecount }
})();

