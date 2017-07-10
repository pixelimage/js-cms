
PageElement.object.data_xml = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.data_xml", 
		name	: "データブロックXML",
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
				info:new PageModel.OG_SubInfo({ name:"データグリッド" }),
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
		tag += '<div class="_title">データブロック / XMLデータ</div>'
		tag += '<div class="_notes">ブロック情報パネルの、[出力]タブよりファイル名を設定し、書出せます。</div>'
		tag += '<div class="">\n'
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
					var v = CMS_TagU.t_2_tag(list[i]["c"+(ii+1)]);
					tag += '		<td>' + v + '</td>\n';
				}
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
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var text_before = data.table.texts.text_before || "";
		var text_after = data.table.texts.text_after || "";
		
		var grid = CMS_U.getPublicList(data.table.grid);
		if(grid.length == 0) return "";
		var a = [];
		
		var maxLeng = PageElement_Util.getGridMaxLeng(grid,gridSum);
		var tag = ""
			tag += '<?xml version="1.0" encoding="UTF-8" ?>\n'
			tag += '<rows>\n'
		for (var i = 0; i < grid.length ; i++) {
			tag += '<row>\n'
			for (var ii = 0; ii < maxLeng + 1 ; ii++) {
				var s = CMS_TagU.t_2_tag(grid[i]["c" + (ii + 1)])
				var nnS = '<c' + (ii + 1) + '>'
				var nnE = '</c' + (ii + 1) + '>'
				tag += '	' + nnS + s + nnE + '\n'
			}
			 tag+= '</row>\n'
		}
			tag += '</rows>\n'
		return text_before + tag + text_after;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

