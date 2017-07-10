
InspectView.ID	 = (function(){

	var view;
	var v = {};
	
	function init(_view){
		view = $("<div>");
		var tag = ""
			tag += '<div class="_notes">■ID設定</div>';
			tag += '<div class="_view_active">';
			tag += '<table class="_mainlayout">';
			tag += '<tr><th>id="値"</th><td><input class="_in_data_id _color-style _bold" placeholder="IDを入力" value=""></td></tr>';
			tag += '</table>';
			// tag += CMS_GuideU.getGuideTag("inspect/id","IDについて","dark");
			tag += '</div>';
			tag += '<div class="_view_negative">';
			tag += '<div class="_dont_use _notes">このブロックでは利用できません。<br><br></div>';
			tag += '</div>';
			
		view.html(tag);
		v.view_active = view.find("._view_active").hide();
		v.view_negative = view.find("._view_negative").hide();
		
		v.in_data_id = view.find("._in_data_id");
		v.in_data_id.keyup(function(){ 
			InspectView.setAttr_id($(this).val());
		});
		
		setBtn();
		return view;
	}
	function setBtn(){
	}
	
	function setData(_blockType,_id){
		if(_blockType == "layout.colDiv") {
			v.view_active.hide()
			v.view_negative.show()
			return;
		}
		v.view_active.show()
		v.view_negative.hide()
		
		v.in_data_id.val(_id)
	}
	
	return {
		init:init,
		setData:setData
	}
})();




InspectView.ATTR	 = (function(){

	var view;
	var v = {};
	
	function init(_view){
		view = $("<div>");
		var tag = ""
			tag += '<div class="_notes">■タグ属性設定 </div>';
			tag += '<div class="_view_active">';
			tag += '<table class="_mainlayout">';
			tag += '<tr><td>'
			tag += '<div class="_input-with-btns">'
			tag += '	<input class="_in_data_attr _color-style _bold" placeholder="タグ属性を入力" value="">';
			tag += '	<div class="_btns">'
			tag += '		<span class="_btn_input _edit_single" data-type="input:class">'+Dic.I.Edit+'</span> '
			tag += '	</div>'
			tag += '</td></tr>';
			tag += '</table>';
			tag += '<div class="_notes">※class,style,id属性以外を指定できます。汎用的な用途で利用できます。</div>';
			tag += '</div>';
			tag += '<div style="height:5px;"></div>';
			tag += CMS_GuideU.getGuideTag("inspect/id","その他タブについて","dark");
			
		view.html(tag);
		
		v.in_data_attr = view.find("._in_data_attr");
		v.in_data_attr.keyup(function(){ 
			InspectView.setAttr_attr($(this).val());
		});
		
		setBtn();
		return view;
	}
	function setBtn(){
	}
	
	function setData(_blockType,_id){
		v.in_data_attr.val(_id)
	}
	
	return {
		init:init,
		setData:setData
	}
})();

