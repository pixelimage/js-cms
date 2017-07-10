
var CMS_PageListView 		 = (function(){
	var view;
	var v = {};

	function init(){	
		view = $('#CMS_PageListView');
		var tag = "";
			tag += '<div class="_header">';
			tag += '	<div class="_header_visual"><span class="_btn_edit"><i class="fa fa-pencil "></i> 変更</span></div>';
			tag += '	<div class="_header_btns">';
			tag += '		<div class="_left">';
			tag += '			<span class="_cms_btn_alpha _btn_closeAll _fs12"><i class="fa fa-folder "></i> <span class="_hide_S">すべて</span>閉じる</span>';
			tag += '			<span class="_cms_btn_alpha _btn_openAll _fs12"><i class="fa fa-folder-open "></i> <span class="_hide_S">すべて</span>開く</span>';
			tag += '		</div>';
			tag += '		<div class="_right">';
			tag += '			<div class="_table" style="padding:0 20px 0 0;">';
			tag += '				<div class="_cell" style="padding:0 180px 0 0;">';
			tag += '					<div class="_wideShow _cms_btn_alpha _btn_editSubFiles"><i class="fa fa-level-up fa-rotate-180 "></i> まとめて設定</div>'
			tag += '				</div>';
			tag += '				<div class="_cell">';
			tag += '					<div class="_wideShow _cms_btn_alpha _btn_publish_all"><i class="fa fa-level-up fa-rotate-180 "></i> まとめて公開</div>'
			tag += '				</div>';
			tag += '			</div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '	<div class="_btn_close"><i class="fa fa-caret-right "></i></div>';
			tag += '</div>';
			tag += '<div class="_body _sideAera-scroll">';

			tag += '	<div class="_asset_list _asset_list_setting">'
			tag += '		<div class="_mytag_title">{{ Myタグ設定 }}</div>';
			
			var kyes = Dic.MyTagList;
			for (var i = 0; i < kyes.length ; i++) {
				tag += '<div id="_SVP__mytag_' + kyes[i].id + '" class="_btn_page _btn_doc_keys" data-no="'+i+'">';
				tag += '<i class="fa fa-lg fa-cog" style="margin:2px 2px 0 2px;"></i> <span class="_rep">' + kyes[i].name + '</span>';
				tag += '</div>';
			}
			
			tag += '	</div>'

			tag += '	<div id="CMS_PageListViewTree" class="_listItem"></div>';
			tag += '	<div id="CMS_PageListViewSearchBody" class="_listItem">';
			tag += '		<div class="_status"></div>'
			tag += '		<div class="_replaceView"></div>'
			tag += '	</div>';
			tag += CMS_GuideU.getGuideTag("page/pages","ガイド","blue");
			tag += '	<div style="height:50px"></div>';
			tag += '</div>';
			tag += '<div id="CMS_PageListViewSearch" class="_listItem"></div>';
		view.append(tag);
		
		view.find('._btn_doc_keys').click(function(){
			var no = $(this).data("no");
			CMS_MainController.openPageSetting(no);
		});
		
		view.find('._header_visual ._btn_edit').click(function() {
		    CMS_PageListBgView.stageIn($(this));
		});
		
		//すべて開閉ボタン
		view.find('._btn_closeAll')	.click(function(){ CMS_PageList_ListDB.closeAll()});
		view.find('._btn_openAll')	.click(function(){ CMS_PageList_ListDB.openAll()});
		
		v.btn_editSubFiles = view.find('._btn_editSubFiles')
		v.btn_editSubFiles.click(function(){ CMS_PageListViewTree.editSubFiles()});
		v.btn_editSubFiles.hover(
			function(){ $("#sitemap_sitemap_root").addClass("_hoverSetAll") },
			function(){ $("#sitemap_sitemap_root").removeClass("_hoverSetAll") }
		);
		
		v.btn_publish_all = view.find('._btn_publish_all')
		v.btn_publish_all.click(function(){ CMS_PageListViewTree.publishAll()});
		v.btn_publish_all.hover(
			function(){ $("#sitemap_sitemap_root").addClass("_hoverPubAll") },
			function(){ $("#sitemap_sitemap_root").removeClass("_hoverPubAll") }
		);
		
		initToggle();
		
		CMS_PageListViewTree		.init();
		CMS_PageListViewSearch		.init();
		
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	var isWide = false
	var stageLeft = 0;
	function initToggle(){
		v.btn_toggle =view.find('._header ._btn_close')
		v.body = $("body")
		v.stage = $("#CMS_PageStage")
		v.btn_toggle.click(function(){ 
			toggle();
		});
		
		$("#CMS_PagesView_DisableView").click(function(){
			toNormal();
		})
	}
	function toggle(){
		if(isWide){
			toNormal();
		} else{
			toWide()
		}
	}
	function toNormal(){
		if(!isWide)return;
		v.btn_toggle.html('<i class="fa fa-caret-right "></i>');
		v.stage.css("right",stageLeft+"px");
		v.body.removeClass("_wideNavi");
		v.body.removeClass("_wideNaviCore");
		isWide = false;
	}
	function toWide(){
		if(isWide)return;
		v.btn_toggle.html('<i class="fa fa-caret-left "></i>');
		stageLeft = v.stage.css("right").split("px").join("");
		v.stage.css("right","-10px");
		v.body.addClass("_wideNavi");
		
		setTimeout(function(){
			v.body.addClass("_wideNaviCore");
		},200);
		isWide = true;
	}
	/* ---------- ---------- ---------- */
	//#Stage
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
			//
			CMS_PageListViewTree		.stageIn();
			CMS_PageListViewSearch		.stageIn();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}
	return {
		init:init, stageIn:stageIn, stageOut:stageOut
	}
})();

