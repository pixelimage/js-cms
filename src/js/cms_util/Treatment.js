var Treatment = (function() {
	function toValue(_n, _s) {
		if (_n == undefined) return _s;
		if (_n == "") return _s;
		return _n;
	}
	return {
		toValue: toValue
	}
})();