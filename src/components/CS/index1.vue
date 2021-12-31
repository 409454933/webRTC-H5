<template>
    <div class="video-page">
        <el-row>
            <el-col :xs="24">
                <video
                    class="video-js"
                    ref="videoplay"
                    poster=""
                    preload="auto"
                    autoplay
                ></video>
                <button @click="showList">查看摄像头和麦克风</button>
                <select name="microPhone" v-model="microPhone" ref="microPhone">
                    <option value="" disabled selected>请选择麦克风</option>
                    <option :value="item.id" v-for="(item,index) of microPhoneList" :key="index">{{item.label}}</option>
                </select>
                <select name="camera" v-model="camera" ref="camera">
                    <option value="" disabled selected>请选择摄像头</option>
                    <option :value="item.id" v-for="(item,index) of cameraList" :key="index">{{item.label}}</option>
                </select>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="24">
                <button @click="closeCamera">关闭摄像头</button>
                <button @click="closeMicroPhone">关闭麦克风</button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //video
            videoObj: null,
            streamer: null,
            microPhone:'',
            microPhoneList:[],
            camera:'',
            cameraList:[]
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        showList() {
            navigator.mediaDevices
                .enumerateDevices()
                .then((deviceInfos)=>{
                    this.microPhoneList = [];
                    this.cameraList = [];
                    for (let i = 0; i !== deviceInfos.length; ++i) {
                        let deviceInfo = deviceInfos[i];
                        let option = {};
                        option.id = deviceInfo.deviceId;
                        if (deviceInfo.kind === "audioinput") {
                            option.label =
                                deviceInfo.label ||
                                "microphone " + (audioSelect.length + 1);
                            this.microPhoneList.push(option);
                        } else if (deviceInfo.kind === "videoinput") {
                            option.label =
                                deviceInfo.label ||
                                "camera " + (videoSelect.length + 1);
                            this.cameraList.push(option);
                        } else {
                            console.log(
                                "Found one other kind of source/device: ",
                                deviceInfo
                            );
                        }
                    }
                    // this.microPhone = this.microPhoneList[this.microPhoneList.length-1].id;
                    // this.camera = this.cameraList[this.cameraList.length-1].id;
                    // this.videoStart();
                })
                .then(()=>{
                    this.removeEvent(this.$refs.microPhone,"change",this.videoStart);
                    this.addEvent(this.$refs.microPhone,'change',this.videoStart);
                    this.removeEvent(this.$refs.camera,"change",this.videoStart);
                    this.addEvent(this.$refs.camera,'change',this.videoStart);
                })
                .catch((err)=>{
                    console.log(err);
                });
        },
        init() {
            videojs(document.querySelector(".video-js"), {
                controls: true,
                autoplay: true,
                preload: "auto"
            });
            this.videoObj = this.$refs.videoplay;
            this.showList();
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）
            this.videoStart();
        },
        videoStart() {
            let constraints = {};

            if(this.microPhone){
                constraints.audio = {deviceId:{exact: this.microPhone}};
            }else{
                constraints.audio = false;
            }
            if(this.camera){
                constraints.video = {deviceId:{exact: this.camera}};
            }else{
                constraints.video = false;
            }

            if(!this.camera && !this.microPhone){
                this.$message({message:'摄像头和麦克风必须开启一个才能直播',type:'warning'})
                return ;
            }
            navigator.getUserMedia(
                constraints,
                this.videoSuccess,
                this.videoError
            );
        },
        closeMicroPhone(){
            this.microPhone = '';
            this.videoStart();
        },
        closeCamera(){
            this.camera = '';
            this.videoStart();
        },
        videoSuccess(stream) {
            this.streamer =
                typeof stream.stop === "function"
                    ? stream
                    : stream.getTracks()[0];
            try {
                this.videoObj.src = window.URL.createObjectURL(stream);
            } catch (err) {
                this.videoObj.srcObject = stream;
            }
        },
        videoError(error) {
            this.error("直播间需浏览器享有“摄像头/相机、麦克风权限”");
        },
        error(msg) {
            this.$message({ message: msg, type: "warning" });
        }
    }
};
</script>

<style lang="less" scoped>
.video-page {
    background: #ffffff;
    padding: 10px;
    min-height: 100%;
    .poster {
        width: 640px;
        height: 480px;
        background-color: #f2f2f2;
        color: #666666;
        line-height: 480px;
        text-align: center;
        position: absolute;
    }
    .ctrls {
        position: static;
        width: 100%;
        background-image: linear-gradient(to right, red, green 50%, blue 100%);
        bottom: 15px;
        left: 0px;
        z-index: 1000;
        text-align: center;
        .screen {
            border: 0;
            border-radius: 5px;
            outline: none;
            background-image: radial-gradient(
                farthest-corner at 0px 0px,
                #f35 0%,
                #43e 100%
            );
            padding: 10px 15px;
            margin: 10px 15px;
        }
    }
}
</style>
