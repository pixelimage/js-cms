
var CMS_History = (function(){
	var view;
	var v = {};
	
	function init(){
		document.title = SITE_NAME;
		try{
			window.addEventListener('popstate', function(e) {
				if(e.state == null )return;
				openPage(e.state);
			},false);
			window.addEventListener('hashchange', function() {
				if(!openBlock){
					var state = window.location.hash;
					CMS_MainController.openPage_by_hash(state);
				}
			},false);
		}catch( e ){}
	}
	function getInitParam(){
		var state = window.location.hash;
		state = "/" + state.split("#").join("");
		return CMS_Path.PAGE.getAbsPath_reverse(state);
	}
	
	var openBlock = false
	function openPage(_state){
		if(openBlock == false){
			openBlock = true;
			openPage_core(_state);
			setTimeout(function(){
				openBlock = false;
			},100);
		}
	}
	
	function openPage_core(_state){
		var state = CMS_Path.PAGE.getAbsPath_reverse(_state);
		var param = CMS_Data.Sitemap.getData_by_id(state.id,state.dir);
		if(param){
			CMS_MainController.openPage(param,false);
		}
	}
	function addPage(_param){
		var dir = ""
		var id = _param.id
		if(_param["dir"] != undefined) dir = _param.dir;
		
		var state = CMS_Path.PAGE.getAbsPath(id,dir);
		var name = _param.name;
		
		//myタグページ調整
		if(_param.type == Dic.PageType.CMS_MYTAG){
			state = CMS_Path.PAGE.ABS + state;
			state = state.split("//").join("/");
			name = "{{Myタグ設定}} " + name;
		}
		
		var hash = state;
		if(hash.charAt(0) == "/") hash = state.substr(1,state.length)
		
		document.title = (function(_param){ 
			if(name == undefined){
				return CMS_INFO.name + " : " + _param.id;
				// return CMS_INFO.name + " : " + _param.id;
			} else{
				return SITE_NAME + " : " + name;
			}
		})(_param);
		if(history["pushState"]){
			history.pushState(state, null, "#" +hash);
		}
	}

return {
	init: init,
	getInitParam: getInitParam,
	addPage: addPage
}
})();
