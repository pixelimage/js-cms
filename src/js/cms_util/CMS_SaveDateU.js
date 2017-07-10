var CMS_SaveDateU 		 = (function(){
	function getDate(){
		return DateUtil.getFormattedDate(new Date(),"YYYY/MM/DD hh:mm:ss");
	}
	function getRelatedDate(_s,_current){
		if(!_s) return "--";
		if(_s == "-") return "--";
		var d = new Date(_s);
		
		var c = new Date();
		if(_current != undefined)c = _current;
		var sec = (c.getTime()- d.getTime()) / (1000);
		var min = sec/60;
		var hour = min/60;
		var day = hour/24;
		var ss = "";
		if(sec < 20){
			ss = '<span class="_time-sec10">' + Math.floor(sec) +"秒前" + '</span>';
		} else if(sec < 60){
			ss = '<span class="_time-sec">' +Math.floor(sec) +"秒前" + '</span>'
		} else if(min < 60){
			ss = '<span class="_time-min">' +Math.floor(min) +"分前" + '</span>';
		} else if(hour < 24){
			ss = '<span class="_time-hour">' +Math.floor(hour) +"時間前" + '</span>';
		} else if(hour < 24*7){
			ss = '<span class="_time-day7">' +Math.floor(day) +"日前" + '</span>';
		} else if(hour < 24*30){
			ss = '<span class="_time-day30">' +Math.floor(day) +"日前" + '</span>';
		} else{
			ss = '<span class="_time-day">' +Math.floor(day) +"日前" + '</span>';
		}
		return ss;
	}
	
	return { 
		getDate:getDate,
		getRelatedDate:getRelatedDate
	}
})();
