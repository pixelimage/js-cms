
PageElement.tag.js = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "tag.js", 
		name	: "JavaScript",
		name2	: "",
		inputs	: []
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		var s = ""
			s += '//ページ公開時に、JavaScriptコードを実行し、返り値を出力します。\n\n';
			s += '(function(_param){\n';
			s += '	var tag = "";\n';
			s += '	var a = _param["{1}"];\n';
			s += '	var b = _param["{2}"];\n';
			s += '	return a + b;\n';
			s += '});\n';
		o.data = s;
		o.attr = { }
		// o.attr ={ }
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";

		if(data == ""){
			tag += '<span class="_no-input-data">JavaScriptを入力...</span>'
		} else{
			tag += '<div class="_element_js_code">'
			tag += '<div class="_code_inner">'
			tag += CMS_TagU.tag_2_t(data).split("\n").join("<br>")
			tag += '</div>';
			tag += '<div class="_anno">※ 上記のJavaScriptは、ページ公開時などに実行され、return が出力されます。</div>';
			tag += '</div>';
		}
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		// var tab = (_tab != undefined) ? _tab:"";
		// throw new Error();
		var tag = "";
			try{
				var jsparam = CMS_Data.HinagataSearvice.getJSParam();
				tag += eval(data)(jsparam);
			} catch( e ){ }
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();