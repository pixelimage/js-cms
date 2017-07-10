//テンプレート用の置換えキー登録
//一回だけでなく、設定ファイルを編集した場合は、何度かロードされる

CMS_Data.MyTag = (function(){
	
	function init(){
		
	}
	var tmp = {}
	
	function getURL(ss){
		var r = "?r=" + DateUtil.getFormattedDate(new Date(), "YYYYMMDD_hhmmss");
		return CMS_Path.ASSET.REL + ss.dir + "/" + ss.id + ".json" + r;
	}

	/* ---------- ---------- ---------- */
	
	//利用できるMyタグファイル一覧を取得
	function loadList(_callback) {
		
		var files = MYTAG_PAGE_LIST;
		
		Dic.MyTagList = (function(_list){ 
			var dir = Dic.DirName.MYTAG;
			var o = []
			if(_list.length == 0){
				o.push(Dic.MyTagListDef);
			} else{
				for (var i = 0; i < _list.length ; i++) {
					o.push({
						dir: dir,
						id: _list[i].id,
						type: Dic.PageType.CMS_MYTAG,
						name: _list[i].name
					});
				}
			}
			return o;
		})(files);
		load(_callback);
	}
	function _isFile(_s) {
		if(_s.indexOf(".") != -1) {
			return FileU.isEditableFile(_s);
 		} else{
 			return false;
 		}
	}
	
	/* ---------- ---------- ---------- */
	
	function getParam_by_ID(_id) {
		var ls = Dic.MyTagList;
		for (var i = 0; i < ls.length ; i++) {
			if(ls[i].id == _id){
				return ls[i];
			}
		}
		return null;
	}
	
	/* ---------- ---------- ---------- */
	//Myタグファイルをロードする
	
	function load(_callback) {
		var kyes = Dic.MyTagList;
		loadCount = 0;
		loadSum = kyes.length;
		for (var i = 0; i < kyes.length ; i++) {
			var ts = new CMS_Data.TextLoader("JSON", 
				getURL(kyes[i]),
				function(_json) {
					setInitData(_json,this.myid);
					loaded(_callback);
				}, function() {
					setInitData({},this.myid);
					loaded(_callback);
				}
			);
			ts.myid = kyes[i].id;
		}
	}
	
	var loadCount;
	var loadSum;
	function loaded(_callback) {
		loadCount++;
		if(loadCount == loadSum){
			if(_callback) _callback();
		}
	}
	
	//データ登録
	function setInitData(_json,_myid) {
		if (!tmp) tmp = {};
		var name = "";
		if(!_json.meta)_json.meta = {};
		if(!_json.meta.name)_json.meta.name = "";
		setName(_json.meta.name,_myid);
		tmp[_myid] = _parseData(_json);
	}
	
	//JSONファイルから、meta.nameを取得し、名称にセットする
	function setName(_name,_myid) {
		var kyes = Dic.MyTagList;
		for (var i = 0; i < kyes.length ; i++) {
			if(kyes[i].id == _myid){
				if(_name){
					kyes[i].name = _name;
				}
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	//ファイル保存したときに、リロードする
	
	function loadAt(_id) {
		var pr = {
			id : _id,
			dir : Dic.DirName.MYTAG
		}
		var ts = new CMS_Data.TextLoader("JSON", 
			getURL(pr),
			function(_json) {
				setInitData(_json,this.myid);
			}, function() {
				setInitData({},this.myid);
			}
		);
		ts.myid = _id;
	}
	
	/* ---------- ---------- ---------- */
	
	function _parseData(_json) {
		return CMS_Data.MyTagU.parseData(_json);
	}
	
	if(window["_cms"] ==undefined) window._cms = {};
	window._cms.showsMyTags = function(){
		console.log(tmp);
	}
	
	/* ---------- ---------- ---------- */
	
	//各ページ保存時にコールされ、keyだったら、データをリロードする
	function savedPage(_id,_dir){
		var ss = Dic.MyTagList;
		var id = "";
		for (var i = 0; i < ss.length ; i++) {
			if(ss[i].id == _id){
				if(ss[i].dir == _dir){
					id = ss[i].id;
				}
			}
		}
		if(id){
			update(id);
			loadAt(_id);
		}
	}
	function update(_id){
		tmp[_id] = null;
	}
	function getData() {
		return tmp;
	}
	
	//フラットなリストを返す
	function getDataFlat() {
		var a = [];
		for (var n in tmp){
			a = a.concat(tmp[n]);
		}
		return a;
	}
	return {
		init:init,
		loadList:loadList,
		
		getParam_by_ID:getParam_by_ID,
		savedPage:savedPage,
		getData:getData,
		getDataFlat:getDataFlat
	}
})();