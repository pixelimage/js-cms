
EditableView.InputEvent = (function(){

	//イベントアサイン まとめて行う
	function assign (v,this_){
		EditableView.InputEventText.assign(v,this_);
		EditableView.InputEventImg.assign(v,this_);
	}
	return {
		assign:assign
	}
})();

EditableView.InputEventImg = (function(){

	//イベントアサイン まとめて行う
	function assign (v,this_){
		//画像
		v.on("click","._btn_image"			,function(){ _changeImage(		$(this).closest("._image_set"),this_) });
		v.on("click","._btn_image_t"		,function(){ _changeImage_t(	$(this).closest("._image_set"),this_) });
		v.on("click","._btn_image_list"		,function(){ _changeImage_list(	$(this).closest("._image_set"),this_) });
		v.on("click","._btn_image_mock"		,function(){ _changeImage_mock(	$(this).closest("._image_set"),this_) });
		v.on("click","._btn_image_delete"	,function(){ _changeImage_remove($(this).closest("._image_set"),this_) });
		v.on("click","._btn_image_layout"	,function(){ _changeImage_layout($(this).closest("._image_set"),this_) });
		v.on("click","._btn_mode_simple"	,function(){ _changeImage_Mode($(this),"simple") });
		v.on("click","._btn_mode_layout"	,function(){ _changeImage_Mode($(this),"layout") });
		v.on("keyup","._in_image_width"		,function(){ _changeImage_input($(this),$(this).closest("._image_set"),this_,"width") });
		v.on("keyup","._in_image_ratio"		,function(){ _changeImage_input($(this),$(this).closest("._image_set"),this_,"ratio") });

		// v.on("click","._btn_image_tag_ng"	,function(){ _changeImage_onlyImg($(this).closest("._image_set"),this_,false) });
		// v.on("click","._btn_image_tag_ac"	,function(){ _changeImage_onlyImg($(this).closest("._image_set"),this_,true) });

		// v.on("keyup","._in_image_ratio"		,function(){ _changeImage_input($(this),$(this).parent().parent().parent().parent().eq(0),this_,"ratio") });
	}

	//画像の変更。モーダル
	function _changeImage  (_this,this_){
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);
		if(val.mode == "simple"){
			_changeImage_list(_this,this_);
		} else{
			_changeImage_layout(_this,this_);
		}
	}
	function _changeImage_list(_this,this_){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);

		if(DummyImageService.isMock(val.path)) val.path = CMS_Path.UPLOAD.ABS;
		//
		CMS_MainController.openAssetSelectRel("image", val.path ,function(_s){
			UpdateDelay.delay(function(){
				o[id].mode = "simple";
				o[id].path = _s;
				this_.changeData(o,no);
				//
				InputTagTempDatas.addData(uid, o[id])
				_changeImage_update(_this, o, id, o[id]);
			});
		});
	}
	function _changeImage_mock(_this,this_){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);

		if(DummyImageService.isMock(val.path) == false) val.path = "";
		DummyImageView.stageIn(val.path,function(_s){
			o[id].mode = "simple";
			o[id].path = _s;
			this_.changeData(o,no);
			//
			InputTagTempDatas.addData(uid, o[id])
			_changeImage_update(_this, o, id, o[id]);
		});
	}

	//画像の変更。prompt
	function _changeImage_t(_this,this_){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);

		var _s = prompt("画像URLを入力してください", val.path);
 		if(_s == val.path) return;
	 	if(_s == null) return;
	 	//
	 	o[id].path = _s;
	 	this_.changeData(o,no);
		//
		InputTagTempDatas.addData(uid, o[id]);
		_changeImage_update(_this, o, id, o[id]);
	}
	function _changeImage_remove(_this,this_){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);

	 	o[id].mode = "simple";
	 	o[id].path = "width:100,height:100";
	 	this_.changeData(o,no);
		//
		InputTagTempDatas.addData(uid, o[id]);
		_changeImage_update(_this, o, id, o[id]);
	}

	//レイアウト
	function _changeImage_layout(_this,this_){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);

		if(val.mode != "layout"){
			val.path = {};
		}
		ImageMapView.stageIn(val.path,function(_s){
			o[id].mode = "layout";
			o[id].path = _s;
			this_.changeData(o,no);
			//
			InputTagTempDatas.addData(uid, o[id])
			_changeImage_update(_this, o, id, o[id]);
		});
	}

	//画像変更後の共通処理
	function _changeImage_update(_this,_o,_id,_s){
		var imgTag = '<div class="_no-photo">画像未設定</div>'
		if(_s.path != ""){
			imgTag = CMS_ImgBlockU.getImageTag({
				path	: _s.path,
				isPub	: false,
				width	: "100%",
				ratio	: _s.ratio,
				alt		: "",
				attr	: ""
			});
		}
		$(_this).find("._btn_image").html(imgTag);
		$(_this).find("._btn_image_t").html(_s.path);
		_setEdited($(_this).parent(),_o,_id);
	}


	//幅とratio
	function _changeImage_input(_in,_this,this_,_type){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);

		var _s = _in.val();
		o[id][_type] = _s;
		this_.changeData(o,no);
		InputTagTempDatas.addData(uid, o[id]);
		_changeImage_update(_this, o, id, o[id]);
	}

	//モード切り替え（表示だけ）
	function _changeImage_Mode(_this,_mode){
		var parent = _this.parent().parent();
		if(_mode == "simple"){
			parent.find("._btn_mode_simple").addClass("_current")
			parent.find("._btn_mode_layout").removeClass("_current")
			parent.find("._body_img_simple").slideDown();
			parent.find("._body_img_layout").slideUp();
		} else{
			parent.find("._btn_mode_simple").removeClass("_current")
			parent.find("._btn_mode_layout").addClass("_current")
			parent.find("._body_img_simple").slideUp();
			parent.find("._body_img_layout").slideDown();
		}
	}

	//IMGタグのみ表示
	/*
	function _changeImage_onlyImg(_this,this_,_b){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);

		var parent = _this.parent().parent();
		if(_b){
			parent.find('._btn_image_tag_ac').hide();
			parent.find('._btn_image_tag_ng').show();
		} else{
			parent.find('._btn_image_tag_ac').show();
			parent.find('._btn_image_tag_ng').hide();
		}
	 	o[id].onlyImgTag = _b;
	 	this_.changeData(o,no);
	}*/

	 /* ! ---------- 共通 ---------- ---------- ---------- ---------- */

	 //セルを編集したら、背景を黄色くする
	function _setEdited (_view,_o,_id) {
		_view.addClass("_edited");

		//編集ステートをアップデートする グリッド再描画時に、編集ステートを引き継ぐ
		if(_o[CELL_TYPE.STATE] === undefined) _o[CELL_TYPE.STATE] = [];
		var editState = _o[CELL_TYPE.STATE]
		var b = false;
		for (var i = 0; i <  editState.length ; i++) {
			if(editState[i] == _id)b = true;
		}
		if(b == false) editState.push(_id);
	}
	function _getXY 		(_this){ return [ $(_this).offset().left +20, $(_this).offset().top - $(window).scrollTop() +20 ] }
	function _getDataNo 	(_this,this_){ return Number($(_this).attr("data-no")) }
	function _getDataID 	(_this,this_){ return $(_this).attr("data-id") }
	function _getDataVal 	(_this,this_){ return $(_this).attr("data-val") }
	function _getRecord 	(_this,this_,no){ return this_.gridData.getRecordAt(no) }

	return {
		assign:assign
	}
})();

