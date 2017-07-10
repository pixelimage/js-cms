
var GadgetListView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#GadgetListView');
		stageInit();
		//stageIn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(GadgetListView,view);
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("block/gadget","_BASE_")+'</div>'
			tag += '<div class="_title">ガジェットブロックなど</div>'
		v.header.html(tag);
		
		var tag = ""
		tag += '<div class="_tabs">'
		tag += '	<div class="_tt">組込み<br>ブロック</div>'
		tag += '	<div class="_tab" data-no="0">ガジェット<span>ブロック</span></div>'
		tag += '	<div class="_tab" data-no="1">カスタムリスト<span>ブロック</span></div>'
		tag += '	<div class="_tab" data-no="2">Myタグ<span>ブロック</span></div>'
		tag += '	<div class="_tab" data-no="3">データ<span>ブロック</span></div>'
		tag += '	<div class="_tab" data-no="4" style="float:right;margin-right:20px;">オリジナル<span>ブロック</span></div>'
		tag += '</div>'
		tag += '<div class="_gad_blocks">'
		
		/* ---------- ---------- ---------- */
		
		var list =  [
			["news"			,"object.news"],
			["newsB"		,"object.newsB"],
			["tab"			,"object.tabList"],
			["qa"			,"object.dl"],
			["talk"			,"object.talk"],
			
			["share"		,"object.share"],
			["slide"		,"object.photos"],
			["slide2"		,"object.slides"],
			["carrousel"	,"object.carrousel"],
			["pagenation"	,"object.pagenation"],
			["feed"			,"object.feed"],
			["formmail"		,"object.formMail"],
			["pageLink"		,"object.pageLink"]
		];
		tag += '<div class="_gad_block">'
		tag += '<div class="_read">スライダーやニュースなどの、便利なブロックです。</div>'
		for (var i = 0; i < list.length ; i++) {
			if(list[i][1] == ""){
				tag +='<br>'
			} else{
				tag +='<div class="_cms_btn_alpha ss_gadget _'+list[i][0]+'" data="'+list[i][1]+'"></div>'
			}
		}
		tag += "</div>"
		
		/* ---------- ---------- ---------- */
	
		tag += '<div class="_gad_block">'
		
		tag += '<table>'
		tag += '	<tr>'
		tag += '		<th><div class=" ss_gadget _repeat"></div></th>'
		tag += '		<td>'
		tag += '			<div class="_read">カスタムリストブロックを追加します。</div>'
		tag += '			<div class="_read">以下のプリセットからも追加できます。<br>　　<i class="fa fa-arrow-down "></i> </div>'
		tag += '		</td>'
		tag += '	</tr>'
		tag += '</table>'
		tag += '	<div class="_repeat_area">';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _T_01" data-id="T_01"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _T_02" data-id="T_02"></div>';
		
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _B_01" data-id="B_01"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _B_02" data-id="B_02"></div>';
		
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _Z_01" data-id="Z_01"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _Z_02" data-id="Z_02"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _Z_03" data-id="Z_03"></div>';
		
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _I_01" data-id="I_01"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _I_02" data-id="I_02"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _I_03" data-id="I_03"></div>';
		
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _L_01" data-id="L_01"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _L_02" data-id="L_02"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _L_03" data-id="L_03"></div>';
		
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _R_01" data-id="R_01"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _R_02" data-id="R_02"></div>';
		tag += '	<div class="_cms_btn_alphaS ss_preset_temp _R_03" data-id="R_03"></div>';
		tag += '	</div>';
		tag += "</div>"
		
		/* ---------- ---------- ---------- */
		//Myタグ定義ブロック
		
		var list =  [
			["replace_div"		,"replace.div"],
			["replace_text"		,"object.replaceTexts"]
		]
		
		tag += '<div class="_gad_block">'
		tag += '<div class="_read">Myタグを定義するブロックと、Myタグ関連のブロックです。</div>'
		tag += '<div class="_read"><b>● Myタグ定義</b></div>'
		for (var i = 0; i < list.length ; i++) {
			tag +='<div class="_cms_btn_alpha ss_gadget _'+list[i][0]+'" data="'+list[i][1]+'"></div>'
		}
		var list =  [
			["js"				,"tag.js"],
			["tree"				,"object.tree"],
		]
		tag += '<div class="_read"><b>● Myタグ内に配置するブロック</b></div>'
		for (var i = 0; i < list.length ; i++) {
			tag +='<div class="_cms_btn_alpha ss_gadget _'+list[i][0]+'" data="'+list[i][1]+'"></div>'
		}
		var list =  [
			["hina"				,"object.hinagata"]
		]
		tag += '<div class="_read"><b>● Myタグを利用するブロック</b></div>'
		for (var i = 0; i < list.length ; i++) {
			tag +='<div class="_cms_btn_alpha ss_gadget _'+list[i][0]+'" data="'+list[i][1]+'"></div>'
		}
		tag += "</div>"
			
		/* ---------- ---------- ---------- */
		//データブロック
		
		var list  =  [
			["csv"			,"object.data_csv"],
			["json"			,"object.data_json"],
			["xml"			,"object.data_xml"],
			["rss"			,"object.data_rss"],
			["text"			,"object.data_text"]
		];
		tag += '<div class="_gad_block">'
		tag += '<div class="_read">外部データファイル作成用のブロックで、ブロック情報パネルから書き出します。</div>'
		for (var i = 0; i < list.length ; i++) {
			if(list[i][1] == ""){
				tag +='<br>'
			} else{
				tag +='<div class="_cms_btn_alpha ss_gadget _'+list[i][0]+'" data="'+list[i][1]+'"></div>'
			}
		}
		tag += "</div>"
		
		/* ---------- ---------- ---------- */
		
		var list = PageElement_DIC;
		tag += '<div class="_gad_block">'
		tag += '<div class="_read">CMS組込みブロック以外に、独自に追加したブロックの一覧です。</div>'
		tag += '<div class="_read">/_cms/js/cms.free.jsで定義します。</div>'
		for (var i = 0; i < list.length ; i++) {
			if(list[i].custom){
				tag +='<div class="_cms_btn_alpha _btn_custom" data="'+list[i].type+'">'
				tag +='<div class="_t1">' + list[i].name + '</div>';
				tag +='<div class="_t2">' + list[i].name2 + '</div>';
				tag +='</div>';
			}
		}
		tag += "</div>"
		
		
		/* ---------- ---------- ---------- */
		
		tag += "</div>"
		
		v.body.html(tag); 

			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		v.gad_block = view.find("._gad_block"); 
		
		v.tab = view.find("._tab"); 
		v.tab.click(function(){ 
			var no = $(this).data("no");
			openTab(no);
		});
		
		view.find("._cms_btn_alpha").click(function(){ 
			var type = $(this).attr("data");
			callback(type);
			stageOut();
		});
		
		view.find('.ss_preset_temp').click(function(){
			addPreset($(this).data("id"))
		});
		
		setBtn();
		openTab(0);
		
	}
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
	}
	
	/* ---------- ---------- ---------- */
	
	function openTab(_n){
		v.tab.removeClass("_current").eq(_n).addClass("_current");
		v.gad_block.hide().eq(_n).show();
	}
	
	/* ---------- ---------- ---------- */
	
	var presets = {
			// param.g = 3-1;//絡む
			// param.w = 0;//枠+背景
			// param.l = 2;//レイアウト
			// param.d = 2;//デザイン
			// param.ww = 1;
		T_01:{ g: 3-1, w: 0, l: 0, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		T_02:{ g: 4-1, w: 0, l: 0, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		
		B_01:{ g: 3-1, w: 0, l: 1, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		B_02:{ g: 4-1, w: 0, l: 1, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		
		Z_01:{ g: 1-1, w: 0, l: 4, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 25 },
		Z_02:{ g: 2-1, w: 0, l: 4, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		Z_03:{ g: 3-1, w: 0, l: 4, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		
		I_01:{ g: 2-1, w: 0, l: 5, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 240, t_m_p: 1, t_iw_p: 25 },
		I_02:{ g: 3-1, w: 0, l: 5, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 150, t_m_p: 1, t_iw_p: 50 },
		I_03:{ g: 4-1, w: 0, l: 5, d: 0, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		
		L_01:{ g: 1-1, w: 0, l: 2, d: 2, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 25 },
		L_02:{ g: 2-1, w: 0, l: 2, d: 2, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		L_03:{ g: 3-1, w: 0, l: 2, d: 2, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		
		R_01:{ g: 1-1, w: 0, l: 3, d: 2, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 25 },
		R_02:{ g: 2-1, w: 0, l: 3, d: 2, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 },
		R_03:{ g: 3-1, w: 0, l: 3, d: 2, ww: 1, t_ww: 720, t_m: 10, t_iw: 80,t_ih: 120, t_m_p: 1, t_iw_p: 50 }
	};
	
	function addPreset(_id){
		if(_id == undefined)return;
		
		var param = presets[_id];
		var codes = EditableView.CustomListData.getCodes(param);
		
		var grid = (function(g){ 
			if(g == 0 ) g= 1;
				g +=1;
			var a = []
			for (var i = 0; i <  g ; i++) {
				a.push(sampleData[i])
			}
			return a;
		})(param.g);
		
		var _id = "list_" + DateUtil.getRandamCharas(3);
		
		var obj = JSON.parse(JSON.stringify(tempData))
			obj.data.list.grid = grid;
			obj.data.template = [_id, codes.html, codes.css, param ];
		
		callback("_repeat",obj);
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	var defImage = { mode:"simple" , path: "width:200,height:133", width: "100%", ratio: "3:2" }
	
	var sampleData = [
		{
			publicData: "1",
			// image: "images/20120129_130222.jpg",
			image: defImage,
			ratio: "3:2",
			a1: "タイトル1",
			a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			anchor: "",
		},
		{
			publicData: "1",
			// image: "images/IMG_0509.jpg",
			image: defImage,
			ratio: "3:2",
			a1: "タイトル2",
			a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			anchor: "",
		},
		{
			publicData: "1",
			// image: "images/IMG_0627.jpg",
			image: defImage,
			ratio: "3:2",
			a1: "タイトル3",
			a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			anchor: "",
		},
		{
			publicData: "1",
			image: defImage,
			ratio: "3:2",
			a1: "タイトル4",
			a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			anchor: "",
		},
		{
			publicData: "1",
			image: "width:200,height:140,color:#888",
			ratio: "3:2",
			a1: "タイトル5",
			a2: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			a3: "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。",
			anchor: "",
		}
	]
	var tempData = {
		type: "object.repeat",
		data: {
			list: {
				texts: {},
				grid: []
			},
			template: ["","",""]
		},
		attr: {}
	}
	/* ---------- ---------- ---------- */
	
	
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback
	function stageIn(_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	function resize(){
		if(isOpen){
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize }
})();//modal

