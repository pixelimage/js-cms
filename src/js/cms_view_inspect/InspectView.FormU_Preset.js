//CSSデザインプリセット 
InspectView.FormU_Preset	 = (function(){

	function init(){
		//CSSファイルを更新したら、更新
		CMS_Data.InspectCSS.registUpdateCallback(function(){
			setNode_core();
		})
	}
	
	/* ---------- ---------- ---------- */
	var view
	var v = {}
	var extra;
	var blockType;
	
	//ノードをセットし、プリセット関係のHTMLを返す
	function setNode(_view,_blockType,_extra){
		view = _view;
		extra = _extra;
		blockType = _blockType;
		prevVal = ""
		if(CMS_Data.InspectCSS.hasData() == false){
			hasNoData();
			return;
		}
		
		v.input = _view.find("input");
		v.input.keyup(function(){ keyup()})
		v.wapper = $('<div class="_presetArea"></div>');
		view.append(v.wapper)
		setNode_core();
	}
	
	function hasNoData(){
		var tag = ""
			tag += '<div class="_presetError">CSSプリセットファイルが見つからないか、未設定です。<br>';
			tag += ASSET_CSS_DIRS[0];
			tag += '</div>';
		view.append(tag);
	}
	
	function setNode_core(){
		v.wapper.empty();
		
		initPreset(blockType,extra);
		v.presets = $(getTag());
		v.items = v.presets.find("._item");
		v.subWapper = v.presets.find("._presetSubWapper");
		
		v.wapper.append(v.presets);
		assignEvent();
		updateSelect();
	}
	
	/* ---------- ---------- ---------- */
	
	function assignEvent(){
		//プリセットクリック
		v.presets.find("._btn_add").click(function(){
			openDesignLibPage();
		});
		v.presets.find("._btn_item").click(function(){
			selectItem($(this));
		});
		//編集クリック
		v.presets.find("._btn_edit").click(function(){
			var id = $(this).parent().data("node");
			CMS_MainController.openPresetCSSFile(id);
		});
		v.presets.find("._btn_preset").click(function(){
			CMS_MainController.openPresetCSSFile("");
		});
		
		v.preset_tabs = v.presets.find("._preset_tab");
		v.preset_tabs.click(function(){
			openTab($(this).data("no"))
		})
		v.preset_tab_bodys = v.presets.find("._preset_tab_body");
		openTab(currentTab);
	}
	
	var currentTab = 0
	function openTab(_no){
		currentTab = _no;
		v.preset_tabs.removeClass("_current").eq(currentTab).addClass("_current");
		v.preset_tab_bodys.hide().eq(currentTab).show();
		// v.preset_tab_bodys.show();
		InspectView.updateBodyH();
	}
	
	function openDesignLibPage(){
		var s = "?class=" + currentType + "._new_";
		window.open(CSS_DESIGN_URL + s ,"cms_asset");
	}
	
	/* ---------- ---------- ---------- */
	
	var tID;
	function keyup(){ 
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			updateSelect();
		},200);
	}
	
	function getVal(){ 
		var s = ""
		if(v.input) s = v.input.val();
		return s;
	}
	function setVal(_s){
		if(!_s)_s = ""
		if(v.input) {
			v.input.val(_s).keyup();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var currentPresetList = [];
	var presetsTagList = [];
	var presetsCommonList = [];
	var currentType = "";
	function initPreset(_blockType,_extra){
		var model = PageElement_Util.getElementInfo(_blockType);
		try{
			currentType = model.pageInfo.cssDef.selector;
		}catch( e ){
			currentType = "";
			return;
		}
		//見出しの場合は、特別に処理
		if(_blockType == "tag.heading"){
			currentType = currentType.split("{h1-h6}").join(_extra);
		}
		presetsTagList 		= CMS_Data.InspectCSS.getList(currentType);
		presetsCommonList 	= CMS_Data.InspectCSS.getList("","common");
		
		//がっちゃんこ
		currentPresetList = [];
		_toFlat(currentPresetList , presetsTagList);
		_toFlat(currentPresetList , presetsCommonList);
	}
	
	function _toFlat (_list,_defs){
		for (var i = 0; i <  _defs.length ; i++) {
			if(_defs[i].subs.length > 0){
				for (var ii = 0; ii < _defs[i].subs.length ; ii++) {
					_list.push(_defs[i].subs[ii]);
				}
			} else{
				_list.push(_defs[i]);
			}
		}
	}
	
	/* ---------- ---------- ---------- */

	var itemCount = 0;
	function getTag(){
		itemCount = 0;
		var tag = "";
			tag += '<div class="_presetTitle">CSSプリセット <span class="_btn_preset"><i class="fa fa-pencil"></i> 編集</span></div>'
			tag += '<div class="_preset_tabs">'
			tag += '	<div class="_preset_tab" data-no="0">ブロックごと</div>'
			tag += '	<div class="_preset_tab" data-no="1">汎用クラス</div>'
			tag += '</div>'
			tag += '<div class="_presetItems">';
			tag += '	<div class="_preset_tab_body">' 
			tag += '		<div style="min-height:50px;">' 
			tag += 			getTag_core(presetsTagList);
			tag += '		</div>';
			if(presetsTagList.length == 0){
			tag += '		<div>このブロックに対応するプリセットはありません。</div>';
			}
			tag += '		<div class="_btn_add">デザインライブラリへ <i class="fa fa-external-link-square "></i></div>';
			tag += '	</div>';
			tag += '	<div class="_preset_tab_body">';
			tag += 			getTag_core(presetsCommonList) 
			tag += 			'<div style="line-height:1.4;margin:5px 0 0 0;">※ 汎用クラスでは、先頭に<span style="color:#ff0">sp-</span>とつけると、スマホ向け指定できます。</div>'
			tag += '	</div>';
			tag += '</div>'
			
		return tag;
	}
	
	function getTag_core(pres){
		var tag = "";
		for (var i = 0; i < pres.length ; i++) {
			var hasSub = false;
			if(pres[i].subs){
				if(pres[i].subs.length > 0) hasSub = true;
			}	
			if(hasSub){
				tag += '<div class="_presetSubWapper">';
				tag += '	<div class="_presetSubTitle"><i class="fa fa-bars "></i> '+pres[i].label+' <i class="fa fa-angle-right "></i></div>';
				tag += '	<div class="_presetSubs">'
				for (var ii = 0; ii < pres[i].subs.length ; ii++) {
					tag += getTagItem(pres[i].subs[ii]);
				}
				tag += '	</div>';
				tag += '</div>';
			} else{
				tag += getTagItem(pres[i]);
			}
		}
		return tag;
	}
	//個別プリセット
	function getTagItem(_o){
		var temp = "";
		if(_o.class == "---") {
			temp += '<div class="_item _hr"></div>'
		} else{
			temp += '<div class="_item" data-node="{NODE}" data-id="{CLASS}">';
			temp += '	<span class="_btn_item">{ICON_ON}{ICON_OFF} {NAME} <span class="_cssName">{CLASS}</span></span>';
			temp += '	<span class="_btn_edit"><i class="fa fa-pencil"></i> 編集</span>';
			temp += '</div>';
			temp = temp.split("{NO}").join(itemCount);
			temp = temp.split("{ICON_ON}").join('<i class="fa fa-check-square _checked"></i>');
			temp = temp.split("{ICON_OFF}").join('<i class="fa fa-square-o _not_checked"></i>');
			temp = temp.split("{NAME}").join(_o.label);
			temp = temp.split("{NODE}").join(_o.selector);
			temp = temp.split("{CLASS}").join(_o.class);
			itemCount++;
		}
		return temp;
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	
	//選択時
	function selectItem(_node){
		var _val =  _node.parent().data("id")
		var isSelected = _node.parent().hasClass("_current");
		var a = _treat( getVal() ).split(" ");
		
		if(! isSelected){
			//追加
			a.push(_val);
		} else{
			//削除
			var pres = currentPresetList;
			var _a = [];
			for (var i = 0; i < a.length ; i++) {
				var has = true;
				for (var ii = 0; ii < pres.length ; ii++) {
					if(a[i] == pres[ii].class){
						if(_val == a[i]){
							has = false;
						}
					}
				}
				if(has)_a.push(a[i]);
			}
			a = _a;
		}
		setVal(a.join(" "));
		updateSelect();
	}
	
	//_currentアップデート
	var CURRENT = "_current"
	var prevVal = "";
	function updateSelect(){
		if(prevVal == getVal()) return;
		prevVal = getVal();
		var a = _treat(prevVal).split(" ");
		var pres = currentPresetList;
		
		var _currents = [];
		for (var n = 0; n < a.length ; n++) {
			var name = a[n];
			for (var i = 0; i < pres.length ; i++) {
				if(name == pres[i].class){
					_currents.push(i);
				}
			}
		}
		v.items.removeClass(CURRENT);
		for (var i = 0; i < _currents.length ; i++) {
			var n = _currents[i];
			v.items.eq(n).addClass(CURRENT);
		}
		
		v.subWapper.removeClass(CURRENT);
		v.subWapper.each(function (index, dom) {
			if($(this).find("." + CURRENT).size() > 0){
				$(this).addClass(CURRENT);
			}
		});
	}
	
	
	/* ---------- ---------- ---------- */

	function _treat(_s){
		if(_s == undefined) return ""
			_s = _s.split("  ").join(" ");
			_s = _s.split("  ").join(" ");
			_s = _s.split("  ").join(" ");
		return _s;
	}
	
	return { 
		init:init,
		setNode:setNode
	}
})();
