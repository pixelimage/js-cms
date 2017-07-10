
PageModel.Object_Grid = (function() {
	/* ---------- ---------- ---------- */
	var c = function(o,addPub) {
	 this.init(o,addPub);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	p.addPub
	p.init = function (o,_addPub){
		this.param = o; 
		this.addPub = (_addPub == undefined) ? true : _addPub;
		this.setParam();
	}
	p.setParam = function (){
		this.isNarrow	 = (this.param.isNarrow !== undefined) ? this.param.isNarrow : false;
		this.gridType 	 = this.param.gridType;
		this.gridInfo 	 = this.param.gridInfo;
		this.multiGridRepeat = this.param.multiGridRepeat;
		this.textData 	 = this.param.textData;
		this.hideGridEdit  = (this.param.hideGridEdit !== undefined) ? this.param.hideGridEdit : false;
		
		if(this.param.gridData){
			if(this.addPub){
				var pub = new PageModel.OG_Cell({
					id: "publicData",
					name: "公開",
					type: CELL_TYPE.CHECK,
					style: "",
					view: "",
					def: "1"
				});
				this.param.gridData.cells.unshift(pub);
				var edit = new PageModel.OG_Cell({
					id: "_state",
					name: "編集フラグ",
					type: CELL_TYPE.STATE,
					style: "",
					view: "",
					def: ""
				});
				this.param.gridData.cells.push(edit);
			}
		}
		this.gridData  = this.param.gridData;
	}
	p.getInitData = function (_o,_n){
		if(_n == undefined) _n = 1;
		var o = { texts:{}, grid:[] }
		if(this.textData){
			for (var i = 0; i < this.textData.cells.length ; i++) {
				var tar = this.textData.cells[i];
				o.texts[tar.id] = tar.def;
			}
		}
		if(this.param.gridData){
			for (var n = 0; n < _n ; n++) {
				o.grid[n] = {}
				for (var i = 0; i < this.param.gridData.cells.length ; i++) {
					var tar = this.param.gridData.cells[i];
					o.grid[n][tar.id] = tar.def;
				}
			}

		}
		_o[this.gridInfo.id] = o;
	}
	p.getTestTag = function() {
		function _getTag(_list){
			var tag = "";
			tag += '	<table>';
			tag += '	<tr>';
			tag += '	<td>';
			tag += _list.info.getTestTag();
			tag += '	</td>';
			tag += '	<td>';
			tag += '		<table class="_ut_grid">';
			tag += '			<tr>';
			tag += '			<th>id</th>';
			tag += '			<th>name</th>';
			tag += '			<th>type</th>';
			tag += '			<th>view</th>';
			tag += '			<th>def</th>';
			tag += '			<th>note</th>';
			tag += '			<th>list</th>';
			tag += '			<th>style</th>';
			//tag += '			<th>class_</th>';
			tag += '			<th>vals</th>';
			tag += '			</tr>';
			var cells = _list.cells;
			for (var i = 0; i <  cells.length ; i++) {
				tag += cells[i].getTestTag()
			}
			tag += '		</table>';
			tag += '	</td>';
			tag += '	</tr>';
			tag += '	</table>';
			return tag
		}
		
		var gridTag = "";
		gridTag += '<div class="_ut_gridText_text">'
		if(this.textData != undefined){
			gridTag += _getTag(this.textData)
		}
		gridTag += '</div>';
		
		gridTag += '<div class="_ut_gridText_grid">'
		if(this.gridData != undefined){
			gridTag += _getTag(this.gridData)
		}
		gridTag += '</div>';
		
		var tag = "";
			tag += '<div class="_ut_grids">'
			tag += '	<table>';
			tag += '	<tr>';
			tag += '	<td>'+this.gridInfo.getTestTag()+'</td>';
			tag += '	<td>'+gridTag+'</td>';
			tag += '	</tr>';
			tag += '	</table>';
			tag += '</div>';
		return tag;
	}	
	return c;
})();