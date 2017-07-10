/**
 * GRID PREVIEW
 * Copyright 2016 Shige Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
*/
 
var GRID_INFO = {
	name:"GRID PREVIEW",
	lastUpdate:"2016/12/10 17:40:39",
	version:"1.0.0.0"
}

$(function() {
	if (window.IS_UNITTEST)return;
	GRID.MainController.init();
});


// var DATA_DIR_PHP = '../data/';
// var DATA_DIR_HTML = './data/';
// var PHP_FILE = './lib/storage.php';
// var PHP_FILE_IO = './lib/fileIO.php';
// var PHP_FEACH = './lib/storage.fetch.php';
var parentFrame = this;


function keyUp_(_key) {
	GRID.MainController.keyUp_(_key);
}
function openPreview(_u, _n) {
	GRID.MainController.openPreview(_u, _n);
}


var frames = [];

function bodyElement() {
	return $('html,body');
}
function getInputNumber(_abs, _n, _def) {
	var n;
	if (_abs === 'abs') {
		if (_n === undefined) {
			n = prompt('', _def);
			if (n === undefined)return _def;
			n = Number(n);
			if (isNaN(Number(n)))return _def;
		} else {
			n = _n;
		}
	} else {
		n = _def + _n;
	}
	return n;
}
function setLimitNumber(n, _leng) {
	if (n < _leng[0]) n = _leng[0];
	if (n > _leng[1]) n = _leng[1];
	return n;
}



var GPCommon = {};
GPCommon.aray_hasData = function(_a, _s) {
	var b = false;
	for (var i = 0; i < _a.length; i++) {
		if (_a[i] == _s)b = true;
	}
	return b;
};
GPCommon.cssUpdate = function(node) {
	var u = $(node).attr('href');
		u = u.split('?')[0];
		u = u + '?' + new Date().getTime();
	$(node).attr('href', u);
};
GPCommon.jsUpdate = function(node) {
	/*var u = $(node).attr("src");
		u = u.split("?")[0];
		u = u + "?" + new Date().getTime();
	$(node).attr("src",u);*/
};
GPCommon.setDom_for_css = function(_doms) {
	//domからCSSノードを抽出する
	try {
		_doms[0].contentWindow.location.href;
	}catch (e) {
		return [[], [], []];
	}

	function core(_list) {
		var a = $('');
		var leng = _list.size();
		for (var i = 0; i < leng; i++) {
			var d = _list.eq(i);
			if (d.attr('rel') == 'stylesheet') {
				a = a.add(d);
			}
		}
		return a;
	}

	var cssNodes = [];
	var cssUrls = [];
	var taiouMap = [];

	for (var i = 0; i < _doms.length; i++) {
		var list = $(_doms[i].contentWindow.document).find('link');
		cssNodes.push(core(list));
	}

	var baseURL = URL_.getBaseDir(_doms[0].contentWindow.location.href);

	for (var i = 0; i < cssNodes.length; i++) {
		var leng = cssNodes[i].size();
		for (var ii = 0; ii < leng; ii++) {
			var s = cssNodes[i].eq(ii).attr('href');
				s = s.split('?')[0];
			var u = URL_.joinURL(baseURL, s);
			if (u != '') {
				taiouMap.push({'url': u, 'node': cssNodes[i].eq(ii)});
				cssUrls.push(u);
			}
		}
	}
	return [cssNodes, cssUrls, taiouMap];
};
GPCommon.setDom_for_js = function(_doms) {
	//domからCSSノードを抽出する
	try {
	  _doms[0].contentWindow.location.href;
	}catch (e) {
		return [[], [], []];
	}
	function core(_list) {
		var a = $('');
		var leng = _list.size();
		for (var i = 0; i < leng; i++) {
			var d = _list.eq(i);
			//if(d.attr("rel") == "stylesheet"){
				a = a.add(d);
			//}
		}
		return a;
	}

	var jsNodes = [];
	var jsUrls = [];
	var taiouMap = [];

	for (var i = 0; i < _doms.length; i++) {
		var script = $(_doms[i].contentWindow.document).find('script');
		jsNodes.push(core(script));
	}

	var baseURL = URL_.getBaseDir(_doms[0].contentWindow.location.href);

	for (var i = 0; i < jsNodes.length; i++) {
		var leng = jsNodes[i].size();
		for (var ii = 0; ii < leng; ii++) {
			if (jsNodes[i].eq(ii).attr('src') != null) {
				var s = jsNodes[i].eq(ii).attr('src');
					s = s.split('?')[0];
				var u = URL_.joinURL(baseURL, s);
				if (u != '') {
					taiouMap.push({'url': u, 'node': jsNodes[i].eq(ii)});
					jsUrls.push(u);
				}
			}
		}
	}
	return [jsNodes, jsUrls, taiouMap];
};
GPCommon.arrayToTable = function(_array) {
	var tag = '';
		tag += '<table>';
	for (var i = 0; i < _array.length; i++) {
		var cell = _array[i];
		tag += '<tr>';
		for (var ii = 0; ii < cell.length; ii++) {
			tag += '<td>' + cell[ii] + '</td>';
		}
		tag += '</tr>';
	}
	tag += '</table>';
	return tag;
};

/* ---------- ---------- ---------- ---------- ---------- ---------- ---------- */

var GRID = {};
GRID.API = (function() {

	function error() {
		alert('ネットワークエラーが発生しました。');
	}
	function feach(_p, _callback) {

		var u = PHP_FEACH + '?url='+ _p;

		$.ajax({
			scriptCharset: 'utf-8',
			type: 'GET',
			url: u,
			dataType: 'text',
			success: function(data) {
				_callback(data);
			},
			error: function(s) {error()}
		});
	}
	function fileIO(_p, _callback) {

		$.ajax({
			scriptCharset: 'utf-8',
			type: 'POST',
			data: _p,
			url: PHP_FILE_IO,
			dataType: 'text',
			success: function(data) {
				_callback(data);
			},
			error: function(s) {error()}
		});
	}

	function loadFile(_f, _callback) {
		$.ajax({
			scriptCharset: 'utf-8',
			type: 'GET',
			url: _f,
			dataType: 'text',
			success: function(data) {
				_callback(data);
			},
			error: function(s) {error()}
		});
	}
	function loadFile_r(_f, _callback, _callback_e) {
		$.ajax({
			scriptCharset: 'utf-8',
			type: 'GET',
			url: _f + '?u='+ new Date().getTime(),
			dataType: 'text',
			success: function(data) {
				_callback(data);
			},
			error: function(data) {
				_callback_e(data);
			}
		});
	}
	function saveFile(_p, _callback) {
		$.ajax({
			scriptCharset: 'utf-8',
			type: 'POST',
			url: PHP_FILE,
			data: _p,
			dataType: 'text',
			success: function(data) {
				_callback(data);
			},
			error: function(s) {error()}
		});
	}
	return {
		feach: feach,
		fileIO: fileIO,
		loadFile: loadFile,
		loadFile_r: loadFile_r,
		saveFile: saveFile
	};
})();

GRID.Data = {};
GRID.Data.title;
GRID.Data.list;
GRID.Data.pageSum = 0;
GRID.Data.gloupSum = 0;
// GRID.Data.saveDir;//データディレクトリ
// GRID.Data.saveDir_php;//データディレクトリ
GRID.Data.iframes = [];



GRID.App = {
	app: {
		domain: '',
		url: '',
		dataUrl: ''
	},
	baseUrls: {
		items: [],
		current: 0,
		url: ''
	}
};


GRID.StateCommon = {
	viewType: 'preview',//{preview,list,edit}
	currentRect: 0,
	currentGloup: 0,
	preview: {
		url: '',
		no: 0
	},
	split: {
		display: false,
		widths: [1200],
		scale: 50
	},
	search: {
		preview: {
			text: '',
			isHide: false
		},
		list: {
			text: '',
			isHide: false
		}
	}
}
GRID.StateCommonManager = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	var pageID = "";
	var storage;
	
	function init(){
		pageID = "GRID_COM_v2" + URL_.getABSDir(location.href);
		storage = localStorage;
		if (storage[pageID] == null) {
			//
		} else {
			GRID.StateCommon = JSON.parse(storage[pageID]);
		}
	}
	
	function update(){
		storage[pageID] = JSON.stringify(GRID.StateCommon);
	}
	function setCurrentRect(_n){
		GRID.StateCommon.currentRect = _n;
		update();
	}
	function setCurrentGloup(_n){
		GRID.StateCommon.currentGloup = _n;
		update();
	}
	function setPreviewNo(_n){
		GRID.StateCommon.preview.no = _n;
		update();
	}
	function setPreviewUrl(_u){
		GRID.StateCommon.preview.url = _u;
		update();
	}
	function setViewType(_s){
		GRID.StateCommon.viewType = _s;
		update();
	}
	/**/
	function setDisplay(_b){
		GRID.StateCommon.split.display = _b;
		update();
	}
	function setWidths(_a){
		GRID.StateCommon.split.widths = _a;
		update();
	}
	function setScale(_s){
		GRID.StateCommon.split.scale = _s;
		update();
	}
		
	return {
		init: init,
		update: update,
		
		setCurrentRect: setCurrentRect,
		setCurrentGloup: setCurrentGloup,
		setPreviewNo: setPreviewNo,
		setPreviewUrl: setPreviewUrl,
		setViewType: setViewType,
		setDisplay: setDisplay,
		setWidths: setWidths,
		setScale: setScale
	}
	
})();


GRID.CurrentRect = {}
GRID.StateSet = {}
GRID.StateSetManager = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	var pageID = "";
	var storage;
	
	function init(){
		pageID = "GRID_v2" + URL_.getABSDir(location.href);
		storage = localStorage;
		if (storage[pageID] == null) {
			GRID.StateSet.current = 0;
			GRID.StateSet.list = getInitData();
		} else {
			GRID.StateSet = JSON.parse(storage[pageID]);
		}
		GRID.StateSet.current = GRID.StateCommon.currentRect;
		GRID.CurrentRect = GRID.StateSet.list[GRID.StateSet.current];
	}
	function getStateSet(){
		return GRID.StateSet.list
	}
	//
	function getState(){
		return GRID.StateSet.list[GRID.StateSet.current]
	}
	function getStateNo(){
		return GRID.StateSet.current
	}
	function changeNo(_n){
		GRID.StateSet.current = _n;
		GRID.StateCommonManager.setCurrentRect(_n);
		if(GRID.StateSet.list == ""){
			GRID.StateSet.list = getInitData();
		}
		GRID.CurrentRect = GRID.StateSet.list[_n];
	}
	
	function save(){
		storage[pageID] = JSON.stringify(GRID.StateSet);
	}
	function reset(){
		GRID.StateSet.list = getInitData();
		GRID.CurrentRect = GRID.StateSet.list[GRID.StateSet.current];
	}
	
	var tID;
	function update(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			var n = GRID.StateSet.current;
			GRID.StateSet.list[n] = GRID.CurrentRect;
		},10);
	}
	
	var DEF = {
		widths	: [ 1200 ],
		height	: 2000,
		scale	: 25,
		pagesW	: 1200,
		background: '#666',
		color	: '#ccc',
		margin	: 1,
		noBR	: false,
		notitle	: false
	};
	
	function getInitData(){
		var a = []
		var ls = GRID_PRESETs;
		for (var i = 0; i < ls.length ; i++) {
			var dd = ls[i]
			var o = JSON.parse(JSON.stringify(DEF))
				o.widths = dd.widths;
				o.height = dd.height;
				o.scale  = dd.scale;
				o.pagesW = (function(_ws){ 
					var w = 0;
					for (var i = 0; i < _ws.length ; i++) { 
						w += _ws[i];
					}
					return _ws;
				})(o.widths);
			a.push(o)
		}
		return a;
	}
	
	return {
		init: init,
		save: save,
		reset: reset,
		getStateSet: getStateSet,
		getState: getState,
		getStateNo: getStateNo,
		update: update,
		changeNo: changeNo
	}
	
})();

