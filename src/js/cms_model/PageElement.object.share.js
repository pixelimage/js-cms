
PageElement.object.share = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.share", 
			name	: "シェアボタン",
			name2	: "",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[シェアボタンブロック]"}
		cssDef	: {selector:".cms-socials"}
	});

	/* ---------- ---------- ---------- */

	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "list",
				name	: "シェアボタン",
				note 	: ""
			}),
			textData:{
				info:new PageModel.OG_SubInfo({
					name: "ボタンの種類",
					note: ""
				}),
				cells:[
					 new PageModel.OG_Cell( {
						id:"facebook_share", 
						name:"Facebook シェアボタン", 
						type:CELL_TYPE.CHECK , 
						def:"1" 
					}),
					 new PageModel.OG_Cell( {
						id:"facebook", 
						name:"Facebook いいねボタン", 
						type:CELL_TYPE.CHECK , 
						def:"1" 
					}),
					 new PageModel.OG_Cell( {
						id:"twitter", 
						name:"Tweetボタン", 
						type:CELL_TYPE.CHECK , 
						def:"1" 
					}),
					 new PageModel.OG_Cell( {
						id:"plus", 
						name:"Google Plusボタン", 
						type:CELL_TYPE.CHECK , 
						def:"1" 
					}),
					 new PageModel.OG_Cell( {
						id:"hatena", 
						name:"はてなブックマークボタン", 
						type:CELL_TYPE.CHECK , 
						def:"1" 
					}),
					 new PageModel.OG_Cell( {
						id:"pocket", 
						name:"Pocketボタン(あとで読む系のサービス)", 
						type:CELL_TYPE.CHECK , 
						def:"1" 
					})
				]
			},
			gridData:null
		}),
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "param",
				name	: "",
				note 	: ""
			}),
			textData:{
				info:new PageModel.OG_SubInfo({
					name: "ボタンの設定",
					note: ""
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "select",
						name: "サイズ",
						type: CELL_TYPE.SELECT,
						vals: [
							["M","Mサイズ","1"],
							["L","Lサイズ","0"]
							],
						view: "",
						def: "1"
					}),
					new PageModel.OG_Cell({
						id: "url_input",
						name: "シェアするURL",
						type: CELL_TYPE.SINGLE,
						style:SS.w400,
						note:(function(){ 
						    var s = ""
						    	s += '何も入力しない場合は、個々のページのURLがシェア設定されます。<br>'
						    	s += '例えば、個々のページURLではなく、サイトトップのURLを個別のページでシェアしたい場合は、URLを入力してください。<br>'
						    return s;
						})()
					}),
					new PageModel.OG_Cell({
						id: "title",
						name: "シェアするタイトル名",
						type: CELL_TYPE.SINGLE,
						style:SS.w200,
						note:(function(){ 
						    var s = ""
						    	s += '何も入力しなければ、個々のページHTMLのタイトルタグの値が使用されます。<br>'
						    	s += 'サイトトップのURLを指定した場合などに、サイトタイトルを設定したりします。'
						    return s;
						})()
					}),
					 new PageModel.OG_Cell( {
						id:"preview", 
						name:"シェア情報（タイトルとURL）を表示", 
						type:CELL_TYPE.CHECK , 
						style:"", 
						view:"",
						def:"1" 
					})
				]
			},
			gridData:null
		})
		/* ---------- ---------- ---------- */
	]
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data =  {
			list: {
				texts: {
					facebook_share: "1",
					facebook: "1",
					twitter: "1",
					plus: "1",
					hatena: "1",
					pocket: "1"
				},
				grid: []
			},
			param: {
				texts: {
					select: "M",
					url: "PAGE",
					url_input: ""
				},
				grid: []
			}
		}
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
			attr = attr.split('class="').join('class="cms-socials clearfix ');
			tag += '<div '+attr+'>\n'
			tag += '<ul class="clearfix">\n'
			
			if(data.list.texts.facebook_share){
				if(data.param.texts.select == "M"){
					tag += '	<li><div class="_share ss_share _fs_m"></div></li>';
				} else {
					tag += '	<li><div class="_share ss_share _fs_l"></div></li>';
				}
			}
			if(data.list.texts.facebook){
				if(data.param.texts.select == "M"){
					tag += '	<li><div class="_share ss_share _f_m"></div></li>';
				} else {
					tag += '	<li><div class="_share ss_share _f_l"></div></li>';
				}
			}
			if(data.list.texts.twitter){
				if(data.param.texts.select == "M"){
					tag += '	<li><div class="_share ss_share _t_m"></div></li>';
				} else {
					tag += '	<li><div class="_share ss_share _t_l"></div></li>';
				}
			}
			if(data.list.texts.plus){
				if(data.param.texts.select == "M"){
					tag += '	<li><div class="_share ss_share _g_m"></div></li>';
				} else {
					tag += '	<li><div class="_share ss_share _g_l"></div></li>';
				}
			}
			if(data.list.texts.hatena){
				if(data.param.texts.select == "M"){
					tag += '	<li><div class="_share ss_share _h_m"></div></li>';
				} else {
					tag += '	<li><div class="_share ss_share _h_l"></div></li>';
				}
			}
			if(data.list.texts.pocket){
				if(data.param.texts.select == "M"){
					tag += '	<li><div class="_share ss_share _p_m"></div></li>';
				} else {
					tag += '	<li><div class="_share ss_share _p_l"></div></li>';
				}
			}
					tag += '	<li style="color:#888;padding:5px 0 0 0;font-size:10px;"></li>';
			tag += '</ul>';
			tag += '<div style="color:red;margin:10px 0 0 0;font-size:12px;">※ボタンは仮表示です。ページを公開して、確認してください。</div>';
			var ss = (data.param.texts.url_input) ? data.param.texts.url_input :"現在のページのURL";
			tag += '<div style="color:#888;margin:10px 0 0 0;font-size:12px;">シェアされるURL：'+ ss +'</div>';

			tag += '</div>';
		return tag;
	}
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
			attr = attr.split('class="').join('class="cms-socials clearfix ');
	
		var s = [];
		if(data.list.texts.twitter) s.push("twitter");
		if(data.list.texts.plus) s.push("plus");
		if(data.list.texts.facebook) s.push("facebook");
		if(data.list.texts.facebook_share) s.push("facebook_share");
		if(data.list.texts.hatena) s.push("hatena");
		if(data.list.texts.pocket) s.push("pocket");
		
		var url =""
		if(data.param.texts.url_input){
			url = data.param.texts.url_input;
		}
		var title = ""
		if(data.param.texts.title){
			title = data.param.texts.title;
		}
		var preview = ""
		if(data.param.texts.preview){
			preview = "1"
		}
		var tag = ""
			tag = '<div '+attr+' data-share="{DATA}" data-size="{SIZE}" data-url="{URL}" data-title="{TITLE}" data-preview="{PREVIEW}"></div>\n'
			tag = tag.split("{DATA}").join(s.join(","));
			tag = tag.split("{SIZE}").join(data.param.texts.select);
			tag = tag.split("{URL}").join(url);
			tag = tag.split("{TITLE}").join(title);
			tag = tag.split("{PREVIEW}").join(preview);
			tag += '<script>\n'
			tag += '$(function(){\n';
			tag += '	$(".cms-socials").cms_socials();\n';
			tag += '});\n'
			tag += '</script>\n'
		return tag;
	}

	/* ---------- ---------- ---------- */

    return _;
})();
