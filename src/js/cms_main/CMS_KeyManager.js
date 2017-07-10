//ショートカットキー管理

var CMS_KeyManager = (function(){
	var view;
	var v = {};
	var CK = 91;//17
	
	/* ---------- ---------- ---------- */

	function tooltip(_s,_d){
		var cmd = (Env_.isWin) ? "Ctrl": "Cmd";
		_s = _s.split("#").join(cmd);
		if(!_d){
			return ' data-ks-bottom="'+_s+'" ';
		}
		if(_d == "R"){
			return ' data-ks-right="'+_s+'" ';
		}
		if(_d == "T"){
			return ' data-ks-top="'+_s+'" ';
		}
		return ' ';
	}
	function tooltipT(_s){
		var cmd = (Env_.isWin) ? "Cmd": "Ctrl";
		return '<kbd>' + _s.split("#").join(cmd) + '</kbd>';
	}
	
	/* ---------- ---------- ---------- */

	function init(){
		
		window.TIP = tooltip;
		window.TIP2 = tooltipT;
		window.TIP_ENTER = TIP("#+Enter")
		//
		if(Env_.isWin ) CK = 17;
		window.isPressCommandKey = false;
		window.isPressShiftKey = false;
		$(document).keydown(function(event) {
			var KC = event.keyCode;
			//console.log(KC);
			var b = false;
			if(isPressCommandKey && isPressShiftKey){
				if(KC == 86){ b= true; do_("S_C_v");}//ペースト
			}
			
			if(isPressCommandKey && isPressShiftKey ==false){
				//ブロック操作のショートカットは、モーダルが表示されてないときだけ
				if(CMS_ModalManager.isNotModal()){
					if(editType == "" || editType == "preset"){
						if(KC == 68){ b= true; do_("C_d");}//複製
						if(KC == 67){ b= true; do_("C_c");}//コピー
						if(KC == 86){ b= true; do_("C_v");}//ペースト
						
						if(KC == 88){ b= true; do_("C_x");}//カット
						if(KC == 90){ b= true; do_("C_z");}//取り消し
						if(KC == 8 ){ b= true; do_("C_dell");}//削除
						if(KC == 73){ b= true; do_("C_i");}//プレビュートグル
						if(KC == 72){ b= true; do_("C_h");}//縮小表示
						
						if(KC == 37){ b= true; do_("C_left");}
						if(KC == 38){ b= true; do_("C_up");}
						if(KC == 39){ b= true; do_("C_right");}
						if(KC == 40){ b= true; do_("C_down");}
						if(KC == 109){ b= true; do_("C_minus");}
						if(KC == 107){ b= true; do_("C_plus");}
						if(KC == 13){ b= true; do_("C_Enter");}
						
						//保存とかはいつでも可能
						if(KC == 79){ b= true; do_("C_o");}//別ウィンドウで開く
						if(KC == 80){ b= true; do_("C_p");}//公開
						if(KC == 70){ b= true; do_("C_f");}//一覧ワイド表示
						
						//0,1-9
						if(KC == 49){ b= true; addBlock("tag.heading" ,"h1");}
						if(KC == 50){ b= true; addBlock("tag.heading" ,"h2");}
						if(KC == 51){ b= true; addBlock("tag.heading" ,"h3");}
						if(KC == 52){ b= true; addBlock("tag.heading" ,"h4");}
						if(KC == 53){ b= true; addBlock("tag.p");}
						if(KC == 54){ b= true; addBlock("tag.markdown");}
						if(KC == 55){ b= true; addBlock("tag.img");}
						if(KC == 56){ b= true; addBlock("tag.margin");}
						if(KC == 57){ b= true; addBlock("tag.btn");}
						if(KC == 48){ b= true; addBlock("layout.div");}
					}
				} else if( CMS_ModalManager.isModal() ){
					if(KC == 13){ b= true; do_("C_Enter_modal");}
				}
				//13...ENTER
				if(editType == "setting"){
					if(KC == 83){ b= true; do_("Se.C_s");}//保存
				} else if(editType == "preset"){
					if(KC == 83){ b= true; do_("Pre.C_s");}//保存
				} else {
					if(KC == 83){ b= true; do_("C_s");}//保存
				}
				if(KC == 76){ b= true; do_("C_l");}//更新ロック
				// if(KC == 91){ b= true; do_("C_t");}//タブ切り替え
			}
			// if(KC == 33){ b= true; do_("PAGE_UP");}
			// if(KC == 34){ b= true; do_("PAGE_DOWN");}
		
			if(!b){
				if(CMS_ModalManager.isNotModal()){
					if(editType == "" || editType == "preset"){
						if(KC == 38){ b= true; do_("up");}
						if(KC == 40){ b= true; do_("down");}
					}
				}
			}
			
			if(b){
				event.stopPropagation();
				event.preventDefault();
			}
			
			if(KC == CK){
				isPressCommandKey = true;
				if(CMS_ModalManager.isNotModal()){
				$("body").addClass("_pressCommandPage")
				}
			}
			if(event.shiftKey){
				isPressShiftKey = true;
			}
			if(KC == 122){
				do_("C_Full");
				return false;
			}
		});
		$(document).keyup(function(event) {
			var KC = event.keyCode;
			if(KC == CK){
				isPressCommandKey = false;
				$("body").removeClass("_pressCommandPage");
			}
			if(event.shiftKey == false){
				isPressShiftKey = false;
			}
		});
		
		registKey("PAGE_UP",function(){ })
		registKey("PAGE_DOWN",function(){ })
		
		registKey("Se.C_s"	,function(){ CMS_AssetStage.save(); })
		registKey("Pre.C_s"	,function(){ PresetStageView.save(); })
		
		registKey("C_s"		,function(){ CMS_PagesView.save(); })
		registKey("C_p"		,function(){ CMS_PagesView.publish(); })
		registKey("C_d"		,function(){ window.sc.duplicateCurrent(); })
		registKey("C_c"		,function(){ window.sc.copyCurrent(); })
		registKey("C_v"		,function(){ window.sc.pastCurrent(); })
		registKey("S_C_v"	,function(){ window.sc.pastCurrent2(); })
		registKey("C_x"		,function(){ window.sc.cutCurrent();})
		registKey("C_dell"	,function(){ window.sc.deleteCurrent(); })
		registKey("C_o"		,function(){ CMS_PagesView.openURL(); })
		
		registKey("C_i"		,function(){ CMS_PagesView.editMeta(); })
		
		registKey("C_z"		,function(){ CMS_PagesView.historyBack() })
		registKey("C_l"		,function(){ CMS_LOCK.setIsLocked_toggle() })
		registKey("C_left"	,function(){ CMS_PagesView_ZoomManager.zoomOut() })
		registKey("C_up"	,function(){ window.sc.moveUpCurrent() })
		registKey("C_right"	,function(){ CMS_PagesView_ZoomManager.zoomIn() })
		registKey("C_down"	,function(){ window.sc.moveDownCurrent() })
		
		registKey("up"		,function(){ window.sc.selectNodePrev() })
		registKey("down"	,function(){ window.sc.selectNodeNext() })
		registKey("C_Enter"	,function(){window.sc.dClick() })
		registKey("C_Enter"	,function(){enter();window.sc.dClick() })
		registKey("C_Enter_modal",function(){CMS_ModalManager.closeModal() })
		
		registKey("C_minus"	,function(){ })
		registKey("C_plus"	,function(){  })
		registKey("C_Full"	,function(){ window.editFullScreen() })
	}
	var keyOs = {}
	function registKey(_s,_callback){
		keyOs[_s] = _callback;
	}
	function do_(_s){
		if(keyOs[_s]){
			keyOs[_s]();
		}
	}
	function enter(){
		window.isFireEnterClick = true;
		var tID;
		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			window.isFireEnterClick = false;
		},100);
	}
	
	var editType = ""
	var isF = true;
	function setType(_s){
		editType = _s;
		// if(isF){
		// v.log = $('<div style="position:fixed;top:0;left:0;background:#fff;padding:5px;z-index:200000;">_cms_log</div>')
		// 	$("body").append(v.log)
		// 	isF = false;
		// }
		// v.log.html(editType);
	}
	
	return {
		init:init,
		registKey:registKey,
		tooltip:tooltip,
		setType:setType
	}
})();
