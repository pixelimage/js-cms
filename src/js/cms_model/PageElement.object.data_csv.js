
if(window["GRID_EDIT_MAX_CELL"] == undefined){
	window.GRID_EDIT_MAX_CELL = {}
	GRID_EDIT_MAX_CELL.DATA = 15;
}

var PageElement_data_gridCell = (function(_max){ 
   var a = [];
   var defs = [
		"サンプルの文書。",
		"サンプルの文書ですので、ご注意ください。" ,
		"サンプルの文書ですので、ご注意ください。"
	];
   for (var i = 0; i <  _max ; i++) {
   		var def = (defs.length > i) ? defs[i] :"";
		a.push(
			new PageModel.OG_Cell({
				id: "c" + (i+1),
				name: (i+1),
				type: CELL_TYPE.MULTI,
				def: def
			})
		);
	}
	return a;
})(GRID_EDIT_MAX_CELL.DATA);
	
PageElement.object.data_csv = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.data_csv", 
		name	: "データブロックCSV",
		name2	: "",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */
	
	var gridSum = GRID_EDIT_MAX_CELL.DATA;

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "table",
				name	: "データ",
				note 	: ""
			}),
			textData:{
				info:new PageModel.OG_SubInfo({ 
					name:"設定",
					note:"",
					image: "" 
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "spliter",
						name: "区切り文字",
						type: CELL_TYPE.SINGLE,
						style: SS.w50,
						view: "",
						def: ",",
						note: "データの区切り文字を入力してください。一般的には、カンマやタブを使用します。<br>なにも入力しない場合は、タブが使用されます。"
					}),
					new PageModel.OG_Cell({
						id: "text_before",
						name: "データの前に追加するテキスト",
						style: SS.w400,
						type: CELL_TYPE.MULTI,
						view: "",
						def: "",
						note: "例: &lt;textarea id=\"data\" style=\"display:none;\"&gt;"
					}),
					new PageModel.OG_Cell({
						id: "text_after",
						name: "データの後ろに追加するテキスト",
						style: SS.w400,
						type: CELL_TYPE.MULTI,
						view: "",
						def: "",
						note: "例: &lt;/textarea&gt;"
					})
				]
			},
			gridData:{
				info: new PageModel.OG_SubInfo({
					name: "データグリッド",
					note: "セル内の改行は、出力時には無視されます。"
				}),
				cells:JSON.parse(JSON.stringify(PageElement_data_gridCell))
			}
		})
	]
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = _.getDefData(3);
		o.attr = {css:"",style:""};
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
		var list = CMS_U.getPublicList(data.table.grid);
		tag += '<div class="_cms_preview">\n'
		tag += '<div class="_title">データブロック / CSVデータ</div>'
		tag += '<div class="_notes">ブロック情報パネルの、[出力]タブよりファイル名を設定し、書出せます。</div>'
		if(list.length == 0){
				tag += '<span class="_no-input-data">データリストを入力...</span>'
		} else{
			var maxLeng = PageElement_Util.getGridMaxLeng(list,gridSum);
			tag += '<table class="_dataTable">\n'
			tag += '<tbody>\n'
			
			var leng = PageElement_Util.getOmitLeng(list.length,"data");
			for (var i = 0; i < leng ; i++) {
				tag += '	<tr>\n';
				for (var ii = 0; ii < maxLeng +1 ; ii++) {
					var s = CMS_TagU.tag_2_t(list[i]["c"+(ii+1)]);
						s = s.split("\n").join("");
					tag += '		<td>' + s + '</td>\n';
				}
				tag += '	</tr>\n';
			}
			tag += "</tbody>\n";
			tag += "</table>\n";
			tag += PageElement_Util.getOmitPreviewTag(list.length ,"data")
		}
			tag += "</div>\n";
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var sep = data.table.texts.spliter || "\t";
		var text_before = data.table.texts.text_before || "";
		var text_after = data.table.texts.text_after || "";
		
		var grid = CMS_U.getPublicList(data.table.grid);
		if(grid.length == 0) return "";
		var a = [];
		
		var maxLeng = PageElement_Util.getGridMaxLeng(grid,gridSum);
		var lines = []
		for (var i = 0; i < grid.length ; i++) {
			var row = []
			for (var ii = 0; ii < maxLeng + 1 ; ii++) {
				var s = grid[i]["c"+(ii+1)];
				if(s ==undefined) s = "";
					s = s.split("\n").join("");
				row.push(s);
			}
			lines.push(row.join(sep))
		}
		return text_before + lines.join("\n") + text_after;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

