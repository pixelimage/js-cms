//メインビュー管理
var CMS_RootView = (function() {
	var view;
	var v = {};

	function init() {
		view = $('#CMS_RootView');
		stageInit();
		createlayout();
		setBtn();
	}

	function setBtn() {}

	function createlayout() {}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;

	function stageInit() {
		view.hide();
	}

	function stageIn() {
		if (!isOpen) {
			isOpen = true;
			view.show();
			if (isFirst) {
				createlayout();
			}
			isFirst = false;
		}
	}

	function stageOut() {
		if (isOpen) {
			isOpen = false;
			view.hide();
		}
	}

	function resize() {
		if (isOpen) {}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();