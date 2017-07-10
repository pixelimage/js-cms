
var Float_PreviewTab = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Float_PreviewTab');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = "";
			tag += '<div class="_inner"></div>';
			view.html(tag)
			v.inner = view.find('._inner');
	}
	
	function setBtn(){
		
		view.hover(function(){
			if(tID) clearTimeout(tID)
		} , function(){
			stageOut();
		})
	}
	
	/* ---------- ---------- ---------- */
	
	function update(_x,_param){
		updatePos(_x);
		var tag = ''
			tag += '<span class="_name">{NAME}</span> '
		if(_param.type == "page"){
			tag += '<span class="_filePath_blue">{URL_ABS}</span>'
		}
		var name = (_param.name) ? _param.name :_param.id;
		v.inner.html(name);
		var tempP = {
			name	:name,
			id		:_param.id,
			dir		:_param.dir,
			prevPub	:""
		}
		v.inner.html( Float_Preview.DoTemplate( tag , tempP ));
	}
	
	/* ---------- ---------- ---------- */
	var isHover = false
	function updatePos(_x){
		view.css("left", _x + "px");
		view.hover(
			function(){
				isHover = true;
			},
			function(){
				isHover = false;
				stageOut()
			}
		)
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_x,_param){
		view.show();
		update(_x,_param)
	}
	var tID
	function stageOut(){
			if(isHover)return;
			view.hide();
	}
	function stageOut_core(){
		if(tID) clearTimeout(tID)
		view.hide();
	}
	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		stageOut_core: stageOut_core
	}
})();