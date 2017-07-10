
InspectView.View	 = (function(){

	var view;
	var v = {};
	
	function init(_view){
		view = $("<div>");
		var tag = ""
			tag += '<div class="_notes">■表示設定</div>';
			tag += '<div class="_view_active">';
			tag += '	<div class="ss_inspect_views">';
			tag += '	<div class="_cms_btn_alpha _btn_hide 		ss_inspect _btn_hide" ></div>';
			tag += '	<div class="_cms_btn_alpha _btn_hide_ac 	ss_inspect _btn_hide_ac"></div>';
			tag += '	<div class="_cms_btn_alpha _btn_pc 			ss_inspect _btn_pc"></div>';
			tag += '	<div class="_cms_btn_alpha _btn_pc_ac 		ss_inspect _btn_pc_ac"></div>';
			tag += '	<div class="_cms_btn_alpha _btn_mo 			ss_inspect _btn_mo"></div>';
			tag += '	<div class="_cms_btn_alpha _btn_mo_ac 		ss_inspect _btn_mo_ac"></div>';
			tag += '	</div>';
			// tag += '	<br>';
			// tag += CMS_GuideU.getGuideTag("inspect/view","表示について","dark");
			tag += '</div>';
			tag += '<div class="_view_negative">';
			tag += '<div class="_dont_use _notes">このブロックでは利用できません。<br><br></div>';
			tag += '</div>';
			
		view.html(tag);
		v.view_active = view.find("._view_active").hide();
		v.view_negative = view.find("._view_negative").hide();
		
		setBtn();
		return view;
	}
	function setBtn(){
		v._btn_hide 	 = view.find("._btn_hide");
		v._btn_hide_ac	 = view.find("._btn_hide_ac");
		v._btn_pc 		 = view.find("._btn_pc");
		v._btn_pc_ac	 = view.find("._btn_pc_ac");
		v._btn_mo 		 = view.find("._btn_mo");
		v._btn_mo_ac	 = view.find("._btn_mo_ac");
		
		var update = true;
		
		v._btn_hide			.on("click",function(){setHide  (false,update)});
		v._btn_hide_ac		.on("click",function(){setHide  (true,update)});
		v._btn_pc			.on("click",function(){setHidePC(false,update)});
		v._btn_pc_ac		.on("click",function(){setHidePC(true,update)});
		v._btn_mo			.on("click",function(){setHideMO(false,update)});
		v._btn_mo_ac		.on("click",function(){setHideMO(true,update)});
	}
	
	/* ---------- ---------- ---------- */

	var narrow = "";
	var hide = "";
	var hidePC = "";
	var hideMO = "";
	
	function setData(_blockType,_narrow,_hide,_hidePC,_hideMO){
		if(_blockType == "layout.colDiv") {
			v.view_active.hide()
			v.view_negative.show()
			return;
		}
		v.view_active.show()
		v.view_negative.hide()
		//
		narrow = _narrow;
		hide = _hide;
		hidePC = _hidePC;
		hideMO = _hideMO;
		setNarrow	( narrow	, false);
		setHide		( hide		, false);
		setHidePC	( hidePC	, false);
		setHideMO	( hideMO	, false);
	}
	
	function toggleNarrow(){
		setNarrow(isNarrow ? false:true , true)
	}
	var isNarrow = false
	function setNarrow(_b,_update){
		isNarrow = _b;
		if(_b){
			if(_update) InspectView.setAttr_narrow(true);
		} else{
			if(_update) InspectView.setAttr_narrow("");
		}
	}
	
	function setHide(_b,_update){
		v._btn_hide.hide();
		v._btn_hide_ac.hide();
		if(_b){
			v._btn_hide.show();
			if(_update) InspectView.setAttr_hide(true);
		} else{
			v._btn_hide_ac.show();
			if(_update) InspectView.setAttr_hide("");
		}
	}
	function setHidePC(_b,_update){
		v._btn_pc.hide();
		v._btn_pc_ac.hide();
		if(_b){
			v._btn_pc.show();
			if(_update) InspectView.setAttr_hidePC(true);
		} else{
			v._btn_pc_ac.show();
			if(_update) InspectView.setAttr_hidePC("");
		}
	}
	function setHideMO(_b,_update){
		v._btn_mo.hide();
		v._btn_mo_ac.hide();
		if(_b){
			v._btn_mo.show();
			if(_update) InspectView.setAttr_hideMO(true);
		} else{
			v._btn_mo_ac.show();
			if(_update) InspectView.setAttr_hideMO("");
		}
	}
	return {
		init:init,
		setData:setData ,
		toggleNarrow:toggleNarrow 
	}
})();

