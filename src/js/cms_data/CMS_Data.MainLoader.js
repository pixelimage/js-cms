var CMS_Data = {}

CMS_Data.init = function(){
	CMS_Data.MyTag.init();
	CMS_Data.Template.init();
	CMS_Data.Sitemap.init();
}

//アセットファイル保存時にコールされる
CMS_Data.update = function(_id,_dir){
	CMS_Data.Template	.update(_id);
	CMS_Data.AssetFile	.update(_dir,_id);
}

//設定ファイルロード
 CMS_Data.Loader  = (function(){
	
	var callback 
	function start(_callback){
		callback = _callback
		load();
	}
	//設定JSONロード
	//設定ファイル中にプレビュー幅サイズがあるので、登録しておくCMS_SizeManagerに登録しておく
	function load(){
		CMS_Data.MyTag.loadList(function (){ loaded(); });
		CMS_Data.CodeDic.load(function(){ loaded(); });
		CMS_Data.Template.loadList(function(){ loaded(); });
		CMS_Data.InspectCSS.load(function(){ loaded(); });
	}
	var max = 4;
	var cnt = 0;
	function loaded(){
		cnt++;
		if(max == cnt)callback();
	}
	return { start:start }
})();

//PHPコードなど、テンプレコードを管理
CMS_Data.CodeDic = (function(){

	var callback
	function load(_callback){
		callback = _callback;
		var rSeed = "?r=" + DateUtil.getFormattedDate(new Date(), "YYYYMMDD_hhmm");

		var path =  "js/codes.xml" + rSeed;
		new CMS_Data.TextLoader("XML", path, function(data) {
			setData(data);
			_callback();
		});
	}
	
	var dic = [];
	function setData(_xml){
		var items = $($.parseXML(_xml)).find('item');
		items.each(function(i, dom) {
			var id = $(this).find('id').text();
			var val = $(this).find('code').text();
				// val = U.trimFirstLastBR(val);
			dic.push([id,val]);
		});
	}
	
	function getCode(_id){
		for (var i = 0; i <  dic.length ; i++) {
			if(_id == dic[i][0]){
				return dic[i][1]
			}
		}
		return "--";
	}
	
	return { 
		load : load,
		getCode : getCode
	}
})();