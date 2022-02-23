let TestResult = {
	environment: {},
	DevicePermissions: {},
	RTCPeerConnectionAPI: {},
	RTCPeerConnectionEvent: {},
	RTCRtpSender: {},
	enumerateDevices: {
		audioinput: [],
		audiooutput: [],
		videoinput: []
	},
	getDisplayMedia: {},
	getUserMedia: {},
	MediaStream: {},
	MediaStreamTrack: {},
	CodecList: {
		audioCodecs: {},
		audioDecoding: {},
		videoCodecs: {},
		videoDecoding: {}
	},
	WeakNetworkConfrontation: {
		weakNetworkAudio: {},
		weakNetworkVideo: {}
	},
	webSocket: {},
	WebAssembly: {},
	captureStream: {},
	WebAudio: {},
	MediaRecorder: {},
	WebCodecs: {},
	LocalStorage: {},
	IndexedDB: {},
	other: {},
	majorFunction: {},
	getStats: {}
}
let vconsole = null
let Videos = []
let ws = null
let isChannelOpen = false
let keepAliveWithoutResponse = 0
let wsKeepAliveInterval = null
let WS_KEEP_ALIVE_TIMEOUT_FLAG = 5
let wsReconnectTime = 2
let wsReconnectTimeoutEvent = null
let wasWebsocketClosed = false
var Offer
var Answer
let stream;
let isMute;
let audio = document.getElementById("myAudio")
let progressContent = document.getElementById("progress-content")
let speed = document.getElementById('speed')
let mask = document.getElementById("mask")
let quickScan = [{
		'label': '4K(UHD)',
		'width': 3840,
		'height': 2160,
		'ratio': '16:9',
		'frameRate': 30
	},
	{
		'label': '4K(UHD)',
		'width': 3840,
		'height': 2160,
		'ratio': '16:9',
		'frameRate': 15
	},
	{
		'label': '1080p(FHD)',
		'width': 1920,
		'height': 1080,
		'ratio': '16:9',
		'frameRate': 30
	},
	{
		'label': '1080p(FHD)',
		'width': 1920,
		'height': 1080,
		'ratio': '16:9',
		'frameRate': 15
	},
	{
		'label': 'UXGA',
		'width': 1600,
		'height': 1200,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'UXGA',
		'width': 1600,
		'height': 1200,
		'ratio': '4:3',
		'frameRate': 15
	},
	{
		'label': '720p(HD)',
		'width': 1280,
		'height': 720,
		'ratio': '16:9',
		'frameRate': 30
	},
	{
		'label': '720p(HD)',
		'width': 1280,
		'height': 720,
		'ratio': '16:9',
		'frameRate': 15
	},
	{
		'label': 'SVGA',
		'width': 800,
		'height': 600,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'SVGA',
		'width': 800,
		'height': 600,
		'ratio': '4:3',
		'frameRate': 15
	},
	{
		'label': 'VGA',
		'width': 640,
		'height': 480,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'VGA',
		'width': 640,
		'height': 480,
		'ratio': '4:3',
		'frameRate': 15
	},
	{
		'label': '360p(nHD)',
		'width': 640,
		'height': 360,
		'ratio': '16:9',
		'frameRate': 30
	},
	{
		'label': '360p(nHD)',
		'width': 640,
		'height': 360,
		'ratio': '16:9',
		'frameRate': 15
	},
	{
		'label': 'CIF',
		'width': 352,
		'height': 288,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'CIF',
		'width': 352,
		'height': 288,
		'ratio': '4:3',
		'frameRate': 15
	},
	{
		'label': 'QVGA',
		'width': 320,
		'height': 240,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'QVGA',
		'width': 320,
		'height': 240,
		'ratio': '4:3',
		'frameRate': 15
	},
	{
		'label': '180p?',
		'width': 320,
		'height': 180,
		'ratio': '16:9',
		'frameRate': 30
	},
	{
		'label': '180p?',
		'width': 320,
		'height': 180,
		'ratio': '16:9',
		'frameRate': 15
	},
	{
		'label': 'QCIF',
		'width': 176,
		'height': 144,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'QCIF',
		'width': 176,
		'height': 144,
		'ratio': '4:3',
		'frameRate': 15
	},
	{
		'label': 'QQVGA',
		'width': 160,
		'height': 120,
		'ratio': '4:3',
		'frameRate': 30
	},
	{
		'label': 'QQVGA',
		'width': 160,
		'height': 120,
		'ratio': '4:3',
		'frameRate': 15
	}
]
document.getElementById('toggleVConsole').onclick = function() {
	if (!vconsole) {
		vconsole = new VConsole();
	}
}
document.getElementById('start').onclick = function() {
	testingEnvironment()
	// mask.style.display = 'flex';
	// Switch1()
}

let blockHeaders = document.getElementsByClassName('block-header')
document.getElementById('expand').onclick = Switch1;

function Switch1() {
	if (!blockHeaders) {
		blockHeaders = document.getElementsByClassName('block-header')
	}
	if (blockHeaders && blockHeaders.length) {
		for (let i = 3; i < blockHeaders.length; i++) {
			let blockHeader = blockHeaders[i]
			if (blockHeader.nextElementSibling) {
				if (blockHeader.nextElementSibling.style.display !== 'none') {
					blockHeader.nextElementSibling.style.display = 'none'
				} else {
					blockHeader.nextElementSibling.style.display = ''
				}
			}
		}
	}
}

if (blockHeaders && blockHeaders.length) {
	for (let i = 0; i < blockHeaders.length; i++) {
		let blockHeader = blockHeaders[i]
		blockHeader.onclick = function() {
			if (blockHeader.nextElementSibling) {
				if (blockHeader.nextElementSibling.style.display !== 'none') {
					blockHeader.nextElementSibling.style.display = 'none'
				} else {
					blockHeader.nextElementSibling.style.display = ''
				}
			}
		}
	}
}

function setBlockHeadersDisplay(displayStyle) {
	if (!blockHeaders) {
		blockHeaders = document.getElementsByClassName('block-header')
	}
	if (blockHeaders && blockHeaders.length) {
		for (let i = 3; i < blockHeaders.length; i++) {
			let blockHeader = blockHeaders[i]
			if (blockHeader.nextElementSibling) {
				blockHeader.nextElementSibling.style.display = displayStyle
			}
		}
	}
}

// 测试环境
function testingEnvironment() {
	let BrowserDetail = getBrowserDetail();
	TestResult.environment.systemName = BrowserDetail.systemFriendlyName;
	TestResult.environment.browser = BrowserDetail.browser + '/' + BrowserDetail.UIVersion;
	TestResult.environment.resolvingPower = BrowserDetail.resolvingPower;
	TestResult.environment.UA = BrowserDetail.UA;
	let systemFriendlyName = '<div class="line"><span>操作系统：</span><span>' + BrowserDetail.systemFriendlyName +
		'</span></div>';
	let browser = '<div class="line"><span>浏览器：</span><span>' + BrowserDetail.browser + '/' + BrowserDetail
		.UIVersion + '</span></div>';
	let UA = '<div class="line"><span>UA：</span><span>' + BrowserDetail.UA + '</span></div>';
	let resolvingPower = '<div class="line"><span>屏幕分辨率：</span><span>' + BrowserDetail.resolvingPower +
		'</span></div>';
	let data = [systemFriendlyName, browser, UA, resolvingPower]
	for (let i in data) {
		$("#part-env").append(data[i])
	}
	progressContent.style.width = '5%';
	speed.textContent = '进度 5%';
	devicePermissions()
}

