/**
 * テンプレートHTMLの管理
*/

CMS_Data.Template = (function(){
	/* ---------- ---------- ---------- */
	//テンプレートHTMLロード
	
	function init(){}
	
	
	/* ---------- ---------- ---------- */
	
	var tmp = {}
	//HTML生成時に、都度コールされる
	function load(_id, _callback) {
		
		id = Dic.DEFAULT_TEMPLATE;
		if (_id != "") {
			id = _id;
			id = id.split(" ").join("");
			id = id.split("	").join("");
		}
		var url = CMS_Path.ASSET.REL + Dic.DirName.TEMPLATE +"/"+ id;
		var urlR = url + "?" + new Date().getTime();
		if (!tmp[id]) {
			new CMS_Data.TextLoader("TEXT", urlR, function(_text) {
				tmp[id] = _text;
				_callback(tmp[id],url);
			},function(_text){
				alert("テンプレートHTMLが見つかりません。URL : " + url);
				_callback("",url);
			});
		} else {
			_callback(tmp[id],url);
		}
	}
	
	/* ---------- ---------- ---------- */

	//テンプレートファイル修正時にコールされる。
	function update(_id){
		if(tmp[_id]){
			tmp[_id] = null;
		}
	}
	
	/* ---------- ---------- ---------- */
	
	//利用できるテンプレート一覧を取得
	function loadList(_callback) {
		var p = "?action=getFileList&dir_name=" + escape_url(CMS_Path.ASSET.REL) + Dic.DirName.TEMPLATE + "/";
		var url = CMS_Path.PHP_DIRECTORY + p;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'json',
			success			: function(data) { _loadList_comp(data,_callback)},
			error			: function(data) {
				CMS_ErrorView.stageIn("NET",url,null,data);
			}
		})
	}
	function _loadList_comp(json,_callback) {
		if(API_StatusCheck.check(json) == false) return;
		
		var files = json.files;
		var a = [];
		for (var i = 0; i <  files.length ; i++) {
			var node = files[i];
			if(_isFile(node.name)){
				// var o = {
				// 	dir:this.dirName,
				// 	name:node.name
				// }
				a.push([this.dirName , node.name ])
			}
		}
		setTemplateList(a);
		if(_callback ) _callback();
	}
	function _isFile(_s) {
		if(_s.indexOf(".") != -1) {
			return FileU.isEditableFile(_s);
 		} else{
 			return false;
 		}
	}
	
	//ロードしたリストをセット
	
	var templateList = []
	function setTemplateList(_a){
		templateList = _a;
		FormCandidates.setTemplateList(_a);
	}
	function getList(){
		return templateList;
	}
	function getSelectList(){
		var a = []
		a.push(["",Dic.DEFAULT_TEMPLATE+" (デフォルト)",""])
		for (var i = 0; i <  templateList.length ; i++) {
			if(templateList[i][1] != Dic.DEFAULT_TEMPLATE){
				var ss = templateList[i][1];
				a.push([ss,ss,ss])
			}
		}
		return a
	}

	/* ---------- ---------- ---------- */
	
	function treatTemplateName(_o){
		var _id = ""
		try{
		 _id = _o.template;
		}catch( e ){}
		if(_id ==undefined) _id = "";
		_id = _id.split(" ").join("")
		
		if(_id == ""){
			_id = Dic.DEFAULT_TEMPLATE
		}
		
		return _id
	}
	/* ---------- ---------- ---------- */
	
	function getTemplateName(_id){
		_id = _id.split(" ").join("");
		if(_id == undefined) _id = "";
		_id = _id.split(" ").join("");
		if(_id == ""){
			_id = Dic.DEFAULT_TEMPLATE
		}
		return _id;
	}
	
	/* ---------- ---------- ---------- */
	
	//ページビューで、テンプレを選択した場合にコールされる
	function setTemplateName(_o,_tempalte){
		if(_o["template"] == undefined){
			_o["template"] = ""
		}
		_o.template = _tempalte;
	}
	
	/* ---------- ---------- ---------- */

	function openTemplate(_data){
		if(!_data.meta) _data.meta = {}
		if(!_data.meta.template) _data.meta.template = Dic.DEFAULT_TEMPLATE;
		CMS_MainController.openTemplateHTMLFile(_data.meta.template);
	}
	
	/* ---------- ---------- ---------- */
	return { 
		init:init,
		loadList:loadList,
		load:load,
		update:update,
		getList:getList,
		getSelectList:getSelectList,
		treatTemplateName:treatTemplateName,
		getTemplateName:getTemplateName,
		setTemplateName:setTemplateName,
		openTemplate:openTemplate
	}
})();

