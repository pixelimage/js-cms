
var TreeViewMakerView_TagList = (function(){
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
			v.tagListFuki.show()
	 	},function(){ 
			v.tagListFuki.hide()
	 	})
		
		v.tagListFuki = view.find("._tagListFuki");
		v.tagListFuki.html("");
		
		var prevPage;
		view.on("click","._tagListFuki ._tag",function(){
			if(prevPage) prevPage.removeClass("_current")
			var tar = $(this);
			tar.addClass("_current");
			prevPage = tar;
			selectTag(tar.data("name"));
		});
		view.on("click","a",function(){
			event.stopPropagation();
			event.preventDefault();
		});
	}
	
	function setCurrent(_s){
		if(_s == "--" )return;
		if(_s == ""){
			 view.find("#_tag_none").click();
			 return;
		}
		if(_s == "__ALL__"){
			 view.find("#_tag_all").click();
			 return;
		}
		for (var i = 0; i <  btns.length ; i++) {
			if(btns[i][1] ==_s){
				view.find("#"+btns[i][0]).click();
			}
		}
	}
	var icon = '<i class="fa fa-tags "></i> '
	function selectTag(_tag){
		var id = _tag
		var name = _tag
		if(_tag == "__ALL__"){
			 name = 'タグ : <b>' + icon + 'すべてのタグ</b>'
		} else if(_tag == ""){
			 name = '<b>タグ : '+icon+'選択なし<b>'
		} else{
			name = 'タグ : <b>' + icon + TreeViewU.roundText(name,10) + '</b>'
		}
		TreeViewMakerView.selectTag(id,name);
	}
	
	/* ---------- ---------- ---------- */
	
	var sitemap
	function update(_sitemap){
		sitemap = _sitemap;
		var tags = TreeAPI.getAllTag(sitemap);
		var tag = '<div id="_tag_none" class="_tag" data-name=""> 選択しない</div>'
			tag += '<div id="_tag_all" class="_tag" data-name="__ALL__"><i class="fa fa-tags "></i> すべてのタグ</div>'
			tag += '<ul>\n';
			tag += createPageList(tags);
			tag += '</ul>\n';
		v.tagListFuki.html(tag);
	}
	
	var initDirID;
	var pageCnt = 0;
	
	var btns 
	var iconDir = '<i class="fa fa-tag"></i> '
	function createPageList(_ls){
		btns = [];
		var tag = ""
		var ls = _ls;
			tag += '<ul>\n';
		for (var i = 0; i <  ls.length ; i++) {
			var name = ls[i];
			var uid = "_tag_" + pageCnt; pageCnt++;
			tag += '<li><div id="'+uid+'" class="_tag" '
			tag += 'data-name="'+name+'">'
			tag += iconDir + name + "</div></li>\n";
			btns.push([uid,name])
		}
			tag += '</ul>\n';
		return tag;
	}
	return {
		init: init,
		update: update,
		setCurrent: setCurrent
	}
})();
