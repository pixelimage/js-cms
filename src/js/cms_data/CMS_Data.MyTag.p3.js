
CMS_Data.MyTagU = (function(){
	//Myタグ定義のJSONから、Myタグ定義リストを作成する。
	//グローバル、ローカル共に、コールされる
	function parseData(_json) {
		var a = [];
		if(_json["body"] == undefined) return a;
		if(_json.body["free"] == undefined) return a;
		var ls = _json.body.free[0].data;
		
		for (var i = 0; i <  ls.length ; i++) {
			if(ls[i].type == "replace.div"){
				var id = ls[i].attr.replaceID;
				var label = ls[i].attr.replaceTitle;
				var o = {
					type:"tag",
					id:id,
					label:label,
					val:ls[i].data
				}
				a.push(o);
			}
			if(ls[i].type == "object.replaceTexts"){
				//テキストリスト
				if(ls[i].data.texts){
					var trs = ls[i].data.texts.grid;
					for (var ii = 0; ii < trs.length ; ii++) {
						if(trs[ii].publicData){
							var s = CMS_TagU.convertCellBR( trs[ii]["val"] );
							var o = {
								type : "text",
								id : trs[ii]["id"],
								label : trs[ii]["val"],
								val : s
							}
							a.push(o);
						}
					}
				}
				//画像リスト
				if(ls[i].data.images){
					var trs = ls[i].data.images.grid;
					for (var ii = 0; ii < trs.length ; ii++) {
						if(trs[ii].publicData){
							var o = {
								type : "image",
								id : trs[ii]["id"],
								label : "",
								val : trs[ii]["val"],
								extra : { isTag:trs[ii].isTag }
							}
							o.label = _getImageTag(o,false);
							a.push(o);
						}
					}
				}
				//リンクリスト
				if(ls[i].data.links){
					var trs = ls[i].data.links.grid;
					for (var ii = 0; ii < trs.length ; ii++) {
						if(trs[ii].publicData){
							var o = {
								type : "link",
								id : trs[ii]["id"],
								label : "",
								val : trs[ii]["val"],
								extra : { isTag:trs[ii].isTag }
							}
							o.label = _getAnchorTag(o,false);
							a.push(o);
						}
					}
				}
			}
		}
		return a;
	}
	
	//置換え処理メイン
	function getReplaceTag(_temp, _keys){
		if(!_keys) return _temp;
		for (var i = 0; i < _keys.length ; i++) {
			var key = "{{" + _keys[i].id + "}}";
			if(_temp.indexOf(key) != -1){
				var type = _keys[i].type
				var vals = _keys[i].val;
				
				var _s = "";
				if( type == "text"){
					_s = vals;
				} else if(type == "image"){
					_s = _getImageTag(_keys[i],true);
					
				} else if(type == "link"){
					_s = _getAnchorTag(_keys[i],true);
					
				} else if(type == "tag"){
					//myタグ-コンテナ
					for (var n = 0; n < vals.length ; n++) {
						_s += PageElement_HTMLService.getTag(vals[n]);
					}
				}
				_temp = _temp.split(key).join(_s);
			}
		}
		return _temp;
	}
	
	function _getImageTag(_param,_isPub){
		var tag = "";
		if(_param.extra.isTag == "path"){
			if(_param.val.mode == "simple"){
				tag = CMS_Path.MEDIA.getImagePath(_param.val.path , _isPub );
			}
		} else{
			var w = _isPub ? _param.val.width : "50px";
			tag = CMS_ImgBlockU.getImageTag({
				path	: _param.val.path,
				isPub	: _isPub,
				width	: w,
				ratio	: _param.val.ratio,
				alt		: "",
				attr	: ""
			});
		}
		tag = tag.split("\n").join("");
		return tag;
	}
	
	function _getAnchorTag(_param,_isPub){
		var tag = "";
		if(_param.extra.isTag == "path"){
			tag = CMS_Path.MEDIA.getAnchorPath( _param.val.href , _isPub );
		} else if(_param.extra.isTag == "attr"){
			tag = getAnchorAttr(_param.val,_isPub);
		} else {
			tag = CMS_AnchorU.getAnchorTag( _param.val,"",_isPub);
		}
		return tag;
	}
	
	function getAnchorAttr(_link,_isPub){
		var tag = ""
		var href = CMS_Path.MEDIA.getAnchorPath( _link.href , _isPub );
		tag += 'href="'+href+'" ';
		var tar = _link.target;
		if(tar) tag += 'target="'+tar+'" ';
		return tag;
	}
	
	return {
		parseData:parseData,
		getReplaceTag:getReplaceTag,
		getAnchorAttr:getAnchorAttr
	}
})();


