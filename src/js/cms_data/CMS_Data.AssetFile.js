
//サイト設定のアセットCSSやJSなどの管理を行う

CMS_Data.AssetFile = (function(){
	/* ---------- ---------- ---------- */
	//テンプレートHTMLロード
	
	function init(){}
	
	/* ---------- ---------- ---------- */
	
	//アセットファイルのリストをつくる
	var files = [];
	function addFile(_dir,_file) {
		files.push({
			dir : _dir,
			file: _file,
			edit: false,
			r:"",
		})
	}
	
	/* ---------- ---------- ---------- */

	//アセットファイルが保存された場合にコールされる。
	//更新時間を記録しておく
	function update(_dir,_file){
		for (var i = 0; i <  files.length ; i++) {
			var d = files[i];
			if(d.dir == _dir){
				if(d.file == _file){
					d.edit = true;
					d.r = "?"+ new Date().getTime();
					_reload(_file);
				}
			}
		}
	}
	
	function _reload(_file){
		//CSSリロード
		CMS_Data.InspectCSS.reload(_file);
		CMS_Data.AssetCSSManager.reload(_file);
	}
	
	/* ---------- ---------- ---------- */
	
	//CSSパスを、ユニークに書き換え、プレビュー時にCSSをキャッシュからロードしないように
	
	function overridePath(_s){
		for (var i = 0; i <  files.length ; i++) {
			var d = files[i];
			if(d.dir =="css"){
				if(d.edit ){
					var ss = d.dir + "/" + d.file + '"';
					var rr = d.dir + "/" + d.file + d.r + '"';
					_s = _s.split(ss).join(rr);
				}
			}
		}
		return _s; 
	}

	return {
		init: init,
		addFile: addFile,
		update: update,
		overridePath: overridePath
	}
})();

//20160415
//指定したCSSをリロードする
CMS_Data.AssetCSSManager = (function(){
	/* ---------- ---------- ---------- */
	//初期化
	var eles = [];
	var isFirst = true;
	function init(){
		// <link rel="stylesheet" class="asset" となってるCSSのみ、リロード候補に入れる
		var a = document.getElementsByTagName( 'link' );
		for (var i = 0; i <  a.length ; i++) {
			try{
				if(a[i].getAttribute('class') == "asset"){
					eles.push(a[i]);
				}
			}catch( e ){}
		}
	}
	
	function reload(_s){
		if(isFirst){
			init();
		}
		for (var i = 0; i <  eles.length ; i++) {
			var href = eles[i].getAttribute('href').split('?')[0];
			var a = href.split("/");
			var name = a[a.length-1];
			if(_s.indexOf(name) != -1){
				eles[i].setAttribute( 'href', href  + "?r="+ new Date().getTime() );
			}
		}
		
	}
	return { reload:reload }
})();
