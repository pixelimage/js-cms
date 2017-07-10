window.FREEPAGE_DEF_DATA = [
	
	{
		"type": "tag.heading",
		"data": {
			"heading": "h1",
			"main": {
				"text": "{{PAGE_NAME}}",
				"link": null
			},
			"right": {
				"text": "",
				"link": null
			}
		},
		"attr": {
			"css": "default",
			"narrow": "",
			"class": "default",
			"hide": ""
		}
	},
	{
		"type": "tag.markdown",
		"data": "##大見出し\n文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。\n\n###中見出し\n文書が入ります。文書が入ります。文書が入ります。文書が入ります。\n\n####小見出し\n文書が入ります。文書が入ります。文書が入ります。\n\n * 項目1\n * 項目2\n * 項目3\n",
		"attr": {
			"preview": "",
			"narrow": "",
			"class": "default",
			"hide": "",
			"css": "default "
		}
	}
]
PageTypeList.page = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */

    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "free", 
		name	: "自由入力ページ", 
	});
	
	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.FREE,
			gridInfo:new PageModel.OG_info({ 
				id		: "free", 
				name	: "自由入力エリア", 
				def		:  [{
				  "type": "layout.div",
				  "attr": {},
				  "data": FREEPAGE_DEF_DATA
				}]
				
			})
		})
		/* ---------- ---------- ---------- */
	]
    
	/* ---------- ---------- ---------- */

    return _;
})();
