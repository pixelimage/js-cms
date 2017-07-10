/**
 * GRID PREVIEW
 * Copyright 2016 Shige Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
*/

if(window["GRID_PAGE_UNIT"] == undefined) GRID_PAGE_UNIT = 10;

var parentFrame;
function setParent(_parent) {
	parentFrame = _parent;
}
function getMainController() {
	return MainController;
}
function getScrollH() {
	return bodyElement().height();
}
function scrollTo_(_abs, _n) {
	var tarY = 0;
	if (_abs == 'abs') {
		tarY = _n;
	} else {
		tarY = bodyElement().scrollTop() + _n;
	}
	var stageH = bodyElement().height() * (State.scale / 100);
		stageH = stageH - $(window).height() + 100;
	if (stageH < tarY) tarY = stageH;

	bodyElement().animate({
		scrollTop: tarY
	},{ duration: 100, ease: 'swing' });
}

function bodyElement() {
	return $('html,body');
}
function bodyElementBtDom(_dom) {
	return $(_dom).find('html,body');
}

var Data = {};
Data.gloups = [];
Data.iframes = [];


var App = {};
var State = {};
var StateReval = {};

var MainController = (function() {
	var view;
	var v = {};

	function init() {
	}

	var gloups;
	var current;

	function setGloups(_data) {

		v.body	= $('body');
		gloups = Data.gloups;
		for (var i = 0; i < _data.length; i++) {
			var g = new GloupView(_data[i]);
			gloups.push(g);
		}
		setEvent();


	}
	var stopEventKeyList = [
		/*32,
		37,38,39,40,41,42,
		49,50,51,
		96,97,
		101,103,104,
		107,
		109*/
		38, 40
	];
	function setEvent() {
		v.body.bind('keydown', function(event) {
			window.parent.keyUp_(event);

			var c = event.keyCode;
			var b = false;

			for (var i = 0; i < stopEventKeyList.length; i++) {
				if (c == stopEventKeyList[i]) b = true;
			}
			if (b) {
				event.stopPropagation();
				event.preventDefault();
			}
		});
	}
	function setState(c1, c2, c3) {
		State = c1;
		StateReval = c2;
		App = c3;
	}
	function update() {
		var s = State.scale / 100;
		var sW = s;
		var sH = s;
		
		// setTimeout(function(){
		v.body.css('-webkit-transform', 'scale(' + sW + ',' + sH + ')');
		v.body.css('-moz-transform', 'scale(' + sW + ',' + sH + ')');
		v.body.css('-ms-transform', 'scale(' + sW + ',' + sH + ')');
		v.body.css('transform', 'scale(' + sW + ',' + sH + ')');
		// },500);

		$('#FrameView').css('width', 100 / sW + '%');
		//$('body').css("margin-top",10+"px");
		//$('#FrameView').css("margin-left",5/s+"px");

		var ma = Math.floor(State.margin / s);
		$('.pageSet').css('margin-right', ma + 'px');
		$('.pageSet').css('margin-bottom', ma + 'px');

		$('.fs16').css('font-size', 16 / s + 'px');
		$('.fs16').css('line-height', 32 / s + 'px');
		
		$('.fs12').css('font-size', 12 / s + 'px');
		$('.fs12').css('line-height', 24 / s + 'px');
		
		$('.mt10').css('margin-top', 10 / s + 'px');
		$('.mb20').css('margin-bottom', 20 / s + 'px');
		
		$('.pageHeader').css('font-size', 12 / s + 'px');
		$('.pageHeader').css('width', State.pagesW + 'px');
		$('.pageHeader').css('height', 15 / s + 'px');

		var sp = 10;
		if (s < 0.25) sp = 5;
		$('.pageFloat .inner').css('padding', sp / s + 'px' + ' 0 ' + sp / s + 'px' + ' 0 ');
		//$('.pageFloat .t_url').css("font-size",12/s+"px");
		$('.pageFloat i').css('font-size', 14 / s + 'px');
		$('.pageFloat i').css('margin-top', 5 / s + 'px');
		$('.pageFloat i').css('margin-right', 5 / s + 'px');

		/* ---------- ---------- ---------- */

		for (var i = 0; i < Data.iframes.length; i++) {
			Data.iframes[i].setW(State.widths);
			Data.iframes[i].setH(State.height);
		}
		v.body.css('background-color', State.background);
		if(State.background != "#fff"){
			v.body.css('background-image',"url(images/grid_grid.png)");
			v.body.css('background-size', State.scale*10);
		} else{
			v.body.css('background',State.background);
		}
		v.body.css('color', State.color);

		if (State.noBR) {
			v.body.addClass('noBR');
		} else {
			v.body.removeClass('noBR');
		}
		if (State.noTitle) {
			v.body.addClass('noTitle');
		} else {
			v.body.removeClass('noTitle');
		}
	}
	function updateReval() {
		for (var i = 0; i < Data.iframes.length; i++) {
			Data.iframes[i].updateReval();
		}
	}

	function callCommand(_c, _a) {
		for (var i = 0; i < Data.iframes.length; i++) {
			Data.iframes[i].callCommand(_c, _a);
		}
	}

	/* ! ---------- スクロール ---------- ---------- ---------- ---------- */

	function setScroll(_abs, _n) {
		for (var i = 0; i < Data.iframes.length; i++) {
			Data.iframes[i].setScroll(_abs, _n);
		}
	}

	var currentGloup;
	var isAll;

	function openGloup(_n) {

		currentGloup = _n;
		isAll = (gloups.length == _n) ? true : false;

		if (isAll) {
			for (var i = 0; i < gloups.length; i++) {
				gloups[i].stageIn();
			}
		} else {
			for (var i = 0; i < gloups.length; i++) {
				gloups[i].stageOut();
			}
			gloups[_n].stageIn();
		}
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */

	function selectPage(_n) {
		for (var i = 0; i < Data.iframes.length; i++) {
			Data.iframes[i].selectPage(_n);
		}
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */


	return {
		init: init,

		setGloups: setGloups,
		setState: setState,
		update: update,
		updateReval: updateReval,
		setScroll: setScroll,

		openGloup: openGloup,
		selectPage: selectPage,
		callCommand: callCommand
	};
})();

var GloupView	= (function() {
	/* ---------- ---------- ---------- */
	var c = function(_data) {
	  this.init(_data);
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	var GLOUP_NO = 0;

	p.parentView;
	p.view;
	p.v;
	p.id;
	p.pages;

	p.init = function(_data) {
		var self = this;
		
		this.data = _data;
		this.v = {};
		this.id = this.data.id;
		
		this.parentView = $('#FrameView');
		this.parentView.append('<div class="gloup" id="' + this.id + '"></div>');
		
		this.view = this.parentView.find('#'+ this.id);
		if(_data.list.length > 0){
			this.view.append('<h2 class="fs16">' + this.data.name + '</h2>');
		}
		this.view.append('<div class="gloup-inner"></div>');
		this.view.append(
			'<div class="mt10 mb20 fs16 btn_more" style="text-align:center">' +
			'<i class="fa fa-caret-down "></i> 次の'+GRID_PAGE_UNIT+'件を表示する</div>');
		
		this.v.btn_more = this.view.find('.btn_more')
		this.v.btn_more.click(function(){ 
			self.showNext();
		});

		this.stageInit();
		this.createLayout_pre();
	};
	// p.miscItems;
	p.createLayout_pre = function() {
		this.pages = [];
		var list = this.data.list;
		var pageCount = 0;
		for (var ii = 0; ii < list.length; ii++) {
			var o = list[ii];
			if(o.type == "sub-gloup"){
				var p = new SugGloupView(o);
				this.pages.push(p);
			} else {
				var p = new PageView(o, pageCount);
				Data.iframes.push(p);
				this.pages.push(p);
				pageCount++;
			}
		}
		// this.miscItems = this.view.find('h2');
	};

	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	p.maxLeng = 0; 
	p.count = 0;
	p.pageList;
	
	p.createLayout = function() {
		this.pageList = [];
		for (var i = 0; i < this.data.list.length; i++) {
			if(this.data.list[i].type == "page"){
				this.pageList.push(this.pages[i]);
			}
		}
		this.maxLeng = this.pageList.length;
		for (var i = 0; i < this.maxLeng; i++) {
			this.pageList[i].stageInit();
		}
		this.showNext();
	};
	p.showNext = function() {
		var leng = this.count + GRID_PAGE_UNIT;
		for (var i = this.count ; i < leng; i++) {
			if(i < this.maxLeng){
				this.pageList[i].stageIn();
				this.count++;
			}
			if(i >= this.maxLeng-1){
				this.v.btn_more.hide();
			}
		}
	}
	
	/* ---------- ---------- ---------- */

	p.openFlg = false;
	p.isFirst = true;
	p.stageInit = function() {
		this.openFlg = false;
		this.view.addClass('disable');
	};
	p.stageIn = function()  {
		if (! this.openFlg) { this.openFlg = true;
			if (this.isFirst) {
				this.createLayout();
			}
			this.isFirst = false;
			this.view.removeClass('disable');
		}
	};
	p.stageOut = function()  {
		if (this.openFlg) { this.openFlg = false;
			this.view.addClass('disable');
		}
	};
	return c;
})();

var SugGloupView	= (function() {
	/* ---------- ---------- ---------- */
	var c = function(_data, _no) {
	  this.init(_data, _no);
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	var PAGE_NO = 0;

	p.init = function(_data) {
		this.data = _data;
		this.parentView = $('#' + this.data.gloup + ' .gloup-inner');
		this.parentView.append('<h3 class="mt10 fs12">'+this.data.name+'</h3>');
	};
	p.stageInit = function() {};
	p.stageIn = function(){};
	p.stageOut = function(){};
	return c;
})();


var PageView	= (function() {
	/* ---------- ---------- ---------- */
	var c = function(_data, _no) {
	  this.init(_data, _no);
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	var PAGE_NO = 0;

	p.parentView;
	p.view;
	p.v;
	p.no;
	p.pageNo;
	p.pageNoAtGloup;
	p.dom;
	p.id;
	p.name;
	p.isAccesable;//iframeにアクセス可能か

	p.init = function(_data, _no) {
		this.data = _data;
		this.pageNoAtGloup = _no;
		this.v = {};
		this.id = this.data.id;
		this.name = this.data.name;
		this.parentView = $('#' + this.data.gloup + ' .gloup-inner');

		this.isAccesable = URL_.isSameDomain(this.data.url, App.app.domain);

		this.pageNo = PAGE_NO;
		this.parentView.append('<div class="pageSet" id="' + this.id + '"></div>');
		this.view = this.parentView.find('#'+ this.id);
		PAGE_NO++;
	};

	/* ! ----------  ---------- ---------- ---------- ---------- */

	p.isCreated = false;
	p.createLayout = function() {
		if (this.isCreated)return;
		var data = this.data;

		this.iframeDoms = [];

		this.createReval();
		this.createRect();
		this.createView_wapper();
		this.bindEvent();
		this.initDisable();
	};

	p.currentH;

	p.createView_wapper = function() {
		this.view.find('.pageFloat').css("visibility","visible");
		var data = this.data;
		this.v.pageHeader	= this.view.find('.pageHeader');
		this.v.pageBody = this.view.find('.pageBody');
		this.v.t_date	= this.view.find('.t_date');
		this.v.t_url	= this.view.find('.t_url');
		this.v.t_name	= this.view.find('.t_name');

		this.v.t_url.html(this.data.url);

		var ws = State.widths;
		this.currentH = State.height;
		for (var ii = 0; ii < ws.length; ii++) {
			this.addPage(ii, ws[ii]);
		}
		this.stageIn();
	};
	p.bindEvent = function() {
		var this_ = this;
		this.v.t_name.click(function() {
			parentFrame.openPreview(this_.iframeURL, this_.pageNoAtGloup);
		});

		this.view.find('.btn_preview').click(function() {
			parentFrame.openPreview(this_.iframeURL, this_.pageNoAtGloup);
		});

		this.view.find('.btn_hide').click(function(event) {
			this_.setDisable();
			event.stopPropagation();
			event.preventDefault();
		});
		this.view.find('.btn_show').click(function(event) {
			this_.setDisable();
			event.stopPropagation();
			event.preventDefault();
		});
		this.view.find('.btn_reload').click(function(event) {
			this_.reload();
			event.stopPropagation();
			event.preventDefault();
		 });
		this.view.find('.btn_edit').click(function(event) {
			this_.edit();
			event.stopPropagation();
			event.preventDefault();
		 });
		this.view.find('.btn_open_page').click(function(event) {
			window.open(this_.iframeURL);
			event.stopPropagation();
			event.preventDefault();
		});
	};
	p.isDisable;
	p.initDisable = function() {
		this.isDisable = false;
	};
	p.setDisable = function() {
		if (this.isDisable) {
			this.view.removeClass('hide');
			this.isDisable = false;
		} else {
			this.view.addClass('hide');
			this.isDisable = true;
		}
	};

	/* ! ----------  ---------- ---------- ---------- ---------- */

	p.iframeDoms;
	p.iframeURL;
	p.addPage = function(i, w) {
		var this_ = this;
		PreviewStackManager.add(function() {
			this_.addPage_core(i, w);
		});
	};
	p.addPage_core = function(i, w) {
		this.isCreated = true;
		this.iframeURL = this.data.url;

		var this_ = this;
		var fID = 'f' + Math.round(Math.random() * 100000000);
		var temp = '';
			temp += '<div class="page">';
			temp += '<div class="iframeView"><iframe id="' + fID + '" src="{URL}" width="{W}" height="{H}" frameborder="0" ></iframe></div>';
			temp += '</div>';
			temp = temp.split('{URL}').join(this.iframeURL);
			temp = temp.split('{W}').join(w);
			temp = temp.split('{H}').join(this.currentH);

		this.v.pageBody.append(temp);
		this.iframeDoms.push(document.getElementById(fID));
		var ele = $(document.getElementById(fID));
			ele.load(function() {
				this_.loaded_init();
				this_.loaded();
			});

	};

	/* ! ----------  ---------- ---------- ---------- ---------- */

	p.upadteLastModified = function() {
		/*
		if (!this.isAccesable)return;
		var this_ = this;
		$.ajax({
			scriptCharset: 'utf-8',
			type: 'GET',
			url: this.iframeURL,
			dataType: 'text',
			success: function(data, status, xhr) {
				var d = new Date(xhr.getResponseHeader('Last-Modified'));
				var s = DateUtil.getRelatedDate(d);
				this_.v.t_date.html(s);
			}
		});
		*/
	};
	p.updateW = function(_ws) {
		var r = this.iframeDoms.length;
		if (_ws.length > r) {
			for (var i = r; i < _ws.length; i++) {
				this.addPage(i, _ws[i]);
			}
		}
	};
	/* ! ----------  ---------- ---------- ---------- ---------- */

	p.edit = function(_dom, _a) {
		// console.log(this.data.url);
		// http://192.168.1.23:999/develop/_cms/
		// http://192.168.1.23:999/develop/html/test_index.html
		// window.open(this.data.url)
		window.open(GRID_EDIT_URL + this.data.url_origin);
	};
	p.reloadAll = function(_dom, _a) {
		this.reload();
	};
	p.reload = function() {
		if (!this.isAccesable)return;
		if (!this.isCreated) return;

		//this.storeCurrentScroll();
		for (var i = 0; i < this.iframeDoms.length; i++) {
			this.iframeDoms[i].contentWindow.document.location.reload();
		}
	};

	p.loaded_init = function() { };
	p.loaded = function() {
		var this_ = this;

		this.upadteLastModified();

		if (!this.reval) return;
		setTimeout(function() {
			this_.reval.resetPrevState();
			this_.reval.updateReval();
			//this_.storedCurrentScroll()
		},200);
	};
	//リロードがあったとき、ぴかっとなる
	p.updateFlash = function() {
		var this_ = this;
		this.view.addClass('reloaded');
		setTimeout(function() {
			this_.view.removeClass('reloaded');
		},500);
	};

	/* ---------- ---------- ---------- */

	p.callCommand = function(_c, _a) {
		this[_c](_a);
	};

	/* ! ----------  ---------- ---------- ---------- ---------- */
	/* ! ----------  ---------- ---------- ---------- ---------- */
	/* ! ----------  ---------- ---------- ---------- ---------- */

	//rect

	p.rectClass;
	p.createRect = function() {
		this.rectClass = new PageView_Rect();
		this.rectClass.setDoms(this.iframeDoms);
	};
	p.setW = function(_w) {
		if (!this.isCreated) return;

		this.rectClass.setW(_w);
		this.updateW(_w);
	};

	p.setH = function(_h) {
		if (!this.isCreated) return;
		this.rectClass.setH(_h);
	};

	p.setScroll = function(_abs, _n) {
		if (!this.isCreated) return;
		if (!this.isAccesable)return;
		if (!this.openFlg)return;

		this.rectClass.setScroll(_abs, _n);
	};

	/* ---------- ---------- ---------- */
	//reval

	p.reval;
	p.createReval = function() {
		if (!this.isAccesable)return;
		this.reval = new PageView_Reval();
		this.reval.setDoms(this.iframeDoms);
	};
	p.updateReval = function() {
		if (!this.isCreated) return;
		if (!this.isAccesable)return;

		this.reval.updateReval();
	};

	/* ---------- ---------- ---------- */

	p.selectPage = function(_n) {
		if (this.iframeURL == _n) {
			this.view.addClass('selected');
		} else {
			this.view.removeClass('selected');
		}
	};
	/* ---------- ---------- ---------- */

	p.openFlg = false;
	p.isFirst = true;
	p.stageInit = function() {
		var tag = '';
			tag += '<div class="pageHeader _btn">';
			tag += '	<span class="hideable t_date"></span>';
			tag += '	<span class="hideable t_no">' + (this.pageNo + 1) + '</span>';
			tag += '	<span class="hideable t_name">' + this.data.name + '</span>';
			tag += '</div>';
			tag += '<div class="pageBody">';
			tag += '</div>';
			tag += '<div class="pageFloat" style="visibility:hidden">';
			tag += '	<div class="inner">';
			tag += '		<span class="_btn hideable btn_preview"><i class="fa fa-reply"></i></span>';
			tag += '		<span class="_btn hideable btn_hide"><i class="fa fa-eye "></i></span>';
			tag += '		<span class="_btn btn_show"><i class="fa fa-eye-slash "></i></span>';
			tag += '		<span class="_btn hideable btn_edit"><i class=" fa fa-pencil "></i></span>';
			tag += '		<span class="_btn hideable btn_reload"><i class=" fa fa-repeat "></i></span>';
			tag += '		<span class="_btn hideable btn_open_page"><i class="fa fa-external-link-square "></i></span>';
			tag += '	</div>';
			tag += '</div>';
		this.view.html(tag);
		
		this.view.find('.pageHeader_preview').click(function() {
			parentFrame.openPreview(this_.iframeURL, this_.pageNoAtGloup);
		});
	};
	p.stageIn = function()  {
		if (! this.openFlg) { this.openFlg = true;
			if (this.isFirst) {
				this.createLayout();
			}
			this.isFirst = false;
			this.view.removeClass('disable');
		}
	};
	p.stageOut = function()  {
		if (this.openFlg) { this.openFlg = false;
			this.view.addClass('disable');
		}
	};
	return c;
})();

var PreviewStackManager = (function() {
	//どじ
	var view;
	var v = {};
	var stack = 0;
	function add(_callback) {
		stack++;
		var delay = Math.floor(stack / 5) * 500;
		setTimeout(function() {
			add_core(_callback);
		},delay);
	}
	function add_core(_callback) {
		stack--;
		_callback();
	}

	return {
		add: add
	 };
})();

var PageView_Rect	= (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */

	p.view;
	p.init = function() {
	};
	p.iframeDoms;
	p.setDoms = function(_doms) {
		this.iframeDoms = _doms;
	};
	p.setW = function( _w) {
		if (this.iframeDoms == null)return;

		var ws = _w;
		// _tar.width(ws[0]);

		for (var i = 0; i < this.iframeDoms.length; i++) {

			$(this.iframeDoms[i]).width(ws[i]);
			if (ws[i]) {
				$(this.iframeDoms[i]).width(ws[i]);
				$(this.iframeDoms[i]).show();
			} else {
				$(this.iframeDoms[i]).hide();
			}
		}
	};
	p.setH = function(_h) {
		if (this.iframeDoms == null)return;

		this.currentH = _h;
		if (this.currentH == 'fit') {
			this.resizeFrameFit();
		} else {
			// _tar.height(_h);
			for (var i = 0; i < this.iframeDoms.length; i++) {
				$(this.iframeDoms[i]).height(_h);
			}
		}
	};
	p.resizeFrameFit = function() {
		function core(_dom) {
			var h = $(_dom.contentWindow.document).find('body').height();
			if (h > 100) $(_dom).height(h);
		}
		for (var i = 0; i < this.iframeDoms.length; i++) {
			core(this.iframeDoms[i]);
		}
	};
	p.setScroll = function(_abs, _n) {
		if (this.iframeDoms == null)return;

		if (_n == null) _n = 100;
		var this_ = this;

		function core(_abs, _n, _dom) {
			var tar;
			try {
			  tar = $(_dom.contentWindow.document).find('body');
			}catch (e) {
				return;
			}
			var n = 0;
			if (_abs == 'abs') {
				n = _n;
			} else {
				try {
					n = tar.scrollTop() + _n;
				}catch (e) {}
			}
			/*tar.animate({
				scrollTop:n
			},{ duration: 100,ease:"swing" });
			*/
			bodyElementBtDom(_dom.contentWindow.document).animate({
				scrollTop: n
			},{ duration: 100, ease: 'swing' });

		}
		for (var i = 0; i < this.iframeDoms.length; i++) {
			core(_abs, _n, this.iframeDoms[i]);
		}
	};

	return c;
})();

var PageView_Reval = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */

	p.view;
	p.v;

	p.init = function() {
	};

	p.iframeDoms;
	p.setDoms = function(_doms) {
		this.iframeDoms = _doms;
	};

	/* ---------- ---------- ---------- */

	p.updateReval = function() {
		if (this.iframeDoms == null)return;

		//最初のiframeのみ処理を行う
		this.jq(this.iframeDoms[0]);
		this.showHide(this.iframeDoms[0]);
		this.showIso(this.iframeDoms[0]);
		this.showBK(this.iframeDoms[0]);
		this.showLine(this.iframeDoms[0]);
		this.showClass(this.iframeDoms[0]);
		this.showLink(this.iframeDoms[0]);
		this.showImg(this.iframeDoms[0]);
	};

	p.prevState;
	p.resetPrevState = function() {
		this.prevState = null;
	};
	p.checkPrevState = function(_s, _newV) {
		if (this.prevState == null)this.prevState = {};
		//if(this.prevState[_s] == null)this.prevState[_s] = _def;
		var b = true;
		if (this.prevState[_s] == null) {
			b = true;
		} else {
			if (this.prevState[_s] == _newV) {
				b = false;
			} else {
				b = true;
			}
		}
		this.prevState[_s] = _newV;
		return b;
	};

	/* ---------- ---------- ---------- */


	/* ---------- ---------- ---------- */

	p.jqInit;
	p.jq = function(_dom) {
	/*
		var update = this.checkPrevState("text",StateReval.jq);
		if(!update) return;

		if(StateReval.jq == "")return;

		var d = _dom.contentWindow.document.body
		if(this.jqInit){
			d.removeChild(this.jqInit);
		}

		this.jqInit = document.createElement('script');
		this.jqInit.type = 'text/javascript';
		d.appendChild(this.jqInit);

		var s = "window.func_ = function(){"+StateReval.jq+"}";
		s = StateReval.jq
		this.jqInit.innerHTML = s;
		*/
	};

	/* ---------- ---------- ---------- */

	p.showHide_selected;
	p.showHide = function(_dom) {
		if (this.checkPrevState('text_hide', StateReval.text)
		|| this.checkPrevState('isHide', StateReval.isHide)) { } else {
			return;
		}
		this.resetHide(_dom);

		if (StateReval.text == '')return;
		if (! StateReval.isHide)return;

		var list = this.find_(_dom.contentWindow.document, StateReval.text);
		this.showHide_selected = this.getVisibleList(list);
		this.addStyle(this.showHide_selected, 'display:none;');
		//this.addStyle(this.showHide_selected,"opacity:0.5;");
	};

	p.resetHide = function(_dom) {
		if (!this.showHide_selected)return;
		this.addStyle(this.showHide_selected, 'display:block;');
		//this.addStyle(this.showHide_selected,"opacity:1;");
	};

	/* ---------- ---------- ---------- */

	p.showIso_node;
	p.showIso_selected;
	p.showIso_hides;
	p.showIso = function(_dom) {
		if (this.checkPrevState('text_iso', StateReval.text)
		|| this.checkPrevState('isIso', StateReval.isIso)) { } else {
			return;
		}
		this.resetIso(_dom);

		if (StateReval.text == '')return;
		if (! StateReval.isIso)return;

		this.showIso_selected = this.find_(_dom.contentWindow.document, StateReval.text);

		var d = _dom.contentWindow.document.body;
		if (this.showIso_node) {
			$(d).find('#__GP_ISO__').remove();
			this.showIso_node = null;
		}
		$(d).append('<div id="__GP_ISO__"></div>');
		this.showIso_node = $(d).find('#__GP_ISO__');
		var tag = '';
		this.showIso_selected.each(function(index, dom) {
			tag += $(dom).get(0).outerHTML;
			tag += '<br>';
		});

		this.showIso_hides = this.getVisibleList(this.showIso_node.siblings());
		this.showIso_hides.hide();
		this.showIso_node.html(tag);

	};
	p.resetIso = function(_dom) {
		if (!this.showIso_node)return;
		this.showIso_hides.show();
		this.showIso_node.html('');

	};
	/* ---------- ---------- ---------- */

	p.showBK_selected;
	p.showBK_style = '/*__GP_BK__*/;background-color:rgba(255,255,0,0.25);/*__/GP_BK__*/';
	p.showBK = function(_dom) {
		if (this.checkPrevState('text_bk', StateReval.text)
		|| this.checkPrevState('isBK', StateReval.isBK)) { } else {
			return;
		}
		this.removeStyle(this.showBK_selected, this.showBK_style);

		if (StateReval.text == '')return;
		if (! StateReval.isBK)return;

		this.showBK_selected = this.find_(_dom.contentWindow.document, StateReval.text);
		this.addStyle(this.showBK_selected, this.showBK_style);
	};

	/* ---------- ---------- ---------- */

	p.showLine_selected;
	p.showLine_style = '/*__GP_LINE__*/;border:1px solid red;/*__/GP_LINE__*/';
	p.showLine = function(_dom) {
		if (this.checkPrevState('text_line', StateReval.text)
		|| this.checkPrevState('isLine', StateReval.isLine)
		) { } else {
			return;
		}
		this.removeStyle(this.showLine_selected, this.showLine_style);

		if (StateReval.text == '')return;
		if (! StateReval.isLine)return;

		this.showLine_selected = this.find_(_dom.contentWindow.document, StateReval.text);
		this.addStyle(this.showLine_selected, this.showLine_style);
	};
	/* ---------- ---------- ---------- */

	p.showClass = function(_dom) {
		var update1 = this.checkPrevState('text_class', StateReval.text);
		var update2 = this.checkPrevState('showSelector', StateReval.showSelector);

		if (update1 || update2) {
			//
		} else {
			return;
		}
		$(_dom.contentWindow.document).find('._gridpreview_class').remove();

		if (StateReval.text == '')return;
		if (! StateReval.showSelector)return;

		var _a = StateReval.text;
		var list = this.find_(_dom.contentWindow.document, StateReval.text);
		var leng = list.size();
		for (var i = 0; i < leng; i++) {
			var d = list.eq(i);
			var id = d.attr('id');
			if (id) {
				id = d.get(0).tagName + '#'+ id;
				var st = 'display:inline-block;font-size:12px;background:#ffff66;border-bottom:2px solid red;color:red;font-weight:bold;';
					st += 'border:1px solid #cccccc;';
				d.before('<span class="_gridpreview_class" style="' + st + '">' + id + '</span>');
			}
			var cs = d.attr('class');
			if (cs) {
				cs = d.get(0).tagName + '.'+ cs;
				var st = 'display:inline-block;font-size:12px;background:#ffffcc;color:red;';
				d.before('<span class="_gridpreview_class" style="' + st + '">' + cs + '</span>');
			}
		}
	};

	/* ---------- ---------- ---------- */

	p.showLink = function(_dom) {
		var update = this.checkPrevState('showLink', StateReval.showLink);
		if (!update)return;

		$(_dom.contentWindow.document).find('._gridpreview_anchor').remove();
		if (!StateReval.showLink)return;

		var list = this.find_(_dom.contentWindow.document, 'a');
		var leng = list.size();

		for (var i = 0; i < leng; i++) {
			var d = list.eq(i);
			var u = d.attr('href');
			//var t = d.attr("target") == undefined) ? "":" , "+ d.attr("target");
			var st = 'display:inline-block;font-size:12px;background:#eeeeff;color:blue;';
			d.before('<p class="_gridpreview_anchor" style="' + st + '">' + u + '</p>');
		}
	};
	/* ---------- ---------- ---------- */

	p.showImg = function(_dom) {
		var update = this.checkPrevState('showImg', StateReval.showImg);
		if (!update)return;

		$(_dom.contentWindow.document).find('._gridpreview_img').remove();
		if (!StateReval.showImg)return;

		var list = this.find_(_dom.contentWindow.document, 'img');
		var leng = list.size();
		for (var i = 0; i < leng; i++) {
			var d = list.eq(i);
			var src = d.attr('src');
			var st = 'display:inline-block;font-size:16px;background:#ddffdd;color:green';
			d.before('<span class="_gridpreview_img" style="' + st + '">' + src + '</span>');
		}
	};

	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//util
	p.find_ = function(_dom, _s) {
		var a;
		try {
			a = $(_dom).find(_s);
		}catch (e) {
			a = $('');
		}
		return a;
	};
	//非表示要素をぬかしたリストを返す
	p.getVisibleList = function(_list) {
		var a =	$('');
		var leng = _list.size();
		for (var i = 0; i < leng; i++) {
			var d = _list.eq(i);
			if (d.css('display') != 'none') {
				a = a.add(d);
			}
		}
		return a;
	};

	p.addStyle = function(_node, _st) {
		if (! _node) return;
		for (var i = 0; i < _node.length; i++) {
			var s = _node.eq(i).attr('style');
			if (s == null) s = '';
				s += _st;
			_node.eq(i).attr('style', s);
		}
	};
	p.removeStyle = function(_node, _st) {
		if (!_node) return;
		for (var i = 0; i < _node.length; i++) {
			var s = _node.eq(i).attr('style');
			if (s == null) s = '';
			s = s.split(_st).join('');
			_node.eq(i).attr('style', s);
		}
	};
	return c;
})();


/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- */

var U_ = (function(){
	function int_(_v){
		if(_v == null) return 0;
		if(_v == "") return 0;
		var s = 0
		var n = Number(_v);
		if(! isNaN(n)){
			if(n > 0){
				s = Math.floor(n)
			} else {
				s = Math.ceil(n)
			}
		}
		return s
	}
	
	function number_(_v){
		if(_v == null) return 0;
		if(_v == "") return 0;
		if(_v == "") return 0;
		var s = 0
		var n = Number(_v);
		if(isNaN(n))n = 0;
		return n
	}
	
	function defInt(_v,_def){
		_def 	= int_(_def);
		if(
			_v == null || 
			_v == "" ||
			isNaN(Number(_v))
		){
			_v = _def;
		}
		var n = int_(_v);
		var s = _def;
		if(! isNaN(n)){
			s = n;
		}
		return s;
	}
	function defNumber(_v,_def){
		_def 	= number_(_def);
		if(
			_v == null || 
			_v == "" ||
			isNaN(Number(_v))
		){
			_v = _def;
		}
		var s = _def;
		var n = number_(_v);
		if(! isNaN(n)){
			s = n;
		}
		return s;
	}
	return { 
		int_:int_,
		number_:number_,
		defInt:defInt,
		defNumber:defNumber
	 }
})();
var URL_ = (function(){
	
	function treatInputUrl(_s){
		if(_s == null) return ""
		_s = _s.split(" ").join("");
		_s = _s.split("	").join("");
		return _s;
	}
	function treatDirUrl(_s){
		if(_s ==null)return "";
		if(_s.charAt(_s.length-1) != "/"){
			_s = _s + "/"
		}
		return _s;
	}
	function treatURL(_s){
		if(_s ==null) return "";
		var out = "";
		for (var i = 0; i < protcolList.length ; i++) {
			var ss = protcolList[i]
			if(_s.substr(0, ss.length) == ss){
				var a = _s.split(ss);
				out += ss + a[1].split("//").join("/");
			}
		}
		return out;
	}
	function isTextFile(_s){
		if(_s == null) return false;
		var b = false;
		var ext = getExtention(_s)
		if(ext == "") b = true;
		if(ext == "html") b = true;
		if(ext == "htm") b = true;
		if(ext == "css") b = true;
		if(ext == "js") b = true;
		if(ext == "json") b = true;
		if(ext == "xml") b = true;
		if(ext == "csv") b = true;
		if(ext == "tsv") b = true;
		if(ext == "as") b = true;
		if(ext == "php") b = true;
		return b;
	}
	function getExtention(_s){
		if(_s == null)return "";
		var p1 = _s.split("#")[0];
		var p2 = p1.split("?")[0];
		var ss = p2.split(".");
		if(ss.length == 1)return "";
		var ex = ss[ss.length-1];
		if(ex.indexOf("/") != -1) return "";
		return ex;
	}
	function getURLParam(_s){
		if(_s ==null)return {};
		var url = _s;
		var p1 = url.split("#")[0];
		var p2 = p1.split("?")[1];
		if(p2.length == 0) return;
		var ps = p2.split("&");
		var o = {}
		for (var i = 0; i < ps.length ; i++) {
			var s = ps[i].split("=")
			o[s[0]] = s[1]
		}
		return o
	}
	function getBaseDir(_s){
		_s = _s.split("?")[0];
		var a = _s.split("/");
		var u = "";
		for (var i = 0; i < a.length -1 ; i++) {
			u += a[i] + "/"
		}
		return u
	}
	function getABSDir(_s){
		if(_s ==null)return "";
		var out = "";
		_s = _s.split("?")[0]
		var a = _s.split("/");
		for (var i = 3; i < a.length-1 ; i++) {
			out += a[i] + "/"
		}
		return out;
	}
	
	var protcolList = ["http://","https://","//"];
	//現在のHTMLの絶対パス、相対パスのCSSなどのファイルから、
	//絶対パスを生成する。
	function getDomain(_s){
		if(_s ==null)return "";
		var out = ""
		if(_s ==null) return out;
		for (var i = 0; i < protcolList.length ; i++) {
			var ss = protcolList[i]
			if(_s.substr(0, ss.length) == ss){
				var a = _s.split(ss);
				var a = a[1].split("/");
				out += ss + a[0] + "/";
			}
		}
		return out;
	}
	function getDomain_and_dir(_s){
		if(_s ==null)return "";
		var out = "";
		
		_s = _s.split("?")[0]
		
		var a = _s.split("/");
		
		if(a.length < 4) return _s
		
		for (var i = 0; i < a.length-1 ; i++) {
			out += a[i] + "/"
		}
		return out;
	}
	function isSameDomain(_s,_s2){
		if(_s ==null)return false;
		if(_s2 ==null)return false;
		var s = getDomain(_s);
		var s2 = getDomain(_s2);
		return (s == s2);
	}
	function isDomain(_s){
		if(_s == null) return false;
		var b = false;
		_s = _s.split(" ").join("")
		_s = _s.split("	").join("")
		if(_s == "") return false;
		if(_s.substr(0, 5) == "http:") b = true;
		if(_s.substr(0, 6) == "https:") b = true;
		if(_s.substr(0, 2) == "//") b = true;
		return b
	}
	function joinURL(_s,_s2){
		if(_s ==null)return "";
		if(_s2 ==null)return "";
		if(! isDomain(_s)) return _s2;
		if(isDomain(_s2)) return _s2;
	
		var a = _s2.split("../");
		
		var ss =_s.split("/");
		var u = ""
		var leng = ss.length - a.length
		for (var i = 0; i < leng ; i++) {
			u += ss[i] + "/"
		}
		var g = _s2.split("../").join("");
			g = g.split("./").join("");
		return treatURL(u + g);
	}
	function trimDomain(_s){
		if(_s ==null)return "";
		var d = getDomain(_s);
		return _s.split(d).join("")
	}
	function getRelativePath(_s,_s2){
		if(_s == null)return "";
		if(_s2 == null)return "";
		var out = "";
		if(! isSameDomain(_s,_s2)) return "";
		_s = trimDomain(_s);
		_s2 = trimDomain(_s2);
		var g = _s.split("?")[0].split("/");
		var ps = "";
		for (var i = 0; i < g.length-1 ; i++) {
			if(g[i] != ""){
				ps += "../";
			}
		}
		return ps + _s2;
	}
	function getBaseUrls_from_text(_s){
		if(_s == null)return [""];
		if(! isDomain(_s)) return [""];
		_s = 	_s.split("　").join("")
		_s = 	_s.split(" ").join("")
		_s = 	_s.split("	").join("")
		if(_s == "")return [""];
		
		var a = _s.split(",")
		for (var i = 0; i < a.length ; i++) {
			a[i] = treatDirUrl(a[i])
		}
		return a
	}
	
	function getDecoParamText(_s) {
		if(_s == null) return "";
	
		var ss = _s.split("?")
		var tag = ""
		if(ss.length > 1){
			tag += ss[0] + '<span class="param_hatena">?</span>'
			var param = ss[1].split("&")
			for (var i = 0; i < param.length ; i++) {
				var pp = param[i].split("=");
				if(i!=0){
				tag += '<span class="param_and">&</span>';
				}
				tag += '<span class="param_name">'+pp[0]+'</span>';
				tag += '<span class="param_eq">=</span>';
				tag += '<span class="param_val">'+pp[1]+'</span>';
			}
		} else{
			tag = _s;
		}
		return tag;
	}
	
	return { 
		treatInputUrl:treatInputUrl,
		treatDirUrl:treatDirUrl,
		
		isTextFile:isTextFile,
		getExtention:getExtention,
		getURLParam:getURLParam,
		getDomain:getDomain,
		getDomain_and_dir:getDomain_and_dir,
		isDomain:isDomain,
		isSameDomain:isSameDomain,
		getBaseDir:getBaseDir,
		getABSDir:getABSDir,
		joinURL:joinURL,
		getRelativePath:getRelativePath,
		getBaseUrls_from_text:getBaseUrls_from_text,
		getDecoParamText:getDecoParamText
	 }
})();
var DateUtil = (function(){
	/*
		DateUtil.getFormattedDate(new Date(),"YYYYMMDD_hhmmss");
	*/
	var lang = 1;
	var week = [
		["日","月","火","水","木","金","土"],
		["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]
	]
	var month = [
		["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",],
		["January","February","March","April","May","June","July","August","September","October","November","December"],
		["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."]
	]
	var charas = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	//var charas = "0123456789abcdefghijklmnopqrstuvwxyz"
	
	function getFormattedDate(_d,_format){
		var t = _format;
		var d = _d;
		//
		t = t.split("YYYY").join(d.getFullYear())
		t = t.split("MM").join(formatDigit(d.getMonth()+1,2));
		t = t.split("DD").join(formatDigit(d.getDate(),2));
		//
		t = t.split("hh").join(formatDigit(d.getHours(),2));
		t = t.split("mm").join(formatDigit(d.getMinutes(),2));
		t = t.split("ss").join(formatDigit(d.getSeconds(),2));
		t = t.split("ms").join(formatDigit(d.getMilliseconds(),3));
		t = t.split("month").join(month[lang][d.getMonth()]);
		t = t.split("week").join(week[lang][d.getDay()]);
		//
		t = t.split("RRRRRRRRRR").join(getRandamCharas(10));
		t = t.split("RRRRR").join(getRandamCharas(5));
		t = t.split("RRRR").join(getRandamCharas(4));
		t = t.split("RRR").join(getRandamCharas(3));
		t = t.split("RR").join(getRandamCharas(2));
		t = t.split("R").join(getRandamCharas(1));
		return t;
	}
	
	function getRandamCharas(_n){
		var rr = "";
		for (var i = 0; i < _n ; i++) {
			rr += charas[Math.floor(Math.random()*charas.length)];
		}
		return rr;
	}

	function formatDigit(_n,_s){
		var s = String(_n);
		if(s.length<_s){
			for (var i = 0; i < _s ; i++) {
				if(s.length <= i)s ="0" + s;
			}
		}
		return s;
	}
	function getDate(){
		return new Date().toString();
	}
	function getRelatedDate(_d,_today){
	
		var d = _d;
		//var c = new Date(" Tue Dec 25 2013 0:57:46 GMT+0900 (JST)");
		var c = new Date();
		if(_today != null){
			c = _today;
		}
		var sec = (c.getTime()- d.getTime()) / (1000);
		var min = sec/60;
		var hour = min/60;
		var day = hour/24;
		var ss = "";
		if(sec < 20){
			ss = '<span class="_time-sec_00-10">' + Math.floor(sec) +"秒前" + '</span>';
		} else if(sec < 60){
			ss = '<span class="_time-sec_10-60">' +Math.floor(sec) +"秒前" + '</span>'
		} else if(min < 10){
			ss = '<span class="_time-min_00-10">' +Math.floor(min) +"分前" + '</span>';
		} else if(min < 60){
			ss = '<span class="_time-min_10-60">' +Math.floor(min) +"分前" + '</span>';
		} else if(hour < 6){
			ss = '<span class="_time-hour_01-06">' +Math.floor(hour) +"時間前" + '</span>';
		} else if(hour < 12){
			ss = '<span class="_time-hour_06-12">' +Math.floor(hour) +"時間前" + '</span>';
		} else if(hour < 24){
			ss = '<span class="_time-hour_12-24">' +Math.floor(hour) +"時間前" + '</span>';

		} else if(hour < 24*7){
			ss = '<span class="_time-day_01-07">' +Math.floor(day) +"日前" + '</span>';
		} else if(hour < 24*30){
			ss = '<span class="_time-day_07-31">' +Math.floor(day) +"日前" + '</span>';
		} else{
			ss = '<span class="_time-day_31-99">' +Math.floor(day) +"日前" + '</span>';
		}
		return ss;
	}
	
	return { 
		getFormattedDate:getFormattedDate,
		getRandamCharas:getRandamCharas,
		getDate:getDate,
		getRelatedDate:getRelatedDate
		
	}
})();


//functions
function limitArray(_a,_s,_max){
    for (var i = 0; i <  _a.length ; i++) {
    	if(_a[i] == _s) _a.splice(i,1);
    }  
    if(_a.length > _max) _a.splice( _max-1 , _a.length);
    _a.unshift(_s);
}

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

/*function getFilePathTag(u){
	var a = u.split("/");
	var tag = ""
	for (var i = 0; i <  a.length ; i++) {
		if(a.length-1 == i){
			tag += "<em>" +a[i] + "</em>"
		} else{
			tag += a[i] + "/ "
		}
	}
	return tag;
}*/
function getFilePathTag(u){
	var a = u.split("/");
	var tag = "";
	var round = 8
	for (var i = 0; i <  a.length ; i++) {
		if(a.length-1 == i){
			tag += "<em>" +a[i] + "</em>"
		} else{
			var s = a[i];
			if(a.length-2 !=i){
			if(s.length > round) s = s.substr(0,round) + "..."
			}
			tag += '<span class="dir">'+s+'<i>/</i> </span>'
		}
	}
	return tag;
}
function getR(){
	return new Date().getTime();
}

function getInputNumber(_abs,_n,_def){
	var n;
	if(_abs == "abs"){
		if(_n == null){
			n = prompt("", _def);
			if(n == null)return _def;
			n = Number(n);
			if(isNaN( Number(n) ))return _def;
		} else{
			n = _n;
		}
	} else{
		n = _def + _n;
	}
	return n;
}
function setLimitNumber(n,_leng){
	if(n < _leng[0]) n = _leng[0];
	if(n > _leng[1]) n = _leng[1];
	return n;
}




var Lib_ = (function (){
	var _ = {};
	_.init = function(){}
	
	
	/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- */
	
	_.Type_ = {}
	_.Type_.LimitInt = function(_defN,_leng) {
		/*
			var limitInt = new Lib_.Type_.LimitInt(0,[-2,5]);
			limitInt.add_(1);
			limitInt.getN();
		*/
		this.defN 	= _defN;
		this.n_ 	= _defN;
		this.lengS 	= _leng[0];
		this.lengE 	= _leng[1]+1;
		this.sw 	= (this.lengS < this.lengE)? true:false;
	}
	_.Type_.LimitInt.prototype = {
		add_:function(_n) { 
			this.n_ += _n;
			if (this.sw) {
				if(this.n_ < this.lengS) this.n_ = this.lengS;
				if(this.n_ > this.lengE - 1) this.n_= this.lengE-1;
			} else {
				if(this.n_ > this.lengS) this.n_ = this.lengS;
				if(this.n_ < this.lengE - 1) this.n_ = this.lengE-1;
			}
		},
		getN:function() {return this.n_;},
		setN:function(_n) {this.n_ = _n;this.add_(0);},
		getMax:function() {return this.lengE},
		isMax:function() {return (this.n_ ==this.lengE-1) ? true : false},
		isMin:function() {return (this.n_ ==this.lengS) ? true : false}
	}
	
	_.Type_.RotationInt = function(_defN,_leng) {
		/*
			var rotationInt = new Lib_.Type_.RotationInt(0,[-2,5]);
			rotationInt.add_(1);
			rotationInt.getN();
		*/
		this.defN 	= _defN;
		this.n_ 	= _defN;
		this.lengS 	= _leng[0];
		this.lengE 	= _leng[1];
		this.sw 	= (this.lengS < this.lengE)? true:false;
	}
	_.Type_.RotationInt.prototype = {
		add_:function(_n) { 
			this.n_ += _n;
			if (this.sw) {
				if(this.n_ < this.lengS) this.n_ = this.lengE;
				if(this.n_ > this.lengE ) this.n_= this.lengS;
			} else {
				if(this.n_ > this.lengS) this.n_ = this.lengE;
				if(this.n_ < this.lengE ) this.n_ = this.lengS;
			}
		},
		getN:function() {return this.n_;},
		setN:function(_n) {this.n_ = _n;this.add_(0);},
		getMax:function() {return this.lengE},
		isMax:function() {return (this.n_ ==this.lengE-1) ? true : false},
		isMin:function() {return (this.n_ ==this.lengS) ? true : false}
	}
		
	return _;
})();