EditableView.InputEventText = (function(){

	//イベントアサイン まとめて行う
	function assign (v,this_){

		//リンク
		v.on("click","._btn_anchor"			,function(event){ _changeA(this,this_,event) });
		v.on("click","._btn_textAnchor"		,function(event){ _changeBtn(this,this_,event) });

		//基本UI
		v.on("keyup","textarea"				,function(){ _changeInput(this,this_) });
		v.on("keyup","input"				,function(){ _changeInput(this,this_) });
		v.on("change","select"				,function(){ _changeInput(this,this_) });
		v.on("change","input.checkbox"		,function(){ _changeCheck(this,this_,$(this).prop("checked")) });

		//テーブルセル
		v.on("click","._editYYYYMMDD"		,function(){ _changeYYYYMMDD(this,this_) });
		v.on("click","._editableTD"			,function(){ _changeTableText(this,this_) });
		v.on("click","._editableTDHide"		,function(){ _changeTableText(this,this_,true) });
		v.on("click","._editableTD a" 		,function(event){ event.preventDefault(); });
	}

	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */

	//リンクの変更。モーダル
	function _changeA(_this,this_,event){
		event.stopPropagation();
		event.preventDefault();
		//
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);
		//
		Anchor_InputView.stageIn(val,function(_s){
			o[id] = _s;
			this_.changeData(o,no);
			InputTagTempDatas.addData(uid, _s)
			$(_this).html(CMS_AnchorU.getViewTag(_s,false));
			_setEdited($(_this).parent(),o,id);
		})
	}

	//ボタンの変更。モーダル
	function _changeBtn(_this,this_,event){
		event.stopPropagation();
		event.preventDefault();

		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var uid = _getDataVal(_this,this_);
		var val = InputTagTempDatas.getData(uid);
		//
		Anchor_BtnView.stageIn(val,function(_s){
			o[id] = _s;
			this_.changeData(o,no);
			InputTagTempDatas.addData(uid, _s)
			$(_this).html(CMS_AnchorU.getViewTag(_s,false));
			_setEdited($(_this).parent(),o,id);
		})
	}

	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */

	//<input>で値を変更
	function _changeInput(_this,this_){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		try{
			o[id] = $(_this).val();
			this_.changeData(o,no);
		}catch( e ){}
	}

	//checkboxで値を変更
	function _changeCheck(_this,this_,_checked){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var val = "";
		if(_checked) val = "1";
		try{
			o[id] = val;
			this_.changeData(o,no);
			_setEdited($(_this).parent(),o,id);
		}catch( e ){}
	}

	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */

	function _changeYYYYMMDD(_this,this_,_isHideCell){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var def = o[id];
		//
		Float_DateInputView.stageIn(def,function(_s){
			setTimeout(function(){
				o[id] = _s;
				this_.changeData(o,no);
				//
				_updateHTML($(_this),_s,_isHideCell);
				_setEdited($(_this).parent(),o,id);
			},200);
		},_getXY(_this) );

	}
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	/* ---------- ---------- ---------- */
	//グリッドセルの編集時の動作

	//tdで編集した場合（普通のセル） 改行は<BR>へ
	function _changeTableText(_this,this_,_isHideCell){
		var no = _getDataNo(_this,this_);
		var id = _getDataID(_this,this_);
		var o  = _getRecord(_this,this_,no);
		//
		var inputType = $(_this).attr("data-input");
		//
		var def = o[id];
		var type = inputType+ ":" + $(_this).attr("data-type");

		MiniEditer.stageIn(def,function(_s){
			o[id] = _s;
			this_.changeData(o,no);
			//
			var s = _s;
				s = CMS_TagU.deleteCellAttr(s);
				s = CMS_TagU.convertCellBR(s);
			_updateHTML($(_this),s,_isHideCell);
			_setEdited($(_this),o,id);
		}, type);
	}

	/* ---------- ---------- ---------- */

	 //セルを編集したら、表示をアップデートする
	function _updateHTML (_view,_val,_isHideCell) {
		var s = "";
		if(! _isHideCell) {
			s = _val;
		} else{
			s = EditableView.InputU.getTenten(_val);
		}
		try{
			_view.html(s);
		}catch( e ){
			_view.html(CMS_E.PARSE_ERROR);
		}
	}

	 /* ! ---------- 共通 ---------- ---------- ---------- ---------- */

	 //セルを編集したら、背景を黄色くする
	function _setEdited (_view,_o,_id) {
		_view.addClass("_edited");

		//編集ステートをアップデートする グリッド再描画時に、編集ステートを引き継ぐ
		if(_o[CELL_TYPE.STATE] === undefined) _o[CELL_TYPE.STATE] = [];
		var editState = _o[CELL_TYPE.STATE];
		var b = false;
		for (var i = 0; i <  editState.length ; i++) {
			if(editState[i] == _id)b = true;
		}
		if(b == false) editState.push(_id);
	}
	function _getXY 		(_this){ return [ $(_this).offset().left +20, $(_this).offset().top - $(window).scrollTop() +20 ] }
	function _getDataNo 	(_this,this_){ return Number($(_this).attr("data-no")) }
	function _getDataID 	(_this,this_){ return $(_this).attr("data-id") }
	function _getDataVal 	(_this,this_){ return $(_this).attr("data-val") }
	function _getRecord 	(_this,this_,no){ return this_.gridData.getRecordAt(no) }

	return {
		assign:assign
	}
})();


//グリッド編集時に、オブジェクトのような値を一時的に保存しておく
var InputTagTempDatas = (function(){
	var data = {};

	function addData(_id,_val){
		data[_id] = _val
	}
	function getData(_id){
		return data[_id]
	}

	function reset(){
		data = {}
	}
	function trace(){
		console.log(data);
	}

	return {
		addData : addData,
		getData : getData,
		reset : reset,
		trace:trace
	}
})();

