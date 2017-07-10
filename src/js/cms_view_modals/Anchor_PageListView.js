var Anchor_PageListView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Anchor_PageListView');
		stageInit();
	}
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_PageListView,view);

		var tag = ""
			tag = '<div class="_title">ページ選択</div>'
		v.header.html(tag);
		
			tag = ""
		v.body.html(tag);
		
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		v._btn_close = view.find('._btn_close');
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		view.on("click",'._hasData',function(){ 
			clickText($(this).data("url"));
		});
		view.on("click",'._btn_link',function(event){ 
			var u = $(this).data("url");
			CMS_U.openURL_blank(u);
			event.stopPropagation();
			event.preventDefault();
		});
	}
	
	/* ---------- ---------- ---------- */
	//dir
	
	function update(){
		v.body.html(createPagelistBox);
	}
	
	var sitemapSelTag = ""
	function createPagelistBox(){
		sitemapSelTag = ""
		sitemapSelTag += "<table>"
		sitemapSelTag += "<tr>"
		sitemapSelTag += '<th>ページ名</th>'
		sitemapSelTag += '<th width="200">ファイル名</th>'
		sitemapSelTag += '<th width="70">リンク</th>'
		sitemapSelTag += "<tr>"
		
		createPagelistBox_core(CMS_Data.Sitemap.getFilelist(),0);
		sitemapSelTag += "</table>"
		return sitemapSelTag;
	}
	function createPagelistBox_core(_list,_deep){
		var dd = ""
		for (var i = 0; i < _deep ; i++) dd += "│ ";
		for (var i = 0; i < _list.length ; i++) {
			if(_list[i].list){
				if(_deep == 0) sitemapSelTag += '<tr><td>'+dd+'│ </td><td></td></tr>';
				var n = _list[i].name.split("<br>").join(" ");
				sitemapSelTag += '<tr class="_dirrow"><td colspan="3">'+dd+'├ <span class="_dir">'+ n +'</span></td></tr>'
				createPagelistBox_core(_list[i].list,_deep+1)
			} else{
				if(_list[i].type == Dic.ListType.PAGE){
					var n = _list[i].name.split("<br>").join(" ");
					var path = CMS_Path.PAGE.getAbsPath(_list[i].id,_list[i].dir);
					var pathRel = CMS_Path.PAGE.getRelPath(_list[i].id,_list[i].dir);
					path = path.substr(1,path.length)
					sitemapSelTag += '<tr class="_hasData" data-url="'+path+'">'
					sitemapSelTag += '<td class="_name">'+dd+"├ "+n+'</td>'
					sitemapSelTag += '<td class="_url">'+path+'</td>'
					sitemapSelTag += '<td class="_link"><div class="_cms_btn-nano _btn_link" data-url="'+pathRel+'"><i class="fa fa-external-link-square "></i> 開く</div></td>'
					sitemapSelTag += '</tr>'
				}
			}
		}
	}
	function clickText(_s){
		if(callback){
			UpdateDelay.delay(function(){
				callback(_s);
			});
		} else {
			CMS_CopyView.stageIn(_s,function(){})
		}
		stageOut()
	}
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		stageOut()
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback = true;
	function stageInit(){
		view.hide();
		//load_dir();
	}
	function stageIn(_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback;
			if(isFirst){
				createlayout();
			}
			update();
			isFirst = false;
			view.show();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	function resize(){
		if(isOpen){
		}
	}
	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize,compliteEdit:compliteEdit }
})();//modal