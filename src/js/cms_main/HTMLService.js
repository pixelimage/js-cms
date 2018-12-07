/**
 * JSONをHTMLにコンバートするサービス
 * コンバートには、設定JSONや、テンプレHTMLなども必要
 */

var HTMLService = (function(){

	var pageData;
	var param;
	var callback;
	
	/* ---------- ---------- ---------- */
	
	function generateHTML(_pageData,_param,_callback){
		param = _param;
		pageData = _pageData;
		callback = _callback;
		loadTemplate();
	}
	
	var templateFileName = "";
	
	//テンプレHTMLロード
	function loadTemplate(){
		//JSONにされてるテンプレHTMLファイルが入る
		if(!pageData.meta) pageData.meta = {}
		var _id = CMS_Data.Template.treatTemplateName(pageData.meta);
		CMS_Data.Template.load(_id,function (_s,_id){
			_s = setUniqueCSSFile(_s);
			templateFileName = _id;
			convert(_s);
		});
	}
	
	//テンプレHTML内の、CSSパスにランダムパラメータをつける
	//キャッシュしないように
	function setUniqueCSSFile(_s) {
		_s = CMS_Data.AssetFile.overridePath(_s)
		return _s;
	}
	
	/* ---------- ---------- ---------- */
	//メインのコンバート処理
	
	function convert(_s){
		
		//現在の書き出しページ情報をセット
		HTML_ExportState.setCurrent(param);
		
		//フリーレイアウト部分の初期データセット
		_setInitData();
		
		//現在のページのMyタグリストをセット
		CMS_Data.MyTagReplace.startPublish(pageData);
		
		//メインのjson > html 変換処理
		var html = _convert_main(_s);
		
		//{{FILE:sample.txt}}置換え
		CMS_Data.FreeFile.replace(html,function (_s){
			convert_done(_s);
		});
	}
	
	function convert_done(_s){
		callback( HTMLServiceU.getReplacedHTML(_s,param) );
		CMS_Data.MyTagReplace.endPublish();
	}
	
	/* ---------- ---------- ---------- */
	
	function _setInitData(){
		if(pageData["body"] == undefined){
			if(window["FREEPAGE_DEF_DATA"]){
				var list = JSON.parse(JSON.stringify(FREEPAGE_DEF_DATA));
				pageData = {
					meta: {},
					head: {},
					body: { free: [ { type: "layout.div", attr: {}, data: list }] }
				}
			}
		}
	}
	
	//JSON > HTML変換処理
	var tag = "";
	function _convert_main(_s){
		tag = "";
		for (var n in pageData.body) {
			if(n.indexOf("free")!= -1){
				tag += "\n"
				tag += PageElement_HTMLService.getTag(pageData.body[n][0],"",0,true);
				tag += "\n"
			}
		}
		tag = tag.split(" ").join(" ");
		_s = _s.split("{{PAGE_CONTENTS}}")	.join(tag);
		return _s;
	}
	
	return {
		generateHTML:generateHTML
	}
})();




