
var TreeViewMakerView_PageList = (function(){
	var view;
	var v = {};
	
	var sitemap
	function init(_view){
		view = _view;
		createView();
	}
	
	/* ---------- ---------- ---------- */
	
	function createView(){
	 	view.hover(function(){ 
			TreeViewMakerViewEditor.stageOut();
			v.pageListFuki.show()
	 	},function(){ 
			v.pageListFuki.hide()
	 	})
	 	
		v.pageListFuki = view.find("._pageListFuki");
		v.pageListFuki.html("");
		
		var prevPage
		view.on("click","._pageListFuki ._page",function(){
			if(prevPage) prevPage.removeClass("_current")
			var tar = $(this);
			tar.addClass("_current")
			prevPage = tar;
			var o = {
				name:tar.data("name"),
				id:tar.data("id"),
				dir:tar.data("dir")
			}
			selectPage( o );
		});
		view.on("click","a",function(){
			event.stopPropagation();
			event.preventDefault();
		});
	}
	
	function setCurrent(_o){
		if(_o == undefined) {
			_o = {id:"",dir:""}
		}
		var tar = view.find("#_dl_" + _o.id + "_" + _o.dir.split("/").join("__"));
		if(tar.size() == 0){
			// view.find("#_dl_root").click();
		} else{
			tar.click();	
		}
	}
	
	function selectPage(_o){
		TreeViewMakerView.selectPage(_o);
	}
	
	/* ---------- ---------- ---------- */
	
	var hrefList 
	var pageCnt = 0;
	function update(_sitemap){
		sitemap = _sitemap;
		hrefList = []
		if(sitemap.list.length > 0){
			pageCnt = 0
			v.pageListFuki.html(createPageList(sitemap,0));
			view.find("._pageListFuki ._page").eq(0).click();
		} else{
			v.pageListFuki.html("マッチするページはありません。");
			TreeViewMakerView.update_delay();
		}
	}
	
	var iconDir = '<i class="fa fa-folder-open"></i> '
	var iconFile = '<i class="fa fa-file-text "></i> '
	function createPageList(_tree,_deep){
		var tag = ""
		var ls = _tree.list;
		tag += '<ul>'
		for (var i = 0; i <  ls.length ; i++) {
			var ss = getStateText(ls[i].state);
			if(ls[i].type == "dir"){
				tag += '<li><div class="_dir">' + iconDir + ls[i].name + ss + "</div></li>";
				tag += createPageList(ls[i],_deep+1)
			} else if(ls[i].type == "page"){
				if(ls[i].dir == undefined) ls[i].dir = "";
				var href = CMS_Path.PAGE.getAbsPath(ls[i].id,ls[i].dir);
				var uid = "_dl_" + ls[i].id + "_" + ls[i].dir.split("/").join("__");
				tag += '<li><div id="'+uid+'" class="_page" '
				tag += 'data-name="'+ls[i].name+'" data-id="'+ls[i].id+'" data-dir="'+ls[i].dir+'">'
				tag += iconFile + ls[i].name + ss;
				tag += "</div></li>";
				hrefList.push([href,uid])
				pageCnt++
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
	
	/* ---------- ---------- ---------- */

	function show(){
		v.pageListFuki.show()
	}
	function select_by_href(_s){
		if(hrefList == undefined) return ;
		for (var i = 0; i <  hrefList.length ; i++) {
			if(hrefList[i][0] == "/"+_s){
				view.find("#"+hrefList[i][1]).click();
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	
	function getPageSum(){
		return pageCnt;
	}
	
	return {
		init: init,
		update: update,
		show: show,
		setCurrent: setCurrent,
		select_by_href: select_by_href,
		getPageSum: getPageSum
	}
})();
