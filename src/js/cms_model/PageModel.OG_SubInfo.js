
PageModel.OG_SubInfo  = (function() {
	/* ---------- ---------- ---------- */
	var c = function(o) {
	 this.init(o);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.param; 
	p.name;
	p.note;
	p.sub;
	p.image;
	
	p.init 		 = function (o) {
		this.param = o; 
		this.name;
		this.note;
		this.sub;
		this.image;//BaseGridのサイドに表示される
		this.image2;//
		this.setParam();
	}
	p.setParam 	 = function (){
		this.name  = defaultVal(this.param.name, "");
		this.note  = defaultVal(this.param.note, "");
		this.sub  = defaultVal(this.param.sub, "");
		this.image  = defaultVal(this.param.image, "");
		this.freeHTML  = defaultVal(this.param.freeHTML, "");
	}
	p.getHeadTag  = function (){
		var tag = ""
		tag += '<div class="_head ">'
		if(this.name != "")tag += '<div class="_h3">'+this.name +'</div>'
		if(this.note != "")tag += '<div class="_read">'+this.note +'</div>'
		if(this.freeHTML != "")tag += this.freeHTML;
		
		tag += '</div>'
		return tag;
	}
	p.getFootTag  = function (){
		var tag = ""
		tag += '<div class="_foot">'
		if(this.sub != ""){
			tag += '<div class="_read">'+this.sub +'</div>'
		}
		tag += '</div>'
		return tag;
		
	}
	p.getTestTag = function (){
		var tag = ""
			tag += '<table class="_ut_info _ut_w300">';
			tag += '	<tr><th>name</th><td>' + this.name + '</td></tr>';
			tag += '	<tr><th>note</th><td>' + this.note + '</td></tr>';
			tag += '	<tr><th>sub</th><td>' + this.sub + '</td></tr>';
			tag += '	<tr><th>image</th><td>' + this.image + '</td></tr>';
			tag += '</table>';
		return tag;
	}
	
	//BaseGridのサイドに表示される
	p.getGuideImageTag = function (){
		var tag = "";
		// if(this.image) tag += '<img src="' + this.image +'" style="">'
		if(this.image) tag += this.image
		return tag;
	}
	return c;
})();