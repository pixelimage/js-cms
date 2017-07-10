
var InspectView 		 = (function(){
	
	if(window["sc"] == undefined) window.sc = {}
	window.sc.duplicateCurrent  = function (){ if(_hasTarget()) {duplicateData() }}
	window.sc.deleteCurrent 	= function (){ if(_hasTarget()) {deleteData() }}
	window.sc.copyCurrent 		= function (){ if(_hasTarget()) {copyData() }}
	window.sc.cutCurrent 		= function (){ if(_hasTarget()) {cutData() }}
	window.sc.pastCurrent 		= function (){ if(_hasTarget()) {pastData() }}
	window.sc.pastCurrent2 		= function (){ if(_hasTarget()) {pastData2() }}
	
	window.sc.moveTopCurrent  	= function (){ if(_hasTarget()) {moveDataToFirst(0) }}
	window.sc.moveUpCurrent  	= function (){ if(_hasTarget()) {moveData(-1) }}
	window.sc.moveDownCurrent  	= function (){ if(_hasTarget()) {moveData(1) }}
	window.sc.moveBottomCurrent = function (){ if(_hasTarget()) {moveDataToLast() }}
	
	window.sc.historyBack 	 	= function (){ if(_hasTarget()) {historyBack() }}
	window.sc.selectNodePrev  	= function (){ if(_hasTarget()) {selectNodeNext(-1) }}
	window.sc.selectNodeNext  	= function (){ if(_hasTarget()) {selectNodeNext(1) }}
	window.sc.dClick 		 	= function (){ if(_hasTarget()) {dClick() }}
	
	window.sc.editJSON 		 	= function (){ if(_hasTarget()) {editJSON() }}
	window.sc.addToMyBlock 	 	= function (){ if(_hasTarget()) {addToMyBlock() }}

 	function _hasTarget(){ return currentNode; }

	/* ---------- ---------- ---------- */
	
	var view;
	var v = {};
	
	function init(){
		InspectView.FormU.init();
		
		view = $('#InspectView');
		var tag = "";
			tag += '<div class="_header"><div class="_dragBar"></div><div class="_title"></div></div>';
			tag += '<div class="_btn_close"><i class="fa fa-lg fa-times-circle "></i></div>';
			tag += '<div class="_tabRow1">';
			tag += '	<ul>';
			tag += '		<li class="_tabItem _tab_data _current">データ</li>';
			tag += '		<li class="_tabItem _tab_design ">デザイン</li>';
			tag += '		<li class="_tabItem _tab_view">その他</li>';
			// tag += '		<li class="_tabItem _tab_id" style="padding-left:3px;padding-right:3px;">ID</li>';
			tag += '		<li class="_tabItem _tab_output">出力</li>';
			tag += '	</ul>';
			tag += '</div>';
			tag += '<div class="_inner">';
			tag += '	<div class="_tabRow2">';
			tag += '		<ul class="clearfix">';
			tag += '			<li class="_tabItemOut _tab_embed">埋込み <i class="fa fa-sign-in fa-lg"></i></li>';
			tag += '			<li class="_tabItemOut _tab_export">書出し <i class="fa fa-angle-right "></i> <i class="fa fa-file-text fa-lg"></i></li>';
			tag += '		</ul>';
			tag += '	</div>';
			tag += '	<div class="_body">';
			tag += '		<div class="_bodyItem _body_data"></div>';
			tag += '		<div class="_bodyItem _body_css"></div>';
			tag += '		<div class="_bodyItem _body_view"></div>';
			// tag += '		<div class="_bodyItem _body_id"></div>';
			tag += '		<div class="_bodyItem _body_output">';
			tag += '			<div class="_bodyItemOut _body_export"></div>';
			tag += '			<div class="_bodyItemOut _body_embed"></div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '</div>';
			tag += '<div class="_preview"><div class="_miniPreviw"></div></div>';
			tag += '<div class="_footer"></div>';
		view.html(tag);
		
		v.header	 = view.find('._header');
		v.btn_close	 = view.find('._btn_close');
		v.title		 = view.find('._title');
		v.body		 = view.find('._body');
		v.bodyItems		 = view.find('._bodyItem');
		v.bodyOutItems	 = view.find('._bodyItemOut');
		//
		v.body_data	 = view.find('._body_data');
		// v.body_id	 = view.find('._body_id');
		v.body_css	 = view.find('._body_css');
		v.body_view	 = view.find('._body_view');
		v.body_output = view.find('._body_output');
		v.body_export = view.find('._body_export');
		v.body_embed = view.find('._body_embed');
		//
		v.preview	 = view.find('._preview');
		v.miniPreviw = view.find('._miniPreviw');
		v.footer	 = view.find('._footer');
		
		v.body_view		.append( InspectView.View.init() );
		v.body_view		.append( InspectView.ID.init() );
		v.body_view		.append( InspectView.ATTR.init() );
		v.body_export	.append( InspectView.Export.init() );
		v.body_embed	.append( InspectView.Embed.init() );
		v.footer		.append( InspectView.Footer.init() );
		
		initTab();
		initTabOut();
		//bodyH_init();
		stageInit();
		setBtn();
		
		openTab("data");
		// openTab("design");
	}

	/* ---------- ---------- ---------- */
	
	function setBtn(){
		v.miniPreviw.on("click",function(){ showTag()});
		view.draggable({distance:5});
		
		view.on("mousedown",function(){
			CMS_KeyManager.setType("");
		})
		
		v.btn_close.click(function(){
			stageOut();
		});
	}
	
	/* ---------- ---------- ---------- */
	//タブの管理
	
	function initTab(){
		v.tabs		 = view.find('._tabItem');
		v.tab_data	 = view.find('._tab_data');
		v.tab_design = view.find('._tab_design');
		v.tab_view	 = view.find('._tab_view');
		// v.tab_id	 = view.find('._tab_id');
		v.tab_output = view.find('._tab_output');
		
		v.tab_data		.click(function(){openTab("data")})
		v.tab_design	.click(function(){openTab("design")})
		v.tab_view		.click(function(){openTab("view")})
		// v.tab_id		.click(function(){openTab("id")})
		v.tab_output	.click(function(){openTab("output")})
	}
	function openTab(_s){
		//タブ
		v.tabs.removeClass("_current");
		if(_s == "data") 	v.tab_data	.addClass("_current");
		if(_s == "design") 	v.tab_design.addClass("_current");
		if(_s == "view") 	v.tab_view	.addClass("_current");
		// if(_s == "id") 		v.tab_id	.addClass("_current");
		if(_s == "output") 	v.tab_output.addClass("_current");
		//
		if(_s == "output"){
			v.tabs_outs.show();
			if(!currentOutTab) openOutTab("embed");
		} else{
			v.tabs_outs.hide();
		}
		if(_s == "output"){
			v.preview.hide();
		} else{
			v.preview.show();
		}
		//ボディエリア
		v.bodyItems	.hide();
		if(_s == "data") 	v.body_data		.show();
		if(_s == "design") 	v.body_css		.show();
		if(_s == "view") 	v.body_view		.show();
		// if(_s == "id") 		v.body_id		.show();
		if(_s == "output") 	v.body_output	.show();
		
		updateBodyH();
	}
	
	/* ---------- ---------- ---------- */
	
	function initTabOut(){
		v.tabs_outs	 = view.find('._tabRow2');
		v.tab_out	 = view.find('._tabItemOut');
		v.tab_export = view.find('._tab_export');
		v.tab_embed	 = view.find('._tab_embed');
		
		v.tab_export	.click(function(){openOutTab("export")})
		v.tab_embed		.click(function(){openOutTab("embed")})
	}
	var currentOutTab;
	function openOutTab(_s){
		currentOutTab = _s;
		v.tab_out.removeClass("_current");
		if(_s == "export") 	v.tab_export.addClass("_current");
		if(_s == "embed") 	v.tab_embed.addClass("_current");
		
		v.bodyOutItems.hide();
		if(_s == "export") 	v.body_export.show();
		if(_s == "embed") 	v.body_embed.show();
		//
		updateBodyH();
	}
	
	/* ---------- ---------- ---------- */
	
	var windowMinH = 160;
	function updateBodyH(){
		var h = v.body.height();
		if(h < windowMinH) h = windowMinH;
		view.find("._inner").css({height:h+"px"});
		// view.addClass("_maxBodyH");
	}