//ひな形ブロックの置換え処理で、一時的に状態の管理を行う
CMS_Data.HinagataSearvice = (function(){
	
	var list;
	function setState(_list){ list = _list; }
	function reset(){ list = null; }
	function trace(){ console.log(list); }
	
	function getJSParam(){ 
		var o = [];
		if(list){
			for (var i = 0; i < list.length ; i++) {
				o[list[i].id] = list[i].val;
			}
		}
		var pageTags = HTMLServiceU.getCurrentReplaceTags();
		for (var n  in pageTags) {
			o[n] = pageTags[n];
		}
		return o;
	}
	
	//tag.jsからもコールされる
	function replace(_s,_type){
		if(!list) return _s;
		if(typeof _s === "string"){
			for (var i = 0; i < list.length ; i++) { 
				var id = list[i].id.split(" ").join("");
				var val = list[i].val;
				_s = _s.split(id).join( CMS_TagU.t_2_tag(val) );
			}
		}
		return _s;
	}
	return{
		setState: setState,
		getJSParam:getJSParam,
		reset: reset,
		trace:trace,
		replace:replace,
	}
})();

CMS_Data.PageTag = (function(){
	
	var list = [
		{
			label:"編集内容",
			items:[
				 { id:"PAGE_CONTENTS",text:"公開ページで確認してください", label:"HTMLページの編集内容をHTMLに変換した値	", }
			]
		},
		{
			label:"ディレクトリ情報",
			items:[
				 { id:"SITE_DIR", text:"../",label:"HTMLページから見た、サイトルートのパス<br>リンクや画像を直書きするときに、パスの抽象化を行えます。" },
				 { id:"ASSET_DIR", text:"html/",label:"HTMLページから見た、アセットファイルのパス" },
				 { id:"DEF_DIR", text:"html/",label:"HTMLページから見た、サイトディレクトリのパス" }
			]
		},
		{
			label:"ページ関連",
			items:[
				 { id:"PAGE_DIR", text:"/html/",label:"サイトルートから見た、HTMLページのディレクトリのパス" },
				 { id:"PAGE_ID", text:"company_outline",label:"HTMLページのページID" },
				 { id:"PAGE_NAME", text:"会社概要",label:"HTMLページのページ名" },
				 { id:"PAGE_GROUP_IDS", text:"company company_sub",label:"HTMLページが所属しているグループのID(複数)" },
				 { id:"PAGE_GROUP_IDS[0]", text:"company"		,label:"PAGE_GROUP_IDSの1つめの値" },
				 { id:"PAGE_GROUP_IDS[1]", text:"company_sub"	,label:"PAGE_GROUP_IDSの2つめの値" },
				 { id:"PAGE_GROUP_IDS[2]", text:""				,label:"PAGE_GROUP_IDSの3つめの値" },
				 { id:"PAGE_GROUP_NAMES", text:"会社について,our company",label:"HTMLページが所属しているグループの名称(複数)" },
				 { id:"PAGE_BREADLIST", text:"公開ページで確認してください",label:"パンくずリスト" }
			]
		},
		{
			label:"ブログ関連",
			items:[
				 { id:"PAGE_TAG", text:"",label:"ページに登録されている分類用タグ名" },
				 { id:"PAGE_READ", text:"",label:"ページに登録されているページ説明" },
				 { id:"PAGE_DATE", text:"",label:"ページに登録されている日付" }
			]
		},		
		{
			label:"その他",
			items:[
				 { id:"PAGE_PUB_DATE", text:"2016/07/15 23:37:46",label:"HTMLが公開された日付" }
				 //{ id:"PAGE_TEMPLATE", text:"default.html",label:"HTMLのテンプレートファイルのパス" }
			]
		}	
	]
	function getData() {
		return list;
	}
	return { 
		getData:getData
	}
})();

