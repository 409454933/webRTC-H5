let vconsole = null
let Videos = []
let ws = null
let isChannelOpen = false
let keepAliveWithoutResponse = 0
let wsKeepAliveInterval = null
let WS_KEEP_ALIVE_TIMEOUT_FLAG = 5
let wsReconnectTime = 2
var Offer
var Answer
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
document.getElementById('start').onclick = function(){
	testingEnvironment()
	Switch()
}

let blockHeaders = document.getElementsByClassName('block-header')
document.getElementById('expand').onclick = Switch;

function Switch(){
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
	devicePermissions()
}

// 设备权限
async function devicePermissions() {
	await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		})
		.then(stream => {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用摄像头:</span><span class="support"></span></div>')
			tracks(stream)
		})
		.catch(function(err) {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用摄像头:</span><span class="notSupport"></span></div>')
		});

	await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		})
		.then(stream => {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用摄像头:</span><span class="support"></span></div>')
			tracks(stream)
		})
		.catch(function(err) {
			$("#interface-part1").append(
				'<div class="line"><span>是否允许使用摄像头:</span><span class="notSupport"></span></div>')
		});
	await PeerConnection()
}

// RTCPeerConnection API
async function PeerConnection() {
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
	} else {
		$("#interface-part2").append(
			'<div class="line"><span>RTCPeerConnection():</span><span class="notSupport"></span></div>');
	}

	pc.onicecandidate = async event => {
		if (!event.candidate) {
			// 传输东西
			sdp = pc.localDescription;
			Offer = sdp
			$("#interface-part3").append(
				'<div class="line"><span>icecandidate():</span><span class="support"></span></div>');

			try {
				pc1.setRemoteDescription(sdp)
				$("#interface-part2").append(
					'<div class="line"><span>setRemoteDescription():</span><span class="support"></span></div>'
				);
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>setRemoteDescription():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				answer = await pc1.createAnswer();
				$("#interface-part2").append(
					'<div class="line"><span>createAnswer():</span><span class="support"></span></div>'
				);
				await pc1.setLocalDescription(answer)
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>createAnswer():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				pc.getTransceivers()
				$("#interface-part2").append(
					'<div class="line"><span>getTransceivers():</span><span class="support"></span></div>'
				);
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getTransceivers():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				pc.getSenders()
				$("#interface-part2").append(
					'<div class="line"><span>getSenders():</span><span class="support"></span></div>'
				);
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getSenders():</span><span class="notSupport"></span></div>'
				);
			}


			try {
				pc.getReceivers()
				$("#interface-part2").append(
					'<div class="line"><span>getReceivers():</span><span class="support"></span></div>'
				);
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getReceivers():</span><span class="notSupport"></span></div>'
				);
			}


			try {
				pc.getStats()
				$("#interface-part2").append(
					'<div class="line"><span>getStats():</span><span class="support"></span></div>');
				$("#interface-part4").append(
					'<div class="line"><span>getStats():</span><span class="support"></span></div>');
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>getStats():</span><span class="notSupport"></span></div>'
				);
				$("#interface-part4").append(
					'<div class="line"><span>getStats():</span><span class="notSupport"></span></div>'
				);
			}


		}
	};

	pc1.onicecandidate = event => {
		if (!event.candidate) {
			// 传输东西
			sdp = pc1.localDescription;
			Answer = sdp
			console.log(Answer)
		}
	};

	pc.addEventListener("iceconnectionstatechange", ev => {
		// console.log(ev)
		$("#interface-part3").append(
			'<div class="line"><span>iceconnectionstatechange:</span><span class="support"></span></div>'
		);
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
				break;
		}
	}, false);

	pc.addEventListener("negotiationneeded", ev => {
		// console.log(ev)
		$("#interface-part3").append(
			'<div class="line"><span>negotiationneeded:</span><span class="support"></span></div>');
	}, false);

	pc.addEventListener("connectionstatechange", ev => {
		// console.log(ev)
		$("#interface-part3").append(
			'<div class="line"><span>connectionstatechange:</span><span class="support"></span></div>'
		);
	}, false);

	pc.addEventListener("signalingstatechange", ev => {
		$("#interface-part3").append(
			'<div class="line"><span>signalingstatechange:</span><span class="support"></span></div>'
		);
	}, false);

	await navigator.mediaDevices.getUserMedia(constraints)
		.then(async function(stream) {
			/* 使用这个stream stream */
			try {
				stream.getTracks().forEach(track => pc.addTrack(track, stream));
				$("#interface-part2").append(
					'<div class="line"><span>addTrack():</span><span class="support"></span></div>');
				$("#interface-part8").append(
					'<div class="line"><span>addTrack():</span><span class="support"></span></div>');
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>addTrack():</span><span class="notSupport"></span></div>'
				);
				$("#interface-part8").append(
					'<div class="line"><span>addTrack():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				stream.getAudioTracks()[0]
				$("#interface-part8").append(
					'<div class="line"><span>getAudioTracks():</span><span class="support"></span></div>'
				);
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
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>createOffer():</span><span class="notSupport"></span></div>'
				);
			}

			try {
				await pc.setLocalDescription(offer);
				$("#interface-part2").append(
					'<div class="line"><span>setLocalDescription():</span><span class="support"></span></div>'
				);
			} catch (e) {
				log.error(e);
				$("#interface-part2").append(
					'<div class="line"><span>setLocalDescription():</span><span class="notSupport"></span></div>'
				);
			}
			tracks(stream)

		})
		.catch(err => {
			log.error(e);
		});

	// setTimeout(function(){
	// 	codes()
	// },5000)
	Receiver()
};

