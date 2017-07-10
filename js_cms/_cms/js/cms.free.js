/*
	オリジナルブロックの定義 
	
	オリジナルブロックの定義をする場合は、このファイルに記述してください。
*/


/* ! ---------- ---------- ---------- ---------- ---------- */

var __f = {}
	__f.getImage = CMS_ImgBlockU.getSimpleImageTag;
	__f.hasLink = CMS_TagU.hasLink;
	__f.getLink = CMS_TagU.getLinkTag;
	__f.getTagText = CMS_TagU.t_2_tag;
	__f.getBtn = CMS_AnchorU.getAnchorTag;
	__f.def = defaultVal;


/* ! ---------- ---------- ---------- ---------- ---------- */

PageElement.object.inputSampleBlock = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	//ブロック定義
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.inputSampleBlock", 
		custom	: true,
		name	: "入力タイプ一覧サンプル",
		name2	: "入力タイプの一覧を確認できます。カスタマイズの際に利用してください",
		inputs	: ["CLASS","CSS","DETAIL"]
	});

	/* ---------- ---------- ---------- */
	//入力の設定
	
	var defImage = { mode:"simple" , path: "width:150,height:100", width: "", ratio: "" }
		
	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "設定",
				note 	: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
			}),
			textData:{
				info: new PageModel.OG_SubInfo({
					name: "設定",
					note: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "text_single",
						name: "テキスト(single)",
						type: CELL_TYPE.SINGLE,
						style: "width:400px;",
						note: "テキスト入力（1行タイプ）をおこなえます。",
						def: ""
					}),
					new PageModel.OG_Cell({
						id: "text_multi",
						name: "テキスト(multi)",
						type: CELL_TYPE.MULTI,
						style: "width:400px;height:100px;",
						note: "テキスト入力（複数行タイプ）をおこなえます。",
						def: ""
					}),
					new PageModel.OG_Cell({
						id: "select",
						name: "選択YN",
						type: CELL_TYPE.SELECT,
						vals: [
							["1","YES"],
							["0","NO"]
						],
						note: "セレクト入力をおこなえます。",
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "checkbox",
						name: "チェック",
						type: CELL_TYPE.CHECK,
						note: "チェックボックス入力をおこなえます。",
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "image",
						name: "イメージ",
						type: CELL_TYPE.IMAGE,
						style: "width:100px;",
						note: "イメージ選択をおこなえます。",
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						note: "リンク先設定をおこなえます。",
						def: CMS_AnchorU.getInitDataS()
					}),
					new PageModel.OG_Cell({
						id: "btn",
						name: "ボタン",
						type: CELL_TYPE.BTN,
						note: "ボタン設定をおこなえます。",
						def: CMS_AnchorU.getInitDataS()
					})
				]
			},
			gridData:null
		}),
		/* ---------- ---------- ---------- */
		
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト",
				note 	: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
			}),
			textData:null,
			gridData:{
				info: new PageModel.OG_SubInfo({
					name: "リスト",
					note: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "text_single",
						name: "テキスト(シングル)",
						type: CELL_TYPE.SINGLE,
						style: SS.w100,
						def: "テキスト"
					}),
					new PageModel.OG_Cell({
						id: "text_multi",
						name: "テキスト(複数行)",
						type: CELL_TYPE.MULTI,
						style: "",
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "select",
						name: "選択YN",
						type: CELL_TYPE.SELECT,
						vals: [
							["1","YES"],
							["0","NO"]
						],
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "checkbox",
						name: "チェック",
						type: CELL_TYPE.CHECK,
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "image",
						name: "イメージ",
						type: CELL_TYPE.IMAGE,
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						style: SS.w300,
						def: CMS_AnchorU.getInitDataS()
					}),
					new PageModel.OG_Cell({
						id: "btn",
						name: "ボタン",
						type: CELL_TYPE.BTN,
						style: SS.w300,
						def: CMS_AnchorU.getInitDataS()
					})
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	
	/* ---------- ---------- ---------- */
	//初期データ
	
	_.getInitData = function(){
		var o = {}; 
			o.type = _.pageInfo.id;
			o.data = _.getDefData(3);
			o.attr = {};
			
		return o;
	}
	
	/* ---------- ---------- ---------- */
	//プレビュー用のタグを返す (管理画面での表示)
	
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var tag = "";
			attr = attr.split('class="').join('class="inputSampleBlock ');
			tag += '<div '+attr+'>\n';
			tag += '<h2 class="cms-h default ">入力タイプ一覧サンプル</h2>\n';
		{
			var seti = data.setting.texts;
			tag += '<h3 class="cms-h default ">■設定</h3>\n';
			tag += '<table class="cms-table default narrow">\n';
			tag += '	<tr><th>テキスト(single)</th><td>' + __f.getTagText(seti.text_single) + '</td></tr>\n';
			tag += '	<tr><th>テキスト(multi)</th><td>' + __f.getTagText(seti.text_multi) + '</td></tr>\n';
			tag += '	<tr><th>選択YN</th><td>' + __f.def(seti.select,"") + '</td></tr>\n';
			tag += '	<tr><th>チェック</th><td>' + __f.def(seti.checkbox,"") + '</td></tr>\n';
			tag += '	<tr><th>イメージ</th><td><div style="width:200px;">\n';
			if(_isPub) {
				tag += __f.getImage({image:seti.image,isPub:_isPub});
			} else{
				tag += __f.getImage({image:seti.image,isPub:_isPub,width:"100px"});
			}
			tag += '	</div></td></tr>\n';
			tag += '	<tr><th>リンク</th><td>\n';
			if(__f.hasLink(seti.anchor)){
				tag += '<a '+__f.getLink(seti.anchor)+'>リンク</a>';
			}
			tag += '	</td></tr>\n';
			tag += '	<tr><th>ボタン</th><td>' + __f.getBtn(seti.btn) + '</td></tr>\n';
			tag += '</table>\n';
		}
		{
			var list = CMS_U.getPublicList(data.list.grid);
			tag += '<h3 class="cms-h default ">■リスト</h3>\n';
			tag += '<table class="cms-table default narrow">\n';
			tag += '	<tr>\n';
			tag += '	<th>no</th>\n';
			tag += '		<th>テキスト(single)</th>\n';
			tag += '		<th>テキスト(multi)</th>\n';
			tag += '		<th>選択YN</th>\n';
			tag += '		<th>チェック</th>\n';
			tag += '		<th>イメージ</th>\n';
			tag += '		<th>リンク</th>\n';
			tag += '		<th>ボタン</th>\n';
			tag += '	</tr>\n';
			for (var i = 0; i < list.length ; i++) {
				var row = list[i];
				tag += '	<tr>\n';
				tag += '		<th>' + (i+1) + '</th>\n';
				tag += '		<td>' + __f.getTagText(row.text_single) + '</td>\n';
				tag += '		<td>' + __f.getTagText(row.text_multi) + '</td>\n';
				tag += '		<td>' + __f.def(row.select,"") + '</td>\n';
				tag += '		<td>' + __f.def(row.checkbox,"") + '</td>\n';
				tag += '		<td style="width:50px;">\n';
				if(_isPub){
					tag += 	__f.getImage({image:row.image,isPub:_isPub});
				} else{
					tag += 	__f.getImage({image:row.image,isPub:_isPub,width:"100px"});
				}
				tag += '\n		</td>\n';
				tag += '		<td>\n';
				if(__f.hasLink(row.anchor)){
					tag += '<a '+__f.getLink(row.anchor)+'>リンク</a>\n';
				}
				tag += '		</td>\n';
				tag += '		<td>' + __f.getBtn(row.btn) + '</td>\n';
				tag += '	</tr>\n';
			}
			tag += '</table>\n';
		}
			tag += '</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	//公開HTML用のタグを返す
	
	_.getHTML = function(_o){
		return this.getPreview(_o,true);
	}

	/* ---------- ---------- ---------- */

    return _;
})();


