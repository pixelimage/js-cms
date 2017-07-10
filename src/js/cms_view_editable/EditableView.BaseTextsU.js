
EditableView.BaseTextsU 	 = (function() {
	
	function getTextsTag (_gridParam,_list){
		var nodes = [];
		for (var i = 0; i < 1 ; i++) {
			for (var ii = 0; ii < _gridParam.cells.length ; ii++) {
				var cell = _gridParam.cells[ii];
				var val = Treatment.toValue(_list[i][cell.id] ,"");
				nodes.push({
					name:cell.name,
					node:EditableView.InputFormProvider[cell.type](i,val,cell)
				});
			}
		}
		//
    	var fragment = document.createDocumentFragment();

        var table = document.createElement('table');
			table.setAttribute('class', '_layoutTable');
		fragment.appendChild(table);
			
		for (var i = 0; i < nodes.length; i++) {
	        var tr = document.createElement('tr');
	        var th = document.createElement('th');
	        	th.setAttribute('class', '_cellTitle');
				th.innerHTML = nodes[i].name;
			
	        var td = document.createElement('td');
	        if(nodes[i].node){
	        	td.appendChild(nodes[i].node)
	        }
				tr.appendChild(th);
				tr.appendChild(td);
			table.appendChild(tr);
		}
		return fragment;
	}
	
	//マルチグリッドで使用してる
	//カード検索オブジェクトの、検索条件サマリー表示
	function getTextsTagSum(_gridParam,_list){
		var tag = '<div class="_editableTextsSum">';
		for (var i = 0; i < _list.length ; i++) {
			for (var ii = 0; ii < _gridParam.cells.length ; ii++) {
				var cell = _gridParam.cells[ii];
				var val = Treatment.toValue(_list[i][cell.id] ,"");
				if(cell.view == "one") tag += val + '<br>';
			}
		}
		tag += "</div>";
		return tag;
	}
	return {
		getTextsTag:getTextsTag,
		getTextsTagSum:getTextsTagSum
	}
	
})();
