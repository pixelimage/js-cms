var FormCandidates = (function(){
	var view;
	var v = {};
	var isInited = false;
	function init(){
		isInited = true;
		view = $('#FormCandidates');
		
		var tag = ''
			tag += '<div class="_templateList"></div>'
			tag += '<div class="_sitemapList"></div>'
			tag += '<div class="_sitemapList_html"></div>'
			tag += '<div class="_tagList"></div>'
			
		view.append(tag)
		v.templateList = view.find('._templateList');
		v.sitemapList = view.find('._sitemapList');
		v.sitemapList_html = view.find('._sitemapList_html');
		v.tagList = view.find('._tagList');
	}

	function setTemplateList(_a){
		if(!isInited)return;
		var  list = _a;
		var tag = "";
			tag += '<datalist id="templateDatalist">'
		for (var i = 0; i < list.length ; i++) {
			tag += '<option value="' + list[i][1] +'"></option>'
		}
		tag += '</datalist>';
		if(v.templateList){
			v.templateList.html(tag);
		}
	}
	function setSitemapList(list,listGloups){
		if(!isInited)return;
		//ページIDリスト
		var tag = ""
			tag += '<datalist id="sitemapDatalist">'
		for (var i = 0; i < list.length ; i++) {
			tag += '<option value="' + list[i].id +'"></option>'
		}
			tag += '</datalist>';
			
		//グループIDリスト
			tag += '<datalist id="sitemapDatalistGloups">'
		for (var i = 0; i < listGloups.length ; i++) {
			tag += '<option value="' + listGloups[i].id +'"></option>'
		}
			tag += '</datalist>';
			
		v.sitemapList.html(tag);
		
		var tag = ""
			tag += '<datalist id="sitemapDatalist_html">'
		for (var i = 0; i < list.length ; i++) {
			tag += '<option value="' + list[i].id +'.html"></option>'
		}
			tag += '</datalist>';
		v.sitemapList_html.html(tag);
		
		setTagList();
	}	

	function setTagList(){
		if(!isInited)return;
		var tags = TreeAPI.getAllTag(CMS_Data.Sitemap.getData());
		var tag = "";
			tag += '<datalist id="tagDatalist">'
		for (var i = 0; i < tags.length ; i++) {
			tag += '<option value="' + tags[i] +'"></option>'
		}
			tag += '</datalist>';
		v.tagList.html(tag);
	}
	return {
		init:init ,
		setTemplateList:setTemplateList,
		setSitemapList:setSitemapList
	}
})();