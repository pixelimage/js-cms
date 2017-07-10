
MiniEditer.CodeView = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view,_type) {
	  this.init(_view,_type);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_view,_type) {
		var self = this;
		this.v = {}
		this.parentView = _view;
		this.type = _type;
		
		var tag = "";
			tag += '<div class="_text-editor">';
			tag += '	<div class="_name">' +_type+ '</div>';
			tag += '	<div>';
			tag += '		<div class="_presetBtns clearfix"></div>';
			tag += '		<textarea class="codemirror"></textarea>';
			tag += '	</div>';
			tag += '	<div class="_footer clearfix">';
			tag += '		<div class="_status"></div>';
			tag += '	</div>';
			tag += '	<div class="_option clearfix"></div>';
			tag += '</div>';
		this.view = $(tag);
		
		this.textarea = this.view.find("textarea");
		this.parentView.append(this.view);
		
		this.cmEditor = this.createCMEditor(this.textarea,this.type);
		this.v.codemirrorView = this.view.find(".CodeMirror");
		
		this.v.footer	 	= this.view.find('._footer');
		this.v.status	 	= this.view.find('._status');
		
		this.option = new MiniEditer.CodeViewOption(this.view.find("._option"),this.type);
		
		this.preset = new MiniEditer.PresetClass(
			this,
			this.view.find("._presetBtns"),
			this.type,
			function(_s){self.assignTag(_s)}
		);
		
	}
	
	/* ---------- ---------- ---------- */

	p.search = function() {
		CodeMirror.commands.find(this.cmEditor);
	}
	
	p.assignTag = function(tags) {
		var r = this.cmEditor.getSelection();
			r = (r == "") ? (tags[0] + tags[1] + tags[2]) : (tags[0] + r + tags[2]);
		this.cmEditor.replaceSelection(r,"around");
		this.cmEditor.focus();
	}
	
	p.createCMEditor = function(_view,_type) {
		var self = this;
		this.view.addClass(CodeMirrorU.getColorType(_type));
		
		var e = CodeMirrorU.createEditor(_view.get(0),_type,true);
			e.on("change",function(){ self.update(); })
		return e;
	}
	
	p.update = function() {
		this.currentVal = this.option.getData() + this.cmEditor.getValue();
		
		this.callback(this.currentVal);
		this.updateState();
	}
	p.restore = function() {
		this.cmEditor.setValue(this.defVal);
	}
	p.setData = function(_s,_callback) {
		var self = this;
		this.defVal = this.currentVal =  _s;
		this.callback = _callback;
		
		_s = this.option.setData(_s,function(){ self.update(); });
		
		this.cmEditor.setValue(_s);
		this.cmEditor.focus();
		// this.cmEditor.setCursor(99999);
		this.updateState();
	}
	p.resize = function(_h) {
		if(_h< 100) _h = 100;
		this.v.codemirrorView.height(_h);
		this.cmEditor.refresh();
	}
	p.updateState = function() {
		var s = (function(_s1,_s2){ 
			var s = "";
				// s += "行数 : "+_s1.split("\n").length + ' <i class="fa fa-long-arrow-right"></i> ' + '<b>' + _s2.split("\n").length + '行</b>'
				s += "文字数 : "+_s1.length + ' <i class="fa fa-long-arrow-right"></i> ' + '<b>' +_s2.length + '文字</b>'
			return s;
			
		})(this.defVal,this.currentVal);
		this.v.status.html(s); 
		this.updateRestoreBtn();
	}
	p.updateRestoreBtn = function (){
		this.preset.setRestoreBtn(this.defVal == this.currentVal);
	}
	
	
	/* ---------- ---------- ---------- */

	p.stageInit=function(){
		//
	}
	p.stageIn=function( )  {
		this.view.show()
	}
	p.stageOut=function( )  {
		this.view.hide()
	}
	return c;
})();

