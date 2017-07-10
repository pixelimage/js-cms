/*
function hideModalView(){ }
function showModalView(){ }

$(function(){
	DummyImageService.init()
	ImageMapView.init()
	
	$(".btn_open").click(function(){
		$.ajax({
			scriptCharset	: 'utf-8',
			type			: 'GET',
			url				: $(this).data("id"),
			dataType		: 'json',
			success			: function(data) {
				openAA({data:data})
			},
			error			: function(data) {console.log(data);}
		})
	})
	$(".btn_open").eq(0).click();
	$("._btn_out").click(function(){
		window.comp()
	})
	// setTimeout(function(){
	// 	$("._btn_out").click()
	// },500);
});
function openAA(_param){
	ImageMapView.stageOut();
	ImageMapView.stageIn(_param.data,function(_s){
		_param.data = _s;
		// setTimeout(function(){
		// 	updateCallback();
		// }, 200);
		$(".out").html(ImageMapExport.getHTML(_param.data));
		$("#out_html").val(ImageMapExport.getHTML(_param.data));
		$("#out_json").val(JSON.stringify(_param.data, null, "	"));
	});
}
*/
/* ! ---------- ImageMapView ---------- ---------- ---------- ---------- */

var ImageMapView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#ImageMapView');
		stageInit();
		ImageMapBMPText.init();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	var mainStage 
	function createlayout(){
		var tag = ""
			tag += '<div class="_bg"></div>'
			tag += '<div class="_modalBox">'
			tag += '	<div class="_header">'
			tag += '		<div class="_title">イメージブロック / レイアウト編集</div>'
			tag += '	</div>'
			tag += '	<div class="_body"></div>'
			tag += '	<div class="_footer">'
			tag += '		<div class="_btn_close">閉じる</div> ';
			tag += '		<div class="_btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 編集完了</div> ';
			tag += '	</div>'
			tag += '</div>'
		view.html(tag);
		
		v.header = view.find("._header");
		v.body = view.find("._body");
		v.footer = view.find("._footer");
		
		mainStage = ImageMap.MainStage;
		mainStage.init(v.body);

		setBtn();
		
	}
	/* ---------- ---------- ---------- */
	function setBtn(){
	
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		v.btn_do = view.find('._btn_do');
		view.on("click", '._btn_do', function() {
			compliteEdit();
		});
	}
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		callback( mainStage.getData(true));
		stageOut();
	}
	// window.comp = compliteEdit
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	var callback;
	function stageInit(){
		view.hide();
	}
	function stageIn(_data,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			callback = _callback;
			if(isFirst){
				createlayout();
				CMS_ScreenManager.registResize(function(){
					resize();
				});
			}
			isFirst = false;
			//
			mainStage.setData(_data);
			resize();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
			ImageMap.InspectView.stageOut()
		}
	}
	function resize(){
		if(isOpen){ 
			mainStage.resize();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut
	}
})();