//
GRID.StateReval = {
	text: '',
	jq: '',
	isHide: false,
	isIso: false,
	isLine: true,
	isBK: true,
	showSelector: false,

	showLink: false,
	showImg: false
};

GRID.StatePageManager 	 = (function(){
	var pageID = '';
	var storage;

	function init(){
		pageID = "GRID_LAST_" + URL_.getABSDir(location.href);
		
	}
	function getListData(){
		if(localStorage[pageID]){
			return JSON.parse(localStorage[pageID]);
		} else{
			return {};
		}
	}
	function setListData(_s){
		localStorage[pageID] = JSON.stringify(_s, null, "	");
	}
	
	return { 
		init: init,
		getListData:getListData,
		setListData:setListData
	}
	
})();

GRID.URL_Manager = (function() {

	function init() {}
	
	function setBaseUrl(_s) {
		var base = GRID.App.baseUrls;
			base.items = URL_.getBaseUrls_from_text(_s);
			base.current = (function() {
				var n = Number(window.location.hash.split('#')[1]);
				if (isNaN(n))n = 0;
				return n;
			})();
			base.url = base.items[base.current];
	}
	
	function getSimplePath(_s) {
		var base = GRID.App.baseUrls.url;
		return _s.split(base).join('');
	}
	function getFullPath(_s) {
		return GRID.App.baseUrls.url + _s;
	}
	return {
		init: init,
		setBaseUrl: setBaseUrl,
		getSimplePath: getSimplePath,
		getFullPath: getFullPath
	};
})();

	
GRID.V = {};
GRID.V.mainFrame;
GRID.V.subStage;
GRID.V.subPreviews;

GRID.M = {};
GRID.M.GloupData = (function() {
	var c = function() {
	  this.init();
	};
	var p = c.prototype;
	sum = 0;
	p.type;
	p.no;
	p.id;
	p.name;
	p.isMemori;
	p.list;

	p.init = function() {
		this.type = 'gloup';
		this.no = sum;
		this.id = this.type + '_' + sum;
		this.name = '';
		this.isMemori = false;
		this.list = [];

		sum++;
	};
	p.setServer = function(_s) {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].setServer(_s);
		}
	};

	return c;
})();

GRID.M.SubGloupData = (function() {
	var c = function() {
	  this.init();
	};
	var p = c.prototype;
	sum = 0;
	p.type;
	p.no;
	p.id;
	p.name;
	p.list;

	p.init = function() {
		this.type = 'sub-gloup';
		// this.no = sum;
		// this.id = this.type + '_' + sum;
		this.name = '';
		this.list = [];
		// sum++;
	};
	p.setServer = function(_s) {
		
	};
	p.isSelectable = function() {
		return false;
	};
	return c;
})();

GRID.M.PageData = (function() {
	var c = function() {
	  this.init();
	};
	var p = c.prototype;
	var count = 1;
	p.id;
	p.type;
	p.name;
	p.isMemori;
	p.deep;

	p.url;//http://192.168.1.23:1000/01_work/2013/20130809_maruo/www/test_grid/html/ir_lib.html
	p.url_origin;///html/ir_lib.html
	p.url_and_base;	//<span class="base_url">__BASE_URL__</span>/html/ir_lib.html
	p.listTexts;

	p.init = function() {
		this.id = 'page_'+ DateUtil.getRandamCharas(10);
		this.type = 'page';
		this.name = '';
		this.url = '';
		this.deep = 0;
		this.isMemori =false;
		this.no = count;
		count++;
		GRID.M.PageDataManager.addData(this);
	};
	p.setServer = function(_s) {
		this.url_origin = this.url;
		this.url_and_base = this.url;

		if (_s != '') {
			var s = URL_.getDecoParamText(this.url);
			this.url_and_base = '<span class="base_url">__BASE_URL__</span>' + s;
		}
		if(URL_.isDomain(this.url)){
			//
		} else{
			this.url = URL_.joinURL(_s, this.url);
		}
// http://
		var tag = '<a href="{URL}" target="_blank">{URL_V} <i class=" fa fa-external-link-square "></i></a>';
			tag = tag.split('{URL}').join(this.url);
			tag = tag.split('{URL_V}').join(this.url_and_base);
		this.listTexts = {};
		this.listTexts.url = tag;
		this.listTexts.name = '<i class="fa fa-reply "></i> ' + this.decoDir(this.name);
		//
	};
	/* ! ----------  ---------- ---------- ---------- ---------- */
	p.decoDir = function(_s) {
		var ss = _s.split('/');
		var a = [];
		for (var i = 0; i < ss.length; i++) {
			if (i == ss.length - 1) {
				a.push(ss[i]);
			} else {
				if (ss[ss.length - 1] == '') {
					a.push(ss[i]);
				} else {
					a.push('<span class="dir">' + ss[i] + '</span>');
				}
			}
		}
		return a.join('<span class="dir_slash">/</span>');
	};
	p.isMatch = function(_s) {
		if (_s == '') return false;
		if (_s == null) return false;

		var b = false;
		var keys = _s.split(',');
		for (var i = 0; i < keys.length; i++) {
			if (this.isMatch_core(keys[i], this.url_origin) != -1) b = true;
			if (this.isMatch_core(keys[i], this.name) != -1) b = true;
		}
		return b;
	};
	p.isMatch_core = function(_s1, _s2) {
		var _b = false;
		var s1 = _s1.toLowerCase();
		var s2 = _s2.toLowerCase();
		return s2.indexOf(s1);
	};
	p.getMatchText_url = function(_s) {
		var keys = _s.split(',');
		var tag = '';
		for (var i = 0; i < keys.length; i++) {
			if (this.isMatch_core(keys[i], this.url_origin) != -1) {
				if (tag == '') tag = this.getMatchText_url_core(keys[i]);
			}
		}
		if (tag == '')tag = this.listTexts.url;
		return tag;
	};
	p.getMatchText_url_core = function(_s) {
		var b = false;
		var orijin = this.url_origin;
		var s = this.isMatch_core(_s, orijin);
		if (s == -1)return orijin;
		var matchText = orijin.substr(s, _s.length);
		var a = orijin.split(matchText).join('__em__' + matchText + '__end_em__');

		var tag = '<a href="{URL}" target="_blank">{URL_V} <i class=" fa fa-external-link-square "></i></a>';
			tag = tag.split('{URL}').join(this.url);
			tag = tag.split('{URL_V}').join(a);

			tag = tag.split('__em__').join('<em>');
			tag = tag.split('__end_em__').join('</em>');
		return tag;
	};

	p.getMatchText_name = function(_s) {
		var keys = _s.split(',');
		var tag = '';
		for (var i = 0; i < keys.length; i++) {
			if (this.isMatch_core(keys[i], this.name) != -1) {
				if (tag == '')tag = this.getMatchText_name_core(keys[i]);
			}
		}
		if (tag == '')tag = this.listTexts.name;
		return tag;
	};
	p.getMatchText_name_core = function(_s) {
		var b = false;
		var orijin = this.name;
		var s = this.isMatch_core(_s, orijin);
		if (s == -1)return orijin;
		var matchText = orijin.substr(s, _s.length);
		var a = orijin.split(matchText).join('__em__' + matchText + '__end_em__');
		var tag = '<i class="fa fa-reply "></i> ' + this.decoDir(a);
			tag = tag.split('__em__').join('<em>');
			tag = tag.split('__end_em__').join('</em>');
		return tag;
	};

	/* ---------- ---------- ---------- */

	p.isMatchSearch_;
	p.isMatchSearch = function(_b) {
		this.isMatchSearch_ = _b;
	};
	p.isMatchTag_;
	p.isMatchTag = function(_b) {
		this.isMatchTag_ = _b;
	};
	p.isSelectable = function() {
		if (this.isMatchSearch_ == null)	this.isMatchSearch_ = true;
		if (this.isMatchTag_ == null)	this.isMatchTag_ = true;
		var b = false;
		if (this.isMatchSearch_ && this.isMatchTag_) b = true;
		return b;
	};
	return c;
})();

GRID.M.PageDataManager = (function() {
	var pages = [];
	function addData(_p) {
		pages.push(_p);
	}
	function getData_by_id(_id) {
		for (var i = 0; i < pages.length; i++) {
			if (pages[i].id == _id)return pages[i];
		}
		return false;
	}
	return {
		addData: addData,
		getData_by_id: getData_by_id
	};
})();

GRID.DataManager = (function() {
	var list = [];
	function setData(_t, _callback) {
		if(GRID_DATA_TYPE == "json"){
			return GRID.DataManagerJSON.setData(_t, _callback);
		} else{
			return GRID.DataManagerHTML.setData(_t, _callback);
		}
	}
	return {
		setData: setData
	};
})();


GRID.DataManagerJSON = (function() {
	function setData(_t, _callback) {
		_callback(
			setTitle(),
			setMemo(),
			setParam(),
			setList(_t),
			pageSum
		);
	}
	/* ---------- ---------- ---------- */

	var list = [];
	function setTitle() {
		return "title";
	}
	/* ---------- ---------- ---------- */

	function setMemo() {
		return "memo";
	}
	/* ---------- ---------- ---------- */

	function setParam() {
		var ss = GRID_SITEMAP_JSON.split("../");
		var bs = "";
		for (var i = 0; i < ss.length-1 ; i++) {
			bs += "../";
		}
		var base = URL_.getDomain_and_dir(location.href);
			base = URL_.joinURL(base ,bs);
		return { baseUrls: base }
	}
	
	/* ---------- ---------- ---------- */
	
	function _getPageData(_node,_id ,_deep){
		var dir = "html/"
		if(_node.dir) dir = _node.dir;
		var o = new GRID.M.PageData();
			o.deep = _deep;
			o.name =  _node.name;
			o.gloup = _id;
			o.url = dir +  _node.id + '.html';
			pageSum++;
		return o;
	}

	function _getGloupData(_model,_node,_deep){
		_deep++;
		for (var ii = 0; ii < _node.list.length ; ii++) {
			// if(ii > 3)return;
			
			if(_node.list[ii].type == "page"){
				_model.list.push(_getPageData( _node.list[ii] , _model.id,_deep, 1 ));
			}
			if(_node.list[ii].type == "dir"){
				var g = new GRID.M.SubGloupData();
					g.name = _node.list[ii].name;
					g.gloup = _model.id;
				_model.list.push(g);
				_getGloupData(_model ,_node.list[ii] , _deep );
			}
		}
	}
	
	var pageSum = 0;
	function setList(_s) {
		var sitemap = JSON.parse(_s);
		
		var roots = [];
		var siemapID =  "_sitemap_"
		var g = new GRID.M.GloupData();
			g.id = siemapID + "root"
			g.name = "ルート"
			g.no = 0;
		roots.push(g);
		
		for (var i = 0; i < sitemap.list.length ; i++) {
			if(sitemap.list[i].type == "page"){
				g.list.push(_getPageData(sitemap.list[i] , g.id, 0 ));
			} 
		}
		for (var i = 0; i < sitemap.list.length ; i++) {
			if(sitemap.list[i].type == "dir"){
				var subG = new GRID.M.GloupData();
					subG.id = siemapID + sitemap.list[i].id;
					subG.name = sitemap.list[i].name;
					subG.no = 0;
				roots.push(subG);
				_getGloupData(subG ,sitemap.list[i],0);
			}
		}
		//
		return roots.concat(_getMemoriList());
	}
	
	function _getMemoriList(){
		var a = []
		var myList = GRID.StatePageManager.getListData();
		var tabs = GRID_MY_TAB;
		var s = []
		for (var i = 0; i < tabs.length ; i++) {
			var g = new GRID.M.GloupData();
				g.isMemori = true;
				g.id = tabs[i];
				g.name = tabs[i];
				g.list = [];
			if(myList[i]){
				for (var ii = 0; ii < myList[i].length ; ii++) {
					var o = new GRID.M.PageData();
						o.isMemori = true;
						o.deep = 1;
						o.name = myList[i][ii][1];
						o.gloup = g.id;
						o.url = myList[i][ii][0];
						pageSum++;
					g.list.push(o)
				}
			}
			a.push(g);
		}
		return a;
	}

	return {
		setData: setData
	};
})();

