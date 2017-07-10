
var ImageMapCode = (function(){
	/* ---------- ---------- ---------- */
	//ImageMapCode.getUID
	function getUID (_type) {
		var s = DateUtil.getFormattedDate(new Date(),_type.split(".")[1]+"_YYYYMMDD_RRR");
		return s;
		
	}
	function isRect (_type) { return (_type == "item.rect"); }
	function isLine (_type) { return (_type == "item.line"); }
	function isImage (_type) { return (_type == "item.image"); }
	function isSVG (_type) { return (_type == "item.svg"); }
	function isText (_type) { return (_type == "item.text"); }
	function isLink (_type) { return (_type == "item.link"); }
	function isHTML (_type) { return (_type == "item.html"); }
	
	/* ---------- ---------- ---------- */
	
	function createItemView (_type) { 
		var view
		if(isRect(_type))	{ view = $('<div data-defclass="_design-item-rect" class="_design-item-rect"></div>'); }
		if(isLine(_type))	{ view = $('<div data-defclass="_design-item-line" class="_design-item-line"></div>'); }
		if(isImage(_type))	{ view = $('<div data-defclass="_design-item-image" class="_design-item-image"></div>'); }
		if(isSVG(_type))	{ view = $('<div data-defclass="_design-item-svg" class="_design-item-svg"></div>'); }
		if(isText(_type))	{ view = $('<div data-defclass="_design-item-text" class="_design-item-text"></div>'); }
		if(isLink(_type))	{ view = $('<div data-defclass="_design-item-link" class="_design-item-link"></div>'); }
		if(isHTML(_type))	{ view = $('<div data-defclass="_design-item-html" class="_design-item-html"></div>'); }
		return view;
	}
	
	/* ---------- ---------- ---------- */
	//初期データ取得
	function getInitData(type,_extra){
		var data = {
			type:type,
			id:getUID(type),
			date:0,
			hide:false,
			rect: {
				top: 0,
				left: 0,
				width: 30,
				height: 20,
				opacity: 1,
				rotate: 0,
				link : "",
				attr : "",
				class : "",
				style : ""
			},
			pixel: {
				top: 0,
				left: 0,
				width: 30,
				height: 20
			},
			data:{}
		};
		
		if(isRect(type)){
			data.data.color = '#000'
			data.data.border_color = '#000';
			data.data.border_size = '';
			data.data.round = '';
		}
		if(isLine(type)){
			data.data.color = '#000'
			data.data.arrow_w = '10'
			data.data.arrow_l = ''
			data.data.arrow_r = ''
		}
		if(isSVG(type)){
			data.data.svg = '<svg width="100%" height="100%" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path></svg>'
			data.data.color = '#000'
		}
		if(isImage(type)){
			if(_extra){
				data.data.src = CMS_PathFunc.treatRel(_extra.src);
				// data.data.src = _extra.src.split("../").join("");
			} else{
				data.data.src = 'width:200,height:140';
			}
			
			// data.data.image = 'width:200,height:140';
			// var sa = [
			// 	"images/img/about2_img_4.png",
			// 	"images/img/about3_img_sp.png",
			// 	"images/img/about3_img.png",
			// 	"images/img/airport_back.jpg",
			// 	"images/img/airport_img_1_sp.jpg",
			// 	"images/img/airport_img_1.jpg",
			// 	"images/img/airport_img_2_sp.jpg",
			// 	"images/img/airport_img_2.jpg",
			// 	"images/img/airport_img_3_sp.jpg",
			// 	"images/img/airport_img_3.jpg",
			// 	"images/img/airport_img_4_sp.jpg",
			// 	"images/img/airport_img_4.jpg",
			// 	"images/img/footer_arr_top.png",
			// 	"images/img/jumbotron_back_sp.jpg",
			// 	"images/img/jumbotron_back.jpg",
			// 	"images/img/jumbotron_campain_sp.png",
			// 	"images/img/jumbotron_campain.png"
			// ]
			// data.data.src = sa[Math.round(Math.random() * sa.length)];
			data.data.round = '';
		}
		if(isText(type,data)){
			if(_extra == "multi"){
				data.rect.width = 50;
				data.data.text = "サンプルのタイトル";
				data.data.size = "24px";
				data.data.line = "1.2";
			} else{
				data.rect.width = 50;
				data.data.text = "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。";
				data.data.size = "14px";
				data.data.line = "1.6";
			}
			data.data.color = "";
			data.data.align = "";
			data.data.font = "";
			data.data.bold = "";
			data.data.sdw = "";
			data.data.bmp = "";
		}
		if(isHTML(type,data)){
			data.data.html = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/rrHBFJUNiXk" frameborder="0" allowfullscreen></iframe>'
			data.data.preview = false;
		}
		return data;
	}
	
	/* ---------- ---------- ---------- */
	//inputへデータ設定
	function setInputValue(_data,in_){
		var type = _data.type;
		var __ = _data.data;
		if (isRect(type)) {
			in_.rect_color.val(__.color);
			in_.rect_border_color.val(__.border_color);
			in_.rect_border_size.val(__.border_size);
			in_.rect_round.val(__.round);
		}
		if (isLine(type)) {
			in_.line_color.val(__.color);
			in_.line_w.val(__.arrow_w);
			in_.line_l.val(__.arrow_l);
			in_.line_r.val(__.arrow_r);
		}
		if (isImage(type)) {
			var imgPath = CMS_Path.MEDIA.getImagePath( __.src , false );
			in_.image.val(__.src)
			in_.image_thumb.html('<img src="' + imgPath + '">');
			in_.image_path.html(__.src);
			in_.image_round.val(__.round);
			in_.image_ratio.val(__.ratio);
			//
			in_.image_fix.val(__.fix)
			in_.image_fix_on.hide()
			in_.image_fix_off.hide()
			if(__.fix){
				in_.image_fix_on.show()
			} else{
				in_.image_fix_off.show()
			}
		}
		if(isSVG(type))		{ 
			in_.svg.val(__.svg);
			in_.svg_color.val(__.color);
		}
		if (isText(type)) {
			in_.text.val(__.text)
			in_.text_size.val(__.size)
			in_.text_color.val(__.color)
			in_.text_align.val(__.align)
			in_.text_line.val(__.line)
			in_.text_font.val(__.font)
			in_.text_bold.val(__.bold)
			in_.text_sdw.val(__.sdw)
			in_.text_bmp.val(__.bmp)
			in_.text_bmp_on.hide()
			in_.text_bmp_off.hide()
			in_.em_box_inner.hide()
			if(__.bmp){
				in_.text_bmp_on.show()
				in_.em_box_inner.show()
			} else{
				in_.text_bmp_off.show()
			}
		}
		if (isLink(type)) {
			in_.meta.val(__.meta);
			// in_.link.val(__.link)
		}
		if (isHTML(type)) {
			in_.html.val(__.html)
			in_.html_preview.val(__.preview)
			in_.html_preview_on.hide()
			in_.html_preview_off.hide()
			if(__.preview){
				in_.html_preview_on.show()
			} else{
				in_.html_preview_off.show()
			}
		}
		return ImageMapExport.getHTML_item(_data,0);
	}
	
	/* ---------- ---------- ---------- */
	//inputからデータ取得
	function getInputValue(type,in_){
		var __ = {}
		if(isRect(type)){
			__.color = in_.rect_color.val();
			__.border_color = in_.rect_border_color.val();
			__.border_size = in_.rect_border_size.val();
			__.round = in_.rect_round.val();
		}
		if(isLine(type)){
			__.color = in_.line_color.val();
			__.arrow_w = in_.line_w.val();
			__.arrow_l = in_.line_l.val();
			__.arrow_r = in_.line_r.val();
		}
		if(isImage(type)){
			__.src = in_.image.val();
			__.round = in_.image_round.val();
			__.ratio = in_.image_ratio.val();
			__.fix = in_.image_fix.val();
		}
		if(isSVG(type)){
			__.svg = in_.svg.val();
			__.color = in_.svg_color.val();
		}
		if(isText(type)){
			__.text = in_.text.val();
			__.size = in_.text_size.val();
			__.color = in_.text_color.val();
			__.align = in_.text_align.val();
			__.line = in_.text_line.val();
			__.font = in_.text_font.val();
			__.bold = in_.text_bold.val();
			__.sdw = in_.text_sdw.val();
			__.bmp = in_.text_bmp.val();
		}
		if(isLink(type)){
			__.meta = in_.meta.val();
		}
		if(isHTML(type)){
			__.html = in_.html.val();
			__.preview = in_.html_preview.val();
		}
		return __;
	}
	
	/* ---------- ---------- ---------- */
	//レイヤー用データ
	function getLayerData(_data){
		var type = _data.type
		if(isRect(type)){
			return "四角" //+ '<div class="_sub">' + _data.rect.width +' * '+ _data.rect.height + '</div>'; 
		}
		if(isLine(type)){
			return "線" //+ '<div class="_sub">' + _data.rect.width +' * '+ _data.rect.height + '</div>'; 
		}
		if(isImage(type)){
			return "画像"+ '<div class="_sub">' + _data.data.src + '</div>'; 
		}
		if(isSVG(type)){
			return "SVG";
		}
		if(isText(type)){
			var s = CMS_TagU.tag_2_t(_data.data.text);
			if(s.length > 50){ s = s.substr(0,50) + "..."; }
			return "テキスト"+ '<div class="_sub">' + s + '</div>'; 
		}
		if(isLink(type)){
			var s = "";
			if(_data.rect.link){
				s += (_data.rect.link.href) ? _data.rect.link.href : "";
			}
			s += (_data.data.meta) ? _data.data.meta : "";
			return "リンク"+ '<div class="_sub">' + s + '</div>'; 
		}
		if(isHTML(type)){
			var s = CMS_TagU.tag_2_t(_data.data.html);
			if(s.length > 50){ s = s.substr(0,50) + "..."; }
			return "HTML"+ '<div class="_sub">' + s + '</div>'; 
		}
		return "--"
	}
	return {
		getUID:getUID,
		
		isRect:isRect,
		isLine:isLine,
		isImage:isImage,
		isSVG:isSVG,
		isText:isText,
		isLink:isLink,
		isHTML:isHTML,
		
		createItemView:createItemView,
		getInitData:getInitData,
		setInputValue:setInputValue,
		getInputValue:getInputValue,
		getLayerData:getLayerData
	}
})();

