
var EmbedTagListView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#EmbedTagListView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(EmbedTagListView,view);
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("embedtag/","_BASE_")+'</div>'
			tag += '<div class="_title">{{埋込みタグ}}</div>'
			tag += '<div class="_tabs">'
			tag += '	<div class="_tab _tab_my">Myタグ一覧</div>'
			tag += '	<div class="_tab _tab_page">ページタグ一覧</div>'
			tag += '	<div class="_tab _tab_file">ファイル埋込み</div>'
			tag += '</div>'
		v.header.html(tag);
		
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		view.find("._cms_btn_alpha").click(function(){ 
			var type = $(this).attr("data");
			callback(type);
			stageOut();
		});
		
			tag = ""
			tag += '<div class="_area _area_my">_area_my</div>'
			tag += '<div class="_area _area_page">_area_page</div>'
			tag += '<div class="_area _area_file">_area_file</div>'
		v.body.html(tag); 
		
		v.tabs 		= v.header.find("._tab");
		v.tab = {}
		v.tab.my 	= v.header.find("._tab_my");
		v.tab.page 	= v.header.find("._tab_page");
		v.tab.file 	= v.header.find("._tab_file");
		
		v.tab.my.click(function(){ openTab("my")});
		v.tab.page.click(function(){ openTab("page")});
		v.tab.file.click(function(){ openTab("file")});
		
		v.areas 	= v.body.find("._area");
		v.area = {}
		v.area.my 	= v.body.find("._area_my");
		v.area.page = v.body.find("._area_page");
		v.area.file = v.body.find("._area_file");
		v.areas.hide();
		
		setBtn();
		
	}
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.on('click','._rep_id',function(){
			selectTag($(this).text());
		});
	}
	
	/* ---------- ---------- ---------- */
	//
	function openTab(_type){
		if(!_type)_type = "my";
		v.tabs.removeClass("_active");
		v.tab[_type].addClass("_active");
		
		v.areas.hide();
		v.area[_type].show()
		if(_type == "my") update_my();
		if(_type == "page") update_page();
		if(_type == "file") update_file();
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	function update(_type){
		openTab(_type);
	}
	
	/* ---------- ---------- ---------- */
	//my
	function update_my(){
		var tag = ""
		tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("embedtag/page","_BASE_")+'</div>'
		tag +='<br style="clear:both;">'
		tag +='<div class="_read" style="clear:both;">{{Myタグ設定}}ページで定義したMyタグの一覧です。タグ名をクリックすると、タグを取得できます。</div>'
	
		var locals = CMS_Data.MyTagReplace.getLocalMyTagList();
		tag += '<div class="_tag_h2">ローカル (このページのみで利用可能)</div>'
		if(locals){
			tag += '<div class="_tag_title"><i class="fa fa-cog"></i> このページのMyタグ</div>'
			tag += _createMyTable(locals);
		} else{
			tag += '<div>このページでは、ローカルなMyタグの定義はありません。</div>'
		}
			tag += '<br><br>'
		var gloup = CMS_Data.MyTag.getData();
		tag += '<div class="_tag_h2">グローバル (サイト全体で利用可能)</div>'
		for (var n in gloup){
			var pm = CMS_Data.MyTag.getParam_by_ID(n);
			if(pm){
				tag += '<div class="_tag_title"><i class="fa fa-cog"></i> ' + pm.name + '</div>'
			}
			tag += _createMyTable(gloup[n]);
		}
		v.area.my.html(tag);
	}
	function _createMyTable(_keys){
		var tag = ""
		tag +="<table>"
		for (var i = 0; i < _keys.length ; i++) {
			tag += '<tr>'
			tag += '<th>'
			tag += '	<span class="_rep_id">{{' + _keys[i].id + '}}</span>'
			tag += '</th> ';
			tag += '<td>'
			tag += '	<span class="_note">'+_keys[i].label+'</span>'
			tag += '</td> ';
			tag += '</tr>'
		}
		tag +="</table>"
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	var isFirstPage = true;
	function update_page(){
		if(!isFirstPage)return;
		isFirstPage = false;
		//
		var tag = "";
		tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("embedtag/my","_BASE_")+'</div>'
		tag +='<br style="clear:both;">'
		tag +='<div class="_read">ページタグは、CMSに用意されているタグです。ページに関する情報を出力します。タグ自体のカスタマイズはできません。</div>'
		var gloup = CMS_Data.PageTag.getData();
		for (var i = 0; i <  gloup.length ; i++) {
			tag += '<div class="_tag_title">' + gloup[i].label + '</div>'
			tag += _createPageTable(gloup[i].items);
		}
		v.area.page.html(tag);
	}
	function _createPageTable(_keys){
		var tag = ""
		tag +="<table>"
		for (var i = 0; i < _keys.length ; i++) {
			tag += '<tr>'
			tag += '<th>'
			tag += '	<span class="_rep_id">{{' + _keys[i].id + '}}</span>'
			tag += '</th> ';
			tag += '<td>'
			tag += '	<div class="_val">例：<span>'+_keys[i].text+'</span></div>'
			tag += '	<div class="_note">'+_keys[i].label+'</div>'
			tag += '</td> ';
			tag += '</tr>'
		}
		tag +="</table>"
		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	function update_file(){
		var tag = ""
			tag += '<div class="_guide">'+CMS_GuideU.getGuideTag("embedtag/file","_BASE_")+'</div>'
			tag +='<br style="clear:both;">'
			tag += '<div class="_read">ファイル埋込みは、外部HTMLやテキストファイルを埋込みます。主にテンプレHTMLの分割に用います。</div>';
			tag += '<div class="_note">※ シンプルなテンプレHTMLの構成であれば、分割する必要はありません。</div>';
			
			tag += '<div class="_tag_title">表記</div>';
			tag += '<div class="_read">';
			tag += 'ファイル埋込みを利用するには、以下の表記でタグを記載します。<br>';
			tag += '</div>';
				tag += '<div class="_sample">';
				tag += '<b>{{FILE:ファイルパス}}</b>';
				tag += '</div>';
				
			tag += '<div class="_read">';
			tag += 'ページ公開時に、ファイルパスのファイルをロードし埋込みます。<br>';
			tag += 'ロードするファイルでは、<mark>ページタグや、Myタグも利用</mark>できます。<br>';
			tag += '</div>';
			
			tag += '<div class="_tag_title">基本的な用途...テンプレHTMLでの利用</div>';
			tag += '<div class="_read">';
			tag += 'htmlディレクトリ/_template/parts/に配置したファイルを、<br>';
			tag += 'テンプレートHTML内に埋込むには、以下のように記述します。';
			tag += '</div>';
			
				tag += '<div class="_sample">';
				tag += '//例：header.html<br>';
				tag += '{{FILE:parts/header.html}}<br>';
				tag += '</div>';
			tag += '<div class="_note">※ 相対パスで記述する場合は、_template/ディレクトリからのパスになります。</div>';
			
			tag += '<div class="_tag_title">別のディレクトリのファイルの埋込</div>';
			tag += '<div class="_read">';
			tag += 'CMSのサイトルートからの絶対パスを記述してください。<br>';
				tag += '<div class="_sample">';
				tag += '//例：サイトルート以下の/aa/bb/cc.txt<br>';
				tag += '{{FILE:/aa/bb/cc.html}}<br>';
				tag += '</div>';
			
			
			tag += '<div class="_tag_title">テンプレHTML以外での利用</div>';
			tag += '<div class="_read">';
			tag += '通常のブロック内にも埋め込むことが出来ます。<br>';
			tag += '普通に{{FILE:ファイルパス}}を記載してください。<br>';
			tag += '<br>';
			tag += 'Myタグでも同じようなことができますが、<br>';
			tag += 'ブロックを共有する場合はMyタグを利用し、大きめのHTMLコードなどを<br>';
			tag += '共有する場合は、ファイル埋め込みを利用するのがおすすめです。<br>';
			tag += '<br>';
			tag += '別のシステムで生成したHTMLをロードする場合などに利用できます。<br>';
			tag += '</div>';
		v.area.file.html(tag);
	}
	
	/* ---------- ---------- ---------- */

	function selectTag(_s){
		if(cb){
			if(cb == 1){
				UpdateDelay.delay(function(){
					$("#SubPageView ._editableNode").eq(0).val(_s).keyup()
				});
			} else{
				cb(_s);
			}
			stageOut();
		} else{
	 		CMS_CopyView.stageIn(_s);
		}
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	// var cb = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_type,_cb){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				createlayout();
			}
			cb = _cb;
			update(_type);
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

if(window["_cms"] ==undefined) window._cms = {};
window._cms.openEmbedList = function(_type,_cb){
	EmbedTagListView.stageIn(_type,_cb);
}
// setTimeout(function(){
// 	window._cms.openEmbedList()
// },1000);

