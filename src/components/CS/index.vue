<template>
    <div class="block" id="block">
        <div class="Head">
            <!-- <el-button @click="getSupportedConstraints()">开始测试</el-button>
            <el-button @click="report()">保存</el-button> -->
            H5 WebRTC功能兼容性测试
            <el-button id='button'>开始测试</el-button>
        </div>
        <div class="button">
            <el-button @click="getSupportedConstraints()" v-show="off">开始测试</el-button>
            <p v-show="!off" style="width: 100%;text-align: center;">{{text}}</p>
        </div>

        <div class="content" v-show="content">
            <el-timeline>
                <el-timeline-item timestamp="测试环境" placement="top">
                    <el-card>
                        <p>操作系统：{{getOS}}</p>
                        <p>浏览器：{{browse}}</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="切换摄像头" placement="top">
                    <el-card>
                        <el-button @click="sw()">切换后置摄像头</el-button>
                        <el-button @click="sw1()">切换前置摄像头</el-button>
                        <video playsinline autoplay id="videw"></video>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item :timestamp="item.name" placement="top" v-for="(item,index) in datas" :key="index">
                    <el-card>
                        <p v-for="(item1,index1) in item.content" :key="index1">
                            {{item1.value}}:
                            <span v-if="item1.type == 'yes'">支持</span>
                            <span style="color: red;" v-if="item1.type == 'no'">不支持</span>
                        </p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>


    </div>
</template>

