/*
	サイト用カスタムJavaScript

	自由に編集してください。
    デフォルトでは、汎用的なUIパーツが登録されています。
    
	※編集後はブラウザリロードしてください。
	
*/

//環境調査 UAで判別
var isMobile = false;
var ua = navigator.userAgent
if(ua.indexOf('iPad') != -1) isMobile = true;
if(ua.indexOf('iPhone') != -1) isMobile = true;
if(ua.indexOf('Android') != -1) isMobile = true;


//環境調査 レスポンシブ用
/*
var isWideScreen = function() {
	var _breakPoint = "(max-width: 768px)";
	if (window.matchMedia( _breakPoint ).matches) {
	  return false;
	} else {
	  return true;
	}
};
*/

$(function(){
	
	//スマホ用UI設定
	var mUI = $('#MobileUI');
	mUI.find('.menuBtn').click(function(){mUI.toggleClass("show");});
	mUI.find('.mobileBG').click(function(){mUI.removeClass("show");});

	//トグルメニュー設定
	$(".cms-toggle").cms_toggle();

	//トグルメニュー設定 (サイドメニューやスマホ用UIで使用)
	$("._type-dir-toggle > p,._type-dir-toggle > a").cms_toggle_menu();
	
	//スクロール時にサイドバー固定(モバイルでは行わない)
	if(!isMobile) $("#SideArea").stick_in_parent({offset_top:20});
	
	//要素の高さを揃える
	$('.commonHeight > *').matchHeight(	{ byRow: true, property: 'height' });
	
	//ダミーイメージサービス初期化
	$.cms_dummyImage();
	
	//モーダルウィンドウ作成
	$.cms_modal({className:'cms-modal'});
	
	//ページトップボタン作成
	$.cms_pagetop({className:'cms-pagetop',icon:'<i class="fa fa-angle-up "></i>'});
	
	//ページ内リンクの生成 (ページ内リンクブロック用)
	$(".cms-pagelink").cms_createLink();
	
	//ページ内リンクのスムーススクロール設定
	$.cms_pagelink({offset:-50});

});

