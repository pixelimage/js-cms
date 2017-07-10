/**
 * ページツリーの開閉リストの記憶などで仕様
 */

Storage.Local = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_id,_initData) {
	  this.init(_id,_initData);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_id,_initData) {
		this.id 	 = _id;
		this.initData = _initData;
		this.storeData  = {};
		this.callback;
		this.callbackSave;
	}

	p.load = function(_callback) { 
		this.callback = _callback;
		var s;
		if(!localStorage.hasOwnProperty(this.id)){
			s = JSON.stringify(this.initData);
			localStorage[this.id] = s;
		} else{
			s = localStorage[this.id];
		}
		this.storeData = JSON.parse(s);
		this.save(function(){});
		this.loaded();
	}
	p.loaded = function(){
		this.callback();
	}
	p.setData = function(_data){
		this.storeData = _data;
	}
	p.save = function (_callback){
		this.callbackSave = _callback;
		localStorage[this.id] = JSON.stringify(this.storeData);
	}
	p.saved = function (data){
		this.callbackSave();
	}
	p.getData = function (){ 
		return this.storeData;
	}
	p.reset = function (){ 
		delete localStorage[this.id];
	}
	p.exportJSON = function (){ 
		return JSON.stringify(this.storeData, null, "	");
	}
	p.importJSON = function (_s){
		try{
		 this.storeData = JSON.parse(_s);
		 this.save(function(){});
		}catch( e ){
			alert("入力データが正しくありません。");
		}
	}
	return c;
})();

