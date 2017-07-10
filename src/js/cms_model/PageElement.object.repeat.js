
PageElement.object.repeat = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.repeat", 
			name	: "カスタムリスト",
		name2	: "",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:200,height:133", width: "100%", ratio: "3:2" }
	
	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リストデータ",
				style	: "",
				// note 	: "・セルID<b>{1}〜{10}</b>までのデータは、テンプレートデータ内の<b>{1}〜{10}</b>と記述されている個所に置き換えられます。<br>・リストデータを更新した場合は、右上の更新ボタンで、プレビューを更新できます。<br>・リンクを設定する場合は、リンク{LINK}に入力することで、要素全体にリンク設定を行えます。(公開サイト表示時に、{LINK}と入ってる個所をリンク設定に置き換えます。)"
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "image",
						name: "{IMG}",
						type: CELL_TYPE.IMAGE,
						style: SS.img50p,
						view: "",
						def: defImage
					}),
					new PageModel.OG_Cell({id:"a1",	name:"{1}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a2",	name:"{2}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a3",	name:"{3}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a4",	name:"{4}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a5",	name:"{5}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a6",	name:"{6}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a7",	name:"{7}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a8",	name:"{8}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a9",	name:"{9}",	type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({id:"a10",name:"{10}",type:CELL_TYPE.MULTI }),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "{LINK}<br>{LINK.href}<br>{LINK.target}",
						type: CELL_TYPE.ANCHOR
					})
				]
			}
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.TEMPLATE,
			gridInfo:new PageModel.OG_info({ 
				id		: "template",
				name	: "",
				note 	: ""
			}),
			textData:null,
			gridData:null
		})
		/* ---------- ---------- ---------- */
	]
	_.getInitData = function(){
		
		var _data = {
			template: ["myID","","",{}],
			list: {
				texts: {},
				grid: []
			}
		}
		var o = {};
		o.type = _.pageInfo.id;
		o.data = _data
		o.attr = {};
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var tag = "";
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0){
			tag += '<span class="_no-input-data">表データを入力...</span>'
		} else {
			var leng = PageElement_Util.getOmitLeng(list.length,"custom");
				
			tag += '<div>\n'
			tag += '<div '+ attr +'>\n'
			tag += CMS_TemplateU.doTemplate( {
				id : data.template[0],
				htmls : data.template[1],
				css : data.template[2],
				//
				isPub : false,
				list : list,
				leng : list.length,
				isEdit : false
			});
			tag += '</div>\n';
			tag += PageElement_Util.getOmitPreviewTag(list.length,"custom")
			tag += '</div>\n'
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var tag = "";
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) return "";
		
		var hasAttr = PageElement_Util.hasAttr(attr);
		if(hasAttr)	tag += '<div ' + attr + '>\n';
		
		tag += CMS_TemplateU.doTemplate( {
			id : data.template[0],
			htmls : data.template[1],
			css : data.template[2],
			//
			isPub : true,
			list : list,
			leng : list.length,
			isEdit : false
		});
		if(hasAttr)	tag += '</div>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
