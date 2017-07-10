
var BackupListView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#BackupListView');
		stageInit();
		setBtn();
		
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		var tag = ""
			tag += '<div class="_p _h2">バックアップ履歴とダウンロード</div>';
			tag += '	<div class="_p">これまでバックアップで作成したZIPファイルのリストです。</div>';
			tag += '	<div class="_fileList"></div>';
			tag += '	<div class="_p">※ 上から新しい順に並んでいます。ZIPファイルは、保存した年月日(YYYY/MM/SS)と時間(hh:mm:ss)をもとにファイル名をつけています。</div>';
			tag += '	<div class="_p">※ 差分ファイルについては、ファイル名末尾に"._diff"と追加されます。</div>';
			tag += '	<div class="_p">※ ZIPファイルをダウンロードしたあと、バックアップとして残しておく必要がない場合は、削除してください。</div>';
		view.html(tag);
		v.fileList = view.find('._fileList');
	}
	
	function setBtn(){
		view.on("click","._btn_delete",function(){ 
			deleteFile($(this).data("id"))
		 });
	}
	
	function update(){
		var o = {}
			o.action = "readFileList";
		var callback = function(json){updateList(json)};
		BackupU.loadAPI(o,callback)
	}
	
	function updateList(json){
		var html = ""
		var list = json.files;
		var tag  = '<table class="_filelist">'
			tag += '<tr>';
			tag += '<th>番号</td>';
			tag += '<th>バックアップファイル</td>';
			tag += '<th>作成時間</td>';
			tag += '<th>ファイルサイズ</td>';
			tag += '<th>削除</td>';
			tag += '</tr>';
		
		if(list){
			// list = list.reverse();
			list.sort(function(a, b){
				return ( a.name < b.name ? 1 : -1);
			});
			var count = 0
			for (var i = 0; i < list.length ; i++) {
				if(list[i].name.indexOf(".zip")!= -1){
					var colorObject = BackupU.getDistanceTimeColor(list[i].time)
					var class_ = colorObject[1];
					var time = colorObject[2];
					var size = FileU.formatFilesize(list[i].size)
					// if(_s > 1000*1000){
					// 	size = "<b>" + Math.round(_s/(1000*100))/10 +"MB"+"</b>"
					// } else{
					// 	size = Math.round(_s/100)/10 +"KB"
					// }
					tag += '<tr>';
					tag += '<td>'+(count+1)+'</td>';
					tag += '<td class="'+class_+'"><i class="fa fa-download "></i> <a href="'+CMS_Path.BACKUP.REL+list[i].name+'" >' + list[i].name + '</a></td>';
					tag += '<td>'+time+'</td>';
					tag += '<td style="text-align:right">'+size+'</td>';
					tag += '<td><span class="_cms_btn-nano _cms_btn_red _btn_delete" data-id="'+list[i].name+'"><i class="fa fa-times "></i>  削除</div></td>';
					tag += '</tr>';
					count++
				}
			}
		}
		tag += "<table>";
		v.fileList.html(tag);
	}
	function deleteFile(_id){
		var s1 = "削除の確認"
		var s2 = "ファイルを削除しますか？"
		CMS_ConfirmView.stageIn(s1,s2,function(){
			var o = {}
				o.action = "deleteFile";
				o.filename = _id;
			var callback = function(json){	
				update()
			}
			BackupU.loadAPI(o,callback);
		},"DELL")
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
				createlayout();
			}
			update();
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
	 	update: update
	 }

})();