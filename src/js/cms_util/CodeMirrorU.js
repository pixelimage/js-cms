
var CodeMirrorU = (function(){
	//
	function getColorType(_ex){
	    if(_ex == "js")  return "_editor-js";
	    if(_ex == "json")  return "_editor-js";
	    if(_ex == "css")  return "_editor-style";
	    if(_ex == "class")  return "_editor-style";
	    if(_ex == "style")  return "_editor-style";
	    if(_ex == "single-class")  return "_editor-style";
	    if(_ex == "html")  return "_editor-html";
	    if(_ex == "htm")  return "_editor-html";
	    return "_editor-text";
	}
	function getMode(_ex){
	    if(_ex == "js")  return "javascript";
	    if(_ex == "style")  return "css";
	    if(_ex == "css")  return "css";
	    if(_ex == "class")  return "css";
	    // if(_ex == "html")  return "htmlmixed";
	    // if(_ex == "htm")  return "htmlmixed";
	    // if(_ex == "p")  return "htmlmixed";
	    if(_ex == "markdown") s = "markdown";
	    if(_ex == "php")  return "php";
	    return "htmlmixed";
	}
	
	/* ---------- ---------- ---------- */

	function _getEditor(_textarea,_ex,_wap){
		var e = CodeMirror.fromTextArea(_textarea, {
		    mode: getMode(_ex),
			lineNumbers: true,
			lineWrapping: _wap,
			foldGutter: true,
			gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			highlightSelectionMatches: {showToken: /\w/},
			autoCloseBrackets: true,
			indentWithTabs: true
		});
		e.foldCode(CodeMirror.Pos(0,0));
		return e;
	}
	function createSettingEditor(_textarea,_ex,_wap){
		var e = _getEditor(_textarea,_ex,_wap);
			e.setOption("theme", "zenburn");
		return e;
	}
	function createEditor(_textarea,_ex,_wap){
		var e = _getEditor(_textarea,_ex,_wap);
		// var theme = (function(_ex){
		//     if(_ex == "js")  return "zenburn";
		//     if(_ex == "json")  return "zenburn";
		//     return "";
		// })(_ex);
		return e;
		
	}
 return {
	getColorType:getColorType, 
	createSettingEditor:createSettingEditor, 
	createEditor:createEditor 
}
})();

