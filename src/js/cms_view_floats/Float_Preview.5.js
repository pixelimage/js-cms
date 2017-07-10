
var Float_PreviewFrame = (function() {
	/* ---------- ---------- ---------- */
	var c = function(_type,_parent,_pageModel) {
	  this.init(_type,_parent,_pageModel);
	}
	var p = c.prototype;
	
	/* ---------- ---------- ---------- */

	p.init = function(_type,_parent,_pageModel) {
		this.type = _type;
		this.parentView = _parent;
		this.pageModel = _pageModel;
		this.id = this.pageModel.id
		this.dir = this.pageModel.dir
		
		this.view = $('<div></div>')
		this.parentView.append(this.view);
	}

	p.prevPub
	p.resetDate = function() {
		this.prevPub = DateUtil.getRandamCharas(10);
	}
	p.update = function() {
		if (this.type == Dic.ListType.DIR) this.update_dir()
		if (this.type == Dic.ListType.PAGE) this.update_page()
	}
	p.update_dir = function() {
		var tag =  '';
			tag += '	<div class="_title">{NAME}</div>'
			tag += '	<div><span class="_m">グループID : </span><span class="_gID"><i class="fa fa-folder-open"></i>{ID}</span></div>'
		
		var tempP = {
			name	:this.pageModel.name,
			id		:this.id,
			dir		:this.dir,
			prevPub	:""
		}
		this.view.html( Float_Preview.DoTemplate( tag , tempP ));
	}
	p.update_page = function() {
		if(this.prevPub == this.pageModel.publicDate ) return;
		this.prevPub = this.pageModel.publicDate;
		
		this.url = CMS_Path.PAGE.getRelPath(this.id,this.dir);//IDとして利用してるので必要
		
		var tag =  '';
			tag += '<div class="_infoArea">'
			tag += '	<div class="_title">{NAME}</div>'
			tag += '	<div class="_filePath_blue">{URL_ABS}</div>'
			tag += '	<div class=""><span class="_m">所属グループID\'s : </span>{G}</div>'
			// tag += '	<div class="_frame"><iframe width="1100" height="1000" src ="{URL_R}" ></iframe></div>'
			tag += '	<div class="_date _dark"><span class="_m"><i class="fa fa-clock-o"></i> 保存日時：</span>{SAVE_DATE}</div>'
			tag += '	<div class="_date _dark"><span class="_m"><i class="fa fa-clock-o"></i> 公開日時：</span>{PUB_DATE}</div>'
			tag += '</div>'
			tag += this._getIFrames();
		
		var tempP = { name :this.pageModel.name, id :this.id, dir :this.dir, prevPub :this.prevPub }
		this.view.html( Float_Preview.DoTemplate( tag , tempP ));
	}
	
	p._getIFrames = function() {
		var currentWs = FloatPreviewState.currentWs
		var s = FloatPreviewState.currentZoom /100;
		
		var ww = 0;
		for (var i = 0; i < currentWs.length ; i++) {
			ww += currentWs[i] * s;
		}
		var tag =  '';
			tag += '	<div class="_iframeArea" style="width:'+ww+'px">'
		for (var i = 0; i < currentWs.length ; i++) {
			var temp = '';
				temp += '<div class="_iframeDiv" style="width:{WW}px;" >';
				temp += '	<iframe src="{URL_R}" width="{W}" height="100%" style="{S}"></iframe>';
				temp += '</div>';
				// temp = temp.split("{U}").join(this.loadURL);
				temp = temp.split("{WW}").join(currentWs[i]*s);
				temp = temp.split("{W}").join(currentWs[i]);
				temp = temp.split("{S}").join(this._getZoomCSS(s));
			tag += temp;
		}
			tag += '	</div>'
		return tag;
	}
		
	p._getZoomCSS = function(s) {
		var ts = '';
			ts +="-webkit-transform: scale("+s+");"
			ts +="-moz-transform: scale("+s+");"
			ts +="-ms-transform: scale("+s+");"
			ts +="transform: scale("+s+");"
			ts += "width:"+(100/s)+"%;";
			ts += "height:"+(100/s)+"%;";
		return ts;
	}
	

	p.reset = function() {
		this.prevPub = null;
		this.view.html("")
	}
	
	p.updateWS_State = function() {
		this.update();
	}
	
	/**/
	p.openFlg = false;
	p.stageInit=function(){
		this.openFlg = false
		this.view.hide()
	}
	p.stageIn=function( ) {
		if (! this.openFlg) { this.openFlg = true;
			this.view.show();
			this.update();
		}
	}
	p.stageOut=function( )  {
		if (this.openFlg) { this.openFlg = false
		this.view.hide()
		}
	}
	return c;
})();