GRID.DataManagerHTML = (function() {
	function setData(_t, _callback) {
		_callback(
			setTitle(_t),
			setMemo(_t),
			setParam(_t),
			setList(_t),
			pageSum
		);
	}
	/* ---------- ---------- ---------- */

	var list = [];
	function setTitle(_t) {
		return "title";
	}
	/* ---------- ---------- ---------- */

	function setMemo(_t) {
		return "memo";
	}
	/* ---------- ---------- ---------- */

	function setParam(_t) {
		var base = URL_.getDomain_and_dir(_t.split("\n")[0]);
		if(base.charAt(0) == "."){
			base = URL_.joinURL(location.href,base)
		}
		return { baseUrls: base }
	}
	
	/* ---------- ---------- ---------- */

	function hasData(_s){
		_s = _s.split(' ').join('');
		_s = _s.split('	').join('');
		if (_s != '') return true;
		return false;
	}

	var pageSum = 0;
	function setList(_t) {

		var currentGloupID = '';
		var roots = [];
		var ls = _t.split('\n');
		for (var ii = 1; ii < ls.length; ii++) {
			if (hasData(ls[ii])) {
				if (ls[ii].charAt(0) == '#') {
					roots.push(new _h3(ls[ii]));
				} else {
					var gn = roots.length - 1;
					if(roots[gn]){
					roots[gn].list.push(new _pre_line(ls[ii]));
					}
				}
			}
		}
		
		function _h3(_s) {
			var g = new GRID.M.GloupData();
				g.name = _s;
				currentGloupID = g.id;
			return g;
		}
		function _pre_line(_s) {
			var name = _s;
			var url = _s;

			if (url.indexOf(',') != -1) {
				var ee = url.split(',');
				name = ee[0];
				url = ee[1];
			}

			var o = new GRID.M.PageData();
				o.name = name;
				o.url = url;
				o.id = 'frame_' + pageSum;
				o.gloup = currentGloupID;
			pageSum++;
			return o;
		}
		return roots.concat(_getMemoriList());
	}
	
	
	function _getMemoriList(){
		var a = []
		var myList = GRID.StatePageManager.getListData();
		var tabs = GRID_MY_TAB;
		var s = []
		for (var i = 0; i < tabs.length ; i++) {
			var g = new GRID.M.GloupData();
				g.isMemori = true;
				g.id = tabs[i];
				g.name = tabs[i];
				g.list = [];
			if(myList[i]){
				for (var ii = 0; ii < myList[i].length ; ii++) {
					var o = new GRID.M.PageData();
						o.isMemori = true;
						o.deep = 1;
						o.name = myList[i][ii][1];
						o.gloup = g.id;
						o.url = myList[i][ii][0];
						pageSum++;
					g.list.push(o)
				}
			}
			a.push(g);
		}
		return a;
	}
	return {
		_test_setParam: setParam,
		_test_setList: setList,
		setData: setData
	};
})();


var GRID_DATA_TYPE = "json"

