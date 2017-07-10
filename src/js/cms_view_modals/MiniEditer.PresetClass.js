
MiniEditer.PresetClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_parent,_view,_type,_callback) {
	  this.init(_parent,_view,_type,_callback);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init = function(_parent,_view,_type,_callback) {
		this.parent = _parent;
		this.view = _view;
		this.type = _type;
		this.callback = _callback;
		this.v = {};
		this.view.html(this.getTag(this.type));
		this.setBtn();
	}

	p.getTag = function(_type){
		var tag = "";
			tag += '<span class="_presetItem _btn_restore"><i class="fa fa-reply "></i> 編集前に戻す</span> ';
			
		if (_type == "class"){ return tag; }
		if (_type == "style") { return tag; };
		if (_type == "svg") { return tag; };
		// if (_type == "html") { return tag; };
		if (_type == "js") { return tag; };
		
			// tag += '<span class="_presetItem _btn_sampleText _type-multi">サンプル文書</span> ';
			// tag += '<span class="_presetItem _btn_sampleMarkDown  _type-markdown">サンプルMarkdown</span> ';
			
			tag += '<span class="_presetItem _btn_search"><i class="fa fa-search "></i> 検索</span> ';
			
			tag += '<div class="_presetGloup">';
			tag += '	<span class="_presetTitle">文字スタイル <i class="fa fa-caret-down "></i> </span> ';
			tag += '	<div class="_presetBody">';
			tag += '		<span class="_presetItem _btn_tag_br"		><b>改行 &lt;br&gt;</b></span> ';
			tag += '		<span class="_presetItem _btn_tag_hr"		><b>区切り線 &lt;hr&gt;</b></span> ';
			tag += '		<span class="_hr"></span> ';
			tag += '		<span class="_presetItem _btn_tag_big"		><span style="font-size:120%">大 &lt;big&gt;</span></span> ';
			tag += '		<span class="_presetItem _btn_tag_small"	><span style="font-size:85%">小 &lt;small&gt;</span></span> ';
			tag += '		<span class="_presetItem _btn_tag_bold"		><b>太字 &lt;bold&gt;</b></span> ';
			tag += '		<span class="_presetItem _btn_tag_strong"	><strong>強調 &lt;strong&gt;</strong></span> ';
			tag += '		<span class="_presetItem _btn_tag_notes"	><span class="notes">注釈 &lt;span.notes&gt;</span></span> ';
			tag += '		<span class="_hr"></span> ';
			tag += '		<span class="_presetItem _btn_tag_red"		><b style="color:red">強調：赤 &lt;b&gt;</b></span> ';
			tag += '		<span class="_presetItem _btn_tag_blue"		><b style="color:blue">強調：青 &lt;b&gt;</b></span> ';
			tag += '		<span class="_presetItem _btn_tag_yellow"	><b style="background:yellow">強調：黄 &lt;b&gt;</b></span> ';
			tag += '	</div>';
			tag += '</div>';
			
			tag += '<div class="_presetGloup">';
			tag += '	<span class="_presetTitle">定型文 <i class="fa fa-caret-down "></i> </span> ';
			tag += '	<div class="_presetBody">';
			tag += '		<span class="_presetItem _btn_tag_a"		><i class="fa fa-caret-right "></i> リンク</span> ';
			tag += '		<span class="_presetItem _btn_tag_blank"	><i class="fa fa-external-link-square "></i>  リンク</span> ';
			tag += '		<span class="_presetItem _btn_tag_mail"	><i class="fa fa-envelope "></i> メール</span> ';
			tag += '		<span class="_hr"></span> ';
			tag += '		<span class="_presetItem _btn_sampleText20"	> サンプル文書20文字</span> ';
			tag += '		<span class="_presetItem _btn_sampleText100"	> サンプル文書100文字</span> ';
			tag += '		<span class="_presetItem _btn_sampleText500"	> サンプル文書500文字</span> ';
			tag += '		<span class="_presetItem _btn_sampleMarkDown"	> サンプルMarkdown</span> ';
			tag += '	</div>';
			tag += '</div>';
			
			tag += '<span class="_presetItem _btn_embedtag">{{埋込タグ}}</span> ';
			
		return tag;
	}
	
	p.setBtn = function(){
		var self = this;
		var view = this.view;
		view.find('._add_style')		.click(function(){ self.gePresetCSS()});
		//
		view.find('._btn_tag_br')		.click(function(){ self.assignTag(['<br>','',''])});
		view.find('._btn_tag_bold')		.click(function(){ self.assignTag(['<b>','太字','</b>'])});
		view.find('._btn_tag_strong')	.click(function(){ self.assignTag(['<strong>','強調','</strong>'])});
		view.find('._btn_tag_notes')	.click(function(){ self.assignTag(['<span class="notes">','強調','</span>'])});
		view.find('._btn_tag_red')		.click(function(){ self.assignTag(['<b style="color:red">','赤','</b>'])});
		view.find('._btn_tag_blue')		.click(function(){ self.assignTag(['<b style="color:blue">','青','</b>'])});
		view.find('._btn_tag_yellow')	.click(function(){ self.assignTag(['<b style="background:yellow">','黄','</b>'])});
		view.find('._btn_tag_hr')		.click(function(){ self.assignTag(['<hr>','',''])});

		view.find('._btn_tag_big')		.click(function(){ self.assignTag(['<big>','大きく','</big>'])});
		view.find('._btn_tag_small')	.click(function(){ self.assignTag(['<small>','小さく','</small>'])});
		view.find('._btn_tag_a')		.click(function(){ self.assignTag([' <a href="http://www.google.co.jp">{-} ','リンク','</a>\n'])});
		view.find('._btn_tag_blank')	.click(function(){ self.assignTag([' <a href="http://www.google.co.jp" target="_blank">{+}','リンク','</a>\n'])});
		view.find('._btn_tag_mail')		.click(function(){ self.assignTag([' <a href="mailto:メールアドレス"><i class="fa fa-envelope "></i>','メールアドレス','</a>\n'])});
		
		view.find('._btn_sampleText20')		.click(function(){ self.sampleText(20)});
		view.find('._btn_sampleText100')	.click(function(){ self.sampleText(100)});
		view.find('._btn_sampleText500')	.click(function(){ self.sampleText(500)});
		view.find('._btn_sampleMarkDown')	.click(function(){ self.sampleMarkDown()});
		
		view.find('._btn_embedtag').click(function() {
			EmbedTagListView.stageIn("my",function(_s){
				self.assignTag([_s+'\n',"",""]);
			});
		});
		
		this.v.btn_restore = view.find('._btn_restore')
		this.v.btn_restore.click(function(){ self.parent.restore()});
		view.find('._btn_search').click(function(){ self.parent.search()});
		
		// view.find('._presetCSS').click(function(){
		// 	var offset = $(this).offset();
		//  	Preset_ClassView.stageIn( 
		//  		function(_s) {self.assignTag([" " + _s,'','']) }, 
		//  		$(this).data("type"),
		//  		{ x: offset.left, y: offset.top }
	 //		);
		// });
		this.assingHober()
	}
	
	/* ---------- ---------- ---------- */
	
	p.assingHober = function(_b){
		var tID;
			var self = this;
		this.view.find('._presetGloup').hover(function(){
			var tar = $(this);
			if(tID) clearTimeout(tID);
			tID = setTimeout(function(){
				tar.addClass("_active");
			},200);
			
		},function(){
			if(tID) clearTimeout(tID);
			self.resetHover();
		});
	}
	p.resetHover = function(){
	 	this.view.find("._active").removeClass("_active");
	}
	
	/* ---------- ---------- ---------- */
	
	p.setRestoreBtn = function(_b){
		if(_b){
			this.v.btn_restore.removeClass("_active")
		} else{
			this.v.btn_restore.addClass("_active")
		}
	}
	p.assignTag = function(_tag,_delay){
		if(_delay ==undefined) _delay= 200;
		var self = this;
		if(_delay){
			setTimeout(function(){
				self.callback(_tag);
			},_delay);
		} else{
			this.callback(_tag)
		}
		this.resetHover()
	}
	p.sampleText = function(_n){
		if(_n == 20){
			this.assignTag([ "","","サンプルの文書ですので、ご注意ください。"])
		}
		var s = "サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。サンプルの文書ですので、ご注意ください。"
		if(_n == 100){
			this.assignTag([ "","",s]);
		}
		if(_n == 500){
			this.assignTag([ "","",s+s+s+s+s]);
		}
	}
	p.sampleMarkDown = function(){
		this.assignTag([ "","",PageElement.tag.markdown.getInitText()])
	}
	return c;
})();