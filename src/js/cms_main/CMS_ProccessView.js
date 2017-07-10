
var CMS_ProccessView			 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_ProccessView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */	
	
	function createlayout(){
		var tag = "";
			tag += '	<div class="_bg"></div>';
			tag += '	<div class="_modalBox">';
			tag += '	<div class="_process"></div>';
			tag += '	</div>';
		view.html(tag)
		v.process = view.find("._process")
	}
	
	/* ---------- ---------- ---------- */
		
	function update(_s){
		if(!_s){
			v.process.html('<i class="fa fa-refresh fa-spin"></i> 処理中...')
		} else{
			v.process.html(_s)
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			if(isFirst){
				createlayout();
			}
			isFirst = false;
			update();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}

	 return {
		init:init, 
		update:update, 
		stageIn:stageIn, 
		stageOut:stageOut 
	}
})();
