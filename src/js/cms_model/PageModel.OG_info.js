
PageModel.OG_info 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(o) {
	 this.init(o);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.param;
	p.id;
	p.name;
	p.note;
	p.sub;
	p.image;
	p.def;//フリーレイアウトの初期値として使用している
	p.callback;
	
	p.init = function(o) {
		this.param = o; 
		this.setParam();
	}
	p.setParam = function (){
		this.id 	 = defaultVal(this.param.id, "");
		this.freeHTML  = defaultVal(this.param.freeHTML, "");
		this.name 	 = defaultVal(this.param.name, "");
		this.note 	 = defaultVal(this.param.note, "");
		this.sub 	 = defaultVal(this.param.sub, "");
		this.image 	 = defaultVal(this.param.image, "");
		this.def 	 = defaultVal(this.param.def, "");
		this.callback = defaultVal(this.param.callback, null);
	}
	p.getHeadTag = function (){
		var tag = ""
		tag += '<div class="_head">'
		if(this.freeHTML != "")tag += this.freeHTML;
		if(this.name != "")tag += '<div class="_h2">'+this.name +'</div>'
		if(this.note != "")tag += '<div class="_read">'+this.note +'</div>'
		tag += this.getGuideImageTag();
		tag += '</div>'
		return tag;
	}
	p.uid = ""
	p.getFootTag = function (){
		var tag = "";
		tag += '<div class="_foot">'
		if(this.sub != ""){
			tag += '<div class="_read">'+this.sub +'</div>'
		}
		tag += '</div>'
		//
		if(this.callback){
			this.uid = "_pagemodel_" + DateUtil.getRandamCharas(10);
			tag += '<div id="'+this.uid+'"></div>'
		}
		return tag;
	}
	p.getGuideImageTag = function (){
		var tag = "";
		if(this.image) tag += '<img src="' + this.image +'?1" style="">'
		return tag;
	}
	// p.callbackView
	p.update = function (o){
		var s = ""
		if(this.callback){
			// if(!this.callbackView) {
			// 	this.callbackView = $("#SubPageView").find("#"+this.uid);
			// 	console.log(this.callbackView);
			// }
			s = this.callback(o,this.uid);
		}
		return s;
	}
	p.getTestTag = function() {
		var tag = "";
			tag += '<table class="_ut_info _ut_w200">';
			tag += '<tr><th>id</th><td>' + 		this.id + '</td></tr>';
			tag += '<tr><th>name</th><td>' + 	this.name + '</td></tr>';
			tag += '<tr><th>note</th><td>' + 	this.note + '</td></tr>';
			tag += '<tr><th>sub</th><td>' + 	this.sub + '</td></tr>';
			tag += '<tr><th>image</th><td>' + 	this.image + '</td></tr>';
			//tag += '<tr><th>def</th><td>' + 	this.def + '</td></tr>';
			tag += '<tr><th>callback</th><td>' + this.callback + '</td></tr>';
			tag += '</table>';
		return tag;
	}
	return c;
})();