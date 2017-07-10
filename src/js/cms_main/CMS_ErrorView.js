
var CMS_ErrorView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_ErrorView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */	
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_InputView,view);
		var tag = ""
		v.header.html(tag);
		
			tag = ""
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag);
		setBtn();
	}
		
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
	}
	
	/* ---------- ---------- ---------- */
		
	function update(_type,_url,_req,_res){
		var title = '<div class="_title">エラー</div>';
		var tag = "";
		if(_type == "NET"){
			title = '<div class="_p _title"><i class="fa fa-warning"></i> ネットワークエラー</div>';
			tag += '<div class="_p _h">●リクエストURL</div>';
			tag += '<div class="_p _path">'+_url+'</div>';
			if(_req){
				tag += '<div class="_p _h">●リクエストデータ</div>';
				tag += '<textarea>' + JSON.stringify(_req, null, "	") + '</textarea>';
			}
			if(_res){
				tag += '<div class="_p _h">●リザルトステート</div>';
				tag += '<div class="_p _res_error">';
				tag += _res["status"] + " " + _res["statusText"];
				tag += '</div>';
				if(_res["status"] == "403"){
				tag += '<div class="_p">403の場合は、ウェブサーバーのWAF機能が有効になっている可能性があります。詳しくは'+CMS_LINKs.waf+'のページで</div>';
				}
			}
		} else{
			tag = '<div class="_p">'+_res+'</div>'
		}
		v.header.html(title);
		v.body.html(tag);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	// var callback;
	function stageInit(){
		view.hide();
	}		
	var tID;
	if(tID) clearTimeout(tID);
	function stageIn(_type,_url,_req,_res){
		if(!view){
			$("body").append('<div id="CMS_ErrorView" class="_modalView"></div>');
			init();
		}
		if(! isOpen){ isOpen = true;
			tID = setTimeout(function(){
				stageIn_core(_type,_url,_req,_res)
			},200);
		}
	}
	function stageIn_core(_type,_url,_req,_res){
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			update(_type,_url,_req,_res);
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();

