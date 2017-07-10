
var TreeViewMakerView = (function(){
	var view;
	var v = {};

	var LEVEL_MAX = 5;
	var dirListView;
	var tagListView;
	var pageListView;
	
	var presetBtns = [
		["simple","ページ一覧"],
		["gnavi","グローバルナビ"],
		["gnavi_c","カスタムナビ"],
		["snavi","ローカルナビ"],
		["footer","フッターリンク"],
		["mobile","スマホメニュー"]
	]
	
	function init(){
		view = $('#TreeViewMakerView');
		
		dirListView = TreeViewMakerView_DirList;
		tagListView = TreeViewMakerView_TagList;
		pageListView = TreeViewMakerView_PageList;
		stageInit();
	}
	/* ---------- ---------- ---------- */
	 
	function createlayout(){
		v = ModalViewCreater.createBaseView(TreeViewMakerView,view);
		var tag = ""
			tag += '<div class="clearfix">';
			tag += '	<div class="_p _title">ナビゲーション編集 </div>'
			
			tag += '<div style="position:absolute;left:200px;top:15px;">' + CMS_GuideU.getGuideTag("window/navigation","_BASE_") + '</div>';
			tag += '	<div class="_dirSelectArea clearfix">';
			tag += '		<div class="_floatLeft "><b><i class="fa fa-sitemap "></i> ターゲットページ数：</b><span class="_matchPageCount">0</span> / <span class="_allPageCount">0</span></div>';

			tag += '		<div class="_floatLeft _selectSet clearfix">';
			tag += '			<div class="_targetDir">グループ：</div>';
			tag += '			<div class="_dirListArea">';
			tag += '				<div class="_dirListBtn"><i class="fa fa-folder "></i>  <i class="fa fa-caret-down "></i> </div>';
			tag += '				<div class="_dirListFuki _simple-scroll"></div>';
			tag += '			</div>';
			tag += '		</div>';
			tag += '		<div class="_floatLeft _selectSet clearfix">';
			tag += '			<div class="_targetTag">タグ : <b>選択なし</b></div>';
			tag += '			<div class="_tagListArea">';
			tag += '				<div class="_tagListBtn"><i class="fa fa-tags "></i>  <i class="fa fa-caret-down "></i> </div>';
			tag += '				<div class="_tagListFuki _simple-scroll"></div>';
			tag += '			</div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '</div>';
		v.header.html(tag);
		
			tag = "";
			tag += '<div class="_cms_btn _btn_close">キャンセル</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do" '+TIP_ENTER+'><i class="fa fa-check"></i> 編集完了</div> ';
		v.footer.html(tag);
		
		var tag = "";
			tag += '<div class="_previewArea">';
			tag += '	<div class="_pageSelectArea clearfix">';
			tag += '		<div class="_p _pageURL"></div>';
			tag += '		<div class="_pageListArea">';
			tag += '			<div class="_pageListBtn"><i class="fa fa-file-text "></i> プレビューページを選択 <i class="fa fa-caret-down "></i> </div>';
			tag += '			<div class="_pageListFuki _simple-scroll"></div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '	<div class="_p _previewViewTitle">プレビュー</div>';
			tag += '	<div class="_p _previewTextTitle">HTMLプレビュー</div>';
			tag += '	<div class="_inner _simple-scroll">';
			tag += '		<div class="_previewView _previewTreeView">';
			tag += '			<div class="_previewView_inner"></div>';
			tag += '		</div>';
			tag += '		<div class="_previewText">';
			tag += '			<textarea wrap="off" readonly ></textarea>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '</div>';
			//
			tag += '<div class="_editerArea">';
			tag += '<div class="_inner">';
			tag += '	<div class="_presets">';
			tag += '		<div class="_p"><b>プリセット</b> </div>';
			for (var i = 0; i <  presetBtns.length ; i++) {
				tag += '<div class="_cms_btn-mini _btn_preset preset" data-id="'+presetBtns[i][0]+'"><i class="fa fa-list "></i> '+presetBtns[i][1]+'</div> ';
			}
			tag += '	</div>';
			tag += '	<div class="_p _h3">■階層ごとのテンプレートタグ指定</div>';
			tag += '	<table class="_levelTable">';
			tag += '		<tr>';
			tag += '			<th>階層</th>';
			tag += '			<th>出力</th>';
			tag += '			<th><i class="fa fa-2x fa-folder "></i> グループ</th>';
			tag += '			<th><i class="fa fa-2x fa-file-text "></i> ページ</th>';
			tag += '			<th><i class="fa fa-2x fa-file-text "></i> 追加メニュー</th>';
			tag += '			<th><i class="fa fa-2x fa-font "></i> 見出し</th>';
			tag += '			<th>初期表示</th>';
			tag += '		</tr>';
			tag += '		<tr class="_level l1">';
			tag += '			<th class="_tree"><br>第1階層<br>│ </th>';
			tag += '			<td class="_pd"><input type="checkbox" class="_show" checked></td>';
			tag += '			<td><input type="text" class="_dir"></td>';
			tag += '			<td><input type="text" class="_page"></td>';
			tag += '			<td><input type="text" class="_add"></td>';
			tag += '			<td><input type="text" class="_html"></td>';
			tag += '			<td class="_pd"><input type="checkbox" class="_open" checked></td>';
			tag += '		</tr>';
			tag += '		<tr class="_level l2">';
			tag += '			<th class="_tree">│ <br>├ 第2<br>│ │</th>';
			tag += '			<td class="_pd"><input type="checkbox" class="_show" checked></td>';
			tag += '			<td><input type="text" class="_dir"></td>';
			tag += '			<td><input type="text" class="_page"></td>';
			tag += '			<td><input type="text" class="_add" style="display:none"></td>';
			tag += '			<td><input type="text" class="_html"></td>';
			tag += '			<td class="_pd"><input type="checkbox" class="_open" checked></td>';
			tag += '		</tr>';
			tag += '		<tr class="_level l3">';
			tag += '			<th class="_tree">│ │ <br>│ ├ 第3<br>│ │ │ </th>';
			tag += '			<td class="_pd"><input type="checkbox" class="_show" checked></td>';
			tag += '			<td><input type="text" class="_dir"></td>';
			tag += '			<td><input type="text" class="_page"></td>';
			tag += '			<td><input type="text" class="_add" style="display:none"></td>';
			tag += '			<td><input type="text" class="_html"></td>';
			tag += '			<td class="_pd"><input type="checkbox" class="_open" checked></td>';
			tag += '		</tr>';
			tag += '		<tr class="_level l4">';
			tag += '			<th class="_tree">│ │ │ <br>│ │ ├ 第4<br>│ │ │ │ </th>';
			tag += '			<td class="_pd"><input type="checkbox" class="_show" checked></td>';
			tag += '			<td><input type="text" class="_dir"></td>';
			tag += '			<td><input type="text" class="_page"></td>';
			tag += '			<td><input type="text" class="_add" style="display:none"></td>';
			tag += '			<td><input type="text" class="_html"></td>';
			tag += '			<td class="_pd"><input type="checkbox" class="_open" checked></td>';
			tag += '		</tr>';
			tag += '		<tr class="_level l5">';
			tag += '			<th class="_tree">│ │ │ │ <br>│ │ │ ├ 第5<br>│ │ │ │ │ </th>';
			tag += '			<td class="_pd"><input type="checkbox" class="_show" checked></td>';
			tag += '			<td><input type="text" class="_dir"></td>';
			tag += '			<td><input type="text" class="_page"></td>';
			tag += '			<td><input type="text" class="_add" style="display:none"></td>';
			tag += '			<td><input type="text" class="_html"></td>';
			tag += '			<td class="_pd"><input type="checkbox" class="_open" checked></td>';
			tag += '		</tr>';
			tag += '	</table>';
			
			tag += '	<div class="_p _h3">■第1階層 追加メニュー</div>';
			tag += '	<table class="">';
			tag += '		<tr>';
			tag += '			<td><div class="_cms_btn _btn_add">メニュー編集</div></td>';
			tag += '			<td><i class="fa fa-angle-right " style="margin:10px;"></i></td>';
			tag += '			<td><div class="_area_addMenu"></div></td>';
			tag += '		</tr>';
			tag += '	</table>';
			
			tag += '	<div class="_p _h3">■オプション</div>';
			tag += '	<table class="_optionTable">';
			tag += '		<tr><th><input type="checkbox" class="_setting _useToggle" ></th><td>開閉メニュー</td><td class="sm">トルグメニューを作成できます。グループノードに(+)(-)アイコンが追加されます。</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _onlyCurrent" ></th><td>現在のツリーだけ表示</td><td class="sm">サイドナビなど、特定のノード以下のみ表示。第1階層のみ</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _isFlat" ></th><td>フラットにする</td><td class="sm">グループの階層構造を解除してフラットなページ一覧に</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _hasDate" ></th><td>日付指定のあるページのみ</td><td class="sm">ページ設定で日付を設定しているページのみを表示します</td></tr>';
			tag += '		<tr><th></th><td><input type="checkbox" class="_setting _isReverse" > 日付の古い順に並べる</td><td class="sm">日付の古い順に並べます</td></tr>';
			tag += '	</table>';
			
			tag += '	<table class="_optionTable">';
			tag += '		<tr><td>表示ページ数制限</td><td><input type="number" class="_setting _limitSub" style="width:40px"></td><td class="sm">グループ内のページ数を制限することができます。<br>空欄の場合は、すべて表示されます。</td></tr>';
			tag += '	</table>';
			tag += '	<table class="_optionTable">';
			tag += '		<tr><td>字下げ</td><td><input type="number" class="_setting _indent" style="width:40px"></td><td class="sm">字下げするタブの数を入力できます。</td></tr>';
			tag += '	</table>';
			
			tag += '	<div class="_p _h3">■各ノードに設定されるクラス</div>';
			tag += '	<div class="_p _read">各ノードには、そのノードの情報がクラスとして設定され、自身でCSSをカスタマイズしたり、新規に記述することにより、自由にデザインすることができます。</div>';
			tag += '	<table class="_optionTable">';
			tag += '		<tr><th><input type="checkbox" class="_setting _clearfix" ></th><td>clearfix</td><td class="sm">clearfixが指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _current" ></th><td>_current</td><td class="sm">現在開いているページとノードが同じ場合に指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _ownCurrent" ></th><td>_ownCurrent</td><td class="sm">現在開いているページを含むノードの場合に指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _hasSub" ></th><td>_hasSub</td><td class="sm">サブノードを持ってる場合に指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _underconst" ></th><td>_underconst</td><td class="sm">工事中のノードに指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _type" ></th><td>_type-...</td><td class="sm">ノードの種別が指定されます<br>( _type-dir , _type-page , _type-html )</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _level" ></th><td>_level-...</td><td class="sm">現在の階層の深さが指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _no" ></th><td>_no-...</td><td class="sm">ノード番号が順が指定されます</td></tr>';
			tag += '		<tr><th><input type="checkbox" class="_setting _sum" ></th><td>_sum-...</td><td class="sm">サブノードの合計が指定されます</td></tr>';
			tag += '	</table>';
			tag += '	<br>'
			tag += '	<div class="_p _cms_btn _btn_direct_edit">設定データを直接編集する</div>'
			tag += '</div>';
			tag += '</div>';
		v.body.html(tag);
		
		v.previewArea = view.find('._previewArea')
		v.editerArea = view.find('._editerArea')

		initView();
		
		v.previewView = view.find("._previewView_inner");
		v.previewText = view.find("._previewText textarea");
		v.pageURL 	 = view.find("._pageURL");
		
		view.on("click","._previewView a",function(event){
			pageListView.select_by_href($(this).attr("href"));
			event.stopPropagation();
			event.preventDefault();
		})
		
		v.levelInput = view.find("._levelTable :text");
		v.levelInput.click(function(){
			var tar = $(this);
			TreeViewMakerViewEditor.stageIn(
				tar.val(),
				function(_s){ tar.val(_s).change() },
				[tar.offset().left,tar.offset().top],
				tar.attr("class")
			);
		});

		//input
		v.input = view.find("input");
		v.input.keyup(function(){update_delay()});
		v.input.change(function(){update_delay()});
		v.checks = view.find(":checkbox");
		
		v.allPageCount = view.find("._allPageCount");
		v.matchPageCount = view.find("._matchPageCount");
		
		//preset
		v.btn_preset = view.find("._btn_preset");
		v.btn_preset.click(function(){setPreset($(this).data("id"))});
		
		dirListView.init(view.find("._dirListArea"));
		dirListView.update(sitemap);
		
		tagListView.init(view.find("._tagListArea"));
		tagListView.update(sitemap);
		
		pageListView.init(view.find("._pageListArea"));
		
		//preset
		v.btn_direct_edit = view.find("._btn_direct_edit");
		v.btn_direct_edit.click(function(){openDirectEdit()});
		
		
		//preset
		v.area_addMenu = view.find("._area_addMenu");
		v.btn_add = view.find("._btn_add");
		v.btn_add.click(function(){showInlineGridEditor()});
		
		setBtn();
	}
	
	/* ---------- ---------- ---------- */

	function setBtn(){
		v.bg = view.find("._bg");
		v.bg.click(function(){ 
			stageOut()
		});
		v._btn_close = view.find("._btn_close");
		v._btn_close.click(function(){ 
			stageOut()
		});
		v.btn_do = view.find('._btn_do');
		v.btn_do.click(function(){ 
			callback(getParam());
			stageOut();
		});
	}
	
	/* ---------- ---------- ---------- */

	//直接編集
	function openDirectEdit(){
		var _s = JSON.stringify(getParam(), null, "	");
		Editer_JSONView.stageIn(_s,function(_param){
			try{
				setData(JSON.parse(_param)); 
			}catch( e ){
				alert("データ形式が正しくありません。");
			}
		});
	}
	
	/* ---------- ---------- ---------- */

	//プリセット
	function setPreset(_s){
		var _s = TreeViewMakerPreset[_s];
		 setData(JSON.parse(JSON.stringify(_s)))
	}
	
	function initView(){
		//
		v.targetDir = view.find("._targetDir");
		v.targetTag = view.find("._targetTag");
		//
		v.setting = {}
		
		v.setting.useToggle	 = view.find("._setting._useToggle")
		v.setting.onlyCurrent  = view.find("._setting._onlyCurrent");
		v.setting.isFlat 	 = view.find("._setting._isFlat");
		v.setting.hasDate 	 = view.find("._setting._hasDate");
		v.setting.isReverse  = view.find("._setting._isReverse");
		v.setting.limitSub 	 = view.find("._setting._limitSub");
		v.setting.indent 	 = view.find("._setting._indent");
		//
		v.css = {}
		v.css.clearfix	 = view.find("._setting._clearfix");
		v.css.current	 = view.find("._setting._current");
		v.css.ownCurrent = view.find("._setting._ownCurrent");
		v.css.hasSub	 = view.find("._setting._hasSub");
		v.css.underconst = view.find("._setting._underconst");
		v.css.type		 = view.find("._setting._type");
		v.css.level		 = view.find("._setting._level");
		v.css.no		 = view.find("._setting._no");
		v.css.sum		 = view.find("._setting._sum");
		//
		v.trs = view.find("._level");
		v.ls = [];
		for (var i = 0; i <  LEVEL_MAX ; i++) {
			var s = ".l" + (i+1);
			v.ls.push({
				show:view.find(s + " ._show"),
				open:view.find(s +" ._open"),
				dir :view.find(s +" ._dir"),
				page:view.find(s +" ._page"),
				add:view.find(s +" ._add"),
				html:view.find(s +" ._html")
			})
		}
	}
	
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var targetDir;
	function selectDir(_s,_name){
		targetDir = _s;
		v.targetDir.html(_name);
		updatePageList();
	}
	
	var targetTag;
	function selectTag(_s,_name){
		targetTag = _s;
		v.targetTag.html(_name);
		updatePageList();
	}
	function updatePageList(){
		pageListView.update(TreeAPI.getSubTree(sitemap, targetDir, targetTag));
		pageListView.show();
	}
	
	var previewParam = {}
	function selectPage(_o){
		previewParam.id = _o.id;
		previewParam.dir = _o.dir;
		v.pageURL.html('HTMLプレビュー : <b><i class="fa fa-file-text "></i> ' + TreeViewU.roundText(_o.name) + '</b>');
		update_delay();
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	/* ! ----------  ---------- ---------- ---------- ---------- */
	/* ! ----------  ---------- ---------- ---------- ---------- */
	var addMenu
	function setData(_param){
		
		if(_param ==undefined) 	_param = {};
		
		v.allPageCount.html('<b>' + TreeAPI.getPageSum(sitemap) + '</b>');
		
		//入力リセット
		v.input.val("");
		v.checks.prop("checked",false);
		//現在値をセット
		dirListView.setCurrent(_param.targetDir);
		tagListView.setCurrent(_param.targetTag);
		pageListView.setCurrent(_param.previewPage);
		
		if(_param.setting ==undefined) _param.setting = {}
		if(_param.setting.useToggle)	v.setting.useToggle.prop("checked",true);
		if(_param.setting.onlyCurrent)	v.setting.onlyCurrent.prop("checked",true);
		if(_param.setting.isFlat)		v.setting.isFlat.prop("checked",true);
		if(_param.setting.hasDate)		v.setting.hasDate.prop("checked",true);
		if(_param.setting.isReverse)	v.setting.isReverse.prop("checked",true);
		v.setting.limitSub.val(_param.setting.limitSub);
		v.setting.indent.val(_param.setting.indent);
		
		if(_param.setting.add == undefined){
			_param.setting.add = {}
		}
		addMenu = _param.setting.add;
		
		//クラス初期値
		if(_param.css == undefined){
			_param.css = {}
			_param.css.clearfix = true;
			_param.css.current = true;
			_param.css.ownCurrent = true;
			_param.css.hasSub = true;
			_param.css.underconst = true;
			
			_param.css.type = true;
			_param.css.level = true;
			_param.css.no = true;
			_param.css.sum = true;
		}
		
		//inputに値をセット
		if(_param.css.clearfix)		v.css.clearfix.prop("checked",true);
		if(_param.css.current)		v.css.current.prop("checked",true);
		if(_param.css.ownCurrent)	v.css.ownCurrent.prop("checked",true);
		if(_param.css.hasSub)		v.css.hasSub.prop("checked",true);
		if(_param.css.underconst)	v.css.underconst.prop("checked",true);
		
		if(_param.css.type)			v.css.type.prop("checked",true);
		if(_param.css.level)		v.css.level.prop("checked",true);
		if(_param.css.no)			v.css.no.prop("checked",true);
		if(_param.css.sum)			v.css.sum.prop("checked",true);

		//階層テーブルに値をセット
		var ls = _param.levels;
		if(ls ==undefined) ls = []
		 for (var i = 0; i < LEVEL_MAX ; i++) {
		 	if(ls[i] == undefined){
		 		ls[i] = {}
		 		ls[i].isShow = false
		 		ls[i].isOpen = false
		 		ls[i].dir = ""
		 		ls[i].page = ""
		 		ls[i].add = ""
		 		ls[i].html = ""
		 	}
			v.ls[i].show.prop("checked",ls[i].isShow) 
			v.ls[i].open.prop("checked",ls[i].isOpen) 
			v.ls[i].dir.val(ls[i].dir);
			v.ls[i].page.val(ls[i].page);
			v.ls[i].add.val(ls[i].add);
			v.ls[i].html.val(ls[i].html);
		}
		update_delay();
	}
	var tID;
	function update_delay(){
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			update();
		},100);
	}
	
	/* ---------- ---------- ---------- */

	function update(){
		v.matchPageCount.html('<b>' + pageListView.getPageSum() + '</b>');
		var _param = getParam();
		var tag = TreeAPI.getTag(htmlDir, sitemap , _param);
			tag = tag.split(TreeAPI_SITE_DIR).join("");
		//
		v.previewView.html(tag);
		v.previewText.val(tag);
		//
		updateAddMenuView(_param.setting);
		updateLevelView(_param.levels);
		TreeAPI.setToggleMenu(view);
	}
	
	function updateAddMenuView(_setting){
		var tag = "";
			tag += '	<table class="_optionTable">';
			tag += '		<tr>';
			tag += '			<td><b>●先頭に追加</b><br>{TOP}</td>';
			tag += '			<td><br></td>';
			tag += '			<td><b>●最後に追加</b><br>{BOTTOM}</td>';
			tag += '		</tr>';
			tag += '	</table>';
		
		var tagT = "";
		var tagB = "";
		if(_setting.add){
			try{
				var adds = _setting.add.list.grid;
				for (var i = 0; i < adds.length ; i++) {
					tagT += adds[i].text + '<br>'
				}
				var adds = _setting.add.list2.grid;
				for (var i = 0; i < adds.length ; i++) {
					tagB += adds[i].text + '<br>'
				}
			}catch( e ){}
		}
		if(tagT=="")tagT = "--";
		if(tagB=="")tagB = "--";
		tag = tag.split("{TOP}").join(tagT);
		tag = tag.split("{BOTTOM}").join(tagB);
		v.area_addMenu.html(tag);
	}
	
	function updateLevelView(_ls){
		v.trs.removeClass("_disable");
		for (var i = 0; i <  LEVEL_MAX ; i++) {
			var b = false;
			if(_ls[i]){
				if(_ls[i].isShow ) b = true;
			}
			if(b == false) v.trs.eq(i).addClass("_disable");
		}
	}
	
	/* ---------- ---------- ---------- */
	
	function getParam(){
		return {
			previewPage : _getPreviewPage(),
			targetTag 	: _getTragetTagVal(),
			targetDir 	: _getTragetDirVal(),
			setting 	: _getSettingVal(),
			css 		: _getCSSVal(),
			levels 		: _getLevelListVal()
		}
	}

	function _getPreviewPage(){
		return {id:previewParam.id,dir:previewParam.dir};
	}
	function _getTragetTagVal(){
		return targetTag;
	}
	function _getTragetDirVal(){
		return targetDir;
	}
	function _getSettingVal(){
		var _o = {}
			_o.useToggle  =  v.setting.useToggle.prop("checked") ? true:false;
			_o.onlyCurrent  =  v.setting.onlyCurrent.prop("checked") ? true:false;
			_o.isFlat 	 =  v.setting.isFlat.prop("checked") ? true:false;
			_o.hasDate 	 =  v.setting.hasDate.prop("checked") ? true:false;
			_o.isReverse  =  v.setting.isReverse.prop("checked") ? true:false;
			_o.limitSub  =  v.setting.limitSub.val();
			_o.indent  =  v.setting.indent.val();
			_o.add  =  addMenu;
		return _o;
	}
	function _getCSSVal(){
		var _o = {}
			_o.clearfix  =  v.css.clearfix.prop("checked") ? true:false;
			_o.current 	 =  v.css.current.prop("checked") ? true:false;
			_o.ownCurrent  =  v.css.ownCurrent.prop("checked") ? true:false;
			_o.hasSub 	 =  v.css.hasSub.prop("checked") ? true:false;
			_o.underconst  =  v.css.underconst.prop("checked") ? true:false;
			
			_o.type 	 =  v.css.type.prop("checked") ? true:false;
			_o.level 	 =  v.css.level.prop("checked") ? true:false;
			_o.no 		 =  v.css.no.prop("checked") ? true:false;
			_o.sum 		 =  v.css.sum.prop("checked") ? true:false;
		return _o;
	}
	function _getLevelListVal(){
		var _a = [];
		var temp = []
		for (var i = 0; i <  LEVEL_MAX ; i++) {
			temp[i] = {}
			temp[i].isShow = v.ls[i].show.prop("checked") ? true:false;
			temp[i].isOpen = v.ls[i].open.prop("checked") ? true:false;
			if(v.ls[i].dir.val()) 	temp[i].dir	 = v.ls[i].dir.val();
			if(v.ls[i].page.val())	temp[i].page = v.ls[i].page.val();
			if(v.ls[i].add.val())	temp[i].add = v.ls[i].add.val();
			if(v.ls[i].html.val())	temp[i].html = v.ls[i].html.val();
			_a.push(temp[i]);
		}
		return _a;
	}
	
	/* ---------- ---------- ---------- */
	
	var detailView;
	function showInlineGridEditor(){
		detailView = null;
		detailView = new EditableView.SubPageView();
		detailView.setObjectType(PageTypeList.tree);
		detailView.registParent(TreeViewMakerView);
		detailView.createView();
		detailView.initData(addMenu);
		detailView.stageIn();
	}
	window.showInlineGridEditor = showInlineGridEditor;
	function hideInlineGridEditor(){
		addMenu = detailView.getData();
		update_delay();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	var callback;
	var htmlDir;
	function stageIn(_htmlDir, _sitemap,_param,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			view.show();
			callback = _callback;
			htmlDir = _htmlDir;
			sitemap = _sitemap;
			
			if(isFirst){
				createlayout();
				isFirst = false;
			}
			setData(_param);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
			TreeViewMakerViewEditor.stageOut()
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		selectDir:selectDir,
		selectTag:selectTag,
		selectPage:selectPage,
		update_delay:update_delay,
		hideInlineGridEditor:hideInlineGridEditor
	}
})();


var TreeViewU = (function(){
	//TreeViewU.roundText(_s,10)
	function roundText(_s ,_n) {
		_n = _n || 15;
		if(_s.length > _n) _s = _s.substr(0,_n) + "..."
		return _s;
	}
	return { roundText:roundText }
})();
