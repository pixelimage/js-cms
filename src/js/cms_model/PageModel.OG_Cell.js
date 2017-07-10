
PageModel.OG_Cell 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view) {
		this.init(_view);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.param;
	p.id;
	p.name;
	p.type;//入力タイプ 
	p.view; //detail:詳細編集画面の項目, one :マルチグリッド時にサマリーで表示する項目
	p.def;//初期値をいれる
	p.note;//注釈
	p.vals;//セレクトボックスのアイテムs
	p.placeholder;
	
	p.list;//候補リスト
	p.codeType;//フォームのコードの種類。HTML,CSS,JSなど
	p.style;
	//p.class_;
	p.init = function(o) {
		this.param = o;
		this.setParam();
	}
	
	p.setParam = function (){
		this.id  = defaultVal(this.param.id, "--");
		this.name  = defaultVal(this.param.name, "-");
		this.type  = defaultVal(this.param.type, CELL_TYPE.SINGLE);
		this.view  = defaultVal(this.param.view, "");
		this.def  = defaultVal(this.param.def, "");
		this.note  = defaultVal(this.param.note, "");
		
		this.list  = defaultVal(this.param.list, "");
		this.style  = defaultVal(this.param.style, "");
		//this.class_ = defaultVal(this.param.class_, "");
		this.vals  = defaultVal(this.param.vals, ["--"]);
		this.placeholder = defaultVal(this.param.placeholder, "");
		//
		var ts = this.type.split(",")
		this.type = ts[0]
		this.codeType = "text";
		if(ts[1]){ this.codeType = ts[1]; }
	}
	p.getTestTag = function() {
		var tag = "";
			tag += '<tr>';
			tag += '<td class="id">' + this.id + '</td>';
			tag += '<td class="name">' + this.name + '</td>';
			tag += '<td class="type">' + this.type + '</td>';
			tag += '<td class="view">' + this.view + '</td>';
			tag += '<td class="def">' + this.def + '</td>';
			tag += '<td class="note">' + this.note + '</td>';
			
			tag += '<td class="list">' + this.list + '</td>';
			tag += '<td class="style">' + this.style + '</td>';
			//tag += '<td class="class_">' + this.class_ + '</td>';
			tag += '<td class="vals">' + this.vals + '</td>';
			tag += '</tr>';
		return tag;
	}
	return c;
})();