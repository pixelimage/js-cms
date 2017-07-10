
var BackupCreateView = (function(){
	
	var btn_add
	var btn_add_dis
	var btn_diff
	var btn_delete
	var isAdding = false
	
	var v = {}
	
	function init() {
		
		view = $("#BackupCreateView");
		
		var tag = ""
			tag += '<div class="_p _h2">2. バックアップファイル ( ZIP ) 作成</div>';
			tag += '	<ul class="_tab">';
			tag += '		<li>バックアップ用ファイル作成</li>';
			tag += '		<li>差分ファイル作成</li>';
			tag += '	</ul>';
			tag += '	<div class="_backupArea _shadow">';
			tag += '		<div class="_p">バックアップファイル( ZIP ) を作成したい場合は、以下のボタンを押してください。数秒から数十秒ほどで、選択したディレクトリをZIPファイルに変換し、保存・ダウンロードできます。</div>';
			tag += '		<div class="_notes">CMSにはリストア機能は無いので、バックアップからサイトをリストアするには、ZIPファイルをダウンロード、解凍し、FPTで上書きしてください。</div>';
			tag += '		<div class="_zip_selects"></div>';
			tag += '		<div class="_p _arrow"><i class="fa fa-arrow-down "></i></div>';
			tag += '		<div class="_btns">';
			tag += '			<div class="_btn_add">バックアップファイル ( ZIP ) を作成する</div>';
			tag += '			<div class="_btn_add_dis">ZIPファイル作成中 (しばらくお待ちください) ...</div>';
			tag += '			<div class="_btn_add_done">作成しました (下の履歴からZIPを取得できます) <br><br><i class="fa fa-arrow-down "></i> </div>';
			tag += '		</div>';
			tag += '	</div>';
			tag += '	<div class="_diffArea _shadow ">';
			tag += '		<div class="_p">指定した時間から、現在までに更新したファイルリストを取得します。ファイルリストから、ZIPファイルを作成し、ダウンロードできます。</div>	';
			tag += '		<div class="_diff_selects"></div>';
			tag += '		<div class="_p _arrow"><i class="fa fa-arrow-down "></i></div>';
			tag += '		<div class="_selectArea">';
			tag += '			更新時間：<span class="_replaceArea"></span>';
			tag += '		</div>';
			tag += '		<div class="_p _arrow"><i class="fa fa-arrow-down "></i></div>';
			tag += '		<textarea class="_diffList"></textarea>';
			tag += '		<div class="_btns">';
			tag += '			<div class="_btn_diff_none">差分ファイル ( ZIP ) を作成する</div>';
			tag += '			<div class="_btn_diff">差分ファイル ( ZIP ) を作成する</div>';
			tag += '			<div class="_btn_diff_dis">ZIPファイル作成中 (しばらくお待ちください) ...</div>';
			tag += '			<div class="_btn_diff_done">作成しました (下の履歴からZIPを取得できます) <br><br><i class="fa fa-arrow-down "></i> </div>';
			tag += '		</div>';
			tag += '	</div>	';
			tag += '	<div class="_p">ZIPファイルの作成が完了すると、下のバックアップ履歴のリストの上に追加されるので、そこからローカルディスクにZIPファイルを保存することもできます。(ファイルをアップロードするには、FTPアカウントが必要)</div>';
			
		view.html(tag);
	}
	
	function main(){
		
		v.btns = view.find('._btns');
		v.zip_selects = view.find('._zip_selects');
		v.diff_selects = view.find('._diff_selects');
		
		v.btn_add	 = view.find('._btn_add');
		v.btn_add_dis = view.find('._btn_add_dis');
		v.btn_add_done = view.find('._btn_add_done');
		v.btn_add.click(function(){ createZipFile() });
		v.btn_add.show();
	
		v.btn_getDiffList= view.find('._btn_getDiffList');
		v.btn_getDiffList.click(function(){ getDiffList() });
		
		v.btn_diff_none	 = view.find('._btn_diff_none');
		v.btn_diff		 = view.find('._btn_diff');
		v.btn_diff_dis	 = view.find('._btn_diff_dis');
		v.btn_diff_done  = view.find('._btn_diff_done');
		v.btn_diff.click(function(){ createDiffZip() });
		
		createView()
	}
	function createView(){
		
		view.find('._selectArea ._replaceArea').html(BackupU.getSelectTag());
		
		$('#hour').change(function(){ selectDiffTime($(this).val()) });
		
		v.tabs = $('._tab > li');
		v.BackupArea = $('._backupArea');
		v.DiffArea = $('._diffArea');
		
		v.tabs.eq(0).click(function(){ openTab(0)});
		v.tabs.eq(1).click(function(){ openTab(1)});
		
		openTab(0);
	}
	var isDiffOpen = false
	function openTab(_n){
		v.BackupArea.hide()
		v.DiffArea.hide()
		
		v.tabs.removeClass("_active")
		v.tabs.eq(_n).addClass("_active")
		if(_n == 0) {
			isDiffOpen = false
			v.BackupArea.show();
		}
		if(_n == 1) {
			isDiffOpen = true
			v.DiffArea.show();
		}
		selectDirUpdate();
	}
	
	/* ---------- ---------- ---------- */

	function selectDirUpdate(){
		if(isDiffOpen){
			updateDiffList();
		} else{
			resetZipFile();
		}
	}
	
	/* ---------- ---------- ---------- */

	function selectDiffTime(_m){
		v.btn_diff_none.show();
		v.btn_diff.hide();
		v.btn_diff_dis.hide();
		currentDiffTime = _m;
		$('.replaceText').html("");
		updateDiffList();
	}
	
	var currentDiffTime = 0;
	function updateDiffList(){
		
		v.diff_selects.html(getSelects ())
		
		var o = {}
			o.action  = "getDiffList";
			o.diff 	 = currentDiffTime;
			o.targetDirs = BackupTargetView.getSelectsFlat();

		v.btn_diff_done.hide();
		view.find('._diffList').val("検索中...");
		var callback = function(json){
			var list = json.files;
			var t = ""
			if(list.length == 0){
				t += "指定時間内に変更したファイルは、見つかりませんでした。" 
				v.btn_diff_none.show();
				v.btn_diff.hide();
			} else{
				t += "●差分ファイル一覧 (ファイル数：" + list.length  + ")\n"
				for (var i = 0; i < list.length ; i++) {
					t += list[i] + "\n";
				}
				v.btn_diff_none.hide();
				v.btn_diff.show();
			}
			v.btn_diff_dis.hide();
			v.btn_diff_done.hide();
		view.find('._diffList').val(t);
		};
		BackupU.loadAPI(o,callback);
	}
	function createDiffZip(){
		if(window.isLocked(true))return;
		if(isAdding)return;
		var o = {}
			o.diff 	 = currentDiffTime;
			o.action = "createDiffZip";
			o.targetDirs = BackupTargetView.getSelectsFlat();
		
		var callback = function(json){	
			v.btn_diff.hide();
			v.btn_diff_dis.hide();
			v.btn_diff_done.show();
	
			isAdding = false;
			loadFileList()
		}
		isAdding = true;
		v.btn_diff_none.hide();
		v.btn_diff.hide();
		v.btn_diff_dis.show();
		v.btn_diff_done.hide();
	
		BackupU.loadAPI(o,callback);
	}
	
	function loadFileList(){
		BackupListView.update()
	}
	function resetZipFile(){
		if(isAdding )return;
		v.btn_add.css("opacity","0.5")
		setTimeout(function(){
			v.btn_add.css("opacity","1")
		},200);
		v.zip_selects.html(getSelects ())
	
		v.btn_add.show();
		v.btn_add_dis.hide();
		v.btn_add_done.hide();
	}
	function getSelects(){
		var _se = BackupTargetView.getSelects();
		var ds = _se.dirs.split(",");
		var fs = _se.files.split(",");
		var tag = ""
			tag += "<table>";
			tag += "	<tr>";
			tag += "		<td>対象ディレクトリ：</td>";
			tag += "		<td>";

		var count = 0
		for (var i = 0; i <  ds.length ; i++) {
			if(ds[i] != ""){
				count++
				tag += '<span class="_icon_dir"></span> ' + ds[i].split("../").join("") + '<br>'
			}
		}
		for (var i = 0; i <  fs.length ; i++) {
			if(fs[i] != ""){
				count++
				tag += '<i class="fa fa-file-text"></i> ' + fs[i].split("../").join("") + '<br>'
			}
		}
		if(count==0){
			v.btns.hide()
			tag += "選択してください" 
		} else{
			v.btns.show()
		}
			tag += "	</td>";
			tag += "	</tr>";
			tag += "</table>";
		return tag;
	}
	function createZipFile(){
		if(window.isLocked(true))return;
		if(isAdding)return;
		var o = {}
			o.action = "createZip";
			o.targetDirs = BackupTargetView.getSelectsFlat();
		var callback = function(json){	
			//v.btn_add.show();
			v.btn_add_dis.hide();
			v.btn_add_done.show();
			isAdding = false;
			loadFileList()
		}
		isAdding = true;
		v.btn_add.hide();
		v.btn_add_dis.show();
		BackupU.loadAPI(o,callback);
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
			if(isFirst){
				main()
			}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}
	 return {
	 	init: init,
	 	stageIn: stageIn,
	 	stageOut: stageOut,
	 	selectDirUpdate: selectDirUpdate
	 }

})();
