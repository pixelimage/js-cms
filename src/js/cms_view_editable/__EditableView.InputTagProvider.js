
__EditableView.InputTagProvider = (function(){
	
	function _brText(_s){
		return _s.split("\n").join("<br>");
	}
	
	//グリッド編集
	function editableTD (i,val,cell,_wap){
		var tag = "";
			tag += '<td ';
			tag += ' class="{EDIT_STATE} _editable" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += ' data-type="' + cell.type + '" ';
			tag += ' style="'+cell.style + '"';
			tag += '>'+ _brText(val)+'</td>';
		return _wapTag(_wap,tag);
	}
	
	//グリッド編集 属性が入力できるTabelタグ用
	function editableTD_Table(i,val,cell,_wap){
		var tag = "";
			tag += '<td ';
			tag += ' class="{EDIT_STATE} _editableTable" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += ' data-type="' + cell.type + '" ';
			tag += '>'+CMS_TagU.deleteCellAttr(_brText(val)) +'</td>';
		return _wapTag(_wap,tag);
	}
	
	//グリッド編集 HTMLタグをそのまま表示
	function editableTD_HTML  (i,val,cell,_wap){
		var tag = "";
			tag += '<td ';
			tag += ' class="{EDIT_STATE} _editableHTML" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += ' data-type="' + cell.type + '" ';
			tag += '><textarea '
			tag += ' style="'+cell.style + '"';
			tag += ' >' + val + '</textarea></td>';
		return _wapTag(_wap,tag);
	}
	
	//テキスト編集用(グリッドの場合は、_editableTD)
	function singleline(i,val,cell,_wap){
		var tag = "";
			tag += '<input';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += ' style="'+cell.style + '"';
			tag += ' class="_editableNode"';
			if(cell.list) tag += ' list="'+cell.list+'"';
			tag += ' value="'+ val +'">';
			tag += _getNoteTag(cell.note);
			//cell
		return _wapTag(_wap,tag);
	}
	//テキスト編集用(グリッドの場合は、editableTD)
	function multiline(i,val,cell,_wap){
		var cs = CMS_FormU.getCSS_Class(cell.codeType);
		var tag = "";
			tag += '<div class="_input-with-btns ">'
			tag += '<textarea';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += ' style="'+cell.style + '"';
			tag += ' class="_editableNode '+ cell.class_ + " " + cs + '"';
			tag += '>'+ val +'</textarea>';
			
			//拡大編集ボタン追加
			tag += '<div class="_btns">'
			tag += 		'<span class="_btn_input _edit" data-type="'+cell.codeType+'"><i class="fa fa-bars"></i></span> '
			tag += '</div>'
			tag += '</div>'
			tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	function table (i,val,cell,_wap){
		alert("エラー：getInputTag.table")
	}
	function image(i,val,cell,_wap){
		var imgTag = '<div class="_no-photo">画像未設定</div>'
		if(val != ""){
			imgTag = CMS_Path.MEDIA.getPreviewImageTag(val);
		}
		var uid = DateUtil.getRandamCharas(10);
		InputTagTempDatas.addData(uid, val);
		var tag = "";
			tag += '<div class="_image_set {EDIT_STATE}"';
			tag += ' data-val="' + uid + '" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += '>'
			tag += '	<div class="_btn_image _image_thumb _cms_btn_alphaS">'+ imgTag + '</div>';
			tag += '	<div class="_image_extra">';
			tag += '		<div class="_cms_btn_alphaS _btn_image_t">' + val+'</div>';
			tag += '		<div class="_cms_btn_alpha _btn_image_list ss_img_select img_select2_img"></div>';
			tag += '		<div class="_cms_btn_alpha _btn_image_mock ss_img_select img_select2_dummy"></div>';
			tag += '		<div class="_cms_btn_alpha _btn_delete ss_img_select img_select2_remove"></div>';
			tag += '	</div>';
			tag += '</div>';
			tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	
	function anchor(i,val,cell,_wap){//a
		var aTag = CMS_AnchorU.getViewTag(val,false);
		var uid = DateUtil.getRandamCharas(10);
		InputTagTempDatas.addData(uid, val)
		var tag = "";
			tag += '<div class="{EDIT_STATE} _btn_anchor _cms_btn_alpha"';
			tag += ' data-val="' + uid + '" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += '>';
			tag += aTag;
			tag += '</div>';
			tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	function textAnchor(i,val,cell,_wap){//a
		var aTag = CMS_AnchorU.getViewTag(val,false);
		var uid = DateUtil.getRandamCharas(10);
		InputTagTempDatas.addData(uid, val)
		var tag = "";
			tag += '<div class="{EDIT_STATE} _btn_textAnchor _cms_btn_alpha"';
			tag += ' data-val="' + uid + '" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += '>';
			tag += aTag;
			tag += '</div>';
			tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	
	//20150415
	function btnList(i,val,cell,_wap){
		if(val == false) val = {}
		var uid = DateUtil.getRandamCharas(10);
		var aTag = CMS_AnchorListU.getViewTag(val,false);
		InputTagTempDatas.addData(uid, val)
		var tag = "";
			tag += '<div class="{EDIT_STATE} _btn_btnList _cms_btn_alpha"';
			tag += ' data-val="' + uid + '" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += '>';
			tag += aTag;
			tag += '</div>';
			tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	
	//20150418
	function tree(i,val,cell,_wap){
		if(val == false) val = {}
		var uid = DateUtil.getRandamCharas(10);
		//
		var htmlAbs = CMS_Path.PAGE.ABS;
		var tree = CMS_Data.Sitemap.getData();
		
		var aTag = TreeAPI.getTag( htmlAbs, tree , val);
			aTag = aTag.split(TreeAPI_SITE_DIR).join("");
		
		InputTagTempDatas.addData(uid, val)
		var tag = "";
			tag += '<div class="{EDIT_STATE} _btn_tree _previewTreeView _cms_btn_alpha"';
			tag += ' data-val="' + uid + '" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += '>';
			tag += aTag;
			tag += '</div>';
			tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	
	/* ---------- ---------- ---------- */

	function select(i,val,cell,_wap){
		var tag = "";
		tag += '<select';
		tag += ' data-no="'+ i +'" ';
		tag += ' data-id="' + cell.id + '" ';
		tag += '>';
		var vs = cell.vals
		if(typeof cell.vals == "function") vs = cell.vals();
		var m = false;
		for (var g = 0; g < vs.length ; g++) {
			var option = vs[g];
			tag += '<option '
			if( val == option[0]){ tag += ' selected';m = true; }
			tag += ' value="'+option[0]+'">'+option[1]+'</option>';
		}
		if(!m){
			tag += '<option value="'+val+'" selected>'+val+' ( 未定義の値です ) </option>';
		}
		tag += '</select>';
		tag += _getNoteTag(cell.note);
		return _wapTag(_wap,tag);
	}
	function checkbox(i, val, cell, _wap) {
		var s = cell.name;
		if(s == "公開") s = "";
		var uid = DateUtil.getRandamCharas(10);
		var tag = "";
		tag += '<input class="checkbox" ';
		tag += ' type="checkbox"';
		tag += ' id="' + uid + '" ';
		tag += ' data-no="' + i + '" ';
		tag += ' data-id="' + cell.id + '" ';
		tag += (val == "1") ? " checked " : "";
		tag += '><label for="' + uid + '"> ' + s + '</label>';
		tag += _getNoteTag(cell.note);
		///
		return _wapTag(_wap, tag);
	}
	
	function yyyymmdd(i, val, cell, _wap) {
		var tag = "";
			tag += '<div class="_editYYYYMMDD" ';
			tag += ' data-no="' + i + '" ';
			tag += ' data-id="' + cell.id + '" ';
			tag += ' data-type="' + cell.type + '" ';
			tag += '>' + val + '</div>';
		return _wapTag(_wap,tag);
	}
	
	/* ---------- ---------- ---------- */

	function _wapTag(_wap,_t){
		var tag = _t;
		if(_wap != ""){
			tag = '<' + _wap + ' class="{EDIT_STATE}">' + tag +'</' +_wap+'>'
		}
		return tag;
	}

	function _getNoteTag (_s){
		var tag = ""
		if(_s != ""){
			if(_s != undefined){
				tag += '<p class="_note">'+_s +'</p>'
			}
		}
		return tag;
	}
	
	return {
		editableTD: editableTD,
		editableTD_Table: editableTD_Table,
		editableTD_HTML: editableTD_HTML,
		singleline: singleline,
		multiline: multiline,
		table: table,
		image: image,
		anchor: anchor,
		textAnchor: textAnchor,
		btnList: btnList,
		tree: tree,
		select: select,
		checkbox: checkbox,
		yyyymmdd: yyyymmdd
	}
})();
