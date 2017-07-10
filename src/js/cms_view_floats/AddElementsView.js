
	
AddElementsView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#AddElementsView');
		var tag = "";
			tag += '<div class="_mouseArea"></div>';
			tag += '<div class="_core ss_add_bg"></div>';
			tag += '<div class="_text_block_add ">';
			tag += '	<div class="_btn"><div class="_cms_btn_alphaS ss_add_misk _00"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+1")+'><div class="_cms_btn_alphaS ss_add_misk _h1 _btn_add_h1"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+2")+'><div class="_cms_btn_alphaS ss_add_misk _h2 _btn_add_h2"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+3")+'><div class="_cms_btn_alphaS ss_add_misk _h3 _btn_add_h3"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+4")+'><div class="_cms_btn_alphaS ss_add_misk _h4 _btn_add_h4"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+5")+'><div class="_cms_btn_alphaS ss_add_misk _p _btn_add_p"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+6")+'><div class="_cms_btn_alphaS ss_add_misk _free _btn_add_markdown"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+7")+'><div class="_cms_btn_alphaS ss_add_misk _img _btn_add_img"></div></div>';
			tag += '	<div class="_btn" '+TIP("#+8")+'><div class="_cms_btn_alphaS ss_add_misk _margin _btn_add_margin"></div></div>';
			tag += '</div>';
			tag += '<div class="_help-icon _btn_guide_base"><i class="fa fa-question "></i></div>';
		view.html(tag)
		
		v.core = view.find('._core');
		v.baseBlock = view.find('._00');
		
		// view.find('._btn_guide_base').click(function(){CMS_GuideView.stageIn("block/base"); });
		view.find('._btn_guide_base').click(function(){
			CMS_GuideU.openGuide("block/base");
		});
		
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		var tag = ""
 			tag += '<div class="_btn_add_div ss_add _btn_l_01" ></div>';
 			tag += '<div class="_btn_add_cols2 ss_add _btn_l_02" ></div>';
 			tag += '<div class="_btn_add_cols3 ss_add _btn_l_03" ></div>';
 			tag += '<div class="_btn_add_cols4 ss_add _btn_l_04" ></div>';
 			tag += '<div class="_btn_add_margin ss_add _btn_margin" ></div>';
 			tag += '<div class="_btn_add_a ss_add _btn_o_a" ></div>';
 			tag += '<div class="_btn_add_note ss_add _btn_note" ></div>';
 			tag += '<div class="_btn_add_place ss_add _btn_place" ></div>';
 			tag += '<div class="_btn_add_h1 ss_add _btn_h_01" ></div>';
 			tag += '<div class="_btn_add_h2 ss_add _btn_h_02" ></div>';
 			tag += '<div class="_btn_add_h3 ss_add _btn_h_03" ></div>';
 			tag += '<div class="_btn_add_h4 ss_add _btn_h_04" ></div>';
 			tag += '<div class="_btn_add_markdown ss_add _btn_o_md" ></div>';
 			tag += '<div class="_btn_add_p ss_add _btn_t_01" ></div>';
 			tag += '<div class="_btn_add_list ss_add _btn_t_list" ></div>';
 			tag += '<div class="_btn_add_img ss_add _btn_o_01" ></div>';
 			tag += '<div class="_btn_add_imgs ss_add _btn_o_images " ></div>';
 			tag += '<div class="_btn_add_btn ss_add _btn_t_btn" ></div>';
 			tag += '<div class="_btn_add_btnList ss_add _btn_t_btnlist" ></div>';
 			tag += '<div class="_btn_add_table2 ss_add _btn_o_fulltable" ></div>';
 			tag += '<div class="_btn_add_html ss_add _btn_o_html" ></div>';
 			tag += '<div class="_btn_add_blq ss_add _btn_t_blq" ></div>';
 			tag += '<div class="_btn_add_code ss_add _btn_t_code" ></div>';

		var ade = AddElementsManager.addElement;
		v.core.html(tag);
		view.find('._btn_add_div')		.click(function(){ade("layout.div","")});
		view.find('._btn_add_cols2')	.click(function(){ade("layout.cols","2")});
		view.find('._btn_add_cols3')	.click(function(){ade("layout.cols","3")});
		view.find('._btn_add_cols4')	.click(function(){ade("layout.cols","4")});
		view.find('._btn_add_cols5')	.click(function(){ade("layout.cols","5")});
		view.find('._btn_add_margin')	.click(function(){ade("tag.margin","")});
		view.find('._btn_add_note')		.click(function(){ade("tag.note","")});
		view.find('._btn_add_place')	.click(function(){ade("tag.place","")});
		
		view.find('._btn_add_h1')		.click(function(){ade("tag.heading","h1")});
		view.find('._btn_add_h2')		.click(function(){ade("tag.heading","h2")});
		view.find('._btn_add_h3')		.click(function(){ade("tag.heading","h3")});
		view.find('._btn_add_h4')		.click(function(){ade("tag.heading","h4")});
		
		view.find('._btn_add_p')		.click(function(){ade("tag.p","")});
		view.find('._btn_add_list')		.click(function(){ade("object.list","")});
		view.find('._btn_add_btn')		.click(function(){ade("tag.btn","")});
		view.find('._btn_add_btnList')	.click(function(){ade("object.btnList","")});
		view.find('._btn_add_a')		.click(function(){ade("tag.anchor","")});
		view.find('._btn_add_img')		.click(function(){ade("tag.img","")});
		view.find('._btn_add_imgs')		.click(function(){ade("object.images","")});
		view.find('._btn_add_table2')	.click(function(){ade("object.table","")});
		view.find('._btn_add_html')		.click(function(){ade("tag.html","")});
		view.find('._btn_add_markdown')	.click(function(){ade("tag.markdown","")});
		view.find('._btn_add_blq')		.click(function(){ade("tag.blockquote","")});
		view.find('._btn_add_code')		.click(function(){ade("tag.code","")});
		
		v.baseBlock.click( function (){click_()});
		view.hover( 
			function(){ hover() },
			function(){ hoverOut() }
		);
		window.addBlock = AddElementsManager.addElement;
	}
	
	function click_(){
		if(tID) clearTimeout(tID)
		view.addClass("hover")
		hideFloatView();
	}
	
	function hover(){
		if(tID) clearTimeout(tID)
	}
	var tID
	function hoverOut(){
		if(tID) clearTimeout(tID)
		tID = setTimeout(function(){
			view.removeClass("hover")
		},500);
	}
	
	/* ---------- ---------- ---------- */
	
	return {
		init: init
	}
})();