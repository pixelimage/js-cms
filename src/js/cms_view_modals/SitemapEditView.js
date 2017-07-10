
var SitemapEditView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#SitemapEditView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(SitemapEditView,view);
		var tag = ""
			tag = '<div class="_title">まとめて編集</div>'
		v.header.html(tag);
		
			tag = ''
			tag += '<div class="_read">ページ情報を一括で編集できます。ディレクトリはこの画面では編集できません。<br>'
			tag += '同一のディレクトリ名+ページ名にならないように入力してください。</div>'
			tag += '<div class="_replaceList"></div>'
		v.body.html(tag);
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
			tag += '<div class="_cms_btn _cms_btn_active blue _btn_do">変更する</div> ';
		v.footer.html(tag)
		
		v.replaceList = view.find('._replaceList');
		v.textarea	 = view.find('textarea');
		setBtn();
	}
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		view.find('._bg ,._btn_do').click(function(){ clickDone() });
		
		view.on("keyup","._in_id",function(){ 
			var s = FileInfo_CheckID.checkValidID($(this).val())
			$(this).parent().find("._anno").html(s);
		});
		
		view.on("click","._editFile_dir_wap",function(){ 
			var tar = $(this).find("._editFile_dir")
			var val = tar.data("path");
			DirListView.stageIn(val,function(_s){
				tar.data("path" ,_s);
				tar.text(_s);
			})
		});
	}
	
	/* ---------- ---------- ---------- */
	//データ表示
	
	
	function getVal(_i,_v,_id){
		if(_v[_id] ==undefined) _v[_id] = "";
		var uid = "_list_" + nodeList.length;
		var val = _v[_id];
		var tag = ""
		if(_id == "dir"){
			var dir = FileInfoU.getDirPath(_v);
			tag += '<div class="_editFile_dir_wap"><span class="_icon_dir"></span><span class="_editFile_dir" data-path="'+dir+'">' + dir + '</span></div>'
		}
		if(_id == "id"){
			tag += '<input class="_in_id '+uid+'" placeholder="">'
			tag += '<div class="_anno"></div>'
		}
		if(_id == "name"){
			tag += '<input class="_in_name '+uid+'" placeholder="ページ名">'
		}
		if(_id == "tag"){
			tag += '<i class="fa fa-tags "></i> '
			tag += '<input class="_in_tag '+uid+'" list="tagDatalist" placeholder="国際,経済,スポーツ">'
		}
		if(_id == "date"){
			var dd = DateUtil.getFormattedDate(new Date(),"YYYY/MM/DD");
			tag += '<i class="fa fa-clock-o"></i> '
			tag += '<input class="_in_date '+uid+'" placeholder="'+dd+'">'
		}
		nodeList.push([uid,val]);
		return tag;
	}
	
	var listTags;
	function getDD(_item,_deep,_i){
		var tag = "";
		var ddD = ""
		var ddP = ""
		if(_deep != 0){
			for (var i = 1; i <  _deep ; i++) {
				ddD += "│";
				ddP += "│";
			}
			ddD += "├ ";
			ddP += "├ ";
		}
		if(_item.type == Dic.ListType.DIR){
			tag +='	<tr class="_item _dir level-'+_deep+'">'
			tag += '	<th data-no="'+_i+'">'+(_i+1)+'</th>' 
			tag += '	<td>'
			tag += '	<table><tr>'
			tag += '		<td><span class="_tree">' +ddD + '</span> </td>'
			tag += '		<td><i class="fa fa-folder-open fa-lg"></i> </td>'
			tag += '		<td><b>' + _item.name + '</b></td>'
			tag += '	</tr></table>'
			tag += '	</td>'
			tag += '</tr>'
		}

		if(_item.type == Dic.ListType.PAGE){
			tag +='	<tr class="_item _page">'
			tag += '	<th data-no="'+_i+'">'+(_i+1)+'</th>' 
			tag += '	<td>'
			tag += '	<table><tr>'
			tag += '	<td><span class="_tree">' +ddP + '</span> </td>'
			tag += '	<td><i class="fa fa-file-text fa-lg"></i> </td>'
			tag += '	<td>' + getVal(_i,_item,"name") + '</td>'
			tag += '	<td style="background:#e7ebf2;">'
			tag += '		<table>';
			tag += '			<tr>';
			tag += '				<td>'+getVal(_i,_item,"dir") +'</td>';
			tag += '				<td>'+getVal(_i,_item,"id")+'</td>';
			tag += '				<td>.html</td>';
			tag += '			</tr>';
			tag += '		</table>';
			tag += '	<td>' + getVal(_i,_item,"tag") + '</td>'
			tag += '	<td>' + getVal(_i,_item,"date") + '</td>'
			tag += '	</tr></table>'
			tag += '</tr>'
		}
		if(_item.type == Dic.ListType.HTML){
		}
		
		listTags.push(tag);
		mapTable.push(_item);
		cnt++;
	}
	
	var cnt
	function getList(_list,_deep){
		var d = new Date();
		for (var i = 0; i <  _list.length ; i++) {
			getDD(_list[i],_deep,cnt);
			if(_list[i].type==Dic.ListType.DIR){
				getList(_list[i].list , _deep+1);
			}
		}
	}

	/* ---------- ---------- ---------- */
	
	var nodeList = [];
	var mapTable;
	var param;
	function update(_param){
		param = _param;
		//
		cnt = 0;
		mapTable = [];
		listTags = [];
		listTags.push('<table class="_mainList">');
		if(param.id == "sitemap_root"){
			getList(param.list,0);
		} else{
			getList([param],0);
		}
		listTags.push('</table>');
		v.replaceList.html(listTags.join("\n"));
		
		for (var i = 0; i <  nodeList.length ; i++) {
			v.replaceList.find("." + nodeList[i][0]).val(nodeList[i][1]);
		}
	}
	
	/* ---------- ---------- ---------- */
	//データ書き出し
	
	function clickDone(){
		if(window.isLocked(true))return;
		//
		changeFileNameList = [];
		getData();
		callback(param,changeFileNameList);
		stageOut()
	}
	function getData(){
		v.table = view.find("table._mainList");
		v.tr = v.table.find("tr._item")
		v.tr.each(function (index, dom) {
			getTRDat($(this))
		});
	}
	var changeFileNameList = []
	function getTRDat(_tar){
		var uid = Number(_tar.find("th").data("no"));
		if(mapTable[uid].type == Dic.ListType.PAGE){
			//DIR & ID
			var dir = FileInfoU.getDirVal(_tar.find("._editFile_dir").data("path"));
			var id = _tar.find("input._in_id").val();
			var b = false;
			if(dir != mapTable[uid].dir) b = true;
			if(id != mapTable[uid].id) b = true;
			if(b){
				changeFileNameList.push({
					old_: {
						dir: mapTable[uid].dir,
						id: mapTable[uid].id
					},
					new_: {
						dir: dir,
						id: id
					}
				})
			}
			mapTable[uid].dir = dir
			mapTable[uid].id 		= _tar.find("input._in_id").val();
			mapTable[uid].name 		= _tar.find("input._in_name").val();
			mapTable[uid].tag 		= _tar.find("input._in_tag").val();
			mapTable[uid].date 		= _tar.find("input._in_date").val();
			if(mapTable[uid].tag == "") delete mapTable[uid].tag
			if(mapTable[uid].date == "")  delete mapTable[uid].date
		}
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_param,_callback){
		if(! isOpen){ isOpen = true;
			showModalView(this);
			callback = _callback
			view.show();
			if(isFirst){createlayout();}
			isFirst = false;
			update(_param);
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			hideModalView();
			view.hide();
			//
			nodeList = [];
			v.replaceList.empty()
		}
	}
	function resize(){
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut,resize:resize }
})();