// RTCRtpSender
async function Receiver() {
	let pc = new RTCPeerConnection();
	// await navigator.mediaDevices.getUserMedia({
	//         video: true,
	//         audio: true
	//     }).then(stream => {
	//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
	//     })
	//     .catch(err => {
	//         // console.log(err)
	//     });
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
		} catch (e) {
			// log.error(e);
			$("#interface-part4").append(
				'<div class="line"><span>getParameters():</span><span class="notSupport"></span></div>'
			);
		}

		try {
			const sender = pc.getSenders()[0];
			const parameters = sender.getParameters();
			sender.setParameters(parameters)
			$("#interface-part4").append(
				'<div class="line"><span>setParameters():</span><span class="support"></span></div>');
		} catch (e) {
			// log.error(e);
			$("#interface-part4").append(
				'<div class="line"><span>setParameters():</span><span class="notSupport"></span></div>'
			);
		}

		try {
			sender1.replaceTrack(videoTrack1);
			$("#interface-part4").append(
				'<div class="line"><span>replaceTrack():</span><span class="support"></span></div>');
		} catch (e) {
			// log.error(e);
			$("#interface-part4").append(
				'<div class="line"><span>replaceTrack():</span><span class="notSupport"></span></div>'
			);
		}

		try {
			RTCRtpSender.getCapabilities("video");
			$("#interface-part4").append(
				'<div class="line"><span>getCapabilities():</span><span class="support"></span></div>'
			);
			$("#interface-part9").append(
				'<div class="line"><span>getCapabilities():</span><span class="support"></span></div>'
			);
		} catch (e) {
			log.error(e);
			$("#interface-part4").append(
				'<div class="line"><span>getCapabilities():</span><span class="notSupport"></span></div>'
			);
			$("#interface-part9").append(
				'<div class="line"><span>getCapabilities():</span><span class="notSupport"></span></div>'
			);
		}
		
		tracks(stream)
	});
	enumerateDevices()
};