var HTMLServiceU = (function(){
	
	/**
	 * テンプレート置換えタグ 
	 * _param ... {id:"" , dir:"" , siteRoot:""}
	*/
	
	function getReplacedHTML(_temp,_param,_type,_isPub){
		_isPub = (_isPub == undefined) ? true:_isPub;
		
		//置き換えタグチェック
		if(_temp.indexOf("{{") == -1) { return _temp; }
		
		//Myタグ定義ブロック関連はスルー
		if(PageElement_Util.isReplaceTag(_type)) return _temp;
		
		//現在の書き出しページ情報をセット
		HTML_ExportState.setCurrent(_param);
		
		//サイト置換えタグと、個別ページ置換えタグをマージして置換え
		var _temp = CMS_Data.MyTagReplace.replaceHTML(_temp);
			_temp = CMS_Data.MyTagReplace.replaceHTML(_temp);//置換えの置換え
		//ページ情報タグを書き換えて、返す
		return _replacedCMSTag( _temp,_isPub );
	}
	
	/* ---------- ---------- ---------- */
	//ページ情報タグで書き換える
	
	function _replacedCMSTag(_temp,_isPub){
		if(_temp.indexOf("{{") == -1) { return _temp; }
		var _split = CMS_U.getSplitTextAt;
		var __ = getCurrentReplaceTags();
		
		_temp = _temp.split("{{PAGE_BREADLIST}}")	.join(_replaceBredList());
		_temp = _temp.split("{{PAGE_DIR}}")			.join(__.PAGE_DIR);
		_temp = _temp.split("{{PAGE_ID}}")			.join(__.PAGE_ID);
		_temp = _temp.split("{{PAGE_NAME}}")		.join(__.PAGE_NAME);
		_temp = _temp.split("{{PAGE_NAME.TAG}}")	.join(__.PAGE_NAME_TAG);
		_temp = _temp.split("{{PAGE_NAME[0]}}")		.join(_split(__.PAGE_NAME,0));
		_temp = _temp.split("{{PAGE_NAME[1]}}")		.join(_split(__.PAGE_NAME,1));
		_temp = _temp.split("{{PAGE_NAME[2]}}")		.join(_split(__.PAGE_NAME,2));
		_temp = _temp.split("{{PAGE_NAME[3]}}")		.join(_split(__.PAGE_NAME,3));
		_temp = _temp.split("{{PAGE_NAME[4]}}")		.join(_split(__.PAGE_NAME,4));
		_temp = _temp.split("{{PAGE_TAG}}")			.join(__.PAGE_TAG);
		_temp = _temp.split("{{PAGE_DATE}}")		.join(__.PAGE_DATE);
		_temp = _temp.split("{{PAGE_READ}}")		.join(__.PAGE_READ);
		_temp = _temp.split("{{PAGE_GROUP_IDS}}")	.join(__.PAGE_GROUP_IDS);
		_temp = _temp.split("{{PAGE_GROUP_IDS[0]}}").join(_split(__.PAGE_GROUP_IDS,0," "));
		_temp = _temp.split("{{PAGE_GROUP_IDS[1]}}").join(_split(__.PAGE_GROUP_IDS,1," "));
		_temp = _temp.split("{{PAGE_GROUP_IDS[2]}}").join(_split(__.PAGE_GROUP_IDS,2," "));
		_temp = _temp.split("{{PAGE_GROUP_NAMES}}")	.join(__.PAGE_GROUP_NAMES);
		_temp = _temp.split("{{PAGE_PUB_DATE}}")	.join(__.PAGE_PUB_DATE);
		_temp = _temp.split('{{DEF_DIR}}')			.join(__.DEF_DIR);
		_temp = _temp.split('{{ASSET_DIR}}')		.join(__.ASSET_DIR);
		_temp = _temp.split(CONST.SITE_DIR)			.join((_isPub) ? __.SITE_DIR : CMS_Path.SITE.REL );
		
		//使ってないキーを削除
		_temp = _temp.replace(/{{.*?}}/g,"");
		
		return _temp;
	}
	
	/* ---------- ---------- ---------- */
	
	//ぱんくず
	function _replaceBredList( _fileID, _dir) {
		var htmlAbs = CMS_Path.PAGE.ABS;
		var tree = CMS_Data.Sitemap.getData();
		var tag = TreeAPI.getBreadListTag(htmlAbs, tree ,HTML_ExportState.getCurrent() );
			tag = tag.split(TreeAPI_SITE_DIR).join(CONST.SITE_DIR);
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	//現在ページのページ情報タグのリストを返す
	function getCurrentReplaceTags(){
		
		var pageParam = HTML_ExportState.getCurrent();
		var _id 		= pageParam.id;
		var _dir 		= pageParam.dir;
		var _siteRoot 	= pageParam.siteRoot;
		if(_siteRoot == "") _siteRoot = CMS_Path.SITE.getTopRelPath_from_html(_dir);
		
		var groupIDs = CMS_Data.Sitemap.getGloupPath_by_id(_id,_dir).split("/").join(" ");
		var groupNAMEs = CMS_Data.Sitemap.getGloupName_by_id(_id,_dir).split("/").join(" ");
		
		var pageName = "";
		var tagName = "";
		var dateName = "";
		var readName = "";
		
		var current = CMS_Data.Sitemap.getData_by_id(_id,_dir);
		if(current != null) {
			pageName  = current.name || "";
			tagName	 = current.tag || "";
			dateName = current.date || "";
			readName = current.read || "";
		}
		var pageName_noTag = CMS_TagU.treatTag(pageName);
		
		var o = {}
			o.PAGE_DIR 			= CMS_Path.PAGE.getAbsDirPath(_dir);
			o.PAGE_ID 			= _id;
			o.PAGE_NAME 		= pageName_noTag;
			o.PAGE_NAME_TAG 	= pageName;
			o.PAGE_TAG 			= tagName;
			o.PAGE_DATE 		= dateName;
			o.PAGE_READ 		= readName;
			o.PAGE_GROUP_IDS 	= groupIDs;
			o.PAGE_GROUP_NAMES 	= groupNAMEs;
			o.PAGE_PUB_DATE 	= CMS_SaveDateU.getDate();
			o.DEF_DIR 			= CMS_Path.PAGE.ABS2;
			o.ASSET_DIR 		= CMS_Path.ASSET.ABS2;
			o.SITE_DIR 			= _siteRoot;
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	//ブロック書き出しで使用。{{SITE_DIR}}を書き換える
	function setSiteRoot(_s,_path){
		function _core (_path){
			var s = "";
			if(_path.substr(0,2) =="./"){
				_path = _path.substr(2,_path.length-1);
			}
			var dir = URL_U.getBaseDir(_path);
			if(	dir == "")  return s;
			//
			var a = dir.split("/");
			var path = "";
			for (var i = 0; i < a.length ; i++) {
				if(a[i] != "") path+="../";
			}
			//2017-07-27 調整
			if(dir.substr(0,3) == "../"){
				if(path.substr(path.length-3,3) =="../"){
					path = path.substr(0,path.length-3) + CMS_Path.SITE.DIR + "/";
				}
			}
			return path;
		}
		return _s.split(CONST.SITE_DIR).join(_core(_path));
	}
	
	/* ---------- ---------- ---------- */

	
	return {
		getReplacedHTML: getReplacedHTML,
		getCurrentReplaceTags: getCurrentReplaceTags,
		setSiteRoot:setSiteRoot
	}
})();

//書きだそうとしてるページの情報を保持する
//ブロックや機能によっては、現在のページ情報が必要なため
var HTML_ExportState = (function(){
	
	var id = "";
	var dir = "";
	var siteRoot = "";
	
	function setCurrent(_param){
		if(!_param) _param = {}
		id = (_param.id) ? _param.id : "";
		dir = (_param.dir) ? _param.dir : "";
		siteRoot = (_param.siteRoot) ? _param.siteRoot : "";
	}
	
	function getCurrent(){
		return {
			id : id,
			dir : dir,
			siteRoot : siteRoot
		};
	}

	return {
		setCurrent:setCurrent,
		getCurrent:getCurrent
	}

})();
