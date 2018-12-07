/**
 * FreeLayoutと、ファイルリストでドラッグ管理
 */

var DragController 			 = (function(){
	var isNew = false;
	var newParam = {};
	var currentClass;
	var currentNo;
	var targetClass;
	var targetNo;
	var this_;
	
	function getFileDropTag(_i){
		return '<div class="_dropArea _fileDropArea" data-no="'+_i+'"></div>';
	}
	function getDropTag(_i){
		return '<div class="_dropArea" data-no="'+_i+'"></div>';
	}
	function setDrag(this_,view,_dropableclass){
		view.addClass(_dropableclass)
		view.draggable({
			opacity : 0.5, cursor : 'move', revert : true ,
		    start:function(){
				isNew = false;
				draged(Number($(this).attr("data-no")),this_);
		    }
		});
	}
	function setDrop(this_,view,_dropableclass){
		view.droppable({
			accept : "."+_dropableclass,
		    activeClass : "drop-active",  
		    hoverClass 	: "drop-hover",  
		    tolerance	: "pointer",
		    drop : function(ev, ui) {
				dropped(Number($(this).attr("data-no")),this_);
		    }
		})
	}
	function draged(_no,_tar){
		currentNo 	 = _no;
		currentClass   = _tar;
	}
	
	var isDroping = false;
	function dropped(_no,_tar){
		
		//二重ドラッグスルー処理
		if(isDroping) return;
		isDroping = true;
		setTimeout(function(){
			isDroping = false;
		},200);
		//
		targetNo =  _no;
		targetClass  = _tar;
		
		if(isNew){
			dropped_new()
		} else{
			dropped_move()
		}
	}
	function dropped_move(){
		var b = true;
		if(currentClass == targetClass){
			if(currentNo < targetNo) targetNo = targetNo - 1;
			if(currentNo == targetNo) b = false;
		}
		if(b){
			var data = clone(currentClass.getDataAt(currentNo));
			if(currentClass == targetClass){
				currentClass 	.removeData(currentNo);
				targetClass 	.addDataAt(data,targetNo);
			} else{
				targetClass 	.addDataAt(data,targetNo);
				currentClass 	.removeData(currentNo);
			}
			currentClass 	.update();
			targetClass 	.update();
			InspectView.stageOut();
		}
	}
	function dropped_new(){
		var o = PageElement_Util.getInitData(newParam.type,newParam.param);
		targetClass 	.addDataAt(o,targetNo);
		targetClass 	.update();
	}
	
	return { 
		getFileDropTag:getFileDropTag,
		getDropTag:getDropTag,
		setDrop:setDrop,
		setDrag:setDrag,
		draged:draged,
		dropped:dropped
	}
})();
var DragControllerFileList	 = (function(){
	var isNew = false;
	var newParam = {};
	var currentClass;
	var currentNo;
	var targetClass;
	var targetNo;
	var this_;
	
	function getFileDropTag(_i){
		return '<div class="_dropArea _fileDropArea" data-no="'+_i+'"></div>';
	}
	function getDropTag(_i){
		return '<div class="_dropArea" data-no="'+_i+'"></div>';
	}
	function setDrag(this_,view,_dropableclass){
		view.addClass(_dropableclass)
		view.draggable({
			opacity : 0.5, 
			cursor : 'move', 
			axis:"y",
			revert : true ,
			distance : 5 ,
		    start:function(){
				isNew = false;
				draged(Number($(this).attr("data-no")),this_);
				startDraging();
		    },
		    stop:function(){
				stopDraging();
		    }
		});
	}
	var _isDraging = false
	function draged(_no,_tar){
		currentNo 	 = _no;
		currentClass   = _tar;
	}
	
	function setDrop(this_,view,_dropableclass){
		view.droppable({
			accept : "."+_dropableclass,
		    activeClass : "drop-active",  
		    hoverClass 	: "drop-hover",  
		    tolerance	: "pointer",
		    drop : function(ev, ui) {
				dropped(Number($(this).attr("data-no")),this_);
		    }
		})
	}
	function dropped(_no,_tar){
		if(window.isLocked(true))return;
		targetNo =  _no;
		targetClass  = _tar;
		stopDraging();
		
		if(isNew){
			dropped_new()
		} else{
			dropped_move()
		}
	}
	function dropped_move(){
		var b = true;
		if(currentClass == targetClass){
			if(currentNo < targetNo) targetNo = targetNo - 1;
			if(currentNo == targetNo) b = false;
		}
		if(b){
			//var data = currentClass.getDataAt(currentNo);
			var data = clone(currentClass.getDataAt(currentNo));
			if(currentClass == targetClass){
				currentClass 	.removeData(currentNo);
				targetClass 	.addDataAt(data,targetNo);
			} else{
				targetClass 	.addDataAt(data,targetNo);
				currentClass 	.removeData(currentNo);
			}
			currentClass 	.update();
			targetClass 	.update();
			InspectView.stageOut();
		}
	}
	function dropped_new(){
		var o = PageElement_Util.getInitData(newParam.type,newParam.param);
		targetClass 	.addDataAt(o,targetNo);
		targetClass 	.update();
	}
	
	/* ---------- ---------- ---------- */

	function startDraging(){
		_isDraging = true;
	}
	var tID;
	function stopDraging(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			_isDraging = false;
		},100);
	}
	function isDraging(){
		return _isDraging;
	}
	
	return { 
		getFileDropTag:getFileDropTag,
		getDropTag:getDropTag,
		setDrop:setDrop,
		setDrag:setDrag,
		draged:draged,
		dropped:dropped,
		isDraging:isDraging
	}
})();
DragController.FREE_DROP  = "dragClassKey_free";
DragController.FILE_DROP  = "dragClassKey_file";
