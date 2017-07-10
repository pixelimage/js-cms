/**
 * サイトマップデータ管理
 */

CMS_Data.Sitemap = (function(){
	
	function init(){
		createIgnoreList();
	}
	
	/* ---------- ---------- ---------- */
	//初期ロード
	
	var callback;
	function load(_callback){
		var param = Dic.SettingList;
		callback = _callback
		storage = new Storage.Online(Dic.PageType.SYSTEM,param.id,param.dir,{})
		storage.load(function() {
			load_comp();
		});
	}
	var storage;
	function load_comp(){
		var d = storage.getData();
		if(d.list == undefined){
			storage.setData({list:[]});
		}
		sitemap = storage.getData();
		update();
		callback();
	}

	/* ---------- ---------- ---------- */
	
	//更新のたびにコールされる
	
	var sitemap;
	var tID;
	function update(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			setTreat();
			setGloupPath();
			toFlat();
		},50);
	}
	
	/* ---------- ---------- ---------- */
	//サイトマップデータを奇麗にする
	
	//ディレクトリにUIDが無い場合、セット。
	function setDirUID(_dir){
		if(! _dir.uid){
			_dir.uid = "dir_" + DateUtil.getFormattedDate(new Date(),"YYYYMMDD_RRR");
		}
	}
	function setTreat(){
		setDirUID(sitemap);
		setTreat_loop(sitemap.list);
	}
	function setTreat_loop(_list){
		if(_list == undefined)return;
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i]){
				if(_list[i].type == Dic.ListType.DIR){
					setDirUID(_list[i]);
					setTreat_loop(_list[i].list)
				} else if(_list[i].type == Dic.PageType.PAGE) {
					if(_list[i].dir == undefined) _list[i].dir = "" 
				}
			}
		}
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	function getGloup_by_uid(_uid){
		var ls = sitemapFlatGloups;
		for (var i = 0; i < ls.length ; i++) {
			if(ls[i].uid == _uid){
				return ls[i];
			}
		}
		return null;
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	//グループパスDICを作成
	var gloupPathDIC = [];
	function setGloupPath(){
		gloupPathDIC = [];
		setGloupPath_loop(sitemap.list ,"","")
		
	}
	function setGloupPath_loop(_list,_gid,_gname){
		if(_list == undefined)return;
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i]){
				if(_list[i].type == Dic.ListType.DIR){
					var id = _gid + "/" + _list[i].id
					var na = _gname + "/" + _list[i].name
					setGloupPath_loop(_list[i].list,id,na);
				} else if(_list[i].type == Dic.PageType.PAGE) {
					gloupPathDIC.push([_list[i].id,_list[i].dir, _gid, _gname]);
				}
			}
		}
	}
	function getGloup_by_id(_id,_dir){
		for (var i = 0; i <  gloupPathDIC.length ; i++) {
			if(gloupPathDIC[i][0] == _id){
				if(gloupPathDIC[i][1] == _dir){
					return gloupPathDIC[i];
				}
			}
		}
		return null
	}
	function getGloupPath_by_id(_id,_dir){
		var param = getGloup_by_id(_id,_dir);
		if(param == null)return "";
		return param[2];
	}
	function getGloupName_by_id(_id,_dir){
		var param = getGloup_by_id(_id,_dir);
		if(param == null)return "";
		return param[3];
	}
	
	//PageViewのヘッダで使用
	function getGloupState_by_id(_currnet){
		var s = "";
			s +='<span class="_cms_wide _cms_hide_preview">現在のテンプレ：</span><b><span data-id="{TEMPLATE}">{TEMPLATE}</b> <i class="fa fa-caret-down fa-lg"></i>'
		var sels = CMS_Data.Template.getSelectList();
			s += '<div class="_templatesFloat">';
			s += '<div class="_read">ページで使用するテンプレートを選択してください。</div>';
		for (var i = 0; i <  sels.length ; i++) {
			var icon = (function(_cu,_name){ 
				if(_name == "")_name = Dic.DEFAULT_TEMPLATE;
			    var _s = '<i class="fa fa-square-o"></i> ';
				if(_cu == _name){ _s = '<i class="fa fa-check-square "></i> '}
				return _s;
			})(_currnet,sels[i][0]);
			
			var id = CMS_Data.Template.getTemplateName(sels[i][0]);
			s += '<div class="_item" data-id="' + id + '">'
			// s += '<span class="_btn_edit_tempalte" data-id="'+ id +'"><i class="fa fa-pencil "></i> 編集</span>'
			s += icon + sels[i][1];
			s += '</div>';
		}
			s += '</div>';
			s = s.split("{TEMPLATE}").join(_currnet);
		return s;
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	//ファイルID入力フォームの候補表示用
	
	var sitemapFlat = [];//ファイルID
	var sitemapFlatGloups = [];//グループID
	
	function toFlat(){
		sitemapFlat = [];
		sitemapFlatGloups = [];
		sitemapFlatGloups.push(sitemap);
		toFlatLoop(sitemap.list);
		
		if(window["FormCandidates"]){
			FormCandidates.setSitemapList(sitemapFlat,sitemapFlatGloups);
		}
	}
	function toFlatLoop(_list){
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i]){
				if(_list[i].type==Dic.ListType.DIR){
					sitemapFlatGloups.push(_list[i])
				} 
				if(_list[i].list){
					toFlatLoop(_list[i].list)
				} else{
					if(_list[i].type==Dic.PageType.PAGE){
						sitemapFlat.push(_list[i])
					} 
				}
			}
		}
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	//NGファイルリスト検索
	
	var ignoreList = [];
	function createIgnoreList(){
		ignoreList = [];
		for (var n in Dic.SettingList) {
			if($.isArray(Dic.SettingList[n])){
				for (var i = 0; i < Dic.SettingList[n].length ; i++) {
					ignoreList.push(Dic.SettingList[n][i]);
				}
			} else{
				ignoreList.push(Dic.SettingList[n])
			}
		}
	}
	
	var match;
	function find(_id,_dir){
		
		if(_dir == undefined) _dir = "";
		match = null;
		var b = false;
		for (var i = 0; i < ignoreList.length ; i++) {
			if(_id == ignoreList[i].id){
				if(_dir == ignoreList[i].dir){
					b = true;
				}
			}
		}
		if(b)return;
		
		find_loop(_id,_dir,sitemap.list,0);
	}
	function find_loop(_id,_dir,_list,_deep){
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i]){
				if(_list[i].id == _id){ 
					if(_list[i].dir == _dir){ 
						match = _list[i];
					}
				}
				if(_list[i].list) { find_loop(_id,_dir,_list[i].list,_deep+1) }
			}
		}
	}
	
	function getData_by_id(_id,_dir){
		find(_id,_dir);
		return match;
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	//#IO
	
	//IDに該当するファイルの更新日を最新にして、保存する
	var tID_later_save;
	function saveDateLater(_id,_dir){ saveDate(_id,_dir,1) }
	function saveDate(_id,_dir,_delayTime){
		if(_id == "_sitemap") return;
		find(_id,_dir);
		if(! match)return;
		match.saveDate = CMS_SaveDateU.getDate();
		
		//連続書き込みをさけるため、ディレイ処理
		if(tID_later_save) clearTimeout(tID_later_save);
		if(_delayTime == undefined){
			save();
		} else{
			tID_later_save = setTimeout(function(){
				save();
			},_delayTime*1000);
		}
	}
	
	//IDに該当するファイルの公開日を最新にして、保存する
	
	//20161202追加
	function publicDateInit(_id,_dir){
		if(_dir == "_sitemap") return;
		find(_id,_dir);
		if(! match) return;
		if(match.publicDate == "-"){
			match.publicDate = CMS_SaveDateU.getDate();
		}
	}
	
	var tID_later_public;
	function publicDateLater(_id,_dir){ publicDate(_id,_dir,1) }
	function publicDate(_id,_dir,_delayTime){
		if(_dir == "_sitemap") return;
		find(_id,_dir);
		if(! match) return;
		match.publicDate = CMS_SaveDateU.getDate();
		
		//連続書き込みをさけるため、ディレイ処理
		if(tID_later_public) clearTimeout(tID_later_public);
		if(_delayTime == undefined){
			save();
		} else{
			tID_later_public = setTimeout(function(){
				save();
			},_delayTime*1000);
		}
	}
	function unPublicDateLater(_id,_dir){ unPublicDate(_id,_dir,1) }
	function unPublicDate(_id,_dir,_delayTime){
		if(_dir == "_sitemap") return;
		find(_id,_dir);
		if(! match)return;
		match.publicDate = "";
		save();
	}
	
	//save
	var tID_save;
	function save(){
		//サイトマップを更新すると、同時にリクエストがくるので、1つにしぼる
		if(tID_save) clearTimeout(tID_save);
		tID_save = setTimeout(function(){
			storage.setData(getData());
			storage.save_sitemap(function(){
				if(isLog)console.log("list saved.")
			});
		},500);
	}
	
	
	/* ! ----------  ---------- ---------- ---------- ---------- */

	//保存した日付をかえす
	function getSaveDate(_id,_dir){
		
		find(_id,_dir);
		if(! match)return "";
		return match.saveDate;
	}
	//公開した日付をかえす
	function getPublishDate(_id,_dir){
		find(_id,_dir);
		if(! match)return "";
		return match.publicDate;
	}
	
	function getData(){ return sitemap; }
	 function getFilelist() {
	 	if(sitemap == undefined) return []
		return sitemap.list;
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */

	//リビジョンを返す
	function getRevision(_id,_dir){
		find(_id,_dir);
		if(! match) return [];
		if(match["revision"]) {
			return match["revision"];
		} else{
			return [];
		}
	}
	function addRevision(_id,_dir,_date){
		find(_id,_dir);
		if(! match) return [];
		if(match["revision"] == undefined) match.revision = [];
		match.revision.unshift(_date);
		save();
	}
	function removeRevision(_id,_dir,_date){
		find(_id,_dir);
		if(! match) return [];
		if(match["revision"] == undefined) match.revision = [];
		var a = [];
		var b = false;
		for (var i = 0; i < match.revision.length ; i++) {
			if(_date != match.revision[i]){
				a.push(match.revision[i]);
				b = true;
			}
		}
		if(match.revision.length != a.length ) match.revision = a;
		save();
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	return { 
		init:init,
		load:load,
		update:update,
	
		getData:getData,
		getFilelist:getFilelist,
		
		save:save,
		saveDate:saveDate,
		publicDate:publicDate,
		publicDateInit:publicDateInit,
		
		saveDateLater:saveDateLater,
		publicDateLater:publicDateLater,
		unPublicDateLater:unPublicDateLater,
		
		getSaveDate:getSaveDate,
		getPublishDate:getPublishDate,
		
		getData_by_id:getData_by_id,
		getGloupPath_by_id:getGloupPath_by_id,
		getGloupName_by_id:getGloupName_by_id,
		getGloupState_by_id:getGloupState_by_id,
		
		getGloup_by_uid : getGloup_by_uid,
		
		getRevision:getRevision,
		addRevision:addRevision,
		removeRevision:removeRevision
		
	 }
})();

	
	