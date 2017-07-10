
PageElement.object.replaceTexts = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.replaceTexts", 
		name	: "Myタグ-リスト定義",
		name2	: "",
		guide	: "block/object.replaceTexts",
		inputs	: ["DETAIL"],
		cssDef	: {selector:""}
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:150,height:100", width: "", ratio: "" }

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
					id		: "texts",
					name	: "テキスト",
					note 	: ""
				}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name : "テキストMyタグ一覧", }),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "Myタグ名ID",
						type: CELL_TYPE.SINGLE,
						view: "",
						style: SS.repID,
						def: "id"
					}),
					new PageModel.OG_Cell({
						id: "val",
						name: "値(テキストやHTML)",
						type: CELL_TYPE.MULTI,
						view: "",
						def: "値"
					}),
					new PageModel.OG_Cell({
						id: "memo",
						name: "メモ",
						type: CELL_TYPE.MULTI,
						view: "",
						style: SS.memo,
						def: "メモ"
					})
				]
			}
		}),
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "images",
				name	: "",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"イメージMyタグ一覧" }),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "Myタグ名ID",
						type: CELL_TYPE.SINGLE,
						style: SS.repID,
						view: "",
						def: "img"
					}),
					new PageModel.OG_Cell({
						id: "val",
						name: "画像",
						type: CELL_TYPE.IMAGE,
						view: "",
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "isTag",
						name: "出力",
						type: CELL_TYPE.SELECT,
						view: "",
						vals: [
							["","タグを出力"],
							["path","画像パスのみ出力"]
						]
					}),
					new PageModel.OG_Cell({
						id: "memo",
						name: "メモ",
						type: CELL_TYPE.MULTI,
						view: "",
						style: SS.memo,
						def: "メモ"
					})
				]
			}
		}),
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "links",
				name	: "",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"リンクMyタグ一覧" }),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "Myタグ名ID",
						type: CELL_TYPE.SINGLE,
						style: SS.repID,
						view: "",
						def: "link"
					}),
					new PageModel.OG_Cell({
						id: "val",
						name: "値 (リンク)",
						type: CELL_TYPE.BTN,
						style: "",
						view: "",
						def: CMS_AnchorU.getInitDataS()
					}),
					new PageModel.OG_Cell({
						id: "isTag",
						name: "出力",
						type: CELL_TYPE.SELECT,
						view: "",
						vals: [
							["","ボタン一式を出力"],
							["path","リンクパスのみ出力"],
							["attr","href,target属性を書き出す"]
						]
					}),
					new PageModel.OG_Cell({
						id: "memo",
						name: "メモ",
						type: CELL_TYPE.MULTI,
						view: "",
						style: SS.memo,
						def: "メモ"
					})
				]
			}
		})
	]
	
	/* ---------- ---------- ---------- */
	
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		var def = {
			"texts": {
				"texts": {},
				"grid": [
					{
						"publicData": "1",
						"id": "HEAD_TITLE",
						"val": "株式会社サンプルサイト | {{PAGE_NAME}}",
						"_state": [
							"val",
							"memo"
						],
						"memo": "HTMLヘッダの＜TITLE＞タグで使用。{{PAGE_NAME}}部分は、ページタグです。各ページの名前に変更されます。"
					},
					{
						"publicData": "1",
						"id": "HEAD_KEYWORD",
						"val": "サンプルの文書ですので、ご注意ください",
						"_state": [],
						"memo": "HTMLヘッダの＜META＞タグのkeywordで使用。"
					},
					{
						"publicData": "1",
						"id": "HEAD_DESCRIPTION",
						"val": "サンプルの文書ですので、ご注意くださいサンプルの文書ですので、ご注意ください",
						"_state": [],
						"memo": "HTMLヘッダの＜META＞タグのdescriptionで使用。"
					}
				],
				"_state": {
					"currentRow": 0,
					"currentPage": 0,
					"fitWide": true,
					"hideCols": ""
				}
			}
		}
		o.data = def;
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		
		var hasData = false;
		if(data.texts){
			if(CMS_U.getPublicList(data.texts.grid).length){ hasData = true; }
		}
		if(data.images){
			if(CMS_U.getPublicList(data.images.grid).length){ hasData = true; }
		}
		if(data.links){
			if(CMS_U.getPublicList(data.images.links).length){ hasData = true; }
		}
		
		if(!hasData ){
			tag += '<span class="_no-input-data">データを入力...</span>'
		} else{
			attr = attr.split('class="').join('class=" ');
			tag += '<div class="_cms_replace_table">\n'	;		
			tag += '<table>\n';
			if(data.texts){
				var _ls = CMS_U.getPublicList(data.texts.grid);
				for (var i = 0; i < _ls.length ; i++) {
					tag+= '<tr>';
					tag+= '	<th><span class="_id">' + _ls[i].id + '</span></th>';
					tag+= '	<td>'+CMS_TagU.t_2_tag(_ls[i].val) ;
					tag+= '	<p class="_memo">' + CMS_TagU.t_2_tag(_ls[i].memo) + '</p>'
					tag+='	</td>';
					tag+= '</tr>';
				}
			}
			if(data.images){
				var _ls = CMS_U.getPublicList(data.images.grid);
				for (var i = 0; i < _ls.length ; i++) {
					tag+= '<tr>';
					tag+= '	<th><span class="_id">' + _ls[i].id + '</span></th>';
					var imgTag = "";
					if(_ls[i].isTag == "path"){
						if(_ls[i].val.mode == "simple"){
							imgTag = CMS_Path.MEDIA.getImagePath( _ls[i].val.path , _isPub );
						}
					} else {
						var img = _ls[i].val;
						imgTag = CMS_ImgBlockU.getImageTag({
							path	: img.path,
							isPub	: _isPub,
							width	: "50px",
							ratio	: img.ratio,
							alt		: "",
							attr	: ""
						});
					}
					tag+= '	<td>' + imgTag;
					tag+= '	<p class="_memo">' + CMS_TagU.t_2_tag(_ls[i].memo) + '</p>'
					tag+='	</td>';
					tag+= '</tr>';
				}
			}
			if(data.links){
				var _ls = CMS_U.getPublicList(data.links.grid);
				for (var i = 0; i < _ls.length ; i++) {
					tag+= '<tr>';
					tag+= '	<th><span class="_id">' + _ls[i].id + '</span></th>';
					var aTag = "";
					if(_ls[i].isTag == "path"){
						aTag = CMS_Path.MEDIA.getAnchorPath( _ls[i].val.href , _isPub );
					} else if(_ls[i].isTag == "attr"){
						aTag = CMS_Data.MyTagU.getAnchorAttr(_ls[i].val , _isPub)
					} else {
						aTag = CMS_AnchorU.getAnchorTag(_ls[i].val,"",true);
					}
					tag+= '	<td>' + aTag;
					tag+= '	<p class="_memo">' + CMS_TagU.t_2_tag(_ls[i].memo) + '</p>'
					tag+='	</td>';
					tag+= '</tr>';
				}
			}
			tag += '</table>\n'
			tag += '</div>\n'
		}
		return tag;
	}
	_.getHTML = function(_o){
		// var data  = _o.data;
		// var attr = _o.attrs;
		// var list = CMS_U.getPublicList(data.list.grid);
		// if(list.length == 0) return ""
		// return this.getPreview(_o,true);
		return "";
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