// MediaDevices.enumerateDevices
function enumerateDevices() {
	navigator.mediaDevices.enumerateDevices()
		.then(devices => {
			for (let i in devices) {
				if (devices[i].deviceId !== 'default' && devices[i].deviceId !== 'communications') {
					if (devices[i].kind == 'audioinput') {
						$("#audio-input").append('<li>' + devices[i].label + '</li>');
					} else if (devices[i].kind == 'audiooutput') {
						$("#audio-output").append('<li>' + devices[i].label + '</li>');
					} else if (devices[i].kind == 'videoinput') {
						let datas = {
							label: devices[i].label,
							devices: devices[i].deviceId
						}
						Videos.push(datas)
						$("#video-input").append('<li>' + devices[i].label + '</li>');
					}
				}
			}
			$("#interface-part5").prepend(
				'<div class="line"><span>enumerateDevices获取设备列表:</span><span class="support"></span></div>');
		})
		.catch(function(err) {
			// log.error(e);
			console.log(err)
			$("#interface-part5").append(
				'<div class="line">enumerateDevices获取设备列表:</span><span class="notSupport"></span></div>');
		});
	navigator.mediaDevices.ondevicechange = event => {
		$("#interface-part5").append(
			'<div class="line"><span>ondevicechange 事件:</span><span class="support"></span></div>');
	}
	getDisplayMedia()
};

// MediaDevices.getDisplayMedia
async function getDisplayMedia() {
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
	} else {
		await navigator.mediaDevices.getDisplayMedia(constraints)
			.then(stream => {
				let video = document.createElement('video');
				video.srcObject = stream;
				video.onloadedmetadata = async function() {
					$("#interface-part6").prepend('<div class="line"><span>支持的最大分辨率:</span><span>' +
						video.videoWidth + " * " + video.videoHeight + '</span></div>');
					tracks(stream)
				}
			})
			.catch(function(err) {
				console.log(err)
			});

		let data = [{
			exact: 5
		}, {
			ideal: 5
		}, '5', {
			exact: 15
		}, {
			ideal: 15
		}, '15', {
			exact: 30
		}, {
			ideal: 30
		}, '30']
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
					$("#interface-part6").append('<div class="line"><span>' + datas[1] + datas[2].split('}')[
						0] + 'fps:</span><span class="support"></span></div>');
					tracks(stream)
				})
				.catch(function(err) {
					console.log(err)
					$("#interface-part6").append('<div class="line"><span>' + datas[1] + datas[2].split('}')[
						0] + 'fps:</span><span class="notSupport"></span></div>');
				});
		}

	}

	resolvingPower()
};

// MediaDevices.getUserMedia
async function resolvingPower() {
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
				tracks(stream)
			})
			.catch(err => {
				/* 处理error */
				$("#video" + i).append(
					'<div class="line"><span>' + data[n].name +
					':</span><span class="notSupport"></span></div>'
				);
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
					tracks(stream)
				})
				.catch(err => {
					/* 处理error */
					$("#video" + i).append(
						'<div class="line"><span>' + quickScan[j].width + " * " + quickScan[j].height +
						" * " + 'frameRate:' + quickScan[j].frameRate +
						':</span><span class="notSupport"></span></div>');
				});
		}
	}
	MediaStreamTrack()
}

// MediaStreamTrack
async function MediaStreamTrack() {
	const constraints = {
		audio: true,
		video: {
			width: {
				exact: 640
			},
			height: {
				exact: 480
			}
		}
	};
	const constraints1 = {
		audio: true,
		video: {
			width: {
				exact: 340
			},
			height: {
				exact: 240
			}
		}
	};
	await navigator.mediaDevices.getUserMedia(constraints1)
		.then(mediaStream => {
			const track = mediaStream.getVideoTracks()[0];
			track.applyConstraints(constraints)
				.then(res => {
					$("#interface-part9").prepend(
						'<div class="line"><span>applyConstraints():</span><span class="support"></span></div>'
					);
				})
				.catch(e => {
					console.log(e)
					$("#interface-part9").prepend(
						'<div class="line"><span>applyConstraints():</span><span class="notSupport"></span></div>'
					);
				});
			tracks(mediaStream)
		});
	codes();
}

