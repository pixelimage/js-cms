
InspectView.FormU_Heading = (function(){
	var view 
	var v = {} 
	
	var currentVal = ""
	function setNode(_view,_val){
		view = _view;
		currentVal = _val;
		v.select = $(createSelectText(listHeading,_val));
		view.find("._selectArea").append(v.select);
		
		view.find("._btn_heading").click(function(){
			var tar = view.find("input._in_data_H_Type");
			var s = $(this).data("id");
				tar.val(s).keyup();
			var s2 = $(this).text();
				view.find("._selectBox ._name span").html(s2)
			updateView(s);
		});
	}
	
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	function updateView(_s){
		currentVal = _s;
	
		var views = view.find("._btn_heading");
			views.removeClass("_active");
			views.each(function (index, dom) {
				var id = $(this).data("id");
				if(currentVal == id) $(this).addClass("_active");
			});
	}
	/* ! ----------  ---------- ---------- ---------- ---------- */
	
	var listHeading = [
		["h1" ,"<span>タイトル＜H1＞</span>","1"],
		["h2" ,"<span>大見出し＜H2＞</span>","0"],
		["h3" ,"<span>中見出し＜H3＞</span>","0"],
		["h4" ,"<span>小見出し＜H4＞</span>","0"],
		["h5" ,"<span style='font-size:10px;margin-top:10px'>小見出し2＜H5＞</span>","0"],
		["h6" ,"<span style='font-size:10px;'>小見出し3＜H6＞</span>","0"]
	];

	function createSelectText (_vars,_current){
		if(!_current)return "";
		var a = _current.split(" ");
		var tag = '<div class="_selectBox">'
			tag += '<div class="_name"><span>{NAME}</span> <i class="fa fa-sort " style="color:yellow"></i></div>'
			tag += '<div class="_list">'
		for (var i = 0; i < _vars.length ; i++) {
			var seld = "";
			for (var ii = 0; ii < a.length ; ii++) {
				if(_vars[i][0] == a[ii]) {
					seld = "_active"
				}
			}
			tag += '<div class="_btn_heading _btn_' + _vars[i][0] + " "+ seld  +'" data-id="'+_vars[i][0]+'" >'+_vars[i][1]+'</div>';
		}
			tag += "</div>";
			tag += "</div>";
			
		var seld = "";
		for (var i = 0; i < _vars.length ; i++) {
			if(_vars[i][0] == _current) {
				seld = _vars[i][1];
			}
		}
			tag = tag.split("{NAME}").join(seld);
		return tag;
	}
	
	return { 
		setNode:setNode
	}
})();
