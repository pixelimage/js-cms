
var BackupU = (function(){
	
	function loadAPI(param,_callback) {
		
		param.zipDir = escape_url(CMS_Path.BACKUP.REL);
		param.siteDir = escape_url(SITE_DIR_PATH);
		
		if(param["targetDirs"]){
			param.targetDirs = escape_url(param.targetDirs);
		}
		
		var url = CMS_Path.PHP_BACKUP;
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			data			: param,
			url				: url,
			dataType		: 'json',
			success			: function(data) {
				setTimeout(function(){
					_callback(data)
				},200);
			},
			error			: function(data) {
				// if(isLog) console.log(data);
				CMS_ErrorView.stageIn("NET",url,param,data);
				// alert("ネットワークエラーが発生しました。");
			}
		})
	}
	function getSelectTag(){
		var a = [
			[5		,"5分"],
			[20		,"20分"],
			[1*60		,"1時間"],
			[3*60		,"3時間"],
			[12*60		,"12時間"],
			[1*24*60	,"1日"],
			[2*24*60	,"2日"],
			[4*24*60	,"4日"],
			[7*24*60	,"1週"],
			[14*24*60	,"2週"],
			[1*31*24*60	,"1月"],
			[2*31*24*60	,"2月"],
			[4*31*24*60	,"4月"],
			[12*365*60	,"1年"],
			[24*365*60	,"2年"]
		]
		var tag = ""
		tag += '<select id="hour">'
			tag += '<option value="0">選択してください</option>'
		for (var i = 0; i < a.length ; i++) {
			tag += '<option value='+ a[i][0] +'>'+ a[i][1] +"以内</option> "
		}
		tag += '</select>'
		return tag
	}
		
	function getDistanceTimeColor(old){
		/*
		var s = [
			old.substr(0,4),
			old.substr(4,2),
			old.substr(6,2)
		]
		var s2 = [
			old.substr(9,2),
			old.substr(11,2),
			old.substr(13,2),
		]
		var oldDate = new Date(s.join("/") +" " + s2.join(":"));
		*/
		var newDate = new Date();
		var sa = (newDate.getTime()/1000)-old;
		var min = sa /60;
		var cols = [
			[2				,"min2","数分以内"],
			[10				,"min10","10分以内"],
			[60				,"hour","1時間以内"],
			[60*6			,"hour6","6時間以内"],
			[60*24			,"day","1日以内"],
			[60*24*2		,"day2","2日以内"],
			[60*24*7		,"day7","7日以内"],
			[60*24*30		,"month","1月以内"],
			[60*24*30*2		,"month2","2月以内"],
			[60*24*30*4		,"month4","4月以内"],
			[60*24*30*12	,"year","1年以内"],
			[60*24*30*12*2	,"year2","2年以内"]
		]
		var s = [0,"year_",""]
		for (var i = 0; i < cols.length ; i++) {
			if(cols[i][0] > min){
				s = cols[i]
				break;
			}
		}
		return s;
	}
	return {
		loadAPI: loadAPI,
		getSelectTag: getSelectTag,
		getDistanceTimeColor: getDistanceTimeColor
	}
})();

