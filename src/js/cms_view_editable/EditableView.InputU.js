
EditableView.InputU = (function(){
	
	function getNo(_s){
		return Number($(_s).attr("data-no"));
	}
	
	function addData(_type){
		var cellTypes = _type;
		var o = {};
		for (var i = 0; i < cellTypes.length ; i++) {
			var cell = cellTypes[i];
			var val = "";
			val = cell.def;
			if(typeof cell.def == "function") {
				val = cell.def()
			}
			//2017-08-28 19:12:47
			if(typeof cell.def == "object") {
				val = JSON.parse(JSON.stringify(cell.def));
			}
			if(val == ""){
				if(cell.type == CELL_TYPE.SELECT){
					for (var g = 0; g < cell.vals.length ; g++) {
						if(cell.vals[g][2] == "1")val = cell.vals[g][0]; 
					}
				}	
			}
			if(val=="DATE_ID"){
				val = DateUtil.getFormattedDate(new Date(),"YYYYMMDD_RRRRR");
			}
			o[cell.id] = val;
		}
		o._state = ["publicData"];
		return o;
	}
	
	function getTenten(_s){
		var s = "";
		if(_s){
			s = ".";
			var gg = Math.floor(_s.length/5);
			for (var i = 0; i <  gg ; i++) {
				s += ".";
			}
		} else{
			s = "";
		}
		return s.split(".....").join("..... ");
	}
	
	return { 
		getNo:getNo,
		addData:addData,
		getTenten:getTenten
		
	}
})();