function codes() {
	console.log('codes')
	console.log(Offer)
	let parsedSdp = SDPTools.parseSDP(Offer.sdp);
	let h264Codec = SDPTools.getRTCRtpCapabilities(Offer.sdp, ['telephone-event',
		'rtx',
		'red', 'ulpfec'
	])
	let data3 = Offer.sdp.split('\r\n')
	let data4 = [];
	for (let n in data3) {
		if (data3[n].substring(0, 2) == 'a=') {
			data4.push(data3[n])
		}
	}
	// console.log(data4)
	let data0 = parsedSdp.media[0].rtcpFb;
	let data1 = parsedSdp.media[1].rtcpFb;
	let data2 = [];
	data1.forEach(function(a) {
		var check = data2.every(function(b) {
			// return a.type !== b.type;
			return a.type !== b.type || a.subtype !== a.subtype;
		})
		check ? data2.push(a) : ''
	})
	let datas = []
	let videoCode = ['FEC', 'RED', 'RTCP', 'RTX', 'NACK', 'PLI', 'FIR', 'REMB']
	for(let index in data1){
		datas.push(data1[index].type)
		if(data1[index].subtype){
			datas.push(data1[index].subtype)
		}
	}
	let datas0 = []
	datas.forEach(function(a) {
		var check = datas0.every(function(b) {
			return a !== b;
		})
		check ? datas0.push(a) : ''
	})
	console.log(datas0)
	// data0.forEach(function(a) {
	// 	var check = datas.every(function(b) {
	// 		return a.type !== b.type;
	// 	})
	// 	check ? datas.push(a) : ''
	// })
	// console.log(data2)
	// console.log(parsedSdp.media[1])
	
	// console.log(datas)
	// let parsedSdp1 = this.$sdp_tools.parseSDP(this.answer.sdp);
	let h264Codec1 = SDPTools.getRTCRtpCapabilities(Answer.sdp, ['telephone-event',
		'rtx',
		'red', 'ulpfec'
	])

	//console.log(parsedSdp1)
	let videoCodecs = {
		name: '视频编码能力',
		content: [{
			value: ''
		}]
	};
	let videoDecoding = {
		name: '视频解码能力',
		content: [{
			value: ''
		}]
	};
	let audioCodecs = {
		name: '音频编码能力',
		content: [{
			value: ''
		}]
	};
	let audioDecoding = {
		name: '音频解码能力',
		content: [{
			value: ''
		}]
	};
	let Weaknetwork = {
		name: '弱网对抗能力',
		content: [{
			value: ''
		}]
	};
	for (let i in h264Codec.audioCodecs) {
		$("#audioCodecs").append(
			'<div class="line"><span>' + h264Codec.audioCodecs[i] + ':</span><span class="support"></span></div>');
		// h264Codec.audioCodecs[i] ? audioCodecs.content[0].value += h264Codec.audioCodecs[i] +
		// 	'，' : ''
	}

	for (let i in h264Codec1.audioCodecs) {
		$("#audioDecoding").append(
			'<div class="line"><span>' + h264Codec1.audioCodecs[i] + ':</span><span class="support"></span></div>');
		// h264Codec1.audioCodecs[i] ? audioDecoding.content[0].value += h264Codec1.audioCodecs[i] +
		// 	'，' : ''
	}

	for (let i in h264Codec.videoCodecs) {
		$("#videoCodecs").append(
			'<div class="line"><span>' +  h264Codec.videoCodecs[i] + ':</span><span class="support"></span></div>');
		// videoCodecs.content[0].value += h264Codec.videoCodecs[i] + '，'
	}

	for (let i in h264Codec1.videoCodecs) {
		$("#videoDecoding").append(
			'<div class="line"><span>' +  h264Codec1.videoCodecs[i] + ':</span><span class="support"></span></div>');
		// videoDecoding.content[0].value += h264Codec1.videoCodecs[i] + '，'
	}
	for (let i in data2) {
		Weaknetwork.content[0].value += data2[i].type + '，'
	}
	console.log(videoCodecs)
	console.log(videoDecoding)
	console.log(audioCodecs)
	console.log(audioDecoding)
	console.log(Weaknetwork)
	captureStream()
}

