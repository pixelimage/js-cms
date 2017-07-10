


PageElement.object.hinagata = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.hinagata", 
		name	: "ひな形",
		name2	: "",
		inputs	: ["DETAIL","RELOAD"]
	});

	/* ---------- ---------- ---------- */

	var defImage = { mode:"simple" , path: "width:150,height:100", width: "", ratio: "" }
	
	_.grids = [
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "mytag",
				name	: "Myタグ設定",
				note:"パーツ・ひな形設定ページで設定した、ひな形タグを入力してください。",
				callback:function(_o,_uid){
					var s = CMS_Data.MyTagReplace.replaceHinagata( _o.texts.id , [] );
					var keys = (function(_s){
						var a = [];
						var _ks = _s.match(/{.*?}/g);
						if(_ks){
							_ks = _ks.filter(function (x, i, self) {
								return self.indexOf(x) === i;
							});
							if(_ks){
								for (var i = 0; i < _ks.length ; i++) {
									if(_ks[i].indexOf("{{") == -1){
										if(_ks[i].indexOf(";") == -1){
											a.push('<span class="_cms_btn_copy_text" data-text="'+_ks[i]+'">' + _ks[i] +'</span>');
										}
									}
								}
							}
						}
						return a;
					})(s);
					
					var tag = "";
						tag += '<div class="_codePreview">'
						tag += '	<div class="_codearea">';
						tag += '		<table>';
						tag += '			<tr>';
						tag += '				<th>選択中のMyタグコード<br>(変換前)</th>';
						tag += '				<td><textarea>'+CMS_TagU.tag_2_t(s)+'</textarea></td>';
						tag += '			</tr>';
						tag += '			<tr>';
						tag += '				<th></th>';
						tag += '				<td><i class="fa fa-arrow-down "></i></td>';
						tag += '			</tr>';
						tag += '			<tr>';
						tag += '				<th>Myタグ内のひな形タグ</th>';
						tag += '				<td><div class="_keys">' + keys.join(" ") + '</div></td>';
						tag += '			</tr>';
						tag += '		</table>';
						tag += '	</div>'
						tag += '	<p>JavaScriptブロックは、上記では、正しく出力されませんので、ご注意下さい</p>'
						tag += '</div>'
					$("#"+_uid).html(tag);
				}
			}),
			textData:{
				info:new PageModel.OG_SubInfo({
					 name:""
				}),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "MyタグID",
						type: CELL_TYPE.SINGLE,
						style: SS.repID20,
						view: "",
						// note: "例：{{タグ名}} ",
						note: (function(){ 
							var s = ""
							    s += '<a class="_btn_dic" href="javascript:window._cms.openEmbedList(\'my\',1);void(0);">';
							    s += '<i class="fa fa-file-text"></i> {{ 埋込みタグ }} 取得</a>'
							    return s;
							})(),
						def: "{id}"
					})
				]
			},
			gridData:null
		}),
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "texts",
				name	: "ひな形タグ設定",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"テキストに置換え" }),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "ひな形タグ",
						type: CELL_TYPE.SINGLE,
						style: SS.repID,
						view: "",
						def: "{id}"
					}),
					new PageModel.OG_Cell({
						id: "val",
						name: "値",
						type: CELL_TYPE.MULTI,
						view: "",
						def: "サンプルの文書ですので、ご注意ください。"
					})
				]
			}
		}),
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "images",
				name	: "",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"イメージに置換え" }),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "ひな形タグ",
						type: CELL_TYPE.SINGLE,
						style: SS.repID,
						view: "",
						def: "{img}"
					}),
					new PageModel.OG_Cell({
						id: "val",
						name: "画像",
						type: CELL_TYPE.IMAGE,
						view: "",
						def: defImage
					}),
					new PageModel.OG_Cell({
						id: "anchor",
						name: "リンク",
						type: CELL_TYPE.ANCHOR,
						style: SS.w300,
						def:CMS_AnchorU.getInitDataS()
					}),
					new PageModel.OG_Cell({
						id: "isTag",
						name: "出力",
						type: CELL_TYPE.SELECT,
						view: "",
						vals: [
							["","タグを出力"],
							["path","画像パスのみ出力"]
						]
					})
				]
			}
		}),
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "links",
				name	: "",
				note 	: ""
			}),
			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({ name:"リンクに置換え" }),
				cells:[
					new PageModel.OG_Cell({
						id: "id",
						name: "ひな形タグ",
						type: CELL_TYPE.SINGLE,
						style: SS.repID,
						view: "",
						def: "{link}"
					}),
					new PageModel.OG_Cell({
						id: "val",
						name: "値 (リンク)",
						type: CELL_TYPE.BTN,
						style: "",
						view: "",
						def: CMS_AnchorU.getInitDataS()
					}),
					new PageModel.OG_Cell({
						id: "isTag",
						name: "出力",
						type: CELL_TYPE.SELECT,
						view: "",
						vals: [
							["","ボタン一式を出力"],
							["path","リンクパスのみ出力"],
							["href",'href="*" target="*"を出力']
						]
					})
				]
			}
		})
	]
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(_param){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = {
			mytag : {
				texts:{
					id:"{{ひな形デモ}}"
				}	
			},
			texts : {
				grid:[ 
					{ publicData: "1" ,id:"{1}", val:"サンプルの文書です。" },
					{ publicData: "1" ,id:"{2}", val:"サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。" },
					{ publicData: "1" ,id:"{3}", val:"サンプルの文書ですので、ご注意ください。" }
				]
			},
			images : {
				grid:[]
			},
			links : {
				grid:[]
			}
		}
		o.attr = {css:"",style:""};
		
		if(_param){
			o.data.mytag.texts.id = _param.id;
			o.data.texts.grid = [];
		}
		return o;
	}

	/* ---------- ---------- ---------- */

	_.getList = function(data,_isPub){
		var list = [];
		
		/* ---------- ---------- ---------- */
		//テキスト置換え
		if(!data.texts) data.texts = {}
		if(!data.texts.grid) data.texts.grid = []
		var _ls = CMS_U.getPublicList(data.texts.grid);
		for (var i = 0; i < _ls.length ; i++) {
			list.push({ id:_ls[i].id, val:_ls[i].val });
		}
		
		/* ---------- ---------- ---------- */
		//画像置換え
		if(!data.images) data.images = {}
		if(!data.images.grid) data.images.grid = []
		var _ls = CMS_U.getPublicList(data.images.grid);
		for (var i = 0; i < _ls.length ; i++) {
			var imgTag = "";
			if(_ls[i].isTag == "path"){
				if(_ls[i].val.mode == "simple"){
					imgTag = CMS_Path.MEDIA.getImagePath( _ls[i].val.path , _isPub );
				}
			} else {
				var img = _ls[i].val;
				imgTag = CMS_ImgBlockU.getImageTag({
					path	: img.path,
					isPub	: _isPub,
					width	: img.width,
					ratio	: img.ratio,
					alt		: "",
					attr	: ""
				});
				//後工程で改行が<BR>になるので、削除
				imgTag = imgTag.split("\n").join("");
			}
			var tag = CMS_AnchorU.getWapperTag(_ls[i].anchor,imgTag);
			list.push({ id: _ls[i].id, val: tag });
		}
		
		/* ---------- ---------- ---------- */
		//リンク置換え
		if(!data.links) data.links = {}
		if(!data.links.grid) data.links.grid = []
		var _ls = CMS_U.getPublicList(data.links.grid);
		for (var i = 0; i < _ls.length ; i++) {
			var aTag = "";
			if(_ls[i].isTag == "path"){
				aTag = CMS_Path.MEDIA.getAnchorPath( _ls[i].val.href , _isPub );
			} else if(_ls[i].isTag == "href"){
				aTag +=' href="' + CMS_Path.MEDIA.getAnchorPath( _ls[i].val.href , _isPub ) + '"';
				aTag +=' target="' + _ls[i].val.target + '" ';
			} else {
				aTag = CMS_AnchorU.getAnchorTag(_ls[i].val,"",true);
			}
			list.push({ id: _ls[i].id, val: aTag });
		}
		return list;
	}

	/* ---------- ---------- ---------- */

	_.getPreview = function(_o,_isPub){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";
		if(!data.texts) return tag;
		if(!data.mytag.texts.id){
				tag += '<span class="_no-input-data">データを入力...</span>'
		} else{
			var list = this.getList(data,_isPub);
			var id = data.mytag.texts.id;
				id = id.split("{{").join("");
				id = id.split("}}").join("");
			
			var hasAttr = PageElement_Util.hasAttr(attr);
			if(hasAttr)	tag += '<div ' + attr + '>';
			if(_isPub){
				if(window["CMS_Data"]){
					tag += CMS_Data.MyTagReplace.replaceHinagata( data.mytag.texts.id , list );
				}
			} else{
				tag += '<div class="_hinagata_id_area"><div class="_hinagata_id"><span>' + id + '</span></div>';
				if(window["CMS_Data"]){
					tag += CMS_Data.MyTagReplace.replaceHinagata( data.mytag.texts.id , list );
				}
				tag += "</div>"
			}
			if(hasAttr)	tag += '</div>';
		} 
		return tag;
	}
	

	/* ---------- ---------- ---------- */

	_.getHTML = function(_o){
		return this.getPreview(_o ,true);
	}

	/* ---------- ---------- ---------- */

    return _;
})();


