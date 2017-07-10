
ImageMap.RectViewClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_type) {
	  this.init(_type);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	p.xy;
	p.size;
	p.type = "";
	
	p.init = function(_type) {
		var self = this;
		this.v = {}
		this.view = $('<div class="_design-item"></div>');
		// this.viewIn = this.view
		this.viewIn = $('<div class="_design-item-in"></div>');
		this.view.append(this.viewIn)
		this.type = _type;
		this.setEvent();
	}
	
	/* ---------- ---------- ---------- */

	p.isCurrent;
	p.setEvent = function(){
		var self = this;
		this.isCurrent = false;
		
		//クリック
		this.view.click(function(){
			if(!self.isLock){
				self.select();
			}
		});
		this.viewIn.hover(function(){
			self.setEventResize();
			if(self.getRatio() != false){
				self.viewIn.resizable({aspectRatio:self.getRatio()});
			}
		});
	}
	
	//ホバーするまで、イベントアサインしない
	p.isSetResizeEvent;
	p.setEventResize = function(){
		
		if(this.isSetResizeEvent )return;
		this.isSetResizeEvent = true;
		
		var self = this;
		
		//リサイズイベント
		var ratio = false;
		if(ImageMapCode.isImage(this.type)) ratio = 1;
		this.viewIn.resizable({
			autoHide:false,
			aspectRatio:ratio,
			minWidth:5,
			minHeight:5,
			stop: function( event, ui ) {
			 	self.data.rect.width = ui.size.width;
			 	self.data.rect.height = ui.size.height;
				self.updateRectLive();
            	self.selectItem();
			 }
		});
		
		//回転イベント
        var params = {
            stop: function(event, ui) { 
			 	self.data.rect.rotate = ui.angle.current / Math.PI * 180 ;
            	self.selectItem();
            },
            wheelRotate: false, 
            rotationCenterX: 50.0, 
            rotationCenterY: 50.0
        };
        this.viewIn.rotatable(params);
        
		//ドラッグインベント 
		this.view.draggable({
			 stop: function( event, ui ) { 
			 	self.data.rect.top = ui.position.top;
			 	self.data.rect.left = ui.position.left;
            	self.selectItem();
			 }
		});
		this.updateLockItem();
	}
	
	/* ---------- ---------- ---------- */
	
	p.no = 0;
	p.getRatio = function(){
		var ratio = false;
		if(ImageMapCode.isImage(this.type)){
			var w = this.viewIn.find("._design-item-image").width();
			var h = this.viewIn.find("._design-item-image").height();
			this.viewIn.width(w);
			this.viewIn.height(h);
			ratio = Math.round(w/h*10)/10;
		}
		return ratio;
	}
	
	/* ---------- ---------- ---------- */

	p.setNo = function(_no){
		this.no = _no
	}
	p.isInit = true;
	
	p.setData = function(_data){
		var self = this;
		this.data = _data;
		if(this.isInit){
			this.mainView = ImageMapCode.createItemView(this.type);
			this.viewIn.append(this.mainView);
			this.isInit = false;
			this.v.btn_remove = $('<div class="_btn_remove"><i class="fa fa-fw fa-times "></i></div>');
			this.viewIn.append(this.v.btn_remove);
			this.v.btn_remove.click(function(){  
				self.select();
				ImageMap.MainStage.removeItem();
			});
		}
		
		/* ---------- ---------- ---------- */
		
		this.view.css({
			"position":"absolute",
			"top": this.data.rect.top +"px",
			"left": this.data.rect.left +"px"
		});
		
		var rad = this.data.rect.rotate / 180 * Math.PI;
		this.viewIn.css({
			"position":"absolute",
			"top": "0px",
			"left": "0px",
			"width": this.data.rect.width + "px",
			"height": this.data.rect.height+"px",
			"transform-origin": "50% 50% 0px",
			"transform": "rotate("+rad+"rad)"
		});
		
		this.hideItem(this.data.hide);
		this.lockItem(this.data.lock);
		this.updateHandle();
		
		ImageMapExport.getItemTag( this.type,this.mainView,this.data );
		if(this.layer){
			this.layer.updateData();
		}
	}
	
	/* ---------- ---------- ---------- */

	p.unselect = function(){
		this.isCurrent = false;
		this.view.removeClass("_current");
	}
	p.select = function(){
		this.isCurrent = true;
		ImageMap.MainStage.selectItem(this);
		this.view.addClass("_current");
	}
	
	/* ---------- ---------- ---------- */
	
	p.updateImage = function(){
		ImageMapExport.getItemTag( this.type,this.mainView,this.data );
	}
	
	/* ---------- ---------- ---------- */
	
	p.updateRectLive = function(){
		var self = this;
		if(ImageMapCode.isLine(self.type)){
			ImageMap.InspectView.updateState();
		}
	}
	/* ---------- ---------- ---------- */
	
	p.updateHandle = function(){
		if(this.data.rect.width < 60 || this.data.rect.height < 60 ){
			this.view.addClass("_hide_handle");
		} else{
			this.view.removeClass("_hide_handle");
		}
	}
	
	p.adjustRect = function(){
		var grid = ImageMap.State.grid;
		if(isNaN(grid))return;
		if(!grid) return;
		
		this.data.rect.top = ImageMapU.adjustH(this.data.rect.top);
		this.data.rect.left = ImageMapU.adjustW(this.data.rect.left);
		this.data.rect.width = ImageMapU.adjustW(this.data.rect.width);
		this.data.rect.height = ImageMapU.adjustH(this.data.rect.height);
		this.view.css({
			"position":"absolute",
			"top": this.data.rect.top +"px",
			"left": this.data.rect.left +"px",
			"width": this.data.rect.width + "px",
			"height": this.data.rect.height+"px"
		});
	}
	p.selectItem = function(){
		this.updateHandle();
		this.adjustRect();
		this.select();
	}
	
	p.isHide = false;
	p.hideItem = function(_b){
		this.isHide =_b;
		if(_b){
			this.view.addClass("_hide");
		} else{
			this.view.removeClass("_hide");
		}
	}
	p.isLock = false;
	p.lockItem = function(_b){
		this.isLock =_b;
		this.updateLockItem();
	}
	p.updateLockItem = function(){
		if(this.isSetResizeEvent){
			if(this.isLock){
				this.view.addClass("_lock");
				this.view.draggable( "disable" );
				this.viewIn.resizable( "disable" );
				this.viewIn.rotatable( "disable" );
			} else{
				this.view.removeClass("_lock");
				this.view.draggable( "enable" );
				this.viewIn.resizable( "enable" );
				this.viewIn.rotatable( "enable" );
			}
		}
	}
	
	/* ---------- ---------- ---------- */
	
	p.getData = function(){
		return JSON.parse(JSON.stringify(this.data));
	}
	p.getJson = function(){
		return JSON.stringify(this.data, null, "	");
	}
	p.setID = function(_id){
		this.data.id = _id;
	}
	p.setJson = function(_s){
		var data
		try{
		  data = JSON.parse(_s);
		} catch( e ){
			alert("データ形式が正しくありません。");
			return;
		}
		if(data){
			this.setData(data);
		}
	}
	p.editJson = function(){
		var self = this;
		Editer_JSONView.stageIn(
			self.getJson(),
			function(_s){ 
				self.setJson(_s)
			}
		);
	}
	
	
	p.getView = function(){
		return this.view;
	}
	p.remove = function(){
		this.view.remove();
	}
	return c;
})();



	