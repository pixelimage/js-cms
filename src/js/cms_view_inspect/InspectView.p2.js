
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//#要素選択
	
	var currentNode;
	var replaceNode;
	var replacePropNode;
	var currentDiv;
	var currentNo;
	var param;
	var blockType;
		
	/* ---------- ---------- ---------- */
	//要素ダブルクリック時にコール
	
	function setData_DoubleClick(_type,_this,this_,_rep,_repProp){
		setData(_type,_this,this_,_rep,_repProp);
		dClick();
	}
	function dClick(){
		var t = blockType;
		if(t.indexOf("object.") == 0){ view.find("._cms_btn_edit").click();}
		if(t == "tag.heading")		{ view.find("._input-with-btns ._edit_single").eq(0).click();}
		if(t == "tag.p")			{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.html")			{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.js")			{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.markdown")		{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.code")			{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.note")			{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.place")		{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.blockquote")	{ view.find("._input-with-btns ._edit").eq(0).click();}
		if(t == "tag.btn")			{ view.find("._btn_TextAnchor").eq(0).click();}
		if(t == "tag.img")			{ 
			//シンプル or レイアウトモード
			var b = false;
			if(param.data){ b = param.data.isLayoutMode; }
			if(b){
				view.find("._cms_btn_edit").eq(0).click();
			} else{
				view.find("._in_data_img").eq(0).click();
			}
		}
	}
	
	function doCommand(_command,_extra){
		if(_command == "delete")		{ deleteData()};
		if(_command == "toggle")		{ toogleDivView()};
		if(_command == "openDetail")	{ dClick()};
		if(_command == "export")		{ window.sc.inspect_export(); }
		if(_command == "export_link")	{ CMS_U.openURL_blank(_extra); }
		if(_command == "embed")			{ window.sc.inspect_embed(); }
		if(_command == "embed_link")	{ CMS_U.openURL_blank(_extra); }
	}

	/* ---------- ---------- ---------- */
	//要素選択時にコール
	//InspectView.setData
	
	var pageParam;
	function setPageData(_pageParam){
		pageParam = _pageParam;
	}
	//InspectView.setData
	function setData(_type,_this,this_,_rep,_repProp){
		//同じノードの場合は、スルー
		if(currentNode){if(currentNode.get(0)==_this.get(0))return;}
		//
		prevClickNode 	= currentNode;
		currentNode  	= _this;
		currentDiv 	 	= this_;
		replaceNode  	= _rep;
		replacePropNode = _repProp;
		currentNo 		= Number($(_this).attr("data-no"));
		param 			= currentDiv.gridData.getRecordAt(currentNo);
		blockType  		= param.type;
		var _attr 		= param.attr;
		
		//ノードの順番情報をアップデート
		updateNodeNo();
		
		//現在の選択ノード保持用
		EditableView.PageViewState.setCurretSelect(currentNode);
		
		//ブロック位置により、ページスクロールを調整する;
		updateTagPreview();
		
		//ページプリセット用
		_select_select_target();

		//colsのlayout.divの場合は、layout.colDivに
		if(_type == "layout.colDiv") blockType = _type;
		
		var _has = PageElement_Util.hasInputType;
		var _FU 	= InspectView.FormU;
		var _FUIMG 	= InspectView.FormU_Img;
		
		//属性取得
		var style 	 = CMS_BlockAttrU.get_style(_attr);
		var css_	 = CMS_BlockAttrU.get_css(_attr);
		var id_	 	 = CMS_BlockAttrU.get_id(_attr);
		var attr_	 = CMS_BlockAttrU.get_attr(_attr);
		var preview  = CMS_BlockAttrU.get_preview(_attr);
		var extra 	 = defaultVal(param["extra"] , {} );

		/* ---------- ---------- ---------- */
		//タイトル設定

		v.title.html(PageElement_Util.getTypeName(blockType) /*+ ' <span class="_t0">ブロック</span>'*/);
		 
		/* ---------- ---------- ---------- */
		//入力の組み立て
			
		var nodes = (function(){ 
			var a = [];
			if(blockType == "tag.anchor")	{ a.push(_FU.getAnchor		(param)); }
			if(blockType == "tag.html")		{ a.push(_FU.getHtml		(param,preview)); }
			if(blockType == "tag.js")		{ a.push(_FU.getJS			(param)); }
			if(blockType == "tag.code")		{ a.push(_FU.getCode		(param)); }
			if(blockType == "tag.markdown")	{ a.push(_FU.getMarkdown	(param)); }
			if(blockType == "tag.margin")	{ a.push(_FU.getMargin		(param)); }
			if(blockType == "tag.note")		{ a.push(_FU.getNote		(param)); }
			if(blockType == "tag.place")	{ a.push(_FU.getPlace		(param,extra)); }
			if(blockType == "tag.btn")		{ a.push(_FU.getBtn			(param)); }
			if(blockType == "tag.img")		{ a.push(_FUIMG.getIMG		(param,extra,"IMG")); }
			if(blockType == "layout.div")	{ a.push(_FUIMG.getBGIMG	(param,extra)); }
			if(blockType == "layout.cols")	{ a.push(_FU.getLayoutCol	()); }
			if(blockType == "replace.div")	{ a.push(_FU.getReplaceDiv	(param)); }
			if(_has(blockType,"CAPTION")) 	{ a.push(_FU.getCaptionTag	(param,extra)); }
			if(_has(blockType,"TEXTAREA")) 	{ a.push(_FU.getTextarea	(param)); }
			if(_has(blockType,"TREE")) 		{ a.push(_FU.getTree		(param)); }
			// if(_has(blockType,"IMGMAP")) 	{ a.push(_FU.getImageMap	(param)); }
			if(_has(blockType,"DETAIL")) 	{ a.push(_FU.getDetail		(blockType,currentDiv)); }
			if(_has(blockType,"RELOAD")) 	{ a.push(_FU.getReload		(blockType,currentDiv)); }
			if(_has(blockType,"HEADLINE")) 	{ a.push(_FU.getHeadlineTag	(param)); }
			if(blockType == "object.images"){ a.push(_FUIMG.getImages	(param,extra )); }
			a.push(_FU.getGuide(blockType));
			return a;
		})();
		v.body_data.empty();
		for (var i = 0; i <  nodes.length ; i++) {
			v.body_data.append(nodes[i]);
		}
		
		//CSS
		var nodes = (function(){ 
			//tag.headingの場合は、現在のh1,h2,,,を取得
			var _extra = (function(_type,_param){ 
				var s = "";
				if(_type == "tag.heading" && _param["data"]){
					if(_param.data["heading"]) s = _param.data["heading"];
				}
				return s;
			})(blockType,param);
			//
			var a = [];
			if(_has(blockType,"CLASS")) 		a.push( _FU.getDesignTag(css_,blockType,_extra));
			if(_has(blockType,"CSS")) 			a.push( _FU.getStyleTag( style ));
			a.push(_FU.getDesginGuide());
			
			return a;
		})();
		v.body_css.empty();
		for (var i = 0; i <  nodes.length ; i++) {
			v.body_css.append(nodes[i]);
		}
		
		//表示・非表示
		InspectView.View.setData( blockType,
			CMS_BlockAttrU.get_narrow(_attr),
			CMS_BlockAttrU.get_hide(_attr),
			CMS_BlockAttrU.get_hidePC(_attr),
			CMS_BlockAttrU.get_hideMO(_attr)
		);
	
		//ID
		InspectView.ID.setData( blockType, id_ );
		InspectView.ATTR.setData( blockType, attr_ );
		
		//書き出し
		InspectView.Export.setData( blockType,
			CMS_BlockAttrU.get_pubFileName(_attr),
			param
		);
		
		//埋め込み
		InspectView.Embed.setData( blockType,
			CMS_BlockAttrU.get_embedName(_attr), 
			CMS_BlockAttrU.get_embedID(_attr), 
			param
		);
		
		/* ---------- ---------- ---------- */
		
		setSelected();
		updateBodyH();
	}
	
