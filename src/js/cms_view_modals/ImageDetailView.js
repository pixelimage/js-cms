var ImageDetailView 	 = (function(){

	var view;
	var v = {};
	var baseDir = "../";
	//var targetDir = "images/oneday/";
	var targetDir = ""//"images/";
	
	function init(){
		view = $('#ImageDetailView');
		
		v.replaceArea = view.find('.body .replaceArea');
		var tag = '<div class="replacePath"></div>'
			tag += '<div class="clearfix">'
			tag += '	<div class="replaceDetail"></div>'
			tag += '	<input id="upload_image" type="file" name="image" enctype="multipart/form-data">'
			tag += "</div>";
		v.replaceArea.html(tag);
		
		v.replaceDetail = view.find('.replaceDetail');
		stageInit();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function setBtn(){
		view.find('._bg ,._btn_close').click(function(){ stageOut() });
		$('#upload_image').change(function() {
			$(this).upload(
		         CMS_Path.PHPH_UPLOAD_FILEPATH,
				_uploadFile_comp,
				'json'
			);
		});
	}
	function _uploadFile_comp(){
		alert(1)
	}
	
	function setVal(_val){
		var a_img = new Image();
		var p = _val.split("../").join("")
		    a_img.src = CMS_Path.SITE.URL + p;
		    a_img.onload = function(){
		   	 renderTag($(this).attr("src"))
		 };
		
	}
	function renderTag(_val){
		var tag = "";
		tag += '<p>'+_val+'</p>'
		tag += '<img src="'+_val+'">'
		v.replaceDetail.html(tag);
		setTimeout(function(){
			var tag = "<div>"
			tag += "幅 : " + v.replaceDetail.find("img").width() + " , "
			tag += "高さ : " + v.replaceDetail.find("img").height() + ""
			v.replaceDetail.append(tag) 
		}
		, 100);
	}
	
	function clickImage(_s){
		callback(_s);
		stageOut();
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	var callback = true;
	var currentPath = "";
	function stageInit(){
		view.hide();
	}
	function stageIn(_val,_callback){
		if(! isOpen){ isOpen = true;
			currentPath = _val;
			setVal(_val)			
			callback = _callback;
			view.show();
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}
	return { init:init, stageIn:stageIn, stageOut:stageOut
 }
})();//modal underconst