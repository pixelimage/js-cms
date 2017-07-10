
PageElement.object.table = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.table", 
		name	: "表組",
		name2	: "＜TABLE＞",
		inputs	: ["CLASS","CSS","DETAIL","CAPTION"],
		// cssDef	: {file:"block",key:"[表組ブロック]"}
		cssDef	: {selector:".cms-table"}
	});

	/* ---------- ---------- ---------- */
	
	//セルの準備。設定でデフォルトセル数を設定
	var maxCellLeng = 15;
	var tableCells = [];
	
	if (window["GRID_EDIT_MAX_CELL"]) maxCellLeng = GRID_EDIT_MAX_CELL["TABLE"];
	for (var i = 0; i < maxCellLeng ; i++) {
		var n = i+1;
		var def = "";
		if(i == 0) def = "サンプルの文書";
		if(i == 1) def = "サンプルの文書ですので、ご注意ください";
		var p = new PageModel.OG_Cell({
			id: "c" + n,
			name: n,
			type: CELL_TYPE.TABLE,
			style: "",
			view: "",
			def: def
		});
		tableCells.push(p);
	}

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "基本設定",
				note 	: "",
			}),
			textData:{
				info:new PageModel.OG_SubInfo({ 
					name:"",
					image	: '<div class="ss_guide _table"></div>'
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "row1",
						name: "1行目を<br>見出し＜TH＞にする",
						type: CELL_TYPE.CHECK
					}),
					new PageModel.OG_Cell({
						id: "row2",
						name: "2行目...",
						type: CELL_TYPE.CHECK
					}),
					new PageModel.OG_Cell({
						id: "row3",
						name: "3行目...",
						type: CELL_TYPE.CHECK
					}),
					new PageModel.OG_Cell({
						id: "col1",
						name: "1列目を<br>見出し＜TH＞にする",
						type: CELL_TYPE.CHECK
					}),
					new PageModel.OG_Cell({
						id: "col2",
						name: "2列目...",
						type: CELL_TYPE.CHECK
					}),
					new PageModel.OG_Cell({
						id: "col3",
						name: "3列目...<br><br><br>",
						type: CELL_TYPE.CHECK
					}),
					new PageModel.OG_Cell({
						id: "swipe",
						name: "スマホで<br>スワイプ化する",
						type: CELL_TYPE.CHECK
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
				name	: "テーブルデータ",
				style	: "",
				note 	: "空のセルは、出力されません。空のセルを表示したい場合は、-(ハイフン)を入力してください。"
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:tableCells
			}
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "cols",
				name	: "列(縦方向のセル)設定",
				note 	: "",
			}),
			textData:{
				info:new PageModel.OG_SubInfo({ 
					name:""
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "wides",
						name: "幅リスト",
						type: CELL_TYPE.SINGLE,
						note:"列のセル &lt;col&gt; ごとの幅属性 ( width= ) を , (カンマ区切り)で入力。無指定の場合は * (アスタリスク)。例：[ 20%,20%,*,* ]"
					}),
					new PageModel.OG_Cell({
						id: "attrs",
						name: "属性リスト",
						type: CELL_TYPE.SINGLE,
						style	: "width:500px",
						note:"列のセル &lt;col&gt; ごとの属性を , (カンマ区切り)で入力。無指定の場合は * (アスタリスク)。例：[style=\"width:20%\",style=\"width:20%\";,*,* ]"
					})
				]
			},
			gridData:null
		})
	]
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = {
			"setting": {
				"texts": {
					"row1": "1",
					"col1": "1",
					"wides": "20%,*,*,*,*"
				},
				"grid": []
			},
			"cols": {
				"texts": {
					"wides": "20%,*,*,*,*"
				},
				"grid": []
			},
			"table": {
				"texts": {},
				"grid": [
					{
						"publicData": "1",
						"c1": "項目名",
						"c2": "項目名"
					},
					{
						"publicData": "1",
						"c1": "項目名",
						"c2": "サンプルの文書ですので、ご注意ください\n <a href='http://www.google.co.jp'><i class='fa fa-caret-right '></i> リンク</a> "
					},
					{
						"publicData": "1",
						"c1": "項目名",
						"c2": "サンプルの文書ですので、ご注意ください"
					},
					{
						"publicData": "1",
						"c1": "項目名",
						"c2": "サンプルの文書ですので、ご注意ください"
					}
				],
				"_state": {
					"currentRow": 0,
					"currentPage": 0,
					"fitWide": true,
					"hideCols": ""
				}
			}
		}
		o.attr = {css:"default w100p",style:""};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		var tag = "";
		
		attr = attr.split('class="').join('class="cms-table ');
		var list = CMS_U.getPublicList(data.table.grid);
		if(list.length == 0){
				tag += '<span class="_no-input-data">表データを入力...</span>'
		} else{
			var leng = PageElement_Util.getOmitLeng(list.length,"table");
			var row1 = data.setting.texts.row1;
			var row2 = data.setting.texts.row2;
			var row3 = data.setting.texts.row3;
			
			var col1 = data.setting.texts.col1;
			var col2 = data.setting.texts.col2;
			var col3 = data.setting.texts.col3;
			tag += '<div>\n'
			tag += '<table '+attr+'>\n'
			tag += this.getCaption(extra)
			tag += this.getColTags(data);
			tag += '<tbody>\n'
			
			for (var i = 0; i < leng ; i++) {
				tag += '	<tr>\n';
				for (var ii = 1; ii < maxCellLeng ; ii++) {
					if(list[i]["c"+ii]){
						var v = list[i]["c"+(ii)];
						if(v == "-") v = ""; 
						var att = CMS_TagU.getCellAttr(v);
						v = CMS_TagU.deleteCellAttr(v);
						
						var b = false;
						if(row1 == "1" && i == 0) b= true;
						if(row2 == "1" && i == 1) b= true;
						if(row3 == "1" && i == 2) b= true;
						if(col1 == "1" && ii == 1) b= true;
						if(col2 == "1" && ii == 2) b= true;
						if(col3 == "1" && ii == 3) b= true;
						   
						var tname = (b) ? "th" : "td";
						tag += '		<'+tname+' '+att+'>' + CMS_TagU.t_2_tag(v) + '</'+tname+'>\n';
					}
				}
				tag += '	</tr>\n';
			}
			tag += "</tbody>\n";
			tag += "</table>\n";
			tag += PageElement_Util.getOmitPreviewTag(list.length,"table")
			tag += '</div>\n'
		}
		return tag;
	}
	
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		var tag = "";

		attr = attr.split('class="').join('class="cms-table ');
		var list = CMS_U.getPublicList(data.table.grid);
		if(list.length == 0) return "";
			var swipe = data.setting.texts.swipe;
			var swipeTag = (function(_b){ 
				if(_b == "1") return { start:'<div class="tableWapper">\n',end: "</div>\n"};
				return  { start:"", end:"" }
			})(swipe);
			tag += swipeTag.start;
			
			var leng = list.length;
			var row1 = data.setting.texts.row1;
			var row2 = data.setting.texts.row2;
			var row3 = data.setting.texts.row3;
			
			var col1 = data.setting.texts.col1;
			var col2 = data.setting.texts.col2;
			var col3 = data.setting.texts.col3;
			
			tag += '<table '+attr+'>\n'
			tag += this.getCaption(extra);
			tag += this.getColTags(data);
			tag += '	<tbody>\n'
			
			for (var i = 0; i < leng ; i++) {
				tag += '	<tr>\n';
				for (var ii = 1; ii < maxCellLeng ; ii++) {
					if(list[i]["c"+ii]){
						var v = list[i]["c"+(ii)];
						if(v == "-") v = ""; 
						var att = CMS_TagU.getCellAttr(v);
						v = CMS_TagU.deleteCellAttr(v);
						
						var b = false;
						if(row1 == "1" && i == 0) b= true;
						if(row2 == "1" && i == 1) b= true;
						if(row3 == "1" && i == 2) b= true;
						if(col1 == "1" && ii == 1) b= true;
						if(col2 == "1" && ii == 2) b= true;
						if(col3 == "1" && ii == 3) b= true;
						   
						var tname = (b) ? "th" : "td";
						tag += '		<'+tname+' '+att+'>' + CMS_TagU.t_2_tag(v) + '</'+tname+'>\n';
					}
				}
				tag += '	</tr>\n';
			}
			tag += "	</tbody>\n";
			tag += "</table>\n";
			tag += swipeTag.end
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getColTags = function(_data){
		var tag =  "";
		if(_data.cols){
			if(_data.cols.texts){
				var wides = [];
				var attrs = [];
				
				function __core(_val){
					var a = []
					var vals = _val.split(" ").join("").split(",");
					for (var i = 0; i < vals.length ; i++) {
						a.push(vals[i]);
					}
					return a;
				}
				
				if(_data.cols.texts.wides){
					wides = __core(_data.cols.texts.wides);
				}
				if(_data.cols.texts.attrs){
					attrs = __core(_data.cols.texts.attrs);
				}
				tag += '		<colgroup>\n'
				for (var i = 0; i < maxCellLeng ; i++) {
					var ts = ""
					if(wides[i]) ts+= 'width="'+wides[i]+'" ';
					if(wides[i] == "") ts+= 'width="" ';
					if(attrs[i]) ts+= attrs[i]+' ';
					if(ts) tag +='			<col ' + ts + '>\n';
				}
				tag += '		</colgroup>\n'
			}
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getCaption = function(_extra){
		var tag =  ""
		if(_extra){
			if(_extra.head){
				tag += '	<caption>' +_extra.head+ '</caption>\n'
			}
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
