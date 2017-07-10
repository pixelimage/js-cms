
var DirTreeViewTest = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#DirTreeViewTest');
		stageInit();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v = ModalViewCreater.createBaseView(DirTreeViewTest,view);

		var tag = ""
			tag = '<div class="_title">ディレクトリ選択</div>'
		v.header.html(tag);
		
			tag = ""
			tag += '<div class="_replaceDir _dirTreeView"></div><br><br><br>'
			tag += '*********************************'
			tag += '<div class="_replaceDir1 _dirTreeView"></div><br><br><br>'
			tag += '*********************************'
			tag += '<div class="_replaceDir2 _dirTreeView"></div><br><br><br>'
			tag += '*********************************'
			tag += '<div class="_replaceDir3 _dirTreeView"></div>'
		v.body.html(tag);
		
		v.replaceDir = view.find('._replaceDir');
		v.replaceDir1 = view.find('._replaceDir1');
		v.replaceDir2 = view.find('._replaceDir2');
		v.replaceDir3 = view.find('._replaceDir3');
			
			tag = ""
			tag += '<div class="_cms_btn _btn_close">閉じる</div> ';
		v.footer.html(tag)
		
		v.btn_close = view.find('._btn_close');
		// createCheck();
		// setBtn();
		var tree = new DirTreeViewNode(
			v.replaceDir,null,0,
			{
				initDeep :1,
				def :{ path: "", name: ""},
				showCMSDir :true,
				showWriteDir :false,
				isClickNGDir :true,
				currentSelect :null,
				extentions :"",
				callback:function(s,_view){
					if(isLog) console.log(s);
				}
			}
		);
		window.openDIR = function(_s){
			// openDIR("../test_blog_rename/cgi/lib/");
			tree.setCurrent(_s)
		}
		
		var tree = new DirTreeViewNode(
			v.replaceDir1,null,0,
			{
				initDeep :1,
				def :{ path: "", name: ""},
				showCMSDir :true,
				showWriteDir :false,
				isClickNGDir :true,
				currentSelect :null,
				hideRootNode :true,
				extentions :"",
				hideDirs :["../_cms/","../_backup/","../html/","../__"],
				callback:function(s){
					if(isLog) console.log(s);
				}
			}
		);
		
		/* ---------- ---------- ---------- */

		var tree2 = new DirTreeViewNode(
			v.replaceDir2,null,0,
			{
				initDeep :1,
				def :{ path: "../html/", name: "html"},
				showCMSDir :true,
				showWriteDir :true,
				isClickNGDir :true,
				currentSelect :null,
				extentions :"",
				callback:function(s){
					if(isLog) console.log(s);
				}
			}
		);
		
		/* ---------- ---------- ---------- */
		var tree3 = new DirTreeViewNode(
			v.replaceDir3,null,0,
			{
				initDeep :1,
				def :{ path: "../uploads/", name: "uploads"},
				showCMSDir :true,
				showWriteDir :true,
				isClickNGDir :true,
				currentSelect :null,
				extentions :"",
				callback:function(s){
					if(isLog) console.log(s);
				}
			}
		);
		tree3.setCurrent({dir:"../uploads/sub_3/",id:""});
		
		setBtn();
	}
	
	function setBtn(){
		v.btn_close.click(function(){ 
			stageOut();
		});
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
			if(isFirst){createlayout()}
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

// var tID;
// if(tID) clearTimeout(tID);
// tID = setTimeout(function(){
// 	DirTreeViewTest.init();
// 	DirTreeViewTest.stageIn();
// },1000);

