
var TreeAPI_SITE_DIR = "_*_";
var TreeAPI_NOT_MATCH_TEXT = "未定義";
//TreeAPI
var TreeAPI = (function(){ 


	//ノード種類
	var TYPE = {
		DIR 	: "dir",
		PAGE 	: "page",
		ADD 	: "add",
		HTML	: "html"
	};
	
	//置き換えタグ定義
	var ReplaceData = [
		{ id: "{HOME}", 	text:function(){return ROOT + 'index.html'} },
		{ id: "{ID}", 		text: function(_o){ return _o.id }},
		
		{ id: "{NAME}", 	text: function(_o){ return _o.name }},
		{ id: "{NAME[0]}", 	text: function(_o){ return U_.getSplitTextAt(_o.name,0)}},
		{ id: "{NAME[1]}", 	text: function(_o){ return U_.getSplitTextAt(_o.name,1)}},
		{ id: "{NAME[2]}", 	text: function(_o){ return U_.getSplitTextAt(_o.name,2)}},
		{ id: "{NAME[3]}", 	text: function(_o){ return U_.getSplitTextAt(_o.name,3)}},
		{ id: "{NAME[4]}", 	text: function(_o){ return U_.getSplitTextAt(_o.name,4)}},
		{ id: "{NAME.noTag}", text: function(_o){ return treatTag(U_.getSplitTextAt(_o.name,0)) }},
		
		{ id: "{HTML}", 	text: function(_o){ return _o.html }},
		{ id: "{HREF}", 	text: function(_o){ return _o.href }},
		{ id: "{TAR}", 		text: function(_o){ return _o.target }},
		
		{ id: "{TAG}", 		text: function(_o){ return _o.tag }},
		{ id: "{READ}", 	text: function(_o){ return _o.read }},
		{ id: "{DATE}", 	text: function(_o){ return _o.date }},
		
		{ id: "{LEVEL}",	text: function(_o){ return _o.level }},
		{ id: "{SUM}",		text: function(_o){ return _o.sum }},
		{ id: "{NO}",		text: function(_o){ return _o.no }},
		
		{ id: "{CSS.B}", 	text: ' _btn_default ' },
		{ id: "{I.D}", 		text: '<i class="fa fa-folder "></i> ' }, 
		{ id: "{I.D2}", 	text: '<i class="fa fa-folder-open "></i> ' }, 
		{ id: "{I.P}", 		text: '<i class="fa fa-caret-right "></i> ' },
		{ id: "{I.P2}", 	text: '<i class="fa fa-chevron-circle-right "></i> ' },
		{ id: "{I.P3}", 	text: '<i class="fa fa-angle-right "></i> ' },
		{ id: "{I.T}", 		text: '<i class="fa fa-tag "></i> ' },
		{ id: "{I.B}",		text:function(_o){ var s = ' <i class="fa fa-external-link-square "></i> '; if(_o.target != "_blank") s = ""; return s; }}

	]
	
	//タグ削除
	function treatTag(_s){
	 	return _s.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
	}
	
	//テンプレートテキスト
	var Template = {};
		Template.Tag = {
			parent_start	:"<ul {}>\n",
			child_start		:"<li {}>",
			child_end		:"</li>\n",
			parent_end		:"</ul>\n"
		};
		//パラーメータで、ClassNameの有無を指定し、取得
		Template.ClassName = (function(){
			var def = {
				clearfix 	: "clearfix",
				current 	: "_current",
				ownCurrent 	: "_ownCurrent",
				hasSub 		: "_hasSub",
				underconst 	: "_underconst",
				toggle 		: "_type-dir-toggle",
				
				type 		: "_type-{}",
				level 		: "_level-{}",
				no 			: "_no-{}",
				sum 		: "_sum-{}"
				
			};
			var state 
			function setState(_state){
				state = _state;
			}
			function getList(){
				var o = {}
				for (var n in def) {
					o[n] = def[n]
				}
				if(state){
					if(state.clearfix === false) 	o.clearfix = "";
					if(state.current === false) 	o.current = "";
					if(state.ownCurrent === false) 	o.ownCurrent = "";
					if(state.hasSub === false) 		o.hasSub = "";
					if(state.underconst === false) 	o.underconst = "";
					
					if(state.type === false) 		o.type = "";
					if(state.level === false) 		o.level = "";
					if(state.no === false) 			o.no = "";
					if(state.sum === false) 		o.sum = "";
				}
				return o;
			}
			return {
				setState: setState,
				getList: getList
			}
		})();

	//デフォルトのPAGEノードの拡張子
	var Extension = ".html"
	
	

	//メインクラス
	var TreeData = (function() {
		/* ---------- ---------- ---------- */
		var c = function(_def,b_) {
		  this.init(_def,b_);
		};
		var p = c.prototype;
		
		/* ---------- ---------- ---------- */
		
		p.init = function(_def,b_) {
		
			if(_def === undefined) _def = {};
			
			this._isRoot = false;
			if(b_ === undefined) this._isRoot = true;
			
			this.state = "";
			this.isHide = false;
			this.isHideMenu = false;
			this.isUnderConst = false;
			this.isNotPublic = false;
			
			this.type = TYPE.DIR;
			this.id = "";
			this.tag = "";//タグ カンマで区切る
			this.read = "";//リード
			this.date = "";//日付
			
			this.name = "";
			this.html = "";
			this.url = "";
			this.dir = "";
			this.dir_rel = "";
			this.href = "";//最終的なリンクパス
			this.target = "";
			this.custom_a = "";
			
			this._isCurrent = false;//現在のノード
			this._ownCurrent = false;//現在のノードを含む、上位のノード
	
			this._isOpenMenu = false;//メニューを開いておくか
			this._isToggleMenu = false;//トルグメニューにしておくか
			
			this._level = 0;//階層
			this._no = 0;//階層
			this._path = "";//currentを特定するときに使う
			this._path_dir = "";//currentを特定するときに使う
			
			this._template = ""//テンプレート
			
			//後処理
			this.setInitData(_def);
			
			this.update();
		};
		/* ---------- ---------- ---------- */
		//初期値セット
		
		p.setInitData = function(_def) {
			//初期値セット
			for (var n in _def) {
				var b = true;
				if(n === "list") b = false;
				if(b) this[n] = _def[n];
			};
			
			//リンクセット
			if(this["custom_a"] !== undefined){
				if(this.custom_a.indexOf(",")!= -1){
					var us = this.custom_a.split(",");
						this.url = us[0];
						this.target = us[1];
				} else{
					this.url = this.custom_a;
				}
			}
			
			//ディレクトリセット
			this.dir = URL_U.treatDirName(this.dir);
			this.dir_rel = this.dir;
			if(this.dir == ""){
				this.dir = html_dir_abs;
				this.dir_rel = html_dir;
			} else{
				this.dir_rel = ROOT + this.dir_rel;
				if(this.dir_rel == "..//") this.dir_rel = "../";
				if(this.dir_rel.charAt(this.dir_rel.length-1) != "/") this.dir_rel = this.dir_rel +"/"
			}
			
			//公開ステート
			if(this.state == undefined ) this.state = "0,0,0";
			var ss = this.state.split(",");
			this.isHide 	 = (ss[0] == "1")? true:false;
			this.isHideMenu  = (ss[1] == "1")? true:false;
			this.isUnderConst  = (ss[2] == "1")? true:false;
			
			//公開出力してなければ、非表示に
			if(this.type ==TYPE.PAGE){
				if(this["publicDate"] !== undefined){
					if(this.publicDate == "-") {
						this.isNotPublic = true;
					}
				}
				//isHideではなく、プレビューでは表示できるように、isHideMenu
				if(this.isNotPublic) {
					//外部リンク設定してたら表示
					if(this.custom_a == ""){
						this.isHide = true;
					}
				}
			}
			//リンクセット
			if(this.url === ""){
				if(this.type != TYPE.DIR){
					this.url = this.id + Extension;
				} else{
					this.url = DIR_CODE;
				}
			}
			//下階層セット
			if(_def["list"] !== undefined){
				this.list = [];
				var _l = _def["list"];
				
				for (var i = 0; i <  _l.length ; i++) {
					if(_l[i] !== undefined){
					var nn = new TreeData( _l[i],true);
					if(nn.isHide === false){
						this.list.push(nn);
					}
					}
				}
			}
			
			this._sum = 0;
			if(this.type ==TYPE.DIR){
				var cc = 0 
				for (var i = 0; i <  this.list.length ; i++) {
					if(this.list[i].type == TYPE.PAGE){
						if(this.list[i].isHideMenu === false){
							cc ++
						}
					}
				}
				this._sum = cc; 
			}
			
		};
		/* ---------- ---------- ---------- */
		/* ---------- ---------- ---------- */
		/* ---------- ---------- ---------- */
		//upadte
		
		p.update = function(){
			this.clucuURL();
			this.setTreePath();
		};
		
		/* ---------- ---------- ---------- */
		//ディレクトリのリンクセット
		var DIR_CODE = "__DIR__";
		p.clucuURL = function(){
			if(this.type !== TYPE.DIR) return;
			if(this["list"] === undefined)return;
			node = this;
			for (var i = 0; i < this.list.length ; i++) {
				var tree = this.list[i];
				if(tree.url === DIR_CODE){
					if(tree.list.length > 0){
						var a = this._findURL(tree.list);
						if(a === null){
							tree.url = ""
							tree.dir_rel = ""
						} else{
							tree.url = a[0];
							tree.dir_rel = a[1];
						}
					} else{
						tree.url = ""
						tree.dir_rel = ""
					}
				}
				//最終的なパスの生成
				tree.href = U_.meargePath(tree.url,tree.dir_rel);
				if(tree.href == "") tree.href = "#";
			}
		}
		p._findURL = function(list){
			//if(list === undefined) return;
			var u = null;
			for (var i = 0; i < list.length ; i++) {
				if(list[i].url === DIR_CODE ){
					if(list[i].list.length > 0){
						var a = this._findURL(list[i].list);
						list[i].url = a[0];
						list[i].dir_rel = a[1];
					}
				}
				var b = true;
				if(u !== null) b = false;
				if(list[i].url === "") b = false;
				if(list[i].isUnderConst) b = false;
				//if(list[i].isHideMenu) b = false;
				if(list[i].type == TYPE.HTML) b = false;
				if(b) u = [list[i].url,list[i].dir_rel];
			}
			return u;
		};
		
		//ツリーパスの設定
		p.setTreePath = function(_path) {
			_path = (_path !== undefined) ? _path :"";
			if(this._isRoot){
				this._setTreePath_core(_path);
				this._setTreePathDir_core(_path);
			}
		};
		p._setTreePath_core = function(_path) {
			this._path = _path+"/"+this.id;
			if(this["list"] !== undefined){
				for (var i = 0; i < this.list.length ; i++) {
					var tree = this.list[i];
						tree._setTreePath_core(this._path);
				}
			}
		};
		p._setTreePathDir_core = function(_path) {
			this._path_dir = _path+" "+this.id + ":" + this.dir;
			if(this["list"] !== undefined){
				for (var i = 0; i < this.list.length ; i++) {
					var tree = this.list[i];
						tree._setTreePathDir_core(this._path_dir);
				}
			}
		};
		
		
		/* ---------- ---------- ---------- */
		//Tree操作
		// p.getTreeByID = function(_id,_def) {
		// 	return DataU.getTreeByID(this , _id,_def);
		// };
		
		//Treeを追加
		p.addSubTree = function(_tree) {
			this.initList();
			this.list.push(_tree);
			this.update()
		};
		
		//listに追加
		p.addList = function(_tree) {
			if(_tree == undefined) return;
			this.initList();
			this.list = this.list.concat(_tree.list);
			this.update();
		};
		p.initList = function() {
			if(this["list"] === undefined) this.list =[];
		};
		
		//IDで指定したノードの親グループIDを返す
		/*
		p.getCurrentGloupID = function(_id) {
			var tree = DataU.getTreeAliasByID(this , _id);
			if(tree === null) return "";
			var ps = tree._path.split("/");
			for (var i = 0; i <  ps.length ; i++) {
				if(ps[i] !== "") {
					return ps[i];
				}
			}
			return "";
		}*/
	
		/* ---------- ---------- ---------- */
		/* ---------- ---------- ---------- */
		/* ---------- ---------- ---------- */
		//メニュータグ取得
		
		p.getMenuTag = function(_op, _deep) {
			_op.clucu();
			this.setCSS(_op.css);
			this.setCurrent(_op.currentID,_op.currentDIR);
			return this._getMenuTag_core(_op);
		};
		p._getMenuTag_core = function(_op) {
			if(_op === undefined) _op = new MenuOption();
			var tag = "";
			var tb = DataU.getTab(this._level);
		
			var list = this.list;
			var leng = list.length;
			
			var _TG = Template.Tag;
			var child_s = _TG.child_start;
			var child_e = _TG.child_end;
			var parent_s = _TG.parent_start;
			var parent_e = _TG.parent_end;
			
			var bodyTag = "";
			var count = 0;
					
			for (var i = 0; i < leng; i++) {
				var tree = list[i];
					tree._level = this._level + 1;
					tree._no = count+1;
				
				//ディレクトリの深さで制限
				var b = true;
				if(_op.onlyCurrent === true){
					if(tree._ownCurrent === false) {
						if(this._level === 0) b = false;
					}
				}
				if( _op.isMatchType(this._level,tree.type) === false) {
					b = false;
				}
				
				//メニュー非表示
				if(tree.isHideMenu) b = false;
				if(tree.type == "page" && count >= _op.limitSub) b = false;
				if (b) {
					tree._isOpenMenu = (_op._isOpenMenu(this._level, "isOpen")) ? false : true;
					tree._isToggleMenu = _op.useToggle;
					bodyTag += tb + child_s.split("{}").join(DataU.getLI_Attr(count, tree));
					bodyTag += tree._getMenuTagTree(_op);
					
					//下層をレンダリングするか
					if(! DataU.isHideDir(tree) || tree._isToggleMenu){
					bodyTag += tree._getMenuTagDir(_op);
					}
					if (tree.hasSubTree()) bodyTag += tb;
					bodyTag += child_e;
					count++;
				}
			}
			
			tag += "\n" + tb + parent_s.split("{}").join(DataU.getUL_Attr(this,count) );
			tag += bodyTag;
			tag += tb + parent_e;
			tag = tag.split(TreeAPI_SITE_DIR+"/").join(TreeAPI_SITE_DIR)
			//</UL>
			return tag;
		};
		
		//下階層のタグ取得
		p._getMenuTagDir = function(_op) {
			var tag = "";
			if (!this.hasSubTree()) return tag;
	
			//どの階層までレンダリングするか
			var b = false;
			// if (_op.isOpenCurrentTree) {
			// 	if (this._isCurrent) b = true;
			// 	if (this._ownCurrent) b = true;
			// }
			if (_op.isOverLevelEnd(this._level) === false) {
			 	b = true;
			}
			if (b) tag += this._getMenuTag_core(_op);
			return tag;
		}
		
		//ノードのタグ取得
		p._getMenuTagTree = function(_op) {
			var tag = "";
			if (this._level >= 1) {
				var t = this.type;
				this._template = _op.getLevelVal(this._level - 1,this.type,null);
				tag += DataU.doTemplate(this);
			}
			return tag;
		}
		
		/* ---------- ---------- ---------- */
		
		p.setCSS = function(_css) {
			Template.ClassName.setState(_css);
		}
		/* ---------- ---------- ---------- */
		
		//パンくずタグ
		p.getBreadList = function(_id,_dir,_o) {
			var b = false;
			if(_id == "") b = true;
			if(_id == "index" && _dir == "/") b = true;
			this._template = _o.home;
			if(b) return DataU.doTemplate(this);
			
			if(_dir == undefined) _dir = "";
			if(_dir == "") _dir = html_dir_abs;
			
			var _tree = DataU.getTreeAliasByID(this,_id,_dir);
			
			if(_tree === null) return ""
			var s = _tree._path_dir;
			var breds = [];
			var add = "";
			var list = s.split(" ");
			for (var i = 0; i <  list.length ; i++) {
				if(list[i] !== ""){
					var dd = list[i].split(":");
					var id = dd[0];
					var dir = dd[1];
					var res = DataU.getTreeAliasByID(this,id,dir)
					if(res !== null){
						breds.push(DataU.getTreeAliasByID(this,id,dir))
					}
				}
			}
			//
		 	var tags = [];
				this._template = _o.home;
				tags.push(DataU.doTemplate(this));
			for (var i = 0; i < breds.length ; i++) {
				var temp = ""
				if(_id === breds[i].id){
					temp = _o.current;
				} else{
					temp = _o.node;
				}
				breds[i]._template = temp;
				tags.push(DataU.doTemplate(breds[i]));
			}
			var tag = tags.join(_o.delimiter);
			tag = tag.split(TreeAPI_SITE_DIR+"/").join(TreeAPI_SITE_DIR)
			return tag;
		}
		
		/* ---------- ---------- ---------- */
		//パスを指定すると、マッチするノードをisCurrentとして設定する
		var currentPath = "";
		p.setCurrent = function(_currentID,_currentDIR) {
			currentPath = "";
			this._setCurrent_core(_currentID,_currentDIR);
			this._setOwnCurrent(_currentID);
		}
		p._setCurrent_core = function(_currentID,_currentDIR) {
			this._isCurrent = false;
			var b = false;
			if (this.id === _currentID && this.dir === _currentDIR) b = true;
			if (this.type == TYPE.DIR) b = false;// ディレクトリの場合は、スルー
			
			if (this.id === "") b = false;
			if (_currentID === "") b = false;
			if (b) {
				currentPath = this._path;
				this._isCurrent = true;
			}
			if (this.hasSubTree()) {
				for (var i = 0; i < this.list.length; i++) {
					this.list[i]._setCurrent_core(_currentID,_currentDIR);
				}
			}
		}
		p._setOwnCurrent = function(_current) {
			var b = false
			if(this.type === TYPE.DIR) b = true;
			if(this.type === TYPE.PAGE) b = true;
			if(b == false) return;
			//
			var b = false;
			if (currentPath.indexOf(this._path + "/") === 0) {
				//階層が違う場合にown設定
				var r1 = currentPath.split("/").length;
				var r2 = this._path.split("/").length;
				if(r1 != r2) b = true;
				//完全一致であれば、true
				if(currentPath === this._path) b = true;
			}
			this._ownCurrent = b;
			//
			if (this.hasSubTree()) {
				for (var i = 0; i < this.list.length; i++) {
					this.list[i]._setOwnCurrent(_current);
				}
			}
		}
		
		/* ---------- ---------- ---------- */
	
		p.hasSubTree = function () {
			if (this.type === TYPE.DIR){
				//if(this.list === undefined) return false;
				if (this.list.length > 0){
					return true;
				}
			}
			return false;
		}
		return c;
	})();
	

	var BreadListOption = (function() {
		/* ---------- ---------- ---------- */
		var c = function() {
			this.init();
		};
		var p = c.prototype;
		/* ---------- ---------- ---------- */
		p.home;
		p.node;
		p.current;
		p.delimiter;
		
		p.init = function() {
			this.home = '<a href="{HOME}">HOME</a>';
			this.node = '<a href="{URL}">{NAME}</a>';
			this.current = '<b>{NAME}</b>';
			this.delimiter = ' &gt; ';
		};
		return c;
	})();
	
	var MenuOption = (function() {
		/* ---------- ---------- ---------- */
		var c = function() {
			this.init();
		};
		var p = c.prototype;
		/* ---------- ---------- ---------- */
		
		p.init = function() {
			//curren
			this.currentID = "";
			this.currentDIR = "";
			
			//開閉メニューにするか
			this.useToggle = false;
			
			//currentのディレクトリを開いておくか
			// this.isOpenCurrent = false;
			
			//currentのディレクトリのみ表示するか
			//他のディレクトリは、表示しない
			this.onlyCurrent = false;
			
			//
			this.limitSub = "";
			
			//20150416
			this.css = {};
			this.css.clearfix  = true;
			this.css.current  = true;
			this.css.ownCurrent = true;
			this.css.hasSub  = true;
			this.css.underconst = true;
			
			this.css.type 	 = true;
			this.css.level 	 = true;
			this.css.no 	 = true;
			this.css.sum 	 = true;
			
			//階層ごと
			this.levels = null;
		};
		
		p.clucu = function (){
			var cnt = 0;
			var ls = this.levels;
			var b = true;
			if(ls == undefined) ls = [];
			for (var i = 0; i < ls.length; i++) {
				if (b) {
					if (ls[i].isShow) {
						cnt++;
					} else {
						b = false;
					}
				}
			}
			// this.levelEnd = this.levels.length;
			this.levelEnd = cnt;
			if (this.currentDIR == "") this.currentDIR = html_dir_abs;
			this.currentDIR = URL_U.treatDirName(this.currentDIR);
		};
		
		/* ---------- ---------- ---------- */
	
		p._isOpenMenu = function (_level){
			var b = false;
			if(this.levels[_level] === undefined) return b;
			if(this.levels[_level]["isOpen"] === undefined) return b;
			b = this.getLevelVal(_level,"isOpen",false);
			return b;
		};
		p.isMatchType = function (_level,_type){
			if(this.levels[_level] === undefined) return false;
			if(this.levels[_level][_type] === undefined) return false;
			return true;
		};
		p.getLevelVal = function(_lv,_type,_def){	
			var _levels = this.levels;
			var lv = _lv;
			var s = _def;
			if(_levels.length > lv){
				s = _levels[lv][_type];
			} else{
				s = _levels[_levels.length-1][_type];
			}
			return s;
		};
		p.isOverLevelEnd = function (_l){
			if(this.levelEnd <= _l) {
				return true;
			} else{
				return false;
			}
		};
		
		return c;
	})();
	


	/* ---------- ---------- ---------- */
	
	var DataU = (function(){
		
		var TAB = "	";
		
		/* ---------- ---------- ---------- */
		
		function getTab(_deep) {
			var s = "";
			for (var i = 0; i < _deep; i++) {
				s += TAB;
			}
			return s;
		}
		
		/* ---------- ---------- ---------- */
	
		function isHideDir(_tree) {
			var b = false;
			if(_tree._isOpenMenu) b = true;
			if(_tree._isCurrent) b = false;
			if(_tree._ownCurrent) b = false;
			return b;
		}
		function getUL_Attr(_tree, _leng) {
			var _CN = Template.ClassName.getList();
			var st = "";
			
			if(isHideDir(_tree)) st += "display:none;";
			
			var cs = [];
			if(_CN.clearfix !== "") cs.push(_CN.clearfix);
			if(_CN.level !== "") {
				cs.push(_CN.level.split("{}").join(_tree._level+1));
			}
			if(_CN.sum !== "") {
				cs.push(_CN.sum.split("{}").join(_leng));
			}
			var t1 = "";
			var t2 = "";
			if(cs.length !== 0) t1 = 'class="' + cs.join(" ") + '"';
			if(st !== "") t2 = ' style="' + st + '"';
			return t1 + t2;
		}
	
		function getLI_Attr(_i,_tree) {
			var _CN = Template.ClassName.getList();
			var st = "";
			//
			var cs = [];
			
			if(_CN.no !== ""){
				cs.push(_CN.no.split("{}").join(_i + 1));
			}
			if(_CN.current !== ""){
				if(_tree._isCurrent) 	cs.push(_CN.current);
			}
			if(_CN.ownCurrent !== ""){
			if(_tree._ownCurrent) 	cs.push(_CN.ownCurrent);
			}
			if(_CN.hasSub !== ""){
			if(_tree.hasSubTree()) 	cs.push(_CN.hasSub);
			}
			if(_CN.type !== "") {
				cs.push(_CN.type.split("{}").join(_tree.type));
			}
			if(_tree.type == TYPE.DIR){
				if(_tree._isToggleMenu){
					cs.push(_CN.toggle);
				}
			}
			
			if(_tree.isUnderConst){
				//_tree.url = "javascript:void(0);";
				_tree.href = "javascript:void(0);";
				_tree.target = "";
				cs.push(_CN.underconst);
			}
			var t1 = "";
			var t2 = "";
			if(cs.length !== 0) t1 = 'class="' + cs.join(" ") + '"';
			if(st !== "") t2 = ' style="' + st + '"';
			return t1 + t2;
		}

		/* ---------- ---------- ---------- */
		
		//IDでツリーを取得し、そのエイリアスを返す
		function getTreeAliasByID(_tree, _id, _dir) {
			return getTreeAliasByID_core(_tree.list, _id, _dir)
		}
		function getTreeAliasByID_core(_tree, _id, _dir) {
			if(_dir == undefined) _dir = "";
			if(_tree === undefined) return null;
			for (var i = 0; i < _tree.length; i++) {
				var b = false;
				if (_tree[i].id === _id) {
					if (_tree[i].dir === _dir) b = true;
				}
				if (b) {
					return _tree[i];
				} else {
					var list = getTreeAliasByID_core(_tree[i].list, _id, _dir);
					if (list != null) {
						return list;
					}
				}
			}
			return null;
		}
		
		/* ---------- ---------- ---------- */
		
		function doTemplate(_tree) {
			if(_tree === null) return;
			var temp = _tree._template;
			//var callback = _tree.callback;
			//オリジナルを変更しないように、パラメータ用意
			var o = {}
				o.type 	 = _tree.type;
				o.id 	 = _tree.id;
				o.name 	 = _tree.name;
				o.html	  = _tree.html;
				o.level  = _tree._level;
				o.no 	 = _tree._no;
				o.sum 	 = _tree._sum;
				o.url 	 = _tree.url;
				o.href 	 = _tree.href;
				o.target  = _tree.target;
				o.class_  = _tree.class_;
				o.tag 	 = _tree.tag;
				o.read 	 = _tree.read;
				o.date 	 = _tree.date;
			
			//個別処理
			if(typeof (temp) == "string"){
				//
			} else if(typeof (temp) === "function"){
				var res = temp(o);
				if(res !== null) temp = res;
			} else{
				return "";
			}
			
			//ReplaceData
			if(ReplaceData !== undefined){
				temp = _replaceExtra(o,temp,ReplaceData)
			}
			//Treeのカスタム
			if(_tree["extra"] !== undefined){
				temp = _replaceExtra(o,temp,_tree.extra);
			}
			
			//置換えの無かった{...}を削除
			temp = temp.replace(/{.*?}/g,"");
			return temp;
		}
		function _replaceExtra(_o,_s,_extra){
			for (var i = 0; i <  _extra.length ; i++) {
				var s = "";
				if(typeof (_extra[i].text) == "string"){
					s = _extra[i].text;
				} else{
					s = _extra[i].text(_o);
				}
				_s = _s.split(_extra[i].id).join(s);
			}
			return _s;
		}

			
		/* ---------- ---------- ---------- */
		
		return { 
			getTab:getTab,
			isHideDir:isHideDir,
			getUL_Attr:getUL_Attr,
			getLI_Attr:getLI_Attr,
			//
			getAllTag: getAllTag,
			getTreeAliasByID: getTreeAliasByID,
			// getTreeByID: getTreeByID,
			//
			doTemplate:doTemplate
		}
	})();
	
	
	var GetTagU = (function(){
		
		/* ---------- ---------- ---------- */
		//
		function getSubTree(_tree,_dir,_tag){
			
			//ターゲットディレクトリ取得
			if(_dir != false){
				tar == null;
				_coreDir(_dir, _tree);
				if (tar == null) tar = _tree;
			} else {
				tar = _tree;
			}
			
			//タグ構造化
			if(_tag) return _getTagTree(tar,_tag);
			
			//
			return tar;
		}
			var tar;
			//dir
			function _coreDir(id,a){
				var ls = a.list
				for (var i = 0; i < ls.length ; i++) {
					if(ls[i].type == "dir" ){
						if(ls[i].id == id ){
							tar = ls[i];
						} else{
							_coreDir(id,ls[i]);
						}
					}
				}
			}
			//tag
			function _getTagTree(_tree,_tag){
				var tree = {}
					tree.list = [];
				if(_tag == false) return _tree;
				
				if(_tag == "__ALL__") _tag = getAllTag(_tree).join(",")
				
				var tags = _tag.split(",");
				for (var i = 0; i <  tags.length ; i++) {
					var list = [];
					var name = tags[i];
					_core_tag(name, _tree, list);
					tree.list[i] = {
						type : "dir",
						id 	 : name,
						name : name,
						list : list
					}
				}
				if(tree.list.length == 1) return tree.list[0]
				return tree;
			}
			function _core_tag(_tag,_tree,_list){
				var ls = _tree.list;
				for (var i = 0; i < ls.length ; i++) {
					var node = ls[i];
					if(node["tag"]){
						var tags = node["tag"].split(",");
						for (var n = 0; n < tags.length ; n++) {
							if(tags[n] == _tag ){
								_list.push(node);
							}
						}
					}
					if(node.type == "dir"){
						_core_tag(_tag,node,_list);
					}
				}
			}
		/* ---------- ---------- ---------- */
		//TAGでリストを取得
		//空白の場合は、スルーする
		
		function getAllTag(_a) {
			var tags = [];
			_getAllTag_core(_a, tags);
			return tags;
		}
		function _getAllTag_core(_tree,_tags) {
			var list = _tree.list;
			for (var i = 0; i < list.length; i++) {
				var tree = list[i];
				if(tree){
					if(tree.tag){
						_setTag( _tags,tree.tag );
					}
					if(tree.type == TYPE.DIR){
						_getAllTag_core(tree, _tags);
					}
				}
			}
		}
		function _setTag(_tags,_val) {
			var a = _val.split(",");
			for (var i = 0; i < a.length ; i++) {
				var b = true;
				for (var n = 0; n < _tags.length ; n++) {
					if(_tags[n] == a[i]) b = false;
				}
				if(b) _tags.push(a[i]);
			}
		}
		
		/* ---------- ---------- ---------- */
		
		function sortDate(_node,_sort){
			var o = JSON.parse(JSON.stringify(_node, null, "	"));
			sortDate_core(o,_sort);
			return o;
		}
		function sortDate_core(_node,_sort){
			var ls = _node.list
			for (var i = 0; i < ls.length ; i++) {
				if(ls[i].type == "dir"){
					sortDate_core(ls[i],_sort)
				} else{
					if(! ls[i].date) ls[i] = null;
				}
			}
			var a = []
			for (var i = 0; i <  ls.length ; i++) {
				if(ls[i] != null){
					a.push(ls[i])
				}
			}
			if (_sort) {
				a.sort(sortDateFuncOld);
			} else {
				a.sort(sortDateFuncNew);
			}
			_node.list = a;
		}
		
		//ソート
		function sortDateFuncOld(a, b){
			var x = a.date;
			var y = b.date;
			if (x > y) return 1;
			if (x < y) return -1;
			return 0;
		}
		function sortDateFuncNew(a, b){
			var x = a.date;
			var y = b.date;
			if (x > y) return -1;
			if (x < y) return 1;
			return 0;
		}
	
		
		/* ---------- ---------- ---------- */
		
		var _flats;
		function toFlat(_node){
			_flats = [];
			toFlat_core(_node);
			return _flats;
		}
		function toFlat_core(_node){
			var ls = _node.list
			for (var i = 0; i < ls.length ; i++) {
				if(ls[i].type == "dir"){
					toFlat_core(ls[i]);
				} else{
					_flats.push(ls[i]);
				}
			}
		}
	
		return {
			getSubTree:getSubTree,
			getAllTag:getAllTag,
			sortDate: sortDate,
			toFlat: toFlat
		}
	})();
	
	var U_ = (function(){
		function defaultVal(_v,_def){
			var s = _def
			if(_v != undefined){
				s = _v ;
			}
			return s;
		}
		function treatArray(_list) {
			var str = [];
			var list = [];
			var i = 0;
			var n = 0;
			for (var i = 0; i <  _list.length ; i++) {
				if (str[String(_list[i])]) {
					//
				} else {
					str[String(_list[i])] = 1;
					list[n] = _list[i];
					n++;
				}
				i++;
			}
			return list;
		}
		function treatTag(_s){
		 	return _s.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
		}
		function meargePath(_s,_add){
			if(_s.indexOf("/") == 0)return _s;
			if(_s.indexOf("./") == 0)return _add + _s.substr(2, _s.length)
			if(_s.indexOf("#")==0)return _s;
			if(_s.indexOf("http://")==0)return _s;
			if(_s.indexOf("https://")==0)return _s;
			if(_s.indexOf("mailto:")==0)return _s;
			
			var p = _add + _s;
				p =  p.split(".//").join("./");
			return  p;
		}
			
		function getSplitTextAt(_s,_n){
			if(!_s)return "";
			if(_n == undefined )return _s;
			if(_s.indexOf(",") == 0) return _s;
			var a = _s.split(",");
			if(a.length > _n){
				return a[_n]
			} else{
				return "";
			}
			/*
			equal (f("0",0),"0");
			equal (f("0",1),"");
			equal (f("0",2),"");
			equal (f("0",3),"");
			
			equal (f("0,1,2",0),"0");
			equal (f("0,1,2",1),"1");
			equal (f("0,1,2",2),"2");
			equal (f("0,1,2",3),"");
			*/
		}

		return {
			defaultVal:defaultVal,
			treatArray:treatArray,
			treatTag:treatTag,
			meargePath:meargePath,
			getSplitTextAt:getSplitTextAt
		}
	})();
	


	/* ---------- ---------- ---------- */

	var ROOT = ""
	var html_dir = ""
	var html_dir_abs = ""
	
	function setCMS_URL(_dir){
		ROOT 	 = TreeAPI_SITE_DIR;
		html_dir  = TreeAPI_SITE_DIR + _dir;
		html_dir_abs = _dir;
	}
	
	/* ---------- ---------- ---------- */
	
	function getAllTag(_sitemap){
		return GetTagU.getAllTag(_sitemap)
	}
	
	/* ---------- ---------- ---------- */
	
	function getSubTree(_s,_d,_tag){	
		return GetTagU.getSubTree(_s,_d,_tag);
	}

	/* ---------- ---------- ---------- */
	//
	function getTag(_htmlDir, _sitemap, _param , _previewPage) {
		
		if(_param == undefined) return TreeAPI_NOT_MATCH_TEXT;
		if(_param.setting == undefined) return TreeAPI_NOT_MATCH_TEXT;
		
		var page;
		if(_param.previewPage != undefined) page = _param.previewPage;
		if(_previewPage != undefined) page = _previewPage;
		if(page == undefined) page = {id:"",dir:""}
		//
		
		var o = new MenuOption();
			o.currentID	 = page.id;
			o.currentDIR = page.dir;
			o.useToggle  = _param.setting.useToggle;
			o.onlyCurrent  = _param.setting.onlyCurrent;
			o.limitSub 	 = Number(_param.setting.limitSub);
			o.indent 	 = Number(_param.setting.indent);
			o.css		 = _param.css;
			o.levels	 = _param.levels;
		
		//リスト数制限
		if(isNaN(o.limitSub)) o.limitSub = 99999;
		if(o.limitSub == 0) o.limitSub = 99999;
		if(isNaN(o.indent)) o.indent = 0;
		
		//HTMLディレクトリ
		setCMS_URL(_htmlDir);

		
		//20160926
		//追加メニューがあれば、sitemap.listに追加
		_sitemap = JSON.parse(JSON.stringify(_sitemap));
		if(_param.setting.add){
			_sitemap.list = mergeAddMenu(_sitemap.list , _param.setting.add)
		}
		
		var node = _sitemap;
		
		//絞り込み、タグ分類
		if(_param.targetDir || _param.targetTag){
			node = GetTagU.getSubTree(_sitemap , _param.targetDir , _param.targetTag );
		}
		
		//フラット化
		if(_param.setting.isFlat){
			node = { name:"list", type:"dir", list:GetTagU.toFlat(node) }
		}
		
		//時別
		if(_param.setting.hasDate){
			node = GetTagU.sortDate(node, _param.setting.isReverse);
		}
		
		//
		var tree = new TreeData(node);
		var s = tree.getMenuTag(o);
		var tab = (function(_n){ 
		    var s = "";
			for (var i = 0; i < _n ; i++) { s += "\t"; }
			return s;
		})(o.indent);
		if(tab !="") s = s.split('\n').join("\n" + tab);
		return s;
	}
	/* ---------- ---------- ---------- */

	//20160926
	function mergeAddMenu(_list,_add) {
		try{
			var ls = _add.list.grid;
			var a = [];
			for (var i = 0; i < ls.length ; i++) {
				a.push(mergeAddMenu_core(ls[i]));
			}
			_list = a.concat(_list);
			//
			var ls = _add.list2.grid;
			var a = [];
			for (var i = 0; i < ls.length ; i++) {
				a.push(mergeAddMenu_core(ls[i]));
			}
			_list = _list.concat(a);
		}catch( e ){}
		return _list;
	}
	function mergeAddMenu_core(_list) {
		var s = _list.text;
		var u = "";
		if(_list.anchor){
			u = _list.anchor.href;
			//20170316 追加
			if(_list.anchor.target){
				u +=","+_list.anchor.target;
			}
			//
		}
		var _o = {}
			_o.type = TYPE.ADD;
			_o.name = s;
		if(URL_U.isFullPath(u)){
			_o.dir = "/";
			_o.custom_a = u;
		} else if(u == "#") {
			_o.dir = "/";
			_o.custom_a = u;
		} else{
			_o.dir = URL_U.getBaseDir(u);
			if(_o.dir == "") _o.dir = "/";
			_o.id = URL_U.getFileID(u);
		}
		return _o;
	}
	
	/* ---------- ---------- ---------- */
	//
	function getBreadListTag(_htmlDir, _sitemap , _previewPage) {
		var tree = new TreeData(_sitemap);
			setCMS_URL(_htmlDir);
		var o = new BreadListOption();
			o.home = '<i class="fa fa-home"></i> <a href="{HOME}">HOME</a>'
			o.node = '<a href="{HREF}">{NAME.noTag}</a>';
			o.current = '<b>{NAME.noTag}</b>';
		return tree.getBreadList(_previewPage.id,_previewPage.dir,o);
	}
	
	/* ---------- ---------- ---------- */
	
	function setToggleMenu(_view){
		var parentView = (_view) ? _view :$("body");
		var mark_open = '<span>+</span>';
		var mark_close = '<span style="opacity:0.5;">-</span>';
		var markArea = '<div class="_toggle-icon" style="float:right;">';
		
		setTimeout(function(){
			var tar = parentView.find("._type-dir-toggle > p,._type-dir-toggle > a");
			tar.each(function (index, dom) {
				var tar = $(this);
				tar.css("cursor","pointer")
				var state = tar.parent().find("> ul").css("display")
				if(state == "block"){
					tar.prepend( markArea + mark_close + '</div>')
				} else {
					tar.prepend( markArea + mark_open + '</div>')
				}
				tar.click(function(){
					var icon = $(this).find("._toggle-icon");
					if(icon.html() == mark_open){
						icon.html(mark_close)
					} else{
						icon.html(mark_open)
					}
					$(this).parent().find("> ul").slideToggle(200);
				event.stopPropagation();
				event.preventDefault();
			});
			});
		},200);
	}
	
	/* ---------- ---------- ---------- */
	
	var sumCnt;
	function getPageSum(_tree){	
		sumCnt = 0;
		getPageSum_core(_tree)
		return sumCnt;
	}
	function getPageSum_core(_tree,_cnt){	
		var ls = _tree.list
		for (var i = 0; i < ls.length ; i++){
			if(ls[i].type == "dir" ){
				getPageSum_core(ls[i]);
			}
			if(ls[i].type == "page"){
				sumCnt ++;
			}
		}
	}

	return {
		setToggleMenu:setToggleMenu,
		getSubTree:getSubTree,
		getAllTag:getAllTag,
		getTag:getTag,
		getBreadListTag:getBreadListTag,
		getPageSum:getPageSum
	};
})();
