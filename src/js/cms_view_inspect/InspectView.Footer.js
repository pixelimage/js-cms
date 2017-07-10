
InspectView.Footer	 = (function(){

	var view;
	var v = {};
	
	function init(_view){
		view = $("<div>");
		var tag = ""
			tag += '<table>';
			tag += '	<tr>';
			tag += '		<td><span class="_cms_btn_alpha _btn_json_im ss_inspect2 _edit"></span></td>';
			//tag += '		<td>'
			// tag += '			<div class="_hoverSet">'
			// tag += '				<span class="_cms_btn_alpha _btn_json_im ss_inspect2 _edit"></span>'
			// tag += '				<div class="_hoverItems">'
			// tag += '					<span class="_cms_btn_alpha _btn_json_im ss_inspect2 _edit"></span>'
			// tag += '					<span class="_cms_btn_alpha _btn_addPreset ss_inspect2 _my"></span>'
			// tag += '				</div>'
			// tag += '			</div>'
			//tag += '		</td>';
			// tag += '		<td><span class="_cms_btn_alpha _btn_json_im ss_inspect2 _edit"></span></td>';
			// tag += '		<td><span class="_cms_btn_alpha _btn_addPreset ss_inspect2 _my"></span></td>';
			tag += '		<td>'
			tag += '			<div class="_hoverSet">'
			tag += '				<span class="_cms_btn_alpha _btn_copy ss_inspect2 _copipe"></span>'
			tag += '				<div class="_hoverItems">'
			tag += '					<span class="_cms_btn_alpha _btn_copy ss_inspect2 _copipe_copy" '+TIP("#+C","R")+'></span>'
			tag += '					<span class="_cms_btn_alpha _btn_cut ss_inspect2 _copipe_cut" '+TIP("#+X","R")+'></span>'
			tag += '					<span class="_cms_btn_alpha _btn_past ss_inspect2 _copipe_past" '+TIP("#+V","R")+'></span>'
			tag += '					<span class="_cms_btn_alpha _btn_past2 ss_inspect2 _copipe_past2" '+TIP("#+Shift+V","R")+'></span>'
			tag += '				</div>'
			tag += '			</div>'
			tag += '		</td>';
			// tag += '		<td>'
			// tag += '			<div class="_hoverSet">'
			// tag += '				<span class="_cms_btn_alpha _btn_dup ss_inspect2 _dup" '+TIP("#+D")+'></span>'
			// tag += '				<div class="_hoverItems">'
			// tag += '					<span class="_cms_btn_alpha _btn_dup ss_inspect2 _dup" '+TIP("#+D")+'></span>'
			// tag += '				</div>'
			// tag += '			</div>'
			// tag += '		</td>';
			tag += '		<td><span class="_cms_btn_alpha _btn_dup ss_inspect2 _dup" '+TIP("#+D")+'></span></td>';
			// tag += '		<td><span class="_cms_btn_alpha  ss_inspect2 _dup" '+TIP("#+D")+'></span></td>';
			tag += '		<td><span class="_cms_btn_alpha _btn_del ss_inspect2 _del" '+TIP("#+DELL")+'></span></td>';
			tag += '		<td>'
			tag += '			<div class="_hoverSet">'
			tag += '				<span class="_cms_btn_alpha _btn_next ss_inspect2 _move"></span>'
			tag += '				<div class="_hoverItems" style="top:-65px;">'
			tag += '					<span class="_cms_btn_alpha _btn_prev2 ss_inspect2 _move_top2"></span>'
			tag += '					<span class="_cms_btn_alpha _btn_prev ss_inspect2 _move_top" '+TIP("#+↑","R")+'></span>'
			tag += '					<span class="_cms_btn_alpha _btn_next ss_inspect2 _move_bottom" '+TIP("#+↓","R")+'></span>'
			tag += '					<span class="_cms_btn_alpha _btn_next2 ss_inspect2 _move_bottom2"></span>'
			tag += '				</div>'
			tag += '			</div>'
			tag += '		</td>';
			tag += '	</tr>';
			tag += '</table>';
		view.html(tag);
		
		setBtn();
		return view;
	}
	function setBtn(){
		view.find("._btn_dup")		.on("click",function(){ clickAnim(this);window.sc.duplicateCurrent()});
		view.find("._btn_del")		.on("click",function(){ clickAnim(this);window.sc.deleteCurrent();});
		view.find("._btn_copy")		.on("click",function(){ clickAnim(this);window.sc.copyCurrent();	});
		view.find("._btn_cut")		.on("click",function(){ clickAnim(this);window.sc.cutCurrent();	});
		view.find("._btn_past")		.on("click",function(){ clickAnim(this);window.sc.pastCurrent()});
		view.find("._btn_past2")	.on("click",function(){ clickAnim(this);window.sc.pastCurrent2()});
		
		view.find("._btn_prev2")	.on("click",function(){ clickAnim(this);window.sc.moveTopCurrent()});
		view.find("._btn_prev")		.on("click",function(){ clickAnim(this);window.sc.moveUpCurrent()});
		view.find("._btn_next")		.on("click",function(){ clickAnim(this);window.sc.moveDownCurrent()});
		view.find("._btn_next2")	.on("click",function(){ clickAnim(this);window.sc.moveBottomCurrent()});
		
		view.find("._btn_json_im")		.on("click",function(){ clickAnim(this);window.sc.editJSON()});
		view.find("._btn_addPreset")	.on("click",function(){ clickAnim(this);window.sc.addToMyBlock()});
	}
	function clickAnim(_this){
		var tar = $(_this);
		tar.css("opacity","0.25");
		setTimeout(function(){
			tar.css("opacity","1");
		},100);
	}
	return {
		init:init
	}
})();
