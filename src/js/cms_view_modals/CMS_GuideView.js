
var CMS_GuideView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#CMS_GuideView');
		stageInit();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(_callback){
		CMS_GuideU.loadInit(function(){
			createlayout_core(_callback)
		});
	}
	function createlayout_core(_callback){
		var tag = "";
			tag += '<div class="_btn_close"></div>';
			tag += '<div class="_btn_zoom"><i class="fa fa-external-link-square "></i>  別ウィンドウで表示</div>'
			tag += '<div class="_title _dragBarArea">CMS 利用ガイド</div>'
			tag += '<div class="_navi guide-scroll"><div class="_inner"></div></div>'
			tag += '<div class="_body guide-scroll">'
			tag += '	<div class="_inner">'
			tag += '		<div class="_h1"></div>'
			tag += '		<div class="_text"></div>'
			tag += '	</div>';
			tag += '</div>';
		view.html(tag)
	
		v._btn_close = view.find('._btn_close');
		v.dragBarArea = view.find('._dragBarArea');
		v.h1	 = view.find('._h1');
		v.inner	 = view.find('._body ._inner');
		v.text	 = view.find('._text');
		v.navi	 = view.find('._navi ._inner');
		v._btn_zoom = view.find('._btn_zoom');
		
		v._btn_close.click(function(){stageOut();})
		v._btn_zoom.click(function(){openEx()})
		//
		try{
			view.draggable({handle: view.find('._dragBarArea')});
		}catch( e ){}
		_callback();
	}
	
	function setBtn(){
		$("body").on("click","._btn_guide_block",function(event){
			CMS_GuideU.openGuide($(this).data("id"))
			// stageIn(id);
			event.stopPropagation();
			event.preventDefault();
		})
		view.on("click","a",function(event){
			var type = $(this).data("type");
			if(type == "guide"){
				var href = $(this).attr("href");
				innerMove(href);
				event.stopPropagation();
				event.preventDefault();
			}
			if(type == "cms_link"){
				openInner($(this).attr("href"))
				event.stopPropagation();
				event.preventDefault();
			}
		})
		view.on("click","._btn_back",function(event){
			historyBack()
		})
		view.on("click","._h2-toggle",function(){
			if($(this).data("state")){
				$(this).next().slideUp()
				$(this).data("state","")
				$(this).removeClass("_open")
				$(this).find("span").html('<i class="fa fa-caret-down "></i>')
			} else {
				$(this).next().slideDown()
				$(this).data("state","1")
				$(this).addClass("_open")
				$(this).find("span").html('<i class="fa fa-caret-up "></i>')
			}
		});
	}
	
	function openInner (_s){
		if(GUIDE_STANDALONE){
			window.open("../index.html#"+_s);
		} else{
			CMS_MainController.openPage_by_hash(_s);
		}
	}
	
	/* ---------- ---------- ---------- */

	function setXML(_xml){
		v.text.html("");
		var nodes = _xml.find("item");
			update_core("",nodes.eq(0));
	}
	
	/* ---------- ---------- ---------- */
	//
	function getUID(_dir,_page){
		return "_guide_" + _dir + '__SP__' + _page.split(".").join("_CC_");
	}
	
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//ナビ
	function initNavi(){
		var tag = ""
			var xml = CMS_GuideU.getXML();
			var gl = $(xml).find("gloup");
			gl.each(function(){
				if($(this).attr("type") == "rootext"){
					tag += $(this).text();
				} else{
					tag += getGloupHTML($(this))
				}
		})
		v.navi.html(tag);
		v.naviItems = v.navi.find("a");
	}
	function getGloupHTML(_gloup){
		var tag = ""
		var id = _gloup.attr("id");
			
			var h2 = (function(_s){
				if(_s)return '<div class="_h2">' + _s + '</div>';
				return ""
			})(_gloup.attr("name"));
			
			if(h2){
				var dd = "_h2_" + id;
				tag += '<div class="_h2-toggle '+dd+'"><span class="icon"><i class="fa fa-caret-down "></i></span>';
				tag += h2
				tag += '</div>'
			}
			
			if(h2) tag += '<div class="_toggle-body">';
			tag += '<ul>';
			var items = _gloup.find("> item");
			items.each(function(){
				var item = $(this);
				var _id = item.attr("id");
				var nn = (function(_node){ 
					var _s = _node.find("name").text()
					var _s2 = _node.find("navi").text()
					if(_s2) _s = _s2;
					if(_s.indexOf("--") != -1){
						var a = _s.split("--");
						return a[1];
					} else{
						return _s;
					}
    			})(item);
				if(_id == ""){
					tag += '</ul><div class="_h4">' + item.attr("name") + '</div><ul>';
				} else{
					if(nn){
						var s = id + '/' + _id;
						var sid = getUID(id,_id)
						tag += '<li><a href="' + s + '" id="' + sid + '" data-type="guide">' + nn + '</a></li>';
					}
				}
			})
			tag += '</ul>';
			if(h2)tag += '</div>';
		return tag;
	}
	
	/* ---------- ---------- ---------- */

	function updateDirOpen(_id){
		var param = CMS_GuideU.getData(_id);
		var tar = v.navi.find("._h2_" + param.dir.id);
		if(tar.data("state") != "1"){
			tar.click();
		}
	}
	
	/* ---------- ---------- ---------- */

	function update(_id){
		if(_id =="") _id = "index/index"
		addHistory(_id);
		var param = CMS_GuideU.getData(_id);
		if(param.page == null) {
			v.h1.html("");
			// v.video.html("").hide();
			v.text.html("原稿、未作成です");
		} else{
			update_core(_id, param.page, param.dir);
		}
		v.naviItems.removeClass("_current");
		var aa = _id.split("/");
		v.navi.find("#"+getUID(aa[0],aa[1])).addClass("_current");
		
		updateDirOpen(_id);
	}
	
	function update_core(_id, param, _dir){
		setTitle(_id,param.find("name").text() ,_dir );
		var idText = '<div style="font-size:10px;color:#888;margin:3em 0 1em 0;">ガイドID：' + _id + '</div>';
		
		var bodyParam = {
			text: param.find("text").text() + idText,
			useToggle: (param.attr("useToggle") =="1") ? true : false
		}
		
		v.text.html("");
		setTimeout(function(){
			v.text.html( CMS_GuideU.getBodyTag(bodyParam));
		},100);
		
	}
	function setTitle(_id,_s,_d){
		var _s = (function(_s){ 
			if(_s.indexOf("--") != -1){
				var a = _s.split("--");
				return '<span style="font-size:12px;">' + a[0] + "</span> "+a[1];
			} else {
				return _s;
			}
		})(_s);
		var d = "";
		if(_d) d = '<span class="_gloup">' + _d.name + ' </span>';
		_s = d + _s;
		v.h1.html(setHistoryBtn() + _s);
	}
	var isInitPos = true;
	function setRect(){
		if(GUIDE_STANDALONE)return;
		if(isInitPos){
			var a = [800,700];
			var w = $('body').width();
			var h = $('body').height();
			if(!isMove){
				view.css("left",(w - a[0])/2);
				view.css("top",(h - a[1])/2);
			}
		}
		isInitPos = false;
	}
	
	/* ---------- ---------- ---------- */
	
	var history = [];
	var currentID = ""
	function addHistory(_id){
		if(window["GUIDE_DEV"]) return;
			
		if(isHistoryMove == false) history.push(_id);
		isHistoryMove = false;
		
		if(GUIDE_STANDALONE){
		location.hash = _id;
		}
		currentID = _id;
	}
	var isHistoryMove = false;
	function historyBack(){
		var id = history[history.length-2];
		history.pop()
		isHistoryMove = true;
		isMove = true;
		update(id);
	}
	function setHistoryBtn(){
		if(history.length == 1){
			return ""
		} else {
			return '<span class="_btn_back"><i class="fa fa-chevron-circle-left "></i> 戻る </span>'
		}
	}
	function innerMove(_id){
		isMove = true;
		update(_id);
	}
		
	function resetHistory(){
		// history = [];
	}
	
	/* ---------- ---------- ---------- */
	
	function openEx(){
		// window.open("./guide/index.html#" + currentID,"guide");
		window.open(GUIDE_URL + "#" + currentID, "guide");
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var isMove
	function stageIn(_id){
		isMove = false;
		stageOut();
		setTimeout(function(){
			stageIn_core(_id);
		},100);
	}
	function stageIn_core(_id){
		view.show();
		if(isFirst){
			createlayout(function(){
			initNavi();
			update(_id);
			});
			setRect();
			isFirst = false;
		} else{
			update(_id);
		}
	}
	function stageOut(){
		view.hide();
		resetHistory();
	}

	/* ---------- ---------- ---------- */
	
 return {
		init:init, 
		stageIn:stageIn, 
		stageOut:stageOut, 
	setXML:setXML
}
})();



