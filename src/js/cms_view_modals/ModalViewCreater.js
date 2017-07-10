
var ModalViewCreater 	 = (function(){
	function createBaseView(_class,_view){
		var tag = "";
			tag += '	<div class="_bg"></div>';
			tag += '	<div class="_modalBox">';
			tag += '		<div class="_header"><div class="_replaceArea"></div></div>';
			tag += '		<div class="_header_ex"><div class="_replaceArea"></div></div>';
			tag += '		<div class="_body _simple-scroll"><div class="_replaceArea"></div></div>';
			tag += '		<div class="_footer"><div class="_replaceArea"></div></div>';
			tag += '		<div class="_extra"><div class="_replaceArea"></div></div>';
			tag += '	</div>';
		_view.append(tag);
		var v = {}
			v.header  	= _view.find("._header ._replaceArea");
			v.header_ex = _view.find("._header_ex ._replaceArea");
			v.body 	 	= _view.find("._body ._replaceArea");
			v.footer  	= _view.find("._footer ._replaceArea");
			v.extra  	= _view.find("._extra ._replaceArea");
		return v;
	}

	return {
		createBaseView:createBaseView
	}
})();