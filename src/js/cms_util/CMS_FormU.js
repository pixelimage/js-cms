var CMS_FormU 			 = (function(){
	var view;
	var v = {};

	function init(){
		$(function(){
			//入力フォームの拡大ボタンに対して、クリック処理をアサインする
				
			$(document).on('click','._input-with-btns ._edit',function(){
				var tar = $(this).parent().parent().find("textarea").eq(0);
				MiniEditer.stageIn(
					tar.val(),
					function(_s){
						tar.val(_s).keyup()
					},
					$(this).data("type")
				);
			});
			$(document).on('click','._input-with-btns ._edit_single',function(){
				var tar = $(this).parent().parent().find("input").eq(0);
				MiniEditer.stageIn(
					tar.val(),
					function(_s){
						tar.val(_s).keyup()
					},
					$(this).data("type")
				);
			});
		});
	}

	function createCheckBox(_v,_m,_ts,_n,_callback){
		
		var tag = "";
			tag += '<div class="_checkboxs">'
			tag += '<span class="_m" >'+_m+'</span>';
			tag += '<div class="_checkboxs_inner">'
			for (var i = 0; i < _ts.length ; i++) {
				tag += 	'<span class="_checkbox " data-no="'+i+'">'+_ts[i]+'</span>';
			}
			tag += '</div>';
			tag += '</div>';
		_v.append(tag);
		_v.find("._checkbox").click(function(){ 
			var n = $(this).data("no");
			_v.find("._checkbox").removeClass("_active");
			_v.find("._checkbox").eq(n).addClass("_active");
			_callback(n)
		});
		_v.find("._checkbox").eq(_n).addClass("_active");
	}

	function classSelect(_v,_n,_cs){
		for (var i = 0; i < _cs.length ; i++) {
			if(_cs[i] != ""){
				_v.removeClass(_cs[i])
			}
		}
		_v.addClass(_cs[_n])
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	function getCSS_Class(_type){
		var s = "";
		if(_type == "text") 	s = "";
		if(_type == "style") 	s = "_color-style";
		if(_type == "js") 		s = "_color-js";
		if(_type == "html") 	s = "_color-html";
		return s;
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */

	function getTextarea(_val,_type,_extra){
		if(!_type ) _type = "multi"
		var extra = (_extra) ? _extra : "";
		var tag = ""
			tag += '<div class="_input-with-btns _input-textarea">'
			tag += '	<textarea class="_textarea-scroll _color-'+_type+'"></textarea><br>'
			tag += '	<div class="_btns">'
			tag += '		<span class="_btn_input _edit" data-pos="'+extra+'" data-type="textarea:'+_type+'">'+Dic.I.Edit+' 編集</span> '
			tag += '	</div>'
			tag += '</div>'
		var node = $(tag);
		if(_val) node.find("textarea").val(_val);
		return node;
	}
	return {
		init: init,
		createCheckBox: createCheckBox,
		classSelect: classSelect,
		getCSS_Class: getCSS_Class,
		getTextarea: getTextarea
	}
})();


