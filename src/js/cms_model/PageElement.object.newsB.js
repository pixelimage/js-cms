
PageElement.object.newsB = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.newsB", 
		name	: "ニュースリスト(カテゴリ)",
		name2	: "＜TABLE＞",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[ニュースリスト(カテゴリ)ブロック]"}
		cssDef	: {selector:".cms-newsB"}
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
					id		: "setting",
					name	: "ニュース一覧",
					note 	: ""
				}),
			textData:{
				info:new PageModel.OG_SubInfo({
					 name:""
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "max",
						name: "最大出力件数",
						type: CELL_TYPE.SINGLE,
						style: SS.repID20,
						def: "999"
					})
				]
			},
			gridData:null
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "news",
				name	: "ニュース一覧",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ 
					id		: "news",
					name	: "ニュース一覧",
					note 	: ""
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "date",
						name: "日時",
						type: CELL_TYPE.SINGLE,
						def: DateUtil.getFormattedDate(new Date(), "YYYY/MM/DD")
					}),
					new PageModel.OG_Cell({
						id: "category",
						name: "カテゴリ",
						type: CELL_TYPE.MULTI,
						def: "<span class='news-a'>会社情報</span>"
					}),
					new PageModel.OG_Cell({
						id: "t1",
						name: "テキスト",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書"
					}),
					new PageModel.OG_Cell({
						id: "t2",
						name: "詳細",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
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
					max: 999
				},
				grid: []
			},
			news: {
				texts: {},
				grid: [
					{
						publicData: "1",
						date: "2013/02/25",
						category: "<span class='news-a'>会社情報</span>",
						t1: "会社案内ページを更新しました。",
						t2: "",
						anchor: { href: "index.html",target:"" }
					},
					{
						publicData: "1",
						date: "2013/03/25",
						category: "<span class='news-b'>製品情報</span>",
						t1: "製品ページを更新しました。",
						t2: "製品ページを更新しました。新製品のお知らせや、開発中の製品のプレビューもご覧いただけます。",
						anchor: { href: "index.html",target:"" }
					},
					{
						publicData: "1",
						date: "2013/01/25",
						category: "<span class='news-c'>お知らせ</span>",
						t1: "ホームページを公開しました。",
						t2: "ホームページを公開しました。今後ともよろしくお願いいたします。",
						anchor: { href: "",target:"" }
					}
				]
			}
		}
		o.data = def;
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	
	_.hasData = function(_data){
		if (!_data) return false;
		if (!_data.news) return false;
		if (!_data.news.grid) return false;
		if(_data.news.grid.length == 0) return false;
		return true;
	}
	
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
			
		var tag = "";
		if(! this.hasData(data)){
			tag += '<span class="_no-input-data">データを入力...</span>'
		} else{
			var list = CMS_U.getPublicList(data.news.grid);
			var leng = PageElement_Util.getOmitLeng(list.length,"news",_isPub);
				leng = PageElement_Util.getListLeng(data,leng);
			attr = attr.split('class="').join('class="cms-newsB ');
			tag += '<div ' + attr + '>\n';				
			for (var n = 0; n < leng ; n++) {
				tag += '<div class="news-row clearfix">\n';
				tag += '	<div class="news-cell-date"><span class="news-date">' + list[n].date + '</span></div>\n';
				tag += '	<div class="news-cell-category ">' + list[n].category + '</div>\n';
				tag += '	<div class="news-cell-text">'
				tag += (function(__){ 
					var _s = CMS_TagU.t_2_tag(__.t1);
					if(CMS_TagU.hasLink(__.anchor)){
						_s = '<a '+CMS_TagU.getLinkTag(__.anchor)+'>' + _s + '</a>';
					}
					_s = '	<div class="news-_s">' + _s 
					_s += '	<span class="news-date2">( '+__.date+')</span>\n'
					_s += '	</div>';
					return _s;
				})(list[n]);
				if(isFilledText(list[n].t2)){
					tag += '	<div class="news-body">'+ CMS_TagU.t_2_tag(list[n].t2) + "</div>\n";
				}
				tag += '	</div>\n';
				tag += '</div>\n';
			}
			tag += "</div>\n";
			tag += PageElement_Util.getOmitPreviewTag(list.length,"news",_isPub);
		}
		return tag;
	}
	_.getHTML = function(_o){
		return this.getPreview(_o ,true);
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
