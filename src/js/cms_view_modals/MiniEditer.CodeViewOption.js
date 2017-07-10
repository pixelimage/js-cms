
MiniEditer.CodeViewOption = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_type) {
	  this.init(_view,_type);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function(_view,_type) {
		this.view = _view;
		this.type = _type;
		this.v = {}
		
		this.createView()
	}

	/* ---------- ---------- ---------- */
	//改行チェック
	
	p.createView = function(){
		var self = this;
		
		var tag = "";
			tag += '<div class="_checks_p" style="padding:5px 0 0 0;">';
			tag += '※改行は&lt;BR&gt;に変換されます';
			tag += '</div>';
			tag += '<div class="_checks_html" style="padding:5px 0 0 0;">';
			tag += '※改行する場合は&lt;BR&gt;を入力';
			tag += '</div>';
			tag += '<div class="_checks">';
			tag += '	<span class="_check_no_br"><i class="fa fa-square-o"></i> 改行 <i class="fa fa-arrow-right "></i> &lt;BR&gt;</span>';
			tag += '	<span class="_check_no_br_ac"><i class="fa fa-check-square"></i> 改行 <i class="fa fa-arrow-right "></i> &lt;BR&gt;</span>';
			tag += '</div>';
			tag += '<div class="_attrs">';
			tag += 'セル属性 : <input type="text" class="_in_attr" placeholder=\'colspan="2"\'>'
			tag += '</div>';
		this.view.append(tag);
		this.v.attrs 		= this.view.find('._attrs');
		this.v.in_attr 		= this.view.find('._in_attr');
		this.v.in_attr.keyup(function(){ self.update_attr();})
		
		this.v.checks	 		= this.view.find('._checks');
		this.v.checks_p		 	= this.view.find('._checks_p');
		this.v.checks_html		= this.view.find('._checks_html');
		this.v.check_no_br	 	= this.view.find('._check_no_br');
		this.v.check_no_br_ac 	= this.view.find('._check_no_br_ac');
		
		this.v.check_no_br		.click(function(){ self.update_br(false,true) });
		this.v.check_no_br_ac	.click(function(){ self.update_br(true,true) });
	}	
	
	/* ---------- ---------- ---------- */
	
	p.hasAttrBR = false;
	p.hasAttrTD = false;
	
	p.setData = function(_s,_callback){
		var s = _s;
		this.callback = _callback;
		
		/* ---------- ---------- ---------- */
		
		this.hasAttrTD = (function(_t){ 
		 	if(_t == "table") return true;
		 	return false;
		})(this.type);
		
		this.v.in_attr.val("")
		if(this.hasAttrTD){
			this.v.in_attr.val(CMS_TagU.getCellAttr(s))
			s = CMS_TagU.deleteCellAttr(s);
			this.v.attrs.show();
		} else{
			this.v.attrs.hide();
		}
		
		/* ---------- ---------- ---------- */

		this.hasAttrBR = (function(_t){ 
		 	if(_t == "multi") return true;
		 	if(_t == "table") return true;
		 	return false;
		})(this.type);
		
		this.v.checks.hide()
		this.v.checks_p.hide()
		this.v.checks_html.hide()
		if(this.hasAttrBR){
			this.update_br( CMS_TagU.hasCellBR(s) );
			s = CMS_TagU.deleteCellBR(s);
			this.v.checks.show()
		} else{
			if(this.type == "p"){ this.v.checks_p.show() }
			if(this.type == "code"){ this.v.checks_p.show() }
			if(this.type == "html"){ this.v.checks_html.show() }
		}
		return s
	}
		
	/* ---------- ---------- ---------- */
	
	p.init_attr = function(_s){
		this.v.in_attr.focus().val(s);
	}
	p.update_attr = function(){
		// var s = this.v.in_attr.val();
		this.update();
	}
	
	/* ---------- ---------- ---------- */
	p.isNotBR = false;
	p.update_br = function(_b,_isUpdate){
		this.isNotBR = _b;
		this.v.check_no_br.hide();
		this.v.check_no_br_ac.hide();
		if(_b){
			this.v.check_no_br.show();
		} else{
			this.v.check_no_br_ac.show();
		}
		if(_isUpdate) this.update();
	}
	
	/* ---------- ---------- ---------- */

	p.update = function(){
		this.callback();
	}
	
	p.getData = function(){
		var s = "";
		
		if(this.hasAttrTD){
			var att = this.v.in_attr.val();
			if( att != "")		{ s += "[[" +att+ "]]" ; }
		}
		if(this.hasAttrBR){
			if( this.isNotBR )	{ s += NOT_BR; }
		}
		return s;
	}
	return c;
})();