var CMS_PageListBgView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_PageListBgView');
		v.target = $('#CMS_PageListView ._header_visual');
		
		stageInit();
		createlayout();
		setBG( Storage.Memo.getCustomBG() );
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = "";
			tag += '<div class="_inner">';
			tag += '	<div class="_read">好きなテーマ写真を選択できます。この設定は、サーバーごと、ブラウザごとに設定出来ます。</div>';
			tag += '	<div class="_items">';
			for (var i = 0; i < 4*10 ; i++) {
				tag += '<div class="_item _item_a _btn_bg" data-id="a-'+i+'" style="background-position: left -'+(i*50)+'px;"></div>';
			}
			for (var i = 0; i < 4*3 ; i++) {
				tag += '<div class="_item _item_b _btn_bg" data-id="b-'+i+'" style="background-position: left -'+(i*50)+'px;"></div>';
			}
			tag += '	</div>';
			tag += '	<div class="_read">/_cms/images/custom_bg_a.jpg , /_cms/images/custom_bg_b.png を編集すれば、好きな画像を管理画面へ設定できます。</div>';
			tag += '</div>';
		view.html(tag);
		v.item = view.find("._item");
		v.item_a = view.find("._item_a");
		v.item_b = view.find("._item_b");
		setBtn();
	}
	
	function setBtn(){
		view.find("._btn_bg").click(function(){
			var id = $(this).data("id");
			Storage.Memo.setCustomBG(id);
			setBG(id);
		});
		
		view.hover(
			function(){
				if(tID) clearTimeout(tID);
			},
			function(){
				stageOut_delay()
			}
		)
	}
	
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	function setBG(_id){
		if(_id.indexOf("-") == -1){ _id = "a-0" };
		
		var a = _id.split("-");
		var ty = a[0];
		var no = Number(a[1]);
		
		v.target.removeClass("_image_a");
		v.target.removeClass("_image_b");
		v.item_a.removeClass("_current");
		v.item_b.removeClass("_current");
		
		if(ty == "a"){
			v.target.addClass("_image_a");
			v.item_a.eq(no).addClass("_current");
		} else{
			v.target.addClass("_image_b");
			v.item_b.eq(no).addClass("_current");
		}
		v.target.css("background-position", "0 -" + (no * 50) + "px");
	}

	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			// if(isFirst){
			// 	createlayout();
			// }
			isFirst = false;
		}
	}
	var tID;
	function stageOut_delay(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			stageOut();
		},200);
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();


