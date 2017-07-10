
PageElement.object.slides = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.slides", 
			name	: "スライド(カスタム)",
		name2	: "",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:800,height:400", width: "", ratio: "2:1" }
		
	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "スライドショー設定",
				note 	: "bxSlider（http://bxslider.com/）を利用したスライドショーを作成することができます。直接、HTMLやJSなどを記述することにより、bxSliderの機能を制限なく利用できます。<br>"
			}),
			textData:{
				info:new PageModel.OG_SubInfo({ name:"カスタマイズ", note:"" }),
				cells:[
					new PageModel.OG_Cell({
						id: "js",
						name: "JavaScript",
						type: CELL_TYPE.MULTI_JS,
						style: SS.w800h100
					}),
					new PageModel.OG_Cell({
						id: "css",
						name: "css",
						type: CELL_TYPE.MULTI_STYLE,
						style: SS.w800h100
					}),
					new PageModel.OG_Cell({
						id: "html",
						name: "HTML",
						type: CELL_TYPE.MULTI_HTML,
						style: SS.w800h100
					})
				]
			},
			gridData:null
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "photos",
				name	: "スライド一覧",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"スライド一覧",note:"スライドのデータを登録します。入力した値は、上のカスタマイズテンプレート組み合わさって、HTMLとして出力されます。" }),
				cells:[
					new PageModel.OG_Cell({
						id: "image",
						name: "写真{IMG}",
						type: CELL_TYPE.IMAGE,
						def: defImage
					}),
					new PageModel.OG_Cell({id:"a1", name:"{1}",	type:CELL_TYPE.MULTI , def:"サンプルの文書" }),
					new PageModel.OG_Cell({id:"a2", name:"{2}",	type:CELL_TYPE.MULTI , def:"サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。" }),
					new PageModel.OG_Cell({id:"a3", name:"{3}",	type:CELL_TYPE.MULTI , def:"サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。" }),
					new PageModel.OG_Cell({id:"a4", name:"{4}",	type:CELL_TYPE.MULTI , def:"" }),
					new PageModel.OG_Cell({id:"a5", name:"{5}",	type:CELL_TYPE.MULTI , def:"" }),
					new PageModel.OG_Cell({id:"a6", name:"{6}",	type:CELL_TYPE.MULTI , def:"" }),
					new PageModel.OG_Cell({id:"a7", name:"{7}",	type:CELL_TYPE.MULTI , def:"" }),
					new PageModel.OG_Cell({id:"a8", name:"{8}",	type:CELL_TYPE.MULTI , def:"" }),
					new PageModel.OG_Cell({id:"a9", name:"{9}",	type:CELL_TYPE.MULTI , def:"" }),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						style: SS.w300,
						def: CMS_AnchorU.getInitDataS()
					}),
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		
		var _o = {}
			_o.setting = {}
			_o.setting.texts = {}
			_o.setting.texts.html = (function(){ 
				var s = ""
					s += '<div id="SlideA">\n'
					s += '<ul class="cms-slider-custom">\n'
					s += '{REPEAT_START}\n'
					s += '	<li>\n'
					s += '		<p class="img">{IMG}</p>\n'
					s += '		<p class="t1">{1}</p>\n'
					s += '		<p class="t2">{2}</p>\n'
					s += '		<p class="t3">{3}</p>\n'
					s += '	</li>\n'
					s += '{REPEAT_END}\n'
					s += '</ul>\n'
					s += '</div>\n'
					return s;
			})();
			_o.setting.texts.js = (function(){ 
				var s = ""
					s += '$(function(){\n'
					s += '	$(\'#SlideA> .cms-slider-custom\').bxSlider({\n'
					s += '		auto:false,\n'
					s += '		pause:4000\n'
					s += '	});\n'
					s += '});'
				return s;
			})();
			_o.setting.texts.css = (function(){ 
				var s = ""
					s += '#SlideA {padding:10px;background:#fff;border:2px solid #eee;}\n'
					s += '#SlideA img{width:100%;}\n'
					s += '#SlideA .t1{font-size:18px;border-bottom:2px solid #999;margin:10px 0 5px 0; padding:5px 0;}\n'
					s += '#SlideA .t2{font-size:14px;line-height:1.6;}\n'
					s += '#SlideA .t3{font-size:12px;line-height:1.2;color:#888;}'
				return s;
			})();
			_o.photos = {}
			
			_o.photos.grid= [
				{
					publicData: "1",
					image: { mode:"simple" , path: "width:800,height:400,color:#0fc", width: "", ratio: "2:1" },
					a1: "サンプルの文書",
					a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					anchor:CMS_AnchorU.getInitDataS()
				},
				{
					publicData: "1",
					image: { mode:"simple" , path: "width:800,height:400,color:#ccf", width: "", ratio: "2:1" },
					a1: "白い花びら",
					a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					anchor:CMS_AnchorU.getInitDataS()
				},
				{
					publicData: "1",
					image: { mode:"simple" , path: "width:800,height:400,color:#fc0", width: "", ratio: "2:1" },
					a1: "夕焼けに染まる空",
					a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					anchor:CMS_AnchorU.getInitDataS()
				}
			]
		o.data = _o;
		o.attr = {};
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		var list = CMS_U.getPublicList(data.photos.grid);
		
		if(data == undefined || list.length == 0 ){
			tag += '<span class="_no-input-data">データを入力...</span>'
		} else{			
			// function _temp (_t,_s,_v){
			// 	if(_v != "")_t = _t.split(_s).join(_v);
			// 	return _t;
			// }
			attr = attr.split('class="').join('class="_cms_preview_subblock ')
			tag += '<div class="_cms_preview">\n'
			tag += '<div class="_title">ガジェット / スライド(カスタム)</div>\n';
			tag += "公開ページで確認してください<br> \n"
			tag += '	<table class="_simpleTable">\n'
			tag += '	<tr>\n'
			tag += '		<th>番号</th>\n'
			tag += '		<th>{IMG}</th>\n'
			tag += '		<th>{1}</th>\n'
			tag += '		<th>{2}</th>\n'
			tag += '	</tr>\n'
			for (var i = 0; i < list.length ; i++) {
				tag += '	<tr>\n'
				tag += '	<th>'+(i+1)+'</th>\n'
				tag += '	<td>\n'
				var img =  list[i].image;
				tag += CMS_ImgBlockU.getImageTag({
					path: img.path,
					isPub: false,
					width: "100px",
					ratio: img.ratio,
					alt: "",
					attr: ""
				});
				tag += '	</td>\n'
				if(isFilledText(list[i].a1)) {
					tag += '<td>'+list[i].a1+'</td>\n';
				} else{
					tag += '<td><br></td>\n';
				}
				if(isFilledText(list[i].a2)) {
					tag += '<td>'+list[i].a2+'</td>\n';
				} else{
					tag += '<td><br></td>\n';
				}
				tag += '	</tr>\n'
			}
			tag += '	</table>\n'
			tag += '<div class="_notes">※ このブロックでは、個々の画像に横幅を設定しても、すべて100％と設定されます。</div>';
			tag += '</div>\n';
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		var setting = data.setting.texts;
		var list = CMS_U.getPublicList(data.photos.grid);
		if(list.length == 0) return "";
		
			var htmls = CMS_TemplateU.getTemplateHTML(setting.html);
			tag += htmls[0];			
			function _temp (_t,_s,_v){
				if(_v != "")_t = _t.split(_s).join(_v);
				return _t;
			}
			for (var i = 0; i < list.length ; i++) {
				var temp = htmls[1];
				var img =  list[i].image;
				var imgTag = CMS_ImgBlockU.getImageTag({
					path	: img.path,
					isPub	: true,
					width	: "100%",
					ratio	: img.ratio,
					alt		: "",
					attr	: ""
				});
				if(CMS_TagU.hasLink(list[i].anchor)){
					imgTag = '<a '+CMS_TagU.getLinkTag(list[i].anchor)+'>' + imgTag + '</a>';
				}
				temp = _temp(temp,"{IMG}",imgTag);
				temp = _temp(temp,"{1}",CMS_TagU.t_2_tag(list[i].a1));
				temp = _temp(temp,"{2}",CMS_TagU.t_2_tag(list[i].a2));
				temp = _temp(temp,"{3}",CMS_TagU.t_2_tag(list[i].a3));
				temp = _temp(temp,"{4}",CMS_TagU.t_2_tag(list[i].a4));
				temp = _temp(temp,"{5}",CMS_TagU.t_2_tag(list[i].a5));
				temp = _temp(temp,"{6}",CMS_TagU.t_2_tag(list[i].a6));
				temp = _temp(temp,"{7}",CMS_TagU.t_2_tag(list[i].a7));
				temp = _temp(temp,"{8}",CMS_TagU.t_2_tag(list[i].a8));
				temp = _temp(temp,"{9}",CMS_TagU.t_2_tag(list[i].a9));
				tag += temp;
			}
		
			tag += htmls[2];
			tag += "<script>\n";
			tag += setting.js;
			tag += "\n</script>\n";
			tag += '<style type="text/css" media="screen">\n';
			tag += setting.css;
			tag += "\n</style>\n";
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

