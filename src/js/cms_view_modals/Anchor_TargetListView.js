var Anchor_TargetListView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Anchor_TargetListView');
		stageInit();
	}
	
	var targeList = [
		["blank"	,"_blank"],
		["inner"	,"innerWindow({w:600,h:400})"],
		["none"		,""],
		["outer"	,"outerWindow({w:600,h:400})"]
	];
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(Anchor_TargetListView,view);

		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("window/btn_target","_BASE_")+'</div>'
			tag += '<div class="_title">ターゲット選択</div>'
		v.header.html(tag);
		
		list = targeList;
		var tag = ""
		for (var i = 0; i < list.length ; i++) {
			var cb = ""
			if(list[i][1] != ""){
				cb = "_cms_btn_alpha"
			}
			tag +='<div class="'+cb+' ss_target ss_target_'+list[i][0]+'" data="'+list[i][1]+'"></div>'
		}
		v.body.html(tag); 
				
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		v._btn_close = view.find('._btn_close');
		setBtn();
	}
	
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		view.find("._cms_btn_alpha").click(function(){ 
			var type = $(this).attr("data");
			clickText(type);
		});
	}
	function clickText(_s){
		if(callback){
			UpdateDelay.delay(function(){
				callback(_s);
			});
		} else {
			CMS_CopyView.stageIn(_s,function(){})
		}
		stageOut()
	}
	
	/* ---------- ---------- ---------- */
	//dir
	
	function update(){
		//
	}
	/* ---------- ---------- ---------- */
	
	function compliteEdit(){
		stageOut()
	}
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback = true;
	var currentPath = "";
	function stageInit(){
		view.hide();
		//load_dir();
	}
	function stageIn(_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback;
			if(isFirst){
				createlayout();
			}
			update();
			isFirst = false;
			view.show();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	function resize(){
		if(isOpen){
		}
	}
	return { init:init, stageIn:stageIn, stageOut:stageOut,	resize:resize,compliteEdit:compliteEdit}
})();//modal