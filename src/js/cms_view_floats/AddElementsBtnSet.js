
AddElementsBtnSet 		 = (function(){
	var view;
	var v = {};
	var _delay
	
	function init(){
		view = $('#AddElementsBtnSet');

		var tag = "";
			tag += '<div class="_btn"><div class="_cms_btn_alphaS ss_add_misk _01"></div><div class="_help-icon _btn_guide_01"><i class="fa fa-question "></i></div></div>';
			tag += '<div class="_btn"><div class="_cms_btn_alphaS ss_add_misk _02"></div><div class="_help-icon _btn_guide_02"><i class="fa fa-question "></i></div></div>';
			// tag += '<div class="_btn"><div class="_cms_btn_alphaS ss_add_misk _01"></div></div>';
			// tag += '<div class="_btn"><div class="_cms_btn_alphaS ss_add_misk _02"></div></div>';
		view.html(tag)
		
		// stageInit();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		
		v._01 = view.find('._01')
		v._02 = view.find('._02')
		
		v._01.click(function(){ openGadgetList() });
		v._02.click(function(){ openMyPreset() });
		
		view.find('._btn_guide_01').click(function(){CMS_GuideU.openGuide("block/gadget"); });
		view.find('._btn_guide_02').click(function(){CMS_GuideU.openGuide("block/preset"); });
	}
	
	function openGadgetList(){
		GadgetListView.stageIn(function(_type,_param){
			setTimeout(function(){
				if(_type == "_repeat"){
					AddElementsManager.addElement_by_object(_param);
				} else{
					AddElementsManager.addElement(_type,"");
				}
			},200);
		})
	}
	function openMyPreset(){
		PresetStageView.stageIn()
	}
	
	function addElement(_param){
		setTimeout(function(){
			AddElementsManager.addElement_by_object(_param);
		},200);
	}
	
	return {
		init: init
	}
})();