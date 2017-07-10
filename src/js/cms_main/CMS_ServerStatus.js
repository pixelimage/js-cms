
var CMS_ServerStatus = {
	version: ""
}
var CMS_ServerStatusFunc = (function() {
	var versionNumber

	function setVersion(_v) {
		var vs = _v.phpversion.split(".")
		if (vs.length != 3) return;
		CMS_ServerStatus.version = _v.phpversion;
		versionNumber = convert(CMS_ServerStatus.version)
	}

	function convert(_s) {
		var vs = _s.split(".")
		if (vs.length != 3) return 0;
		return vs[0] * 1000000 + vs[1] * 1000 + vs[2] * 1;
	}

	function checkCoverVersion(_v) {
		var vv = convert(_v)
		if (vv <= versionNumber) {
			return true;
		} else {
			return false;
		}
	}

	return {
		setVersion: setVersion,
		checkCoverVersion: checkCoverVersion
	}
})();

