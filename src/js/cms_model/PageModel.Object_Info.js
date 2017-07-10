
PageModel.Object_Info = (function() {
	/* ---------- ---------- ---------- */
	var c = function(o) {
	 this.init(o);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.param 
	p.id;
	p.name;
	p.def;
	p.cssDef;
	
	p.init = function(o) {
		this.param = o; 
		this.setParam();
	}
	p.setParam = function (){
		this.id  = defaultVal(this.param.id, "");
		this.custom  = defaultVal(this.param.custom, false);
		this.name  = defaultVal(this.param.name, "");
		this.name2  = defaultVal(this.param.name2, "");
		this.guide  = defaultVal(this.param.guide, "");
		this.def  = defaultVal(this.param.def, "");
		this.cssDef = defaultVal(this.param.cssDef, {file:"block",key:""});
		this.inputs = defaultVal(this.param.inputs, []);
		
		var o = {}
			o.type = this.id;
			o.custom = this.custom;
			o.name = this.name;
			o.name2 = (this.name2) ? this.name2 :"";
			o.inputs = this.inputs;
			
		PageElement_DIC.push(o);
	}
	p.getHeadTag = function (){
		var tag = ""
		tag += '<div class="_head">'
		tag += '</div>'
		return tag;
	}
	p.getGuideTag = function (){
		var tag = ""
		if(this.guide){
			if(window["CMS_GuideU"]){
			tag = CMS_GuideU.getGuideTag(this.guide,"_BASE_");
			}
		}
		return tag;
	}
	p.getFootTag = function (){
		var tag = ""
		tag += '<div class="_head">'
		tag += '</div>'
		return tag;
	}
	p.getTestTag = function (){
		var tag = "";
			tag += '<div class="_ut_object_info">'
			tag += '<span class="_t1">id</span><span class="_t2">'+this.id +'</span>';
			tag += '<span class="_t1">name</span><span class="_t2">'+this.name +'</span>';
			tag += '<span class="_t1">def</span><span class="_t2">'+this.def +'</span>';
			tag += '</div>'
		return tag;
	}
	p.getGuideImageTag = function (){
		return "";
	}
	return c;
})();