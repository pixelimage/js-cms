var FileInfoView 		 = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#FileInfoView');
		stageInit();
	}
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(FileInfoView,view);
		var tag = "";
			tag = '<div class="_title">__REP__</div>';
		v.header.html(tag);
		
		var tag = ""
		 	tag += '<div class="_tab clearfix">';
		 	tag += '	<div class="_tab_base">基本情報</div>';
		 	tag += '	<div class="_tab_tag">ブログエントリー情報</div>';
		 	tag += '	<div class="_tab_extra">追加情報</div>';
		 	tag += '</div>';
		 	tag += '<div class="_gloup_base"></div>';
		 	tag += '<div class="_gloup_tag"></div>';
		 	tag += '<div class="_gloup_extra">';
	 		tag += '<div class="_read">追加情報を入力できます。</div>'
			tag += '	<div style="margin:10px 0;">';
	 		tag += 	CMS_GuideU.getGuideTag("file/grid","追加情報について");
			tag += '	</div>';
			tag += '	<div class="_gridArea _editableBlock" style="padding:0;"></div>';
			tag += "</div>";
		v.body.html(tag);
		
		v.gloup_base 	= view.find("._gloup_base");
		v.gloup_tag 	= view.find("._gloup_tag");
		v.gloup_extra 	= view.find("._gloup_extra");
		v.gridArea 		= view.find("._gridArea");
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">キャンセル</div> ';
			tag += '<div class="_cms_btn _cms_btn_red _btn_del"><i class="fa fa-trash-o"></i> 削除する</div> ';
			tag += '<div class="_cms_btn _cms_btn_active _btn_do" '+TIP_ENTER+'>__REP__</div> ';
			tag += '<div class="_cms_btn _cms_btn_disable _btn_do_dis">__REP__</div> ';
		v.footer.html(tag);
		
		initTab();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//タブ
	
	function initTab(){
		v.tab_base = v.body.find('._tab_base');
		v.tab_tag = v.body.find('._tab_tag');
		v.tab_extra= v.body.find('._tab_extra');
		v.tab_base.click(function(){openTab(0)});
		v.tab_tag.click(function(){openTab(1)});
		v.tab_extra.click(function(){openTab(2)});
	}
	function openTab(_n){
		v.tab_base.removeClass("_active")
		v.tab_tag.removeClass("_active")
		v.tab_extra.removeClass("_active")
		v.gloup_base.hide()
		v.gloup_tag.hide()
		v.gloup_extra.hide()
		if(_n == 0){
			v.gloup_base.show()
			v.tab_base.addClass("_active")
		}
		if(_n == 1){
			v.gloup_tag.show()
			v.tab_tag.addClass("_active")
		}
		if(_n == 2){
			v.gloup_extra.show()
			v.tab_extra.addClass("_active")
		}
		hideFloatView();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		
		v.btn_do_dis = view.find('._btn_do_dis');
		
		v.btn_do	 = view.find('._btn_do');
		v.btn_do.click(function(){ compliteEdit(); });
		
		v.btn_del = view.find('._btn_del');
		v.btn_del.click(function(){
			if(window.isLocked(true))return;
			if(caller != undefined){
				caller.openEditFileInfo_comp(action,getParam(),"delete");
			}
			stageOut();
		});
	}
	
	
	/* ! ---------- update ---------- ---------- ---------- ---------- */
	
	function update(){
		
		v.btn_del.hide();
		v.btn_do.show()
		v.btn_do_dis.hide()
		
		//ボタン名設定
		var t = "";
		var b = "";
		if(action == "dir_edit")	{ t = "グループ編集・削除"; b = "変更する"; }
		if(action == "file_edit")	{ t = "HTMLページ編集・削除"; b = "変更する"; }
		if(action == "html_edit")	{ t = "見出し編集・削除"; 	b = "変更する"; }
		if(action == "dir_edit"){ v.btn_del.show(); }
		if(action == "file_edit"){ v.btn_del.show(); }
		if(action == "html_edit"){ v.btn_del.show(); }
		b = '<i class="fa fa-check"></i> ' + b;
		v.header.html('<div class="_title">'+t+'</div>');
		v.btn_do.html(b);
		v.btn_do_dis.html(b);
		
		var anno_id = '<div class="_anno">半角英数字 ( a〜z , A〜Z , 0〜9 , - , _ ) で入力してください。</div>'

		var _guide = CMS_GuideU.getGuideTag;
		
		var stateTag = (function(_state){ 
			var ss = CMS_PateStateU.getState(_state);
			var isCheckedHide 	 = (ss[0] == "1") ? "checked": "";
			var isCheckedHideMenu  = (ss[1] == "1") ? "checked": "";
			var isCheckedUnderConst = (ss[2] == "1") ? "checked": "";
			var uid = DateUtil.getRandamCharas(10);
			var uid2 = DateUtil.getRandamCharas(10);
			var uid3 = DateUtil.getRandamCharas(10);
			var s = '<tr><th>公開</th><td>'
				s += '<table class="_subtable">'
				s += '<tr><td><input type="checkbox" id="'+uid+'" class="_in_isHide" value="1" '+isCheckedHide+'>'
				s += ' <label for="'+uid+'">非公開にする</label> '+_guide("file/hide","")+'</td></tr>';
				s += '<tr><td><input type="checkbox" id="'+uid3+'" class="_in_isHideMenu" value="1" '+isCheckedHideMenu+'>';
				s += ' <label for="'+uid3+'">メニューに表示しない</label> '+_guide("file/hideMenu","")+'</td></tr>'
				s += '<tr><td><input type="checkbox" id="'+uid2+'" class="_in_isUnderConst" value="1" '+isCheckedUnderConst+'>';
				s += ' <label for="'+uid2+'">工事中にする</label> '+_guide("file/underconst","")+'</td></tr>'
				s += '</table>'
				s += '</td></tr>'
			return s;
		})(param.state);
		var cmsState = (function(_state){ 
			var ssC = CMS_PateStateU.getState(param.stateCMS);
			var isCheckedEM  = (ssC[0] == "1") ? "checked": "";
			var uidC1 = DateUtil.getRandamCharas(10);
			var uidC2 = DateUtil.getRandamCharas(10);
			var s = '<tr><th>CMS表示</th><td>'
				s+= '<input type="checkbox" id="'+uidC1+'" class="_in_isCheckedEM" value="1" '+isCheckedEM+'>'
				s+= ' <label for="'+uidC1+'"><span class="_fileEM"></span> 強調表示</label> ';
				s+= _guide("file/em","")
				s+= '</td></tr>'
			return s;
		})(param.stateCMS);
		var custom_a = (function(_param){ 
			if(_param.custom_a != undefined) return _param.custom_a;
			return ""
		})(param);
		var customAnchorTag = (function(){ 
			var s = ""
				s += '<tr><th>外部URL<br><span class="_repID">{HREF},{TAR}</span></th><td><input type="text" class="_text _in_custom_a _colorAnchor" placeholder="http://www.yahoo.co.jp/" />';
				s += " " + _guide("file/url","")+'</td></tr>'
			return s;
		})();
		var gloupIDTag = (function(_param){ 
			var _id = _param.id;
			var s = "";
				s += '<input type="text" class="_text _in_editFile_gid _w250 _colorGID " list="sitemapDatalistGloups"  value="'+_id + '" />'
			return s;
		})(param);
		var IDTag = (function(_param){
			var _dir = FileInfoU.getDirPath(_param);
			var _id = _param.id;
			var s = "";
				s += '<div class="_colorID-path" style="padding:5px;">'
				s += '<table class="_filepath">';
				s += '	<tr>';
				s += '		<td class="_fs12">ディレクトリ名</td>';
				s += '		<td class="_fs12">ページID</td>';
				s += '	</tr>';
				s += '	<tr>';
				s += '		<td>'
				s += '<div class="_editFile_dir_wap"><span class="_icon_dir"></span><span class="_editFile_dir" data-path="'+_dir+'">' + _dir + '</span></div>'
				s += '		</td>';
				s += '		<td>'
				s += '<input type="text" class="_text _in_editFile_id _w250 _colorID "  list="sitemapDatalist" value="'+_id + '" />'
				s += ' <span>.html</span></div>';
				s += '		</td>';
				s += '	</tr>';
				s += '</table>';
				return s;
		})(param);
		var nameTag = '<input type="text" class="_text _in_editFile_name _colorName" /><br>'
	
		//グループ
 		var tag = "";
		if(action == "dir_edit"){
			nameTag += _guide("file/gloupName","グループ名について");
		 	tag += '<table class="_fileInfoEditTable">'
			tag += '<tr><th>グループ名<br><span class="_repID">{NAME}</span></th><td>'+nameTag+'</td></tr>';
			tag += '<tr><th>グループID<br><span class="_repID">{ID}</span></th><td>'+anno_id+gloupIDTag
			tag += '	<div class="_t_anno _input_gid_anno"></div>'
			tag += _guide("file/gloupID","グループIDについて")
			tag += '</td></tr>';
			tag += stateTag;
			tag += customAnchorTag;
			tag += cmsState;
			tag += "</table>";
		}	
		
		//ページ
		if(action == "file_edit"){
			nameTag += _guide("file/pageName","ページ名について");
		var typeName = ""
		 	tag += '<table class="_fileInfoEditTable">'
			tag += '<tr><th>ページ名<br><span class="_repID">{NAME}</span></th><td>'+nameTag+'</td></tr>';
			tag += '<tr><th>ファイル名<br><span class="_repID">{DIR},{ID},{HREF}</span></th><td>'+anno_id+IDTag
			tag += '	<div class="_t_path_preview _path_preview"></div>';
			tag += '	<div class="_t_anno _input_id_anno"></div>'
			tag += '	</div>'
			tag += _guide("file/pageID","ファイル名について")
			tag += '</td></tr>';
			tag += stateTag;
			tag += customAnchorTag;
			tag += cmsState;
			tag += "</table>";
		}
		if(action == "html_edit"){
			var typeName = ""
			tag += '	<div style="margin:10px 0;">';
	 		tag += 	CMS_GuideU.getGuideTag("file/html","見出しについて");
			tag += '	</div>';
		 	tag += '<table class="_fileInfoEditTable">'
			tag += '<tr><th>名称<br><span class="_repID">{NAME}</span></th><td>'+nameTag+'</td></tr>';
			tag += '<tr><th>HTML<br><span class="_repID">{HTML}</span></th><td><textarea class="_text _in_editFile_html _color-html" ></textarea></td></tr>';
			tag += "</table>";
		}
		
		/* ---------- ---------- ---------- */
		//タグ&詳細
		
		if(param.tag == undefined) param.tag = "";
		var tagTag = '<input type="text" class="_text _in_editFile_tag _colorName" list="tagDatalist" placeholder="国際,経済,スポーツ" /><br>'
		
		if(param.date == undefined) param.date = "";
		var dd = DateUtil.getFormattedDate(new Date(),"YYYY/MM/DD");
		var dateTag = '<input type="text" class="_text _in_editFile_date _colorName" placeholder="'+dd+'" /><br>'
		
		if(param.read == undefined) param.read = "";
		var readTag = '<textarea class="_text _in_editFile_read _colorName" ></textarea>'
		
		var tag2 = "";
		//ページ
 		if(action == "dir_edit" || action == "file_edit" || action == "html_edit"){
		 	tag2 += '<div class="_read">CMSをブログ的に利用する際につかいます。</div>'
			tag2 += '	<div style="margin:10px 0;">';
		 	tag2 += 	CMS_GuideU.getGuideTag("file/blog","ブログエントリー情報について");
			tag2 += '	</div>';
		 	tag2 += '<table class="_fileInfoEditTable">'
			tag2 += '<tr><th><i class="fa fa-tags "></i> 分類用タグ名<br><span class="_repID">{TAG}</span></th><td>'+tagTag+'</td></tr>';
			tag2 += '<tr><th>ページ説明<br><span class="_repID">{READ}</span></th><td>'+readTag+'</td></tr>';
			tag2 += '<tr><th><i class="fa fa-clock-o"></i> 日付<br><span class="_repID">{DATE}</span></th><td>'+dateTag+'</td></tr>';
			tag2 += "</table>";
		}
		
		//
		v.gloup_base.empty().append(tag)
		v.gloup_tag.empty().append(tag2)
		
		if(param.name) v.gloup_base.find("._in_editFile_name").val(param.name);
		if(param.html) v.gloup_base.find("._in_editFile_html").val(param.html);
		if(custom_a) v.gloup_base.find("._in_custom_a").val(custom_a);
		
		if(param.tag) v.gloup_tag.find("._in_editFile_tag").val(param.tag);
		if(param.date) v.gloup_tag.find("._in_editFile_date").val(param.date);
		if(param.read) v.gloup_tag.find("._in_editFile_read").val(param.read);
		
		initCheckPath()
		initExtraGrid();
		initCheckParam();
		
		openTab(0);
	}
	function initCheckPath(){
		//見出しはスルーする
		if(action == "html_new" || action == "html_edit") return;
		//
		v.in_editFile_id = view.find('input._in_editFile_id');
		v.in_editFile_id.keyup(function(){ checkPath() });
		v.in_editFile_id.on('input', function(){checkPath()});
		
		v.in_editFile_gid = view.find('input._in_editFile_gid');
		v.in_editFile_gid.keyup(function(){ checkGloup() });
		v.in_editFile_gid.on('input', function(){checkPath()});
		
		v.editFile_dir_wap = view.find('._editFile_dir_wap');
		v.editFile_dir = view.find('._editFile_dir');
		v.editFile_dir_wap.click(function(){ 
			var val = v.editFile_dir.data("path");
			DirListView.stageIn(val,function(_s){
				v.editFile_dir.data("path",_s);
				v.editFile_dir.text(_s);
				checkPath();
			})
		});
		
		//テスト用
		window._setDirName = function(_s){
			v.editFile_dir.data("path",_s);
			v.editFile_dir.text(_s);
			checkPath();
		}
		
		v.input_id_anno = view.find('._input_id_anno')
		v.input_gid_anno = view.find('._input_gid_anno')
		v.path_preview = view.find('._path_preview');
		
		var list = CMS_Data.Sitemap.getFilelist();
		//IDチェック
		FileInfo_CheckID.setCallback(list,function(_res){
			v.path_preview.removeClass("_error")
			if(_res.annos.length == 0){
				v.btn_do.show()
				v.btn_do_dis.hide();
			} else{
				v.path_preview.addClass("_error");
				v.btn_do.hide();
				v.btn_do_dis.show();
			}
			v.path_preview.html(_res.path)
			v.input_id_anno.html(_res.annos.join("<br>"))
		});
		FileInfo_CheckID.checkInit(action,param.id,param.dir);
		
		//グループIDチェック
		FileInfo_CheckGID.setCallback(list,function(_res){
			if(_res.annos.length == 0){
				v.btn_do.show()
				v.btn_do_dis.hide();
			} else{
				v.btn_do.hide();
				v.btn_do_dis.show();
			}
			v.input_gid_anno.html(_res.annos.join("<br>"))
		});
		FileInfo_CheckGID.checkInit(action,param.id);
	}
	function checkPath(){
		FileInfo_CheckID.check(action,v.in_editFile_id.val(),v.editFile_dir.data("path"));
	}
	
	function checkGloup(){
		FileInfo_CheckGID.check(action,v.in_editFile_gid.val());
	}
	
	
	/* ---------- ---------- ---------- */
	//カスタムGRID
	
	var extraGrid
	function initExtraGrid(){
		v.gridArea.empty();
		extraGrid = new FileInfoGrid(v.gridArea)
		extraGrid.initData(param.extra);
	}
	
	
	/* ---------- ---------- ---------- */

	function getParam(){
		var in_gid 		 = view.find('._in_editFile_gid').val();
		var in_id 		 = view.find('._in_editFile_id').val();
		var in_dir 		 = view.find('._editFile_dir').data("path");
		var in_name 	 = view.find('._in_editFile_name').val();
		var in_tag 		 = view.find('._in_editFile_tag').val();
		var in_read 	 = view.find('._in_editFile_read').val();
		var in_date 	 = view.find('._in_editFile_date').val();
		//
		var in_custom_a  = view.find('._in_custom_a').val();
		var in_html 	 = view.find('._in_editFile_html').val();
		var in_extra 	 = extraGrid.getData();
		
		var pageState = CMS_PateStateU.createState([
			(view.find('._in_isHide').prop("checked")) ? "1":"0",
			(view.find('._in_isHideMenu').prop("checked")) ? "1":"0",
			(view.find('._in_isUnderConst').prop("checked")) ? "1":"0"
		]);
		
		var pageStateCMS = CMS_PateStateU.createState([
			(view.find('._in_isCheckedEM').prop("checked")) ? "1":"0",
			0,
			0
		]);
		if(action == "dir_edit"){
			param.id 		 = in_gid;
			param.name 		 = in_name;
			param.tag 		 = in_tag;
			param.read 		 = in_read;
			param.date 		 = in_date;
			//
			param.state 	 = pageState
			param.stateCMS 	 = pageStateCMS
			param.custom_a 	 = in_custom_a;
			param.extra 	 = in_extra;
		}
		if(action == "file_edit"){
			param.id 		 = in_id;
			param.dir 		 = FileInfoU.getDirVal(in_dir);
			param.name 		 = in_name;
			param.tag 		 = in_tag;
			param.read 		 = in_read;
			param.date 		 = in_date;
			//
			param.state 	 = pageState;
			param.stateCMS 	 = pageStateCMS;
			param.custom_a 	 = in_custom_a;
			param.extra 	 = in_extra;
		}
		if(action == "html_edit"){
			param.id 		 = in_id;
			param.name 		 = in_name;
			param.tag 		 = in_tag;
			param.read 		 = in_read;
			param.date 		 = in_date;
			//
			param.html 		 = in_html;
			param.extra 	 = in_extra;
		}
		
		//空ノードを削除したり、不要なノードを削除
		
		var newP = {}
		for (var n in param) {
			var b = true
			if(param[n] == "") b = false;
			if(param[n] == null) b = false;
			if(param[n] == undefined) b = false;
			if(n == "isHide") b = false;
			if(n == "isHideMenu") b = false;
			if(n == "isUnderConst") b = false;
			if(n == "isCheckedEM") b = false;
			if(n == "extra") {
				if(param[n].length == 0) b = false;
			}
			//空データや初期値の場合は削除
			if(n == "tag") 		{ if(param[n] == "") b = false;}
			if(n == "date") 	{ if(param[n] == "") b = false;}
			if(n == "read") 	{ if(param[n] == "") b = false;}
			if(n == "custom_a") { if(param[n] == "") b = false;}
			
			if(n == "state") 	{ if(param[n] == "0,0,0") b = false;}
			if(n == "stateCMS") { if(param[n] == "0,0,0") b = false;}

			//ノードリストの場合はtrue;
			if(n == "list") b = true;
			if(b){
				newP[n] = param[n];
			}
		}
		return newP;
	}
	/* ---------- ---------- ---------- */
	
	var prePreParam = ""
	function initCheckParam(){
		prePreParam = JSON.stringify(getParam());
	}
	function compliteEdit(){
		if (v.btn_do.css('display') == 'none'){
			stageOut();
			return;
		}
		var p = getParam();
		if(prePreParam == JSON.stringify(p)){
			stageOut();
			return;
		}
		//
		if(window.isLocked(true))return;
		//編集した場合のみデータ更新する
		if(caller != undefined){
			caller.openEditFileInfo_comp(action,p,"");
		} else{
			if(isLog) console.log(getParam());
		}
		stageOut();
	}
		
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	
	var action;
	var caller;
	var id;
	var param = {}
	var isEdit;
	function stageIn( _action , _caller , _param ){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			action = _action;
			caller = _caller;
			if(action.indexOf("_new") != -1){
				param = FileInfoView_U.getParam(_action)
			} else{
				param = _param;	
			}
			
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
			checkFileInit = true;
			update()
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
		}
	}
	function resize(){
		if(isOpen){
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize,compliteEdit:compliteEdit }
})();


