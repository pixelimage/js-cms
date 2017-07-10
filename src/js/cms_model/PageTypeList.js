
var PageTypeList = {}

window.PageTypeList = PageTypeList;


//ナビゲーション編集の追加ナビ
PageTypeList.tree = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.btnList", 
		name	: "ボタンリスト",
		name2	: "＜UL＞＜LI＞＜A＞",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[ボタンリストブロック]"}
		cssDef	: {selector:".cms-btns"}
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "先頭に追加",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"" }),
				cells:[
					new PageModel.OG_Cell({
						id: "text",
						name: "ラベル名",
						type: CELL_TYPE.SINGLE,
						def: "ラベル名"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						def: CMS_AnchorU.getInitData()
					})
				]
			}
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list2",
				name	: "最後に追加",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"" }),
				cells:[
					new PageModel.OG_Cell({
						id: "text",
						name: "ラベル名",
						type: CELL_TYPE.SINGLE,
						def: "ラベル名"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						def: CMS_AnchorU.getInitData()
					})
				]
			}
		})
	]

    return _;
})();
