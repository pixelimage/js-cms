//PageElement.object.imageTexts 20150515 delete

PageElement.object.images = (function(){
    var _ = new PageModel.Object_();

	/* ---------- ---------- ---------- */

    _.pageInfo = new PageModel.Object_Info({
			id 		: "object.images",
			name	: "イメージリスト",
			name2	: "＜UL＞＜LI＞＜IMG＞",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[画像リストブロック]"}
		cssDef	: {selector:".cms-images"}
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:150,height:100", width: "", ratio: "" }

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
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "image",
						name: "画像",
						type: CELL_TYPE.IMAGE,
						style: SS.img50p,
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "alt",
						name: "Alt(代替テキスト)",
						type: CELL_TYPE.SINGLE
					}),
					new PageModel.OG_Cell({
						id: "text",
						name: "キャプション",
						type: CELL_TYPE.SINGLE
					}),
					new PageModel.OG_Cell({
						id: "isZoom",
						name: "クリックで画像を拡大する",
						type: CELL_TYPE.CHECK,
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						style: SS.w300,
						def:CMS_AnchorU.getInitDataS()
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
					f: "1",
					m: "margin:0 10px 10px 0;"
				},
				grid: []
			},
			list: {
				texts: {},
				grid: [
					{
						publicData: "1",
						image: defImage,
						alt: "",
						text: "",
						anchor: { href: "", target: "" }
					},
					{
						publicData: "1",
						image: defImage,
						alt: "",
						text: "",
						anchor: { href: "", target: "" }
					},
					{
						publicData: "1",
						image: defImage,
						alt: "",
						text: "",
						anchor: { href: "", target: "" }
					},
					{
						publicData: "1",
						image: defImage,
						alt: "",
						text: "",
						anchor: { href: "", target: "" }
					}
				]
			}
		}
		o.data = def;
		o.extra = {width:"150px",height:"",float:"1",margin:"0 10px 10px 0"};
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		if(_isPub ==undefined) _isPub = false
		var tag = "";
		var list = CMS_U.getPublicList(data.list.grid);

		if(list.length == 0){
			tag += '<span class="_no-input-data">表データを入力...</span>'
		} else{
			var _cs = 'cms-images clearfix ' + ((extra["float"] == "1") ? " floats " :"");
			attr = attr.split('class="').join('class="' + _cs);

			var isSetW = (extra["width"]) ? true:false;
			var style_li = "";
				if(extra["width"]) style_li += 'width:'+getWidth(extra.width)+';';
				if(extra["margin"]) style_li += 'margin:'+extra.margin+';';

			var tag = "";
			tag += '<ul ' + attr + '>\n'
			for (var i = 0; i < list.length ; i++) {
				//IMGタグ生成
				var img = list[i].image;
				var imgTag = CMS_ImgBlockU.getImageTag({
					path	: img.path,
					isPub	: _isPub,
					// width	: isSetW ? "100%" : "",
					// ratio	: extra["height"],
					// width	: (!img.width) ? "100%" : "",
					width	: isSetW ? "100%" : img.width ,
					ratio	: img.ratio,
					alt		: list[i].alt,
					attr	: ""
				});
				//リンクあれば設定
				var link = CMS_AnchorU.getZoomLink(list[i].anchor , img.path , list[i].isZoom);

				//Aタグをwrap
				imgTag 	= CMS_AnchorU.getWapperTag(link, imgTag );
				tag += '<li style="'+style_li+'">'
				tag += imgTag;
				tag += CMS_ImgBlockU.getCaption(list[i].text);
				tag += '</li>\n';
			}
			tag += '</ul>\n'
			return tag;
		}
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var list = CMS_U.getPublicList(data.list.grid);
		if(list.length == 0)return ""
		return this.getPreview(_o,true);
	}

	function getWidth(_s){
		if(!_s)return ""
		if(_s.indexOf("px") != -1) return _s;
		if(_s.indexOf("%") != -1) return _s;
		if(Number(_s) == 0)return "";
		if(isNaN(Number(_s))) return "";
		return _s+"px";
	}

	/* ---------- ---------- ---------- */

    return _;
})();
