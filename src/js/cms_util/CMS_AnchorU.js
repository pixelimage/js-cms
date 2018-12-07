
var CMS_AnchorU = (function(){

	function getInitData(){
		var o = {}
			o.href = '',
			o.target = '',
			o.text = 'ボタン名',
			o.class_ = 'cms-btn-text-box  cms-btn-size-m',
			o.image = '';
		return o;
	}
	function getInitData_Blank(){
		var o = {}
			o.href = '',
			o.target = '',
			o.text = '',
			o.class_ = '',
			o.image = '';
		return o;
	}
	function getInitDataS(){
		var o = {}
			o.href = '',
			o.target = ''
		return o;
	}

	function getViewTag(val,_isPub){
		if(_isPub == undefined) _isPub = true;
		var tag = '<b>未リンク</b>';
		if(val == "") return tag;
		if(val == undefined) return tag;
		if(val.href){
			tag = CMS_AnchorU.getAnchorTag(val,"",_isPub);
		}
		return tag;
	}
	/**
	 * htmlコード取得
	*/
	function getAnchorTag(_o,_attr,_isPub,_isSingleBtn){
		if(!_o)return "";
		if(_attr == undefined) _attr = "";
		if(_isPub == undefined) _isPub = true;
		if(_isSingleBtn == undefined) _isSingleBtn = false;
		var tag = ""
			var _url  = defaultVal(_o.href);
			var _tar  = defaultVal(_o.target);
			var _attrAll  = defaultVal(_o.attr);
			var _label = defaultVal(_o.text);
			var _class  = defaultVal(_o.class_);
			var _image  = defaultVal(_o.image);
			_image
			if(_url){
				if(_image.length > 0){
					tag = '<a href="{URL}" target="{TARGET}" class="{C}" {ATTR}><img src="{L}"></a>';
					tag = tag.split("{C}").join(_class);
					tag = tag.split("{URL}").join( CMS_Path.MEDIA.getAnchorPath(_url,_isPub));
					tag = tag.split("{TARGET}").join(_tar);
					tag = tag.split("{L}").join(CMS_Path.MEDIA.getImagePath(_image,_isPub));
					tag = tag.split("{ATTR}").join(_attr + " " + _attrAll);
				} else{
					if(! _label)_label = _url;
					tag = '<a href="{URL}" target="{TARGET}" class="{C}" {ATTR}>{L}</a>';
					tag = tag.split("{C}").join(_class);
					tag = tag.split("{URL}").join( CMS_Path.MEDIA.getAnchorPath(_url,_isPub));
					tag = tag.split("{TARGET}").join(_tar);
					tag = tag.split("{L}").join(_label);
					tag = tag.split("{ATTR}").join(_attr + " " + _attrAll);
				}
				tag = tag.split(' target=""').join("");
				tag = tag.split(' class=""').join("");
			} else{
				if(_isSingleBtn){
					tag = '<a href="#" class="cms-btn-text-box  cms-btn-size-m">リンク未設定</a>'
				} else{
					tag = ""
				}
			}
		return tag;
	}

	/**
	 * 画像にリンクが設定されてる場合
	 */
	function getWapperTag(_o,viewTag,_isPub){
		if(viewTag == undefined) viewTag = "";
		if(_isPub == undefined) _isPub = true;
		var tag = ""
		if(!_o) return viewTag;
			var _url  = defaultVal(_o.href);
			var _tar  = defaultVal(_o.target);
			var _attr  = defaultVal(_o.attr);
			if(_url){
				tag = '<a href="{URL}" target="{TARGET}" {ATTR}>{L}</a>';
				tag = tag.split("{URL}").join( CMS_Path.MEDIA.getAnchorPath(_url,_isPub));
				tag = tag.split("{TARGET}").join(_tar);
				tag = tag.split("{ATTR}").join(_attr);
				tag = tag.split("{L}").join(viewTag);
				tag = tag.split(' target=""').join("");
			} else{
				tag = viewTag
			}
		return tag;
	}
	/*
	画像ズームにチェックの場合
	*/
	function getZoomLink (_link,_img,_zoom){
		var o = { href:"",target:""}
		if(_link){
			o.href = (_link["href"]) ? _link["href"] :"";
			o.target = (_link["target"]) ? _link["target"] :"";
			o.attr = (_link["attr"]) ? _link["attr"] :"";
		}
		if(_zoom){
			if(DummyImageService.isMock(_img)){
			} else {
        if(typeof _img == "string"){
          o.href = _img;
        } else{
          if(_img.path) o.href = _img.path;
        }
				o.target = "innerWindow({})";
				o.attr = "";
			}
		}
		return o;
	}

	function defaultVal(_v,_def){
		var s = (_def != undefined) ? _def:"";
		if(_v != undefined){
			if(_v != ""){
				s = _v ;
			}
		}
		return s
	}

	return {
		getInitData:getInitData,
		getInitData_Blank:getInitData_Blank,
		getInitDataS:getInitDataS,

		getViewTag:getViewTag,
		getAnchorTag:getAnchorTag,
		getWapperTag:getWapperTag,
		getZoomLink:getZoomLink
	}
})();

