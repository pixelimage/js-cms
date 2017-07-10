
var FreeLayoutInfoView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#FreeLayoutInfoView');
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v.inner = $('<div class="_inner"></div>');
		view.append(v.inner)
		
		var tag = ""
			tag += '<div class="_item _item_edit" data-action="dClick">'+TIP2("#+Enter")+'<span class="_block_btn">'+Dic.I.Edit+'</span> ブロックを編集</div>';
			tag += '<div class="_items">';
			tag += '	<div class="_item-title">ブロックのコピペ</div>';
			tag += '	<div class="_item-body">';
			tag += '		<div class="_item" data-action="copyCurrent">'+TIP2("#+C")+'<i class="fa fa-copy"></i> コピー</div>';
			tag += '		<div class="_item" data-action="cutCurrent">'+TIP2("#+X")+'<i class="fa fa-cut "></i> カット</div>';
			tag += '		<div class="_item" data-action="pastCurrent">'+TIP2("#+V")+'<i class="fa fa-clipboard "></i> ペースト</div>';
			tag += '		<div class="_item" data-action="pastCurrent2">'+TIP2("#+Shift+V")+'<i class="fa fa-clipboard "></i> 上書きペースト</div>';
			tag += '	</div>';
			tag += '</div>';
			tag += '<div class="_item" data-action="duplicateCurrent">'+TIP2("#+D")+'<i class="fa fa-copy"></i> ブロックを複製</div>';
			tag += '<div class="_items">';
			tag += '	<div class="_item-title">ブロックの移動</div>';
			tag += '	<div class="_item-body">';
			tag += '		<div class="_item" data-action="moveTopCurrent"><i class="fa fa-angle-double-up "></i>  一番上へ</div>';
			tag += '		<div class="_item" data-action="moveUpCurrent">'+TIP2("#+↑")+'<i class="fa fa-angle-up "></i>  ひとつ上へ</div>';
			tag += '		<div class="_item" data-action="moveDownCurrent">'+TIP2("#+↓")+'<i class="fa fa-angle-down "></i> ひとつ下へ</div>';
			tag += '		<div class="_item" data-action="moveBottomCurrent"><i class="fa fa-angle-double-down "></i>  一番下へ</div>';
			tag += '	</div>';
			tag += '</div>';
			tag += '<div class="_item " data-action="editJSON">{<i class="fa fa-ellipsis-h "></i>} 直接編集-JSON</div>';
			tag += '<div class="_item " data-action="addToMyBlock"><i class="fa fa-plus-circle "></i> Myブロック登録</div>';
			tag += '<div class="_item" data-action="deleteCurrent">'+TIP2("#+DELL")+'<i class="fa fa-times-circle " style="color:red"></i> ブロックを削除</div>';
			tag += '<div class="_note">●操作ヒント<br>'
			tag += '<b>編集</b>：Ctrl-Enter or ダブルクリック<br>'
			tag += '<b>選択変更</b>：[↑][↓]<br>'
			tag += '<b>移動</b>：ドラッグ<br>';
			tag += '</div>';
		v.inner.html(tag);
		
		v.item_edit = view.find("._item_edit");
		v.item = view.find("._item");
		v.item.click(function(){
			if($(this).hasClass("_disable"))return;
			var ac = $(this).data("action");
			tar.click();
			if(window.sc[ac]) window.sc[ac]();
			stageOut()
		})
		view.hover(
			function(){  },
			function(){ stageOut()}
		)
	}
	
	function setBtn(){
	}
	
	
	/* ---------- ---------- ---------- */
	var tar 
	function update(_view,_type){
		tar = $(_view);
		
		var y = 0;
		if (CMS_StatusH < CMS_Status.mouseY + view.height() ) {
			y = CMS_StatusH - view.height() - 20 + "px";
		} else{
			y = CMS_Status.mouseY-10 + "px"
		}
		if(CMS_Status.mouseY + view.height() +10);
		
		view.css({
			left: CMS_Status.mouseX-10 + "px",
			top: y
		});
		
		var cs = tar.attr("class");
		if(cs.indexOf("_freeLayoutTable") != -1 || cs.indexOf("_freeLayoutDiv")  != -1){
			v.item_edit.addClass("_disable");
		} else {
			v.item_edit.removeClass("_disable");
		}
		
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(_view,_type){
		view.show();
		if(isFirst){
			createlayout();
		}
		isFirst = false;
		
		update(_view,_type)
	}
	
	function stageOut(){
		view.hide();
		tar = null;
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut }
})();
