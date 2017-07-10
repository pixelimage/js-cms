
ImageMap.LayerClass = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function() {
		var s = '<div class="_layer" data-no="{NO}"></div>';
		this.view = $(s);
		this.v = {}
	}

	p.setData = function(_class,_i){
		this.class = _class;
		this.no = _i;
		this.update();
	}
	p.update = function(){
		var self = this;
		var s = '{I_V1}{I_V2} <div class="_lock">{I_L1}{I_L2}</div> {NO}.{TEXT}';
			s = s.split("{NO}").join(this.no);
			s = s.split("{TEXT}").join(ImageMapCode.getLayerData(this.class.data));
			s = s.split("{I_V1}").join('<span class="_btn_hide_on"><i class="fa fa-eye-slash"></i></span>');
			s = s.split("{I_V2}").join('<span class="_btn_hide_off"><i class="fa fa-eye"></i></span>');
			s = s.split("{I_L1}").join('<span class="_btn_lock_on"><i class="fa fa-lock "></i></span>');
			s = s.split("{I_L2}").join('<span class="_btn_lock_off"><i class="fa fa-unlock-alt "></i></span>');
		this.view.html(s);
	
		this.view.click(function(){ self.selectItem()})
		this.v.btn_hide_on = this.view.find("._btn_hide_on");
		this.v.btn_hide_off = this.view.find("._btn_hide_off");
		this.v.btn_lock_on = this.view.find("._btn_lock_on");
		this.v.btn_lock_off = this.view.find("._btn_lock_off");
		
		this.v.btn_hide_on.click(function(){ self.hideItem(false) })
		this.v.btn_hide_off.click(function(){ self.hideItem(true) })
		this.v.btn_lock_on.click(function(){ self.lockItem(false) })
		this.v.btn_lock_off.click(function(){ self.lockItem(true) })
		
		this.updateCheck();
	}
	p.updateCheck=function(){
		this.v.btn_hide_on.hide();
		this.v.btn_hide_off.hide();
		this.v.btn_lock_on.hide();
		this.v.btn_lock_off.hide();
		
		if(this.class.data.hide){
			this.v.btn_hide_on.show();
		} else{
			this.v.btn_hide_off.show();
		}
		if(this.class.data.lock){
			this.v.btn_lock_on.show();
		} else{
			this.v.btn_lock_off.show();
		}
		if(this.class.isCurrent){
			this.select();
		}
	}
	
	/* ---------- ---------- ---------- */

	p.updateData=function(){
		this.update();
	}
	/* ---------- ---------- ---------- */

	p.selectItem=function(){
		this.class.selectItem();
		// ImageMap.MainStage.selectItem(this.class);
	}
	p.hideItem=function(_b){
		this.class.data.hide = _b;
		ImageMap.MainStage.hideItem(this.no,_b);
		this.updateCheck();
	}
	p.lockItem=function(_b){
		this.class.data.lock = _b;
		ImageMap.MainStage.lockItem(this.no,_b);
		this.updateCheck();
	}
	/* ---------- ---------- ---------- */

	p.select=function(){
		this.view.addClass("_current")
	}
	p.unselect=function(){
		this.view.removeClass("_current")
	}
	
	p.getView=function(){
		return this.view;
	}
	return c;
})();
