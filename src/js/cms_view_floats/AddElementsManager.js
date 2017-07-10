/**
 * エレメントの新規挿入時の位置の管理や、挿入を行う
 */

AddElementsManager = (function() {
	var currentTar;
	var currentNo;

	function setData(_tar, _no) {
		currentTar = _tar;
		currentNo = _no;
	}

	function addElement(_type, _param) {
		hideFloatView();
		var o = PageElement_Util.getInitData(_type, _param);
		currentTar.addDataAt(o, currentNo + 1);
		if (_type == "object.tabList") {
			currentTar.addDataAt(JSON.parse(PageElement_JText.tabListData01), currentNo + 2);
			currentTar.addDataAt(JSON.parse(PageElement_JText.tabListData02), currentNo + 2);
			currentTar.addDataAt(JSON.parse(PageElement_JText.tabListData03), currentNo + 2);
		}
		currentTar.update();
		currentTar.select(currentNo + 1);
	}
	
	function addElement_by_object(_param) {
		hideFloatView();
		currentTar.addDataAt(_param, currentNo + 1);
		currentTar.update();
		currentTar.select(currentNo + 1);
	}
	return {
		setData: setData,
		addElement: addElement,
		addElement_by_object: addElement_by_object
	}
})();
