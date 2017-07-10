EditableView.CustomListData = (function(){
	function getPreset(){
		var param = {}
			param.g = 3-1;//絡む
			param.w = 0;//枠+背景
		
			param.l = 2;//レイアウト
			param.d = 2;//デザイン
			param.ww = 1;
		
			param.t_ww = 720;
			param.t_m = 10;
			param.t_iw = 80;
			param.t_ih = 120;
			param.t_m_p = 1;
			param.t_iw_p = 50;
		return param;
	}
	
	var _param = (function() {
		/* ---------- ---------- ---------- */
		var c = function() {
		  this.init();
		}
		var p = c.prototype;
		/* ---------- ---------- ---------- */
		
		p.init = function() {
			//レイアウト種類
			this.type = "T";//TBLR
			this.design = "designA";//TBLR
			
			//LRの場合
			this.img_width = "100px";//TB
			// this.img_height = "120px";//TB
			
			this.width = "720px";
			this.devide = "3";
			this.margin = "15px";
			
			//レスポンシブ
			this.responsive = false;
			
			//枠あり
			this.enclose = "";
		}
		return c;
	})();
	function getCodes(param){
		var param;
		
		var isFix = (param.ww == 0) ? true:false;
		var o = new _param();
			
			if(param.l == 0){
				if(param.d == 0) { o.type = "T"; o.design = "designA" }
				if(param.d == 1) { o.type = "T"; o.design = "designA" }
				if(param.d == 2) { o.type = "T"; o.design = "designA" }
				if(param.d == 3) { o.type = "T"; o.design = "designB" }
				if(param.d == 4) { o.type = "T"; o.design = "designB" }
				if(param.d == 5) { o.type = "T"; o.design = "designB" }
			}
			
			if(param.l == 1){
				if(param.d == 0) { o.type = "B"; o.design = "designA" }
				if(param.d == 1) { o.type = "B"; o.design = "designA" }
				if(param.d == 2) { o.type = "B"; o.design = "designA" }
				if(param.d == 3) { o.type = "B"; o.design = "designB" }
				if(param.d == 4) { o.type = "B"; o.design = "designB" }
				if(param.d == 5) { o.type = "B"; o.design = "designB" }
			}
			if(param.l == 2){
				if(param.d == 0) { o.type = "L"; 	o.design = "designA" }
				if(param.d == 1) { o.type = "LT"; 	o.design = "designA" }
				if(param.d == 2) { o.type = "LTF"; o.design = "designA" }
				if(param.d == 3) { o.type = "L"; 	o.design = "designB" }
				if(param.d == 4) { o.type = "LT"; 	o.design = "designB" }
				if(param.d == 5) { o.type = "LTF"; o.design = "designB" }
			}
			if(param.l == 3){
				if(param.d == 0) { o.type = "R"; 	o.design = "designA" }
				if(param.d == 1) { o.type = "RT"; 	o.design = "designA" }
				if(param.d == 2) { o.type = "RTF"; o.design = "designA" }
				if(param.d == 3) { o.type = "R"; 	o.design = "designB" }
				if(param.d == 4) { o.type = "RT"; 	o.design = "designB" }
				if(param.d == 5) { o.type = "RTF"; o.design = "designB" }
			}
			if(param.l == 4){
				if(param.d == 0) { o.type = "Z"; 	o.design = "designA" }
				if(param.d == 1) { o.type = "Z"; 	o.design = "designA" }
				if(param.d == 2) { o.type = "Z"; 	o.design = "designA" }
				if(param.d == 3) { o.type = "Z"; 	o.design = "designB" }
				if(param.d == 4) { o.type = "Z"; 	o.design = "designB" }
				if(param.d == 5) { o.type = "Z"; 	o.design = "designB" }
			}
			if(param.l == 5){
				if(param.d == 0) { o.type = "I"; 	o.design = "designA" }
				if(param.d == 1) { o.type = "I"; 	o.design = "designA" }
				if(param.d == 2) { o.type = "I"; 	o.design = "designA" }
				if(param.d == 3) { o.type = "I"; 	o.design = "designA" }
				if(param.d == 4) { o.type = "I"; 	o.design = "designA" }
				if(param.d == 5) { o.type = "I"; 	o.design = "designA" }
			}
			//
			if(isFix){
				o.width = param.t_ww + "px";
				o.margin = param.t_m + "px";
				o.img_width = param.t_iw + "px";
			} else{
				o.width = "100%";
				o.margin = param.t_m_p + "%";
				o.img_width = param.t_iw_p + "%";
			}
			// o.img_height = (param.t_ih != undefined) ? param.t_ih + "px" :"";
			o.devide = param.g + 1;
			o.enclose = (function(_n){ 
				var a = ["","A","B"];
			    return a[_n];
			})(param.w);
		
		
		return EditableView.CustomListData2.getCode(o);
	}
	return { getCodes:getCodes }
})();

