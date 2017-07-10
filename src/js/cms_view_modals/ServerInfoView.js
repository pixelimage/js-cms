
var ServerInfoView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#ServerInfoView');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(EmbedTagListView,view);
		var tag = ""
			tag += '<div class="_title">サーバー情報</div>'
		v.header.html(tag);
		
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		
		setBtn();
		
	}
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });

	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	
	
	function render(){
		var u = "storage.php?action=info";
		var tag = "";
			//
			tag += '<div class="_h2">PHP INFO</div>'
			tag += '<div class="_p"><iframe id="myFrame" class="" src ="'+u+'" ></iframe></div>'
			tag += '<div style="text-align:right;"><a href="'+u+'" target="_blank">別ウィンドウで見る <i class="fa fa-external-link-square "></i></a></div>'
			//
			tag += '<div class="_h2">その他</div>'
			if(window.IS_ESCAPE_WAF){
				tag += '<div class="_p _anno">'
				tag += '<b>WAF機能が有効です</b><br>'
				tag += 'このサーバーはWAF機能が有効のため、WAF機能を回避するモードで動作しています。<br>'
				tag += 'その場合、通常より保存・公開処理にかかる時間が少し増えます。<br>'
				tag += '</div>'
					
				tag += '<div class="_p"><b>WAF機能をOFF (無効) にするには</b><br>'
				tag += 'レンタルサーバーを利用であれば、各サーバー会社さまの管理画面より、WAF機能をOFFにしてください。<br>';
				tag += '( OFFにしても、反映されるまで5分〜1時間程度、時間がかかります )<br>';
				tag += '独自サーバーの場合は、サーバー管理者に相談してください。';
				tag += '</div>'
			} else{
				tag += '<div class="_p">とくにありません</div>'
			}
		v.body.html(tag);
	}
	
	/* ---------- ---------- ---------- */
	//表示・非表示処理
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				render()
			}
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
