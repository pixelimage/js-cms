
PageElement.tag.img = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.img", 
		name	: "イメージ",
		name2	: "＜DIV＞",
		inputs	: ["CLASS","CSS"],
		// cssDef	: {file:"block",key:"[画像ブロック]"}
		cssDef	: {selector:".cms-img"}
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(_param){
		var o = {};
		o.type = _.pageInfo.id;
		
		o.data = {
			img: "width:200,height:140",
			link: null, 
			isZoom: false,
			//
			isLayoutMode:false,
			layout:null,
			onlyImgTag:false
		}
		o.extra = {
			caption: "",
			width: "",
			margin: "",
			layout_width:""
		}
		if(_param){
			o.data.img = _param.url;	
		}
		o.attr = { css:"default "}
		o.attr.class = o.attr.css;
		return o;
	}

	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		var extra = _o.extra;
		if(_isPub ==undefined) _isPub = false
		
		if(data["layout"] == undefined) data.layout = {};
		if(data["isLayoutMode"] == undefined) data.isLayoutMode = false;
		
		var tag = ""
		if(data == ""){
			tag += '<span class="_no-input-data">画像URLを入力...</span>';
		} else{
			
			//パスとwidthを設定
			var _w = extra["width"];
			var _h = extra["height"];
			var _path = "";
			if(data.isLayoutMode) {
				_path = data.layout;
				if(!_path["canvas"]){
					_path = ImageMapExport.treatParam(_path);
					_path.list.push({
						type : "item.image",
						hide: false,
						rect: {
							left: 0,
							top: 0,
							width: 100,
							height: 100
						},
						data : { src : data.img }
					})
				}
			} else{ 
				_path = data.img;
			}
			
			//IMGタグ生成
			var imgTag = CMS_ImgBlockU.getImageTag({
				path	: _path,
				isPub	: _isPub,
				width	: (_w) ? "100%" : "",
				ratio	: _h,
				alt		: extra["alt"],
				attr	: ""
			});
			
			//リンクあれば設定
			var link = CMS_AnchorU.getZoomLink(data.link , _path , data.isZoom);
			
			//Aタグをwrap
			imgTag 	= CMS_AnchorU.getWapperTag(link, imgTag );
			
			// onlyImgTag
			if(data.onlyImgTag){
				//IMGタグのみ
				tag += imgTag + '\n';
				
			}else{
				//IMGブロックでwrap
				attr = CMS_ImgBlockU.attrInit(attr);
				attr = attr.split('class="').join('class="cms-img ');
				if(_h){ if(! _w) _w = "100%"; }
				if(_w) attr = attr.split('style="').join('style="width:' + _w + "; ");
				tag += '<div ' + attr + '>\n';
				tag += imgTag + '\n';
				tag += CMS_ImgBlockU.getCaption(extra["caption"]) + '\n';
				tag += '</div>\n';
			}
		}
		return tag;
	}

	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		return this.getPreview(_o,true);
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
