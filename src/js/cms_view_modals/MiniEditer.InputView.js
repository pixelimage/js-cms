
MiniEditer.InputView = (function() {
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
			tag += '	<div class="_presetBtns clearfix"></div>';
			tag += '	<input class="_single">';
			tag += '	<div class="_footer clearfix">';
			tag += '		<div class="_status"></div>';
			tag += '	</div>';
			tag += '	<div class="_option clearfix" style="padding:8px 0 0 5px;">';
			tag += '	※改行する場合は&lt;BR&gt;を入力';
			tag += '	</div>';
			tag += '</div>';
		this.view = $(tag);
		this.view.addClass(CodeMirrorU.getColorType(this.type));
		this.parentView.append(this.view);
		this.input = this.view.find("._single");
		this.input.keyup(function(){self.update()});
		this.v.footer	 	= this.view.find('._footer');
		this.v.status	 	= this.view.find('._status');
		
		this.preset = new MiniEditer.PresetClass(
			this,
			this.view.find("._presetBtns"),
			this.type,
			function(_s){self.assignTag(_s)}
		);
	}
	
	/* ---------- ---------- ---------- */

	p.search = function() {
		//
	}
	
	p.assignTag = function(tags) {
		var ele = this.input;
		var pos = {}
			pos.start = ele.get(0).selectionStart;
			pos.end = ele.get(0).selectionEnd;
		var val = ele.val();
		var r = val.slice(pos.start, pos.end);
		if(r == "") {
			r = tags[0] + tags[1] + tags[2]
		} else{
			r = tags[0] + r + tags[2]
		}
		var ts = [ val.slice(0, pos.start) , r + " " , val.slice(pos.end) ];
		ele.val(ts.join(""));
		ele.get(0).setSelectionRange(pos.start + r.length ,pos.start + r.length + 1);
		this.update();
	}
	
	p.update = function() {
		this.currentVal = this.input.val()
		this.callback(this.currentVal);
		this.updateState();
	}
	p.restore = function() {
		this.input.val(this.defVal).keyup();
	}
	p.setData = function(_s,_callback) {
		this.defVal = this.currentVal =  _s;
		this.callback = _callback;
		this.input.val(_s).focus();
		this.input.get(0).setSelectionRange(0,0);
		this.updateState();
	}
	p.resize = function(_h) {
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