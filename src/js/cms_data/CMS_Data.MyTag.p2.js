
CMS_Data.MyTagReplace = (function(){
	
	/* ---------- ---------- ---------- */
	//テキスト置き換え
	
	function replaceHTML(_temp){
		if(_temp.indexOf("{{") == -1) { return _temp; }
		
		//外部の置換リストとマージ
		var repKeys = (function(_a1,_a2){ 
			if(!_a2) return _a1;
			if(_a2.length == 0) return _a1;
			return CMS_U.meargeGrid(_a1, _a2);
		})( CMS_Data.MyTag.getDataFlat() , getLocalMyTagList() );
		
		//置換え実行
		return CMS_Data.MyTagU.getReplaceTag(_temp, repKeys);
	}
	
	/* ---------- ---------- ---------- */
	//雛形ブロック処理
	
	//ひな形ブロック置換え処理
	function replaceHinagata(_id,_list){
		//MyタグIDから値を取得
		
		var _data = getMyTagData(_id);
		if(!_data) return "-----";
		
		//tag.js処理用に一時的に保持
		CMS_Data.HinagataSearvice.setState(_list);
		
		//Myタグ値のノードごとに処理
		var s = "";
		
		if(_data.type == "text"){
			s += replaceHinagata_one(_data.val);
			
		} else if(_data.type == "image"){
			s += "※ Myタグリスト / イメージでは、ひな形は利用できません。";
			
		} else if(_data.type == "link"){
			s += "※ Myタグリスト / リンクでは、ひな形は利用できません。";
			
		} else{
			var vals = _data.val;
			for (var n = 0; n < vals.length ; n++) {
				s += replaceHinagata_one(vals[n]);
			}
		}
		CMS_Data.HinagataSearvice.reset();
		return s;
	}
	
	function replaceHinagata_one(_val){
		//リスト系のブロックに最大件数を追加
		_val = JSON.parse(JSON.stringify(_val));
		for (var n in _val.data) {
			if(_val.data[n]){
				if(_val.data[n].texts){
					var ts = _val.data[n].texts;
					for (var g in ts) {
						ts[g] = CMS_Data.HinagataSearvice.replace(ts[g]);
					}
				}
			}
		}
		var s = PageElement_HTMLService.getTag(_val);
			s = CMS_Data.HinagataSearvice.replace(s);
		return s;
	}
	
	function getMyTagData(_id){
		//グローバルMyタグリストから探す
		var _tmp = CMS_Data.MyTag.getData()
		for (var n in _tmp){
			var ls = _tmp[n];
			for (var i = 0; i < ls.length ; i++) {
				if(_isMatch(_id,ls[i].id)) {
					return ls[i];
				}
			}
		}
		
		//ローカルMyタグリストから探す
		var ls = getLocalMyTagList();
		if(ls){
			for (var i = 0; i < ls.length ; i++) {
				if(_isMatch(_id,ls[i].id)) {
					return ls[i];
				}
			}
		}
		return null;
	}
	function _isMatch(_id,_key){
		return (_id == "{{" + _key + '}}');
	}

	/* ---------- ---------- ---------- */
	
	//ローカルでMyタグ+ひな形ブロックを使うための前処理
	//ページ公開時にセットされる
	
	var _localMyTagList;
	
	function getLocalMyTagList(){
		updateLocalMyTagList();
		return _localMyTagList;
	}
	function updateLocalMyTagList(){
		if(isPublising) return;
		//
		_localMyTagList = null;
		var currentData = CMS_PageDB.getCurrentPageStoreData();
		if(currentData){
			_localMyTagList = _parseData(currentData);
		}
	}
	
	//ページ公開時（バッチ公開時に必要な処理）
	var isPublising = false;
	function startPublish(_pageData){
		_localMyTagList = null;
		if(_pageData){
			_localMyTagList = _parseData(_pageData);
		}
		isPublising = true;
	}
	function endPublish(){
		isPublising = false;
	}
	
	/* ---------- ---------- ---------- */
	
	function _parseData(_json){
		return CMS_Data.MyTagU.parseData(_json);
	}
	
	/* ---------- ---------- ---------- */

	return { 
		replaceHTML:replaceHTML,
		
		replaceHinagata:replaceHinagata,
		
		getLocalMyTagList:getLocalMyTagList,
		startPublish:startPublish,
		endPublish:endPublish
	}
})();