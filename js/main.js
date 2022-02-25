
/**
 * video虚拟背景测试
 */
async function streamBackgroundTest(res){
	let LocalVideo = document.getElementById('video')
	if(!StreamBackgroundEffect){
		LocalVideo.style.display = 'block'
		return
	}
	LocalVideo.onloadedmetadata = function (){
		console.log('current res: '+ LocalVideo.videoWidth + '*' + LocalVideo.videoHeight)
		if(LocalVideo.videoWidth && LocalVideo.videoHeight){
			console.log('如果video成功显示视频并带有虚拟背景的效果，说明支持虚拟背景设置，否则不支持')
            return 'ok'
		}else{
            return 'no'
        }
	}

	let backgroundEffect = await new StreamBackgroundEffect()
    let constraints
    if(res){
        constraints = {
            audio: false,
            video: {
                facingMode: {
                    exact: "environment"
                }
            }
        };
    }else{
       constraints = {
           audio: false,
           video: true
       };
    }
	let localStream = await navigator.mediaDevices.getUserMedia(constraints)

	let virtualBackgroundOption =  {
		"backgroundType": "image",
		"backgroundEffectEnabled": true,
		"blurValue": "",
		"virtualSource": "./js/images/background-1.jpg"
	}
	backgroundEffect.setVirtualBackground(virtualBackgroundOption)
	LocalVideo.srcObject = await backgroundEffect.startEffect(localStream)
	LocalVideo.style.display = 'block'
}

/**
 * 日志导出
 * 不需要下载最后的日志，所有不需要触发dispatchEvent
 */
function logExport(){
	if (!window.indexedDB) {
		console.warn("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
		return
	}
	let log = {}
	log.debug = window.debug('indexedDB:DEBUG')
	log.log = window.debug('indexedDB:LOG')
	log.info = window.debug('indexedDB:INFO')
	log.warn = window.debug('indexedDB:WARN')
	log.error = window.debug('indexedDB:ERROR')
	log.info('window onload ...')
	let index = 0
	let testInterval = setInterval(function (){
		log.info('print test index ' + index)
		index++

		if(index === 10){
			log.warn('clear test Interval')
			clearInterval(testInterval)
			dbExport.getAllWidthIDBKeyRange(true)
		}
	}, 10)

	window.dbExport = new DBExport(true)
}
