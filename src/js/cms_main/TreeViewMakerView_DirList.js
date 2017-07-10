
var TreeViewMakerView_DirList = (function(){
	var view;
	var v = {};
	
	function init(_view){
		view = _view;
		createView();
	}
	
	/* ---------- ---------- ---------- */
	
	function createView(){
		
	 	view.hover(function(){ 
			TreeViewMakerViewEditor.stageOut();
			v.dirListFuki.show()
	 	},function(){ 
			v.dirListFuki.hide()
	 	})
		
		v.dirListFuki = view.find("._dirListFuki");
		v.dirListFuki.html("");
		
		var prevPage;
		view.on("click","._dirListFuki ._dir",function(){
			if(prevPage) prevPage.removeClass("_current")
			var tar = $(this);
			tar.addClass("_current");
			prevPage = tar;
			var o = {
				name:tar.data("name"),
				id:tar.data("id")
			}
			selectDir( o);
		});
		view.on("click","a",function(){
			event.stopPropagation();
			event.preventDefault();
		});
	}
	function setCurrent(_s){
		if(_s == "--" )return;
		var tar = view.find("#_dl_" + _s);
		if(tar.size() == 0){
			view.find("#_dl_root").click();
		} else{
			tar.click();	
		}
	}
	
	function selectDir(_o){
		var s = 'グループ：<b><i class="fa fa-folder "></i> ';
			s += TreeViewU.roundText(_o.name,10) + "</b>";
		TreeViewMakerView.selectDir(_o.id,s);
	}
	
	/* ---------- ---------- ---------- */
	
	var sitemap
	function update(_sitemap){
		sitemap = _sitemap;
		var tag = '<div id="_dl_root" class="_dir" data-name="サイトルート" data-id=""><i class="fa fa-folder "></i> サイトルート</div>'
			tag += '<ul>'
			tag += createPageList(sitemap,0);
			tag += '</ul>'
		v.dirListFuki.html(tag);
	}
	
	var initDirID;
	var pageCnt = 0;
	
	var iconDir = '<i class="fa fa-folder-open"></i> '
	function createPageList(_tree,_deep){
		var tag = ""
		var ls = _tree.list;
		tag += '<ul>'
		for (var i = 0; i <  ls.length ; i++) {
			var ss = getStateText(ls[i].state);
			if(ls[i].type == "dir"){
				var uid = "_dl_" + ls[i].id;
				if(_deep == 1){ 
					if(initDirID == undefined) initDirID = uid;
				}
				tag += '<li><div id="'+uid+'" class="_dir" '
				tag += 'data-name="'+ls[i].name+'" data-id="'+ls[i].id+'">'
				tag += iconDir + ls[i].name + ss +"</div></li>";
				tag += createPageList(ls[i],_deep+1)
			} 
		}
		tag += '</ul>'
		return tag;
	}
	function getStateText(_s){
		try{
			if(_s.split(",")[1] == "1") return '<span class="state"> (メニュー非表示)</span>'
		}catch( e ){}
		return ""
	}
	return {
		init: init,
		update: update,
		setCurrent: setCurrent
	}
})();
