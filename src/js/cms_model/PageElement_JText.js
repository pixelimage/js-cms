
var PageElement_JText = {}

//デフォルト文字
PageElement_JText.P = "<b>サンプルのタイトル</b>\n文書が入ります。<b style=\"color:red\">赤文字や</b>、{{-}} <a href='http://www.yahoo.co.jp'>リンク</a> もはれます。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。\n<small>※注釈の文書が入ります。注釈の文書が入ります。</small>";

//タブコンテンツ作成時のデータ
PageElement_JText.tabListData01 = '{"type": "layout.div","attr": {"class": "p10","css": "p10","id": "tab03"},"data": [{"type": "tag.p","attr": {"css": "default"},"data": "タブ03.文書が入ります。"}]}'
PageElement_JText.tabListData02 = '{"type": "layout.div","attr": {"class": "p10","css": "p10","id": "tab02"},"data": [{"type": "tag.p","attr": {"css": "default"},"data": "タブ02.文書が入ります。"}]}'
PageElement_JText.tabListData03 = '{"type": "layout.div","attr": {"class": "p10","css": "p10","id": "tab01"},"data": [{"type": "tag.p","attr": {"css": "default"},"data": "タブ01.文書が入ります。"}]}'

//リセットボタンを押したときのデータ
PageElement_JText.resetJSON = (function(){ 
    var o = {
		head: {},
		body: {
			free: [{
				type: "layout.div",
				attr: {},
				data: [{
					type: "tag.heading",
					data: {
						heading: "h1",
						main: {
							"text": "{{PAGE_NAME}}"
						},
						right: {
							text: ""
						}
					},
					attr: {
						css: "default ",
						"class": "default "
					}
				}]
			}]
		}
	}
	return JSON.stringify(o);
})();

//テンプレートプレビュー時のデータ
PageElement_JText.templatePreviewPageData = '{"meta":{},"head":{},"body":{"free":[{"type":"layout.div","attr":{},"data":[{"type":"layout.h1","attr":{"class":"default","css":"default"},"data":"タイトル"},{"type":"tag.p","attr":{"class":"default","css":"default"},"data":"文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。"},{"type":"layout.h2","attr":{"class":"designD","css":"designD"},"data":"大見出し"},{"type":"tag.p","attr":{"class":"default","css":"default"},"data":"文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。"},{"type":"cols","attr":{"class":"free","css":"free"},"data":[{"type":"layout.div","attr":{},"data":[{"type":"layout.h3","attr":{"class":"designC","css":"designC"},"data":"中見出し"},{"type":"tag.p","attr":{"class":"default","css":"default"},"data":"文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。"}]},{"type":"layout.div","attr":{},"data":[{"type":"layout.h3","attr":{"class":"designC","css":"designC"},"data":"中見出し"},{"type":"tag.p","attr":{"class":"default","css":"default"},"data":"文書が入ります。文書が入ります。文書が入ります。文書が入ります。文書が入ります。"}]}]}]}]}}'

window.PageElement_JText = PageElement_JText;
