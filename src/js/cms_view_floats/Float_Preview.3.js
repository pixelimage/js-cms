
var Float_PreviewMini = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#Float_PreviewMini');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = "";
			tag += '<div class="_arrow"></div>';
			tag += '<div class="_fuki">';
			tag += '	<div class="_inner"></div>';
			tag += '	<div class="_cms_btn_alpha _btn_preview_open"><i class="fa fa-caret-down "></i> プレビューを開く</div>';
			tag += '</div>';
			view.html(tag)
			
			v.arrow = view.find('._arrow');
			v.inner = view.find('._inner');
	}
	
	function setBtn(){
		
		view.hover(function(){
			if(tID) clearTimeout(tID)
		} , function(){
			stageOut();
		})
		
		v.btn_preview_open = view.find('._btn_preview_open');
		v.btn_preview_open.click(function(){ 
			Float_Preview.switchPreview(true);
		});

	}
	
	/* ---------- ---------- ---------- */
	
	function update(_type,_xy,_param){
		updatePos(_xy);
		
		var tag =  '';
		if(_type == Dic.ListType.DIR){
			// tag += '	<div class="_title">{NAME}</div>'
			tag += '	<div><span class="_m">グループID : </span><span class="_gID"><i class="fa fa-folder-open"></i>{ID}</span></div>'
			v.btn_preview_open.hide()
		}
		if(_type == Dic.ListType.PAGE){
			tag += '	<div class="_title">{NAME}</div>'
			tag += '	<div class="_filePath">{URL_ABS}</div>'
			// tag += '	<div class=""><span class="_m">所属グループID\'s : </span>{G}</div>'
			v.btn_preview_open.show()
		}
		
		var tempP = {
			name	:_param.name,
			id		:_param.id,
			dir		:_param.dir,
			prevPub	:""
		}
		v.inner.html( Float_Preview.DoTemplate( tag , tempP ));
			
	}
	
	/* ---------- ---------- ---------- */
	
	var prevY = -1;
	var currentY = -1;
	function updatePos(_xy){
		var tarY = _xy.y -25;
		view.css("top", tarY + "px");
	}
	
	/* ---------- ---------- ---------- */

	function updateSitemapDate(){ }
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_type,_xy,_param){
		// if(! isOpen){ isOpen = true;
			if(isFirst){}
			
			if(tID) clearTimeout(tID)
			tID = setTimeout(function(){
				view.show();
				isFirst = false;
				update(_type,_xy,_param)
			},50);
		// }
	}
	var tID
	function stageOut(){
		if(tID) clearTimeout(tID)
		tID = setTimeout(function(){
			view.hide();
			prevY = -1
		},300);
	}
	function stageOut_core(){
		if(tID) clearTimeout(tID)
		view.hide();
		prevY = -1
	}
	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		stageOut_core: stageOut_core,
		updateSitemapDate: updateSitemapDate
	}
})();
