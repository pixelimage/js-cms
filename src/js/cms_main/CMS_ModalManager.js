
function showModalView(_v){ CMS_ModalManager.showModalView(_v) }
function hideModalView(){ CMS_ModalManager.hideModalView() }
function hideFloatView(){ CMS_ModalManager.hideFloatView() }

//ショートカットキーで、モーダル時にはスルーするように管理
var CMS_ModalManager = (function() {

	var modalStac = 0;
	var isFocus = false;

	function init() {
		var tar = "#InspectView textarea, #InspectView input";
		$(document).on("focus" ,tar,function(){
			isFocus = true;
			update()
		})
		$(document).on("blur" ,tar,function(){
			isFocus = false;
			update()
		})
	}
	// var currentPageType = ""
	// function setEditPageType(_type) {
	// 	currentPageType = _type;
	// }
	
	/* ---------- ---------- ---------- */
	
	var currents = [];
	function showModalView(_view) {
		currents.push(_view);
		hideFloatView();
		modalStac++;
		update();
	}

	function hideModalView() {
		hideFloatView()
		modalStac--;
		currents.pop();
		update();
	}
	function update() {
	}
	function isModal() {
		return(modalStac > 0)
	}
	function isNotModal() {
		if(modalStac == 0){
			if(isFocus == false){
				return true;
			}
		}
		return false;
	}

	function closeModal() {
		if(currents.length == 0)return;
		if (!currents[currents.length-1]) return;
		var currentView = currents[currents.length-1]
		if(currentView["compliteEdit"]) {
			currentView.compliteEdit();
			return;
		}
		if(currentView["stageOut"]) {
			currentView.stageOut();
			return;
		}
	}
	
	function hideFloatView() {
		if (window["Float_DateInputView"]) Float_DateInputView.stageOut();
		if (window["CMS_GuideView"]) CMS_GuideView.stageOut();
		if (window["FreeLayoutInfoView"]) FreeLayoutInfoView.stageOut();
	}
	/* ---------- ---------- ---------- */

	return {
		init: init,
		// setEditPageType: setEditPageType,
		showModalView: showModalView,
		hideModalView: hideModalView,
		hideFloatView: hideFloatView,
		isModal: isModal,
		isNotModal: isNotModal,
		closeModal: closeModal
	}
})();
