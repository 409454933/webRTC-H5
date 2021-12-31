<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="音频输入设备：">
                <el-select v-model="formInline.audioSource" placeholder="音频输入设备">
                    <el-option :label="item.text" :value="item.value" v-for="(item, key) in audioSource" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="音频输出设备：">
                <el-select v-model="formInline.audioOutput" placeholder="音频输出设备">
                    <el-option :label="item.text" :value="item.value" v-for="(item, key) in audioOutput" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频输入设备：">
                <el-select v-model="formInline.videoSource" placeholder="视频输入设备">
                    <el-option :label="item.text" :value="item.value" v-for="(item, key) in videoSource" :key='key'></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-row :gutter="20">
          <el-col :span="1">
              <el-tag>本地画面</el-tag>
          </el-col>
          <el-col :span="5">
              <video autoplay playsinline id = "player" ref="player"></video>
          </el-col>
          <el-col :span="1">
              <el-tag type="success">录制画面</el-tag>
          </el-col>
          <el-col :span="5">
              <video playsinline id = "player1" ref="player1"></video>
          </el-col>

        </el-row>


        <el-row style="margin-top: 20px;">
          <el-button plain @click='start()'>选择录制窗口</el-button>
          <el-button type="primary" plain @click='startRecord()'>开始录制</el-button>
          <el-button type="success" plain @click='stopRecord()'>结束录制</el-button>
          <el-button type="info" plain @click='play()'>播放录制</el-button>
        </el-row>



        <!--        <el-button type="primary" plain>逻辑服务</el-button>-->

    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                formInline: {
                    audioSource: '',
                    audioOutput: '',
                    videoSource: ''
                },
                stream: '',
                audioSource: [], // 音频输入设备
                audioOutput: [], // 音频输出设备
                videoSource: [],  // 视频输入设备
                buffer: [],
                mediaRecorder: ''
            }
        },
        methods: {
            gotDevices(deviceInfos) {
                console.log(deviceInfos)
                deviceInfos.forEach(deviceinfo => {
                    var option = {};
                    option.text = deviceinfo.label;
                    option.value = deviceinfo.deviceId;

                    if (deviceinfo.kind == 'audioinput') {
                        this.audioSource.push(option);
                        this.formInline.audioSource =  this.audioSource[0].value;
                    } else if (deviceinfo.kind === 'audiooutput') {
                        this.audioOutput.push(option);
                        this.formInline.audioOutput =  this.audioOutput[0].value;
                    } else if (deviceinfo.kind === 'videoinput') {
                        this.videoSource.push(option);
                        this.formInline.videoSource =  this.videoSource[0].value;
                    }

                })

                console.log(this.audioOutput)
            },
            gotMediaStream(stream){
            	// this.$refs.player.srcObject = stream;
             //    this.$refs.player1.srcObject = stream;
            	//audioplay.srcObject = stream;

            	//视频的所有轨
            	var videoTrack = stream.getVideoTracks()[0];
            	var videoConstraints = videoTrack.getSettings();

            	// divConstraints.textContent = JSON.stringify(videoConstraints, null, 2);
            	this.stream = stream;
            	navigator.mediaDevices.enumerateDevices()
                    .then(res => {
                        this.gotDevices(res)
                    })
            },
            start(){
                var constraints = {
                    video: {
                        //修改视频宽高
                        width: 320,
                        height: 240,

                        //设置帧率
                        frameRate: 15,
                        facingMode: 'enviroment',
                        // deviceId : deviceId ? {exact:deviceId} : undefined
                    },
                    audio: false
                }

                // navigator.mediaDevices.getDisplayMedia(constraints)
                navigator.mediaDevices.getDisplayMedia(constraints)
                    .then(res => {
                        this.gotMediaStream(res)
                    })
            },
            // 开始录制
            startRecord(){
                console.log('开始')
            	this.buffer = [];
            	var options = {
            		mimeType : 'video/webm; codecs = vp8'
            	}

            	if(!MediaRecorder.isTypeSupported(options.mimeType)){
            			console.error('${options.mimeType} is not supported!');
            			return;
            	}

            	try{
            		this.mediaRecorder = new MediaRecorder(this.stream, options);
            	}catch(e){
            		console.error('Failed to create MediaRecorder:',e);
            		return
            	}
                var _this = this;
            	this.mediaRecorder.ondataavailable = function(e){
                    _this.handleDataAvailable(e)
                }
            	this.mediaRecorder.start(10);
            },
            handleDataAvailable(e){
            	if(e && e.data && e.data.size > 0){
            		this.buffer.push(e.data);
            	}
            },
            // 结束录制
            stopRecord(){
                console.log('结束')
            	this.mediaRecorder.stop();
            },
            // 播放录制
            play(){
                console.log('播放')
                var blob = new Blob(this.buffer, {type : 'video/webm'});
                this.$refs.player1.src = window.URL.createObjectURL(blob);
                this.$refs.player1.srcObject = null;
                this.$refs.player1.controls = true;
                this.$refs.player1.play();
            }

        },
        mounted() {


            // .catch(handleError)
        }
    }
</script>


<style scoped>
    .container {
        height: 100%;
    }

    #app {
        /*display: inline-block;*/
        position: relative;
        /*定位*/
        width: 200px;
        height: 200px;
        background: #666;
        /*设置一下背景*/
        left: 0;
        top: 0;
    }
</style>
