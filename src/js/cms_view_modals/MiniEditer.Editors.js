
MiniEditer.Editors = (function(){
	var view;
	var v = {};
	
	function init(_parentView){
		view = $('<div class="_textarea"></div>');
		_parentView.append(view);
	}
	
	var editors = {}
	var callback;
	
	var prevEditor;
	var currentEditor;
	var initTID;
	function setData(_s,_type,_callback){
		callback = _callback;
		
		if(currentEditor)currentEditor.stageOut()
		if(! editors[_type]){
			var t = _type.split(":")[1];
			if(_type.indexOf("input:") != -1){
				currentEditor = new MiniEditer.InputView(view,t);
			} else{
				//multi,table
				currentEditor = new MiniEditer.CodeView(view,t);
			}
			editors[_type] = currentEditor;
		} else{
			currentEditor = editors[_type];
		}
		
		//データセット時のアップデートをスルーする処理
		var isUpdateable = false;
		if(initTID) clearTimeout(initTID);
		initTID = setTimeout(function() {
			isUpdateable = true;
		}, 100);

		currentEditor.stageIn();
		currentEditor.setData(_s,function(_s){
			if(!isUpdateable) return;
			callback(_s);
		});
		
		resize();
		
	}
	
	var currentH = 150;
	function resize(_h){
		if(_h) currentH = _h;
		currentEditor.resize(currentH);
	}
	
	return {
		init: init,
		setData: setData,
		resize: resize
	}
})();