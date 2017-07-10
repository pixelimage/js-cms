
var CMS_AssetStageResizeView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#CMS_AssetStageResizeView');
		view.hide();
		
		var tag = ""
			tag += '<div class="_bar"></div>'
			tag += '<div class="_bar2"></div>'
		view.html(tag);
		
		view.draggable({ axis: "y" });
		view.on( "drag", function( event, ui ) {
			resizeH(ui.position.top);
		});
		CMS_AssetStage.registResize(function(){
			view.css("top", CMS_StatusH - CMS_AssetStage.getH());
		})
	}
	
	var tID_resizeW;
	function resizeWindow(){
		if(tID_resizeW) clearTimeout(tID_resizeW);
		tID_resizeW = setTimeout(function(){
			view.css("top", CMS_StatusH - CMS_AssetStage.getH());
		},100);
	}
	
	var tID_resizeH;
	function resizeH(_y){
		if(tID_resizeH) clearTimeout(tID_resizeH);
		tID_resizeH = setTimeout(function(){
		  	CMS_StageController.offsetY(_y);
		},33);
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
			resizeWindow();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	 return {
	 	init: init,
		stageIn: stageIn,
		stageOut: stageOut
	 }
})();