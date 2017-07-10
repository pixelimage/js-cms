
CMS_Data.TextLoader = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_type,_url,_callback,_callback_e) {
	  this.init(_type,_url,_callback,_callback_e);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_type,_url,_callback,_callback_e) {
		this.type 	 = _type;
		this.url 	 = _url;
		this.callback  = _callback;
		this.callback_e  = _callback_e;
		this.data;
		this.load();
	}

	p.load = function() { 
		var this_ = this;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: this.url,
			dataType		: 'text',
			success			: function(data) { this_.load_comp(data); },
			error			: function(data) {
				if(this_.callback_e){
					this_.callback_e({});
				}
			}
		})
		
	}
	p.load_comp = function(_data) {
		if(isLog) console.log("HTMLService.loadTemplate : "+this.url);
		if(this.type == "TEXT"){ this.data = _data; }
		if(this.type == "JSON"){ 
			try{
				this.data = JSON.parse(_data);
			}catch( e ){
				this.data = {}
			}
		}
		if(this.type == "XML"){ this.data = _data}
		this.callback(this.data);
	}
	return c;
})();
