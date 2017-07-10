
PageElement.object.tree = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
			id 		: "object.tree", 
			name	: "ナビゲーション",
			name2	: "",
		inputs	: ["CLASS","CSS","TREE"],
		// cssDef	: {file:"block",key:"[ナビゲーションブロック]"}
		cssDef	: {selector:".cms-navi"}
	});

	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		o.data = {
			previewPage: {
				id: "index",
				dir: "/"
			},
			targetDir: "",
			setting: {
				useToggle: false,
				onlyCurrent: false,
				isFlat: false,
				hasDate: false,
				isReverse: false,
				limitSub: ""
			},
			css: {
				clearfix: false,
				current: true,
				ownCurrent: true,
				hasSub: true,
				underconst: true,
				type: true,
				level: true,
				no: false,
				sum: false
			},
			levels: [
				{
					isShow: true,
					isOpen: true,
					dir: "<p>{NAME}</p>",
					page: "<a href=\"{HREF}\" target=\"{TAR}\">{NAME}</a>"
				},
				{
					isShow: true,
					isOpen: true,
					dir: "<p>{NAME}</p>",
					page: "<a href=\"{HREF}\" target=\"{TAR}\">{NAME}</a>"
				},
				{
					isShow: true,
					isOpen: true,
					dir: "<p>{NAME}</p>",
					page: "<a href=\"{HREF}\" target=\"{TAR}\">{NAME}</a>"
				},
				{
					isShow: true,
					isOpen: true,
					dir: "<p>{NAME}</p>",
					page: "<a href=\"{HREF}\" target=\"{TAR}\">{NAME}</a>"
				},
				{
					isShow: true,
					isOpen: true,
					dir: "<p>{NAME}</p>",
					page: "<a href=\"{HREF}\" target=\"{TAR}\">{NAME}</a>"
				}
			]
		}
		o.attr = {css:"default",style:""};
		o.attr.class = o.attr.css;
		return o;
	}

	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var htmlAbs = CMS_Path.PAGE.ABS;
		var tree = CMS_Data.Sitemap.getData();
		var treeTag = TreeAPI.getTag( htmlAbs, tree , data);
		
		//マッチしない時のテキスト
		var notText = (window["TreeAPI_NOT_MATCH_TEXT"]) ? TreeAPI_NOT_MATCH_TEXT :"";
		
		var tag = ""; 
		if(treeTag == TreeAPI_NOT_MATCH_TEXT || treeTag == ""){
			tag += '<span class="_no-input-data">条件データを入力...</span>'
		} else{
			var cs = 'class="clearfix cms-navi ';
			attr = attr.split('class="').join(cs);
			var tag = "";
			tag += '<div class="_cms_preview _cms_preview-mini">'
			tag += '<div class="_title">ナビゲーションブロック</div>'
			tag += '<div '+attr+'>\n'
			tag += treeTag;
			tag += '</div>\n'
			tag += '</div>'
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		
		var htmlAbs = CMS_Path.PAGE.ABS;
		var tree = CMS_Data.Sitemap.getData();
		
		var treeTag = TreeAPI.getTag( htmlAbs, tree , data, HTML_ExportState.getCurrent());
	 		treeTag = treeTag.split('target=""').join("");
			treeTag = treeTag.split(TreeAPI_SITE_DIR).join(CONST.SITE_DIR);
		
		//
			var cs = 'class="clearfix cms-navi ';
			attr = attr.split('class="').join(cs);
			var tag = "";
			tag += '<div '+attr+'>\n'
			tag += treeTag;
			tag += '</div>\n'
			
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();

