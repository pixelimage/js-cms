
var CMS_AssetStageClose = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_AssetStageClose');
		v.bg = $('#CMS_AssetStageCloseBG');
		
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_headerBg"></div>'
			tag += '<div class="_header">'
			tag += '	<div class="_btn_close"><i class="fa fa-caret-up"></i> </div>';
			tag += '	<div class="_title">ファイルマネージャ</div>'
			tag += '</div>'
		view.html(tag);
	}
	
	function setBtn(){ 
		view.find(">._header").click(function(){
			CMS_StageController.openAssetStage(true);
		});
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
		v.bg.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			v.bg.show();
			if(isFirst){}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
			v.bg.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();


if(!USE_SITE_MANAGER){
	var CMS_AssetStageClose = (function(){
			
		function init(){
		}
		function stageIn(){
			$('#CMS_AssetStageClose').html('<div class="_dont_use">※ファイルマネージャは利用できない設定です。</div>');
		}
		 return {
			init:init,
			stageIn:stageIn,
			stageOut:function(){}
		}
	})();
}
// setTimeout(function(){
// 	CMS_AssetStage.stageIn()
// 	CMS_AssetStage.openFile({dir:"../_____html/_json/",id:"_html_.AAAZZ.json"});
// },1000);
// setTimeout(function(){
// 	CMS_AssetStage.stageIn()
// 	CMS_AssetStage.openFile({dir:"../_____html/css/",id:"site.css"});
// },2000);
// setTimeout(function(){
	// $("body").addClass("_modalAsset");
	// CMS_AssetStage.openFile({dir:"../images/",id:"header_logo.png",extra:{find:"IE 6"}});
	// window.asset_selectListThumb();
	// CMS_AssetStage.openFile({dir:"../__test_file/",id:"test.html",extra:{find:"IE 6"}});
	// CMS_AssetStage.openFile({dir:"../__test_file/brand_site/sb-include/common/subdomain/recommend/",id:"ad-card-register-complete-pc.html"});
	// CMS_AssetStage.openFile({dir:"../__test_file/",id:"test.html"});
// },1500);
