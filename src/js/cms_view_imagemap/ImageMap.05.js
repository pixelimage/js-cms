
ImageMap.LayersView = (function(){
	var view;
	var v = {};
	
	/* ---------- ---------- ---------- */
	//初期化
	
	function init(_view){
		view = _view;
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	//レイアウト作成・イベントアサイン
	
	function createlayout(){ }

	function setBtn(){ }
	
	/* ---------- ---------- ---------- */
	
	function reset(){
		
	}
	
	/* ---------- ---------- ---------- */
	
	var items
	var layers
	function update(_items){
		items = _items;
		layers = [];
		view.empty();
		var leng = items.length
		for (var i = leng-1; i >= 0  ; i--) {
			var layer = new ImageMap.LayerClass();
				layer.setData(items[i],i);
			view.append(layer.getView());
			layers.push(layer);
		}
	}
	
	/* ---------- ---------- ---------- */

	var currentLayer;
	var currentItem;
	function selectedItem(_select){
		if(currentLayer) currentLayer.unselect();
		var leng = items.length;
		for (var i = 0; i < leng ; i++) {
			if(items[i] == _select){
				if(layers[(leng-1)-i]){
					currentLayer = layers[(leng-1)-i];
					currentLayer.select();
					currentItem = _select;
					currentItem.layer = currentLayer;
				}
			} 
		}
	}
	
	return {
		init:init,
		reset:reset,
		update:update,
		selectedItem:selectedItem
	}
})();


/* ---------- ---------- ---------- */

