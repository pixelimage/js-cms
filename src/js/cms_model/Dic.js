
var SS 			 = (function(){ 
	var o = {}
		o.repID  = "color:#4A66A0;font-size:12px;font-weight:bold;";
		o.repID20  = "color:#4A66A0;font-size:16px;font-weight:bold;width:200px;";
		o.memo 	 = "color:#999;font-size:12px;";
		o.multiDef  = "width:600px;height:100px;";
		o.w50 	 = "width:50px;";
		o.w100 	 = "width:100px;";
		o.w150 	 = "width:150px;";
		o.w200 	 = "width:200px;";
		o.w300 	 = "width:300px;";
		o.w400 	 = "width:400px;";
		o.w500 	 = "width:500px;";
		o.w600 	 = "width:600px;";
		o.w300h50  = "width:300px;height:50px;";
		o.w300h100  = "width:300px;height:100px;";
		o.w300h200  = "width:300px;height:200px;";
		o.w400h50  = "width:400px;height:50px;";
		o.w400h100  = "width:400px;height:100px;";
		o.w400h200  = "width:400px;height:200px;";
		o.w600h50  = "width:600px;height:50px;";
		o.w600h100  = "width:600px;height:100px;";
		o.w600h200  = "width:600px;height:200px;";
		o.w600h50  = "width:600px;height:50px;";
		o.w600h100  = "width:600px;height:100px;";
		o.w600h200  = "width:600px;height:200px;";
		o.w800 	 = "width:800px;";
		o.w800h50  = "width:800px;height:50px;";
		o.w800h100  = "width:800px;height:100px;";
		o.w800h200  = "width:800px;height:200px;";
		o.img80  = "width:80px;height:80px;overflow:scroll";
		o.img50p  = "max-width:300px;";
		o.html 	 = "color:#888;font-weight:bold;";
		o.js 	 = "color:#B20000;";
		o.css 	 = "color:#003ca4;";
		
		o.SelectVals = {
			pub 		: [["公開","公開"], ["非公開","非公開"]],
			linkTarget 	: [["_self","同一ウィンドウ"], ["_blank","別ウィンドウ"]],
			YN 			: [["1","YES"], ["0","NO"]],
			TRBL 		: [["top","上に配置"],["right","右に配置"],["bottom","下に配置"],["left","左に配置"]]
		}
	return o;
})();

var PageElement_DIC = []
window.PageElement_DIC = PageElement_DIC;


var CELL_TYPE = {}
	CELL_TYPE.SINGLE = "single";
	CELL_TYPE.MULTI = "multi";
	CELL_TYPE.MULTI_JS = "multi,js"
	CELL_TYPE.MULTI_STYLE = "multi,style"
	CELL_TYPE.MULTI_HTML = "multi,html"
	CELL_TYPE.TABLE = "table"
	CELL_TYPE.SELECT = "select";
	CELL_TYPE.CHECK = "checkbox";
	CELL_TYPE.IMAGE = "image";
	CELL_TYPE.ANCHOR = "anchor";
	CELL_TYPE.BTN = "textAnchor";
	CELL_TYPE.YYYYMMDD = "yyyymmdd";
	CELL_TYPE.STATE = "_state";