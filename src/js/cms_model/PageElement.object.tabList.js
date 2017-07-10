
PageElement.object.tabList = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.tabList", 
			name	: "タブリスト",
		name2	: "",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[タブリストブロック]"}
		cssDef	: {selector:".cms-tab"}
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト＜UL＞",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "t1",
						name: "タブ名＜LI＞",
						type: CELL_TYPE.SINGLE
					}),
					new PageModel.OG_Cell({
						id: "id",
						name: "選択したときに表示する要素ID",
						type: CELL_TYPE.SINGLE
					}),
					new PageModel.OG_Cell({
						id: "class",
						name: "class",
						type: CELL_TYPE.SINGLE
					})
				]
			}
		})
		/* ---------- ---------- ---------- */
	]
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = JSON.parse('{"list": {"texts": {},"grid": [{"t1": "タブ01","id": "tab01","publicData": "1"},{"t1": "タブ02","id": "tab02","publicData": "1"},{"t1": "タブ03","id": "tab03","publicData": "1"}]}}')
		o.attr = {css:"default",style:""};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
		attr = attr.split('class="').join('class="cms-tab clearfix ');
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0 ){
			tag += '<span class="_no-input-data">タブデータを入力...</span>'
		} else{
			var style = "";
			tag += '<ul '+ attr+' >\n';
			for (var i = 0; i < list.length ; i++) {
				var c = (list[i]["class"] != undefined) ? list[i]["class"] :"";
				tag += '	<li style="' + style +'" data="'+list[i].id+'" class="'+c+'">'
				tag += list[i].t1
				tag += '</li>\n'
			}
			tag += '</ul>\n'
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		attr = attr.split('class="').join('class="cms-tab clearfix ')
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) return "";
		{
			var style = "";
			tag += '<ul '+ attr+'>\n';
			for (var i = 0; i < list.length ; i++) {
				var c = (list[i]["class"] != undefined) ? list[i]["class"] :"";
				tag += '	<li style="' + style +'"  data="'+list[i].id+'" class="_btn_default '+c+'">'
				tag += list[i].t1
				tag += '</li>\n'
			}
			tag += '</ul>\n'
			tag += '<script>\n'
			tag += '$(function(){\n';
			tag += '	$(".cms-tab").cms_tab();\n';
			tag += '});\n';
			tag += '</script>\n';
		}
		return tag;
	}

	/* ---------- ---------- ---------- */

    return _;
})();
