
var CMS_AnchorListU = (function(){

	function getViewTag(val,_isPub){
		if(_isPub == undefined) _isPub = true;
		var tag = '<b>リンク未設定</b>';
		if(val == "") return tag;
		if(val == undefined) return tag;
		if(val["list"] == undefined) return tag;
		
		var list = CMS_U.getPublicList(val.list.grid);
		var tag = "";
		if(list.length == 0) {
			tag += '<span class="_no-input-data">リストデータを入力...</span>'
		} else{
			tag += '<ul>\n'
			for (var i = 0; i < list.length ; i++) {
				tag += '<li>' +CMS_AnchorU.getAnchorTag(list[i].anchor,"",_isPub) + '</li>\n'
			}
			tag += '</ul>\n'
		}
		return tag;
	}

	return { 
		getViewTag:getViewTag
	}
})();
