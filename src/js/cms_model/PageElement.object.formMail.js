
PageElement.object.formMail = (function(){ 
    var _ = new PageModel.Object_();
    
	/* ---------- ---------- ---------- */
	
    _.pageInfo = new PageModel.Object_Info({ 
		id 		: "object.formMail", 
		name	: "メールフォーム",
		name2	: "＜FORM＞",
		guide	: "block/object.formMail",
		inputs	: ["CLASS","CSS","DETAIL"],
		// cssDef	: {file:"block",key:"[ニュースリストブロック]"}
		cssDef	: {selector:".cms-form-mail"}
	});

	/* ---------- ---------- ---------- */
	
	var _FORM_ = {}
		_FORM_.html		= "html";
		_FORM_.embed	= "embed";
		_FORM_.checkbox = "checkbox";
		_FORM_.radio	= "radio";
		_FORM_.select	= "select";
		_FORM_.text		= "text";
		_FORM_.number	= "number";
		_FORM_.email	= "email";
		_FORM_.url		= "url";
		_FORM_.textarea = "textarea";
		_FORM_.name		= "name";
		_FORM_.kana		= "kana";
		_FORM_.address	= "address";
		_FORM_.tel		= "tel";
		
	var formTypes = [
		[_FORM_.html	,"表示：見出し" ,"0"],
		[_FORM_.embed	,"表示：ブロック埋込み" ,"0"],
		[_FORM_.checkbox ,"入力：チェックボックス","0"],
		[_FORM_.radio	,"入力：ラジオボタン","0"],
		[_FORM_.select	,"入力：セレクトボックス","0"],
		[_FORM_.text	,"入力：1行入力（テキスト）","1"],
		[_FORM_.number	,"入力：1行入力（数値）","0"],
		[_FORM_.email	,"入力：1行入力（メールアドレス）","0"],
		[_FORM_.url		,"入力：1行入力（URL）","0"],
		[_FORM_.textarea ,"入力：複数行入力","0"],
		[_FORM_.name	,"入力：定型入力（氏,名）","0"],
		[_FORM_.kana	,"入力：定型入力（シ,メイ）","0"],
		[_FORM_.address ,"入力：定型入力（住所）","0"],
		[_FORM_.tel		,"入力：定型入力（電話番号）","0"]
	]

	_.grids = [
		
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "setting",
				name	: "設定",
				note 	: "※注意：メールフォームブロックは、1ページに複数設置することはできません。"
			}),
			textData:{
				info: new PageModel.OG_SubInfo({
					name: "",
					note: ""
				}),
				cells:[
					new PageModel.OG_Cell({
						id:"php",
						name:"送信プログラムパス",
						type:CELL_TYPE.SINGLE , 
						style:SS.w200
					}),
					new PageModel.OG_Cell( {
						id:"mail",
						name:"送信先メール",
						type:CELL_TYPE.SINGLE , 
						style:SS.w200,
						note:(function(){
							var s = ""
								s += '問い合わせメールが送信されるメールアドレスを入力してください。'
								return s;
						})()
					}),
					new PageModel.OG_Cell( {
						id:"last_midashi",
						name:"完了画面タイトル",
						type:CELL_TYPE.SINGLE , 
						style:SS.w400
					}),
					new PageModel.OG_Cell( {
						id:"last_read",
						name:"完了画面リード",
						type:CELL_TYPE.SINGLE , 
						style:SS.w400
					})
				]
			},
			gridData:null
		}),
		
		/* ---------- ---------- ---------- */
		new PageModel.Object_Grid({
			gridType:Dic.GridType.BASE,
			gridInfo:new PageModel.OG_info({ 
				id		: "forms",
				name	: "入力一覧",
				sub 	: (function(){ 
					var s = "";
						s += '<b>■選択肢リストについて</b><br>';
						s += '選択肢リストは、以下の入力タイプにおいて有効な値です。<br>';
						s += '<div class="_box">';
						s += '- チェックボックス&lt;input type="checkbox"&gt;<br>';
						s += '- ラジオボタン&lt;input type="radio"&gt;<br>';
						s += '- セレクトボックス&lt;select&gt;<br>';
						s += '</div>';
						s += '選択肢リストは複数行を入力すると、そのまま選択肢となります。<br>';
						s += '初期状態でチェック済み、選択済みとする場合は、先頭に*を入力してください。<br>';
						s += '<div class="_box">';
						s += '	入力例：<br>';
						s += '	りんご<br>';
						s += '	*みかん<br>';
						s += '	いちご<br>';
						s += '	ばなな<br>';
						s += '	ぶどう<br>';
						s += '</div>';
						
						s += '<b>■ブロック埋込について</b><br>';
						s += 'HTML埋込みは、ページ内のブロックを埋め込めます。<br>'
						s += '例えば、文書ブロックで、個人情報規約などを入力し、ブロックID ( 例：id=kiyaku ) を割り振ります。<br>';
						s += 'その後、HTML埋込みの選択肢リストで、そのブロックID ( 例：#kiyaku ) を入力してください。';
					return s;
				})()
			}),

			textData:null,
			gridData:{
				info:new PageModel.OG_SubInfo({}),
				cells:[
					new PageModel.OG_Cell({
						id: "label",
						name: "ラベル名",
						type: CELL_TYPE.SINGLE,
						style: "",
						view: "",
						def: "ラベル名"
					}),
					new PageModel.OG_Cell({
						id: "type",
						name: "入力タイプ",
						type: CELL_TYPE.SELECT,
						vals: formTypes,
						view: "",
						def: "text"
					}),
					new PageModel.OG_Cell({
						id: "req",
						name: "必須入力",
						type: CELL_TYPE.CHECK,
						view: "",
						def: ""
					}),
					new PageModel.OG_Cell({
						id: "sels",
						name: "選択肢リスト<br>チェックラジオや<br>セレクトボックス用",
						type: CELL_TYPE.MULTI,
						style: "",
						view: "",
						def: ""
					}),
					new PageModel.OG_Cell({
						id: "note",
						name: "ノート<br>入力フォームの下に表示",
						type: CELL_TYPE.MULTI,
						style: "",
						view: "",
						def: ""
					})
				]
			}
		})


		/* ---------- ---------- ---------- */
	]
	_.getInitData = function(){
		var o = {};
		o.type = _.pageInfo.id;
		var def = {
			setting: {
				texts: {
					mail: "sample@example.com",
					php: "html/php/mail.php",
					last_midashi: "ありがとうございました",
					last_read: "近日中に返答いたします"
				},
				grid: []
			},
			forms: {
				texts: {},
				grid: [
					{
						publicData: "1",
						label: "問い合わせ",
						type: _FORM_.html
					},
					{
						publicData: "1",
						label: "ご用件",
						type: _FORM_.checkbox,
						req: "",
						sels: "サービスについて\n製品について\n採用について\nそのほか"
					},
					{
						publicData: "1",
						label: "お問い合わせ内容",
						type: _FORM_.textarea,
						req: "1"
					},
					{
						publicData: "1",
						label: "登録者情報",
						type: _FORM_.html
					},
					{
						publicData: "1",
						label: "貴社名",
						type: _FORM_.text,
						req: "",
						note: "※法人の方は、入力してください。"
					},
					{
						publicData: "1",
						label: "お名前",
						type: _FORM_.text,
						req: "1"
					},
					{
						publicData: "1",
						label: "メールアドレス",
						type: _FORM_.email,
						req: "1"
					},
					{
						publicData: "1",
						label: "住所",
						type: _FORM_.address
					},
					{
						publicData: "1",
						label: "電話番号",
						type: _FORM_.tel
					}
				]
			}
		}
		o.data = def;
		o.attr = {css:"default"};
		o.attr.class = o.attr.css;
		return o;
	}
	_.getPreview = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		var tag = ""
		
		attr = attr.split('class="').join('class="cms-news ');
		var list = CMS_U.getPublicList(data.forms.grid);
		if(data == undefined  || data.length == 0 ){
			tag += '<span class="_no-input-data">データを入力...</span>'
		} else{
			var table = "";
				table += '<table class="_simpleTable">'
				table += '<tr><th>ラベル名</th><th>入力タイプ</th><th>必須入力</th><th>選択肢</th><th>ノート</th></tr>'
			var a = []
			for (var n = 0; n < list.length ; n++) {
				var t = '		{ "type":"{TYPE}","label":"{NAME}","id":"input_{TYPE}_{N}", "req": "{REQ}" }'
				a.push(_template(t,list[n],n+1));
				var tr = '		<tr><td style="padding-left:1em">{NAME}</td><td>{TYPE}</td><td>{REQ_S}</td><td>{SELS_S}</td><td>{NOTE}</td></tr>'
				if(list[n].type == _FORM_.html){
					tr = '		<tr><td colspan="5">■{NAME}</td></tr>'
				}
				table += _template(tr,list[n],n+1);
			}
				table += '</table>'
			var mail = (data.setting.texts.mail);
			window.formMailCode = [mail, a.join(",\n")];
			tag += '<div class="_cms_preview">'
			tag += '<div class="_title">ガジェット / フォームメール</div>';
			tag += '<div class="_notes">'
			tag += '※この要素の表示は、プレビューページか、公開サイトで確認してください。<br>';
			tag += '※動作にはPHP4.2以上が必要です。お使いのサーバーのPHPバージョンは'+CMS_ServerStatus.version+'です。</div>';
			tag += table;
			tag += '<div class="_title">送信側プログラム</div>'
			tag += 'フォームメールには送信側のプログラムが必要です。<br>'
			tag += '以下のコードを、サイト設定の<b>php/mail.php</b>へコピーしてください。<br>'
			tag += '<textarea onfocus="javascript:window.openFormMailCode()" style="width:100%;height:80px;margin:10px 0;background:#ffc;color:blue;font-size:18px;">'
			tag += 'クリックして、PHPコードをコピー...'
			tag += '</textarea>';
			tag += '設定を変更した時は、変更毎にPHPコードを再設定する必要があります。';
			tag += '</div>';
		}
		return tag;
	}
	
	_.getHTML = function(_o){
		var data  = _o.data;
		var attr = _o.attrs;
		attr = attr.split('class="').join('class="cms-form-mail clearfix ')
		var list = CMS_U.getPublicList(data.forms.grid);
		if(list.length == 0) return "";
		var tag = "";
			var a = [];
			for (var n = 0; n < list.length ; n++) {
				var t = '		{ "type":"{TYPE}","label":"{NAME}","id":"input_{TYPE}_{N}", {SELS} "req": "{REQ}","note":"{NOTE}" }'
				a.push(_template(t,list[n],n+1));
			}
			var s = "";
				s += '<div '+ attr+'>\n';
				s += '<textarea style="display:none;">\n';
				s += '{\n';
				s += '	"php":"{PHP}",\n';
				s += '	"lastTexts":["{LAST_MDISHI}","{LAST_READ}"],\n';
				s += '	"forms":[\n';
				s += '{FORMS}\n';
				s += '	]\n';
				s += '}\n';
				s += '</textarea>\n';
				s += '</div>\n';
				s = s.split("{PHP}").join('{{SITE_DIR}}' + data.setting.texts.php);
				s = s.split("{LAST_MDISHI}").join(data.setting.texts.last_midashi);
				s = s.split("{LAST_READ}").join(data.setting.texts.last_read);
				s = s.split("{FORMS}").join(a.join(",\n"));
				//
				s += '<script>\n'
				s += '$(function(){\n';
				s += '	$(".cms-form-mail").cms_mailForm();\n';
				s += '});'
				s += '</script>\n'
			tag += s;
			
			//
 		return tag;
	}
	
	/* ---------- ---------- ---------- */
	
	function _template(t,param,n){
		t = t.split("{N}").join(n);
		t = t.split("{NAME}").join((param.label)?param.label:"");
		t = t.split("{TYPE}").join(param.type);
		t = t.split("{REQ_S}").join((param.req =="1") ? "●":"-");
		t = t.split("{REQ}").join((param.req =="1") ? param.req:"");
		t = t.split("{NOTE}").join((param.note)?param.note:"");
		t = t.split("{SELS_S}").join((param.sels)?param.sels.split("\n").join("<br>"):"");
		var b = false
		if(param.type == _FORM_.checkbox)b =true;
		if(param.type == _FORM_.radio)b =true;
		if(param.type == _FORM_.select)b =true;
		if(param.type == _FORM_.embed)b =true;
		if(b){
			var _sel = param.sels.split("\n")
			var sel = [];
			for (var i = 0; i <  _sel.length ; i++) {
				if(_sel[i]) sel.push(_sel[i]);
			}
			t = t.split("{SELS}").join('"sels":"' + sel.join(",") + '",');
		} else{
			t = t.split("{SELS}").join("");
		}
		return t;
	}
	window.openFormMailCode = function(){
		var s = window.formMailCode;
		Editer_CodeCopyView.stageIn("formMail",s,function(){});
	}
	
	/* ---------- ---------- ---------- */

    return _;
})();
