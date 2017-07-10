
PageElement.object.feed = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.feed", 
			name	: "RSSフィード表示",
		name2		: "",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[RSSフィード表示ブロック]"}
		cssDef	: {selector:".cms-feed"}
	});
	/* ---------- ---------- ---------- */

	_.grids = [
	
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "RSSフィード登録",
				note 	: ""
			}),
			textData:{
				info: new PageModel.OG_SubInfo({
					name: "",
					note: ""
				}),
				cells:[
					new PageModel.OG_Cell( {
						id:"url",
						name:"RSSフィードのファイルパス<br>もしくはフルパス",
						type:CELL_TYPE.SINGLE , 
						style:SS.w400,
						note:(function(){
							var s = ""
								s += 'サイトルートからのRSSフィードのファイルパスを入力してください。ex... rss.xml <br>'
								s += 'ファイルパスでの場合は、対応するフィードの形式はRSSのみになります。<br>'
								s += 'データブロックのRSSデータで作成・書き出したデータに対応しています。<br><br>'
								s += 'フルパス（http://〜）で指定した場合は、Google Feed API ( https://developers.google.com/feed/ )を使用してフィードを取得します。<br>'
								s += 'Google Feed APIが対応してるフィードの形式であれば、読み込むことができます。<br>'
								s += 'ただし、Feed APIにキャッシュされるので、最新のフィードの内容とは、少しタイムラグが出る場合があります。'
							return s;
						})()
					}),
					new PageModel.OG_Cell( {
						id:"sum",
						name:"表示件数（上限数）",
						type:CELL_TYPE.SINGLE , 
						style:SS.w100
					}),
					new PageModel.OG_Cell({
						id: "template",
						name: "テンプレートHTML",
						type: CELL_TYPE.MULTI,
						style: SS.w800h200,
						view: "",
						note: (function(){ 
							var s = "";
								s += '使用できるテンプレート用置き換えタグ<br>';
								s += '<b>{LINK}</b>...リンクURL<br>';
								s += '<b>{DATE}</b>...更新日<br>';
								s += '<b>{TITLE}</b>...タイトル<br>';
								s += '<b>{CONTENT}</b>...サマリー（本文）<br>';
								s += '<b>{REPEAT_START}</b>...繰り返し領域の始まり<br>';
								s += '<b>{REPEAT_END}</b>...繰り返し領域のおわり<br>';
							return s;
						})()
					}),
				]
			},
			gridData:null
		})
		/* ---------- ---------- ---------- */
	]
	
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		
		var def = {
			setting: {
				texts: {
					url: "http://rss.dailynews.yahoo.co.jp/fc/rss.xml",
					sum: "5",
					template: (function(){ 
						var s = "";
							s += '<ul>\n'; //  id="{ID}"
							s += '{REPEAT_START}\n';
							s += '	<li>\n';
							s += '		<p class="feed_date">{DATE}</p>\n';
							s += '		<p class="feed_title"><a href="{LINK}">{TITLE}</a></p>\n';
							s += '		<p class="feed_content">{CONTENT}</p>\n';
							s += '	</li>\n';
							s += '{REPEAT_END}\n';
							s += '</ul>\n';
						return s;
					})()
				},
				grid: []
			}
		}
		
		o.data = def;
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		var url = defaultVal(data.setting.texts.url,"");
		var tag = "";
			tag += '<div class="_cms_preview">'
			tag += '	<div class="_title">ガジェット / RSSフィード表示</div>';
			tag += '	<div class="_notes">※この要素の表示は、プレビューページか、公開サイトで確認してください。</div>';
			tag += '	<p>RSSのURL：<b>' + url + '</b></p>'
			tag += '</div>'
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		attr = attr.split('class="').join('class="cms-feed clearfix ');
		var sum = defaultVal(data.setting.texts.sum,"1");
		var url = defaultVal(data.setting.texts.url,"");
			url = url.split(" ").join("");
			url = url.split("	").join("");
		
		var temp = defaultVal(data.setting.texts.template,"");
		
		var tag = "";
		
		if(url.substr(0,4) == "http"){
			tag += '<script type="text/javascript" src="//www.google.com/jsapi"></script>\n';
			tag += '<script type="text/javascript">google.load("feeds", "1");</script>\n';
		} else{
			url = CONST.SITE_DIR + url
		}
		url = url.split('"').join("");
		sum = sum.split('"').join("");
		
			tag += '<div ' + attr + '>\n';
			tag += '<div class="cms-rss" data-url="'+url+'" data-sum="'+sum+'">\n';
			tag += '<textarea style="display:none;">';
			tag += temp;
			tag += '</textarea>\n';
			tag += '</div>\n';
			tag += '</div>\n';
			tag += '<script>\n';
			tag += '$(function(){\n';
			tag += '	$(".cms-rss").cms_rss();\n';
			tag += '});\n'
			tag += '</script>\n';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

