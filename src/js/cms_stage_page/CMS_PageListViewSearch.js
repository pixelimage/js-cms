var CMS_PageListViewSearch 	  = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_PageListViewSearch');
		v.treeView = $('#CMS_PageListViewTree');
		storage_search_word= new Storage.Local("cms_search_word","");
	}
	
	/* ---------- ---------- ---------- */
	var storage_search_word;
	
	function createlayout(){
		var tag = ''
			tag += '<div class="_inputView">'
			tag += '<input class="_in_search" placeholder="名称やIDで検索" list="sitemapDatalist" >'
			tag += ' <i class="fa fa-times-circle _cms_btn_alpha _btn_delete"></i>'
			tag += '</div>'
		view.append(tag)
		v.inputView	 = view.find('._inputView');
		v.in_search	 = view.find('._in_search');
		v.btn_delete = view.find('._btn_delete');
		
		v.status	 = $('#CMS_PageListViewSearchBody ._status');
		v.replaceView = $('#CMS_PageListViewSearchBody ._replaceView');
		
		v.replaceView.hide();
		
		setBtn();
	}
	function setBtn(){
		v.in_search.focus(function(){
			prepa();
			searchWord = $(this).val();
			searchPage();
		});
		v.in_search.keyup(function(){
			searchWord = $(this).val();
			searchPage();
		});
		v.in_search.on('input', function(){
			searchWord = $(this).val();
			searchPage();
		});
		
		v.btn_delete.click(function(){ 
			searchWord = "";
			v.in_search.val(searchWord);
			searchPage();
		});
		//
		
		storage_search_word.load(function(){});
		searchWord = storage_search_word.getData();
		setTimeout(function(){
			if(searchWord != ""){
				prepa();
				v.in_search.val(searchWord).keyup()
			}
		},200)
	}

	var searchWord = "";
	var resultList = []
	function prepa(){
		resultList = [];
		prepa_loop(CMS_Data.Sitemap.getFilelist());
		updateView();
		
	}
	function prepa_loop(list){
		for (var i = 0; i < list.length ; i++) {
			if(list[i].list){
				prepa_loop(list[i].list)
			} else{
				if(list[i].type == Dic.PageType.PAGE){
					resultList.push(list[i]);
				}
			}
		}
	}
	function updateView(){
		var tags = ""
		var list = resultList
		for (var i = 0; i < list.length ; i++) {
				var isHide 		 = (list[i].isHide 		!= "1") ? true:false;
				var isHideMenu	 = (list[i].isHideMenu 	!= "1") ? true:false;
				var isUnderConst  = (list[i].isUnderConst != "1") ? true:false;
				var pubText = (isHide) 			? "" : '<b style="color:#999">(非公開)</b>';
					pubText += (isHideMenu) 	? "" : '<b style="color:#999">(メニュ非表示)</b>';
					pubText += (isUnderConst) 	? "" : '<b style="color:#999">(工事中)</b>';
				var pubClass = (isHide) ? "" : '_isHide';
				var tag  = '<div class="_btn_page '+pubClass+'" data-no="'+i+'" id="_search_'+list[i].id+'" data-dir="'+list[i].dir+'">'
					tag += '<table>'
					tag += '<tr>';
					tag += '<td style="width:17px;"><i class="fa fa-lg fa-file-text" style="margin:2px 2px 0 2px;"></i></td>';
					tag += '<td>';
					tag += '<span class="_btn_file_text">'+list[i].name+pubText+'</span>';
					tag += '<span class="_btn_file_text2">'+list[i].id+'</span>';
					tag += '</td>';
					tag += '</tr>';
					tag += "</table>";
					tag +='</div>';
				tags +=tag;
		}
		v.replaceView.html(tags);
		var s = ' > ._btn_page';
		v.btn_page = v.replaceView.find(s);
		v.btn_page.click( function(){
			var id = $(this).attr("id").split("_search_").join("");
			var dir = $(this).data("dir")
			CMS_MainController.openPage_by_id(id,dir);
		});
		v.btn_page.hide();
	}
	
	function searchPage(){
		if(!v.btn_page)return 
		
		storage_search_word.setData(searchWord);
		storage_search_word.save(function(){});
		
		var list = resultList;
		v.btn_page.hide();
		
		if(searchWord ==""){
			v.replaceView.hide()
			v.status.hide()
			v.treeView.show()
			v.btn_delete.removeClass("_active")
		} else{
			v.replaceView.show()
			v.status.show()
			v.treeView.hide()
			v.btn_delete.addClass("_active")
		}
		var c = 0;
		for (var i = 0; i < list.length ; i++) {
			if(isMatch(list[i])){
				c++;
				v.btn_page.eq(i).show();
				if(list[i].name){
					var s1 = list[i].name.split(searchWord).join('<span class="_cms_match">'+searchWord+'</span>');
					v.btn_page.eq(i).find('._btn_file_text').html(s1);
				}
				if(list[i].id){
					var s2 = list[i].id.split(searchWord).join('<span class="_cms_match">'+searchWord+'</span>');
					v.btn_page.eq(i).find('._btn_file_text2').html(s2);
				}
			}
		}
		v.status.html("<b>" + c + "</b>件が該当しました");
	}
	
	function isMatch(_page){
		var b 	 = false;
		var w 	 = searchWord;
		var name  = _page.name;
		var id 	 = _page.id;
		
		if(name.indexOf(w) != -1) b = true;
		if(id){
			if(id.indexOf(w) != -1) b = true;
		}
		return b;
	}
	var currentSelectView
	function openPage_(_sitemap){
		var id  = ""
		try{
		 id = _sitemap.attr("id").split(CMS_PageID.PAGE_PREFIX).join("_search_");
		}catch( e ){}
		if(currentSelectView){
			currentSelectView.removeClass("_active");
		}
		currentSelectView = $("#"+id);
		currentSelectView.addClass("_active");
	}
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,
		openPage_:openPage_
	 }
})();