
EditableView.PageView_Revision	 = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_storage,_wapper) {
	  this.init(_storage,_wapper);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.init 	 = function(_storage,_wapper) {
		var self = this;
		this.stageInit();
		this.storage = _storage;
		this.id = this.storage.id;
		this.dir = this.storage.dir;
		this.wapper = _wapper;
		this.view = this.wapper.find('._page_revision');
		this.fuki = this.wapper.find('._float_fuki');
		this.wapper.hover(
			 function() { self.stageIn() } ,
			 function() { self.stageOut() }
		)
	}
	
	p.registEvent = function(_id,_callback) {
		if(this.cbs == undefined)this.cbs = {}
		this.cbs[_id] = _callback;
	}
	
	/* ---------- ---------- ---------- */
	
	p.isCreatedPre = false;
	p.createPre = function() {
		if(this.isCreatedPre) return;
		this.isCreatedPre = true;
		var self = this;
		
		var tag = "";
			tag += '<div class="_rev_close"><i class="fa fa-angle-down "></i> ページバックアップ</div>';
			tag += '<div class="_rev_open"></div>';
		this.view.html(tag);
		this.rev_open = this.view.find('._rev_open');
		this.rev_close = this.view.find('._rev_close');
		this.rev_close.hover(
			function() { self.stageIn_core2() },
			function(){}
		);
	}
	
	/* ---------- ---------- ---------- */
	
	p.isCreatedMain = false;
	p.create_main = function() {
		if(this.isCreatedMain) return;
		this.isCreatedMain = true;
		var self = this;
		var revs = CMS_Data.Sitemap.getRevision(this.id,this.dir);
		this.currentDate = "";
		
		var tag = "";
			tag += '	<div class="_rev_title">';
			tag += '		<i class="fa fa-3x fa-clock-o"></i>';
			tag += '		<div class="_r">※ページバックアップは自動では作成されません。まとまった編集を行う前は、自分でページバックアップを追加してください。</div>';
			tag += '	</div>';
			tag += '	<div class="_rev_timeline">';
			tag += '		<div class="_revision_item">';
			tag += '			<div class="_btn_revision_item _btn_revision-currnet" data-id="">'
			tag += '				<span class="_rev_name">現在の状態</span>';
			tag += '			</div>';
			tag += '			<span class="_cms_btn_alpha _btn_revision_add _btn_revision_add-now"><span class="_t">バックアップ</span> <i class="fa fa-plus-circle "></i></span> ';
			tag += '		</div>';
			tag += '		<div class="_revision_item" style="margin-top:10px;">';
			tag += '			<div class="_btn_revision_item _btn_revision-pre" data-id="pre">'
			//tag += '				<span class="_rev_name">最後に保存した状態</span>';
			tag += '				<span class="_rev_name">編集前の状態</span>';
			tag += '			</div>';
			tag += '			<span class="_cms_btn_alpha _btn_revision_add _btn_revision_add-pre"><i class="fa fa-plus-circle "></i></span> ';
			tag += '		</div>';
			tag += '		<div class="_t_kako">ページバックアップ一覧</div>';
			tag += '		<div class="_rev_add_wapper">';
			tag += '			<div class="_rev_add"></div>';
			tag += '		</div>';
			tag += '		<div class="_revisionArea">';
			for (var i = 0; i < revs.length ; i++) { tag += this.getItem(revs[i]) }
			tag += '		</div>';
			tag += '		<div class="_r">※ページバックアップから、過去の編集データを復帰できます。復帰後はページを保存・公開してください。</div>';
			tag += '	</div>';
			tag += '	<div class="_rev_btn_restore">';
			tag += '		<div class="">閉じる</div>';
			tag += '	</div>';
		this.rev_open.html(tag);
		
		this.rev_add = this.view.find('._btn_revision_add');
		this.rev_add_arrow = this.view.find('._rev_add');
		this.revisionArea = this.view.find('._revisionArea');
		
		this.rev_add.hover(
			function(){ self.rev_add_arrow.show() },
			function(){ self.rev_add_arrow.hide() }
		);
		this.view.find('._btn_revision_add-now').click(function(){ self.addRevision(""); });
		this.view.find('._btn_revision_add-pre').click(function(){ self.addRevision("pre"); });
		
		this.btn_restore = this.view.find('._rev_btn_restore');
		this.btn_restore.click(function(){ self.clickRestore(); });
		//
		//
		this.view.on('click','._btn_revision_item',function(){
			self.selectRevision( ($(this).data("id")) );
		});
		this.view.on('click','._btn_revision_remove',function(event){ 
			self.removeRevision( $(this).data("id") );
		});
	
		this.currentNode = this.view.find("._btn_revision-currnet")
		this.currentNodePre = this.view.find("._btn_revision-pre")
		this.currentNode.addClass("_current");
	}
	
	/* ---------- ---------- ---------- */

	p.getItem = function(_date) {	
		var date = this.getFormattedName(_date);
		//var cur = CMS_SaveDateU.getDate()
		//var sa = new Date(cur).getTime() - new Date(date).getTime();
		// var cs = (sa/1000 < 2) ? " _rev_now" : "";
		
		var a = date.split(" ");
		var tag = "";	
			tag += '<div class="_revision_item">';
			tag += '	<div class=" _btn_revision_item" data-id="'+date+'">'
			tag += '		<span class="_rev_name">';
			tag += '			<span class="_rev_date">' +a[0]+ '</span>';
			tag += '			<span class="_rev_time">' +a[1]+ '</span>';
			tag += '		</span>';
			tag += '	</div> ';
			tag += '	<div class="_btn_revision_remove" data-id="'+date+'" style="padding:0 0 0 20px;"><i class="fa fa-times-circle "></i> </div> ';
			tag += '</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	//select
	//リビジョン選択
	
	p.isSelect = false;
	p.currentDate = "";
	p.selectRevision = function(_date) {
		var id = this.getFormattedID(_date);
		var self = this;
		var b = false;
		if(id == ""){
			this.selectCurrent();
		} else if(id == "pre"){
			this.selectCurrentPre();
			b = true;
		} else{
			self.storage.loadRevision( id,function(_data){
				self.selectHistory(_data);
			});
			b = true;
		}
		if(b){
			this.btn_restore.addClass("_active")//.hide().fadeIn(200);
			this.currentDate = _date;
			this.isSelect = true;
		} else{
			this.btn_restore.removeClass("_active");
			this.currentDate = "";
			this.isSelect = false;
		}
		this.updateSelect();
	}
	p.selectCurrent = function() {
		this.cbs["selectCurrent"](this.latestData);
	}
	p.selectCurrentPre = function() {
		this.cbs["selectCurrentPre"]();
	}
	p.selectHistory = function(_data) {
		this.cbs["selectHistory"](_data);
	}
	p.saved = function() {	
		this.currentDate = "";
		this.updateSelect();
	}
		
	/* ---------- ---------- ---------- */
	//add 
	p.tID_add;
	p.addingTimer;
	p.addRevision = function(_extra) {
		var self = this;
		if(this.tID_add) clearTimeout(this.tID_add);
		this.addRevisionCore(_extra);
		this.rev_add.css("opacity",0.5);
		this.addingTimer = true;
		this.tID_add = setTimeout(function(){
			self.addingTimer = false;
			self.rev_add.css("opacity",1)
		},1000);
	}
	p.addRevisionCore = function(_extra) {
		if(this.addingTimer) return;
		if(window.isLocked(true))return;
		var self = this;
		var date = CMS_SaveDateU.getDate();
		var id = this.getFormattedID(date);
		this.storage.addRevision(date,id,function(){
			self.addRevisionCore_update( $(self.getItem(date)) );
		},_extra);
	}
	p.addRevisionCore_update = function(_v) {
		this.revisionArea.prepend( _v );
		_v.hide().delay(500).fadeIn(200)
	}
	
	//remove 
	p.removeRevision = function(_id) {
		if(window.isLocked(true))return;
		var self = this;
		var id = this.getFormattedID(_id);
		this.items = this.view.find('._btn_revision_item');
		for (var i = 0; i < this.items.length ; i++) {
			if(this.items.eq(i).data("id") == _id) {
				this.items.eq(i).parent().slideUp();
			}
		}
		this.storage.removeRevision(_id,id);
		this.selectRevision();
	}
	
	/* ---------- ---------- ---------- */
	
	p.updateSelect = function() {
		if(this.currentNode){
			this.currentNode.removeClass("_current");
		}
		this.items = this.view.find('._btn_revision_item');
		for (var i = 0; i < this.items.length ; i++) {
			if(this.items.eq(i).data("id") == this.currentDate) {
				this.currentNode = this.items.eq(i);
				this.currentNode.addClass("_current");
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	
	p.getFormattedID = function(_s) {
		if(!_s)return ""
		_s = _s.split("/").join("");
		_s = _s.split(" ").join("_");
		_s = _s.split(":").join("");
		return _s;
	}
	p.getFormattedName = function(_s) {
		if(!_s)return ""
		// _s = _s.split(" ")[0];
		return _s;
	}
	/* ---------- ---------- ---------- */
	
	p.isFirst = true;
	p.openFlg = false;
	p.latestData
	
	p.stageInit=function(){
		this.openFlg = false
	}
	p.tID_stage;
	p.stageIn = function()  {
		var self = this;
		if(this.tID_stage) clearTimeout(this.tID_stage);
		this.tID_stage = setTimeout(function(){
			self.stageIn_core()
		},200);
	}
	p.stageIn_core = function( )  {
		if (! this.openFlg) { this.openFlg = true;
			this.isFirst = false;
			this.isSelect = false;
			this.fuki.fadeIn(50);
			this.createPre();
		}
	}
	p.stageIn_core2 = function( )  {
		var self = this;
		if(this.tID_stage) clearTimeout(this.tID_stage);
		this.tID_stage = setTimeout(function(){
			self.stageIn_core2_delay()
		},200);
	}
	p.stageIn_core2_delay = function( )  {
		this.create_main()
		this.rev_open.fadeIn(200)
		this.currentDate = "";
		this.latestData = this.storage.exportJSON();
		this.updateSelect()
		CMS_MainController.closeInspectView();
	}
	/**/
	p.tID_stage;
	p.stageOut = function( )  {
		if(this.isSelect)return;
		var self = this;
		if(this.tID_stage) clearTimeout(this.tID_stage);
		this.tID_stage = setTimeout(function(){
			self.stageOut_core()
		},200);
	}
	p.stageOut_core = function( )  {
		if (this.openFlg) { 
			this.openFlg = false;
			this.fuki.hide()
			if(this.rev_open){
				this.rev_open.hide()
			}
		}
	}
	p.clickRestore = function( )  {
		this.stageOut_core();
	}
	return c;
})();