//websocket
async function websocket() {
	try {
		ws = new window.WebSocket('wss://192.168.131.105:8089/ws', 'sip');
		ws.onopen = function(event) {
			console.log('连接成功')
			// delete This.datas[0].content[0].content[2];
			// This.datas[0].content[0].content[2] = {
			// 	value: 'WebSocket重连',
			// 	type: 'yes'
			// }
			keepAliveWithoutResponse = 0
			isChannelOpen = true
			ws.keepAlive()
		}

		ws.onmessage = function(event) {
			if (typeof(event.data) === 'string') {
				if (event.data === 'pong' || event.data === 'ping' || event.data === '\r\n' ||
					event
					.data === '\r\n\r\n') {
					// 保活消息不经过协议栈加工处理
					if (event.data === 'pong') {
						$("#other-part3").prepend(
							'<div class="line"><span>webSocket保活:</span><span class="support"></span></div>'
						);
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
			// datas[0].content[0].content[2] = {
			// 	value: 'WebSocket重连',
			// 	type: 'no'
			// }
			// log.warn('websocket onclose code: ' + event.code + ", reason: " + event.reason)
			isChannelOpen = false
			wasWebsocketClosed = true

			if (wsKeepAliveInterval) {
				clearInterval(wsKeepAliveInterval)
				wsKeepAliveInterval = null
			}

			// code 为1000是主动关闭的返回码
			if (Number(event.code) === 1000) {
				console.warn('websocket closed!')
				keepAliveWithoutResponse = 0
				wsReconnect(wsReconnectTime)
			}
		}
		$("#other-part3").prepend(
			'<div class="line"><span>webSocket功能:</span><span class="support"></span></div>'
		);
	} catch (e) {
		console.log(e)
		$("#other-part5").prepend(
			'<div class="line"><span>webSocket功能::</span><span class="notSupport"></span></div>'
		);
	}

	// this.ws = await this.createWebSocket('', 'sip');
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
	} catch (e) {
		console.log(e)
		$("#other-part5").prepend(
			'<div class="line"><span>CanvasElement.captureStream():</span><span class="notSupport"></span></div>'
		);
	}

	try {
		var video = document.createElement("video");
		video.captureStream(25);
		$("#other-part5").prepend(
			'<div class="line"><span>MediaElement.captureStream():</span><span class="support"></span></div>'
		);
	} catch (e) {
		console.log(e)
		$("#other-part5").prepend(
			'<div class="line"><span>MediaElement.captureStream():</span><span class="notSupport"></span></div>'
		);
	}
	WebAudio()
}

// WebAudio
async function WebAudio() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	const myAudio = document.querySelector('audio');
	console.log(myAudio)
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
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createMediaStreamDestination():</span><span class="notSupport"></span></div>'
		);
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
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createMediaStreamSource():</span><span class="support"></span></div>');
	}

	if (source1) {
		$("#other-part6").append(
			'<div class="line"><span>createMediaElementSource():</span><span class="support"></span></div>');
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createMediaElementSource():</span><span class="notSupport"></span></div>');
	}

	audioContext.resume().then(function() {
		$("#other-part6").append(
			'<div class="line"><span>resume():</span><span class="support"></span></div>');
	});

	if (scriptNode) {
		$("#other-part6").append(
			'<div class="line"><span>createScriptProcessor():</span><span class="support"></span></div>');
	} else {
		$("#other-part6").append(
			'<div class="line"><span>createScriptProcessor():</span><span class="notSupport"></span></div>');
	}

	MediaRecorders()
}

