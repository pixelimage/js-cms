
EditableView.TextPageView 	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_pageModel,_data,_parentView,_wapper) {
	  this.init(_pageModel,_data,_parentView,_wapper);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init 			 = function(_pageModel,_data,_parentView,_wapper) {
		this.v = {};
		this.v.parentView = _parentView;
		this.wapperClass = _wapper;
		this.model  = _pageModel;
		this.type 	 = _pageModel.type;
		this.name 	 = _pageModel.id;
		this.dir 	 = _pageModel.dir
		this.extention = FileU.getExtention(this.name);

		this.storage = _data;
	}
	
	/* ---------- ---------- ---------- */

	p.createView  =function (){
		var self = this;
		
		var tag = (function(_name,_dir){ 
			var s = "";
				s += '<div class="_editableSetting">';
				s += '	<div class="_header">';
				s += '		<div class="_header_inner">';
				s += '			<div class="_title"> {TITLE}</div>';
				s += '		</div>';
				s += '	</div>';
				s += '	<div class="_body _asset-scroll">'
				s += '		{EDITOR}';
				s += '	</div>';
				s += '	<div class="_footer">';
				s += '		<div class="_btns">'
				s += '			<div class="_btn _btn_search"><i class="fa fa-search "></i> 検索</div>'
				s += '			<div class="_btn _btn_reload"><i class="fa fa-repeat"></i> リロード</div>'
				s += '			<div class="_btn _btn_back"><i class="fa fa- "></i> <i class="fa fa-reply "></i> 編集前に戻す</div>'
				s += '		</div>'
				s += '		<div class="_page_pubs">';
				s += '			<div class="_cms_btn_alpha _btn_save" '+TIP("#+S")+'><i class="fa fa-check "></i> 保存済み</div>';
				s += '			<div class="_cms_btn_alpha _btn_save_pre" '+TIP("#+S")+'><i class="fa fa-pencil "></i> 保存する</div>';
				s += '			<div class="_btn_saveing"><i class="fa fa-cog fa-spin"></i></div>';
				s += '		</div>';
				s += '	</div>';
				s += '	<div class="_addText">';
				s += '		<div class="_btn_close"><i class="fa fa-lg fa-times-circle "></i></div>';
				s += '		<div class="_label"></div>';
				s += '		<textarea></textarea><br>';
				s += '		<div class="_cms_btn _cms_btn_active _btn_embed"><i class="fa fa-level-down fa-rotate-180 "></i> テキストを埋め込む</div>';
				s += '	</div>';
				s += '</div>';
				
			var _t = CMS_Path.ASSET.getAbsPath_deco_file(_name , _dir);
			var read_ = (function(_s){ 
				if(_s == Dic.DirName.TEMPLATE) { return "テンプレートHTMLの編集を行えます。" + CMS_GuideU.getGuideTag("setting/template","テンプレートHTMLについて") }
				return "アセットファイルの編集を行えます。" + CMS_GuideU.getGuideTag("setting/asset","アセットについて") 
			})(this.name, this.dir);
			
			var editor = (function(_s){ 
				var ss = ""
				var extra = self.getExtraTag();
				if(extra){
					ss += '	<div class="_main">'
					ss += '		<div class="_text-editor">'
					ss += '			<textarea class="codemirror"></textarea>'
					ss += '		</div>';
					ss += '	</div>';
					ss += '	<div class="_sub">' + self.getExtraTag() + '</div>';
				} else{
					ss += '	<div class="_text-editor">'
					ss += '		<textarea class="codemirror"></textarea>'
					ss += '	</div>';
				}
				return ss;
			})();
			
			s = s.split("{TITLE}").join('<div class="_fs12 _filePath_wh _cms_btn_alpha">' + _t +'</div>');
			s = s.split("{EDITOR}").join(editor);
			s = s.split("{READ}").join(read_);
			return s;
		})(this.name,this.dir);
		
		this.view = $(tag);
		this.v.parentView.append(this.view);
		this.v._editText = this.view.find('textarea');
		this.v.textEditor = this.view.find('._text-editor');
		
		this.setBtn();
		
		this.initAddText();
		this.initExtra();
		this.initEditor();
		this.initData();
		// this.initFindCSS();
		
		this.initResize();
		// this.stageInit();
	}
	
	/* ---------- ---------- ---------- */

	p.getExtraTag 		 =function (){
		var tag = '';
		return tag;
	}
	p.initExtra 		 =function (){
		var self = this;
		// this.v.cssState = this.view.find("._cssState");
		// this.view.find("._btn_designCss").click(function(){ 
		// 	var u = CSS_DESIGN_URL
		// 	var s = self.v.cssState.val();
		// 	if(s) u += "?class=" + s;
		// 	window.open(u ,"css_design");
		// });
		// this.initFindCSS();
	}
	
	/* ---------- ---------- ---------- */

	p.setBtn 		 =function (){
		var self = this;
		
		this.v.btn_save		= this.view.find('._btn_save');
		this.v.btn_save_pre	= this.view.find('._btn_save_pre');
		this.v.btn_saveing	= this.view.find('._btn_saveing');
		this.v.btn_search 	= this.view.find('._btn_search');
		this.v.btn_reload 	= this.view.find('._btn_reload');
		this.v.btn_back 	= this.view.find('._btn_back');
		
		this.v.btn_save		.click(function(){ self.saveData(); });
		this.v.btn_save_pre	.click(function(){ self.saveData(); });
		this.v.btn_search	.click(function(){ self.search() });
		this.v.btn_reload	.click(function(){ self.reload() });
		this.v.btn_back		.click(function(){ self.restoreText() });
		
	}
	
	/* ---------- ---------- ---------- */

	p.codeminerEditor
	p.codeminerView
	p.initEditor = function(){
		var self = this;
		// this.v.textEditor.addClass(CodeMirrorU.getColorType(this.extention));
		
		var changeFirst = true
		this.codeminerEditor = CodeMirrorU.createSettingEditor(this.v._editText.get(0),this.extention,false);
		this.codeminerEditor.foldCode(CodeMirror.Pos(0,0));
		this.codeminerEditor.on("change",function(){
			if(changeFirst) {
				changeFirst = false
				return;
			}
			self.activeSaveBtn();
		})
		this.codeminerView = this.view.find(".CodeMirror");
	}
	
	/* ---------- ---------- ---------- */
	//テキスト追加
	
	p.initAddText = function(){
		var self = this;
		this.v.addText 				= this.view.find('._addText');
		this.v.btn_close 			= this.view.find('._addText ._btn_close');
		this.v.addText_label 		= this.view.find('._addText ._label');
		this.v.addText_btn_embed 	= this.view.find('._addText ._btn_embed');
		this.v.addText_textarea 	= this.view.find('._addText textarea');
		this.v.addText.hide();
		
		this.v.btn_close.click(function(){
			self.v.addText.hide();
		})
		this.v.addText_btn_embed.click(function(){
			self.appendText(self.v.addText_textarea.val());
			self.v.addText.hide();
		})
	}
	p.openAddTextWin = function(_key){
		this.v.addText.show();
		this.v.addText_label.html(_key.label)
		this.v.addText_textarea.val(_key.data)
	}
	
	p.appendText = function(_s){
		this.codeminerEditor.replaceSelection(_s,"around");
		this.codeminerEditor.focus();
	}
	
	
	/* ---------- ---------- ---------- */
	//CSS検索
	
	// p.initFindCSS = function(){
	// 	var self = this;
	// 	this.v.cssState.keyup(function(){
	// 		self.find($(this).val());
	// 	});
	// }
	p.findCSS = function(_key){
		// this.v.cssState.val(_key).keyup();
		this.find(_key);
	}
	p.tID_delay;
	p.find = function(_key){
		if(!_key)return;
		
		var l = this._findRow(this.codeminerEditor.getValue().split("\n"),_key);
		if(l != false){
			this.codeminerEditor.scrollIntoView({line:0,ch:0});
		    this.codeminerEditor.setSelection(
		    	{line:l[0],ch:l[1]},
		    	{line:l[0],ch:l[1] + _key.length }
		    );
		    this.codeminerEditor.scrollIntoView({line:l[0]+5,ch:0},true);
			// CodeMirror.commands.find(this.codeminerEditor);
		}
	}
	p._findRow = function(_a,_s){
		for (var i = 0; i <  _a.length ; i++) {
			if(_a[i].indexOf(_s) != -1){
				 return [ i , _a[i].indexOf(_s) ];
			}
		}
		return false;
	}
	p.search 	 =function(){
		CodeMirror.commands.find(this.codeminerEditor);
	}
	p.reload 	 =function(){
		var self = this;
		this.storage.reload(function(){
			self.initData();
		});
		
	}
	p.restoreText 	 =function(){
		this.codeminerEditor.setValue(this.initDataText)
	}
		
	/* ---------- ---------- ---------- */
	//#データ
	
	p.initDataText = "";
	p.initData = function (){
		this.initDataText = this.storage.text
		this.codeminerEditor.setValue(this.storage.text);
		
		this.initSaveBtn();
		
		//上えコール
		if(this.wapperClass){
			if(this.wapperClass.openedTextPage){
				this.wapperClass.openedTextPage(this.model);
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	//#Save Preview
	
	p.initSaveBtn  =function(){
		this.disableSaveBtn(true);
	}
	p.saveData = function (_isPreview){
		if(window.isLocked(true))return;
		var this_ = this;
		var s = this.codeminerEditor.getValue();
		this.storage.save(s,function(){
			this_.saveData_comp();
		});
		this.activeSaveingBtn();
	}
	p.saveData_comp = function (){
		this.disableSaveBtn();
		
		//上えコール
		if(this.wapperClass){
			if(this.wapperClass.savedTextPage){
				this.wapperClass.savedTextPage(this.model);
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	//#保存ボタン表示
	
	p.activeSaveBtn  =function(){
		this.v.btn_save.hide();
		this.v.btn_save_pre.show();
	}
	p.activeSaveingBtn  =function(){
		this.v.btn_saveing.show();
	}
	p.disableSaveBtn  =function(_b){
		var this_ = this;
		if(_b){
			this.disableSaveBtn_core()
		} else{
			setTimeout(function(){
				this_.disableSaveBtn_core()
			},500);
		}
	}
	p.disableSaveBtn_core  =function(){
		this.v.btn_save.show();
		this.v.btn_save_pre.hide();
		this.v.btn_saveing.hide();
	}
	/* ---------- ---------- ---------- */
	
	p.previewData =function (_callback){}
	
	/* ---------- ---------- ---------- */
	//#Stage
	
	p.isOpen = false;
	p.isFirst = true;
	p.stageInit 	 = function (){
		this.view.hide();
	}
	p.tID
	p.stageIn = function (_extra){
		if(! this.isOpen){ this.isOpen = true;
			var self = this;
			if(this.isFirst){
				this.createView()
				this.resize();
			}
			this.isFirst = false;
			this.view.show();
			if(_extra) {
				if(_extra["find"]){
					setTimeout(function(){
						self.find(_extra.find);
					},200);
				}
				if(_extra["findCss"]){
					setTimeout(function(){
						self.findCSS(_extra.findCss);
					},200);
				}
				if(_extra["addText"]){
					setTimeout(function(){
						self.openAddTextWin(_extra.addText);
					},200);
				}
			}
		}
	}
	p.stageOut = function (){
		if(this.isOpen){ this.isOpen = false;
			this.view.hide();
		}
	}
	
	/* ---------- ---------- ---------- */
	
	p.remove 		 = function (){
	}	
	
	/* ---------- ---------- ---------- */
	
	p.initResize 		 = function (){
		var self = this;
		if(this.wapperClass["registResize"]){
			this.wapperClass.registResize(function(){
				self.resize();
			});
		}
	}	
	p.resize 		 = function (){
		if(this.isOpen){
			if(this.wapperClass["getH"]){
				this.codeminerView.height(this.wapperClass.getH() -80);
			}
		}
	}	
	return c;
})();
