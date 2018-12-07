/**
 * フリーレイアウトビュー
 * コンポジットクラスになっており、
 * FreeLayoutか、FreeLayoutColsしか、使用しない
 * 
 * オブジェクト要素をクリックで、SubPageViewを開く
 */

EditableView.FreeLayout  = (function() {
	/* ---------- ---------- ---------- */
	var c = function() {
	  this.init();
	}
	var p = c.prototype;
	/* ---------- ---------- ---------- */
	
	p.isDragable = false;
	p.currentEditDetailNo = 0;
	
	p.init 			 = function() {
		this.v = {};
		this.isDragable = false;
		this.currentEditDetailNo = 0;
	}
	
	/* ---------- ---------- ---------- */
	//#registParent
	
	p.registParent 	 = function(_parent,_parentView,_pageParam,_deep){
		this.parent = _parent;
		this.parentView = _parentView;
		this.pageParam = _pageParam;
		this.deep = (_deep == null) ? 0:_deep;
		
	}
	
	/* ---------- ---------- ---------- */
	
	p.getData 	 	 = function (){
		return this.gridData.getRecords();
	}
	p.getDataAt 	 = function (_n){
		return this.gridData.getRecordAt(_n);
	}
	p.addData  		 = function (_type,_param){
		var o = PageElement_Util.getInitData(_type,_param);
		this.gridData.addRecord(o);
		this.update();
		this.parent.updateSubData();
	}
	p.addDataAt 	 = function (data,_n){
		this.gridData.addRecordAt(data,_n);
	}
	p.changeData 	 = function (data,no){
		this.gridData.overrideRecordAt(data,no);
		this.parent.updateSubData();
	}
	// p.historyData
	p.removeData 	  = function (no){
		this.gridData.removeRecordAt(no);
		this.update();
		this.parent.updateSubData();
		InspectView.stageOut();
		this.select(no);
	}
	p.duplicateData   = function (no){
		this.gridData.duplicateAt(no);
		this.update();
		this.parent.updateSubData();
		this.select(no+1);
	}
	
	/* ---------- ---------- ---------- */
	//#要素の移動
	
	p.canMove 	 	 = function (targetNo,_move){
		return (this.gridData.isValidArge(targetNo,_move));
	}
	p.moveData 	 	 = function (targetNo,_move){
		this.gridData.moveRecord(targetNo,_move);
		
		var t0 = this.v.replaceView.find('> *').eq(targetNo*2);
		var t1 = this.v.replaceView.find('> *').eq(targetNo*2+1);
		var t2 = this.v.replaceView.find('> *').eq(_move*2+1);
		t2.after(t1)
		t0.after(t2)
		
		var n1 = t1.attr("data-no");
		var n2 = t2.attr("data-no");
		
		t1.attr("data-no",n2)
		t2.attr("data-no",n1)
		this.parent.updateSubData();
	}
	//20150527 最初と最後に移動を追加
	p.moveDataToFirst = function (targetNo){
		var _move = this.gridData.moveRecordToFirst(targetNo);
		this.update();
		this.select(_move);
		this.parent.updateSubData();
		return _move;
	}
	p.moveDataLast = function (targetNo){
		var _move = this.gridData.moveRecordToLast(targetNo);
		this.update();
		this.select(_move);
		this.parent.updateSubData();
		return _move;
	}
	
	p.initData  	 = function (_data,_no){
		this.no = _no;
		this.type = _data.type;
		this.attr = _data.attr;
		this.extra = _data.extra;
		
		this.gridData = new EditableView.GridClass();
		this.gridData.initRecords(_data.data);
		this.setInitView();
		this.update();
	}
	p.setInitView 	 = function (){
		var self = this;
		if(this.deep > 0 && this.parent.type == "layout.div") this.isDragable = true;
		if(this.deep > 0 && this.parent.type == "replace.div") this.isDragable = true;
		//
		var className = "";
		var rootStyle = ""
		// var title = "";
		if(this.deep == 0){
			//ルートDIV時
			this.parent.setFreeLayout(this)
			className = "_freeLayoutRoot";
			
			//編集幅を指定
			rootStyle += CMS_SizeManager.getContentsWidth(this.pageParam.type);
			AddElementsManager.setData(this,this.getData().length-1)
			
			//コンテクストメニュー
			var ts = '._freeLayout,._freeLayoutDiv,._freeLayoutTable,._freeLayoutCols'
			this.parentView.on('contextmenu',ts,function(){
				if(window.isPressCommandKey)return;
				FreeLayoutInfoView.stageIn(this);
				$(this).click()
				return false;
			})
				
		} else{
			if(this.parent.type != "layout.cols"){
				className = "_freeLayoutDiv _freeLayoutToggle"
			} else{
				className = "_freeLayoutCols";
			}
		};
		
		//入力ID名やブロック出力のタグを取得
		var blockInfo = (function(_deep,_attr,_class){ 
			if(_deep == 0) return "";
			if(_class.indexOf("_freeLayoutDiv") != -1) return CMS_BlockAttrU.getMarkTag(_attr,true)
			return ""
		})(this.deep,this.attr,className);
		
		var _style = (function(_ex,_attr,_root){ 
			var _bg = CMS_ImgBlockU.getBgStyle(_ex);
			var _input = CMS_BlockAttrU.get_style(_attr) ;
		    return _bg + " " + _input + " " + _root;
		})(this.extra, this.attr, rootStyle);
		
		var _class	 = CMS_BlockAttrU.get_class(this.attr);
		var _aliasId  = CMS_BlockAttrU.get_id(this.attr);
			_aliasId  = (_aliasId) ? "_alias_" + _aliasId :"";
		
		if(this.parent.type != "layout.cols"){
			var tag = "";
				tag += '<div class=" '+className+" " +_aliasId+'" data-no="'+this.no+'">';
				tag += '<div class="cms-layout _replaceArea ' + _class + '" style="' + _style + '"></div>';
				tag += blockInfo;
				// tag += (!this.isDragable) ? "": ;
				if (this.isDragable) {
					tag += '<span class="_btn_delete"></span>'
					if(this.deep == 1){
						if(this.attr.narrow){
							tag += '<span class="_block_toggle _block_toggle_close"></span>';
						} else{
							tag += '<span class="_block_toggle"></span>';
						}
					}
				}
				tag += '</div>';
			this.view = $(tag);
			this.parentView.append(this.view);
			
			this.v.replaceView  = this.view.find('> ._replaceArea');
			this.view.find(' > ._btn_delete').click(function(){
				$(this).parent().click();
				InspectView.doCommand("delete");
			});
			
			this.view.find(' > ._block_toggle').click(function(){
				$(this).parent().click();
				$(this).toggleClass("_block_toggle_close");
				InspectView.doCommand("toggle");
			});
			//コンテナブロック ボタン
			this.view.on('click','._block_info ._btn',function(){
				$(this).parent().parent().parent().click();
				InspectView.doCommand($(this).data("command"),$(this).data("extra"));
			});
			
			//Myタグ定義 表示切り替え
			// this.view.on('click','._block_info ._replace_id',function(){
			// 	$(this).parent().parent().parent().parent().toggleClass("_cms_replace_open");
			// });
		} else{
			this.view = this.parent.v.replaceView.eq(this.no);
			this.view.attr("style", _style);
			this.view.attr("class", this.view.attr("class") + " " + _class);
			this.v.replaceView = this.parent.v.replaceView.eq(this.no);
		}
	}
	
	/* ---------- ---------- ---------- */
	//#update
	p.update 		 = function (){
		var self = this;
		var list = this.gridData.getRecords();
		this.v.replaceView.html("");
		
		//createViews
		for (var i = 0; i < list.length ; i++) {
            if(list[i] !== null){
				this.v.replaceView.append(DragController.getDropTag(i));
				
				var targetReplaceV = this.v.replaceView
				if(this.v.replaceView.length >1){
					targetReplaceV = this.v.replaceView.eq(i);
				}
				var type = list[i].type;
				if (type == "layout.div" || type == "replace.div" ) {
					var node = new EditableView.FreeLayout();
						node.registParent(this,targetReplaceV,this.pageParam,this.deep +1);
						node.initData(list[i],i);
						node.view.click(function(event){
							event.stopPropagation();
							InspectView.setPageData(this.pageParam);
							InspectView.setData("layout.div",$(this) , self ,null, $(this).find("> div").eq(0));
						});
				} else if(type == "layout.cols"){
					var node = new EditableView.FreeLayoutCols();
						node.registParent(this,targetReplaceV,this.pageParam,this.deep +1);
						node.initData(list[i],i);
						node.view.click(function(event){
							event.stopPropagation();
							InspectView.setPageData(this.pageParam);
							InspectView.setData("col", $(this), self, $(this), $(this).find("> div").eq(0));
						});
				} else {
					var _free = PageElement_Util.getPreview(list[i]);
						_free = HTMLServiceU.getReplacedHTML(_free,this.pageParam,type,false);
						
					var tag = ""; 
						tag += '<div class="_freeLayout '+'" data-no="'+i+'">';
						tag += 		_free;
						tag += 		CMS_BlockAttrU.getCommandTag(type);
						tag += 		CMS_BlockAttrU.getMarkTag(list[i].attr,true);
						tag += '	<span class="_btn_delete"></span>'
						tag += '</div>';
					try{
						this.v.replaceView.append(tag);
					}catch( e ){
						this.v.replaceView.append(CMS_E.PARSE_ERROR);
					}
				}
			}
		}
		
		this.v.replaceView.append(DragController.getDropTag(list.length));
		
		//クリック
		this.v.freeLayout = this.v.replaceView.find('> ._freeLayout');
		this.v.freeLayout.bind("click",function(event){
			var this_ = $(this);
			InspectView.setPageData(self.pageParam);
			InspectView.setData("object",this_ , self ,this_ ,this_.find("> * ").eq(0));
			return false;
		});
		this.v.freeLayout.bind("dblclick",function(event){
			var this_ = $(this);
			InspectView.setPageData(self.pageParam);
			InspectView.setData_DoubleClick("object",this_ , self ,this_ ,this_.find("> * ").eq(0));
			return false;
		});
		//削除
		this.v.freeLayout.find('._btn_delete').bind("mouseup",function(){
			$(this).parent().click();
			InspectView.doCommand("delete");
		});
		this.v.freeLayout.on('click','._block_command ._btn',function(){
			$(this).parent().parent().click();
			InspectView.doCommand($(this).data("command"));
		});
		this.v.freeLayout.on('click','._block_info ._btn',function(){
			$(this).parent().parent().parent().click();
			InspectView.doCommand($(this).data("command"),$(this).data("extra"));
		});
		
		/* ---------- ---------- ---------- */
		
		//ドラッグ
		if(this.isDragable){
		DragController.setDrag(this.parent,this.view,DragController.FREE_DROP); 
		}
		DragController.setDrag(this,this.v.replaceView.find("> ._freeLayout"),DragController.FREE_DROP);
		DragController.setDrop(this,this.v.replaceView.find("> ._dropArea"),DragController.FREE_DROP);
		//
		this.updateSubData();
	}
	p.updateSubData  = function(){
		this.parent.updateSubData();
	}
	
	/* ---------- ---------- ---------- */
	//#グリッドエディタ表示管理
	//フリーレイアウトで、表組をクリックして編集画面を開くなど
	
	p.showInlineGridEditor = function(no,_subPageType){
		currentEditDetailNo = no;
		var record = this.gridData.getRecordAt(no);
		this.detailNo = no;
		this.detailView = null;
		this.detailView = new EditableView.SubPageView();
		this.detailView.setObjectType(_subPageType);
		this.detailView.registParent(this);
		this.detailView.createView();
		this.detailView.initData(record.data);
		this.detailView.stageIn();
	}
	p.hideInlineGridEditor = function(_updated){
		if(! _updated) return;
		var _array = this.detailView.getData();
		var record = this.gridData.getRecordAt(currentEditDetailNo);
		record.data = _array;
		
		this.gridData.overrideRecordAt(record,this.detailNo);
		this.update();
		this.parent.updateSubData();
		this.select(this.detailNo);
	}
	
	/* ---------- ---------- ---------- */
	//
	p.selectNodeNext = function(_n){
		this.select(_n);
	}
	p.select = function(_n){
		try{
		var tar = this.v.replaceView.find('> *').eq(_n*2+1);
			tar.trigger("click");
			currentTop = tar.offset().top;
		}catch( e ){
			currentTop = 0;
		}
	}
	return c;
})();
