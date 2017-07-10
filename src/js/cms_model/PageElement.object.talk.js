
PageElement.object.talk = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.talk", 
			name	: "インタビュー",
			name2	: "",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[インタビューブロック]"}
		cssDef	: {selector:".cms-talk"}
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:50,height:50", width: "50px", ratio: "1:1" }

	_.grids = [
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "リスト",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "image",
						name: "画像",
						type: CELL_TYPE.IMAGE,
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "t1",
						name: "名前",
						type: CELL_TYPE.SINGLE,
						def: "田中"
					}),
					new PageModel.OG_Cell({
						id: "t2",
						name: "発言",
						type: CELL_TYPE.MULTI,
						def: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
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
			list: {
				texts: {},
				grid: [
					{
						publicData: "1",
						image: defImage,
						t1: "田中",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					},
					{
						publicData: "1",
						image: defImage,
						t1: "田中",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					},
					{
						publicData: "1",
						image: defImage,
						t1: "長谷川",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。<br><br>サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
					},
					{
						publicData: "1",
						image: defImage,
						t1: "田中",
						t2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
					}
				]
			}
		}
		o.data = def;
		o.attr = {css:"default",style:""};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		if(_isPub ==undefined) _isPub = false
		var tag = "";
		attr = attr.split('class="').join('class="cms-talk ');
			var list = CMS_U.getPublicList(data.list.grid);
		
		if(list.length == 0){
			tag += '<span class="_no-input-data">インタビューデータを入力...</span>'
		} else{
			tag += '<table '+attr+'>\n';
			
			for (var i = 0; i < list.length ; i++) {
				var t = ""
					t += '	<tr>\n';
					t += '		<th>{IMG}{T1}</th>\n';
					t += '		<td>{T2}</td>\n';
					t += '	</tr>\n';
					t = t.split("{T1}").join(CMS_TagU.t_2_tag(list[i].t1))
					t = t.split("{T2}").join(CMS_TagU.t_2_tag(list[i].t2))
					var imgTag = ""
					if(list[i].image) {
						var img = list[i].image;
						imgTag = CMS_ImgBlockU.getImageTag({
							path	: img.path,
							isPub	: _isPub,
							width	: img.width,
							ratio	: img.ratio,
							alt		: "",
							attr	: ""
						});
					}
					t = t.split("{IMG}").join(imgTag)
				tag += t;
			}
			tag += '</table>\n';
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0) return "";
		
		return this.getPreview(_o,true);
		
	}

	/* ---------- ---------- ---------- */

    return _;
})();
