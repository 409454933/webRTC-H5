// 测试环境检测
function getBrowserDetail() {

	function extractVersion(uastring, expr, pos) {
		let match = uastring.match(expr)
		return match && match.length >= pos && parseInt(match[pos], 10)
	}

	var navigator = window && window.navigator

	// Returned result object.
	var result = {}
	result.browser = null
	result.version = null
	result.UIVersion = null
	result.chromeVersion = null
	result.systemFriendlyName = null
	result.UA = navigator.userAgent
	result.resolvingPower = window.screen.width + ' * ' + window.screen.height

	if (navigator.userAgent.match(/Windows/)) {
		result.systemFriendlyName = 'windows'
	} else if (navigator.userAgent.match(/Mac/)) {
		result.systemFriendlyName = 'mac'
	} else if (navigator.userAgent.match(/Linux/)) {
		result.systemFriendlyName = 'linux'
	} else if (navigator.userAgent.match(/iPhone/)) {
		result.systemFriendlyName = 'iphone'
	} else if (navigator.userAgent.match(/Android/)) {
		result.systemFriendlyName = 'Android'
	}
	// console.log(navigator.userAgent)
	// Fail early if it's not a browser
	if (typeof window === 'undefined' || !window.navigator) {
		result.browser = 'Not a browser.'
		return result
	}

	// // Edge.
	if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
		result.browser = 'edge'
		result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2)
		result.UIVersion = navigator.userAgent.match(/Edge\/([\d.]+)/)[1] // Edge/16.17017
	} else if (!navigator.mediaDevices && (!!window.ActiveXObject || 'ActiveXObject' in
			window || navigator
			.userAgent.match(/MSIE (\d+)/) || navigator.userAgent.match(/rv:(\d+)/))) {
		// IE
		result.browser = 'ie'
		if (navigator.userAgent.match(/MSIE (\d+)/)) {
			result.version = extractVersion(navigator.userAgent, /MSIE (\d+).(\d+)/, 1)
			result.UIVersion = navigator.userAgent.match(/MSIE ([\d.]+)/)[1] // MSIE 10.6
		} else if (navigator.userAgent.match(/rv:(\d+)/)) {
			/* For IE 11 */
			result.version = extractVersion(navigator.userAgent, /rv:(\d+).(\d+)/, 1)
			result.UIVersion = navigator.userAgent.match(/rv:([\d.]+)/)[1] // rv:11.0
		}

		// Firefox.
	} else if (navigator.mozGetUserMedia) {
		result.browser = 'firefox'
		result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1)
		result.UIVersion = navigator.userAgent.match(/Firefox\/([\d.]+)/)[1] // Firefox/56.0

		// all webkit-based browsers
	} else if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
		// Chrome, Chromium, Webview, Opera, Vivaldi all use the chrome shim for now
		var isOpera = !!navigator.userAgent.match(/(OPR|Opera).([\d.]+)/)
		// var isVivaldi = navigator.userAgent.match(/(Vivaldi).([\d.]+)/) ? true : false;
		if (isOpera) {
			result.browser = 'opera'
			result.version = extractVersion(navigator.userAgent, /O(PR|pera)\/(\d+)\./, 2)
			result.UIVersion = navigator.userAgent.match(/O(PR|pera)\/([\d.]+)/)[
				2] // OPR/48.0.2685.39
			if (navigator.userAgent.match(/Chrom(e|ium)\/([\d.]+)/)[2]) {
				result.chromeVersion = extractVersion(navigator.userAgent,
					/Chrom(e|ium)\/(\d+)\./, 2)
			}
		} else {
			result.browser = 'chrome'
			result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)
			result.UIVersion = navigator.userAgent.match(/Chrom(e|ium)\/([\d.]+)/)[
				2] // Chrome/61.0.3163.100
		}
	} else if ((!navigator.webkitGetUserMedia && navigator.userAgent.match(
			/AppleWebKit\/([0-9]+)\./)) || (
			navigator.webkitGetUserMedia && !navigator.webkitRTCPeerConnection)) {
		if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
			result.browser = 'safari'
			result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1)
			result.UIVersion = navigator.userAgent.match(/Version\/([\d.]+)/)[
				1] // Version/11.0.1
		} else { // unknown webkit-based browser.
			result.browser = '未知'
			return result
		}
		// Default fallthrough: not supported.
	} else {
		result.browser = 'Not a supported browser.'
		return result
	}

	return result
};

// 清除流
function tracks(stream) {
	var tracks = stream.getTracks()
	for (var track in tracks) {
		tracks[track].onended = null
		tracks[track].stop()
	}
};
