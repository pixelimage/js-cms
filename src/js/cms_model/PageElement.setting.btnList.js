
PageElement.setting.btnList = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "setting.btnList", 
			name	: "ボタンリスト",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"" }),
				cells:[
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.BTN,
						style: SS.w300,
						view: "",
						def:CMS_AnchorU.getInitData()
					}),
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	
	_.getInitData = function(){
		var o = {};
			o.type = _.pageInfo.id;
			var def =  {
				list: {
					texts: {},
					grid: [
						{
							publicData: "1",
							anchor: {
								href: "index.html",
								target: "",
								text: "リンク",
								class_: "btn_lightglay btn_size_M",
								image: ""
							}
						},
						{
							publicData: "1",
							anchor: {
								href: "index.html",
								target: "",
								text: "リンク",
								class_: "btn_lightglay btn_size_M",
								image: ""
							}
						},
						{
							publicData: "1",
							anchor: {
								href: "index.html",
								target: "",
								text: "リンク",
								class_: "btn_lightglay btn_size_M",
								image: ""
							}
						}
					]
				}
			}
			o.data = def
			o.attr = {};
		return o;
	}
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var id = _o.id
		var jquery = _o.jquery;
		var list = CMS_U.getPublicList(data.list.grid);
		var tag = "";
		if(list.length == 0) {
			tag += '<span class="_no-input-data">リストデータを入力...</span>'
		} else{
			var ss =  '';
				ss += '	<ul>\n'
					for (var i = 0; i < list.length ; i++) {
						var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",false)
						ss += '	<li>'
						ss += aTag ;
						ss += '</li>\n'
					}
				ss += '	</ul>\n'
			// var ss_s = CMS_TagU.tag_2_t(ss).split("\n").join("<br>");
			// 	ss_s += CMS_TagU.tag_2_t(JSON.stringify(_o.data.list.grid, null, "　　")).split("\n").join("<br>");
			tag += PageElement.settingU.getTag(id,jquery,data,ss);
		}
		return tag;
	}
	
	_.getHTML = function(_o){
		return "";
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
