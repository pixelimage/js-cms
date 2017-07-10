
PageElement.object.dl = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.dl", 
			name	: "Q&Aリスト",
			name2	: "",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[Q&Aリストブロック]"}
		cssDef	: {selector:".cms-qa"}
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "設定",
				note 	: ""
			}),
			textData:{
				info:new PageModel.OG_SubInfo({ 
					name:"", 
					note:"",
					image	: '<div class="ss_guide _qa"></div>'
					}),
				cells:[
				new PageModel.OG_Cell({
					id:"accordion",	
					name:"アコーディオンにするか？",
					type:CELL_TYPE.SELECT , 
					vals:SS.SelectVals.YN,
					view:"",
					def:"0",
					note:"開閉メニュースタイルにすることができます"
				}),
				]
			},
			gridData:null
		}),
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "t1",
						name: "質問",
						type: CELL_TYPE.MULTI,
						def: "Q.サンプルの文書です？"
					}),
					new PageModel.OG_Cell({
						id: "t2",
						name: "解答",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "追加リンク",
						type: CELL_TYPE.BTN,
						def: CMS_AnchorU.getInitDataS()
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
			setting: {
				texts: {
					accordion: "0"
				},
				grid: []
			},
			list: {
				texts: {},
				grid: [
					{
						publicData: "1",
						t1: "Q.サンプルの文書です？",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					 	anchor: { "href": "#", "target": "_blank", "text": "さらに詳しく <i class='fa fa-arrow-right'></i>", "class_": "cms-btn-text-box  cms-btn-size-m", "image": "" }
					},
					{
						publicData: "1",
						t1: "Q.サンプルの文書ですので、ご注意ください。？",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor: CMS_AnchorU.getInitData_Blank()
					},
					{
						publicData: "1",
						t1: "Q.サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。？",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitData_Blank()
					},
					{
						publicData: "1",
						t1: "Q.サンプルの文書ですので、ご注意ください。？",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitData_Blank()
					}
				]
			}
		}
		o.data = def;
		o.attr = {css:"default",style:""};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
		attr = attr.split('class="').join('class="cms-qa ');
			var list = CMS_U.getPublicList(data.list.grid);
		
		if(list.length == 0){
			tag += '<span class="_no-input-data">Q&Aデータを入力...</span>'
		} else {
			tag += '<dl '+attr+'>\n';
			for (var i = 0; i < list.length ; i++) {
				var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",false);
				if(aTag)aTag = "<br>"+aTag;
				tag += '	<dt>'+CMS_TagU.t_2_tag(list[i].t1)+'</dt>\n';
				tag += '	<dd>'+CMS_TagU.t_2_tag(list[i].t2)+aTag+'</dd>\n';
			}
			tag += '</dl>\n';
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		attr = attr.split('class="').join('class="cms-qa ');
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) return "";
		
		if(data.setting.texts.accordion == "1"){
			attr = attr.split('class="').join('class="cms-accordion ');
		}
		{
			tag += '<dl '+attr+'>\n';
			for (var i = 0; i < list.length ; i++) {
				var aTag = CMS_AnchorU.getAnchorTag(list[i].anchor,"",true);
				if(aTag)aTag = "<br>"+aTag;
				tag += '	<dt>'+CMS_TagU.t_2_tag(list[i].t1)+'</dt>\n';
				tag += '	<dd>'+CMS_TagU.t_2_tag(list[i].t2)+aTag+'</dd>\n';
			}
			tag += '</dl>\n';
			tag += '<script>\n'
			tag += '$(function(){\n';
			tag += '	$(".cms-accordion dt").cms_accordion();\n';
			tag += '});\n';
			tag += '</script>\n';
		}
		return tag;
	}

	/* ---------- ---------- ---------- */

    return _;
})();
