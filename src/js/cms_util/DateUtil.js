var DateUtil 			 = (function(){
	/*
		DateUtil.getFormattedDate(new Date(),"YYYYMMDD_hhmmss");
	*/
	var lang = 1;
	var week = [
		["日","月","火","水","木","金","土"],
		["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]
	]
	var month = [
		["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",],
		["January","February","March","April","May","June","July","August","September","October","November","December"],
		["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."]
	]
	//var charas = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	var charas = "0123456789abcdefghijklmnopqrstuvwxyz"

	function getFormattedDate(_d,_format){
		var t = _format;
		var d = _d;
		//
		t = t.split("YYYY").join(d.getFullYear())
		t = t.split("MM").join(formatDigit(d.getMonth()+1,2));
		t = t.split("DD").join(formatDigit(d.getDate(),2));
		//
		t = t.split("hh").join(formatDigit(d.getHours(),2));
		t = t.split("mm").join(formatDigit(d.getMinutes(),2));
		t = t.split("ss").join(formatDigit(d.getSeconds(),2));
		t = t.split("ms").join(formatDigit(d.getMilliseconds(),3));
		t = t.split("month").join(month[lang][d.getMonth()]);
		t = t.split("week").join(week[lang][d.getDay()]);
		//
		t = t.split("RRRRR").join(getRandamCharas(5));
		t = t.split("RRRR").join(getRandamCharas(4));
		t = t.split("RRR").join(getRandamCharas(3));
		t = t.split("RR").join(getRandamCharas(2));
		t = t.split("R").join(getRandamCharas(1));
		return t;
	}
	
	function getRandamCharas(_n){
		var rr = "";
		for (var i = 0; i < _n ; i++) {
			rr += charas[Math.floor(Math.random()*charas.length)];
		}
		return rr;
	}
	function getTimeCharas(_distance){
		if(!_distance) _distance = 3000;
		var d = new Date();
		return Math.floor(d.getTime()/_distance);
	}
	
	function formatDigit(_n,_s){
		var s = String(_n);
		if(s.length<_s){
			for (var i = 0; i < _s ; i++) {
				if(s.length <= i)s ="0" + s;
			}
		}
		return s;
	}
	
	return { 
		getFormattedDate:getFormattedDate,
		getRandamCharas:getRandamCharas,
		getTimeCharas:getTimeCharas
	}
})();