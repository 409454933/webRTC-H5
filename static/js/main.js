/**
 * CryptoJS加解密测试
 */
function getDecryptData(){
	if(!window.crypto && !window.msCrypto){
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

	if(decJson === JSON.stringify(cipherValue)){
		console.warn('解密成功')
		return true
	}else {
		console.warn('解密失败？')
		return false
	}
}

/**
 * video虚拟背景测试
 */
async function streamBackgroundTest(res){
	let LocalVideo = document.getElementById('videw1')
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
		"virtualSource": "../static/js/images/background-1.jpg"
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

		if(index === 50){
			log.warn('clear test Interval')
			clearInterval(testInterval)
			dbExport.getAllWidthIDBKeyRange(true)
		}
	}, 10)

	window.dbExport = new DBExport(true)
}
