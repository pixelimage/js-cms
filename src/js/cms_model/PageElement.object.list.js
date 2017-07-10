
PageElement.object.list = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.list", 
			name	: "リスト",
			name2	: "＜UL＞＜LI＞",
		inputs	: ["CLASS","CSS","DETAIL","CAPTION"],
		// cssDef	: {file:"block",key:"[リストブロック]"}
		cssDef	: {selector:".cms-ul"}
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
						id: "t1",
						name: "テキスト",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "追加リンク",
						type: CELL_TYPE.BTN,
						def: CMS_AnchorU.getInitData()
					})
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		
		var def = {
			list: {
				texts: {},
				grid: [
					{
						publicData: "1",
						t1: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					 	anchor: CMS_AnchorU.getInitData_Blank()
					},
					{
						publicData: "1",
						t1: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor: CMS_AnchorU.getInitData_Blank()
					},
					{
						publicData: "1",
						t1: "ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor: CMS_AnchorU.getInitData_Blank()
					}
				]
			}
		}
		o.data = def;
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		var tag = "";
		attr = attr.split('class="').join('class="cms-ul clearfix ');
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0){
			tag += '<span class="_no-input-data">リストデータを入力...</span>'
		} else{
			tag += '<div ' + attr + '>\n';
			tag += PageElement_Util.getCaption(extra);
			tag += '<ul>\n';
			for (var i = 0; i < list.length ; i++) {
				var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",false);
				if(aTag)aTag = "<br>"+aTag;
				tag += '	<li>'+CMS_TagU.t_2_tag(list[i].t1)+aTag+'</li>\n';
			}
			tag += '</ul>\n';
			tag += '</div>\n';
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		attr = attr.split('class="').join('class="cms-ul clearfix ');
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) return "";
		
		var tag = "";
			tag += '<div ' + attr + '>\n';
			tag += PageElement_Util.getCaption(extra);
			tag += '<ul>\n';
			for (var i = 0; i < list.length ; i++) {
				var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",true);
				if(aTag)aTag = "<br>"+aTag;
				tag += '	<li>'+CMS_TagU.t_2_tag(list[i].t1)+aTag+'</li>\n';
			}
			tag += '</ul>\n';
			tag += '</div>\n';
		return tag;
	}

	/* ---------- ---------- ---------- */

    return _;
})();
