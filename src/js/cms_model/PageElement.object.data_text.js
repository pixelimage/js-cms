
PageElement.object.data_text = (function(){ 
    var _ = new PageModel.Tag_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.data_text", 
		name	: "生データ",
		name2	: "",
		inputs	: ["TEXTAREA"]
	});
	
	/* ---------- ---------- ---------- */

	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		var s = "サンプルの文書ですので、ご注意ください。"
		o.data = s
		o.attr = {css:"",style:""}
		return o;
	}
	
	/* ---------- ---------- ---------- */
	
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = "";

		tag += '<div class="_cms_preview">\n'
		tag += '<div class="_title">データブロック / TEXTデータ</div>'
		tag += '<div class="_notes">データブロックは、[公開する]でHTML公開しても、書出されません。<br>ブロック情報パネルの、[出力]タブよりファイル名を設定し、書出せます。</div>'
		tag += '<div class="">\n'
		if(data == ""){
			tag += '<span class="_no-input-data">データリストを入力...</span>'
		} else{
			tag += '<table class="_dataTable">\n'
			tag += '<tbody>\n'
			tag += '<tr>\n'
			tag += '<td>\n'
			tag += CMS_TagU.tag_2_t(data).split("\n").join("<br>");
			tag += "</td>\n";
			tag += "</tr>\n";
			tag += "</tbody>\n";
			tag += "</table>\n";
		}
		tag += "</div>\n";
		tag += "</div>\n";
		
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	_.getHTML = function(_o,_tab){
		var data  = _o.data;
		var attr = _o.attrs;
		// var tab = (_tab != undefined) ? _tab:"";
		var tag = ""
			tag += data;
		return tag;
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();