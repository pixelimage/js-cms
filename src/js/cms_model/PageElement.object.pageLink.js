
PageElement.object.pageLink = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	//ブロック定義
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.pageLink", 
		name	: "ページ内リンク",
		name2	: "見出しタグの情報を元に、ページ内リンクを自動で生成します",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */
	//入力の設定
	
	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "設定"
			}),
			textData:{
				info: new PageModel.OG_SubInfo({
					name: "設定",
					note: "見出しタグの情報を元に、ページ内リンクを自動で生成します"
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "h2",
						name: "大見出し(H2)",
						type: CELL_TYPE.CHECK,
						note: "ページ内リンクに、大見出しを加えます",
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "h3",
						name: "中見出し(H3)",
						type: CELL_TYPE.CHECK,
						note: "ページ内リンクに、中見出しを加えます",
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "h4",
						name: "小見出し(H4)",
						type: CELL_TYPE.CHECK,
						note: "ページ内リンクに、小見出しを加えます",
						def: ""
					})
				]
			},
			gridData:null
		}),
		/* ---------- ---------- ---------- */
	]
	
	/* ---------- ---------- ---------- */
	//初期データ
	
	_.getInitData = function(){
		var o = {};
			o.type = _.pageInfo.id;
			o.data = _.getDefData(3);
			o.attr = {};
		return o;
	}
	
	/* ---------- ---------- ---------- */
	//プレビュー用のタグを返す (管理画面での表示)
	
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var tag = "";
			tag += '<div class="_cms_preview">\n'
			tag += '<div class="_title">ページ内リンク</div>'
			tag += '<div class="_notes">公開ページを表示したタイミングで、見出し情報を元に、自動生成されます。</div>'
			tag += '</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	//公開HTML用のタグを返す
	
	_.getHTML = function(_o){
		var tag = "";
		var data  = _o.data;

		var seti = data.setting.texts;
		var ss = [];
		if(seti.h2 == "1")ss.push("h2")
		if(seti.h3 == "1")ss.push("h3")
		if(seti.h4 == "1")ss.push("h4")
		tag += '<div class="cms-pagelink" data-head="'+ss.join(",")+'"></div>'
		return tag;
	}

	/* ---------- ---------- ---------- */

    return _;
})();

