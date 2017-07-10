/**
 * JOSNデータのIOを管理する。JSONファイルごとにインスタンスを作成する
 */
Storage.Online = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_type,_id,_dir,_initData) {
	  this.init(_type,_id,_dir,_initData);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_type,_id,_dir,_initData) {
		this.type 	 = _type;
		this.dir 	 = _dir;
		this.id 	 = _id;
		this.initData = _initData;
		this.storeData  = {};
		this.restoreJsonData;
		
		if(this.id == undefined) {
			alert("Errot at Storage.Online : IDが設定されていません。ブラウザをリロードしてください。")
		}
		if(window["TEST_DIR"] != undefined){
			D = window.TEST_DIR
		}
	}
	
	var D = "";

	p.load = function(_callback){
		/*
			JSONロードする。
			.jsonを直接ロードしてもいいが、ファイルが無いと404エラーが出てるので、
			いったん、PHPをかましてロードする
		*/
		
		var this_ = this
		var param ={}
			param.dir_name = CMS_Path.JSON.getRelDirPath(this.type,this.dir);
			param.file_name = CMS_Path.JSON.getFileName(this.type,this.id,this.dir);
			param = Storage.Util.escape_(param);
		var url = CMS_Path.PHP_FILEPATH + '?action=read&path=' + param.dir_name +"/"+ param.file_name
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'text',
			success			: function(data) {
				this_.loaded(_callback,data)
			},
			error			: function(data) { 
				CMS_ErrorView.stageIn("NET",url,param,data);
			}
		});
		if(isLog)console.log(["Storage load" , param.file_name , param ]);
	}
	p.loaded = function(_callback,data){
		if(data == "") data = "{}";
		try{
			this.storeData = JSON.parse(data);
			if(API_StatusCheck.check(this.storeData) == false) return;
			this.restoreJsonData = this.exportJSON();
			if(isLog) console.log(["_____ Loaded json ",this.storeData]);
		}catch( e ){
			console.log("Error at Storage.Online : JSONパースエラーが発生しました。");
			this.storeData = {};
		}
		_callback(this);
	}
	
	/* ---------- ---------- ---------- */
	//save
	
	p.setData = function(_data){
		this.storeData = _data;
	}
	p.save = function (_callback){
		var this_ = this;
		var param = {}
			param.action 	= "write";
			param.dir_name 	= CMS_Path.JSON.getRelDirPath(this.type,this.dir);
			param.file_name = CMS_Path.JSON.getFileName(this.type,this.id,this.dir);
			param.text 		= JSON.stringify(this.storeData, null, "	");
		var flow = {}
			flow.wtiteInStages = true;
			flow.updateSitemapSave = true;
			flow.updateSitemapPub = false;
		this.save_core(_callback,param,flow);
	}
	p.save_sitemap = function (_callback){
		var this_ = this;
		var param = {}
			param.action 	= "write";
			param.dir_name 	= CMS_Path.JSON.getRelDirPath(this.type,this.dir);
			param.file_name = CMS_Path.JSON.getFileName(this.type,this.id,this.dir);
			param.text 		= JSON.stringify(this.storeData, null, "	");
		var flow = {}
			flow.wtiteInStages = true;
			flow.updateSitemapSave = false;
			flow.updateSitemapPub = false;
		this.save_core(_callback,param,flow);
	}
	/* ---------- ---------- ---------- */
	//書き込みメイン
	//
	p.tID_save;
	p.save_core = function (_callback,param,flow){
		var this_ = this;
		if(this.tID_save) clearTimeout(this.tID_save);
		this.tID_save = setTimeout(function(){
			this_.save_core_delay(_callback,param,flow)
		},100);
	}
	p.save_core_delay = function (_callback,param,flow){
		
		if(flow.wtiteInStages){
			//JSONの保存は、書き込みミスが怖いので、段階的書き込みにする
			//JSONだと、だいたい1000文字で1Kになる(英語、日本語含みで)
			//10K超える場合は、段階的書き込みにする
			if(param.text.length > 1000*10){
				this.save_stage1(_callback,param,flow);
				return;
			}
		}
		var this_ = this;
		if(isLog)console.log(["Storage save ",CMS_Path.PHP_FILEPATH ,param.file_name,param])
		var url = CMS_Path.PHP_FILEPATH+"?_save_"+param.file_name;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {this_.saved(_callback,data,flow)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.saved = function (_callback,data,flow){
		if(API_StatusCheck.check(data) == false) return;
		this.saved_callback(_callback,flow)
	}
	p.saved_callback = function (_callback,flow){
		if(isLog)console.log(["_____ saved json or html"]);
		if(flow.updateSitemapSave) CMS_Data.Sitemap.saveDateLater(this.id,this.dir);
		if(flow.updateSitemapPub) CMS_Data.Sitemap.publicDateLater(this.id,this.dir);
		_callback(this);
	}
	/* ---------- ---------- ---------- */
	//サイズが大きいファイルのばあいは、いったんテンポラリファイルに書き込みしてから、
	//コールバック後、さらに、テンポラリを正しい名前にリネームさせる、段階的処理。
	
	p.save_stage1 = function (_callback,param,flow){
		var this_ = this;
		if(isLog)console.log(["Storage save ",CMS_Path.PHP_FILEPATH ,param.file_name,param])

		param.action = "writeToTemp";
		var afterParam = {}
			afterParam.action = "renameTemp";
			afterParam.dir_name = param.dir_name;
			afterParam.file_name = param.file_name;
		var url = CMS_Path.PHP_FILEPATH+"?_writeToTemp_"+afterParam.file_name;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {this_.saved_temp(_callback,data,afterParam,flow)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.saved_temp = function (_callback,data,param,flow){
		var this_ = this;
		if(API_StatusCheck.check(data) == false) return;
		var url = CMS_Path.PHP_FILEPATH+"?_renameTemp_"+param.file_name;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {this_.saved_temp_done(_callback,data,flow)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.saved_temp_done = function (_callback,data,flow){
		if(API_StatusCheck.check(data) == false) return;
		this.saved_callback(_callback,flow)
	}
		
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//公開
	
	p.publicData = function (_callback){
		
		//20161202 初期保存時用
		CMS_Data.Sitemap.publicDateInit(this.id,this.dir);
		
		var this_ = this;
		var param = {}
			param.action 	 = "write";
			param.dir_name 	 = CMS_Path.PAGE.getRelDirPath(this.dir);
			param.file_name  = this.id + ".html";

		var flow = {}
			flow.wtiteInStages = false;
			flow.updateSitemapSave = false;
			flow.updateSitemapPub = true;
			
			HTMLService.generateHTML(
				this.storeData,
				{
					id:this.id,
					dir:this.dir
				},
				function(_s){
					param.text = _s;
					this_.public_core(_callback,param,flow);
			})
	}
	p.unPublicData = function (_callback){
		CMS_Data.Sitemap.unPublicDateLater(this.id,this.dir);
		
		var this_ = this;
		var param ={}
			param.action 	 = "delete";
			param.deleteFile  = 	CMS_Path.PAGE.getRelPath(this.id,this.dir);
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {_callback(this)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	
	p.tID_pub;
	p.public_core = function (_callback,param,flow){
		var this_ = this;
		if(this.tID_pub) clearTimeout(this.tID_pub);
		this.tID_pub = setTimeout(function(){
			this_.public_core_delay(_callback,param,flow)
		},30);
	}
	p.public_core_delay = function (_callback,param,flow){
		var this_ = this;

		var url = CMS_Path.PHP_FILEPATH+"?_public_"+param.file_name
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {this_.published(_callback,data,flow)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.published = function (_callback,data,flow){
		if(API_StatusCheck.check(data) == false) return;
		this.saved_callback(_callback,flow);
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//プレビュー公開
	
	p.previewData = function (_callback){
		var this_ = this;
		var param = {}
			param.action = "write";
			param.dir_name = CMS_Path.ASSET.REL;
			param.file_name = CMS_Path.PREVIEW_HTML;
			
		var flow = {}
			flow.wtiteInStages = false;
			flow.updateSitemapSave = false;
			flow.updateSitemapPub = false;
			
			var d = this.storeData;
			if(this.id.indexOf("_cms_")!= -1){
				d = JSON.parse(PageElement_JText.templatePreviewPageData);
			}
			HTMLService.generateHTML(
				d,
				{
					id:this.id,
					dir:this.dir,
					siteRoot:"../"
				},
				function(_s){
					param.text = _s;
					this_.preview_core(_callback,param,flow);
			})
	}
		
	p.tID_pre;
	p.preview_core = function (_callback,param,flow){
		var this_ = this;
		if(this.tID_pre) clearTimeout(this.tID_pre);
		this.tID_pre = setTimeout(function(){
			this_.preview_core_delay(_callback,param,flow)
		},30);
	}
	p.preview_core_delay = function (_callback,param,flow){
		var this_ = this;

		var url = CMS_Path.PHP_FILEPATH+"?_public_"+param.file_name
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {this_.previewed(_callback,data,flow)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.previewed = function (_callback,data,flow){
		if(API_StatusCheck.check(data) == false) return;
		_callback(this);
	}
		
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//リビジョン用 20160429

	p.loaadedRevs
	p.loadRevision = function (_date,_callback){
		var this_ = this;
		var u = "?action=read"
			u += "&path=" + CMS_Path.JSON_REV.getRelPath(this.id,this.dir,_date);
		
		//ロード済みのファイルは、スルー
		if(this.loaadedRevs == undefined) this.loaadedRevs = [];
		for (var i = 0; i <  this.loaadedRevs.length ; i++) {
			if(this.loaadedRevs[i].id == _date){
				_callback(this.loaadedRevs[i].data);
				return;
			}
		}
		
		var url = CMS_Path.PHP_FILEPATH + u;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url ,
			dataType		: 'text',
			success			: function(data) {
				this_.loaadedRevs.push({id:_date,data:data})
				_callback(data);
			},
			error			: function(data) { CMS_ErrorView.stageIn("NET",url,param,data);}
		});
	}
	p.addRevision = function (_date,_id,_callback,_extra){
		var this_ = this;
		var param = {}
			param.action 	= "write";
			param.dir_name 	= CMS_Path.JSON_REV.getRelDirPath(this.type,this.dir);
			param.file_name = CMS_Path.JSON_REV.getFileName(this.type,this.id,this.dir,_id);
		if(! _extra){
			param.text 		= JSON.stringify(this.storeData, null, "	");
		} else if(_extra == "pre"){
			param.text 		= this.restoreJsonData
		}
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {this_.addRevision_comp(_date,_id,_callback)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.addRevision_comp = function (_date,_id,_callback){
		CMS_Data.Sitemap.addRevision( this.id , this.dir , _date );
		if(_callback)_callback();
	}
	p.removeRevision = function (_date,_id,_callback){
		CMS_Data.Sitemap.removeRevision(this.id , this.dir , _date );
		
		var this_ = this;
		var param = {}
			param.action 	 = "delete";
			param.deleteFile  = CMS_Path.JSON_REV.getRelPath(this.id,this.dir,_id);
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {if(_callback)_callback(this)},
			error			: function(data) {CMS_ErrorView.stageIn("",url,param,data);}
		})
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	
	p.getData = function (){ 
		return this.storeData;
	}
	p.reset = function (){ 
		//
	}
	p.exportJSON = function (){ 
		return JSON.stringify(this.storeData, null, "	");
	}
	p.exportJSON_flat = function (){ 
		return JSON.stringify(this.storeData);
	}
	p.importJSON = function (_s){
		try{
		 this.storeData = JSON.parse(_s);
		 //this.save(function(){});
		}catch( e ){
			alert("入力データが正しくありません。");
		}
	}
	return c;
})();

