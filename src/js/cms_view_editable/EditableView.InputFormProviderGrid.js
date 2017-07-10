
EditableView.InputFormProviderGrid = (function(){
	
	function _brText(_s){ return _s.split("\n").join("<br>"); }
	
	/* ---------- ---------- ---------- */

	function _td_core(i, val, cell,state,_type) { 
		var s = CMS_TagU.deleteCellAttr(val);
			s = CMS_TagU.convertCellBR(s);
		var edited = (state) ? " _edited":"";
        var td = document.createElement('td');
			td.setAttribute('class', "_editableTD" + edited);
			td.setAttribute('style', cell.style);
			td.setAttribute('data-no', i);
			td.setAttribute('data-id', cell.id);
			td.setAttribute('data-type', cell.type);
			td.setAttribute('data-input', _type);
			td.innerHTML = s;
		return td;
	}
	
	function single	(i, val, cell, state) { return _td_core(i, val, cell, state, "input") }
	function multi	(i, val, cell, state) { return _td_core(i, val, cell, state, "textarea") }
	function table	(i, val, cell, state) { return _td_core(i, val, cell, state, "table") }
	
	/* ---------- ---------- ---------- */

	function _state(i, val, cell,state) { return null; } 
	
	/* ---------- ---------- ---------- */
	
	function _createTD(state) {
		var edited = (state) ? " _edited":"";
        var td = document.createElement('td');
			td.setAttribute('class', edited);
		return td;
	}
	
	/* ---------- ---------- ---------- */

	function select(i, val, cell,state) {
		var input = EditableView.InputFormProvider.select(i, val, cell);
        var td = _createTD(state);
			td.appendChild(input);
		return td;
	}
	function checkbox(i, val, cell,state) {
		var input = EditableView.InputFormProvider.checkbox(i, val, cell);
        var td = _createTD(state);
			td.appendChild(input);
		return td;
	}
	function image(i, val, cell,state) {
		var input = EditableView.InputFormProvider.image(i, val, cell);
        var td = _createTD(state);
			td.appendChild(input);
		return td;
	}
	function anchor(i, val, cell,state) {
		var input =  EditableView.InputFormProvider.anchor(i, val, cell);
        var td = _createTD(state);
			td.appendChild(input);
		return td;
	}
	function textAnchor(i, val, cell,state) {
		var input = EditableView.InputFormProvider.textAnchor(i, val, cell);
        var td = _createTD(state);
			td.appendChild(input);
		return td;
	}
	function yyyymmdd(i, val, cell,state) {
		var input = EditableView.InputFormProvider.yyyymmdd(i, val, cell);
        var td = _createTD(state);
			td.appendChild(input);
		return td;
	}
	
	function edited(i, val, cell,state){
		var s;
		switch(cell.type){
			case CELL_TYPE.YYYYMMDD		: s = '...';break;
			case CELL_TYPE.SELECT		: s = '...';break;
			case CELL_TYPE.CHECK		: s = '...';break;
			case CELL_TYPE.IMAGE		: s = '...画像<';break;
			case CELL_TYPE.ANCHOR		: s = '...リンク';break;
			case CELL_TYPE.BTN	: s = '...ボタン';break;
			case CELL_TYPE.STATE		: break;
			default :
		}
		var edited = (state) ? " _edited":"";
    	var td = document.createElement('td');
		if(s){
			td.appendChild(document.createTextNode(s));
		} else{
			td.setAttribute('class', "_editableTDHide"+edited);
			td.setAttribute('data-no', i);
			td.setAttribute('data-id', cell.id);
			td.setAttribute('data-type', cell.type);
			td.setAttribute('data-input', cell.type);
			td.appendChild(document.createTextNode(EditableView.InputU.getTenten(val)));
		}
			return td;
	}
	
	/* ---------- ---------- ---------- */

	return {
		single: single,
		multi: multi,
		table: table,
		select: select,
		checkbox: checkbox,
		
		image: image,
		anchor: anchor,
		textAnchor: textAnchor,
		yyyymmdd: yyyymmdd,
		
		_state:_state,
		edited:edited
	}
})();
