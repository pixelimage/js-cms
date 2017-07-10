	
var PresetStage_PageListView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(){
		view = $('#PresetStage_PageListView');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){
		var gloups = PRESET_PAGE_LIST;
		
		var tag = ''
			tag += '<div class="_header">'
			tag += '	<div class="_title">プリセット</div>'
			tag += '</div>';
			tag += '<div class="_inner _simple-scroll">';
			
		for (var g = 0; g < gloups.length ; g++) {
			tag += '<div class="_gloup_name">'+gloups[g].name+'</div>'
			var list = gloups[g].list;
			tag += '<div class="_page_items">'
			for (var i = 0; i < list.length ; i++) {
				var tar = list[i];
				var id = "_preset_list_" +tar.id;
				tag += '<div class="_item" id="'+id+'"+ data-id="'+tar.id+'" data-name="'+tar.name+'">';
				tag += '<i class="fa fa-file-text" style="margin:2px 2px 0 2px;"></i> ';
				tag +=  list[i].name;
				tag += '</div>';
			}
			tag += "</div>";
		}
			tag += "</div>";
			
		view.html(tag);
		
		v.item = view.find("._item"); 
		v.item.click(function(){
			var tar = $(this);
			openPage( tar.data("id") , tar.data("name") );
		});
		v.item.eq(0).click();
		
		setBtn();
	}

	function setBtn(){
	}
	
	/* ---------- ---------- ---------- */
	//個別処理
	var current 
	function openPage(_id,_name){
		var param =  {
			type: Dic.PageType.PRESET,
			dir: Dic.DirName.PRESET,
			id:_id, 
			name:_name
		}
		if(current){
			current.removeClass("_current")
		}
		current = view.find("#_preset_list_"+_id);
		current.addClass("_current");
		
		PresetStageView.openPage(param);
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
				createlayout();
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
