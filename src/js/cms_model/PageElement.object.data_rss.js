
PageElement.object.data_rss = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.data_rss", 
		name	: "データブロックRSS",
		name2	: "",
		inputs	: ["DETAIL"]
	});


	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "RSS設定",
				note 	: ""
			}),
			textData:{
				info: new PageModel.OG_SubInfo({
					name: "RSS情報",
					note: ""
				}),
				cells:[
					new PageModel.OG_Cell( {
						id:"t1",
						name:"サイト名", 
						type:CELL_TYPE.SINGLE,  
						style:SS.w400,
						def:"タイトル"
					}),
					new PageModel.OG_Cell( {
						id:"t2",
						name:"サイト名の説明", 
						type:CELL_TYPE.MULTI,  
						style:SS.w400h100,
						def:"サイト名の説明"
					}),
					new PageModel.OG_Cell( {
						id:"url",
						name:"サイトURL", 
						type:CELL_TYPE.SINGLE,  
						style:SS.w400,
						def:"URL"
					})
				]
			},
			gridData:null
		}),
		
		/* ---------- ---------- ---------- */
		
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "table",
				name	: "ページ一覧",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "date",
						name: "更新日時",
						type: CELL_TYPE.YYYYMMDD,
						def: DateUtil.getFormattedDate(new Date(), "YYYY/MM/DD hh:mm")
					}),
					new PageModel.OG_Cell({
						id: "t1",
						name: "ページ名",
						type: CELL_TYPE.MULTI,
						def: "サイト名"
					}),
					new PageModel.OG_Cell({
						id: "t2",
						name: "ページの説明",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "ページのファイルパス",
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
			setting:{
				texts:{
					date: DateUtil.getFormattedDate(new Date(), "YYYY/MM/DD hh:mm"),
					t1: "タイトル",
					t2: "説明",
					url: "http://www.yahoo.co.jp/"
				}
			},
			table: {
				texts: {},
				grid: [
					{
						publicData: "1",
						date: DateUtil.getFormattedDate(new Date(), "YYYY/MM/DD hh:mm"),
						t1: "会社案内ページを更新しました。",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor: { href: "index.html",target:"" }
					},
					{
						publicData: "1",
						date: DateUtil.getFormattedDate(new Date(), "YYYY/MM/DD hh:mm"),
						t1: "製品ページを更新しました。",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor: { href: "index.html",target:"" }
					},
					{
						publicData: "1",
						date:DateUtil.getFormattedDate(new Date(), "YYYY/MM/DD hh:mm"),
						t1: "ホームページを公開しました。",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
						anchor: { href: "index.html",target:"" }
					}
				]
			}
		}
		o.data = def;
		o.attr = {css:"default"};
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
		var list = CMS_U.getPublicList(data.table.grid);
		tag += '<div class="_cms_preview">\n'
		tag += '<div class="_title">データブロック / RSSデータ</div>'
		tag += '<div class="_notes">ブロック情報パネルの、[出力]タブよりファイル名を設定し、書出せます。</div>'
		tag += '<div class="_notes">RSSデータの書き出しファイル名は***.xmlとしてください。</div>'
		tag += '<div class="">\n'
		if(list.length == 0){
				tag += '<span class="_no-input-data">データリストを入力...</span>'
		} else{
			tag += '<table class="_dataTable">\n'
			tag += '<tbody>\n'
			tag += '	<tr>\n';
			tag += '	<th>更新日時</th>\n';
			tag += '	<th>ページ名</th>\n';
			tag += '	<th>ページの説明</th>\n';
			tag += '	<th>URL</th>\n';
			tag += '	</tr>\n';
			var leng = PageElement_Util.getOmitLeng(list.length,"data");
			for (var i = 0; i < leng ; i++) {
				tag += '	<tr>\n';
				tag += '	<td>' + defaultVal(list[i].date,"") + '</td>\n';
				tag += '	<td>' + defaultVal(list[i].t1,"") + '</td>\n';
				tag += '	<td>' + defaultVal(list[i].t2,"") + '</td>\n';
				tag += '	<td>' + defaultVal(list[i].anchor.href,"") + '</td>\n';
				tag += '	</tr>\n';
			}
			tag += "</tbody>\n";
			tag += "</table>\n";
			tag += PageElement_Util.getOmitPreviewTag(list.length,"data")
		}
		tag += "</div>\n";
		tag += "</div>\n";
		return tag;
	}
	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		// var attr = _o.attrs;
			var tag = "";		
		
		var temp = "";
			temp += '<?xml version="1.0" encoding="utf-8"?>\n';
			temp += '<rss version="2.0">\n';
			// temp += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
			temp += '<channel>\n';
			temp += '<title>{T1}</title>\n';
			temp += '<link>{URL}</link>\n';
			temp += '<description>{T2}</description>\n';
			// temp += '<pubDate>{DATE}</pubDate>\n';
		if(data.setting){
			temp = temp.split("{T1}").join(defaultVal(data.setting.texts.t1,""));
			temp = temp.split("{T2}").join(defaultVal(data.setting.texts.t2,""));
			temp = temp.split("{URL}").join(defaultVal(data.setting.texts.url,""));
		}
		tag += temp;
		var CMS_URL = data.setting.texts.url;
		if(CMS_URL.charAt(CMS_URL.length-1) != "/") {
			CMS_URL = CMS_URL+"/";
		}
		var list = CMS_U.getPublicList(data.table.grid);
		if(list.length == 0) return "";
			for (var n = 0; n < list.length ; n++) {
				var temp = "";
					temp += '<item>\n';
					temp += '	<title>{T1}</title>\n';
					temp += '	<link>{URL}</link>\n';
					temp += '	<guid isPermaLink="true">{URL}</guid>\n';
					temp += '	<pubDate>{DATE}</pubDate>\n';
					temp += '	<description><![CDATA[ {T2} ]]></description>\n';
					temp += '</item>\n';
					temp = temp.split("{T1}").join(defaultVal(list[n].t1,""));
					temp = temp.split("{T2}").join(defaultVal(list[n].t2,""));
					// temp = temp.split("{DATE}").join(new Date(list[n].date));
					var dd = list[n].date.split("/").join("-");
					temp = temp.split("{DATE}").join(moment(dd).format('ddd, DD MMM YYYY HH:mm:ss ZZ') );
					// temp = temp.split("{DATE}").join(list[n].date);
					// temp = temp.split("{DATE}").join("Thu, 5 Jun 2008 19:36:28 +0900");
					temp = temp.split("{URL}").join(CMS_URL + defaultVal(list[n].anchor.href,"")) ;
				tag += temp	
			}
		tag += '</channel>\n';
		tag += '</rss>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
