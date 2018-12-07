
var AnimU = (function(){
	
	var func_;
	function attention(_param){
		var v = _param.v;
		var d = (_param.d) ? _param.d/1000:0;
		
		if(func_)func_.remove();
		func_ = new serial_([
			d , function () {
				v.addClass("_current");
			}
			,0.15, function () {
				v.removeClass("_current");
			}
		]);
		func_.start();
	}
	
	var serial_ = (function() {
		var c = function(_args) {
			this.args = _args;
			this.currentNo = 0;
			this.playingFlg = false;
			this.isPause = false;
		}
		var p = c.prototype;
		p.start = function( ) {
			if(! this.playingFlg){
				this.playingFlg = true;
				this.execute_core();
			}
		}
		p.execute_core = function ( ) {
			if (this.playingFlg) {
				if (this.currentNo < this.args.length) {
					var command = this.args[this.currentNo];
					if (typeof(command) != "number") {
						command();
						this.execute_next();
					}else {
						var this_ = this;
						setTimeout(function(){
							this_.execute_next()
						},command * 1000);
					}
				} else {
					this.funish();
				}
			}
		}
		p.execute_next = function  ( ) {
			if(this.isPause) return;
			if(this.playingFlg){
				this.currentNo++;
				this.execute_core();
			}
		}
		p.funish = function  ( ) {
			this.playingFlg = false;
			this.init();
		}
		p.pause = function  ( ) {
			this.isPause = true;
		}
		p.restart = function  ( ) {
			this.isPause = false;
			this.execute_next();
		}
		p.jump = function  ( _n) {
			this.currentNo = _n-1;
		}
		p.init = function  ( ) {
			this.playingFlg = false;
			this.currentNo = 0;
		}
		p.remove = function  ( ) {
			this.currentNo = 0;
			this.playingFlg = false;
		}
		return c;
	})();
	
	return {
		attention: attention,
		serial_: serial_
	}})();
