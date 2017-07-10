
EditableView.InputFormProvider = (function(){

	function getNoteTag (_s){
		var tag = ""
		if(_s != ""){
			if(_s != undefined){
				tag += '<div class="_note">'+_s +'</div>'
			}
		}
		return tag;
	}
	function _getNote(_cell){
		var note = getNoteTag(_cell.note);
		var div = document.createElement('div');
		if(note) div.innerHTML = note;
		return div;
	}

	/* ---------- ---------- ---------- */

	function single(i,val,cell){
    	var fragment = document.createDocumentFragment();
		var input = document.createElement('input');
			input.setAttribute('class', "_editableNode");
			input.setAttribute('style', cell.style);
			input.setAttribute('data-no', i);
			input.setAttribute('data-id', cell.id);
			input.setAttribute('data-type', cell.type);
			input.setAttribute('placeholder', cell.placeholder);
			input.value = val;
		
		fragment.appendChild(input);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	function multi(i,val,cell){
    	var fragment = document.createDocumentFragment();
        var div = document.createElement('div');
			div.setAttribute('class', "_input-with-btns");
			
		var textarea = document.createElement('textarea');
			textarea.setAttribute('class', ["_editableNode" ,cell.class_,CMS_FormU.getCSS_Class(cell.codeType)].join(" "));
			textarea.setAttribute('style', cell.style);
			textarea.setAttribute('data-no', i);
			textarea.setAttribute('data-id', cell.id);
			textarea.setAttribute('data-type', cell.type);
			textarea.value = val;
		
        var btns = document.createElement('div');
			btns.setAttribute('class', "_btns");
			btns.innerHTML = '<span class="_btn_input _edit" data-type="textarea:'+cell.codeType+'">'+Dic.I.Edit+'</span>'
			
			div.appendChild(textarea);
			div.appendChild(btns);
		
		fragment.appendChild(div);
		fragment.appendChild(_getNote(cell));
		return fragment;
	}
	
	function select(i,val,cell){
		
    	var fragment = document.createDocumentFragment();
        var select = document.createElement('select');
			select.setAttribute('data-no', i);
			select.setAttribute('data-id', cell.id);
        
		var ops = (function(_cell,_parent){ 
			var s = "";
			var vs = _cell.vals;
			if(typeof _cell.vals == "function") vs = _cell.vals();
			var m = false;
			for (var g = 0; g < vs.length ; g++) {
   				var option = document.createElement('option');
				var op = vs[g];
				if( val == op[0]){ 
					option.setAttribute('selected', "selected");
					m = true;
				}
				option.setAttribute('value', op[0]);
				option.innerText = op[1]
				_parent.appendChild(option);
			}
			if(!m){
   				var option = document.createElement('option');
					option.setAttribute('value',val);
					option.setAttribute('selected', "selected");
					option.innerText = val + ' ( 未定義の値です )'
				_parent.appendChild(option);
			}
		})(cell,select);
		
		fragment.appendChild(select);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	function checkbox(i, val, cell) {
		var s = (cell.name == "公開") ? "" : cell.name;
		
    	var fragment = document.createDocumentFragment();
		var uid = DateUtil.getRandamCharas(10);
        var input = document.createElement('input');
			input.setAttribute('class', "checkbox");
			input.setAttribute('type', "checkbox");
			input.setAttribute('id', uid);
			input.setAttribute('data-no', i);
			input.setAttribute('data-id', cell.id);
			if(val == "1"){
			input.setAttribute('checked','checked');
			}
			
        var label = document.createElement('label');
			label.setAttribute('for', uid);
			label.innerHTML =" " + s

		fragment.appendChild(input);
		fragment.appendChild(label);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	function image(i,val,cell){
		
    	var fragment = document.createDocumentFragment();
		var uid = DateUtil.getRandamCharas(10);
		InputTagTempDatas.addData(uid, val);
        var div = document.createElement('div');
			div.setAttribute('class', "_image_set");
			div.setAttribute('data-no', i);
			div.setAttribute('data-id', cell.id);
			div.setAttribute('data-val', uid);	
		
		var imgTag = '<div class="_no-photo">画像未設定</div>'
		
		if(val.path != "") {
			imgTag = CMS_ImgBlockU.getImageTag({
				path	: val.path,
				isPub	: false,
				width	: "100%",
				ratio	: val.ratio,
				alt		: "",
				attr	: ""
			});
		}
		
        var div_m = document.createElement('div');
			div_m.setAttribute('class', "_btn_image _image_thumb _cms_btn_alphaS");
			div_m.innerHTML = imgTag
		
        var div_s = document.createElement('div');
			div_s.setAttribute('class', "_image_extra");
		var s = "";
			//simple
			s += '<div class="_cms_btn_alpha _btn_mode _btn_mode_simple">'
			s += '	<i class="fa fa-lg fa-circle-o"></i><i class="fa fa-lg fa-dot-circle-o "></i>';
			s += '	シンプルモード';
			s += '	<span class="ss_inspect3 _img_simple"></span>'
			s += '</div>';
			s += '<div class="_mode_switch_body _body_img_simple">';
			s += '		<div class="_cms_btn_alphaS _btn_image_t">'+val.path+'</div>';
			s += '		<div class="_cms_btn_alpha _btn_image_list ss_img_select img_select2_img"></div>';
			s += '		<div class="_cms_btn_alpha _btn_image_mock ss_img_select img_select2_dummy"></div>';
			s += '		<div class="_cms_btn_alpha _btn_image_delete ss_img_select img_select2_remove"></div>';
			// s += '		<div class="_cms_btn_alpha _btn_image_tag_ng "><i class="fa fa-check-square "></i> IMGタグのみ出力</div>'
			// s += '		<div class="_cms_btn_alpha _btn_image_tag_ac "><i class="fa fa-square-o "></i>  IMGタグのみ出力</div>'
			s += '</div>';
			s += '<div class="_mode_switch_body_hr"></div>';
			
			//layout
			s += '<div class="_cms_btn_alpha _btn_mode _btn_mode_layout">'
			s += '	<i class="fa fa-lg fa-circle-o"></i><i class="fa fa-lg fa-dot-circle-o "></i>';
			s += '	レイアウトモード';
			s += '	<span class="ss_inspect3 _img_layout"></span>'
			s += '</div>';
			s += '<div class="_mode_switch_body _body_img_layout">';
			s += '		<div class="_cms_btn_alpha _btn_image_layout ss_img_select img_select2_layoutimg"></div>';
			s += '</div>';
			s += '<div class="_mode_switch_body_hr"></div>';
			s += '<div class="">';
			s += '幅 : <span><input class="_in_image_width _w50" placeholder="100px" data-candidate="_cms_image_width"></span>';
			s += ' 比率 : <span><input class="_in_image_ratio _w40" placeholder="3:2" data-candidate="_cms_image_ratio"></span>';
			s += '</div>';
			div_s.innerHTML = s;
			
		if(val.mode == "simple"){
			$(div_s).find("._btn_mode_simple").addClass("_current")
			$(div_s).find("._body_img_layout").hide()
		} else{
			$(div_s).find("._btn_mode_layout").addClass("_current")
			$(div_s).find("._body_img_simple").hide()
		}
		$(div_s).find("._in_image_width").val(val.width);
		$(div_s).find("._in_image_ratio").val(val.ratio);
		
		// if(val.onlyImgTag){
		// 	$(div_s).find('._btn_image_tag_ac').hide();
		// } else{
		// 	$(div_s).find('._btn_image_tag_ng').hide();
		// }
		
		div.appendChild(div_m);
		div.appendChild(div_s);
		fragment.appendChild(div);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	function anchor(i,val,cell){
    	var fragment = document.createDocumentFragment();
		var uid = DateUtil.getRandamCharas(10);
		
        var div = document.createElement('div');
			div.setAttribute('class', "_btn_anchor _cms_btn_alpha");
			div.setAttribute('data-no', i);
			div.setAttribute('data-id', cell.id);
			div.setAttribute('data-val', uid);	
			div.innerHTML = CMS_AnchorU.getViewTag(val,false);
		InputTagTempDatas.addData(uid, val);
		
		fragment.appendChild(div);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	function textAnchor(i,val,cell){
    	var fragment = document.createDocumentFragment();
		var uid = DateUtil.getRandamCharas(10);
		
        var div = document.createElement('div');
			div.setAttribute('class', "_btn_textAnchor _cms_btn_alpha");
			div.setAttribute('data-no', i);
			div.setAttribute('data-id', cell.id);
			div.setAttribute('data-val', uid);	
			div.innerHTML = CMS_AnchorU.getViewTag(val,false);
		InputTagTempDatas.addData(uid, val);
		
		fragment.appendChild(div);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	function yyyymmdd(i,val,cell){
    	var fragment = document.createDocumentFragment();
		
        var div = document.createElement('div');
			div.setAttribute('class', "_editYYYYMMDD");
			div.setAttribute('data-no', i);
			div.setAttribute('data-id', cell.id);
			div.setAttribute('data-type', cell.type);	
			div.innerHTML = val
			
		fragment.appendChild(div);
		fragment.appendChild(_getNote(cell));
		
		return fragment;
	}
	
	return {
		single: single,
		multi: multi,
		select: select,
		checkbox: checkbox,
		
		image: image,
		anchor: anchor,
		textAnchor: textAnchor,
		yyyymmdd: yyyymmdd
	}
})();

/*
setTimeout(function(){
	_test()
},500);
function _test(){
	var o = PageElement.object;
	for (var n in o) {
		var tar = o[n]
		console.log("*-" + tar.pageInfo.id);
		if(tar["grids"]){
			var grid = tar.grids;
			for (var i = 0; i < grid.length ; i++) {
				if(grid[i]["textData"]){
					if(grid[i].textData["cells"]){
						var cells = grid[i].textData.cells;
						for (var ii = 0; ii < cells.length ; ii++) {
							console.log(cells[ii].type);
						}
					}
				}
			}
		}
	}
}
// single
// multi
// checkbox
// select
*/



// //後方互換用
// function __convertImage(_val){
// 	if(!_val) _val = "";
// 	if(typeof _val == "string"){
// 		_val = { mode:"simple", path:_val, width:"", ratio:"" }
// 	}
// 	if (!_val.mode){
// 		if(typeof _val.path == "string"){
// 			_val.mode = "simple";
// 		} else{
// 			_val.mode = "layout";
// 		}
// 	}
// 	if (!_val.width) _val.width = "";
// 	if (!_val.ratio) _val.ratio = "";
// 	return _val;
// }