
PageElement.object.btnList = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.btnList", 
		name	: "ボタンリスト",
		name2	: "＜UL＞＜LI＞＜A＞",
		inputs	: ["CLASS","CSS","DETAIL","CAPTION"],
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
						def: CMS_AnchorU.getInitData()
					}),
					new PageModel.OG_Cell({
						id: "t1",
						name: "テキスト",
						type: CELL_TYPE.MULTI,
						def: "キャプションがはいります"
					})
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	
	_.getInitData = function(){
		var o = {};
			o.type = _.pageInfo.id;
		var def ={
			list: {
				texts: {},
				grid: [
					{
						publicData: "1",
						anchor: { href: "http://www.google.com", target: "", text: "{{(-)}} リンクボタン", class_: "", image: "" },
						t1: "キャプションがはいります"
					},
					{
						publicData: "1",
						anchor: { href: "http://www.google.com", target: "", text: "{{(-)}} リンクボタン", class_: "", image: "" },
						t1: "キャプションがはいります"
					},
					{
						publicData: "1",
						anchor: { href: "http://www.google.com", target: "", text: "{{(-)}} リンクボタン", class_: "", image: "" },
						t1: "キャプションがはいります"
					},
					{
						publicData: "1",
						anchor: { href: "http://www.google.com", target: "", text: "{{(-)}} リンクボタン", class_: "", image: "" },
						t1: "キャプションがはいります"
					},
					{
						publicData: "1",
						anchor: { href: "http://www.google.com", target: "", text: "{{(-)}} リンクボタン", class_: "", image: "" },
						t1: "キャプションがはいります"
					}
				]
			}
		}
			o.data = def
			o.attr = {css:"default",style:""};
			o.attr.class = o.attr.css;
		return o;
	}
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		var tag = "";
		attr = attr.split('class="').join('class="cms-btns clearfix ');
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) {
			tag += '<span class="_no-input-data">リストデータを入力...</span>'
		} else{
			var style = ""
			tag += '<div ' + attr + '>\n';
			tag += PageElement_Util.getCaption(extra);
			tag += '<ul>\n'
			for (var i = 0; i < list.length ; i++) {
				var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",false)
				tag += '	<li>'
				tag += aTag ;
				if(list[i].t1){
					tag += '<span class="btn-caption">' + list[i].t1 + '</span>';
				}
				tag += '</li>\n'
			}
			tag += '</ul>\n'
			tag += '</div>\n'
		}
		return tag;
	}
	
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		var tag = ""
		attr = attr.split('class="').join('class="cms-btns clearfix ')
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) return;
		
		{
			var style = ""
			tag += '<div ' + attr + '>\n';
			tag += PageElement_Util.getCaption(extra);
			tag += '<ul>\n'
			for (var i = 0; i < list.length ; i++) {
				var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",true)
				tag += '	<li>'
				tag += aTag ;
				if(list[i].t1){
					tag += '<span class="btn-caption">' + list[i].t1 + '</span>';
				}
				tag += '</li>\n'
			}
			tag += '</ul>\n'
			tag += '</div>\n'
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