EditableView.CustomListData2 = (function() {
	var view;
	var v = {};

	function get_design(_s) {
		return _s;
	}
	function get_isFix(_w) {
		if(_w.indexOf("px") != -1) {
			return true;
		} else{
			return false;
		}
	}
	function get_unit(_f) {
		return (_f) ? "px" :"%";
	}
	function get_li_devide(_d) {
		if(_d == undefined) return 2;
	    return Number(_d);
	}
	function get_li_margin(_m) {
		var m = _m;
			m = m.split("px").join("");
			m = m.split("%").join("");
		return Number(m);
	}
	function get_li_width(_w,_isFix,_margin,_devide) {
		var w = _w;
			w = w.split("px").join("");
			w = w.split("%").join("");
		if(_isFix) {
			var w2 = (w - (_margin * (_devide - 1)));
		    return Math.floor(w2 / _devide);
		} else{
			var w2 = ( w - (_margin * _devide));
		    return Math.floor(w2 / _devide);
		}
	}

	function getCodeHTML(_temp,_param) {
		var type = _param.type
		
		var start = _temp.ul.start
		if(_param.li_devide == 1){
			start = _temp.ul.startOne
		}
		
		var a = [];
			a.push(start);
				a.push(_temp.li.start);
				a.push(_temp[type].title);
				if(type == "B"){
					a.push(_temp[type].texts);
					a.push(_temp[type].images);
				} else{
					a.push(_temp[type].images);
					a.push(_temp[type].texts);
				}
				a.push(_temp.li.end);
			a.push(_temp.ul.end);
		var html =  a.join("");
			html = html.split("{UL_CLEARFIX}").join(" clearfix");
			html = html.split("{COMMONH}").join(" commonHeight");
		
		return html;
	}
	function getCodeCSS(_temp,_param) {
		var type = _param.type;
		var design = _param.design;
		
		var extra = "";
		if(_temp[type][design]){
			if(_temp[type][design].extra){
				extra = _temp[type][design].extra;
			}
		}
		var enclose = "";
		if(_param.enclose){
			if(_temp[type]["enclose" + _param.enclose]){
				enclose = _temp[type]["enclose" + _param.enclose];
			}
		}
		var base = _temp[type].base
		if(_param.li_devide == 1){
			base = _temp["One"].base
		}
		
		var a = [];
			// _temp[One].base
			a.push(base);
			a.push(enclose);
			a.push(_temp[type].images);
			a.push(_temp[type].texts);
			a.push(extra);
			a.push(_temp[design].t1);
			a.push(_temp[design].t2);
			a.push(_temp[design].t3);
			a.push(_temp.res);
			
		var u = _param.unit;
		var css =  a.join("");
			css = css.split("{UL_MR}"	).join(_param.ul_marginR + u);
			css = css.split("{LI_W}"	).join(_param.li_width + u);
			css = css.split("{LI_M}"	).join(_param.li_margin + u);
			css = css.split("{IMG_W}"	).join(_param.img_width + u);
			css = css.split("{TEXT_W}"	).join(_param.text_margin + u);
			// css = css.split("{IMG_H}"	).join(_param.img_h);
			css = css.split("{IMG_H}"	).join("");
			css = css.split("{IMG_M}"	).join(_param.img_m);

		return css;
	}
	
	function get_ul_marginR(_isFix,_w,_m,_d) {
		if(_isFix){
			return 20;
		} else{
			return 100 - ((_w * _d) + (_m * (_d - 1)));
		}
	}
	function get_img_width(_w) {
		var w = _w;
			w = w.split("px").join("");
			w = w.split("%").join("");
		return Number(w);
	}
	// function get_img_height(_h) {
	// 	var h = _h;
	// 		h = h.split("px").join("");
	// 		h = h.split("%").join("");
	// 	return Number(h);
	// }
	function get_text_margin(_isFix,_w) {
		var w = _w;
			w = w.split("px").join("");
			w = w.split("%").join("");
		var ww = Number(w);
		if(_isFix){
			return ww + 10;
		} else {
			return ww + 3;
		}
	}
	// function get_img_h(_type,_h) {
	// 	if(_h == undefined) return ""
	// 	if(_h == "") return ""
	// 		var s = "";
	// 			s += '	max-height:'+_h+'px;\n';
	// 			s += '	overflow:hidden;\n';
	// 		return s;

	// }
	function get_img_m(_type,_enclose) {
		var s = "0 0 10px 0";
		if(_type == "LTF") s = "0 5px 10px 0";
		if(_type == "RTF") s = "0 0 10px 5px";
		if(_type == "T") {
			if(_enclose != 0){
				s = "-10px -10px 10px -10px";
			}
		}
		if(_type == "B") {
			if(_enclose != 0){
				s = "10px -10px -10px -10px";
			}
		}
		return s;
	}
	
	function getCode(_in) {
		var p = {}
			p.type	 	 = _in.type;
			p.design	  = get_design(_in.design);
			p.isFix 	 = get_isFix(_in.width);
			p.unit 		 = get_unit(p.isFix);
			p.enclose 	 = _in.enclose;
			p.li_devide  = get_li_devide(_in.devide);
			p.li_margin  = get_li_margin(_in.margin);
			p.li_width 	 = get_li_width(_in.width, p.isFix, p.li_margin, p.li_devide);
			p.ul_marginR  = get_ul_marginR(p.isFix,p.li_width, p.li_margin, p.li_devide);
			p.img_width  = get_img_width(_in.img_width);
			// p.img_height  = get_img_height(_in.img_height);
			p.text_margin  = get_text_margin(p.isFix,_in.img_width);
			// p.img_h 	 = get_img_h(p.type,p.img_height);
			p.img_m 	 = get_img_m(p.type,p.enclose);
			
		var code = EditableView.CustomListData_Dic;
		var html  = getCodeHTML(code.html,p);
		var css  = getCodeCSS(code.css,p);
		
		return {
			css:css,
			html:html
		}
	}
	return {
		getCode: getCode 
	}
})();
