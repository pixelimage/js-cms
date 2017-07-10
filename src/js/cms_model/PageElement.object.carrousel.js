
PageElement.object.carrousel = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.carrousel", 
		name	: "カルーセル",
		name2	: "",
		inputs	: ["CLASS","CSS","DETAIL"],
		cssDef	: {selector:".cms-carrousel"}
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:200,height:200", width: "", ratio: "1:1" }
		
	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "スライドショー設定",
				note 	: ""
			}),
			textData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
				new PageModel.OG_Cell({id:"slideWidth",	name:"画像幅",			type:CELL_TYPE.SINGLE , style:SS.w100,	view:"",def:"200",note:"ブロックごとの幅(px)を指定してください。"}),
				new PageModel.OG_Cell({id:"minSlides",	name:"最小スライド数",	type:CELL_TYPE.SINGLE , style:SS.w100,	view:"",def:"2",note:"最小のブロック数"}),
				new PageModel.OG_Cell({id:"maxSlides",	name:"最大スライド数",	type:CELL_TYPE.SINGLE , style:SS.w100,	view:"",def:"2",note:"最大のブロック数"}),
				new PageModel.OG_Cell({id:"slideMargin",name:"マージン幅",		type:CELL_TYPE.SINGLE , style:SS.w100,	view:"",def:"5",note:"ブロックごとのマージン(px)を指定してください。"}),
				new PageModel.OG_Cell({id:"slideshow",	name:"オートプレイ",	type:CELL_TYPE.SELECT , vals:SS.SelectVals.YN,	view:"",def:"1"}),
				new PageModel.OG_Cell({id:"slideshowSpeed",	name:"表示間隔(秒)",type:CELL_TYPE.SINGLE , style:SS.w100,	view:"",def:"5",note:"次の写真を表示する間での秒数を入力してください。"})
				]
			},
			gridData:null
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "photos",
				name	: "写真一覧",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"写真一覧", note:"スライドする写真一覧を登録します。<br>リンクを設定したい場合は、[リンク先URL]を入力してください。<br>文書を表示したい場合は、[タイトル]と[説明]を入力してください。" }),
				cells:[
					new PageModel.OG_Cell({
						id: "image",
						name: "写真",
						type: CELL_TYPE.IMAGE,
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "text",
						name: "タイトル",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書"
					}),
					new PageModel.OG_Cell({
						id: "text2",
						name: "説明",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "isZoom",
						name: "クリックで画像を拡大する",
						type: CELL_TYPE.CHECK,
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
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
					slideWidth: "200",
					minSlides: "2",
					maxSlides: "6",
					slideMargin: "5",
					slideshow: "0",
					slideshowSpeed: "5"
				},
				grid: []
			},
			photos: {
				texts: {},
				grid: [
					{
						publicData: "1",
						image: { mode:"simple" , path: "width:200,height:200", width: "", ratio: "1:1" },
						text: "タイトル1",
						text2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitDataS()
					},
					{
						publicData: "1",
						image: { mode:"simple" , path: "width:200,height:200", width: "", ratio: "1:1" },
						text: "タイトル2",
						text2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitDataS()
					},
					{
						publicData: "1",
						image: { mode:"simple" , path: "width:200,height:200", width: "", ratio: "1:1" },
						text: "タイトル3",
						text2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitDataS()
					},
					{
						publicData: "1",
						image: { mode:"simple" , path: "width:200,height:200", width: "", ratio: "1:1" },
						text: "タイトル4",
						text2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitDataS()
					},
					{
						publicData: "1",
						image: { mode:"simple" , path: "width:200,height:200", width: "", ratio: "1:1" },
						text: "タイトル5",
						text2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor:CMS_AnchorU.getInitDataS()
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
			attr = attr.split('class="').join('class="cms-slider-carrousel clearfix ');
		var tag = ""
		
		var setting = data.setting.texts;
		var w = setting.slideWidth;
		var list = CMS_U.getPublicList(data.photos.grid);
		
		if(data == undefined || list.length == 0 ){
			tag += '<span class="_no-input-data">データを入力...</span>'
		} else{
			var i = 0
			attr = attr.split('class="').join('class="_cms_preview_subblock ')
			tag += '<div class="_cms_preview">\n'
			tag += '<div class="_title">ガジェット / カルーセル</div>\n';
			tag += "公開ページで確認してください<br> \n"
			
			tag += '	<table class="_simpleTable">\n'
			tag += '	<tr>\n'
			tag += '		<th>番号</th>\n'
			tag += '		<th>画像</th>\n'
			tag += '		<th>タイトル</th>\n'
			tag += '		<th>説明</th>\n'
			tag += '	</tr>\n'
			for (var i = 0; i < list.length ; i++) {
				tag += '	<tr>\n'
				tag += '	<th>'+(i+1)+'</th>\n'
				tag += '	<td>\n'
				var img = list[i].image;
				tag += CMS_ImgBlockU.getImageTag({
					path: img.path,
					isPub: false,
					width: "100px",
					ratio: img.ratio,
					alt: "",
					attr: ""
				});				tag += '	</td>\n'
				if(isFilledText(list[i].text)) {
					tag += '<td>'+list[i].text+'</td>\n';
				} else{
					tag += '<td><br></td>\n';
				}
				if(isFilledText(list[i].text2)) {
					tag += '<td>'+list[i].text2+'</td>\n';
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
			attr = attr.split('class="').join('class="cms-carrousel clearfix ');
		var tag = ""
		var setting = data.setting.texts;
		var list = CMS_U.getPublicList(data.photos.grid);
		if(list.length==0) return "";

			tag += '<ul ' + attr + _getJSONAttr(setting) + '>\n'
			for (var i = 0; i < list.length ; i++) {
				tag += '	<li>\n'
				var img = list[i].image;
				var imgTag = CMS_ImgBlockU.getImageTag({
					path	: img.path,
					isPub	: true,
					width	: "100%",
					ratio	: img.ratio,
					alt		: "",
					attr	: ""
				});
				var anchor = CMS_AnchorU.getZoomLink(list[i].anchor , list[i].image , list[i].isZoom);
					tag += CMS_AnchorU.getWapperTag(anchor,imgTag);
				if (isFilledText(list[i].text)) tag += '<p class="title">' + CMS_TagU.t_2_tag(list[i].text) + '</p>\n';
				if (isFilledText(list[i].text2)) tag += '<p class="read">' + CMS_TagU.t_2_tag(list[i].text2) + '</p>\n';			tag += '	</li>\n'
			}
			tag += '</ul>\n'
			//
			tag += '<script>\n';
			tag += '$(function(){\n';
			tag += '	$(".cms-carrousel").cms_carrousel();\n';
			tag += '});\n';
			tag += '</script>\n';
			
		return tag;
	}

	function _getJSONAttr(_s){
		var _num = NumberU.defaultNumber;
		var param = {}
			param.slideWidth 	= _num(_s.slideWidth);
			param.minSlides 	= _num(_s.minSlides);
			param.maxSlides 	= _num(_s.maxSlides);
			param.slideMargin 	= _num(_s.slideMargin);
			param.auto 			= (_s.slideshow == "1") ? true :false;
			param.pause 		= _num(_s.slideshowSpeed) *1000;
		var s = '{}';
		try{
		  s = JSON.stringify(param);
		}catch( e ){}
		return " data-json='" + s + "' ";
	}

	
	/* ---------- ---------- ---------- */

    return _;
})();
