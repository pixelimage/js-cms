
PageElement.object.pagenation = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.pagenation", 
		name	: "ページネーション",
		name2	: "",
		inputs	: ["DETAIL"]
	});

	/* ---------- ---------- ---------- */
// 数値 (1 2 3 ...)
// 点 ( ● ○ ○ ... )


	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "ページネーション",
				note 	: "<UL><LI>"
			}),
			textData:{
				info:new PageModel.OG_SubInfo({ 
					name:"設定",
					note:"",
					image: "" 
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "target",
						name: "ターゲットリスト<br>( jQueryセレクタ )",
						type: CELL_TYPE.SINGLE,
						style: SS.w200,
						view: "",
						def: "#targetID"
					}),
					new PageModel.OG_Cell({
						id: "max",
						name: "1ページあたりの件数",
						type: CELL_TYPE.SINGLE,
						style: SS.w50,
						view: "",
						def: "5"
					}),
					new PageModel.OG_Cell({
						id: "label_back",
						name: "戻るボタンラベル",
						type: CELL_TYPE.SINGLE,
						style: SS.w200,
						view: "",
						def: "&lt; PREV"
					}),
					new PageModel.OG_Cell({
						id: "label_next",
						name: "進むボタンラベル",
						type: CELL_TYPE.SINGLE,
						style: SS.w200,
						view: "",
						def: "NEXT &gt;"
					}),
					new PageModel.OG_Cell({
						id:"listType",	
						name:"リストタイプ",
						type:CELL_TYPE.SELECT , 
						vals:[
							["0","数値リスト値 (1 2 3 ...)","0"],
							["1","ドットリスト ( ● ○ ○ ... )","1"],
							["2","カスタムリスト ( はじめに,1ページ目,2ページ目 ... )","2"]
						],
						view:"",
						def:"0",
						note:""
					}),
					new PageModel.OG_Cell({
						id: "listTypeCustom",
						name: "カスタムリストの値",
						type: CELL_TYPE.SINGLE,
						style: SS.w200,
						view: "",
						def: "",
						note:"リストタイプで、カスタムリストを選択した場合に入力して下さい。値はカンマで区切ってください。<br>例) [ はじめに,1ページ目,2ページ目 ]"
					}),				
					new PageModel.OG_Cell({
						id: "isJumpToTop",
						name: "クリック時に、<br>ページトップに移動するか",
						type: CELL_TYPE.CHECK,
						style: "",
						view: "",
						def: "1"
					})
				]
			},
			gridData:null
		})
	]
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = {
			setting: {
				texts: {
					target: "#targetID",
					max: "5",
					label_back: "&lt; PREV",
					label_next: "NEXT &gt;",
					isJumpToTop: ""
				},
				grid: []
			}
		}
		o.attr = {css:"",style:""};
		return o;
	}
	
	/* ---------- ---------- ---------- */

	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var tag = "";
		var target = data.setting.texts.target;
		var max = data.setting.texts.max;
		
		// new CMS_PagenationView(
		// 	$('#imageList > *'),
		// 	$('#pager'),
		// 	{ max:3, initPage:0 }
		// );
		
		//if(gridHasNoData(data)){
		// if(list.length == 0){
		// 	tag += '<span class="_no-input-data">表データを入力...</span>'
		// } else{
			attr = attr.split('class="').join('class=" ')
			tag += '<div '+attr+'>'
			tag += '<div class="_cms_preview">'
			tag += '<div class="_title">ガジェット / ページネーション</div>'
			tag += '<div class="_notes">※この要素の表示は、プレビューページか、公開サイトで確認してください。</div>';
			tag += '<p>ターゲットセレクタ:' + target + '</p>';
			tag += '</div>'
		// }
		
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		function createID(_s){
			_s = _s.split(" ").join("_")
			_s = _s.split(">").join("gt")
			_s = _s.split("*").join("asta")
			_s = _s.match(/[A-Za-z0-9_]/g).join("");
			return _s;
		}
		
		var setting = data.setting;
		// var uid ="_pager_"+ createID(target);
		var tag = ""
			tag += '<div class="cms-pagenation" ' + _getJSONAttr(setting) + '></div>\n'
			tag += "<script>\n";
			tag += '$(function(){\n';
			tag += '	$(".cms-pagenation").cms_pagenation();\n';
			tag += '});\n';
			tag += '</script>\n';
		return tag;
	}
	
	function _getJSONAttr(_s){
		var _num = NumberU.defaultNumber;
		var param = {}
			param.target 		= _s.texts.target;
			param.max 			= _num(_s.texts.max);
			param.label_back 	= defaultVal(_s.texts.label_back,"");
			param.label_next 	= defaultVal(_s.texts.label_next,"");
			param.listType 		= defaultVal(_s.texts.listType,"0");
			param.listTypeCustom = defaultVal(_s.texts.listTypeCustom,"");
			param.isJumpToTop 	=  (_s.texts.isJumpToTop == "1") ? true:false;
			
		var s = '{}';
		try{
		  s = JSON.stringify(param);
		}catch( e ){}
		return " data-json='" + s + "' ";
	}

	
	/* ---------- ---------- ---------- */

    return _;
})();