GRID.MainController = (function() {
	v = {};

	function init() {
		GRID.App.app.url = location.href;
		GRID.App.app.domain = URL_.getDomain(location.href);
		
		var file = ""
		 if(window["GRID_SITEMAP_TXT"]) {
		 	GRID_DATA_TYPE = "txt";
			file = GRID_SITEMAP_TXT;
		}
		 if(window["GRID_SITEMAP_JSON"]) {
		 	GRID_DATA_TYPE = "json";
			file = GRID_SITEMAP_JSON;
			
		}
 		if(!file){
			alert("grid_setting.jsの設定が正しくありません。")
			return;
		}
		GRID.StateCommonManager.init();
		GRID.StateSetManager.init();
		GRID.StatePageManager.init();
		
		GRID.Data.fileName = file;
		GRID.API.loadFile(GRID.Data.fileName, function(data) {
			loaded(data);
		});
	}

	var rowtext = '';
	function loaded(_o) {
		rowtext = _o;
		GRID.DataManager.setData(rowtext, function(_t, _m, _p, _a, pageSum) {
			GRID.URL_Manager.setBaseUrl(_p.baseUrls);
			for (var i = 0; i < _a.length; i++) {
				_a[i].setServer(GRID.App.baseUrls.url);
			}
			GRID.Data.title = _t;
			GRID.Data.memo = _m;
			GRID.Data.list = _a;
			GRID.Data.pageSum = pageSum;
			GRID.Data.gloupSum = GRID.Data.list.length + 1;
			// document.title = GRID.Data.title;
		});
		var u = 'grid_body.html?r=' + Math.round(Math.random() * 10000000);
		var tag = '<iframe id="SubFrame" class="" src="' + u + '" ></iframe>';
		$('#GridView').html(tag);
		GRID.V.mainFrame = $('#SubFrame');
		GRID.V.subStage = document.getElementById('SubFrame').contentWindow;
		GRID.V.subStage.onload = function() { createLayout() };
	}

	var subPreviews;
	function createLayout() {
		GRID.V.subStage.setParent(this);
		GRID.V.subPreviews = GRID.V.subStage.getMainController();
		setState();

		GRID.GridView.init();
		GRID.ListView .init();

		GRID.V.subPreviews		.setGloups(GRID.Data.list);
		GRID.ListView			.setGloups(GRID.Data.list);

		GRID.ViewSelectView 	.init();
		GRID.TabListView		.init();
		GRID.SettingEditView	.init();
		GRID.SettingEditView	.setData(rowtext);
		GRID.SlideController	.init();
		GRID.SlideController	.setGloups(GRID.Data.list);
		GRID.RevalView			.init();
		GRID.ScrollView			.init();
		GRID.FloatPanelView		.init();
		GRID.StateRectsView		.init();
		GRID.PreviewViewHeader	.init();
		GRID.PreviewView		.init();

		GRID.SplitViewController.init();
		GRID.SplitViewController.update();

		subPreviews = GRID.V.subPreviews;

		setEvent();
		initGloup();
		update();
		selectViewType();

		setTimeout(function() {
			openPreview();
		},100);
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
		$('body').bind('keydown', function(event) {
			if (GRID.SettingEditView.isOpen_())return;
			if (GRID.RevalView.isOpen_())return;

			keyUp_(event);
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

		$(window).resize(function() {
			updateStageHeight();
		});
	};
	function keyUp_(_key) {
		var tar = GRID.FloatPanelView;
		var c = _key.keyCode;
		//if(c == 32) openNextGloup();
		if (c == 37) openPrevGloup();
		if (c == 38) slidePrev();
		if (c == 39) openNextGloup();
		if (c == 40) slideNext();
		$('#LogView').html(c);
	}

	/* ! ---------- 更新 ---------- ---------- ---------- ---------- */

	//なにかしら更新があったら呼ばれる
	function update() {
		setState();
		GRID.V.subPreviews.update();
		GRID.FloatPanelView.updated();
		GRID.SlideController.updated();
		updateStageHeight();
	}
	function updateReval() {
		GRID.V.subPreviews.updateReval();
	}
	//ステートをiframeに伝える
	function setState() {
		GRID.StateSetManager.update();
		GRID.V.subPreviews.setState(
			GRID.StateSetManager.getState(),
			GRID.StateReval,
			GRID.App
			);
	}
	function callCommand(_c, _a) {
		GRID.V.subPreviews.callCommand(_c, _a);
	}

	/* ! ---------- 高さやスクロールなど ---------- ---------- ---------- ---------- */

	//iFrameの高さを設定する
	var stageHeight = 0;
	function updateStageHeight() {
		var state = GRID.StateSetManager.getState();
		var stageH = GRID.V.subStage.getScrollH() * state.scale/100;
			stageH += 100;
		var wH = $(window).height();
		if (wH > stageH) stageH = wH;
		stageHeight = stageH;

		GRID.V.mainFrame.height(stageH);
	}

	//画面全体のスクロール
	function setScroll(_abs, _n) {
		var tarY = 0;
		if (_abs == 'abs') {
			tarY = _n;
		} else {
			tarY = bodyElement().scrollTop() + _n;
		}
		bodyElement().animate({
			scrollTop: tarY
		},{ duration: 200, ease: 'swing' });
		GRID.V.subStage.scrollTo_('abs', 0);
	}

	//個別フレームごとのスクロール
	function setScroll_grid(_abs, _n) {
		GRID.V.subPreviews.setScroll(_abs, _n);
	}
	function resetScroll() {
		setScroll('abs', 0);
		setScroll_grid('abs', 0);
	}


	/* ! ---------- タブを開く ---------- ---------- ---------- ---------- */

	function openGloup(_n) {
		if (_n == null) {
			_n = GRID.StateCommon.currentGloup;
		}
		gloupLotation.setN(_n);
		GRID.StateCommonManager.setCurrentGloup(_n);
		GRID.StateCommonManager.setPreviewNo(-1);
		GRID.TabListView.openGloup(_n);
		subPreviews.openGloup(_n);
		update();
		slideReset();
		resetScroll();
	}
	var gloupLotation;
	function initGloup() {
		gloupLotation = new Lib_.Type_.RotationInt(0, [0, GRID.Data.gloupSum - 1]);
	}

	function isPreview() {
		return (GRID.StateCommon.viewType == 'preview');
	}

	function openPrevGloup() {
		if (!isPreview())return;
		gloupLotation.add_(-1);
		openGloup(gloupLotation.getN());
	}
	function openNextGloup() {
		if (!isPreview())return;
		gloupLotation.add_(1);
		openGloup(gloupLotation.getN());
	}

	/* ! ---------- スライドショー ---------- ---------- ---------- ---------- */

	function slideReset() { }
	function slidePrev() {
		GRID.SlideController.slidePrev();
	}
	function slideNext() {
		GRID.SlideController.slideNext();
	}


	/* ! ----------  ---------- ---------- ---------- ---------- */

	function openPreview(_u, _n) {
		var _state = GRID.StateCommon;
		if (_u == null) {
			_u = _state.preview.url;
		} else {
			GRID.StateCommonManager.setPreviewUrl(_u);
		}
		if (_n != null) {
			GRID.StateCommonManager.setPreviewNo(_n);
		}
		if (_state.preview.url == '')return;
		
		GRID.PreviewViewHeader.openPreview();
		GRID.SlideController.updated();
		subPreviews.selectPage(_state.preview.url);
		GRID.ListView.selectPage(_state.preview.url);
	}
	/*
	function updatePreview(_u) {
		GRID.PreviewViewHeader.updatePreview(_u);
	}*/

	/* ! ----------  ---------- ---------- ---------- ---------- */

	function selectViewType(_s) {
		var _state = GRID.StateCommon;
		if (_s == null) {
			_s = _state.viewType;
		} else {
			GRID.StateCommonManager.setViewType(_s)
		}
		GRID.StateSetManager.update();

		GRID.ListView			.stageOut();
		GRID.GridView			.stageOut();
		GRID.SettingEditView	.stageOut();
		GRID.ScrollView			.stageOut();
		GRID.FloatPanelView		.stageOut();
		GRID.TabListView		.stageOut();
		GRID.RevalView			.stageOut();
		GRID.StateRectsView		.stageOut();

		if (_state.viewType == 'list') {
			GRID.ListView.stageIn();
		}
		if (_state.viewType == 'preview') {
			GRID.GridView		.stageIn();
			GRID.ScrollView		.stageIn();
			GRID.FloatPanelView	.stageIn();
			GRID.TabListView	.stageIn();
			GRID.RevalView		.stageIn();
			GRID.StateRectsView	.stageIn();
		}
		// if (_state.viewType == 'edit') {
		// 	GRID.SettingEditView.stageIn();
		// }
		GRID.ViewSelectView.update();
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */

	function openServer(_s) {
		window.location.hash = _s;
		window.location.reload();
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */

	return {
		init: init,
		keyUp_: keyUp_,
		update: update,
		updateReval: updateReval,
		callCommand: callCommand,

		setScroll: setScroll,
		setScroll_grid: setScroll_grid,
		openGloup: openGloup,
		slideReset: slideReset,
		slidePrev: slidePrev,
		slideNext: slideNext,

		openPreview: openPreview,
		//updatePreview:updatePreview,
		selectViewType: selectViewType,
		openServer: openServer
	};
})();

GRID.ViewSelectView = (function() {
	var view;
	var v = {};

	function init() {
		view = $('#ViewSelectView');
		//stageInit();
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */
	
	function setBtn() {
		v._btn_list	= view.find('._btn_list');
		v._btn_preview	= view.find('._btn_preview');
		v._btn_list.click(function() {selectViewType('list')});
		v._btn_preview.click(function() {selectViewType('preview')});
		setServers();
	}

	function setServers() {
		var ss = GRID.App.baseUrls.items;
		var tag = '';
		for (var i = 0; i < ss.length; i++) {
			tag += '<div class="item" data-no="' + i + '"><i class="fa fa-globe" ></i> ' + ss[i] + '</div>';
		}
	}

	function selectViewType(_s) {
		GRID.MainController.selectViewType(_s);
	}


	function createlayout() {
	}

	function update() {
		v._btn_list.removeClass('active');
		v._btn_preview.removeClass('active');

		if (GRID.StateCommon.viewType == 'list') {
			v._btn_list.addClass('active');
		}
		if (GRID.StateCommon.viewType == 'preview') {
			v._btn_preview.addClass('active');
		}
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.fadeIn(500);
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
			view.fadeOut(200);
		}
	}

	return {
		init: init, stageIn: stageIn, stageOut: stageOut,
		update: update
	};
})();

GRID.GridView = (function() {
	var view;
	var v = {};
	function init() {
		view = $('#GridView');

		stageInit();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {
	}

	function createlayout() {
		GRID.MainController.openGloup();
	}


	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.show();
			if (isFirst) {
				createlayout();
			}
			isFirst = false;

		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
			view.hide();
			GRID.FloatPanelView.stageOut();
			GRID.TabListView.stageOut();
		}
	}

	return { init: init, stageIn: stageIn, stageOut: stageOut	};
})();

GRID.ListView = (function() {
	var view;
	var v = {};
	var stateCom;
	function init() {
		stateCom = GRID.StateCommon;
		view = $('#ListView');
		v.inner	= view.find('.inner');

		stageInit();
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setGloups(_data) {
		var cnt = 0;
		var gloups = [];
		var temp = '';

		//header
		var tag = '';
		// tag += '<div class="h1">' + GRID.Data.title + '</div>';
		if (GRID.App.baseUrls.url != '') {
			var base = GRID.App.baseUrls.url;
			tag += '<div class="base">__BASE_URL__ : <a href="' + base + '" target="_blank">' + base + ' <i class=" fa fa-external-link-square "></i> </a></div>';
		}
		tag += '<div class="header"> ';
		tag += '	<div class="searchArea" style="float:right"> ';
		tag += '		絞り込み : <input class="in_search" >';
		tag += '		<span class="_btn btn_search_hide_on"><i class=" fa fa-square-o "></i> 非表示</span> ';
		tag += '		<span class="_btn btn_search_hide_off"><i class=" fa fa-check-square "></i> 非表示</span> ';
		tag += '	</div>';
		tag += '	<div class="h2">データリスト</div>';
		tag += '</div>';
		//body
		tag += '<table>';
			tag += '<tr>';
			tag += '<td></td>';
			tag += '<td></td>';
			tag += '<td></td>';
			tag += '<td></td>';
			tag += '<td>'
			tag += '	<table class="mylist">';
			tag += '	<tr>';
			var tabs = GRID_MY_TAB;
			for (var i = 0; i < tabs.length ; i++) {
				tag += '		<td>'+tabs[i]+'</td>';
			}
			tag += '	</tr>';
			tag += '	</table>';
			tag += '</td>';
			tag += '</tr>';
		var pageCount = 0;
		//var ids = []
		for (var i = 0; i < _data.length; i++) {
			var gl = _data[i];
			if(!gl.isMemori){
					tag += '<tr>';
					tag += '<td class="gloup" colspan="5">' + gl.name + '</td>';
					tag += '</tr>';
				for (var ii = 0; ii < gl.list.length; ii++) {
					var pageData = gl.list[ii];
					if(pageData.type == "sub-gloup"){
						var temp = '';
							temp += '<tr>';
							temp += '<td></td>';
							temp += '<td class="sub-gloup" colspan="4">' + pageData.name + '</td>';
							temp += '</tr>';
							temp += '</tr>';
						tag += temp;
					} else{
						var temp = '';
							temp += '<tr id="' + pageData.id + '" class="pageItem">';
							temp += '<td class="no"></td>';
							temp += '<td class="name"></td>';
							temp += '<td class="date"></td>';
							temp += '<td class="url"></td>';
							temp += '<td class="checks"></td>';
							temp += '</tr>';
						tag += temp;
					}
				}
			}
		}
		tag += '<tr>';
		tag += '	<td></td>';
		tag += '	<td></td>';
		tag += '	<td></td>';
		tag += '	<td></td>';
		tag += '	<td><div class="_btn btn_setMemori">保存・リロード</div></td>';
		tag += '</tr>';
		tag += '</table>';
		tag += '<textarea id="listData" style="display:none;width:500px;height:200px;"></textarea>';
		tag += '';

		//footer
		// tag += '<div class="h2">メモ</div>';
		// tag += '<div class="memo">' + GRID.Data.memo + '</div>';
		v.inner.html(tag);

		v.pageItem	= view.find('.pageItem');
		v.pageItem.each(function(index, dom) {
			var p = new GRID.ListViewPage(dom);
			pages.push(p);
		});

		initSearch();
		initCheck();
		
	}

	var pages = [];
	function setBtn() {
	}
	function createlayout() {
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	function initCheck() {
		v.in_checks = v.inner.find("input");
		v.btn_setMemori	= view.find('.btn_setMemori');
		v.btn_setMemori.click(function(){ setListMemori() });
		
		var myList = GRID.StatePageManager.getListData();
		for (var i = 0; i < myList.length ; i++) {
			for (var ii = 0; ii < myList[i].length ; ii++) {
				var id = myList[i][ii][0];
				v.inner.find('[data-id="'+id+'"]').eq(i).prop("checked",true);
			}
		}
	}

	function setListMemori() {
		var leng = v.in_checks.size();
		var checks = [[],[],[],[],[]]
		for (var i = 0; i < leng ; i++) {
			var tar = v.in_checks.eq(i)
			if(tar.prop("checked")){
				var id = tar.data("id");
				var name = tar.data("name");
				var no = tar.data("no");
				checks[no].push([id,name])
			}
		}
		$("#listData").val(JSON.stringify(checks, null, "	"));
		GRID.StatePageManager.setListData(checks);
		setTimeout(function(){
			window.location.reload();
		},200);
	}
	
	
	/* ! ----------  ---------- ---------- ---------- ---------- */

	function selectPage(_u) {
		for (var i = 0; i < pages.length; i++) {
			pages[i].selectPage(_u);
		}
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */
	//search

	function initSearch() {
		v.in_search	= view.find('.in_search');
		v.in_search.keyup(function() {
			search($(this).val());
		});
		v.btn_search_hide_on	= view.find('.btn_search_hide_on');
		v.btn_search_hide_off	= view.find('.btn_search_hide_off');
		v.btn_search_hide_on.click(function() { searchMath_is_hide(true)});
		v.btn_search_hide_off.click(function() { searchMath_is_hide(false)});
		if (stateCom.search.list.isHide) {
			searchMath_is_hide(true);
		} else {
			searchMath_is_hide(false);
		}

		var ser = stateCom.search.list.text;
		if (ser != '') {
			v.in_search.val(ser);
			v.in_search.keyup();
		}
	}
	function searchMath_is_hide(_b) {
		if (_b) {
			v.btn_search_hide_on.hide();
			v.btn_search_hide_off.show();
			view.addClass('hide_matched');
		} else {
			v.btn_search_hide_on.show();
			v.btn_search_hide_off.hide();
			view.removeClass('hide_matched');
		}
		//
		stateCom.search.list.isHide = _b;
		GRID.StateCommonManager.update();
	}

	var prevSearchText = '';
	var searchTID;
	function search(_s) {
		if (prevSearchText == _s)return;
		prevSearchText = _s;

		if (searchTID != null)clearTimeout(searchTID);
		searchTID = setTimeout(function() {
			search_core(_s);
		},200);
		//
		stateCom.search.list.text = prevSearchText;
		GRID.StateCommonManager.update();
	}
	function search_core(_s) {
		for (var i = 0; i < pages.length; i++) {
			pages[i].search(_s);
		}
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
		view.hide();
		}
	}

	return {
		init: init, stageIn: stageIn, stageOut: stageOut,
		setGloups: setGloups,
		selectPage: selectPage,
		search: search
	};
})();

	

GRID.ListViewPage = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_dom) {
	  this.init(_dom);
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */

	p.view;
	p.v;
	p.data;

	p.init = function(_dom) {
		this.view = $(_dom);
		this.id = this.view.attr('id');

		this.v = {};

		this.data = GRID.M.PageDataManager.getData_by_id(this.id);

		var a_tag = '<a href="{URL}" target="_blank">{URL_V} <i class=" fa fa-external-link-square "></i></a>';
			a_tag = a_tag.split('{URL}').join(this.data.url);
			a_tag = a_tag.split('{URL_V}').join(this.data.url_and_base);

		this.v.tds = this.view.find('td');
		this.v.no = this.v.tds.eq(0);
		this.v.name = this.v.tds.eq(1);
		this.v.date = this.v.tds.eq(2);
		this.v.url = this.v.tds.eq(3);
		this.v.checks = this.v.tds.eq(4);

		var __ = (function(_deep){ 
			var s = ""
		    for (var i = 0; i < _deep ; i++) {
				s += '<span class="wide"> </span>'
			}
			return s;
		})(this.data.deep);
		this.v.no.html(this.data.no);
		this.v.name.html(__ + this.data.listTexts.name);
		this.v.url.html(this.data.listTexts.url);
		
		var uu = this.data.url_origin
			var tabs = GRID_MY_TAB;
			var tag = ""
				tag += '<div>'
				for (var i = 0; i < tabs.length ; i++) {
					tag += '	<input type="checkbox" data-no="'+i+'" data-id="' + uu + '" data-name="' + this.data.name + '">'
				}
				tag += '</div>'
			this.v.checks.html(tag);
		// }
		this.setBtn();
	};

	p.setBtn = function() {
		var this_ = this;
		this.v.name.click(function() {
			GRID.MainController.openPreview(this_.data.url, this_.data.no - 1);
		});
	};

	/* ---------- ---------- ---------- */

		/*
	p.upadteLastModified = function() {
		if (!this.isAccesable)return;
		var this_ = this;
		$.ajax({
			scriptCharset: 'utf-8',
			type: 'GET',
			url: this.data.url,
			dataType: 'text',
			success: function(data, status, xhr) {
				var d = new Date(xhr.getResponseHeader('Last-Modified'));
				var s = DateUtil.getRelatedDate(d);

				var ss = '';
					ss += '<i class="date_icon fa fa-clock-o"></i> ';
					ss += s;
				this_.v.date.html(ss);
			}
		});
	};

		*/

	/* ---------- ---------- ---------- */

	p.selectPage = function(_u) {
		if (this.data.url == _u) {
			this.view.addClass('selected');
		} else {
			this.view.removeClass('selected');
		}
	};
	p.search = function(_s) {
		var b = this.data.isMatch(_s);
		if (_s == '') b = false;
		if (b) {
			this.data.isMatchSearch(true);
			this.setMatchedText(_s);
		} else {
			this.setDefaultText();
			if (_s == '') {
				this.data.isMatchSearch(true);
				this.view.removeClass('notMatchSearch');
			} else {
				this.data.isMatchSearch(false);
				this.view.addClass('notMatchSearch');
			}
		}
	};
	p.isDefText;
	p.setMatchedText = function(_s) {
		this.isDefText = false;
		this.v.name.html(this.data.getMatchText_name(_s));
		this.v.url.html(this.data.getMatchText_url(_s));
			this.view.removeClass('notMatch');
	};

	p.setDefaultText = function() {
		if (this.isDefText == null) this.isDefText = false;
		if (this.isDefText)return;
		this.isDefText = true;
		this.v.name.html(this.data.listTexts.name);
		this.v.url.html(this.data.listTexts.url);
	};
	return c;
})();


GRID.SettingEditView = (function() {
	var view;
	var v = {};

	function init() {
		view = $('#SettingEditView');
		v.textarea = view.find('textarea');
		v.btn_save = view.find('.btn_save');
		//v.btn_close = view.find(".btn_close");
		stageInit();
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {
		v.btn_save.click(function() {
			save();
		});
		/*v.btn_close.click(function(){
			stageOut();
		});*/
	}
	function save() {
		// var param = {};
		// 	param.action = 'write';
		// 	param.dir_name = GRID.Data.saveDir_php;
		// 	param.file_name = GRID.Data.fileName;
		// 	param.text = v.textarea.val();
		// GRID.API.saveFile(param, function() {
		// 	save_comp();
		// });
	}

	function save_comp() {
		window.location.reload();
	}

	function createlayout() {
	}

	function setData(_t) {
		v.textarea.val(_t);
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
		view.hide();
		}
	}

	function isOpen_() {
		return isOpen;
	}
	return { init: init, stageIn: stageIn, stageOut: stageOut,
		setData: setData,
		isOpen_: isOpen_
	 };
})();

GRID.SlideController = (function() {
	var view;
	var v = {};
	function init() {
		v.listView = GRID.Slide_at_List;
		v.previewView = GRID.Slide_at_Preview;

		v.listView.init();
		v.previewView.init();
	}

	function setGloups(_data) {
		v.previewView.setGloups(_data);
	}
	function isList() {
		return (GRID.StateCommon.viewType == 'list');
	}

	function updated() {
		//if(isList){
			v.listView.updated();
		//} else{
			v.previewView.updated();
		//}
	}
	function selectPage(_n) {
		if (isList()) {
			v.listView.selectPage(_n);
		} else {
			v.previewView.selectPage(_n);
		}
	}
	function slideReset() {
		if (isList()) {
			v.listView.slideReset();
		} else {
			v.previewView.slideReset();
		}
	}
	function slidePrev() {
		if (isList()) {
			v.listView.slidePrev();
		} else {
			v.previewView.slidePrev();
		}

	}
	function slideNext() {
		if (isList()) {
			v.listView.slideNext();
		} else {
			v.previewView.slideNext();
		}
	}

	return {
		init: init,
		setGloups: setGloups,
		updated: updated,
		selectPage: selectPage,
		slidePrev: slidePrev,
		slideNext: slideNext
	};
})();

GRID.Slide_at_List = (function() {
	var view;
	var v = {};
	var cnt;
	var rotationInt;
	var _state;
	function init() {
		_state = GRID.StateCommon;
		cnt = GRID.Data.pageSum;
		rotationInt = new Lib_.Type_.RotationInt(0, [0, cnt - 1]);

		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {

	}

	/* ---------- ---------- ---------- */

	function setGloups() {
	}

	/* ---------- ---------- ---------- */

	function updated() {

	}
	function slideReset() {

	}
	function slidePrev() {
		if (_state.preview.no == -1) {
			rotationInt.setN(0);
			rotationInt.add_(-1);
		} else {
			rotationInt.setN(_state.preview.no);
			rotationInt.add_(-1);
		}

		//for search
		if (isSelecttablePage(rotationInt.getN())) {
			selectPage(rotationInt.getN());
		} else {
			_state.preview.no--;
			if (_state.preview.no <= 0) _state.preview.no = cnt - 1;
			slidePrev();
		}
	}
	function slideNext() {
		if (_state.preview.no == -1) {
			rotationInt.setN(0);
		} else {
			rotationInt.setN(_state.preview.no);
			rotationInt.add_(1);
		}
		//for search
		if (isSelecttablePage(rotationInt.getN())) {
			selectPage(rotationInt.getN());
		} else {
			_state.preview.no++;
			if (_state.preview.no >= cnt) _state.preview.no = 0;
			slideNext();
		}
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */

	function createlayout() {
	}

	function isSelecttablePage(_n) {
		return frames[_n].isSelectable();
	}

	function selectPage(_n) {
		var d = frames[_n].url;
		GRID.MainController.openPreview(d, _n);
	}

	return { init: init,
		setGloups: setGloups,
		selectPage: selectPage,
		slidePrev: slidePrev,
		slideNext: slideNext,
		updated: updated
	};
})();

GRID.Slide_at_Preview = (function() {
	var view;
	var v = {};
	var _state
	function init() {
		_state = GRID.StateCommon
		view = $('#Slide_at_Preview');

		stageInit();
		stageIn();
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {
		v.btn_prev	= view.find('.btn_prev');
		v.btn_next	= view.find('.btn_next');
		v.pagenation	= view.find('.pagenation');

		v.btn_prev.click(function() { slidePrev();});
		v.btn_next.click(function() { slideNext();});

		v.pagenation.html('');
	}

	/* ---------- ---------- ---------- */
	var gloups = [];
	var rotationInt;
	var isAll;

	function setGloups(_data) {
		for (var i = 0; i < _data.length; i++) {
			var g = new GRID.Slide_at_P_Gloup(_data[i]);
			gloups.push(g);
		}
		var cnt = GRID.Data.pageSum;
		rotationInt = new Lib_.Type_.RotationInt(0, [0, cnt - 1]);
	}

	/* ---------- ---------- ---------- */

	var currentGroup = -1;
	function updated() {
		if (currentGroup != _state.currentGloup) {
			currentGroup = _state.currentGloup;
			slideReset();
		} else {
			setCurrentPage();
		}
	}

	var pageMax = 0;
	function updatePageMax() {
		if (isAll) {
			pageMax = frames.length;
		} else {
			pageMax = gloups[currentGroup].pages.length;
		}
		v.pagenation.html(pageMax + ' page');
	}
	function setCurrentPage() {
		v.pagenation.html(_state.preview.no + 1 + ' / ' + pageMax);
	}

	function slideReset() {
		isAll = (gloups.length == currentGroup) ? true : false;
		isSlideModeFirst = true;
		rotationInt.setN(0);

		for (var i = 0; i < gloups.length; i++) {
			gloups[i].slideReset();
		}
		updatePageMax();
	}
	function slidePrev() {
		if (isAll) {
			slidePrevWhenALl();
		} else {
			gloups[currentGroup].slidePrev();
		}

	}
	function slideNext() {
		if (isAll) {
			slideNextWhenALl();
		} else {
			gloups[currentGroup].slideNext();
		}
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */

	function slidePrevWhenALl() {
		if (_state.preview.no == -1) {
			rotationInt.setN(0);
			rotationInt.add_(-1);
		} else {
			rotationInt.setN(_state.preview.no);
			rotationInt.add_(-1);
		}
		slideWhenALl(rotationInt.getN());
	}
	function slideNextWhenALl() {
		if (_state.preview.no == -1) {
			rotationInt.setN(0);
		} else {
			rotationInt.setN(_state.preview.no);
			rotationInt.add_(1);
		}
		slideWhenALl(rotationInt.getN());
	}
	function slideWhenALl(_n) {
		selectPageAll(_n);
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */

	function createlayout() {
	}

	function selectPage(_n) {
		var d = gloups[GRID.StateCommon.currentGloup].pages[_n].url;
		GRID.MainController.openPreview(d, _n);
	}
	function selectPageAll(_n) {
		var d = frames[_n].url;
		GRID.MainController.openPreview(d, _n);
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.fadeIn(500);
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
			view.fadeOut(200);
		}
	}

	return { init: init, stageIn: stageIn, stageOut: stageOut,
		setGloups: setGloups,
		selectPage: selectPage,
		slidePrev: slidePrev,
		slideNext: slideNext,
		updated: updated
	};
})();

GRID.Slide_at_P_Gloup	= (function() {
	var c = function(_data) {
	  this.init(_data);
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	var GLOUP_NO = 0;

	p.parentView;
	p.pages;

	p.init = function(_data) {
		this.data = _data;
		this.createLayout_pre();
	};

	p.createLayout_pre = function() {
		this.pages = [];
		var list = this.data.list;
		for (var ii = 0; ii < list.length; ii++) {
			var o = list[ii];
			//page
			if (o.type == 'page') {
				frames.push(o);
				this.pages.push(o);
			}
		}
		this.pageCount = this.pages.length;
		this.rotationInt = new Lib_.Type_.RotationInt(0, [0, this.pageCount - 1]);
	};
	p.slideReset = function() {
		if (this.pages == null) return;
		this.rotationInt.setN(0);
		this.isSlideModeFirst = true;
	};
	p.slidePrev = function() {
		if (GRID.StateCommon.preview.no == -1) {
			this.rotationInt.setN(0);
			this.rotationInt.add_(-1);
		} else {
			this.rotationInt.setN(GRID.StateCommon.preview.no);
			this.rotationInt.add_(-1);
		}
		this.slide(this.rotationInt.getN());
	};
	p.isSlideModeFirst;
	p.slideNext = function() {
		if (GRID.StateCommon.preview.no == -1) {
			this.rotationInt.setN(0);
		} else {
			this.rotationInt.setN(GRID.StateCommon.preview.no);
			this.rotationInt.add_(1);
		}
		this.slide(this.rotationInt.getN());
	};
	p.slide = function(_n) {
		GRID.SlideController.selectPage(_n);
	};
	return c;
})();

GRID.TabListView = (function() {
	var view;
	var v = {};

	function init() {
		view = $('#TabListView');

		stageInit();
		createlayout();
		setBtn();
		stageIn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {}

	var count = 0;
	function createlayout() {
		view.html('<div class="core"></div>');
		v.core	= view.find('.core');
		var tabs = GRID_MY_TAB;
		var gs = GRID.Data.list;
		var tag = '';
			tag += '<ul>';
		// if (gs.length > 1) {
			for (var i = 0; i < gs.length; i++) {			
				var b = false
				var cs = [];
				if(gs[i].list.length == 0){
					cs.push("noData")
				}
				var t = ""
				if(gs[i].name == tabs[0]){
					if(gs[i].isMemori){
						t = '<li style="margin-left:10px;" class="{CS}">' + gs[i].name + '</li>';
						b = true;
					}
				}
				if(!b){
					t = '<li class="{CS}">' + gs[i].name + '</li>';
				}
				t = t.split("{CS}").join(cs.join(" "));
				tag += t;
			}
		// }
		tag += '<li style="margin-left:10px;">すべて表示</li>';
		tag += '</ul>';
		v.core.html(tag);

		v.btns = v.core.find('li');
		v.btns.each(function(index, domEle) {
			$(this).click(function() {
				GRID.MainController.openGloup(index);
			});
		});
		count = v.btns.size();
	}

	function openGloup(_n) {
		var all = count - 1;
		if (_n == all) {
			for (var i = 0; i < count; i++) {
				v.btns.eq(i).removeClass('active');
			}
			v.btns.eq(all).addClass('active');
		} else {
			for (var i = 0; i < count; i++) {
				v.btns.eq(i).removeClass('active');
			}
			v.btns.eq(_n).addClass('active');
			v.btns.eq(all).removeClass('active');
		}
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn, stageOut: stageOut,
		openGloup: openGloup
	};
})();

GRID.RevalView = (function() {
	var view;
	var v = {};
	var revalState;
	function init() {
		revalState = GRID.StateReval;
		view = $('#RevalView');
		createlayout();
		setBtn();
		setBtn2();
		stageInit();
	}

	function createlayout() {
	}
	/* ---------- ---------- ---------- */

	function setBtn() {
		v.t1	= view.find('input.t1');
		v.t1.keyup(function() { changeText_pre() });
		v.t1.focus(function() { focus_() });
		v.t1.blur(function() { blur_() });

		v.t2	= view.find('input.t2');
		v.t2.keyup(function() { changeText2_pre() });
		v.t2.focus(function() { focus_() });
		v.t2.blur(function() { blur_() });
		
		initHover();
		
	}
	
	/* ---------- ---------- ---------- */
	
	function initHover() {
		view.hover(
			function(){
				hoverIn();
			},function(){
				hoverOut();
			}
		);
	}
			
	var tID;
	function hoverIn(){
		if(tID) clearTimeout(tID);
		view.addClass('hover') 
	}
	function hoverOut(){	
		tID = setTimeout(function(){
			view.removeClass('hover') 
		},1000);
	}
	/* ---------- ---------- ---------- */
	var tId;
	function changeText_pre() {
		if (tId) clearTimeout(tId);
		tId = setTimeout(function() { changeText() },200);
	}
	function changeText() {
		revalState.text = v.t1.val();
		update();
	}

	function changeText2_pre() {
		if (tId) clearTimeout(tId);
		tId = setTimeout(function() { changeText2() },200);
	}
	function changeText2() {
		revalState.jq = v.t2.val();
		update();
	}

	/* ---------- ---------- ---------- */

	function setBtn2() {

		v.t2	= view.find('input.t2');
		v.t2.keyup(function() { changeText2_pre() });

		v.reval_hide	= view.find('.reval_hide');
		v.reval_iso	= view.find('.reval_iso');
		v.reval_line	= view.find('.reval_line');
		v.reval_bk	= view.find('.reval_bk');
		v.reval_show	= view.find('.reval_show');
		v.reval_link	= view.find('.reval_link');
		v.reval_img	= view.find('.reval_img');

		v.reval_hide .change(function() {changeReval_Hide()});
		v.reval_iso .change(function() {changeReval_Iso()});
		v.reval_line .change(function() {changeReval_Line()});
		v.reval_bk .change(function() {changeReval_BK()});
		v.reval_show	.change(function() {changeReval_show()});
		v.reval_link .change(function() {changeReval_Link()});
		v.reval_img .change(function() {changeReval_Img()});

	}

	function changeReval_Hide() {
		revalState.isHide = v.reval_hide.prop('checked');
		update();
	}
	function changeReval_Iso() {
		revalState.isIso = v.reval_iso.prop('checked');
		update();
	}
	function changeReval_Line() {
		revalState.isLine = v.reval_line.prop('checked');
		update();
	}

	function changeReval_BK() {
		revalState.isBK = v.reval_bk.prop('checked');
		update();
	}
	function changeReval_show() {
		revalState.showSelector =v.reval_show.prop('checked');
		update();
	}
	function changeReval_Link() {
		revalState.showLink = v.reval_link.prop('checked');
		update();
	}
	function changeReval_Img() {
		revalState.showImg = v.reval_img.prop('checked');
		update();
	}
	function update() {
		GRID.MainController.updateReval();
	}
	function updated() {
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			if (isFirst) {}
			isFirst = false;
			view.show();
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
			view.hide();
		}
	}
	/* ---------- ---------- ---------- */

	var focus = false;
	function focus_() {
		focus = true;
	}
	function blur_() {
		focus = false;
	}
	function isOpen_() {
		return focus;
	}
	return { init: init, stageIn: stageIn, stageOut: stageOut,
		isOpen_: isOpen_
	};
})();


GRID.FloatPanelView = (function() {
	var view;
	var v = {};

	var current;

	function init() {
		current = GRID.StateSetManager.getState();
		view = $('#FloatPanelView');
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {
		v.b_zoom_100 = view.find('.b_zoom_100');
		v.b_zoom_50 = view.find('.b_zoom_50');
		v.b_zoom_33 = view.find('.b_zoom_33');
		v.b_zoom_25 = view.find('.b_zoom_25');
		v.b_zoom_15 = view.find('.b_zoom_15');
		v.b_zoom_up = view.find('.b_zoom_up');
		v.b_zoom_down = view.find('.b_zoom_down');
		v.b_misc_01 = view.find('.b_misc_01');
		v.b_misc_01_ng = view.find('.b_misc_01_ng');
		v.b_misc_02 = view.find('.b_misc_02');
		v.b_misc_02_ng = view.find('.b_misc_02_ng');
		v.b_mar_left = view.find('.b_mar_left');
		v.b_mar_right = view.find('.b_mar_right');
		v.b_h_up = view.find('.b_h_up');
		v.b_h_down = view.find('.b_h_down');
		v.b_w_left = view.find('.b_w_left');
		v.b_w_right = view.find('.b_w_right');
		v.b_w_320 = view.find('.b_w_320');
		v.b_w_768 = view.find('.b_w_768');
		v.b_w_1024 = view.find('.b_w_1024');
		v.b_w_1200 = view.find('.b_w_1200');
		v.b_w_2000 = view.find('.b_w_2000');
		v.b_w_320_1024 = view.find('.b_w_320-1024');
		
		v.b_h_500  = view.find('.b_h_500');
		v.b_h_1000 = view.find('.b_h_1000');
		v.b_h_2000 = view.find('.b_h_2000');
		v.b_h_3000 = view.find('.b_h_3000');
		v.b_h_4000 = view.find('.b_h_4000');
		v.b_h_6000 = view.find('.b_h_6000');
		v.b_h_16000 = view.find('.b_h_16000');
		
		
		//v.b_slide_prev		= view.find('.b_slide_prev');
		//v.b_slide_next		= view.find('.b_slide_next');
		
		
		v.b_bg = view.find('.b_bg');
		v.b_col = view.find('.b_col');
		v.b_bg_col = view.find('.b_bg_col');
		v.b_col_col = view.find('.b_col_col');

		v.b_zoom_100	.click(function() { setZoom('abs', 100); });
		v.b_zoom_50		.click(function() { setZoom('abs', 50); });
		v.b_zoom_33		.click(function() { setZoom('abs', 33.3); });
		v.b_zoom_25		.click(function() { setZoom('abs', 25); });
		v.b_zoom_15		.click(function() { setZoom('abs', 15); });
		v.b_zoom_up		.click(function() { setZoom('rel', 10); });
		v.b_zoom_down	.click(function() { setZoom('rel', -10); });

		v.b_misc_01		.click(function() { noBR(); });
		v.b_misc_02		.click(function() { noTitle(); });
		v.b_misc_01_ng	.click(function() { noBR(); });
		v.b_misc_02_ng	.click(function() { noTitle(); });

		v.b_mar_left	.click(function() { setMargin('rel', -1); });
		v.b_mar_right	.click(function() { setMargin('rel', 1); });

		v.b_h_up		.click(function() { setH('rel', -500); });
		v.b_h_down		.click(function() { setH('rel', 500); });
		v.b_h_500 		.click(function() { setH('abs', 500); });
		v.b_h_1000		.click(function() { setH('abs', 1000); });
		v.b_h_2000		.click(function() { setH('abs', 2000); });
		v.b_h_3000		.click(function() { setH('abs', 3000); });
		v.b_h_4000		.click(function() { setH('abs', 4000); });
		v.b_h_6000		.click(function() { setH('abs', 8000); });
		v.b_h_16000		.click(function() { setH('abs', 16000); });

		v.b_w_left		.click(function() { setW('rel', -100); });
		v.b_w_right		.click(function() { setW('rel', 100); });
		v.b_w_320		.click(function() { setW('abs', [320]); });
		v.b_w_768		.click(function() { setW('abs', [768]); });
		v.b_w_1024		.click(function() { setW('abs', [1024]); });
		v.b_w_1200		.click(function() { setW('abs', [1200]); });
		v.b_w_2000		.click(function() { setW('abs', [2000]); });
		v.b_w_320_1024	.click(function() { setW('abs', [1024, 320]); });

		//v.b_slide_prev		.click(function(){ });
		//v.b_slide_next		.click(function(){ });

		v.b_bg			.click(function() { setBK(); });
		v.b_col			.click(function() { setCol(); });
		v.b_bg_col		.click(function() { setBK(); });
		v.b_col_col		.click(function() { setCol(); });

		v.current_s = view.find('.current_s');
		v.current_w = view.find('.current_w');
		v.current_h = view.find('.current_h');
		v.current_m = view.find('.current_m');
		v.current_s		.click(function() { setZoom('abs'); });
		v.current_w		.click(function() { setW('abs'); });
		v.current_h		.click(function() { setH('abs'); });
		v.current_m		.click(function() { setMargin('abs'); });
		
		v.btn_memori_save = view.find('.btn_memori_save');
		v.btn_memori_save .click(function() { save() });
		
		v.btn_memori_reset = view.find('.btn_memori_reset');
		v.btn_memori_reset .click(function() { reset() });
		resetMemoriBtn()
		
		initHover();
	}
	
	/* ! ---------- hover ---------- ---------- ---------- ---------- */
	
	function initHover() {
		view.hover(
			function(){
				hoverIn();
			},function(){
				hoverOut();
			}
		);
	}
			
	var tID;
	function hoverIn(){
		if(tID) clearTimeout(tID);
		view.addClass('hover') 
		GRID.StateRectsView.hoverIn();
	}
	function hoverOut(){	
		tID = setTimeout(function(){
			view.removeClass('hover') 
		},500);
		GRID.StateRectsView.hoverOut();
	}
			
	
	/* ! ---------- memori ---------- ---------- ---------- ---------- */
	
	function resetMemoriBtn() { v.btn_memori_save.addClass("disable"); }
	function activeMemoriBtn() { v.btn_memori_save.removeClass("disable"); }
	function save() {
		GRID.StateSetManager.save();
		resetMemoriBtn();
	}
	function reset() {
		GRID.StateSetManager.reset();
		changeMemoriNo(0);
		activeMemoriBtn();
	}
	
	function changeMemoriNo(_n) {
		current = GRID.StateSetManager.getState();
		update();
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	function createlayout() {}

	function update() {
		GRID.MainController.update();
	}

	function update_and_active() {
		activeMemoriBtn();
		GRID.MainController.update();
	}

	function updated() {
		
		v.current_s.text(current.scale + '%');
		v.current_w.text(current.widths.join(',') + 'px');
		v.current_h.text(current.height + 'px');
		v.current_m.text(current.margin + 'px');
		
		v.b_bg_col.css('background', current.background);
		v.b_col_col.css('background', current.color);

		v.b_misc_01.hide();
		v.b_misc_01_ng.hide();
		if (current.noBR) {
			v.b_misc_01_ng.show();
		} else {
			v.b_misc_01.show();
		}

		//
		v.b_misc_02.hide();
		v.b_misc_02_ng.hide();
		if (current.noTitle) {
			v.b_misc_02_ng.show();
		} else {
			v.b_misc_02.show();
		}
		
		$("#StateMemoriView .inner").width(current.scale*10);
		$("#StateMemoriView .inner span").html("1,000px ("+current.scale + "%)");
		
		GRID.StateRectsView.update()
	}

	/* ---------- ---------- ---------- */

	function setZoom(_abs, _n) {
		var n = getInputNumber(_abs, _n, current.scale);
		if (n == null) return;
		current.scale = setLimitNumber(n, [10, 100]);
		update_and_active();
	}

	function setW(_abs, _a) {
		var a;
		if (_abs == 'abs') {
			if (_a == null) {
				var p = prompt('', current.widths.join(','));
				a = p.split(',');
				for (var i = 0; i < a.length; i++) {
					if (isNaN(Number(a[i]))) return;
					a[i] = Number(a[i]);
				}
			} else {
				a = _a;
			}
		} else {
			a = current.widths;
			/*for (var i = 0; i < a.length ; i++) {
				a[i] += _a
			}*/
			a[0] += _a;
		}
		var ws = 0;
		for (var i = 0; i < a.length; i++) {
			a[i] = setLimitNumber(a[i], [100, 5000]);
			ws += a[i];
		}
		current.pagesW = ws;
		current.widths = a;
		update_and_active();
	}

	function setH(_abs, _n) {
		if (_abs == 'fit') {
			current.height = 'fit';
		} else if (_abs == 'abs') {
			var n = getInputNumber(_abs, _n, current.height);
			if (n == null) return;
			//current.pagesH = _n;
			current.height = n;
		} else {
			current.height += _n;
		}
		current.height = setLimitNumber(current.height, [100, 99999]);
		update_and_active();
	}

	function setMargin(_abs, _n) {
		var n = getInputNumber(_abs, _n, current.margin);
		//current.margin = setLimitNumber(n,[0,10]);
		current.margin = n;
		update_and_active();
	}

	function setBK(_s) {
		var s;
		if (_s == null) {
			s = prompt('', current.background);
			if (s == undefined) return;
		} else {
			s = _s;
		}
		current.background = s;
		update_and_active();
	}

	function setCol(_s) {
		var s;
		if (_s == null) {
			s = prompt('', current.color);
			if (s == undefined) return;
		} else {
			s = _s;
		}
		current.color = s;
		update_and_active();
	}

	function setScroll(_abs, _n) {
		var s;
		if (_n == null) {
			s = Number(prompt('', 0));
		} else {
			s = _n;
		}
		if (s == undefined) return;
		GRID.MainController.setScroll_grid(_abs, s);
	}

	function noBR() {
		current.noBR = (current.noBR) ? false : true;
		update_and_active();
	}

	function noTitle() {
		current.noTitle = (current.noTitle) ? false : true;
		update_and_active();
	}

	function setBK(_s) {
		var s;
		if (_s == null) {
			s = prompt('', current.background);
			if (s == undefined) return;
		} else {
			s = _s;
		}
		current.background = s;
		update_and_active();
	}

	function setCol(_s) {
		var s;
		if (_s == null) {
			s = prompt('', current.color);
			if (s == undefined) return;
		} else {
			s = _s;
		}
		current.color = s;
		update_and_active();
	}

	/* ! ----------  ---------- ---------- ---------- ---------- */

	function callCommand(_c, _a) {
		GRID.MainController.callCommand(_c, _a);
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;

	function stageInit() {
		view.hide();
	}

	function stageIn() {
		if (!isOpen) {
			isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}

	function stageOut() {
		if (isOpen) {
			isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		hoverIn: hoverIn,
		hoverOut: hoverOut,
		stageIn: stageIn,
		stageOut: stageOut,
		updated: updated,
		setW: setW,
		setH: setH,
		setZoom: setZoom,
		changeMemoriNo: changeMemoriNo

	};
})();



GRID.ScrollView = (function() {
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#ScrollView');
		stageInit();
		createlayout();
	}
	
	function createlayout(){
		v.b_all_sc_top = view.find('.b_all_sc_top');
		v.b_all_sc_m500 = view.find('.b_all_sc_m500');
		v.b_all_sc_m100 = view.find('.b_all_sc_m100');
		v.b_all_sc_100 = view.find('.b_all_sc_100');
		v.b_all_sc_500 = view.find('.b_all_sc_500');
		v.b_all_sc_bottom = view.find('.b_all_sc_bottom');
		
		v.b_all_sc_top		.click(function() { gridScrollTo_('abs', 0); });
		v.b_all_sc_m500		.click(function() { gridScrollTo_('rel', -500); });
		v.b_all_sc_m100		.click(function() { gridScrollTo_('rel', -100); });
		v.b_all_sc_100		.click(function() { gridScrollTo_('rel', 100); });
		v.b_all_sc_500		.click(function() { gridScrollTo_('rel', 500); });
		v.b_all_sc_bottom	.click(function() { gridScrollTo_('abs', 99999); });
		
		// v.b_page_sc_top = view.find('.b_page_sc_top');
		// v.b_page_sc_m500 = view.find('.b_page_sc_m500');
		// v.b_page_sc_m100 = view.find('.b_page_sc_m100');
		// v.b_page_sc_100 = view.find('.b_page_sc_100');
		// v.b_page_sc_500 = view.find('.b_page_sc_500');
		// v.b_page_sc_bottom = view.find('.b_page_sc_bottom');
		// //
		// v.b_page_sc_top		.click(function() { gridScrollTo_('abs', 0); });
		// v.b_page_sc_m500	.click(function() { gridScrollTo_('rel', -500); });
		// v.b_page_sc_m100	.click(function() { gridScrollTo_('rel', -100); });
		// v.b_page_sc_100		.click(function() { gridScrollTo_('rel', 100); });
		// v.b_page_sc_500		.click(function() { gridScrollTo_('rel', 500); });
		// v.b_page_sc_bottom	.click(function() { gridScrollTo_('abs', 99999); });
		
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */

	function scrollTo_(_abs, _n) {
		GRID.MainController.setScroll(_abs, _n);
	}

	function gridScrollTo_(_abs, _n) {
		GRID.MainController.setScroll_grid(_abs, _n);
	}

	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();



GRID.StateRectsView = (function(){
	
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $("#StateRectsView");
		var states = GRID.StateSetManager.getStateSet()
		var tag = "";
		for (var i = 0; i < states.length ; i++) {
			tag += '<div class="rect" data-id="'+i+'"></div>';
		}
		view.html(tag);
		
		v.rect = view.find(".rect")
		v.rect.click(function(){
			var id = Number($(this).data("id"))
			changeNo(id);
		});
		
		update();
		
		current = GRID.StateSetManager.getStateNo();
		v.rect.eq(current).addClass("current")
		
		initHover();
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function initHover() {
		view.hover(
			function(){
				hoverIn();
				//GRID.FloatPanelView.hoverIn();
			},function(){
				hoverOut();
				//GRID.FloatPanelView.hoverIn();
			}
		);
	}
			
	var tID;
	function hoverIn(){
		if(tID) clearTimeout(tID);
		view.addClass('hover') 
	}
	function hoverOut(){	
		tID = setTimeout(function(){
			view.removeClass('hover') 
		},500);
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	var Z = 25;
	function update(){
		var states = GRID.StateSetManager.getStateSet();
		var ww = 0;
		
		for (var i = 0; i < states.length ; i++) {
			
			var cr = states[i];
			var ws = cr.widths;
			var h = cr.height;
			
			var tag = "";
			for (var ii = 0; ii < ws.length ; ii++) {
				var cs = 'width:'+ (ws[ii]/Z) +'px;height:'+ (h/Z) +'px;'; 
				var hh = (cr.scale/100)*5;
				// console.log(hh);
				// 	cs +='border-top: '+hh+'px solid #fff;'
				tag += '<div class="item" style="'+ cs +'"></div>';
				ww += Number(ws[ii])/Z;
				ww += 5;
			}
				tag += '<div class="num">'+ws.join(",")+'px<br>'+cr.scale+'%<div>';
			var tar = v.rect.eq(i);
				tar.html(tag);
		}
		view.width(ww+20);
		
	}
	var current = 0
	function changeNo(_n){
		current = _n;
		GRID.StateSetManager.changeNo(_n);
		GRID.FloatPanelView.changeMemoriNo(_n);
		
		v.rect.removeClass("current")
		v.rect.eq(_n).addClass("current")
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;

	function stageInit() {
		view.hide();
	}

	function stageIn() {
		if (!isOpen) {
			isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}

	function stageOut() {
		if (isOpen) {
			isOpen = false;
			view.hide();
		}
	}
	return { init:init,
		hoverIn: hoverIn,
		hoverOut: hoverOut,
		stageIn: stageIn,
		stageOut: stageOut,
		update:update }
})();


GRID.SplitViewController = (function() {
	var view;
	var v = {};
	var _split;
	function init() {
		_split = GRID.StateCommon.split;
		view = $('#SplitViewController');
		stageInit();
		createlayout();
		setBtn();

		v.PreviewArea = $('#PreviewArea');
		v.MainArea	= $('#MainArea');
		v.HeaderView	= $('#HeaderView');
		v.PreviewViewHeader	= $('#PreviewViewHeader');
		v.PreviewViewHeaderTitle	= $('#PreviewViewHeader .title_url');
	}

	/* ---------- ---------- ---------- */

	function setBtn() {
	}

	function createlayout() {
	}

	function setDisplay(_b) {
		GRID.StateCommonManager.setDisplay(_b);
		if (_split.display == false) {
			GRID.StateCommonManager.setPreviewNo(0);
			GRID.StateCommonManager.setPreviewUrl("");
		}
		update();
	}
	function setW() {
		var p = prompt('', _split.widths.join(','));
		a = p.split(',');
		for (var i = 0; i < a.length; i++) {
			if (isNaN(Number(a[i]))) return;
			a[i] = Number(a[i]);
		}
		for (var i = 0; i < a.length; i++) {
			a[i] = setLimitNumber(a[i], [100, 5000]);
		}
		GRID.StateCommonManager.setWidths(a);
		update();
	}
	function setScale(_s) {
		var n = getInputNumber('abs', _s, _split.scale);
		GRID.StateCommonManager.setScale(setLimitNumber(n, [10, 100]));
		update();
	}
	function update() {

		GRID.StateSetManager.update();

		var b = _split.display;
		if (b) {
			v.PreviewArea.show();
			v.PreviewViewHeader.show(); 

			var ws = _split.widths.concat([]);

			var totalW = 0;
			for (var i = 0; i < ws.length; i++) {
				ws[i] = ws[i] * (_split.scale / 100);
				totalW += ws[i];
			}
			//w = setLimitNumber(w,[300,2000]);
			v.PreviewArea.width(totalW);
			GRID.PreviewView.setW(ws);

			v.PreviewViewHeader.width(totalW);
			v.PreviewViewHeaderTitle.width(totalW - 140);

			v.MainArea.css('left', totalW + 'px');
			v.HeaderView.css('left', totalW + 'px');
		} else {
			v.PreviewArea.hide();
			v.PreviewViewHeader.hide();
			v.MainArea.css('left', '0px');
			v.HeaderView.css('left', '0px');
		}
		GRID.PreviewView.update();
		GRID.PreviewViewHeader.update();
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		//view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			if (isFirst) {}
			isFirst = false;
			view.show();
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
			view.hide();
		}
	}

	return { init: init, stageIn: stageIn, stageOut: stageOut,
		setDisplay: setDisplay,
		setW: setW,
		setScale: setScale,
		update: update
	};
})();

GRID.PreviewView = (function() {
	var view;
	var v = {};
	
	function init() {
		view = $('#PreviewView');
		v.inner	= view.find('.inner');
		v.btns	= view.find('.btns');

		iframes = GRID.Data.iframes;
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {
	}

	function createlayout() {
	}

	var iframes;
	var iframeDoms = [];
	var urls = [];
	function openPage(_u) {
		var tag = '';
		if (! hasData(_u)) {
			urls.push(_u);
			var p = new GRID.PreviewViewPage(_u, v.inner);
			iframes.push(p);

		}
		showIFrame(_u);
	}
	function reload() {
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].reload();
		}
	}
	function showIFrame(_u) {
		for (var i = 0; i < iframes.length; i++) {
			if (iframes[i].url == _u) {
				iframes[i].stageIn();
			} else {
				iframes[i].stageOut();
			}
		}
	}
	function hasData(_s) {
		var b = false;
		for (var i = 0; i < urls.length; i++) {
			if (urls[i] == _s) b = true;
		}
		return b;
	}
	function setW(_w) {
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].setW(_w);
		}
	}

	function update() {
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].update();
		}
	}


	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
		view.hide();
		}
	}

	return { init: init, stageIn: stageIn, stageOut: stageOut,
		openPage: openPage,
		reload: reload,
		setW: setW,
		update: update
	};
})();

GRID.PreviewViewPage = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_u, _parentView) {
	  this.init(_u, _parentView);
	};
	var p = c.prototype;
	/* ---------- ---------- ---------- */

	p.view;
	p.parentView;
	p.v;
	p.url;
	p.pages;
	p.isCreated;
	p.isAccesable;//iframeにアクセス可能か

	p.init = function(_u, _parentView) {
		this.isCreated = false;
		this.parentView = _parentView;
		this.url = _u;
		this.v = {};
		this.iframeDoms = [];
		this.pages = [];

		this.isAccesable = URL_.isSameDomain(this.url, GRID.App.app.domain);

		var this_ = this;
		var id = 'f_'+ Math.round(Math.random() * 10000000);
		var tag = '';
			tag += '<div class="pageSet clearfix" id="set_' + id + '" ></div>';
		this.parentView.append(tag);
		this.view = $('#set_' + id);
		var ws = [1000];
		for (var ii = 0; ii < ws.length; ii++) {
			this.addPage(ii, ws[ii]);
		}
		this.stageInit();
	};

	p.iframeDoms;
	p.iframeURL;
	p.addPage = function(i, w) {
		this.isCreated = true;
		var this_ = this;
		var fID = 'f' + Math.round(Math.random() * 100000000);
		var temp = '';
			temp += '<div class="page">';
			temp += '<div class="iframeView"><iframe id="' + fID + '" src="{URL}" frameborder="0" ></iframe></div>';
			temp += '</div>';
			temp = temp.split('{URL}').join(this.url);
		this.view.append(temp);
		this.iframeDoms.push(document.getElementById(fID));
		this.v.iframeView = this.view.find('.iframeView');
		this.iframeURL = this.url;
	};
	p.updateW = function(_ws) {
		var r = this.iframeDoms.length;
		if (_ws.length > r) {
			for (var i = r; i < _ws.length; i++) {
				this.addPage(i, _ws[i]);
			}
		}
	};
	p.setW = function(_ws) {
		if (!this.isCreated) return;
		this.updateW(_ws);
		var pages = this.view.find('.page');
		for (var i = 0; i < _ws.length; i++) {
			pages.eq(i).width(_ws[i]);
		}
	};

	/* ---------- ---------- ---------- */
	p.reload = function() {
		if (!this.isAccesable)return;
		for (var i = 0; i < this.iframeDoms.length; i++) {
			this.iframeDoms[i].contentWindow.document.location.reload();
		}
	};
	/* ---------- ---------- ---------- */
	p.update = function() {
	};

	/* ---------- ---------- ---------- */
	p.isFirst = true;
	p.openFlg = false;
	p.stageInit = function() {
		this.openFlg = false;
		this.view.hide();
	};
	p.stageIn = function()  {
		if (! this.openFlg) { this.openFlg = true;
			this.view.show();
			if (! this.isFirst) {
			}
			this.isFirst = false;
		}
	};
	p.stageOut = function()  {
		if (this.openFlg) { this.openFlg = false;
			this.view.hide();
		}
	};
	return c;
})();

GRID.PreviewViewHeader = (function() {
	var view;
	var v = {};

	var current;
	function init() {
		current = GRID.StateCommon.split;
		view = $('#PreviewViewHeader');

		//stageInit();
		createlayout();
		setBtn();
	}

	/* ---------- ---------- ---------- */

	function setBtn() {}

	function createlayout() {
		v.title	= view.find('.title_url');

		v.btn_zoom	= view.find('.btn_zoom');
		v.btn_width	= view.find('.btn_width');
		v.btn_edit	= view.find('.btn_edit');
		v.btn_reload	= view.find('.btn_reload');
		v.btn_globe	= view.find('.btn_globe');
		v.btn_close	= view.find('.btn_close');
		v.btn_globe.click(function() { openURL() });
		v.btn_zoom.click(function() { setScale() });
		v.btn_width.click(function() { setW() });
		v.btn_edit.click(function() { edit() });
		v.btn_reload.click(function() { reload() });

		v.btn_close.click(function() { setDisplay(false) });

		v.title.hover(
			function() {
				$(this).html(titleTexts.url_over);
			},function() {
				$(this).html(titleTexts.url_mini);
			}
		);
	}

	function openURL() {
		window.open(titleTexts.url);
	}
	function edit() {
		GRID.PreviewView.edit();
	}
	function reload() {
		GRID.PreviewView.reload();
	}
	function setDisplay(_b) {
		GRID.SplitViewController.setDisplay(_b);
	}
	function setW(_n) {
		GRID.SplitViewController.setW(_n);
	}
	function setScale(_s) {
		GRID.SplitViewController.setScale(_s);
	}

	function update() {
		var s = current.scale / 100;
		var sW = s;
		var sH = s;
		v.iframe	= $('#PreviewView iframe');
		var tar = v.iframe;
		tar.css('-webkit-transform', 'scale(' + sW + ',' + sH + ')');
		tar.css('-moz-transform', 'scale(' + sW + ',' + sH + ')');
		tar.css('-ms-transform', 'scale(' + sW + ',' + sH + ')');
		tar.css('transform', 'scale(' + sW + ',' + sH + ')');
		tar.css('width', 100 / sW + '%');
		tar.css('height', 100 / sW + '%');

	}

	var titleTexts = {};
	function openPreview() {
		function __aa(_s) {
			var u = GRID.App.baseUrls.url;
			if (u == '') return _s;
			return _s.split(u).join('<small>__BASE__URL__/</small>');
		}
		function __bb(_s) {
			var out = '';
			var protcolList = ['http://', 'https://', '//'];
			var url = _s.split('?');
			for (var i = 0; i < protcolList.length; i++) {
				var ss = protcolList[i];
				if (_s.substr(0, ss.length) == ss) {
					var cc = '';
					var a = url[0].split(ss)[1].split('/');
						out += ss;
					for (var ii = 0; ii < a.length; ii++) {
						out += cc + '/' + a[ii] + '<br>';
						cc += '　';
					}
				}
			}
			out = out.split('///').join('//');
			if (url.length > 1) {
				var param = url[1];
				var s = '';
				out += '<br><br>?';
				var grid = [];
				var line = param.split('&');
				for (var i = 0; i < line.length; i++) {
					grid.push(line[i].split('='));
				}
				out += GPCommon.arrayToTable(grid);
			}

			return out;
		}

		var _u = GRID.StateCommon.preview.url;
		titleTexts.url = _u;
		titleTexts.url_mini = __aa(_u);
		titleTexts.url_over = __bb(_u);
		v.title.html(titleTexts.url_mini);
		GRID.PreviewView.openPage(_u);
		setDisplay(true);
	}

	/* ---------- ---------- ---------- */

	var isOpen = false;
	var isFirst = true;
	function stageInit() {
		view.hide();
	}
	function stageIn() {
		if (! isOpen) { isOpen = true;
			view.show();
			if (isFirst) {}
			isFirst = false;
		}
	}
	function stageOut() {
		if (isOpen) { isOpen = false;
		view.hide();
		}
	}

	return { init: init, stageIn: stageIn, stageOut: stageOut,
		openPreview: openPreview,
		update: update
	};
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

