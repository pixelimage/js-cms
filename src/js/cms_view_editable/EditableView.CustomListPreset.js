
EditableView.CustomListPreset = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_view) {
	  this.init(_view);
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.view;
	p.v;
	
	p.init = function(_view) {
		this.view = _view;
		this.v = {}
	}
	p.setData = function(_data) {
		if(_data){
			this.param = _data;
		} else{
			this.param = EditableView.CustomListData.getPreset()
		}
	}
	p.createLayout = function() {
		var this_= this;
		var tag = ""
		tag += '<div class="ss_mylist_title"></div>';
		tag += '<div class="ss_mylist_bg">';
		tag += '	<div class="ss_mylist">';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_01" data-no="1"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_02" data-no="2"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_03" data-no="3"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_04" data-no="4"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_05" data-no="5"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_06" data-no="6"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _gs _g_07" data-no="7"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ws _w_01" data-no="1"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ws _w_02" data-no="2"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ws _w_03" data-no="3"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ls _l_01" data-no="1"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ls _l_02" data-no="2"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ls _l_03" data-no="3"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ls _l_04" data-no="4"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ls _l_05" data-no="5"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _ls _l_06" data-no="6"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _wws _ww_01" data-no="1"></div>';
		tag += '		<div class="_cms_btn_alpha _btn _wws _ww_02" data-no="2"></div>';
		 
		tag += '		<input class="_cms_btn_alpha _ts _t_01" onclick="this.select();" value="">';
		tag += '		<div class="_unit _unit_01"></div>';
		
		tag += '		<input class="_cms_btn_alpha _ts _t_02" onclick="this.select();" value="">';
		tag += '		<input class="_cms_btn_alpha _ts _t_02p" onclick="this.select();" value="">';
		tag += '		<div class="_unit _unit_02"></div>';
		
		tag += '		<div class="_layout_L">';
		tag += '			<div class="_cms_btn_alpha _btn _ds_L _d_L_01" data-no="1"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_L _d_L_02" data-no="2"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_L _d_L_03" data-no="3"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_L _d_L_04" data-no="4"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_L _d_L_05" data-no="5"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_L _d_L_06" data-no="6"></div>';
		tag += '		</div>';
		tag += '		<div class="_layout_R">';
		tag += '			<div class="_cms_btn_alpha _btn _ds_R _d_R_01" data-no="1"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_R _d_R_02" data-no="2"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_R _d_R_03" data-no="3"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_R _d_R_04" data-no="4"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_R _d_R_05" data-no="5"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_R _d_R_06" data-no="6"></div>';
		tag += '		</div>';
		tag += '		<div class="_layout_T">';
		tag += '			<div class="_cms_btn_alpha _btn _ds_T _d_T_01" data-no="1"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_T _d_T_02" data-no="2"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_T _d_T_03" data-no="3"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_T _d_T_04" data-no="4"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_T _d_T_05" data-no="5"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_T _d_T_06" data-no="6"></div>';
		tag += '		</div>';
		tag += '		<div class="_layout_B">';
		tag += '			<div class="_cms_btn_alpha _btn _ds_B _d_B_01" data-no="1"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_B _d_B_02" data-no="2"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_B _d_B_03" data-no="3"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_B _d_B_04" data-no="4"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_B _d_B_05" data-no="5"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_B _d_B_06" data-no="6"></div>';
		tag += '		</div>';
		tag += '		<div class="_layout_Z">';
		tag += '			<div class="_cms_btn_alpha _btn _ds_Z _d_Z_01" data-no="1"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_Z _d_Z_02" data-no="2"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_Z _d_Z_03" data-no="3"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_Z _d_Z_04" data-no="4"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_Z _d_Z_05" data-no="5"></div>';
		tag += '			<div class="_cms_btn_alpha _btn _ds_Z _d_Z_06" data-no="6"></div>';
		tag += '		</div>';
		
		tag += '		<div class="_layout_float">';
		tag += '			<div class=" _btn _image_w "></div>';
		tag += '			<input class="_cms_btn_alpha _ts _t_03 " onclick="this.select();" value="">';
		tag += '			<input class="_cms_btn_alpha _ts _t_03p" onclick="this.select();" value="">';
		tag += '			<div class="_unit _unit_03 "></div>';
		tag += '		</div>';
		// tag += '		<div class=" _btn _image_h"></div>';
		// tag += '		<input class="_cms_btn_alpha _ts _t_04 " onclick="this.select();" value="">';
		 
		tag += '	</div>';
		tag += '</div>';

		this.view.html(tag); 
		this.v.ds_L = this.view.find("._ds_L")
		this.v.ds_R = this.view.find("._ds_R")
		this.v.ds_T = this.view.find("._ds_T")
		this.v.ds_B = this.view.find("._ds_B")
		this.v.ds_Z = this.view.find("._ds_Z")
		this.v.ws = this.view.find("._ws")
		this.v.gs = this.view.find("._gs")
		this.v.ls = this.view.find("._ls")
		this.v.wws = this.view.find("._wws")
		
		this.v.t_01 = this.view.find("._t_01")
		this.v.t_02 = this.view.find("._t_02")
		this.v.t_03 = this.view.find("._t_03")
		// this.v.t_04 = this.view.find("._t_04")
		this.v.t_02p = this.view.find("._t_02p")
		this.v.t_03p = this.view.find("._t_03p")
		
		this.v.unit = this.view.find("._unit")
		this.v.unit_01 = this.view.find("._unit_01")
		this.v.unit_02 = this.view.find("._unit_02")
		this.v.unit_03 = this.view.find("._unit_03")
		
		this.v.image_w = this.view.find("._image_w")
		
		this.v.layout_L = this.view.find("._layout_L")
		this.v.layout_R = this.view.find("._layout_R")
		this.v.layout_T = this.view.find("._layout_T")
		this.v.layout_B = this.view.find("._layout_B")
		this.v.layout_Z = this.view.find("._layout_Z")
		this.v.layout_float = this.view.find("._layout_float")

	
		this.v.ds_L.click(function() { this_.setD($(this).data("no")); });
		this.v.ds_R.click(function() { this_.setD($(this).data("no")); });
		this.v.ds_T.click(function() { this_.setD($(this).data("no")); });
		this.v.ds_B.click(function() { this_.setD($(this).data("no")); });
		this.v.ds_Z.click(function() { this_.setD($(this).data("no")); });
		this.v.ws.click(function() { this_.setW($(this).data("no")); });
		this.v.gs.click(function() { this_.setG($(this).data("no")); });
		this.v.ls.click(function() { this_.setL($(this).data("no")); });
		this.v.wws.click(function() { this_.setWW($(this).data("no")); });
		
		this.v.t_01.keyup(function() { this_.changeText(0,$(this).val()) });	
		this.v.t_02.keyup(function() { this_.changeText(1,$(this).val()) });	
		this.v.t_03.keyup(function() { this_.changeText(2,$(this).val()) });	
		// this.v.t_04.keyup(function() { this_.changeText(5,$(this).val()) });	
		
		this.v.t_02p.keyup(function() { this_.changeText(3,$(this).val()) });	
		this.v.t_03p.keyup(function() { this_.changeText(4,$(this).val()) });	
		
		this.update(true,true);
	}
	
	p.changeText = function(_no,_val){
		var this_= this;
		if(this.tID) clearTimeout(this.tID);
		this.tID = setTimeout(function(){
			this_.changeText_core(_no,_val)
		},200);
	}
	
	p.changeText_core = function(_no,_val){
		
		if(_no==0)this.param.t_ww = Number(_val);
		if(_no==1)this.param.t_m = Number(_val);
		if(_no==2)this.param.t_iw = Number(_val);
		if(_no==3)this.param.t_m_p = Number(_val);
		if(_no==4)this.param.t_iw_p = Number(_val);
		// if(_no==5)this.param.t_ih = Number(_val);
		
		if(this.param.t_ww < 100){
			this.param.t_ww = 100;
		}
		this.update(false);
	}
	
	p.setD = function(_no){
		var n = Number(_no)-1;
		this.param.d = n;
		this.update();
	}
	p.setW = function(_no){
		var n = Number(_no)-1;
		this.param.w = n;
		this.update();
	}
	p.setG = function(_no){
		var n = Number(_no)-1;
		this.param.g = n;
		this.update();
	}
	p.setL = function(_no){
		var n = Number(_no)-1;
		this.param.l = n;
		this.update();
	}
	p.setWW = function(_no){
		var n = Number(_no)-1;
		this.param.ww = n;
		this.update();
	}
	
	/* ---------- ---------- ---------- */
	
	var AC = "_active";
	
	p.update = function(_updateView,_init){
		_updateView = (_updateView == undefined) ? true:_updateView;
		_init = (_init == undefined) ? false:_init;
		if(_updateView){
			this.v.ds_L.removeClass(AC);
			this.v.ds_R.removeClass(AC);
			this.v.ds_T.removeClass(AC);
			this.v.ds_B.removeClass(AC);
			this.v.ds_Z.removeClass(AC);
			this.v.ws.removeClass(AC);
			this.v.gs.removeClass(AC);
			this.v.ls.removeClass(AC);
			this.v.wws.removeClass(AC);
			
			var dd = this.param.d
			var dd2 = (function(n){ 
			    var a = [0,0,0,3,3,3];
			    return a[n]
			})(this.param.d);
			this.v.ds_L.eq(dd).addClass(AC);
			this.v.ds_R.eq(dd).addClass(AC);
			this.v.ds_T.eq(dd2).addClass(AC);
			this.v.ds_B.eq(dd2).addClass(AC);
			this.v.ds_Z.eq(dd2).addClass(AC);
			this.v.ws.eq(this.param.w).addClass(AC);
			this.v.gs.eq(this.param.g).addClass(AC);
			this.v.ls.eq(this.param.l).addClass(AC);
			this.v.wws.eq(this.param.ww).addClass(AC);
			
			var isFix = (this.param.ww == 0) ? true:false;
			if(isFix){
				this.v.unit.html("px");
				this.v.t_01.show();
				this.v.unit_01.show();
				//
				this.v.t_02.show();this.v.t_02p.hide();
				this.v.t_03.show();this.v.t_03p.hide();
			} else{
				this.v.unit.html("%");
				this.v.t_01.hide();
				this.v.unit_01.hide();
				//
				this.v.t_02.hide();this.v.t_02p.show();
				this.v.t_03.hide();this.v.t_03p.show();
			}
			
			this.v.layout_L.hide();
			this.v.layout_R.hide();
			this.v.layout_T.hide();
			this.v.layout_B.hide();
			this.v.layout_Z.hide();
			this.v.layout_float.hide()
			if(this.param.l == 0 )this.v.layout_T.show();
			if(this.param.l == 1 )this.v.layout_B.show();
			if(this.param.l == 2 )this.v.layout_L.show();
			if(this.param.l == 3 )this.v.layout_R.show();
			if(this.param.l == 4 )this.v.layout_Z.show();
			if(this.param.l == 2 || this.param.l == 3 ){
				this.v.layout_float.show()
			}
			
			this.v.t_01.val(this.param.t_ww);
			this.v.t_02.val(this.param.t_m);
			this.v.t_03.val(this.param.t_iw);
			// this.v.t_04.val(this.param.t_ih);
			this.v.t_02p.val(this.param.t_m_p);
			this.v.t_03p.val(this.param.t_iw_p);
		}
		if(!_init){
			var htmlCSS = EditableView.CustomListData.getCodes(this.param);
			this.callback(htmlCSS,this.param);
		}
		this.isInit = false;
	}
	
	/* ---------- ---------- ---------- */

	p.openFlg = false;
	p.isFirst = true;
	p.stageInit=function(){
		this.openFlg = false
		this.view.hide()
	}
	p.callback ;
	p.stageIn=function(_callback )  {
		if (! this.openFlg) { this.openFlg = true;
			this.view.show()
			this.callback = _callback;
			if(this.isFirst){
				this.createLayout()
			}
			this.isFirst = false;
			
		}
	}
	p.stageOut=function( )  {
		if (this.openFlg) { this.openFlg = false
		this.view.hide()
		}
	}
	return c;
})();

