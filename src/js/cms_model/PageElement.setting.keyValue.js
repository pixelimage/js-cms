
PageElement.setting.keyValue = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "setting.keyValue", 
		name	: "KV",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"" }),
				cells:[
					new PageModel.OG_Cell({
							id: "key",
							name: "キー",
							type: "single",
							style: SS.w300,
							view: "",
							def: "{ID}"
						}),
					new PageModel.OG_Cell({
						id: "value",
						name: "値",
						type: "single",
						style: SS.w300,
						view: "",
						def: "値"
					}),
					new PageModel.OG_Cell({
						id: "disc",
						name: "説明",
						type: "single",
						style: SS.w300,
						view: "",
						def: "説明"
					}),				]
			}
		})
		/* ---------- ---------- ---------- */
	]

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = JSON.parse('{"list": {"texts": {},"grid": [{"publicData": "1","key": "{CMS_HEAD_TITLE}","value": "株式会社サンプル","disc": "&lt;title&gt;タグの内容を登録してください。"},{"publicData": "1","key": "{CMS_HEAD_KEYWORD}","value": "株式会社サンプル,採用,リクルート,グローバル","disc": "&lt;meta keyword&gt;タグの内容を登録してください。"},{"publicData": "1","key": "{CMS_HEAD_DESCRIPTION}","value": "このサイトは、株式会社サンプルの会社案内や、事業の案内を行っています。","disc": "&lt;meta description&gt;タグの内容を登録してください。"}]}}');
	//	o.data = JSON.parse('{"list": {"texts": {},"grid": []}}');
		o.attr = {};
		return o;
	}

	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
		var list = CMS_U.getPublicList(data.list.grid);
		//if(gridHasNoData(data)){
		
		var tag = "";
		if(list.length == 0) {
			tag += '<span class="_no-input-data">リストデータを入力...</span>'
		} else{
			var style = ""
			tag += '<div class="_setting_keyValue">\n'
			tag += '<div class="_setting_id">'+_o.id+'</div>\n'
			tag += '<table>\n'
				tag += '<tr>\n'
				tag += '	<th>置換えキー</th>\n'
				tag += '	<th>置換え値</th>\n'
				tag += '	<th>説明</th>\n'
				tag += '</tr>\n'
			for (var i = 0; i < list.length ; i++) {
				tag += '<tr>\n'
				tag += '	<td class="key">' + list[i].key + '</td>\n'
				tag += '	<td class="val">' + list[i].value + '</td>\n'
				tag += '	<td class="disc">' + list[i].disc + '</td>\n'
				tag += '</tr>\n'
			}
			tag += '</table>\n'
			tag += '</div>\n'
		}
		return tag;
	}
	
	_.getHTML = function(_o){
		return "";
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
