PageElement.setting = {}

PageElement.settingU = (function(){
	function getTag(id,jquery,data,ss){
		var json = JSON.stringify(data, null, "　　")
		json = json.split("\n").join("<br>")
		var tag = ""
			tag += '<div class="_setting_block">'
			tag += '	<div class="_tag_preview_text">プレビュー</div>'
			tag += '	<div class="_inner">'
			tag += '		<div>'+ss+'</div>'
			tag += '	</div>'
			if(id != ""){
				tag += '	<div class="_tag_preview_text">getFreeData("'+id+'")とJSファイルで記述すると、以下のデータが取得できます</div>'
				tag += '	<div class="_tag_preview">'+ json +'</div>'
			}
			if(jquery != ""){
				tag += '	<div class="_tag_preview_text">HTML内の'+jquery+' に該当するノードに対して、以下のテキストが出力されます</div>'
				tag += '	<div class="_tag_preview">'
				tag += CMS_TagU.tag_2_t(ss).split("\n").join("<br>")
				tag += '	</div>'
			}
			tag += '</div>'
		return tag;
	}

	return { getTag:getTag }
})();