// MediaRecorder
async function MediaRecorders() {
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
					} else {
						$("#other-part7").append(
							'<div class="line"><span>' + types[i] +
							':</span><span class="notSupport"></span></div>');
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
	webcodec()
}

// WebCodecs
async function webcodec() {
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
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>AudioData():</span><span class="notSupport"></span></div>');
	}

	try {
		const audioDecoder = new AudioDecoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>AudioDecoder():</span><span class="support"></span></div>');
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>AudioDecoder():</span><span class="notSupport"></span></div>');
	}

	try {
		const audioEncoder = new AudioEncoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>AudioEncoder():</span><span class="support"></span></div>');
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>AudioEncoder():</span><span class="notSupport"></span></div>');
	}

	try {
		const videoDecoder = new VideoDecoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>VideoDecoder():</span><span class="support"></span></div>');
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>VideoDecoder():</span><span class="notSupport"></span></div>');
	}

	try {
		const videoEncoder = new VideoEncoder({
			output: function() {},
			error: function() {},
		});
		$("#other-part8").append(
			'<div class="line"><span>VideoEncoder():</span><span class="support"></span></div>');
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>VideoEncoder():</span><span class="notSupport"></span></div>');
	}

	try {
		const cnv = document.createElement('canvas');
		let frame_from_canvas = new VideoFrame(cnv, {
			timestamp: 0
		});
		$("#other-part8").append(
			'<div class="line"><span>VideoFrame():</span><span class="support"></span></div>');
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>VideoFrame():</span><span class="notSupport"></span></div>');
	}

	try {
		let init = {
			type: "image/png",
			data: view
		};
		let imageDecoder = new ImageDecoder(init);
		$("#other-part8").append(
			'<div class="line"><span>ImageDecoder():</span><span class="support"></span></div>');
	} catch (e) {
		console.log(e)
		$("#other-part8").append(
			'<div class="line"><span>ImageDecoder():</span><span class="notSupport"></span></div>');
	}

	storage()
}

// 本地存储
async function storage() {
	if (typeof window.localStorage !== 'undefined') {
		$("#other-part9").append(
			'<div class="line"><span>localStorage:</span><span class="support"></span></div>');
	} else {
		$("#other-part9").append(
			'<div class="line"><span>localStorage:</span><span class="notSupport"></span></div>');
	}

	if (typeof window.sessionStorage !== 'undefined') {
		$("#other-part9").append(
			'<div class="line"><span>sessionStorage:</span><span class="support"></span></div>');
	} else {
		$("#other-part9").append(
			'<div class="line"><span>sessionStorage:</span><span class="notSupport"></span></div>');
	}

	webtransport()
}

// IndexedDB

function webtransport() {
	if (typeof window.WebTransport !== 'undefined') {
		$("#other-part11").append(
			'<div class="line"><span>WebTransport:</span><span class="support"></span></div>');
	} else {
		$("#other-part11").append(
			'<div class="line"><span>WebTransport:</span><span class="notSupport"></span></div>');
	}

	if (window.Worker) {
		try {
			var myWorker = new Worker('./js/worker.js');
			myWorker.postMessage([1, 2]);
			myWorker.onmessage = function(e) {
				console.log('Message received from worker' + e.data);
			}
			$("#other-part11").append(
				'<div class="line"><span>Web Worker:</span><span class="support"></span></div>');
		} catch (e) {
			console.log(e)
			$("#other-part11").append(
				'<div class="line"><span>Web Worker:</span><span class="notSupport"></span></div>');
		}
	} else {
		$("#other-part11").append(
			'<div class="line"><span>Web Worker:</span><span class="notSupport"></span></div>');
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
		return true
	} else {
		$("#other-part11").append(
			'<div class="line"><span>CryptoJS加解密:</span><span class="notSupport"></span></div>');
		console.warn('解密失败？')
		return false
	}
}


