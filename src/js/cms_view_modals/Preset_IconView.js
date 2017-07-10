var Preset_IconView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Preset_IconView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Preset_IconView,view);
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("window/icon","_BASE_")+'</div>'
			tag += '<div class="_title">アイコンライブラリ</div>'
		v.header.html(tag);
		
			tag = ""
		v.body.html(tag)
		
		v.texts = view.find('._texts');
		v.status = view.find('._status');
					
			tag = ""
			tag += '<div class="_cms_btn _btn_close" '+TIP_ENTER+'>閉じる</div> ';
		v.footer.html(tag);
		createFontList();
		setBtn();
	}
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
	}
	function createFontList(){
		var tag = ""
		
		tag +='<div class="_p">サイト内では、オープンソースのウェブフォントFont Awesome ( http://fontawesome.io/ ) を利用できます。<br>'
		tag +='利用したいアイコンをコピーできます。本文やボタンはもちろん、メニューでも利用できます。</div>'
		tag +='<div class="_cols" style="margin:10px 0 0 0;">'
		tag +='	<div class="_col _sizeSelect"></div>'
		tag +='	<div class="_col _rotSelect"></div>'
		tag +='	<div class="_col _fixSelect"></div>'
		tag +='</div>'
		tag +='<div class="_searchArea" style="margin:5px 0;font-size:12px;">●絞り込み　　<input placeholder="arrow"></div>'
		tag +='<div class="_listArea"></div>'
		v.body.html(tag);
		
		v.searchArea = view.find('._searchArea input');
		v.listArea	 = view.find('._listArea');
		
		CMS_FormU.createCheckBox(
			view.find('._sizeSelect'),
			"●アイコンサイズ",
			[ '普通','1.3X','2X','3X','4X' ],
			0,
			function(_n){ setSize(_n) }
		)
		
		CMS_FormU.createCheckBox(
			view.find('._rotSelect'),
			"●回転",
			[ '普通','90度','180度','270度'/*,'横反転','縦反転' */],
			0,
			function(_n){ setRot(_n) }
		)
		CMS_FormU.createCheckBox(
			view.find('._fixSelect'),
			"●固定幅",
			[ '普通','固定幅' ],
			0,
			function(_n){ setFix(_n) }
		)
		
		v.searchArea.keyup(function(){
			searchIcon($(this).val());
		})
		
		view.on("click",'.fa',function(){ 
			var a = []
				a.push($(this).data("id"));
				a.push(sizeCs[currentSize]);
				a.push(rotCs[currentRot]);
				a.push(fixCs[currentFix]);
			var ss = a.join(" ");
				ss = ss.split("   ").join(" ")
				ss = ss.split("  ").join(" ")
			selectIcon ( '<i class="fa '+ ss +'"></i> ')
		});
		update();
		
	}
	function selectIcon(_s){
		if(callback){
				stageOut();
			UpdateDelay.delay(function(){
				callback(_s);
			});
		} else {
			CMS_CopyView.stageIn(_s,function(){})
		}
	}
	var searchString = "";
	function searchIcon(_s){
		searchString = _s;
		update()
	}
	
	/* ---------- ---------- ---------- */
	
	function update(){
		var fontList = ICON_FONT_LIST;
		var list = []
		for (var i = 0; i < fontList.length ; i++) {
			var b = false;
			var tag = "";
			tag += '<div class="_h2">'+fontList[i].title+"</div>"
			tag += '<div class="_g">'
			for (var ii = 0; ii < fontList[i].list.length ; ii++) {
				if(fontList[i].list[ii].indexOf(searchString) != -1){
					b = true;
					var a = [];
						a.push(fontList[i].list[ii]);
						a.push(sizeCs[currentSize]);
						a.push(rotCs[currentRot]);
						a.push(fixCs[currentFix]);
					tag += '<span><i class="fa '+ a.join(" ") +'" data-id="'+fontList[i].list[ii]+'"></i></span>'
				}
			}
			tag += '</div>'
			if(b) list.push(tag);
		}
		v.listArea.html(list.join(""));
	}
	
	/* ---------- ---------- ---------- */
	
	var sizeCs = ["","fa-lg", "fa-2x", "fa-3x", "fa-4x"];
	var rotCs = ["","fa-rotate-90", "fa-rotate-180", "fa-rotate-270"/*, "fa-flip-horizontal" ,"fa-flip-vertical"*/];
	var fixCs = ["","fa-fw"];

	var currentSize = 0;
	var currentRot = 0;
	var currentFix = 0;
	function setSize(_n){ currentSize = _n; update(); }
	function setRot(_n) { currentRot = _n; update(); }
	function setFix(_n) { currentFix = _n; update(); }
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback
	function stageIn(_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			_callback = _callback ? _callback:null;
			callback = _callback;
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
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

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize }
})();//modal