/* ! ---------- ---------- ---------- ---------- ---------- */

PageElement.object.sampleTable = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	//ブロック定義
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.sampleTable", 
		custom	: true,
		name	: "サンプル表組み",
		name2	: "サンプル表組みです。カスタマイズのベースとして利用してください。",
		inputs	: ["CLASS","CSS","DETAIL"]
	});

	/* ---------- ---------- ---------- */
	//入力の設定
	
	var defImage = { mode:"simple" , path: "width:150,height:100", width: "", ratio: "" }
		
	_.grids = [
		/* ---------- ---------- ---------- */
		
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト",
				note 	: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
			}),
			textData:null,
			gridData:{
				info: new PageModel.OG_SubInfo({
					name: "リスト",
					note: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "t1",
						name: "テキスト1",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "t2",
						name: "テキスト2",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "t3",
						name: "テキスト3",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "t4",
						name: "テキスト4",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。"
					})
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	
	/* ---------- ---------- ---------- */
	//初期データ
	
	_.getInitData = function(){
		var o = {};
			o.type = _.pageInfo.id;
			o.data = _.getDefData(3);
			o.attr = {};
		return o;
	}
	
	/* ---------- ---------- ---------- */
	//プレビュー用のタグを返す (管理画面での表示)
	
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var tag = "";
			attr = attr.split('class="').join('class="sampleTable ');
			tag += '<div '+attr+'>\n';
			tag += '<h2 class="cms-h default ">表組みサンプル</h2>';
		
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0){
				tag += '<span class="_no-input-data">データリストを入力...</span>'
		} else{
			tag += '<table class="cms-table default narrow">\n';
			for (var i = 0; i < list.length ; i++) {
				var row = list[i];
				tag += '<tr>\n';
				tag += '<th>' + (i+1) + '</th>\n';
				tag += '<td>' + __f.getTagText(row.t1) + '</td>\n';
				tag += '<td>' + __f.getTagText(row.t2) + '</td>\n';
				tag += '<td>' + __f.getTagText(row.t3) + '</td>\n';
				tag += '<td>' + __f.getTagText(row.t4) + '</td>\n';
				tag += '</tr>\n';
			}
			tag += '</table>\n';
		}
			tag += '</div>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	//公開HTML用のタグを返す
	
	_.getHTML = function(_o){
		return this.getPreview(_o,true);
	}

	/* ---------- ---------- ---------- */

    return _;
})();


/* ! ---------- ---------- ---------- ---------- ---------- */

