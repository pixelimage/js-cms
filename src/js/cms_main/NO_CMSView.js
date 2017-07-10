
var NO_CMS = (function(){
	var view;
	var v = {};
	
	function init(){
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = "";
		tag += '<div id="NO_CMS">';
		tag += '	<div class="_title">'+ SITE_NAME +'</div>';
		tag += '	<div>お使いのブラウザでは、CMSの管理画面はご利用いただけません。</div>';
		tag += '	<div>管理画面を利用するには、以下のブラウザをお使いください。</div>';
		tag += '	<div>※モバイル端末は対応していません。</div>';
		tag += '	<div class="_h2">対応ブラウザ</div>';
		tag += '	<ul>';
		tag += '		<li><span style="font-size:24px;"><b>Google Chrome</b></span>　<i class="fa fa-caret-right "></i> <a href="http://www.google.co.jp/chrome">ダウンロード画面へ</a></li>';
		tag += '		<li><span style="font-size:24px;"><b>Internet Explorer 9,10,11</b></span></li>';
		tag += '	</ul><br><br>';
		tag += '	<div><i class="fa fa-info-circle"></i> <a href="http://js-cms.jp/" target="_blank">JS CMSの紹介サイト</a></div>'
		tag += '</div>';
		$("body").html(tag);
	}
	
	function setBtn(){
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			if(isFirst){
				createlayout();
				setBtn();
			}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();