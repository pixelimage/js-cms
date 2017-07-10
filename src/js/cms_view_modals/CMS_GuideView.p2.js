var GUIDE_STANDALONE = false;
// var tID;
// if(tID) clearTimeout(tID);
// tID = setTimeout(function(){
// 	CMS_GuideView.stageIn("")
// },500);

var CMS_GuideU = (function(){
	function loadInit(_calback){
		_calback();
		/*
		var u = "./guide.php?" + "url=" + GUIDE_URL + "/guide.xml"
		$.ajax({
			scriptCharset: 'utf-8',
			type		: 'GET',
			url			: u,
			dataType	: 'xml',
			success		: function(s) { 
				setData(s);
				_calback();
			}
		})
		*/
	}
	
	function openGuide(_id){
		if(window.location.href.indexOf("http://192.168.1.23:999/develop") != -1){
			window.GUIDE_URL = "http://192.168.1.23:1000/server/www.js-cms.jp.v4/www/"
		}
		window.open(window.GUIDE_URL + "gateway.html#" + _id , "cms_guide");
	}
	//CMS_GuideU.getGuideTag("inspect/view","_BASE_","dark");
	function getGuideTag(_id,_s,_type){
		// return ""
		_s = _s.split("_BASE_").join("ガイド")
		if(_type == "dark"){
			return  '<span class="_btn_guide_block _btn_guide_block_dark" data-id="'+_id+'"><i class="fa fa-lg fa-question-circle"></i> ' + _s + "</span>" 
		} else if(_type == "header"){
			return  '<span class="_btn_guide_block _btn_guide_block_header _big" data-id="'+_id+'"><i class="fa fa-lg fa-question-circle"></i> ' + _s + "</span>" 
		} else if(_type == "big"){
			return  '<span class="_btn_guide_block _btn_guide_block_light _big" data-id="'+_id+'"><i class="fa fa-lg fa-question-circle"></i> ' + _s + "</span>" 
		} else if(_type == "blue"){
			return  '<span class="_btn_guide_block _btn_guide_block_light _blue" data-id="'+_id+'"><i class="fa fa-lg fa-question-circle"></i> ' + _s + "</span>" 
		} else{	
			return  '<span class="_btn_guide_block _btn_guide_block_light" data-id="'+_id+'"><i class="fa fa-lg fa-question-circle"></i> ' + _s + "</span>" 
		}
	}
	function setData(_xml){
		xml = _xml;
	}
	var xml;

	function getXML(_xml){
		return xml;
	}

	function getData(_id){
		if(!_id) return;
		var a = _id.split("/")
		var dir = $(xml).find("gloup#"+a[0]);
		
		var tar = { dir : {}, page : null };
			tar.dir.id = a[0];
			tar.dir.name = dir.attr("name");
			
		var items = dir.find("item");
			items.each(function(){
			var fullID = a[0]+"/"+$(this).attr("id");
			if(fullID == _id){
					tar.page = $(this);
			}
		})
		return tar;
	}
	function getBodyTag(_param){
		var _s = ajastSRC(_param.text);
		_s = _s.split("\n\n\n\n\n").join("\n\n");
		_s = _s.split("\n\n\n\n").join("\n\n");
		_s = _s.split("\n\n\n").join("\n\n");
		if(_s.charAt(0) == "\n") _s = _s.substr(1,_s.length)
		var a = _s.split("\n");
		
		var a2= []
		for (var i = 0; i <  a.length ; i++) {
			var s = a[i];
			var b = false
			if(s.substr(0,4) == "####") {
				s = s.split("####").join('<div class="_h4">') + '</div>'
				b = true;
			}
			if(s.substr(0,3) == "###") {
				s = s.split("###").join('<div class="_h3">') + '</div>'
				b = true;
			}
			if(s.substr(0,3) == "##+") {
				if(_param.useToggle){
				s = s.split("##+").join('<div class="_h2-toggle"><span class="icon"><i class="fa fa-caret-down "></i></span>') + '</div>'
				} else{
				s = s.split("##+").join('<div class="_h2">') + '</div>'
				}
				b = true;
			}
			if(s.substr(0,3) == "##!") {
				s = '<div class="_h2-midashi"><i class="fa fa-level-up fa-rotate-180"></i> ここから上級者・制作者向け</div>'
				b = true;
			}
			if(s.substr(0,2) == "##") {
				s = s.split("##").join('<div class="_h2">') + '</div>'
				b = true;
			}
			if(s.substr(0,2) == "//") {
				s = ""
				b = true;
			}
			if(s.indexOf("<<<") == 0)  {
				if(_param.useToggle){
					s = '<div class="_toggle-body">'
				} else{
					s = "";
				}
				b = true;
			}
			if(s.indexOf(">>>") == 0)  {
				if(_param.useToggle){
					s = '</div>'
				} else{
					s = "";
				}
				b = true;
			}
			if(s.charAt(s.length-1) == ">")  {
				b = true;
			}
			if(b == false){
				s += '<br>' 
			}
			a2.push(s)
		}
		return a2.join("\n");
	}
	function ajastSRC(_s){
		_s = replaceText(_s);
		if(window["GUIDE_STANDALONE"]){
			return _s;
		} else {
			// _s = _s.split("img  src").join("img src");
			// return _s.split('img src="').join('img src="guide/');
			_s = _s.split("img  src").join("img src");
			return _s.split('img src="').join('img src="'+GUIDE_URL);
		}
	}
	
	function ajastPath(_s){
		if(window["GUIDE_STANDALONE"]){
			return _s;
		} else {
			return "guide/" + _s
		}
	}
	var ICON_FILE = ' <i class="fa fa-file-text _color-file"></i> '
	
	var CMS_GuideDIC = [
		['[[設定：CMS置換えタグ]]'	,'html/_setting/doc_keys.json'	,"サイト設定：ページ情報タグへ"],
		['[[設定：置換えタグ登録]]'	,'html/_setting/keys.json'		,"サイト設定：UIタグ登録へ"],
		['[[設定：共通パーツ]]'		,'html/_setting/replace.json'	,"サイト設定：パーツ・ひな形登録へ"]
	];
	function replaceText(_s){
		var DIC = CMS_GuideDIC;
		for (var i = 0; i <  DIC.length ; i++) {
			if(_s.indexOf(DIC[i][0]) != -1){
				var rep = "";
				rep += '<div>' + ICON_FILE + '<a href="' + DIC[i][1] + '" data-type="cms_link">'
				rep += DIC[i][2]
				rep += '</a></div>'
				_s = _s.split(DIC[i][0]).join(rep)
			}
			}
		var ms = _s.match(/\[\[{.*?\}]\]/g);
		if(ms){
			for (var i = 0; i < ms.length ; i++) {
				var id = ms[i]
					id = id.split("[[{").join("");
					id = id.split("}]]").join("");
				var rep = ""
					rep += ICON_FILE+'<a href="' + id + '" data-type="cms_link">' + id + '</a>'
				_s = _s.split(ms[i]).join(rep);
			}
		}
		
		var ms = _s.match(/\[\[.*?\]\]/g);
		if(ms){
			for (var i = 0; i < ms.length ; i++) {
				var id = ms[i]
					id = id.split("[[").join("")
					id = id.split("]]").join("")
				var rep = ""	
				var param = CMS_GuideU.getData(id);
				if(param.page){
					var nn = param.page.find("name").text();
					rep += '<div class="_color-help"><i class="fa fa-lg fa-question-circle "></i> '
					rep += '<a href="' + id + '" data-type="guide">' + nn + '</a></div>'
				}
				_s = _s.split(ms[i]).join(rep);
			}
		}
		
		return _s;
	}
	return {
		loadInit:loadInit ,
		openGuide:openGuide ,
		getGuideTag:getGuideTag ,
		getXML:getXML ,
		getData:getData ,
		getBodyTag:getBodyTag,
		ajastPath:ajastPath
	}
})();