var ICON_FONT_LIST = [
	{
		title:"よく使うアイコン",
		list:[
			"fa-external-link",
			"fa-external-link-square",
			"fa-folder",
			"fa-folder-open",
			"fa-check",
			"fa-check-square",
			"fa-envelope",
			"fa-rss",
			"fa-rss-square",
			"fa-facebook",
			"fa-facebook-square",
			"fa-google-plus",
			"fa-google-plus-square",
			"fa-twitter",
			"fa-twitter-square",
			"fa-refresh",
			"fa-times",
			"fa-times-circle",
			"fa-warning"
		]
	},{
		title:"Web Application Icons",
		list:[
		"fa-adjust",
		"fa-anchor",
		"fa-archive",
		"fa-area-chart",
		"fa-arrows",
		"fa-arrows-h",
		"fa-arrows-v",
		"fa-asterisk",
		"fa-at",
		"fa-automobile (alias)",
		"fa-balance-scale",
		"fa-ban",
		"fa-bank (alias)",
		"fa-bar-chart",
		"fa-bar-chart-o (alias)",
		"fa-barcode",
		"fa-bars",
		"fa-battery-0 (alias)",
		"fa-battery-1 (alias)",
		"fa-battery-2 (alias)",
		"fa-battery-3 (alias)",
		"fa-battery-4 (alias)",
		"fa-battery-empty",
		"fa-battery-full",
		"fa-battery-half",
		"fa-battery-quarter",
		"fa-battery-three-quarters",
		"fa-bed",
		"fa-beer",
		"fa-bell",
		"fa-bell-o",
		"fa-bell-slash",
		"fa-bell-slash-o",
		"fa-bicycle",
		"fa-binoculars",
		"fa-birthday-cake",
		"fa-bluetooth",
		"fa-bluetooth-b",
		"fa-bolt",
		"fa-bomb",
		"fa-book",
		"fa-bookmark",
		"fa-bookmark-o",
		"fa-briefcase",
		"fa-bug",
		"fa-building",
		"fa-building-o",
		"fa-bullhorn",
		"fa-bullseye",
		"fa-bus",
		"fa-cab (alias)",
		"fa-calculator",
		"fa-calendar",
		"fa-calendar-check-o",
		"fa-calendar-minus-o",
		"fa-calendar-o",
		"fa-calendar-plus-o",
		"fa-calendar-times-o",
		"fa-camera",
		"fa-camera-retro",
		"fa-car",
		"fa-caret-square-o-down",
		"fa-caret-square-o-left",
		"fa-caret-square-o-right",
		"fa-caret-square-o-up",
		"fa-cart-arrow-down",
		"fa-cart-plus",
		"fa-cc",
		"fa-certificate",
		"fa-check",
		"fa-check-circle",
		"fa-check-circle-o",
		"fa-check-square",
		"fa-check-square-o",
		"fa-child",
		"fa-circle",
		"fa-circle-o",
		"fa-circle-o-notch",
		"fa-circle-thin",
		"fa-clock-o",
		"fa-clone",
		"fa-close (alias)",
		"fa-cloud",
		"fa-cloud-download",
		"fa-cloud-upload",
		"fa-code",
		"fa-code-fork",
		"fa-coffee",
		"fa-cog",
		"fa-cogs",
		"fa-comment",
		"fa-comment-o",
		"fa-commenting",
		"fa-commenting-o",
		"fa-comments",
		"fa-comments-o",
		"fa-compass",
		"fa-copyright",
		"fa-creative-commons",
		"fa-credit-card",
		"fa-credit-card-alt",
		"fa-crop",
		"fa-crosshairs",
		"fa-cube",
		"fa-cubes",
		"fa-cutlery",
		"fa-dashboard (alias)",
		"fa-database",
		"fa-desktop",
		"fa-diamond",
		"fa-dot-circle-o",
		"fa-download",
		"fa-edit (alias)",
		"fa-ellipsis-h",
		"fa-ellipsis-v",
		"fa-envelope",
		"fa-envelope-o",
		"fa-envelope-square",
		"fa-eraser",
		"fa-exchange",
		"fa-exclamation",
		"fa-exclamation-circle",
		"fa-exclamation-triangle",
		"fa-external-link",
		"fa-external-link-square",
		"fa-eye",
		"fa-eye-slash",
		"fa-eyedropper",
		"fa-fax",
		"fa-feed (alias)",
		"fa-female",
		"fa-fighter-jet",
		"fa-file-archive-o",
		"fa-file-audio-o",
		"fa-file-code-o",
		"fa-file-excel-o",
		"fa-file-image-o",
		"fa-file-movie-o (alias)",
		"fa-file-pdf-o",
		"fa-file-photo-o (alias)",
		"fa-file-picture-o (alias)",
		"fa-file-powerpoint-o",
		"fa-file-sound-o (alias)",
		"fa-file-video-o",
		"fa-file-word-o",
		"fa-file-zip-o (alias)",
		"fa-film",
		"fa-filter",
		"fa-fire",
		"fa-fire-extinguisher",
		"fa-flag",
		"fa-flag-checkered",
		"fa-flag-o",
		"fa-flash (alias)",
		"fa-flask",
		"fa-folder",
		"fa-folder-o",
		"fa-folder-open",
		"fa-folder-open-o",
		"fa-frown-o",
		"fa-futbol-o",
		"fa-gamepad",
		"fa-gavel",
		"fa-gear (alias)",
		"fa-gears (alias)",
		"fa-gift",
		"fa-glass",
		"fa-globe",
		"fa-graduation-cap",
		"fa-group (alias)",
		"fa-hand-grab-o (alias)",
		"fa-hand-lizard-o",
		"fa-hand-paper-o",
		"fa-hand-peace-o",
		"fa-hand-pointer-o",
		"fa-hand-rock-o",
		"fa-hand-scissors-o",
		"fa-hand-spock-o",
		"fa-hand-stop-o (alias)",
		"fa-hashtag",
		"fa-hdd-o",
		"fa-headphones",
		"fa-heart",
		"fa-heart-o",
		"fa-heartbeat",
		"fa-history",
		"fa-home",
		"fa-hotel (alias)",
		"fa-hourglass",
		"fa-hourglass-1 (alias)",
		"fa-hourglass-2 (alias)",
		"fa-hourglass-3 (alias)",
		"fa-hourglass-end",
		"fa-hourglass-half",
		"fa-hourglass-o",
		"fa-hourglass-start",
		"fa-i-cursor",
		"fa-image (alias)",
		"fa-inbox",
		"fa-industry",
		"fa-info",
		"fa-info-circle",
		"fa-institution (alias)",
		"fa-key",
		"fa-keyboard-o",
		"fa-language",
		"fa-laptop",
		"fa-leaf",
		"fa-legal (alias)",
		"fa-lemon-o",
		"fa-level-down",
		"fa-level-up",
		"fa-life-bouy (alias)",
		"fa-life-buoy (alias)",
		"fa-life-ring",
		"fa-life-saver (alias)",
		"fa-lightbulb-o",
		"fa-line-chart",
		"fa-location-arrow",
		"fa-lock",
		"fa-magic",
		"fa-magnet",
		"fa-mail-forward (alias)",
		"fa-mail-reply (alias)",
		"fa-mail-reply-all (alias)",
		"fa-male",
		"fa-map",
		"fa-map-marker",
		"fa-map-o",
		"fa-map-pin",
		"fa-map-signs",
		"fa-meh-o",
		"fa-microphone",
		"fa-microphone-slash",
		"fa-minus",
		"fa-minus-circle",
		"fa-minus-square",
		"fa-minus-square-o",
		"fa-mobile",
		"fa-mobile-phone (alias)",
		"fa-money",
		"fa-moon-o",
		"fa-mortar-board (alias)",
		"fa-motorcycle",
		"fa-mouse-pointer",
		"fa-music",
		"fa-navicon (alias)",
		"fa-newspaper-o",
		"fa-object-group",
		"fa-object-ungroup",
		"fa-paint-brush",
		"fa-paper-plane",
		"fa-paper-plane-o",
		"fa-paw",
		"fa-pencil",
		"fa-pencil-square",
		"fa-pencil-square-o",
		"fa-percent",
		"fa-phone",
		"fa-phone-square",
		"fa-photo (alias)",
		"fa-picture-o",
		"fa-pie-chart",
		"fa-plane",
		"fa-plug",
		"fa-plus",
		"fa-plus-circle",
		"fa-plus-square",
		"fa-plus-square-o",
		"fa-power-off",
		"fa-print",
		"fa-puzzle-piece",
		"fa-qrcode",
		"fa-question",
		"fa-question-circle",
		"fa-quote-left",
		"fa-quote-right",
		"fa-random",
		"fa-recycle",
		"fa-refresh",
		"fa-registered",
		"fa-remove (alias)",
		"fa-reorder (alias)",
		"fa-reply",
		"fa-reply-all",
		"fa-retweet",
		"fa-road",
		"fa-rocket",
		"fa-rss",
		"fa-rss-square",
		"fa-search",
		"fa-search-minus",
		"fa-search-plus",
		"fa-send (alias)",
		"fa-send-o (alias)",
		"fa-server",
		"fa-share",
		"fa-share-alt",
		"fa-share-alt-square",
		"fa-share-square",
		"fa-share-square-o",
		"fa-shield",
		"fa-ship",
		"fa-shopping-bag",
		"fa-shopping-basket",
		"fa-shopping-cart",
		"fa-sign-in",
		"fa-sign-out",
		"fa-signal",
		"fa-sitemap",
		"fa-sliders",
		"fa-smile-o",
		"fa-soccer-ball-o (alias)",
		"fa-sort",
		"fa-sort-alpha-asc",
		"fa-sort-alpha-desc",
		"fa-sort-amount-asc",
		"fa-sort-amount-desc",
		"fa-sort-asc",
		"fa-sort-desc",
		"fa-sort-down (alias)",
		"fa-sort-numeric-asc",
		"fa-sort-numeric-desc",
		"fa-sort-up (alias)",
		"fa-space-shuttle",
		"fa-spinner",
		"fa-spoon",
		"fa-square",
		"fa-square-o",
		"fa-star",
		"fa-star-half",
		"fa-star-half-empty (alias)",
		"fa-star-half-full (alias)",
		"fa-star-half-o",
		"fa-star-o",
		"fa-sticky-note",
		"fa-sticky-note-o",
		"fa-street-view",
		"fa-suitcase",
		"fa-sun-o",
		"fa-support (alias)",
		"fa-tablet",
		"fa-tachometer",
		"fa-tag",
		"fa-tags",
		"fa-tasks",
		"fa-taxi",
		"fa-television",
		"fa-terminal",
		"fa-thumb-tack",
		"fa-thumbs-down",
		"fa-thumbs-o-down",
		"fa-thumbs-o-up",
		"fa-thumbs-up",
		"fa-ticket",
		"fa-times",
		"fa-times-circle",
		"fa-times-circle-o",
		"fa-tint",
		"fa-toggle-down (alias)",
		"fa-toggle-left (alias)",
		"fa-toggle-off",
		"fa-toggle-on",
		"fa-toggle-right (alias)",
		"fa-toggle-up (alias)",
		"fa-trademark",
		"fa-trash",
		"fa-trash-o",
		"fa-tree",
		"fa-trophy",
		"fa-truck",
		"fa-tty",
		"fa-tv (alias)",
		"fa-umbrella",
		"fa-university",
		"fa-unlock",
		"fa-unlock-alt",
		"fa-unsorted (alias)",
		"fa-upload",
		"fa-user",
		"fa-user-plus",
		"fa-user-secret",
		"fa-user-times",
		"fa-users",
		"fa-video-camera",
		"fa-volume-down",
		"fa-volume-off",
		"fa-volume-up",
		"fa-warning (alias)",
		"fa-wheelchair",
		"fa-wifi",
		"fa-wrench",
			]
	},{
		title:"Hand Icons",
		list:[
		"fa-hand-grab-o (alias)",
		"fa-hand-lizard-o",
		"fa-hand-o-down",
		"fa-hand-o-left",
		"fa-hand-o-right",
		"fa-hand-o-up",
		"fa-hand-paper-o",
		"fa-hand-peace-o",
		"fa-hand-pointer-o",
		"fa-hand-rock-o",
		"fa-hand-scissors-o",
		"fa-hand-spock-o",
		"fa-hand-stop-o (alias)",
		"fa-thumbs-down",
		"fa-thumbs-o-down",
		"fa-thumbs-o-up",
		"fa-thumbs-up",
			]
	},{
		title:"Transportation Icons",
		list:[
		"fa-ambulance",
		"fa-automobile (alias)",
		"fa-bicycle",
		"fa-bus",
		"fa-cab (alias)",
		"fa-car",
		"fa-fighter-jet",
		"fa-motorcycle",
		"fa-plane",
		"fa-rocket",
		"fa-ship",
		"fa-space-shuttle",
		"fa-subway",
		"fa-taxi",
		"fa-train",
		"fa-truck",
		"fa-wheelchair",
			]
	},{
		title:"Gender Icons",
		list:[
		"fa-genderless",
		"fa-intersex (alias)",
		"fa-mars",
		"fa-mars-double",
		"fa-mars-stroke",
		"fa-mars-stroke-h",
		"fa-mars-stroke-v",
		"fa-mercury",
		"fa-neuter",
		"fa-transgender",
		"fa-transgender-alt",
		"fa-venus",
		"fa-venus-double",
		"fa-venus-mars",
			]
	},{
		title:"File Type Icons",
		list:[
		"fa-file",
		"fa-file-archive-o",
		"fa-file-audio-o",
		"fa-file-code-o",
		"fa-file-excel-o",
		"fa-file-image-o",
		"fa-file-movie-o (alias)",
		"fa-file-o",
		"fa-file-pdf-o",
		"fa-file-photo-o (alias)",
		"fa-file-picture-o (alias)",
		"fa-file-powerpoint-o",
		"fa-file-sound-o (alias)",
		"fa-file-text",
		"fa-file-text-o",
		"fa-file-video-o",
		"fa-file-word-o",
		"fa-file-zip-o (alias)",
			]
	},{
		title:"Spinner Icons",
		list:[
		"fa-circle-o-notch",
		"fa-cog",
		"fa-gear (alias)",
		"fa-refresh",
		"fa-spinner",
			]
	},{
		title:"Form Control Icons",
		list:[
		"fa-check-square",
		"fa-check-square-o",
		"fa-circle",
		"fa-circle-o",
		"fa-dot-circle-o",
		"fa-minus-square",
		"fa-minus-square-o",
		"fa-plus-square",
		"fa-plus-square-o",
		"fa-square",
		"fa-square-o",
			]
	},{
		title:"Payment Icons",
		list:[
		"fa-cc-amex",
		"fa-cc-diners-club",
		"fa-cc-discover",
		"fa-cc-jcb",
		"fa-cc-mastercard",
		"fa-cc-paypal",
		"fa-cc-stripe",
		"fa-cc-visa",
		"fa-credit-card",
		"fa-credit-card-alt",
		"fa-google-wallet",
		"fa-paypal",
			]
	},{
		title:"Chart Icons",
		list:[
		"fa-area-chart",
		"fa-bar-chart",
		"fa-bar-chart-o (alias)",
		"fa-line-chart",
		"fa-pie-chart",
			]
	},{
		title:"Currency Icons",
		list:[
		"fa-bitcoin (alias)",
		"fa-btc",
		"fa-cny (alias)",
		"fa-dollar (alias)",
		"fa-eur",
		"fa-euro (alias)",
		"fa-gbp",
		"fa-gg",
		"fa-gg-circle",
		"fa-ils",
		"fa-inr",
		"fa-jpy",
		"fa-krw",
		"fa-money",
		"fa-rmb (alias)",
		"fa-rouble (alias)",
		"fa-rub",
		"fa-ruble (alias)",
		"fa-rupee (alias)",
		"fa-shekel (alias)",
		"fa-sheqel (alias)",
		"fa-try",
		"fa-turkish-lira (alias)",
		"fa-usd",
		"fa-won (alias)",
		"fa-yen (alias)",
			]
	},{
		title:"Text Editor Icons",
		list:[
		"fa-align-center",
		"fa-align-justify",
		"fa-align-left",
		"fa-align-right",
		"fa-bold",
		"fa-chain (alias)",
		"fa-chain-broken",
		"fa-clipboard",
		"fa-columns",
		"fa-copy (alias)",
		"fa-cut (alias)",
		"fa-dedent (alias)",
		"fa-eraser",
		"fa-file",
		"fa-file-o",
		"fa-file-text",
		"fa-file-text-o",
		"fa-files-o",
		"fa-floppy-o",
		"fa-font",
		"fa-header",
		"fa-indent",
		"fa-italic",
		"fa-link",
		"fa-list",
		"fa-list-alt",
		"fa-list-ol",
		"fa-list-ul",
		"fa-outdent",
		"fa-paperclip",
		"fa-paragraph",
		"fa-paste (alias)",
		"fa-repeat",
		"fa-rotate-left (alias)",
		"fa-rotate-right (alias)",
		"fa-save (alias)",
		"fa-scissors",
		"fa-strikethrough",
		"fa-subscript",
		"fa-superscript",
		"fa-table",
		"fa-text-height",
		"fa-text-width",
		"fa-th",
		"fa-th-large",
		"fa-th-list",
		"fa-underline",
		"fa-undo",
		"fa-unlink (alias)",
			]
	},{
		title:"Directional Icons",
		list:[
		"fa-angle-double-down",
		"fa-angle-double-left",
		"fa-angle-double-right",
		"fa-angle-double-up",
		"fa-angle-down",
		"fa-angle-left",
		"fa-angle-right",
		"fa-angle-up",
		"fa-arrow-circle-down",
		"fa-arrow-circle-left",
		"fa-arrow-circle-o-down",
		"fa-arrow-circle-o-left",
		"fa-arrow-circle-o-right",
		"fa-arrow-circle-o-up",
		"fa-arrow-circle-right",
		"fa-arrow-circle-up",
		"fa-arrow-down",
		"fa-arrow-left",
		"fa-arrow-right",
		"fa-arrow-up",
		"fa-arrows",
		"fa-arrows-alt",
		"fa-arrows-h",
		"fa-arrows-v",
		"fa-caret-down",
		"fa-caret-left",
		"fa-caret-right",
		"fa-caret-square-o-down",
		"fa-caret-square-o-left",
		"fa-caret-square-o-right",
		"fa-caret-square-o-up",
		"fa-caret-up",
		"fa-chevron-circle-down",
		"fa-chevron-circle-left",
		"fa-chevron-circle-right",
		"fa-chevron-circle-up",
		"fa-chevron-down",
		"fa-chevron-left",
		"fa-chevron-right",
		"fa-chevron-up",
		"fa-exchange",
		"fa-hand-o-down",
		"fa-hand-o-left",
		"fa-hand-o-right",
		"fa-hand-o-up",
		"fa-long-arrow-down",
		"fa-long-arrow-left",
		"fa-long-arrow-right",
		"fa-long-arrow-up",
		"fa-toggle-down (alias)",
		"fa-toggle-left (alias)",
		"fa-toggle-right (alias)",
		"fa-toggle-up (alias)",
		"fa-Video Player Icons",
	
		"fa-arrows-alt",
		"fa-backward",
		"fa-compress",
		"fa-eject",
		"fa-expand",
		"fa-fast-backward",
		"fa-fast-forward",
		"fa-forward",
		"fa-pause",
		"fa-pause-circle",
		"fa-pause-circle-o",
		"fa-play",
		"fa-play-circle",
		"fa-play-circle-o",
		"fa-random",
		"fa-step-backward",
		"fa-step-forward",
		"fa-stop",
		"fa-stop-circle",
		"fa-stop-circle-o",
		"fa-youtube-play",
			]
	},{
		title:"Brand Icons",
		list:[
		"fa-500px",
		"fa-adn",
		"fa-amazon",
		"fa-android",
		"fa-angellist",
		"fa-apple",
		"fa-behance",
		"fa-behance-square",
		"fa-bitbucket",
		"fa-bitbucket-square",
		"fa-bitcoin (alias)",
		"fa-black-tie",
		"fa-bluetooth",
		"fa-bluetooth-b",
		"fa-btc",
		"fa-buysellads",
		"fa-cc-amex",
		"fa-cc-diners-club",
		"fa-cc-discover",
		"fa-cc-jcb",
		"fa-cc-mastercard",
		"fa-cc-paypal",
		"fa-cc-stripe",
		"fa-cc-visa",
		"fa-chrome",
		"fa-codepen",
		"fa-codiepie",
		"fa-connectdevelop",
		"fa-contao",
		"fa-css3",
		"fa-dashcube",
		"fa-delicious",
		"fa-deviantart",
		"fa-digg",
		"fa-dribbble",
		"fa-dropbox",
		"fa-drupal",
		"fa-edge",
		"fa-empire",
		"fa-expeditedssl",
		"fa-facebook",
		"fa-facebook-f (alias)",
		"fa-facebook-official",
		"fa-facebook-square",
		"fa-firefox",
		"fa-flickr",
		"fa-fonticons",
		"fa-fort-awesome",
		"fa-forumbee",
		"fa-foursquare",
		"fa-ge (alias)",
		"fa-get-pocket",
		"fa-gg",
		"fa-gg-circle",
		"fa-git",
		"fa-git-square",
		"fa-github",
		"fa-github-alt",
		"fa-github-square",
		"fa-gittip (alias)",
		"fa-google",
		"fa-google-plus",
		"fa-google-plus-square",
		"fa-google-wallet",
		"fa-gratipay",
		"fa-hacker-news",
		"fa-houzz",
		"fa-html5",
		"fa-instagram",
		"fa-internet-explorer",
		"fa-ioxhost",
		"fa-joomla",
		"fa-jsfiddle",
		"fa-lastfm",
		"fa-lastfm-square",
		"fa-leanpub",
		"fa-linkedin",
		"fa-linkedin-square",
		"fa-linux",
		"fa-maxcdn",
		"fa-meanpath",
		"fa-medium",
		"fa-mixcloud",
		"fa-modx",
		"fa-odnoklassniki",
		"fa-odnoklassniki-square",
		"fa-opencart",
		"fa-openid",
		"fa-opera",
		"fa-optin-monster",
		"fa-pagelines",
		"fa-paypal",
		"fa-pied-piper",
		"fa-pied-piper-alt",
		"fa-pinterest",
		"fa-pinterest-p",
		"fa-pinterest-square",
		"fa-product-hunt",
		"fa-qq",
		"fa-ra (alias)",
		"fa-rebel",
		"fa-reddit",
		"fa-reddit-alien",
		"fa-reddit-square",
		"fa-renren",
		"fa-safari",
		"fa-scribd",
		"fa-sellsy",
		"fa-share-alt",
		"fa-share-alt-square",
		"fa-shirtsinbulk",
		"fa-simplybuilt",
		"fa-skyatlas",
		"fa-skype",
		"fa-slack",
		"fa-slideshare",
		"fa-soundcloud",
		"fa-spotify",
		"fa-stack-exchange",
		"fa-stack-overflow",
		"fa-steam",
		"fa-steam-square",
		"fa-stumbleupon",
		"fa-stumbleupon-circle",
		"fa-tencent-weibo",
		"fa-trello",
		"fa-tripadvisor",
		"fa-tumblr",
		"fa-tumblr-square",
		"fa-twitch",
		"fa-twitter",
		"fa-twitter-square",
		"fa-usb",
		"fa-viacoin",
		"fa-vimeo",
		"fa-vimeo-square",
		"fa-vine",
		"fa-vk",
		"fa-wechat (alias)",
		"fa-weibo",
		"fa-weixin",
		"fa-whatsapp",
		"fa-wikipedia-w",
		"fa-windows",
		"fa-wordpress",
		"fa-xing",
		"fa-xing-square",
		"fa-y-combinator",
		"fa-y-combinator-square (alias)",
		"fa-yahoo",
		"fa-yc (alias)",
		"fa-yc-square (alias)",
		"fa-yelp",
		"fa-youtube",
		"fa-youtube-play",
		"fa-youtube-square",
			]
	},{
		title:"Medical Icons",
		list:[
		"fa-ambulance",
		"fa-h-square",
		"fa-heart",
		"fa-heart-o",
		"fa-heartbeat",
		"fa-hospital-o",
		"fa-medkit",
		"fa-plus-square",
		"fa-stethoscope",
		"fa-user-md",
		"fa-wheelchair",
			]
	}
]