<script>
    import html2canvas from 'html2canvas'
    export default {
        data: function() {
            return {
                datas: [],
                quickScan: [{
                        "label": "4K(UHD)",
                        "width": 3840,
                        "height": 2160,
                        "ratio": "16:9"
                    },
                    {
                        "label": "1080p(FHD)",
                        "width": 1920,
                        "height": 1080,
                        "ratio": "16:9"
                    },
                    {
                        "label": "UXGA",
                        "width": 1600,
                        "height": 1200,
                        "ratio": "4:3"
                    },
                    {
                        "label": "720p(HD)",
                        "width": 1280,
                        "height": 720,
                        "ratio": "16:9"
                    },
                    {
                        "label": "SVGA",
                        "width": 800,
                        "height": 600,
                        "ratio": "4:3"
                    },
                    {
                        "label": "VGA",
                        "width": 640,
                        "height": 480,
                        "ratio": "4:3"
                    },
                    {
                        "label": "360p(nHD)",
                        "width": 640,
                        "height": 360,
                        "ratio": "16:9"
                    },
                    {
                        "label": "CIF",
                        "width": 352,
                        "height": 288,
                        "ratio": "4:3"
                    },
                    {
                        "label": "QVGA",
                        "width": 320,
                        "height": 240,
                        "ratio": "4:3"
                    },
                    {
                        "label": "QCIF",
                        "width": 176,
                        "height": 144,
                        "ratio": "4:3"
                    },
                    {
                        "label": "QQVGA",
                        "width": 160,
                        "height": 120,
                        "ratio": "4:3"
                    }

                ],
                deviceId: '',
                loading: '',
                getOS: '',
                browse: '',
                text: '',
                off: true,
                content: false
            }
        },
        methods: {
            sw() {
                let constraints1 = {
                    audio: false,
                    video: {
                        facingMode: {
                            exact: "environment"
                        }
                    }
                };
                navigator.mediaDevices.getUserMedia(constraints1)
                    .then(function(stream) {
                        /* 使用这个stream stream */
                        let videw = document.getElementById("videw");
                        videw.srcObject = stream;
                        data.content[1].value = "后置摄像头 支持"
                    })
                    .catch(function(err) {
                        /* 处理error */
                        data.content[1].value = "后置摄像头 不支持，" + err.name
                    });
                // var myVideo = document.createElement('video');
                // if (myVideo.canPlayType) {
                //     if ("" != myVideo.canPlayType('video/mp4; codecs="avc1.64001E"')) {
                //         document.write("您的浏览器支持h264编码。<br>");
                //     }
                //     if ("" != myVideo.canPlayType('video/ogg; codecs="vp8"')) {
                //         document.write("您的浏览器支持vp8编码。<br>");
                //     }
                //     if ("" != myVideo.canPlayType('video/ogg; codecs="theora"')) {
                //         document.write("您的浏览器支持theora编码。<br>");
                //     }
                //     if ("" != myVideo.canPlayType('video/ogg; codecs="vp9"')) {
                //         document.write("您的浏览器支持vp9编码。<br>");
                //     }
                // } else {
                //     document.write("您的浏览器不支持要检测的视频格式。");
                // }
            },
            sw1() {
                let constraints1 = {
                    audio: false,
                    video: true
                };
                navigator.mediaDevices.getUserMedia(constraints1)
                    .then(function(stream) {
                        /* 使用这个stream stream */
                        let videw = document.getElementById("videw");
                        videw.srcObject = stream;
                        data.content[1].value = "后置摄像头 支持"
                        data.content[1].value1 = ''
                    })
                    .catch(function(err) {
                        /* 处理error */
                        data.content[1].value = "后置摄像头 不支持，" + err.name
                        data.content[1].value1 = 'red'
                    });
            },
            //浏览器支持媒体约束：
            async getSupportedConstraints() {
                this.off = false
                this.text = '环境检测'
                this.getOS = await this.GetOS();
                this.browse = await this.Browse();
                this.content = true;
                setTimeout(() => {
                    this.text = '分辨率扫描';
                    this.resolvingPower();
                }, 1000)
                // this.loading = this.$loading({
                //     lock: true,
                //     text: 'Loading',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(0, 0, 0, 0.7)'
                // });
                //alert('开启前置摄像头')
                // let data = {
                //     name: 'mediaDevices.getSupportedConstraints() 浏览器支持以下媒体约束：',
                //     content: [{
                //         value: ''
                //     }]
                // }
                // if (!navigator.mediaDevices || !navigator.mediaDevices.getSupportedConstraints) {

                //     return;
                // } else {
                //     let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
                //     for (let constraint in supportedConstraints) {
                //         if (supportedConstraints.hasOwnProperty(constraint)) {
                //             data.content[0].value += constraint + "，"
                //         }
                //     }
                //     this.datas.push(data)

                //     this.getDisplayMedia()

                // }


            },

            // 共享测试

            getDisplayMedia() {
                //alert('开启前置摄像头')
                let data = {
                    name: '共享，mediaDevices.getDisplayMedia()检测：',
                    content: [{
                        value: ''
                    }]
                }
                if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                    data.content[0].value = '暂不支持 getDisplayMedia()'
                } else {
                    navigator.mediaDevices.getDisplayMedia()
                        .then(function(stream) {
                            /* 使用这个stream stream */
                            data.content[0].value = '支持 getDisplayMedia()'
                        })
                        .catch(function(err) {
                            /* 处理error */
                            console.log(err)
                            data.content[0].value = err
                        });
                }
                this.datas.push(data);
                this.resolvingPower();
            },

            // 分辨率测试
            resolvingPower() {
                let videw = document.getElementById("videw");
                let data = {
                    name: '分辨率检测：',
                    content: [{
                        value: ''
                    }]
                }
                var _this = this;
                this.quickScan.forEach((device, key) => {
                    let constraints = {
                        audio: false,
                        video: {
                            deviceId: _this.deviceId ? {
                                exact: _this.deviceId
                            } : undefined,
                            width: {
                                exact: device.width
                            }, //new syntax
                            height: {
                                exact: device.height
                            },
                            frameRate: {
                                exact: 15
                            }
                        }
                    };
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(stream =>  {
                            /* 使用这个stream stream */
                            videw.srcObject = stream;
                            videw.width = device.width;
                            videw.height = device.height;
                            data.content[key] = {
                                value: device.width + " * " + device.height,
                                type: 'yes'
                            }
                            this.tracks(stream)
                        })
                        .catch(function(err) {
                            /* 处理error */
                            data.content[key] = {
                                value: device.width + " * " + device.height,
                                type: 'no'
                            }
                        });
                });
                this.datas.push(data);
                setTimeout(() => {
                    this.text = '摄像头检测';
                    this.getUserMedia();
                }, 1000)
                // this.getUserMedia();
            },

            // 摄像头检测
            getUserMedia() {
                //alert('开启前置摄像头')
                let data = {
                    name: '摄像头，getUserMedia()检测：',
                    content: [{
                        value: ''
                    }, {
                        value: ''
                    }]
                }
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    let elem = document.createElement("li");
                    elem.innerHTML = "<code>不支持 getUserMedia() .</code>";
                    constraintList.appendChild(elem);
                    return;
                } else {
                    this.text = '前置摄像头';
                    let constraints = {
                        audio: false,
                        video: {
                            facingMode: "user"
                        }
                    };
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(stream =>  {
                            let videw = document.getElementById("videw");
                            videw.srcObject = stream;
                            /* 使用这个stream stream */
                            data.content[0].value = "前置摄像头"
                            data.content[0].type = 'yes'
                            this.tracks(stream)
                        })
                        .catch(function(err) {
                            /* 处理error */
                            data.content[0].value = "前置摄像头"
                            data.content[0].type = 'no'
                        });
                    setTimeout(() => {
                        this.text = '后置摄像头';
                        let constraints1 = {
                            audio: false,
                            video: {
                                facingMode: {
                                    exact: "environment"
                                }
                            }
                        };
                        navigator.mediaDevices.getUserMedia(constraints1)
                            .then(stream =>  {
                                let videw = document.getElementById("videw");
                                videw.srcObject = stream;
                                /* 使用这个stream stream */
                                data.content[1].value = "后置摄像头"
                                data.content[1].type = 'yes'
                                this.tracks(stream)
                            })
                            .catch(function(err) {
                                /* 处理error */
                                data.content[1].value = "后置摄像头"
                                data.content[1].type = 'no'
                            });
                    }, 1500)

                    this.datas.push(data);
                    this.constraint();
                }
            },

            // 约束测试
            constraint() {
                let data = {
                    name: '约束，exact，max，ideal检测：',
                    content: [{
                        value: ''
                    }, {
                        value: ''
                    }, {
                        value: ''
                    }]
                }
                let constraints = {
                    audio: false,
                    video: {
                        deviceId: this.deviceId ? {
                            exact: this.deviceId
                        } : undefined,
                        width: {
                            exact: 640
                        }, //new syntax
                        height: {
                            exact: 480
                        }
                    }
                };
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(stream =>  {
                        /* 使用这个stream stream */
                        data.content[0].value = "exact"
                        data.content[0].type = 'yes'
                        this.tracks(stream)
                    })
                    .catch(function(err) {
                        /* 处理error */
                        data.content[0].value = "exact"
                        data.content[0].type = 'no'
                    });

                let constraints1 = {
                    audio: false,
                    video: {
                        deviceId: this.deviceId ? {
                            max: this.deviceId
                        } : undefined,
                        width: {
                            max: 640
                        }, //new syntax
                        height: {
                            max: 480
                        }
                    }
                };
                navigator.mediaDevices.getUserMedia(constraints1)
                    .then(stream =>  {
                        /* 使用这个stream stream */
                        data.content[1].value = " max"
                        data.content[1].type = 'yes'
                        this.tracks(stream)
                    })
                    .catch(function(err) {
                        /* 处理error */
                        data.content[1].value = " max"
                        data.content[1].type = 'no'
                    });

                let constraints2 = {
                    audio: false,
                    video: {
                        deviceId: this.deviceId ? {
                            ideal: this.deviceId
                        } : undefined,
                        width: {
                            ideal: 640
                        }, //new syntax
                        height: {
                            ideal: 480
                        }
                    }
                };
                navigator.mediaDevices.getUserMedia(constraints2)
                    .then(stream => {
                        /* 使用这个stream stream */
                        data.content[2].value = " ideal"
                        data.content[2].type = 'yes'
                        this.tracks(stream)
                    })
                    .catch(function(err) {
                        /* 处理error */
                        data.content[2].value = " ideal"
                        data.content[2].type = 'no'
                    });
                this.datas.push(data);
                this.PeerConnection();
            },

            // RTCPeerConnection
            PeerConnection() {
                var _this = this;
                let data = {
                    name: 'RTCPeerConnection,主要接口检测：',
                    content: [{
                        value: ''
                    }]
                };
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
                pc.onicecandidate = event => {
                    console.log(event)
                    if (!event.candidate) {
                        // 传输东西
                        sdp = pc.localDescription;

                        let parsedSdp = this.$sdp_tools.parseSDP(sdp.sdp);
                        let h264Codec = this.$sdp_tools.getRTCRtpCapabilities(sdp.sdp, ['telephone-event', 'rtx',
                            'red', 'ulpfec'
                        ])

                        console.log(parsedSdp.media[0])
                        let data1 = {
                            name: '编解码支持',
                            content: [{
                                value: ''
                            }]
                        };
                        for (let i in h264Codec.videoCodecs) {
                            data1.content[i] = {
                                value: h264Codec.videoCodecs[i],
                                type: 'yes'
                            }
                        }
                        this.datas.push(data1);

                        if (sdp.sdp.indexOf('VP8') != -1) {
                            console.log('支持vp8')
                        }
                        data.content[0].value += "icecandidate() 支持" + "，"

                        try {
                            pc1.setRemoteDescription(sdp)
                            data.content[0].value += "setRemoteDescription() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "setRemoteDescription() 不支持" + "，"
                        }

                        try {
                            answer = pc1.createAnswer();
                            data.content[0].value += "createAnswer() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "createAnswer() 不支持" + "，"
                        }

                        try {
                            pc.getReceivers()
                            data.content[0].value += "getReceivers() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "getReceivers() 不支持" + "，"
                        }

                        try {
                            pc.getSenders()
                            data.content[0].value += "getSenders() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "getSenders() 不支持" + "，"
                        }

                        try {
                            pc.getStats()
                            data.content[0].value += "getStats() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "getStats() 不支持" + "，"
                        }

                        try {
                            pc.getTransceivers()
                            data.content[0].value += "getTransceivers() 支持" + "，"
                            pc.close()
                            pc1.close()
                        } catch (e) {
                            data.content[0].value += "getTransceivers() 不支持" + "，"
                            pc.close()
                            pc1.close()
                        }
                    }
                };

                pc.addEventListener("iceconnectionstatechange", ev => {
                    console.log(ev)
                    data.content[0].value += "iceconnectionstatechange() 支持" + "，"
                }, false);

                pc.addEventListener("icegatheringstatechange", ev => {
                    let connection = ev.target;

                    switch (connection.iceGatheringState) {
                        case "gathering":
                            /* collection of candidates has begun */
                            break;
                        case "complete":
                            /* collection of candidates is finished */
                            data.content[0].value += "icegatheringstatechange() 支持" + "，"
                            break;
                    }
                }, false);

                pc.addEventListener("negotiationneeded", ev => {
                    console.log(ev)
                    data.content[0].value += "negotiationneeded() 支持" + "，"
                    // pc.createOffer()
                    // .then(offer => return pc.setLocalDescription(offer))
                    // .then(() => sendSignalingMessage({
                    //   type: "video-offer",
                    //   sdp: pc.localDescription
                    // }))
                    // .catch(err => {
                    //   /* handle error */
                    // });
                }, false);

                pc.addEventListener("connectionstatechange", ev => {
                    console.log(ev)
                    data.content[0].value += "connectionstatechange() 支持" + "，"
                    // switch(pc.connectionState) {
                    //   case "connected":
                    //     // The connection has become fully connected
                    //     break;
                    //   case "disconnected":
                    //   case "failed":
                    //     // One or more transports has terminated unexpectedly or in an error
                    //     break;
                    //   case "closed":
                    //     // The connection has been closed
                    //     break;
                    // }
                }, false);

                pc.addEventListener("signalingstatechange", ev => {
                    data.content[0].value += "signalingstatechange() 支持" + "，"
                    // switch(pc.signalingState) {
                    //   case "stable":
                    //     updateStatus("ICE negotiation complete");
                    //     break;
                    // }
                }, false);

                navigator.mediaDevices.getUserMedia(constraints)
                    .then(async function(stream) {
                        /* 使用这个stream stream */
                        try {
                            stream.getTracks().forEach(track => pc.addTrack(track, stream));
                            data.content[0].value += "addTrack() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "addTrack() 不支持" + "，"
                        }

                        try {
                            pc.addTransceiver('video')
                            data.content[0].value += "addTransceiver() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "addTransceiver() 不支持" + "，"
                        }

                        try {
                            offer = await pc.createOffer(offerOptions);
                            data.content[0].value += "createOffer() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "createOffer() 不支持" + "，"
                        }

                        try {
                            await pc.setLocalDescription(offer)
                            data.content[0].value += "setLocalDescription() 支持" + "，"
                        } catch (e) {
                            data.content[0].value += "setLocalDescription() 不支持" + "，"
                        }
                    })
                    .catch(function(err) {
                        console.log(err)
                    });


                this.datas.push(data);

                this.Receiver();
            },

            Receiver() {
                let pc = new RTCPeerConnection();
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(stream => {
                    stream.getTracks().forEach(track => pc.addTrack(track, stream));
                })

                let data = {
                    name: 'RTCReceiver,主要接口检测：',
                    content: [{
                        value: ''
                    }, {
                        value: ''
                    }, {
                        value: ''
                    }, {
                        value: ''
                    }]
                };
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(stream => {
                    let videoTrack1 = stream.getVideoTracks()[0];
                    var sender1 = pc.getSenders().find(function(s) {
                        return s.track.kind == videoTrack1.kind;
                    });
                    try {
                        sender1.getParameters()
                        data.content[0].value = "getParameters()"
                        data.content[0].type = "yes"
                    } catch (e) {
                        data.content[0].value += "getParameters()"
                        data.content[0].type = "no"
                    }

                    try {
                        const sender = pc.getSenders()[0];
                        const parameters = sender.getParameters();
                        sender.setParameters(parameters)
                        data.content[1].value = "setParameters()"
                        data.content[1].type = "yes"
                    } catch (e) {
                        data.content[1].value = "setParameters()"
                        data.content[1].type = "no"
                    }

                    try {
                        sender1.replaceTrack(videoTrack1);
                        data.content[2].value = "replaceTrack()"
                        data.content[2].type = "yes"
                    } catch (e) {
                        data.content[2].value = "replaceTrack()"
                        data.content[2].type = "no"
                    }

                    try {
                        RTCRtpSender.getCapabilities("video");
                        data.content[3].value = "getCapabilities()"
                        data.content[3].type = "yes"
                        pc.close()
                    } catch (e) {
                        data.content[3].value = "getCapabilities()"
                        data.content[3].type = "no"
                        pc.close()
                    }

                });

                this.datas.push(data);
                this.MediaStreamTrack();
            },

            MediaStreamTrack() {
                let videw = document.getElementById("videw");
                let data = {
                    name: 'MediaStreamTrack,主要接口检测：',
                    content: [{
                        value: ''
                    }, {
                        value: ''
                    }, {
                        value: ''
                    }, {
                        value: ''
                    }]
                };

                const constraints = {
                    width: {
                        min: 640,
                        ideal: 1280
                    },
                    height: {
                        min: 480,
                        ideal: 720
                    },
                    advanced: [{
                            width: 1920,
                            height: 1280
                        },
                        {
                            aspectRatio: 1.333
                        }
                    ]
                };

                navigator.mediaDevices.getUserMedia({
                        video: true
                    })
                    .then(mediaStream => {
                        const track = mediaStream.getVideoTracks()[0];
                        track.applyConstraints(constraints)
                            .then(() => {
                                // Do something with the track such as using the Image Capture API.
                                data.content[0].value = "applyConstraints()"
                                data.content[0].type = 'yes'
                            })
                            .catch(e => {
                                // The constraints could not be satisfied by the available devices.
                                data.content[0].value += "applyConstraints()"
                                data.content[0].type = 'no'
                            });

                        try {
                            track.getCapabilities()
                            data.content[1].value = "getCapabilities()"
                            data.content[1].type = 'yes'
                        } catch (e) {
                            data.content[1].value += "getCapabilities()"
                            data.content[1].type = 'no'
                        }

                        try {
                            track.getConstraints()
                            data.content[2].value = "getConstraints()"
                            data.content[2].type = 'yes'
                        } catch (e) {
                            data.content[2].value = "getConstraints()"
                            data.content[2].type = 'no'
                        }

                        try {
                            track.getSettings()
                            data.content[3].value = "getSettings()";
                            data.content[3].type = 'yes'
                        } catch (e) {
                            data.content[3].value = "getSettings()"
                            data.content[3].type = 'no'
                        }
                    });

                this.datas.push(data);
                this.web();
            },

            web() {
                console.log('11')
                let data = {
                    name: 'web插件,主要接口检测：',
                    content: [{
                        value: ''
                    }]
                };
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!window.AudioContext) {
                    data.content[0].value = 'Web Audio'
                    data.content[0].type= "no"
                } else {
                    data.content[0].value = 'Web Audio'
                    data.content[0].type= "yes"
                }
                this.datas.push(data);
            },
            dataURLToBlob(dataurl) {
                let arr = dataurl.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                    type: mime
                });
            },

            report() {
                let ele = document.getElementById('block');
                let a = document.createElement('a');
                var that = this;
                html2canvas(ele).then(canvas => {
                    let dom = document.body.appendChild(canvas);
                    dom.style.display = 'none';
                    a.style.display = 'none';
                    document.body.removeChild(dom);
                    let blob = that.dataURLToBlob(dom.toDataURL('image/png'));
                    a.setAttribute('href', URL.createObjectURL(blob));
                    //这块是保存图片操作  可以设置保存的图片的信息
                    a.setAttribute('download', '测试报告' + '.png');
                    document.body.appendChild(a);
                    a.click();
                    URL.revokeObjectURL(blob);
                    document.body.removeChild(a);
                })
            },

            GetOS() {
                var sUserAgent = navigator.userAgent;
                var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
                var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator
                    .platform == "Macintosh") || (navigator.platform == "MacIntel");
                if (isMac) return "Mac";
                var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
                if (isUnix) return "Unix";
                var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
                if (isLinux) return "Linux";
                if (isWin) {
                    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                    if (isWin2K) return "Win2000";
                    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                    if (isWinXP) return "WinXP";
                    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -
                        1;
                    if (isWin2003) return "Win2003";
                    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") >
                        -1;
                    if (isWinVista) return "WinVista";
                    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                    if (isWin7) return "Win7";
                    var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
                    if (isWin10) return "Win10";
                }
                return "other";
            },

            Browse() {
                var browser = {};
                var userAgent = navigator.userAgent.toLowerCase();
                var s;
                (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1]: (s = userAgent.match(/firefox\/([\d.]+)/)) ?
                    browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s =
                        userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(
                        /version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
                var version = "";
                if (browser.ie) {
                    version = 'IE ' + browser.ie;
                } else {
                    if (browser.firefox) {
                        version = 'firefox ' + browser.firefox;
                    } else {
                        if (browser.chrome) {
                            version = 'chrome ' + browser.chrome;
                        } else {
                            if (browser.opera) {
                                version = 'opera ' + browser.opera;
                            } else {
                                if (browser.safari) {
                                    version = 'safari ' + browser.safari;
                                } else {
                                    version = '未知浏览器';
                                }
                            }
                        }
                    }
                }
                return version;
            },
            tracks(stream){
                var tracks = stream.getTracks()

                for (var track in tracks) {
                    tracks[track].onended = null
                    console.log('close stream')
                    tracks[track].stop()
                }
            }
        },
        mounted() {
            // this.getOS = this.GetOS();
            // this.browse = this.Browse();

            let constraints = {
                video: true,
                audio: false
            };
            // navigator.mediaDevices.getUserMedia(constraints)
            //     .then(stream => {
            //         /* 使用这个stream stream */
            //         let videw = document.getElementById("videw");
            //         // videw.srcObject = stream;
            //         videw.width = 100;
            //         videw.height = 100;
            //         let data = {
            //             name: '正在使用的媒体设备',
            //             content: [{
            //                     value: '视频设备：' + stream.getVideoTracks()[0].label
            //                 },
            //                 {
            //                     value: '音频设备：' + stream.getAudioTracks()[0].label
            //                 },
            //             ]
            //         }
            //         const track = stream.getVideoTracks()[0];
            //         this.deviceId = track.getCapabilities().deviceId;
            //         this.datas.push(data)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //         this.$notify.error({
            //             title: '错误',
            //             message: err.name
            //         });
            //         /* 处理error */
            //         // elem.innerHTML = "<code>" + device.width + " * " + device.height + "不支持</code>";
            //         // constraintList.appendChild(elem);
            //     });

            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    // console.log(devices)
                    let data = {
                        name: '设备检测：',
                        content: []
                    }
                    for (let i in devices) {
                        data.content[i] = {
                            value: devices[i].label
                        }
                    }
                    this.content = true;
                    // // devices.forEach(function(device) {
                    // //     console.log(device.kind + ": " + device.label +
                    // //         " id = " + device.deviceId);
                    // // });
                    this.datas.push(data);
                })
                .catch(function(err) {
                    console.log(err.name + ": " + err.message);
                });
        },
        components: {
            // 设备列表ok, 分辨率ok, 前后摄像头切换ok, 音频抗丢包能力, 编解码支持, Canvas取流, Web Audio, getUserMedia和getDisplayMedia支持的取流限制情况,RTCPeerConnection,RTCReceiver,MediaStreamTrack常用接口
            // getStat接口包含哪些信息的列表
            // getDisplayMedia 这个有可能能细到，是否支持选择全屏，选择APP，选择tab 三种，还有系统音频是否支持共享
        }
    }
</script>

<style scoped>
    .Head {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        background: #0b1639;
        color: #ffffff;
        padding-left: 32px;
    }

    .content {
        margin-left: 20px;
        margin-top: 20px;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        height: 200px;
    }
</style>
