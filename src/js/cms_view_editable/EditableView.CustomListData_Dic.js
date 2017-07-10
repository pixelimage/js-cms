
EditableView.CustomListData_Dic = (function(){ 

	var css = (function(){ 
		var _ = {}
	
		_.One = {
			base : (function(){ 
				var s ="";
					s += '#{ID} {\n';
					s += '	margin-bottom:5px;\n';
					s += '}\n';
					s += '#{ID} li {\n';
					s += '	margin:0 0 {LI_M} 0;\n';
					s += '	border-radius:5px;\n';
					s += '}\n';
					s += '#{ID} a {font-size:12px;}\n';
				return s;
			})()
		}
		
		_.T = {
			base : (function(){ 
				var s ="";
					s += '#{ID} {\n';
					s += '	margin-right:-{UL_MR};\n';
					s += '	margin-bottom:5px;\n';
					s += '}\n';
					s += '#{ID} li {\n';
					s += '	float:left;\n';
					s += '	width:{LI_W};\n';
					s += '	margin:0 {LI_M} {LI_M} 0;\n';
					s += '	border-radius:5px;\n';
					s += '}\n';
					s += '#{ID} a {font-size:12px;}\n';
				return s;
			})(),
			enclose : "",
			encloseA : (function(){ 
				var s ="";
					s += '#{ID} li{\n';
					s += '	background:#fff;\n';
					s += '	box-sizing: border-box;\n';
					s += '	border: 1px solid rgba(0,0,0,0.1);\n';
					s += '}\n';
					s += '#{ID} .inner{\n';
					s += '	padding:10px;\n';
					s += '}\n';
				return s;
			})(),
			encloseB : (function(){ 
				var s ="";
					s += '#{ID} li{\n';
					s += '	background:#333;\n';
					s += '	color:#fff;\n';
					s += '	box-sizing: border-box;\n';
					s += '}\n';
					s += '#{ID} .inner{\n';
					s += '	padding:10px;\n';
					s += '}\n';
				return s;
			})(),
			images : (function(){ 
				var s ="";
					s += '#{ID} .images {\n';
					s += '	margin:{IMG_M};\n';
					s += '{IMG_H}';
					s += '}\n';
					s += '#{ID} .images img {\n';
					s += '	width:100%;\n';
					s += '}\n';
				return s;
			})(),
			texts : (function(){ 
				var s ="";
					s += '#{ID} .texts {\n';
					s += '}\n';
				return s;
			})()
		}
		_.B = _.T;
		_.Z = JSON.parse(JSON.stringify(_.T));
		_.Z.images = ""
		_.Z.texts = ""
		
		_.I = JSON.parse(JSON.stringify(_.T));
		_.I.images = (function(){ 
				var s ="";
					s += '#{ID} .images {\n';
					s += '{IMG_H}';
					s += '}\n';
					s += '#{ID} .images img {\n';
					s += '	width:100%;\n';
					s += '}\n';
				return s;
			})()
		_.I.texts = ""
		
		_.L = {
			base : (function(){ 
				var s ="";
					s += '#{ID} {\n';
					s += '	margin-right:-{UL_MR};\n';
					s += '	margin-bottom:5px;\n';
					s += '}\n';
					s += '#{ID} li {\n';
					s += '	float:left;\n';
					s += '	width:{LI_W};\n';
					s += '	margin:0 {LI_M} {LI_M} 0;\n';
					s += '	border-radius:5px;\n';
					s += '}\n';
					s += '#{ID} a {font-size:12px;}\n';
				return s;
			})(),
			enclose : "",
			encloseA : (function(){ 
				var s ="";
					s += '#{ID} li{\n';
					s += '	background:#fff;\n';
					s += '	box-sizing: border-box;\n';
					s += '	border: 1px solid rgba(0,0,0,0.1);\n';
					s += '}\n';
					s += '#{ID} .inner{\n';
					s += '	padding:10px;\n';
					s += '}\n';
				return s;
			})(),
			encloseB : (function(){ 
				var s ="";
					s += '#{ID} li{\n';
					s += '	background:#333;\n';
					s += '	color:#fff;\n';
					s += '	box-sizing: border-box;\n';
					s += '}\n';
					s += '#{ID} .inner{\n';
					s += '	padding:10px;\n';
					s += '}\n';
				return s;
			})(),
			images : (function(){ 
				var s ="";
					s += '#{ID} .images {\n';
					s += '	float:left;\n';
					s += '	width:{IMG_W};\n';
					s += '	margin:{IMG_M};\n';
					s += '}\n';
					s += '#{ID} .images img {\n';
					s += '	width:100%;\n';
					s += '}\n';
				return s;
			})(),
			texts : (function(){ 
				var s ="";
					s += '#{ID} .texts {\n';
					s += '	margin:0 0 0 {TEXT_W};\n';
					s += '}\n';
				return s;
			})()
		}
		_.R = JSON.parse(JSON.stringify(_.L));
		_.R.images = (function(){ 
				var s ="";
					s += '#{ID} .images {\n';
					s += '	float:right;\n';
					s += '	width:{IMG_W};\n';
					s += '	margin:{IMG_M};\n';
					s += '{IMG_H}';
					s += '}\n';
					s += '#{ID} .images img {\n';
					s += '	width:100%;\n';
					s += '}\n';
				return s;
			})()
		_.R.texts = (function(){ 
				var s ="";
					s += '#{ID} .texts {\n';
					s += '	margin:0 {TEXT_W} 0 0;\n';
					s += '}\n';
				return s;
			})()
			
		_.LT = _.L;
		_.RT = _.R;
		
		_.LTF = JSON.parse(JSON.stringify(_.LT));
		_.LTF.images = (function(){ 
				var s ="";
					s += '#{ID} .images {\n';
					s += '	float:left;\n';
					s += '	width:{IMG_W};\n';
					s += '	margin:{IMG_M};\n';
					s += '{IMG_H}';
					s += '}\n';
					s += '#{ID} .images img {\n';
					s += '	width:100%;\n';
					s += '}\n';
					return s;
			})();
		_.LTF.texts = ""
		
		_.RTF = JSON.parse(JSON.stringify(_.LTF));
		_.RTF.images = (function(){ 
				var s ="";
					s += '#{ID} .images {\n';
					s += '	float:right;\n';
					s += '	width:{IMG_W};\n';
					s += '	margin:{IMG_M};\n';
					s += '{IMG_H}';
					s += '}\n';
					s += '#{ID} .images img {\n';
					s += '	width:100%;\n';
					s += '}\n';
				return s;
			})()
		_.RTF.texts = ""
		
		/* ---------- ---------- ---------- */
		
		_.designA = {
			t1 : (function(){ 
				var s ="";
					s += '#{ID} .t1 {\n';
					s += '	font-size:14px;\n';
					s += '	line-height:1.2;\n';
					s += '	font-weight:bold;\n';
					s += '	border-bottom: 2px solid #888;\n';
					s += '	margin:0 0 10px 0;\n';
					s += '	padding:5px 0 5px 0;\n';
					s += '}\n';
				return s;
			})(),
			t2 : (function(){ 
				var s ="";
					s += '#{ID} .t2 {\n';
					s += '	font-size:12px;\n';
					s += '	line-height:1.6;\n';
					s += '	margin:0 0 5px 0;\n';
					s += '}\n';
				return s;
			})(),
			t3 : (function(){ 
				var s ="";
					s += '#{ID} .t3 {\n';
					s += '	font-size:10px;\n';
					s += '	line-height:1.6;\n';
					s += '	color:#888;\n';
					s += '	margin:0 0 5px 0;\n';
					s += '}\n';
				return s;
			})()
		}
		_.designB = {
			t1 : (function(){ 
				var s ="";
					s += '#{ID} .t1 {\n';
					s += '	font-size:12px;\n';
					s += '	line-height:1.2;\n';
					s += '	font-weight:bold;\n';
					s += '	background:#333;\n';
					s += '	color:#fff;\n';
					s += '	padding:6px 2px 3px 2px;\n';
					s += '	margin:0 0 10px 0;\n';
					s += '	text-align:center;\n';
					s += '}\n';
				return s;
			})()
		}
		_.designB.t2 = _.designA.t2;
		_.designB.t3 = _.designA.t3;
		
		//
		_.res = (function(){ 
			var s ="\n";
				s += '@media screen and (max-width: 480px) {\n';
				s += '	#{ID} ul {\n';
				s += '		margin-right:auto;\n';
				s += '	}\n';
				s += '	#{ID} li {\n';
				s += '		float:none;\n';
				s += '		width:auto;\n';
				s += '		margin:0 0 20px 0;\n';
				s += '	}\n';
				s += '	#{ID} .images{\n';
				s += '		max-height:none;\n';
				s += '	}\n';
				s += '}\n';
			return s;
		})();
		return _;
	})();
	
	var html = (function(){ 
		var _ = {}
		_.ul = {}
		_.ul.start = (function(){ 
			var tag = "";
				// tag += '<div id="{ID}">\n';
				tag += '<ul id="{ID}" class="{UL_CLEARFIX}{COMMONH}">\n';
				tag += '{REPEAT_START}\n';
			return tag;
		})();
		_.ul.startOne = (function(){ 
			var tag = "";
				// tag += '<div id="{ID}">\n';
				tag += '<ul id="{ID}" class="">\n';
				tag += '{REPEAT_START}\n';
			return tag;
		})();
		_.ul.end = (function(){ 
			var tag = "";
				tag += '{REPEAT_END}\n';
				tag += '</ul>\n';
				// tag += '</div>\n';
			return tag;
		})();
		
		/* ---------- ---------- ---------- */
	
		_.li = {}
		_.li.start = (function(){ 
			var tag = "";
			// tag += '	<li {LINK}>\n';
			tag += '	<li class="cms-blocklink">\n';
			tag += '		<div class="inner clearfix">\n';
			return tag;
		})();
		_.li.end = (function(){ 
			var tag = "";
			tag += '		{LINK}\n';
			tag += '		</div>\n';
			tag += '	</li>\n';
			return tag;
		})();
		
		/* ---------- ---------- ---------- */
	
		_.Z = {
			title :"",
			images : "",
			texts : (function(){ 
				var tag = "";
					tag += '			<p class="t1">{1}</p>\n';
					tag += '			<p class="t2">{2}</p>\n';
					tag += '			<p class="t3">{3}</p>\n';
				return tag;
			})()
		}
	
		_.I = {
			title :"",
			images : (function(){ 
				var tag = "";
					tag += '			<div class="images">\n';
					tag += '				{IMG}\n';
					tag += '			</div>\n';
				return tag;
			})(),
			texts :""
		}
	
		_.T = {
			title :"",
			images : (function(){ 
				var tag = "";
					tag += '			<div class="images">\n';
					tag += '				{IMG}\n';
					tag += '			</div>\n';
				return tag;
			})(),
			texts : (function(){ 
				var tag = "";
					tag += '			<div class="texts">\n';
					tag += '				<p class="t1">{1}</p>\n';
					tag += '				<p class="t2">{2}</p>\n';
					tag += '				<p class="t3">{3}</p>\n';
					tag += '			</div>\n';
				return tag;
			})()
		}
		_.B = _.T;
		_.L = _.T;
		_.R = _.T;
		_.RT = {
			title : (function(){ 
				var tag = "";
					tag += '			<p class="t1">{1}</p>\n'
				return tag;
			})(),
			images : (function(){ 
				var tag = "";
					tag += '			<div class="images">\n';
					tag += '				{IMG}\n';
					tag += '			</div>\n';
				return tag;
			})(),
			texts : (function(){ 
				var tag = "";
					tag += '			<div class="texts">\n';
					tag += '				<p class="t2">{2}</p>\n';
					tag += '				<p class="t3">{3}</p>\n';
					tag += '			</div>\n';
				return tag;
			})()
		}
		_.LT = _.RT;
		_.LTF = _.RT;
		_.RTF = _.RT;
		return _;
	})();
		
	return {
		html:html,
		css:css
	}
})();
