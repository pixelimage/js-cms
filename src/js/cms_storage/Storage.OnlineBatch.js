
//バッチ用
Storage.OnlineBatch = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_pages) {
	  this.init(_pages);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_pages) {
		this.type 	 = "page";
		this.pages 	 = _pages;
		this.leng = this.pages.length;
		this.sep = "__" + new Date().getTime() + "__";
	}
	var SEP = "__SEP__"
	p.start = function(_callback){
		this.callback = _callback;
		this.pageClasses = [];
		
		var self = this;
		var files = []
		for (var i = 0; i <  this.leng ; i++) {
			var model = this.pages[i];
			var f = "";
				f += CMS_Path.JSON.getRelDirPath(this.type,model.dir);
				f += CMS_Path.JSON.getFileName(this.type,model.id,model.dir);
			files.push(f);
		}
		
		var this_ = this;
		
		var url = "";
			url += CMS_Path.PHP_FILEPATH;
			url += "?action=readAll";
			url += "&outType=text";
			url += "&sep=" + this.sep;
			url += "&paths=" + escape_url(files.join(SEP));
		
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: url,
			dataType		: 'text',
			success			: function(data) { 
				this_.loaded(data);
			},
			error			: function(data) { CMS_ErrorView.stageIn("NET",url,null,data); }
		});
	}
	
	/* ---------- ---------- ---------- */

	p.outs = "";
	p.htmls ;
	p.count = 0;
	p.loaded = function (data){
		this.storeDatas = data.split(this.sep);
		this.htmls = [];
		this.genHTML();	
	}
	
	p.genHTML = function (){
		var self = this;
		var cnt = this.count;
		this.count++;
		
		var model = this.pages[cnt];
		var data = {}
		try{
			if(!this.storeDatas[cnt]){
				 this.storeDatas[cnt] = "{}"
			}
  			data = JSON.parse(this.storeDatas[cnt]);
		}catch( e ){
			this.genHTML_next();
			return;
		}
		
		HTMLService.generateHTML(
			data,
			{
				id:model.id,
				dir:model.dir
			},
			function(_s){
				self.htmls.push(_s);
				self.genHTML_next();
			}
		);
	}
	p.genHTML_next = function (){
		if(this.leng == this.count){
			this.public();
		} else{
			this.genHTML();	
		}
	}
	p.public = function (){
		var self = this;
		var files = []
		for (var i = 0; i <  this.pages.length ; i++) {
			var model = this.pages[i];
			 files.push(CMS_Path.PAGE.getRelDirPath(model.dir) + model.id + ".html");
		}
		var param = {}
			param.action = "writeAll";
			param.sep 		= this.sep;
			param.paths 	= escape_url(files.join(SEP));
			param.text		= this.htmls.join(this.sep);
		var url = CMS_Path.PHP_FILEPATH;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'POST',
			url				: url,
			data			: Storage.Util.escape_(param),
			dataType		: 'json',
			success			: function(data) {self.published(data)},
			error			: function(data) {CMS_ErrorView.stageIn("NET",url,param,data);}
		})
	}
	p.published = function (data){
		this.callback();
	}
	
	return c;
})();

