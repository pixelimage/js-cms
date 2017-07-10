var StringU 			 = (function(){

	function z2h(s){
		return s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
	}

	function h2z(s){
		return s.replace(/[A-Za-z0-9]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
		});
	}
	
	function zen2han(s){
		s = z2h(s)
		return s;
	}
	
	function han2zen(s){
		s = h2z(s);
		var res = (s.match(/<("[^"]*"|'[^']*'|[^'">])*>/g));
		
		if(res){
		for (var i = 0; i < res.length ; i++) {
			s = s.split(res[i]).join(z2h(res[i]));
		}
		}
		return s;
	}
	function deleteTag(s){
		return s.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
	}
	
	return { 
		zen2han:zen2han,
		han2zen:han2zen,
		deleteTag:deleteTag
	 }
})();

var NumberU 			 = (function(){
	//NumberU.defaultNumber
	function defaultNumber(_n,_def){
		_def = ( isNaN(_def) ) ? 0 : _def;
		var n = Number(_n);
		if(isNaN(n)){
			return _def
		} 
		return n
	}
	return { 
		defaultNumber:defaultNumber
	 }
})();

