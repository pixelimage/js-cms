
EditableView.BaseGridU 	 = (function() {
		
	function getGridTag(_gridParam,_list,_state){
		if(_state == undefined)_state = { hideCols:""}
		var _startPage = _state.currentPage;
		var _hideCols = _state.hideCols.split(",");
		
		var maxRow = _state.maxRow;
		var listLeng = _list.length;
		
		//テーブル作成
    	var fragment = document.createDocumentFragment();

        var table = document.createElement('table');
			table.setAttribute('class', '_editableGridTable');
			table.appendChild(_getHeadNode(_gridParam.cells, _hideCols));
		
			fragment.appendChild(_createPager(listLeng,maxRow,_startPage));
			fragment.appendChild(table);
			fragment.appendChild(_createPager(listLeng,maxRow,_startPage));
		
		//データ0の場合
		if(listLeng == 0){
			table.appendChild(_getEmptyNode());
			return fragment;
		}
		
		// var t = new Date();
		//各行追加
		for (var g = 0; g < maxRow ; g++) {
			var i = (_startPage * maxRow) + g;
			if(i >= listLeng) break;
			table.appendChild( _getGridTagRow(_gridParam,i,_list,_hideCols));
		}
	 		
		return fragment;
	}
	
	function _getGridTagRow(_gridParam,i,_list,_hides){
			
        var tr = document.createElement('tr');
			tr.setAttribute('data-no', i);
			tr.setAttribute('class',  (_list[i].publicData != "1") ? "_tr-hide" : "");
			
        var td = document.createElement('td');
			td.setAttribute('class', "_no");
			td.appendChild(document.createTextNode(i+1));
			tr.appendChild(td);
			
		var _state = _initEditState(_list[i]);
		
		for (var ii = 0; ii < _gridParam.cells.length ; ii++) {
			var cell = _gridParam.cells[ii];
			var val = Treatment.toValue(_list[i][cell.id] ,"");
			
			var node;
			var prov = EditableView.InputFormProviderGrid;
			var state = _getEditState(_state, cell.id);
			if(_isVisible(_hides,ii)){
				node = prov[cell.type](i, val, cell,state);
			} else{
				node = prov.edited(i, val, cell,state);
			};
			if(node) tr.appendChild(node);
		}
		
		var editNode1 = (function(){ 
			var s = ""
				s += '<span class="_btn_visi _cms_btn_alpha _btn_move_up" data-no="'+i+'"><i class="fa fa-arrow-up"></i> </span><br>';
				s += '<span class="_btn_visi _cms_btn_alpha _btn_move_down" data-no="'+i+'"><i class="fa fa-arrow-down"></i> </span>'
	        var td = document.createElement('td');
				td.setAttribute('class', "_edit");
				td.innerHTML = s;
				return td;
		})();
		var editNode2 = (function(){ 
			var s = ""
				s += '<span class="_btn_visi _cms_btn_alpha _btn_dup" data-no="'+i+'"><i class="fa fa-files-o"></i> </span><br>'
				s += '<span class="_btn_delete" data-no="'+i+'"></span>';
	        var td = document.createElement('td');
				td.setAttribute('class', "_edit");
				td.innerHTML = s;
				return td;
		})();
		tr.appendChild(editNode1);
		tr.appendChild(editNode2);
		
		return tr;
	}
	
	function _createPager(_leng, _maxRow, _start) {
        var div = document.createElement('div');
		if (_leng <= _maxRow) return div;
		var pages = Math.ceil(_leng / _maxRow);
        var div = document.createElement('div');
			div.setAttribute('class', '_gridPager');
		var s = ""
		for (var i = 0; i < pages; i++) {
			var cs = ""
			if (_start == i) cs += "_current"
			s += '<span class="' + cs + '" data-no="' + i + '">' + (i + 1) + '</span> '
		}
			div.innerHTML = s;
		return div;
	}
	
	function _getHeadNode(_cells,_hides){
        var tr = document.createElement('tr');
        
		var th = document.createElement('th');
			th.innerHTML = "no";
			tr.appendChild(th);
			
		for (var i = 0; i < _cells.length ; i++) {
			var cell = _cells[i];
			var th = document.createElement('th');
			if(i == 0){
				th.innerHTML = cell.name;
				tr.appendChild(th);
			} else{
				if(cell.type != CELL_TYPE.STATE){
					if(_isVisible(_hides,i)){
						th.innerHTML = '<i class="fa fa-caret-down "></i>' + cell.name;
						th.setAttribute("class","_btn_cell_show");
						th.setAttribute("data-no",i);
					} else{
						th.innerHTML = '<i class="fa fa-caret-right "></i> <br>'
						th.setAttribute("class","_btn_cell_show _btn_cell_show-hide");
						th.setAttribute("style","width:10px");
						th.setAttribute("data-no",i);
					}
				tr.appendChild(th);
				}
			}
		}
		var th = document.createElement('th');
			th.innerHTML = "移<br>動";
			tr.appendChild(th);
		var th = document.createElement('th');
			th.setAttribute("style","width:35px");
			th.innerHTML = "複<br>製";
			tr.appendChild(th);
		return tr;
	}
	
	function _getEmptyNode(){
        var tr = document.createElement('tr');
		var s = "";
			s += "<tr>";
			s += '<td colspan="100" class="_nodata"><i class="fa fa-plus-square "></i> ボタンを押して、データを入力してください</td>';
			s += '</tr>';
			tr.innerHTML = s;
		return tr;
	}
	
	function _isVisible (_s,_i){
		if(_s == undefined) return true;
		if(_s.length == 0) return true;
		if(_s.length <= _i) return true;
		return (_s[_i] === "0") ? false:true;
	}
	
	function _initEditState(_o){
		if(_o[CELL_TYPE.STATE] === undefined) _o[CELL_TYPE.STATE] = [];
		return _o[CELL_TYPE.STATE]
	}
	
	function _getEditState(_a,_id){
		var b = false;
		for (var g = 0; g <  _a.length ;g++) {
			if(_a[g] == _id) b = true;
		}
		return b;
	}
	
	/* ---------- ---------- ---------- */

	//マルチグリッドで使用してる
	//カード検索オブジェクトの、検索条件サマリー表示
	
	function getGridTagSum(_gridParam,_list){
		var tag = '<table class="_editableGridSum">';
		for (var i = 0; i < _list.length ; i++) {
			tag += "<tr>";
			for (var ii = 0; ii < _gridParam.cells.length ; ii++) {
				var cell = _gridParam.cells[ii];
				var val = Treatment.toValue(_list[i][cell.id] ,"");
				if(cell.view == "one") tag += '<td>' + val + '</td>';
			}
			tag += "</tr>";
		}
		tag += "</table>";
		return tag;
	}
	
	// "0110"のように、テキストで配列をあつかう
	function strintState(_s,_no){
		if(_s === undefined) _s = "1"
		if(_s === "")_s = "1"
		var a = _s.split(",")
		var leng = a.length;
		for (var i = 0; i <= _no ; i++) {
			if(leng <= i)a[i] = "1"
		}
		a[_no] = (a[_no] == "1") ? "0" : "1";
		return a.join(",");
	}
	
	function textToArray (csv,cellTypes){
		var lines = csv.split("\n");
		var list = [];
		for (var i = 1; i < lines.length ; i++) {
			var o = {};
			var d = BR_2_N(lines[i]).split("	");
			if(d.length === 1 && d[0] === ""){
				//
			}else{
				var count = 0;
				for (var ii = 0; ii < cellTypes.length ; ii++) {
					d[count] = TAB_2_N(d[count]);
					
					var cell = cellTypes[ii];
					switch (cell.type) {
							
						case CELL_TYPE.ANCHOR :
							//このタイプは、2セルデータを使用
							o[cell.id] = {
								href	: d[count+0],
								target	: d[count+1]
							};
							if(o[cell.id].href ===undefined)o[cell.id].href = "";
							if(o[cell.id].target ===undefined)o[cell.id].target = "";
							count++;
							break;
							
						case CELL_TYPE.BTN :
							// //このタイプは、4セルデータを使用
							o[cell.id] = {
								href	: d[count+0],
								target	: d[count+1],
								text	: d[count+2],
								class_	: d[count+3],
								image	: ""
							};
							if(o[cell.id].href 		===undefined) o[cell.id].href = "";
							if(o[cell.id].target 	===undefined) o[cell.id].target = "";
							if(o[cell.id].text 		===undefined) o[cell.id].text = "";
							if(o[cell.id].class_ 	===undefined) o[cell.id].class_ = "";
							
							count++;
							count++;
							count++;
							break;
							
						case CELL_TYPE.IMAGE :
							o[cell.id] = {
								mode	: getImageMode( d[count] ),
								path	: getImageLayoutDB( d[count] ),
								width	: getExelString( d[count+1] ),
								ratio	: getExelString( d[count+2] )
							};
							count++;
							count++;
							
							break;
						
						default :
							if(d[count] != ""){
								o[cell.id] = d[count];
							}
					}
					count++
				}
				list.push(o);
			}
		}
		return list;
	}
	
	function arrayToText (list,cellTypes){
		var csv = [];
		var a = [];
		
		//見出し（1行目）
		for (var i = 0; i < cellTypes.length ; i++) {
			var cell = cellTypes[i];
			switch (cell.type) {
			case CELL_TYPE.ANCHOR :
				a.push("●"+cell.name)
				a.push("●リンクターゲット")
				break;
				
			case CELL_TYPE.BTN :
				a.push("●"+cell.name)
				a.push("●リンクターゲット")
				a.push("●リンクラベル名")
				a.push("●リンククラス名")
				break;
			
			case CELL_TYPE.IMAGE :
				a.push("●"+cell.name)
				a.push("●画像幅")
				a.push("●画像比率")
				break;
			
			case CELL_TYPE.STATE : break;
			
			default :
				a.push("●"+cell.name);
			}
		}
		csv.push(a.join("	"));
		
		//データ（2行目〜）
		for (var i = 0; i < list.length ; i++) {
			var row = [];
			for (var ii = 0; ii < cellTypes.length ; ii++) {
				var b = true;
				if(cellTypes[ii].type === CELL_TYPE.STATE) b = false;//編集ステートは書き出さない
				//
				if(b){
					var cell = cellTypes[ii];
					var val = list[i][cell.id];
					if(val){
						if(cell.type == CELL_TYPE.ANCHOR){
							val = val.href + "	" +  val.target;
							
						} else if(cell.type == CELL_TYPE.BTN){
							val = [
								val.href,
								val.target,
								val.text,
								val.class_
							].join("	");
							
						} else if(cell.type == CELL_TYPE.IMAGE){
							val = [
								setImageLayoutDB(val.path),
								"["+val.width+"]",
								"["+val.ratio+"]"
							].join("	");
							
						} else{
							val = N_2_TAB(val);
							
						}
						val = N_2_BR(val);
					} 
					row.push(val);
				}
			}
			csv.push(row.join("	"));
		}
		return csv.join("\n");
	}
	
	/* ---------- ---------- ---------- */
	
	//画像ブロックに、レイアウトモードを追加したので、
	//表計算出力に対応させる (IDを発行し、IO対応)
	
	var ImageLayoutDB = {}
	
	function setImageLayoutDB(_val){
		if(typeof _val == "string") return _val;
		var uid = DateUtil.getRandamCharas(10);
		ImageLayoutDB[uid] = _val;
		return "{IMAGE_ID:" + uid + "}";
	}
	
	window.ImageLayoutDB = ImageLayoutDB;
	function getExelString(_s){
		_s = _s.split("[").join("");
		_s = _s.split("]").join("");
		return _s;
	}
	function getImageMode(_uid){
		if(_uid.indexOf("{IMAGE_ID:") != -1) return "layout";
		return "simple";
	}
	function getImageLayoutDB(_uid){
		if(_uid.indexOf("{IMAGE_ID:") == -1){ return _uid; }
		_uid = _uid.split("{IMAGE_ID:").join("")
		_uid = _uid.split("}").join("");
		if(ImageLayoutDB[_uid]){
			return ImageLayoutDB[_uid];
		}
		return {};
	}
	
	/* ---------- ---------- ---------- */
	
	var BR = "{_BR}";
	
	function N_2_BR(_s){
		if (_s == undefined) return ""; 
		_s = _s.split("<br />").join("&lt;br&gt;");
		_s = _s.split("<br>").join("&lt;br&gt;");
		_s = _s.split("\n").join(BR);
		return _s;
	}
	
	function BR_2_N(_s){
		if (_s == undefined) return "";
		_s = _s.split("&lt;br&gt;").join("<br>");
		_s = _s.split(BR).join("\n");
		return _s;
	}
	
	var TAB = "{_T}";
	function N_2_TAB(_s){
		if (_s == undefined) return ""; 
		if(_s == "\t") _s = "";
		_s = _s.split("\t").join(TAB);
		return _s;
	}
	
	function TAB_2_N(_s){
		if (_s == undefined) return "";
		_s = _s.split(TAB).join("\t");
		return _s;
	}
	
	return {
		textToArray:textToArray,
		arrayToText:arrayToText,
		getGridTag:getGridTag,
		getGridTagSum:getGridTagSum,
		strintState:strintState
	}
})();