// 设备权限
async function devicePermissions() {
	document.getElementById('interface-part1').style.display = 'block';
	await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		})
		.then(stream => {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用摄像头:</span><span class="support"></span></div>')
			TestResult.DevicePermissions.video = true;
			tracks(stream)
		})
		.catch(function(err) {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用摄像头:</span><span class="notSupport"></span></div>')
			TestResult.DevicePermissions.video = false;
		});

	await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		})
		.then(stream => {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用麦克风:</span><span class="support"></span></div>')
			TestResult.DevicePermissions.audio = true;
			tracks(stream)
		})
		.catch(function(err) {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用麦克风:</span><span class="notSupport"></span></div>')
			TestResult.DevicePermissions.audio = false;
		});
	progressContent.style.width = '10%';
	speed.textContent = '进度 10%';
	document.getElementById('interface-part1').style.display = 'none';
	document.getElementById('DevicePermissions').style.background = distinguishQuantity(TestResult[
		'DevicePermissions']);
	await PeerConnection()
}

// RTCPeerConnection API
async function PeerConnection() {
	document.getElementById('interface-part2').style.display = 'block';
	document.getElementById('interface-part3').style.display = 'block';
	let offer, answer, sdp, offerOptions = {
		offerToReceiveAudio: 1,
		offerToReceiveVideo: 1
	};
	let constraints = {
		audio: true,
		video: true
	};
	let pc = new RTCPeerConnection();
	let pc1 = new RTCPeerConnection();
	if (pc) {
		$("#interface-part2").append(
			'<div class="line"><span>RTCPeerConnection():</span><span class="support"></span></div>');
		TestResult.RTCPeerConnectionAPI.RTCPeerConnection = true;
	} else {
		$("#interface-part2").append(
			'<div class="line"><span>RTCPeerConnection():</span><span class="notSupport"></span></div>');
		TestResult.RTCPeerConnectionAPI.RTCPeerConnection = false;
	}

	pc.onicecandidate = async event => {
		if (!event.candidate) {
			// 传输东西
			sdp = pc.localDescription;
			Offer = sdp
			$("#interface-part3").append(
				'<div class="line"><span>icecandidate():</span><span class="support"></span></div>');
			TestResult.RTCPeerConnectionEvent.icecandidate = true;
			try {
				pc1.setRemoteDescription(sdp)
				$("#interface-part2").append(
					'<div class="line"><span>setRemoteDescription():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.setRemoteDescription = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>setRemoteDescription():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.setRemoteDescription = false;
			}

			try {
				answer = await pc1.createAnswer();
				$("#interface-part2").append(
					'<div class="line"><span>createAnswer():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.createAnswer = true;
				await pc1.setLocalDescription(answer)
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>createAnswer():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.createAnswer = false;
			}

			try {
				pc.getTransceivers()
				$("#interface-part2").append(
					'<div class="line"><span>getTransceivers():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getTransceivers = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getTransceivers():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getTransceivers = false;
			}

			try {
				pc.getSenders()
				$("#interface-part2").append(
					'<div class="line"><span>getSenders():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getSenders = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getSenders():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getSenders = false;
			}


			try {
				pc.getReceivers()
				$("#interface-part2").append(
					'<div class="line"><span>getReceivers():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getReceivers = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getReceivers():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getReceivers = false;
			}


			try {
				pc.getStats()
				$("#interface-part2").append(
					'<div class="line"><span>getStats():</span><span class="support"></span></div>');
				TestResult.RTCPeerConnectionAPI.getStats = true;
				$("#interface-part4").append(
					'<div class="line"><span>getStats():</span><span class="support"></span></div>');
				TestResult.RTCRtpSender.getStats = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getStats():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.getStats = false;
				$("#interface-part4").append(
					'<div class="line"><span>getStats():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCRtpSender.getStats = false;
			}


		}
	};

	pc1.onicecandidate = event => {
		if (!event.candidate) {
			// 传输东西
			sdp = pc1.localDescription;
			Answer = sdp
		}
	};

	pc.addEventListener("iceconnectionstatechange", ev => {
		// console.log(ev)
		$("#interface-part3").append(
			'<div class="line"><span>iceconnectionstatechange:</span><span class="support"></span></div>'
		);
		TestResult.RTCPeerConnectionEvent.iceconnectionstatechange = true;
	}, false);

	pc.addEventListener("icegatheringstatechange", ev => {
		let connection = ev.target;

		switch (connection.iceGatheringState) {
			case "gathering":
				/* collection of candidates has begun */
				break;
			case "complete":
				/* collection of candidates is finished */
				$("#interface-part3").append(
					'<div class="line"><span>icegatheringstatechange:</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionEvent.icegatheringstatechange = true;
				break;
		}
	}, false);

	pc.addEventListener("negotiationneeded", ev => {
		// console.log(ev)
		$("#interface-part3").append(
			'<div class="line"><span>negotiationneeded:</span><span class="support"></span></div>');
		TestResult.RTCPeerConnectionEvent.negotiationneeded = true;
	}, false);

	pc.addEventListener("connectionstatechange", ev => {
		// console.log(ev)
		$("#interface-part3").append(
			'<div class="line"><span>connectionstatechange:</span><span class="support"></span></div>'
		);
		TestResult.RTCPeerConnectionEvent.connectionstatechange = true;
	}, false);

	pc.addEventListener("signalingstatechange", ev => {
		$("#interface-part3").append(
			'<div class="line"><span>signalingstatechange:</span><span class="support"></span></div>'
		);
		TestResult.RTCPeerConnectionEvent.signalingstatechange = true;
	}, false);

	await navigator.mediaDevices.getUserMedia(constraints)
		.then(async function(stream) {
			/* 使用这个stream stream */
			try {
				stream.getTracks().forEach(track => pc.addTrack(track, stream));
				$("#interface-part2").append(
					'<div class="line"><span>addTrack():</span><span class="support"></span></div>');
				TestResult.RTCPeerConnectionAPI.addTrack = true;
				$("#interface-part8").append(
					'<div class="line"><span>addTrack():</span><span class="support"></span></div>');
				TestResult.MediaStream.addTrack = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>addTrack():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.addTrack = false;
				$("#interface-part8").append(
					'<div class="line"><span>addTrack():</span><span class="notSupport"></span></div>'
				);
				TestResult.MediaStream.addTrack = false;
			}

			try {
				stream.getAudioTracks()[0]
				$("#interface-part8").append(
					'<div class="line"><span>getAudioTracks():</span><span class="support"></span></div>'
				);
				TestResult.MediaStream.icecandidate = true;
			} catch (e) {
				$("#interface-part8").append(
					'<div class="line"><span>getAudioTracks():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				stream.getVideoTracks()[0]
				$("#interface-part8").append(
					'<div class="line"><span>getVideoTracks():</span><span class="support"></span></div>'
				);
			} catch (e) {
				$("#interface-part8").append(
					'<div class="line"><span>getVideoTracks():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				offer = await pc.createOffer(offerOptions);
				$("#interface-part2").append(
					'<div class="line"><span>createOffer():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.createOffer = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>createOffer():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.createOffer = false;
			}

			try {
				await pc.setLocalDescription(offer);
				$("#interface-part2").append(
					'<div class="line"><span>setLocalDescription():</span><span class="support"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.setLocalDescription = true;
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>setLocalDescription():</span><span class="notSupport"></span></div>'
				);
				TestResult.RTCPeerConnectionAPI.setLocalDescription = false;
			}
			tracks(stream)

		})
		.catch(err => {
			log.error(e);
		});

	// setTimeout(function(){
	// 	codes()
	// },5000)
	progressContent.style.width = '15%';
	speed.textContent = '进度 15%';
	document.getElementById('interface-part2').style.display = 'none';
	document.getElementById('interface-part3').style.display = 'none';
	document.getElementById('RTCPeerConnectionAPI').style.background = distinguishQuantity(TestResult[
		'RTCPeerConnectionAPI']);
	document.getElementById('RTCPeerConnectionEvent').style.background = distinguishQuantity(TestResult[
		'RTCPeerConnectionEvent']);
	Receiver()
};

// RTCRtpSender
async function Receiver() {
	document.getElementById('interface-part4').style.display = 'block';
	let pc = new RTCPeerConnection();
	await navigator.mediaDevices.getUserMedia({
	        video: true,
	        audio: true
	    }).then(stream => {
	        stream.getTracks().forEach(track => pc.addTrack(track, stream));
			tracks(stream)
	    })
	    .catch(err => {
	        // console.log(err)
	    });
	await navigator.mediaDevices.getUserMedia({
		video: true,
		audio: true
	}).then(stream => {
		let videoTrack1 = stream.getVideoTracks()[0];
		var sender1 = pc.getSenders().find(function(s) {
			return s.track.kind == videoTrack1.kind;
		});
		try {
			sender1.getParameters()
			$("#interface-part4").append(
				'<div class="line"><span>getParameters():</span><span class="support"></span></div>');
			TestResult.RTCRtpSender.getParameters = true;
		} catch (e) {
			console.log(e)
			$("#interface-part4").append(
				'<div class="line"><span>getParameters():</span><span class="notSupport"></span></div>'
			);
			TestResult.RTCRtpSender.getParameters = false;
		}

		try {
			const sender = pc.getSenders()[0];
			const parameters = sender.getParameters();
			sender.setParameters(parameters)
			$("#interface-part4").append(
				'<div class="line"><span>setParameters():</span><span class="support"></span></div>');
			TestResult.RTCRtpSender.setParameters = true;
		} catch (e) {
			// log.error(e);
			$("#interface-part4").append(
				'<div class="line"><span>setParameters():</span><span class="notSupport"></span></div>'
			);
			TestResult.RTCRtpSender.setParameters = false;
		}

		try {
			sender1.replaceTrack(videoTrack1);
			$("#interface-part4").append(
				'<div class="line"><span>replaceTrack():</span><span class="support"></span></div>');
			TestResult.RTCRtpSender.replaceTrack = true;
		} catch (e) {
			// log.error(e);
			console.log(e)
			$("#interface-part4").append(
				'<div class="line"><span>replaceTrack():</span><span class="notSupport"></span></div>'
			);
			TestResult.RTCRtpSender.replaceTrack = false;
		}

		try {
			RTCRtpSender.getCapabilities("video");
			$("#interface-part4").append(
				'<div class="line"><span>getCapabilities():</span><span class="support"></span></div>'
			);
			TestResult.RTCRtpSender.getCapabilities = true;
			$("#interface-part9").append(
				'<div class="line"><span>getCapabilities():</span><span class="support"></span></div>'
			);
		} catch (e) {
			console.log(e)
			$("#interface-part4").append(
				'<div class="line"><span>getCapabilities():</span><span class="notSupport"></span></div>'
			);
			TestResult.RTCRtpSender.getCapabilities = false;
			$("#interface-part9").append(
				'<div class="line"><span>getCapabilities():</span><span class="notSupport"></span></div>'
			);
		}

		tracks(stream)
	});
	progressContent.style.width = '20%';
	speed.textContent = '进度 20%';
	document.getElementById('interface-part4').style.display = 'none';
	document.getElementById('RTCRtpSender').style.background = distinguishQuantity(TestResult['RTCRtpSender']);
	enumerateDevices()
};

// MediaDevices.enumerateDevices
function enumerateDevices() {
	document.getElementById('interface-part5').style.display = 'block';
	navigator.mediaDevices.enumerateDevices()
		.then(devices => {
			for (let i in devices) {
				if (devices[i].deviceId !== 'default' && devices[i].deviceId !== 'communications') {
					if (devices[i].kind == 'audioinput') {
						$("#audio-input").append('<li>' + devices[i].label + '</li>');
						TestResult.enumerateDevices.audioinput.push(devices[i].label);
					} else if (devices[i].kind == 'audiooutput') {
						$("#audio-output").append('<li>' + devices[i].label + '</li>');
						TestResult.enumerateDevices.audiooutput.push(devices[i].label);
					} else if (devices[i].kind == 'videoinput') {
						let datas = {
							label: devices[i].label,
							devices: devices[i].deviceId
						}
						Videos.push(datas)
						TestResult.enumerateDevices.videoinput.push(devices[i].label);
						$("#video-input").append('<li>' + devices[i].label + '</li>');
					}
				}
			}
			$("#interface-part5").prepend(
				'<div class="line"><span>enumerateDevices获取设备列表:</span><span class="support"></span></div>');
			TestResult.enumerateDevices.enumerateDevices = true;
			$("#public-part1").append(
				'<div class="line"><span>获取音视频设备列表:</span><span class="support"></span></div>');
		})
		.catch(function(err) {
			// log.error(e);
			console.log(err)
			$("#interface-part5").append(
				'<div class="line">enumerateDevices获取设备列表:</span><span class="notSupport"></span></div>');
			TestResult.enumerateDevices.enumerateDevices = false;
			$("#public-part1").append(
				'<div class="line"><span>获取音视频设备列表:</span><span class="support"></span></div>');
		});
	navigator.mediaDevices.ondevicechange = event => {
		$("#interface-part5").append(
			'<div class="line"><span>ondevicechange 事件:</span><span class="support"></span></div>');
		TestResult.enumerateDevices.ondevicechange = true;
	}
	progressContent.style.width = '25%';
	speed.textContent = '进度 25%';
	document.getElementById('interface-part5').style.display = 'none';
	document.getElementById('enumerateDevices').style.background = distinguishQuantity(TestResult['enumerateDevices']);
	getDisplayMedia()
};

// MediaDevices.getDisplayMedia
async function getDisplayMedia() {
	document.getElementById('interface-part6').style.display = 'block';
	let constraints = {
		audio: true,
		video: {
			width: 3840,
			height: 2960
		}
	};
	let maxWidth, maxHeight, streams;
	if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
		$("#interface-part6").prepend(
			'<div class="line"><span>getDisplayMedia 事件:</span><span class="notSupport"></span></div>');
		TestResult.getDisplayMedia.getDisplayMedia = false;
	} else {
		await navigator.mediaDevices.getDisplayMedia(constraints)
			.then(stream => {
				let video = document.createElement('video');
				video.srcObject = stream;
				video.onloadedmetadata = async function() {
					$("#interface-part6").prepend('<div class="line"><span>支持的最大分辨率:</span><span>' +
						video.videoWidth + " * " + video.videoHeight + '</span></div>');
					TestResult.getDisplayMedia.maxResolvingPower = video.videoWidth + " * " + video
						.videoHeight;
					tracks(stream)
				}
			})
			.catch(function(err) {
				console.log(err)
			});

		let data = ['5', '15', '30']
		for (let i in data) {
			let constraints1 = {
				audio: true,
				video: {
					width: {
						exact: maxWidth
					},
					height: {
						exact: maxHeight
					},
					frameRate: data[i]
				}
			};
			console.log(data[i])
			let datas = JSON.stringify(data[i]).split('"');
			await navigator.mediaDevices.getDisplayMedia(constraints1)
				.then(stream => {
					streams = stream
					$("#interface-part6").append('<div class="line"><span>' + data[i] +
						'fps:</span><span class="support"></span></div>');
					TestResult.getDisplayMedia[data[i] + 'fps'] = true;
					tracks(stream)
				})
				.catch(function(err) {
					console.log(err)
					$("#interface-part6").append('<div class="line"><span>' + data[i] +
						'fps:</span><span class="notSupport"></span></div>');
					TestResult.getDisplayMedia[data[i] + 'fps'] = false
				});
		}

	}
	progressContent.style.width = '30%';
	speed.textContent = '进度 30%';
	document.getElementById('interface-part6').style.display = 'none';
	document.getElementById('getDisplayMedia').style.background = distinguishQuantity(TestResult[
	'getDisplayMedia']);
	resolvingPower()
};

// MediaDevices.getUserMedia
async function resolvingPower() {
	document.getElementById('interface-part7').style.display = 'block';
	
	'max',
	'ideal',
	'exact'
	let data = [{
		name: 'max',
		value: {
			audio: false,
			video: {
				width: {
					max: 640
				},
				height: {
					max: 360
				}
			}
		}
	}, {
		name: 'ideal',
		value: {
			audio: false,
			video: {
				width: {
					ideal: 640
				},
				height: {
					ideal: 360
				}
			}
		}
	}, {
		name: 'exact',
		value: {
			audio: false,
			video: {
				width: {
					exact: 640
				},
				height: {
					exact: 360
				}
			}
		}
	}];
	for (let n in data) {
		await navigator.mediaDevices.getUserMedia(data[n].value)
			.then(stream => {
				$("#limit").append(
					'<div class="line"><span>' + data[n].name +
					':</span><span class="support"></span></div>');
				TestResult.getUserMedia[data[n].name] = true;
				tracks(stream)
			})
			.catch(err => {
				/* 处理error */
				$("#video" + i).append(
					'<div class="line"><span>' + data[n].name +
					':</span><span class="notSupport"></span></div>'
				);
				TestResult.getUserMedia[data[n].name] = false;
			});
	}
	for (let i in Videos) {
		$("#interface-part7").append(
			'<div class="line" id="video' + i + '"><span>' + Videos[i].label + '支持的分辨率和帧率:</span></div>');
		for (let j in quickScan) {
			let constraints = {
				audio: false,
				video: {
					deviceId: Videos[i].devices ? {
						exact: Videos[i].devices
					} : undefined,
					width: {
						exact: quickScan[j].width
					},
					height: {
						exact: quickScan[j].height
					},
					frameRate: {
						exact: quickScan[j].frameRate
					}
				}
			};

			await navigator.mediaDevices.getUserMedia(constraints)
				.then(stream => {
					$("#video" + i).append(
						'<div class="line"><span>' + quickScan[j].width + " * " + quickScan[j].height +
						" * " + 'frameRate:' + quickScan[j].frameRate +
						':</span><span class="support"></span></div>');
					TestResult.getUserMedia[quickScan[j].width + " * " + quickScan[j].height + " * " +
						'frameRate:' + quickScan[j].frameRate] = true;
					tracks(stream)
				})
				.catch(err => {
					/* 处理error */
					$("#video" + i).append(
						'<div class="line"><span>' + quickScan[j].width + " * " + quickScan[j].height +
						" * " + 'frameRate:' + quickScan[j].frameRate +
						':</span><span class="notSupport"></span></div>');
					TestResult.getUserMedia[quickScan[j].width + " * " + quickScan[j].height + " * " +
						'frameRate:' + quickScan[j].frameRate] = false;
				});
		}
	}
	progressContent.style.width = '35%';
	speed.textContent = '进度 35%';
	document.getElementById('interface-part7').style.display = 'none';
	document.getElementById('interface-part8').style.display = 'block';
	document.getElementById('getUserMedia').style.background = distinguishQuantity(TestResult['getUserMedia']);
	document.getElementById('MediaStream').style.background = distinguishQuantity(TestResult['MediaStream']);
	document.getElementById('interface-part8').style.display = 'none';
	MediaStream()
}

function MediaStream(){
	var pc, sender, stream;
	pc = new RTCPeerConnection();
	navigator.mediaDevices.getUserMedia({video: true}, function(stream) {
	  // stream.onaddtrack = function(){
		 //  console.log('addtrack')
	  // }
	  var track = stream.getVideoTracks()[0];
	  // stream.addTrack(track)
	  sender = pc.addTrack(track, stream);
	  try{
	  	pc.removeTrack(sender);
	  	$("#interface-part8").append(
	  		'<div class="line"><span>removeTrack():</span><span class="support"></span></div>');
		TestResult.MediaStream.removeTrack = true;
	  }catch(e){
	  	console.log(e)
	  	$("#interface-part8").append(
	  		'<div class="line"><span>removeTrack():</span><span class="notSupport"></span></div>');
		TestResult.MediaStream.removeTrack = false;
	  }
	}, function(){});
	MediaStreamTrack()
}

// MediaStreamTrack
function MediaStreamTrack() {
	document.getElementById('interface-part9').style.display = 'block';
	const constraints = {
		audio: true,
		video: {
			width: 640,
			height: 480
		}
	};
	const constraints1 = {
		audio: true,
		video: {
			width: 340,
			height: 240
		}
	};
	navigator.mediaDevices.getUserMedia(constraints1)
		.then(mediaStream => {
			const track = mediaStream.getVideoTracks()[0];
			
			try{
				track.getConstraints()
				$("#interface-part9").prepend(
					'<div class="line"><span>getConstraints():</span><span class="support"></span></div>'
				);
				TestResult.MediaStreamTrack.getConstraints = true;
			}catch(e){
				console.log(e)
				$("#interface-part9").prepend(
					'<div class="line"><span>getConstraints():</span><span class="notSupport"></span></div>'
				);
				TestResult.MediaStreamTrack.getConstraints = false;
			}
			
			try{
				track.getSettings()
				$("#interface-part9").prepend(
					'<div class="line"><span>getSettings():</span><span class="support"></span></div>'
				);
				TestResult.MediaStreamTrack.getSettings = true;
			}catch(e){
				console.log(e)
				$("#interface-part9").prepend(
					'<div class="line"><span>getSettings():</span><span class="notSupport"></span></div>'
				);
				TestResult.MediaStreamTrack.getSettings = false;
			}
			
			track.applyConstraints(constraints)
				.then(res => {
					$("#interface-part9").prepend(
						'<div class="line"><span>applyConstraints():</span><span class="support"></span></div>'
					);
					TestResult.MediaStreamTrack.applyConstraints = true;
				})
				.catch(e => {
					console.log(e)
					$("#interface-part9").prepend(
						'<div class="line"><span>applyConstraints():</span><span class="notSupport"></span></div>'
					);
					TestResult.MediaStreamTrack.applyConstraints = false;
				});
				
			tracks(mediaStream)
		})
		.catch(err => {
			console.log(err)
		})
	progressContent.style.width = '40%';
	speed.textContent = '进度 40%';
	document.getElementById('interface-part9').style.display = 'none';
	document.getElementById('MediaStreamTrack').style.background = distinguishQuantity(TestResult['MediaStreamTrack']);
	codes();
}

function codes() {
	document.getElementById('other-part1').style.display = 'block';
	document.getElementById('other-part2').style.display = 'block';
	document.getElementById('other-part4').style.display = 'block';
	let AudioCodecs = ['opus', 'ISAC', 'G722', 'PCMU', 'PCMA', 'DTMF', 'red', 'telephone-event'];
	let VideoCodecs = ['VP8', 'VP9', 'H264', 'H265', 'AV1', 'flexfec-03'];
	let weakNetworkAudio = ['FEC', 'RED'];
	let weakNetworkVideo = ['FEC', 'RED', 'RTCP', 'RTX', 'NACK', 'PLI', 'FIR', 'remb'];
	let parsedSdp = SDPTools.parseSDP(Offer.sdp);
	let h264Codec = SDPTools.getRTCRtpCapabilities(Offer.sdp, ['add']);
	let h264Codec1 = SDPTools.getRTCRtpCapabilities(Answer.sdp, ['add']);
	// console.log(h264Codec)
	let data = parsedSdp.media[0].rtcpFb;
	let data0 = [];
	let data1 = [];
	for (let index in data) {
		data0.push(data[index].type)
		if (data[index].subtype) {
			data0.push(data[index].subtype)
		}
	}
	data0 = data0.concat(h264Codec.audioCodecs)
	data0.forEach(function(a) {
		var check = data1.every(function(b) {
			return a !== b;
		})
		check ? data1.push(a) : ''
	})
	let datas = parsedSdp.media[1].rtcpFb;
	let datas0 = []
	let datas1 = [];
	for (let index in datas) {
		datas0.push(datas[index].type)
		if (datas[index].subtype) {
			datas0.push(datas[index].subtype)
		}
	}
	datas0 = datas0.concat(h264Codec.videoCodecs)
	datas0.forEach(function(a) {
		var check = datas1.every(function(b) {
			return a !== b;
		})
		check ? datas1.push(a) : ''
	})

	AudioCodecs.filter(function(n) {
		if (h264Codec.audioCodecs.indexOf(n) != -1) {
			$("#audioCodecs").append(
				'<div class="line"><span>' + n + ':</span><span class="support"></span></div>');
			TestResult.CodecList.audioCodecs[n] = true;
		} else {
			$("#audioCodecs").append(
				'<div class="line"><span>' + n + ':</span><span class="notSupport"></span></div>');
			TestResult.CodecList.audioCodecs[n] = false;
		}
	});
	AudioCodecs.filter(function(n) {
		if (h264Codec1.audioCodecs.indexOf(n) != -1) {
			$("#audioDecoding").append(
				'<div class="line"><span>' + n + ':</span><span class="support"></span></div>');
			TestResult.CodecList.audioDecoding[n] = true;
		} else {
			$("#audioDecoding").append(
				'<div class="line"><span>' + n + ':</span><span class="notSupport"></span></div>');
			TestResult.CodecList.audioDecoding[n] = false;
		}
	});
	VideoCodecs.filter(function(n) {
		if (h264Codec.videoCodecs.indexOf(n) != -1) {
			$("#videoCodecs").append(
				'<div class="line"><span>' + n + ':</span><span class="support"></span></div>');
			TestResult.CodecList.videoCodecs[n] = true;
		} else {
			$("#videoCodecs").append(
				'<div class="line"><span>' + n + ':</span><span class="notSupport"></span></div>');
			TestResult.CodecList.videoCodecs[n] = false;
		}
	});
	VideoCodecs.filter(function(n) {
		if (h264Codec1.videoCodecs.indexOf(n) != -1) {
			$("#videoDecoding").append(
				'<div class="line"><span>' + n + ':</span><span class="support"></span></div>');
			TestResult.CodecList.videoDecoding[n] = true;
		} else {
			$("#videoDecoding").append(
				'<div class="line"><span>' + n + ':</span><span class="notSupport"></span></div>');
			TestResult.CodecList.videoDecoding[n] = false;
		}
	});
	weakNetworkAudio.filter(function(n) {
		console.log(n.toLowerCase())
		if (data1.indexOf(n.toLowerCase()) != -1) {
			$("#weakNetworkAudio").append(
				'<div class="line"><span>' + n + ':</span><span class="support"></span></div>');
			TestResult.WeakNetworkConfrontation.weakNetworkAudio[n] = true;
		} else {
			$("#weakNetworkAudio").append(
				'<div class="line"><span>' + n + ':</span><span class="notSupport"></span></div>');
			TestResult.WeakNetworkConfrontation.weakNetworkAudio[n] = false;
		}
	});
	weakNetworkVideo.filter(function(n) {
		if (datas1.indexOf(n.toLowerCase()) != -1) {
			$("#weakNetworkVideo").append(
				'<div class="line"><span>' + n + ':</span><span class="support"></span></div>');
			TestResult.WeakNetworkConfrontation.weakNetworkVideo[n] = true;
		} else {
			$("#weakNetworkVideo").append(
				'<div class="line"><span>' + n + ':</span><span class="notSupport"></span></div>');
			TestResult.WeakNetworkConfrontation.weakNetworkVideo[n] = false;
		}
	});
	progressContent.style.width = '45%';
	speed.textContent = '进度 45%';
	document.getElementById('other-part1').style.display = 'none';
	document.getElementById('CodecList').style.background = distinguishQuantity1(TestResult['CodecList']);
	document.getElementById('other-part2').style.display = 'none';
	document.getElementById('WeakNetworkConfrontation').style.background = distinguishQuantity1(TestResult[
		'WeakNetworkConfrontation']);
	document.getElementById('other-part4').style.display = 'none';
	document.getElementById('WebAssembly').style.background = distinguishQuantity(TestResult['WebAssembly']);
	websocket()
}

//websocket
async function websocket() {
	document.getElementById('other-part3').style.display = 'block';
	if ("WebSocket" in window) {
		if(!TestResult.webSocket.webSocket){
			$("#other-part3").append(
				'<div class="line"><span>webSocket功能:</span><span class="support"></span></div>'
			);
		}
		TestResult.webSocket.webSocket = true;
	} else {
		$("#other-part3").prepend(
			'<div class="line"><span>webSocket功能:</span><span class="notSupport"></span></div>'
		);
	}
	ws = new window.WebSocket('wss://192.168.131.105:8089/ws', 'sip');
	ws.onopen = function(event) {
		console.log('连接成功')
		keepAliveWithoutResponse = 0
		isChannelOpen = true
		ws.keepAlive()
		if(wasWebsocketClosed){
		    clearTimeout(wsReconnectTimeoutEvent)
		    wsReconnectTimeoutEvent = null
		    wsReconnectTime = 2
		    wasWebsocketClosed = false
			if(!TestResult.webSocket.webSocketReconnection){
				$("#other-part3").append(
					'<div class="line"><span>webSocket重连:</span><span class="support"></span></div>'
				);
				$("#public-part1").append(
					'<div class="line"><span>webSocket断网重连:</span><span class="support"></span></div>');
				document.getElementById('other-part3').style.display = 'none';
				document.getElementById('webSocket').style.background = distinguishQuantity(TestResult['webSocket']);
				captureStream();
			}
			TestResult.webSocket.webSocketReconnection = true;
			TestResult.majorFunction.webSocketReconnection = true;
		}
	}

	ws.onmessage = function(event) {
		if (typeof(event.data) === 'string') {
			if (event.data === 'pong' || event.data === 'ping' || event.data === '\r\n' ||
				event
				.data === '\r\n\r\n') {
				// 保活消息不经过协议栈加工处理
				if (event.data === 'pong') {
					if (!TestResult.webSocket.webSocketKeep) {
						$("#other-part3").append(
							'<div class="line"><span>webSocket保活:</span><span class="support"></span></div>'
						);
						$("#public-part1").append(
							'<div class="line"><span>webSocket保活:</span><span class="support"></span></div>');
						ws.close();
					}
					TestResult.webSocket.webSocketKeep = true;
					TestResult.majorFunction.webSocketKeep = true;
					keepAliveWithoutResponse = 0
				}
			}
		}
	}

	ws.keepAlive = function(type) {
		if (!isChannelOpen) {
			//log.error('websocket is closed, stop keepAlive!')
			return
		}
		wsKeepAliveInterval = setInterval(function() {
			if (keepAliveWithoutResponse >= WS_KEEP_ALIVE_TIMEOUT_FLAG) {
				//log.warn('Keep alive failed, close webSocket')
				ws.close(4000)
				clearInterval(wsKeepAliveInterval)
				wsKeepAliveInterval = null
				return
			}
			ws.send('ping')
			keepAliveWithoutResponse += 1
		}, 2000)
	}

	ws.onclose = function(event) {
		isChannelOpen = false
		wasWebsocketClosed = true

		if (wsKeepAliveInterval) {
			clearInterval(wsKeepAliveInterval)
			wsKeepAliveInterval = null
		}

		// code 为1000是主动关闭的返回码
		if (Number(event.code) === 1000 && !TestResult.webSocket.webSocketReconnection) {
			console.warn('websocket closed!')
			keepAliveWithoutResponse = 0
			wsReconnect(wsReconnectTime)
		}
	}
	
	// captureStream()
}

function wsReconnect(timer) {
	if (timer > 8) {
		$("#other-part3").append(
			'<div class="line"><span>webSocket重连:</span><span class="notSupport"></span></div>'
		);
		TestResult.wobsocket.webSocketReconnection = false;
	} else {
		wsReconnectTimeoutEvent = setTimeout(function() {
			ws && ws.close()
			websocket()
		}, timer * 1000)
	}
}
// captureStream
function captureStream() {
	try {
		var a = document.createElement("canvas");
		var ctx = a.getContext("2d");
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0, 0, 150, 75);
		a.captureStream(25);
		$("#other-part5").prepend(
			'<div class="line"><span>CanvasElement.captureStream():</span><span class="support"></span></div>'
		);
		TestResult.captureStream.CanvasElement = true;
	} catch (e) {
		console.log(e)
		$("#other-part5").prepend(
			'<div class="line"><span>CanvasElement.captureStream():</span><span class="notSupport"></span></div>'
		);
		TestResult.captureStream.CanvasElement = false;
	}

	try {
		var video = document.createElement("video");
		video.captureStream(25);
		$("#other-part5").prepend(
			'<div class="line"><span>MediaElement.captureStream():</span><span class="support"></span></div>'
		);
		TestResult.captureStream.MediaElement = true;
	} catch (e) {
		console.log(e)
		$("#other-part5").prepend(
			'<div class="line"><span>MediaElement.captureStream():</span><span class="notSupport"></span></div>'
		);
		TestResult.captureStream.MediaElement = false;
	}
	progressContent.style.width = '50%';
	speed.textContent = '进度 50%';
	document.getElementById('other-part5').style.display = 'none';
	document.getElementById('captureStream').style.background = distinguishQuantity(TestResult['captureStream']);
	WebAudio()
}

// WebAudio
async function WebAudio() {
	document.getElementById('other-part6').style.display = 'block';
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	const myAudio = document.getElementById('myAudio1');
	// console.log(myAudio)
	var audioContext = new AudioContext()
	var destination = audioContext.createMediaStreamDestination();
	var source;
	var source1 = audioContext.createMediaElementSource(myAudio);
	var scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
	// if (!window.AudioContext && audioContext) {
	// 	data.content[0].value = 'Web Audio'
	// 	data.content[0].type = "no"
	// } else {
	// 	data.content[0].value = 'Web Audio'
	// 	data.content[0].type = "yes"
	// }
	if (destination) {
		$("#other-part6").append(
			'<div class="line"><span>createMediaStreamDestination():</span><span class="support"></span></div>');
		TestResult.WebAudio.createMediaStreamDestination = true;
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createMediaStreamDestination():</span><span class="notSupport"></span></div>'
		);
		TestResult.WebAudio.createMediaStreamDestination = false;
	}
	await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true
		})
		.then(function(stream) {
			source = audioContext.createMediaStreamSource(stream);
			tracks(stream)
		})
		.catch(function(err) {
			console.log('The following gUM error occured: ' + err);
		});
	if (source) {
		$("#other-part6").append(
			'<div class="line"><span>createMediaStreamSource():</span><span class="support"></span></div>');
		TestResult.WebAudio.createMediaStreamSource = true;
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createMediaStreamSource():</span><span class="support"></span></div>');
		TestResult.WebAudio.createMediaStreamSource = false;
	}

	if (source1) {
		$("#other-part6").append(
			'<div class="line"><span>createMediaElementSource():</span><span class="support"></span></div>');
		TestResult.WebAudio.createMediaElementSource = true;
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createMediaElementSource():</span><span class="notSupport"></span></div>');
		TestResult.WebAudio.createMediaElementSource = true;
	}

	audioContext.resume().then(function() {
		$("#other-part6").append(
			'<div class="line"><span>resume():</span><span class="support"></span></div>');
		TestResult.WebAudio.resume = true;
	});

	if (scriptNode) {
		$("#other-part6").append(
			'<div class="line"><span>createScriptProcessor():</span><span class="support"></span></div>');
		TestResult.WebAudio.createScriptProcessor = true;
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createScriptProcessor():</span><span class="notSupport"></span></div>');
		TestResult.WebAudio.createScriptProcessor = false;
	}
	progressContent.style.width = '55%';
	speed.textContent = '进度 55%';
	document.getElementById('other-part6').style.display = 'none';
	document.getElementById('WebAudio').style.background = distinguishQuantity(TestResult['WebAudio']);
	MediaRecorders()
}

// MediaRecorder
async function MediaRecorders() {
	document.getElementById('other-part7').style.display = 'block';
	await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		})
		.then(function(stream) {
			/* 使用这个stream stream */
			var mediaRecorder = new MediaRecorder(stream);
			if (typeof window.MediaRecorder !== 'undefined' && mediaRecorder) {
				var types = ["video/webm", "audio/webm", "video/webm\;codecs=vp8",
					"video/webm\;codecs=daala", "video/webm\;codecs=h264",
					"audio/webm\;codecs=opus", "video/mpeg"
				];
				for (var i in types) {
					if (MediaRecorder.isTypeSupported(types[i])) {
						$("#other-part7").append(
							'<div class="line"><span>' + types[i] +
							':</span><span class="support"></span></div>');
						TestResult.MediaRecorder[types[i]] = false;
					} else {
						$("#other-part7").append(
							'<div class="line"><span>' + types[i] +
							':</span><span class="notSupport"></span></div>');
						TestResult.MediaRecorder[types[i]] = true;
					}
				}
			} else {
				console.log('MediaRecorder, no')
			}
			tracks(stream)
		})
		.catch(function(err) {
			console.log(err)
			/* 处理error */
		});
	progressContent.style.width = '60%';
	speed.textContent = '进度 60%';
	document.getElementById('other-part7').style.display = 'none';
	document.getElementById('MediaRecorder').style.background = distinguishQuantity(TestResult['MediaRecorder']);
	await webcodec()
	// await 
}

// WebCodecs
async function webcodec() {
	document.getElementById('other-part8').style.display = 'block';
	const buffer = new ArrayBuffer(8);
	const view = new Int32Array(buffer);
	try {
		let inits = {
			format: 'u8',
			sampleRate: 3000,
			numberOfFrames: 1,
			numberOfChannels: 1,
			timestamp: 1,
			data: view
		}
		const audiodata = new AudioData(inits);
		$("#other-part8").append(
			'<div class="line"><span>AudioData():</span><span class="support"></span></div>');
		TestResult.WebCodecs.AudioData = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>AudioData():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.AudioData = false;
	}

	try {
		const audioDecoder = new AudioDecoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>AudioDecoder():</span><span class="support"></span></div>');
		TestResult.WebCodecs.AudioDecoder = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>AudioDecoder():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.AudioDecoder = false;
	}

	try {
		const audioEncoder = new AudioEncoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>AudioEncoder():</span><span class="support"></span></div>');
		TestResult.WebCodecs.AudioEncoder = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>AudioEncoder():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.AudioEncoder = false;
	}

	try {
		const videoDecoder = new VideoDecoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>VideoDecoder():</span><span class="support"></span></div>');
		TestResult.WebCodecs.VideoDecoder = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>VideoDecoder():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.VideoDecoder = false;
	}

	try {
		const videoEncoder = new VideoEncoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>VideoEncoder():</span><span class="support"></span></div>');
		TestResult.WebCodecs.VideoEncoder = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>VideoEncoder():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.VideoEncoder = false;
	}

	try {
		const cnv = document.createElement('canvas');
		let frame_from_canvas = new VideoFrame(cnv, {
			timestamp: 0
		});
		$("#other-part8").append(
			'<div class="line"><span>VideoFrame():</span><span class="support"></span></div>');
		TestResult.WebCodecs.VideoFrame = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>VideoFrame():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.VideoFrame = false;
	}

	try {
		let init = {
			type: "image/png",
			data: view
		};
		let imageDecoder = new ImageDecoder(init);
		$("#other-part8").append(
			'<div class="line"><span>ImageDecoder():</span><span class="support"></span></div>');
		TestResult.WebCodecs.ImageDecoder = true;
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>ImageDecoder():</span><span class="notSupport"></span></div>');
		TestResult.WebCodecs.ImageDecoder = false;
	}
	progressContent.style.width = '65%';
	speed.textContent = '进度 65%';
	document.getElementById('other-part8').style.display = 'none';
	document.getElementById('WebCodecs').style.background = distinguishQuantity(TestResult['WebCodecs']);
	storage()
}

// 本地存储
async function storage() {
	document.getElementById('other-part9').style.display = 'block';
	document.getElementById('other-part10').style.display = 'block';
	if (typeof window.localStorage !== 'undefined') {
		$("#other-part9").append(
			'<div class="line"><span>localStorage:</span><span class="support"></span></div>');
		TestResult.LocalStorage.localStorage = true;
	} else {
		$("#other-part9").append(
			'<div class="line"><span>localStorage:</span><span class="notSupport"></span></div>');
		TestResult.LocalStorage.localStorage = false;
	}

	if (typeof window.sessionStorage !== 'undefined') {
		$("#other-part9").append(
			'<div class="line"><span>sessionStorage:</span><span class="support"></span></div>');
		TestResult.LocalStorage.sessionStorage = true;
	} else {
		$("#other-part9").append(
			'<div class="line"><span>sessionStorage:</span><span class="notSupport"></span></div>');
		TestResult.LocalStorage.sessionStorage = false;
	}
	progressContent.style.width = '70%';
	speed.textContent = '进度 70%';
	document.getElementById('other-part9').style.display = 'none';
	document.getElementById('LocalStorage').style.background = distinguishQuantity(TestResult['LocalStorage']);
	document.getElementById('other-part10').style.display = 'none';
	document.getElementById('IndexedDB').style.background = distinguishQuantity(TestResult['IndexedDB']);

	webtransport()
}

// IndexedDB

function webtransport() {
	document.getElementById('other-part11').style.display = 'block';
	if (typeof window.WebTransport !== 'undefined') {
		$("#other-part11").append(
			'<div class="line"><span>WebTransport:</span><span class="support"></span></div>');
		TestResult.other.WebTransport = true;
	} else {
		$("#other-part11").append(
			'<div class="line"><span>WebTransport:</span><span class="notSupport"></span></div>');
		TestResult.other.WebTransport = false;
	}

	if (window.Worker) {
		try {
			var myWorker = new Worker('./js/webtransport/worker.js');
			myWorker.postMessage([1, 2]);
			myWorker.onmessage = function(e) {
				console.log('Message received from worker' + e.data);
			}
			$("#other-part11").append(
				'<div class="line"><span>Web Worker:</span><span class="support"></span></div>');
			TestResult.other.WebWorker = true;
		} catch (e) {
			console.log(e)
			$("#other-part11").append(
				'<div class="line"><span>Web Worker:</span><span class="notSupport"></span></div>');
			TestResult.other.WebWorker = false;
		}
	} else {
		$("#other-part11").append(
			'<div class="line"><span>Web Worker:</span><span class="notSupport"></span></div>');
		TestResult.other.WebWorker = false;
	}

	if (!window.crypto && !window.msCrypto) {
		console.warn("crypto is not supported!")
		return false
	}
	let cipherValue = 'CryptoJS encryption and decryption test'
	let secretValue = 'aes'
	//加密数据
	let encJson = CryptoJS.AES.encrypt(JSON.stringify(cipherValue), secretValue).toString();
	console.log('encJson:', encJson)
	//对加密数据进行base64处理, 原理：就是先将字符串转换为utf8字符数组，再转换为base64数据
	let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
	console.log('encData:', encData)
	//将数据先base64还原，再转为utf8数据
	let decData = CryptoJS.enc.Base64.parse(encData).toString(CryptoJS.enc.Utf8);
	console.log('decData:', decData)
	//解密数据
	let decJson = CryptoJS.AES.decrypt(decData, 'aes').toString(CryptoJS.enc.Utf8);
	console.warn('CryptoJS.AES.decrypt data:', decJson)

	if (decJson === JSON.stringify(cipherValue)) {
		console.warn('解密成功')
		$("#other-part11").append(
			'<div class="line"><span>CryptoJS加解密:</span><span class="support"></span></div>');
		TestResult.other.CryptoJS = true;
	} else {
		$("#other-part11").append(
			'<div class="line"><span>CryptoJS加解密:</span><span class="notSupport"></span></div>');
		TestResult.other.CryptoJS = false;
		console.warn('解密失败？')
	}
	console.log('start')
	progressContent.style.width = '75%';
	speed.textContent = '进度 75%';
	document.getElementById('other-part11').style.display = 'none';
	document.getElementById('other').style.background = distinguishQuantity(TestResult['other']);
	public()
	// start({audio: true, video: true})
}

function public() {
	document.getElementById('public-part1').style.display = 'block';
	if (Offer.sdp.indexOf('a=ice-options:trickle') !== -1) {
		$("#public-part1").append(
			'<div class="line"><span>Trickle-ice:</span><span class="support"></span></div>');
		TestResult.majorFunction.TrickleIce = true;
	} else {
		$("#public-part1").append(
			'<div class="line"><span>Trickle-ice:</span><span class="notSupport"></span></div>');
		TestResult.majorFunction.TrickleIce = false;
	}

	if (window.navigator.hid) {
		$("#public-part1").append(
			'<div class="line"><span>WebHID:</span><span class="support"></span></div>');
		TestResult.majorFunction.WebHID = true;
	} else {
		$("#public-part1").append(
			'<div class="line"><span>WebHID:</span><span class="notSupport"></span></div>');
		TestResult.majorFunction.WebHID = false;
	}
	progressContent.style.width = '80%';
	speed.textContent = '进度 80%';
	getMedia()
}

async function getMedia() {
	if (!stream) {
		let constraints = {
			audio: true
		};
		try {
			console.log("constraints:", constraints)
			if (navigator.mediaDevices.getUserMedia) {
				stream = await navigator.mediaDevices.getUserMedia(constraints);
			}
			window.soundDetection.isMute = isMute = false
			audio.srcObject = stream
			audio.play()

			function callback(event) {
				console.log(event.message)
			}
			window.soundDetection.streamMuteSwitch({
				stream: stream,
				type: 'audio',
				mute: true
			})
			await window.soundDetection.checkAudioOutputVolume({
				isMute: isMute,
				stream: stream,
				callback: callback
			})
		} catch (err) {
			console.error("Error: " + err);
		}
	}
	progressContent.style.width = '85%';
	speed.textContent = '进度 85%';
	logExport()
	network()
}


function network() {

	function getType(obj) {
		if (Object.prototype.toString.call(obj) === '[object Object]') {
			return 'Object'
		} else if (Object.prototype.toString.call(obj) === '[object Array]') {
			return 'Array'
		} else {
			return 'nomal'
		}
	}

	function deepCopy(obj) {
		if (getType(obj) === 'nomal') {
			return obj
		} else {
			var newObj = getType(obj) === 'Object' ? {} : []
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = deepCopy(obj[key])
				}
			}
		}
		return newObj
	}

	function gotStream(stream) {
		localStream = stream;
		localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
		let offer = pc1.createOffer()
		pc1.setLocalDescription(offer)
		tracks(stream)
	}

	function objectDeepCopy(obj, objBefore) {
		function getType(obj) {
			if (Object.prototype.toString.call(obj) === '[object Object]') {
				return 'Object'
			} else if (Object.prototype.toString.call(obj) === '[object Array]') {
				return 'Array'
			} else {
				return 'nomal'
			}
		}

		if (getType(obj) === 'nomal') {
			return obj
		} else {
			var newObj = objBefore ? deepCopy(objBefore) : getType(obj) === 'Object' ? {} : []
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = objectDeepCopy(obj[key])
				}
			}
		}
		return newObj
	}

	function getBandWidth(stats) {
		let bandWidthObject = {};
		let travelTime;
		let curentBytes;

		if (stats && stats.prevTimestamp) {
			travelTime = Number(stats.timestamp) - Number(stats.prevTimestamp)
		} else {
			travelTime = 0
		}

		if (stats && stats.hasOwnProperty('prevBytesReceived')) {
			curentBytes = Number(stats.bytesReceived) - Number(stats.prevBytesReceived)
		} else if (stats && stats.hasOwnProperty('prevBytesSent')) {
			curentBytes = Number(stats.bytesSent) - Number(stats.prevBytesSent)
		} else {
			curentBytes = 0
		}

		if (curentBytes >= 0 && travelTime > 0) {
			bandWidthObject.bandWidthVal = curentBytes * 8 * 1000 / travelTime
		} else {
			bandWidthObject.bandWidthVal = 0
		}

		bandWidthObject.bandWidthUnit = 'bps'

		return bandWidthObject
	}
	// var configuration = {},
	//     pc1, pc2, localStream, names, differenceRtt, time,
	//     roundTripTime = 0,
	//     jitter = '正常',
	//     offerOptions = {
	//         offerToReceiveAudio: 1,
	//         offerToReceiveVideo: 1
	//     }
	var configuration = {},
		pc1, pc2, localStream, names, differenceRtt, time,
		type = '正常',
		roundTripTime = 0,
		audioOut = '0.00%',
		videoOut = '0.00%',
		stats1 = '',
		rttTimesArr = [],
		jitter = '正常',
		offerOptions = {
			offerToReceiveAudio: 1,
			offerToReceiveVideo: 1
		}
	pc1 = new RTCPeerConnection(configuration)
	pc2 = new RTCPeerConnection(configuration)
	pc1.onicecandidate = function(event) {
		if (!event.candidate) {
			pc2.onicecandidate = function(event) {
				if (!event.candidate) {
					pc1.setRemoteDescription(pc2.localDescription)
				}
			};
			pc2.setRemoteDescription(pc1.localDescription)
			let answer = pc2.createAnswer()
			pc2.setLocalDescription(answer)
		}
	};
	navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
			frameRate: {
				exact: 15,
			}
		})
		.then(gotStream)
		.catch(e => alert(`getUserMedia() error: ${e.name}`));
	time = setInterval(function() {
		let selector = null;
		pc1.getStats(selector).then(function(report) {
			let statsData = {};
			let statsNeed = {};
			let lossRates = {};
			report.forEach(item => {
				statsData[item.id] = deepCopy(item)
			})
			// console.log(statsData)
			let candidate = [];
			let transport = [];
			for (let key in statsData) {
				let statstype = (statsData[key].type === 'inbound-rtp') ?
					'local_in' : (statsData[key].type === 'outbound-rtp') ?
					'local_out' : (statsData[key].type === 'remote-inbound-rtp') ?
					'remote_in' : null
				let stats_id = 'ssrc_' + statsData[key].ssrc

				if (statstype) {
					if (statstype && statstype.indexOf('local') >= 0) {
						statsNeed[stats_id] = statsNeed[stats_id] ?
							objectDeepCopy(statsData[key], statsNeed[stats_id]) : objectDeepCopy(
								statsData[key])
					} else if (statsNeed[stats_id] && statstype === 'remote_in') {
						statsNeed[stats_id].packetsLost = statsData[key]
							.packetsLost
					}
					statsNeed[stats_id].roundTripTime = statsData[key]
						.hasOwnProperty('roundTripTime') ? Number(statsData[key]
							.roundTripTime) * 1000 : null
					statsNeed[stats_id].jitter = statsData[key].hasOwnProperty(
						'jitter') ? Number(statsData[key].jitter) : null
				}
				if (statsData[key].type === 'candidate-pair') {
					candidate.push(statsData[key])
				}
				if (statsData[key].type === 'transport') {
					transport.push(statsData[key])
				}
			}
			for (let key in statsNeed) {
				let codeDetail = report[statsNeed[key].codecId] || null
				let trackDetail = report[statsNeed[key].trackId] || null
				if (codeDetail) {
					for (let keyIn in codeDetail) {
						if (keyIn !== 'id' && keyIn !== 'type' && keyIn !==
							'mimeType') {
							statsNeed[key][keyIn] = codeDetail[keyIn]
						}

						if (keyIn === 'mimeType') {
							statsNeed[key].codecName = codeDetail[keyIn].split(
								'/')[1]
						}
					}
				}

				if (trackDetail) {
					for (let keyIn in trackDetail) {
						if (keyIn !== 'id' && keyIn !== 'type') {
							statsNeed[key][keyIn] = trackDetail[keyIn]
						}
					}
				}

				for (let keyId in statsNeed[key]) {
					if (keyId.toLocaleLowerCase().indexOf('id') >= 0 || keyId ===
						'kind') {
						delete(statsNeed[key][keyId])
					}
				}
			}

			for (let key in statsNeed) {

				if (!stats1) {
					stats1 = {}
				}

				if (stats1[key]) {
					if (stats1[key].hasOwnProperty('packetsSent')) {
						statsNeed[key].prevPacketsSent = stats1[key]
							.packetsSent
					}
					if (stats1[key].hasOwnProperty('packetsLost')) {
						statsNeed[key].prevPacketsLost = stats1[key]
							.packetsLost
					}
				}
			}

			stats1 = deepCopy(statsNeed)

			// console.log(transport)
			// console.log(candidate)
			for (let a in transport) {
				for (let b in candidate) {
					if (transport[a].selectedCandidatePairId == candidate[b].id) {
						// console.log(candidate[b])
					}
				}
			}

			for (let i in statsNeed) {
				roundTripTime = statsNeed[i].roundTripTime
				rttTimesArr.push(roundTripTime)
			}
			if (rttTimesArr.length > 6) {
				rttTimesArr.splice(0, 2)
			}
			const length = rttTimesArr.length
			differenceRtt = rttTimesArr[length - 1] - rttTimesArr[length - 2]
			if (differenceRtt >= 500) {
				jitter = '高'
			} else if (differenceRtt >= 100) {
				jitter = '较大'
			} else {
				jitter = '正常'
			}

			let stats = statsNeed;
			for (let key in stats) {
				let lossRate = {
					lossRate: '0.00%',
					bandWidthVal: 0,
					bandWidthUnit: 'bps',
					codecName: '',
					ssrc: key
				};
				let statsNow = stats[key]
				let packetsLossRate;

				if (statsNow.hasOwnProperty('packetsSent') && statsNow
					.hasOwnProperty('packetsLost')) {
					packetsLossRate = (Number(statsNow.packetsLost) - Number(statsNow
							.prevPacketsLost)) /
						Number(
							Number(statsNow.packetsSent) - Number(statsNow.prevPacketsSent))


				}


				if (typeof(packetsLossRate) === "number" && packetsLossRate
					.toString() !== 'NaN') {
					if (packetsLossRate > 1) {
						packetsLossRate = 1
					}
					lossRate.lossRate = (packetsLossRate * 100).toFixed(2) + '%'
				} else {
					lossRate.lossRate = 'negative'
				}

				// if (statsNow.codecName) {

				// }
				lossRate.codecName = statsNow.mediaType;

				if (statsNow.hasOwnProperty('roundTripTime')) {
					lossRate.roundTripTime = statsNow.roundTripTime
				}
				if (statsNow.hasOwnProperty('jitter')) {
					lossRate.jitter = statsNow.jitter
				}

				if (statsNow.frameWidth && statsNow.frameWidth !== '0' && statsNow
					.frameHeight && statsNow.frameHeight !== '0') {
					lossRate.resolution = statsNow.frameWidth + ' X ' + statsNow
						.frameHeight
				}

				lossRate.bandWidthVal = getBandWidth(statsNow).bandWidthVal;
				lossRate.bandWidthUnit = getBandWidth(statsNow).bandWidthUnit;

				lossRates[key] = lossRate
			}

			// console.log(lossRates)
			for (let j in lossRates) {
				if (lossRates[j].codecName === 'video' && lossRates[j]
					.lossRate !== 'negative') {
					videoOut = lossRates[j].lossRate
				} else if (lossRates[j].codecName === 'audio' && lossRates[j]
					.lossRate !== 'negative') {
					audioOut = lossRates[j].lossRate
				}
			}
		})

		let maxLossRate = Math.max(Number(videoOut.replace('%', '')), Number(audioOut.replace('%', '')))
		if (maxLossRate >= 20 || differenceRtt >= 500) {
			type = '差'
		} else if (maxLossRate >= 10 || differenceRtt >= 100) {
			type = '一般'
		} else {
			type = '好'
		}
		console.log((roundTripTime / 2).toFixed() + 'ms', jitter)
		clearTimeout(time)
		$("#public-part2").append(
			'<div class="line"><span>网络延迟:</span><span class="support"></span></div>');
		TestResult.getStats.roundTripTime = true;
		$("#public-part2").append(
			'<div class="line"><span>网络抖动:</span><span class="support"></span></div>');
		TestResult.getStats.jitter = true;
		start()
		start1()
		// _this.roundTripTime = (roundTripTime / 2).toFixed() + 'ms';
		// _this.jitter = jitter
	}, 5000)
}
