
var CMS_Status = {
	sitemapDirOpens: null,
	W: 1000,
	H: 1000,
	mouseX: 0,
	mouseY: 0,

	//現在編集中の情報
	// currentPage:null,
	// currentPage_preview:null,	
	//フリーレイアウトで、コピペで使う
	clipBord: "",
	clipBordPage: ""
}

var CMS_StatusFunc = (function() {

	function setSitemapDirOpens(_a) {
		CMS_Status.sitemapDirOpens = _a
	}

	function checkSitemapDirOpens_by_id(_id) {
		var openList = CMS_Status.sitemapDirOpens
		for (var i = 0; i < openList.length; i++) {
			if ("sitemap_" + _id == openList[i][0]) {
				if (openList[i][1] == 1) {
					return true;
				}
			}
		}
		return false;
	}

	return {
		setSitemapDirOpens: setSitemapDirOpens,
		checkSitemapDirOpens_by_id: checkSitemapDirOpens_by_id
	}
})();