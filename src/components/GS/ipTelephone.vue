<template>
    <div>
        <div class="option">
            <div v-for="(item, key) in equipment" :key="key" class="option-list"
                :style="{'color': index == key ? '#2e86ff':'#9fa6b1'}" @click="Jump(key)">
                <img :src="index == key ? item.img1 : item.img">
                {{item.name}}
            </div>
            <!-- <div class="option-list" @click="index = 0" :style="{'color': index == 0 ? '#000000':'#9fa6b1'}">远程办公</div>
            <div class="option-list" @click="index = 1" :style="{'color': index == 1 ? '#000000':'#9fa6b1'}">安防监控</div> -->
        </div>

        <div class="content1">
            <div class="screen" v-if="index !== 3">
                <div class="screen-list" v-if="index == 0">
                    <div class="screen-list_text">
                        外观特性：
                    </div>
                    <div class="screen-list_down">
                        所有按键方式
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有屏幕类型
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有屏幕尺寸
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                </div>
                <div class="screen-list" v-if="index == 0">
                    <div class="screen-list_text">
                        功能属性：
                    </div>
                    <div class="screen-list_down">
                        所有通话类型
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有最大线路数
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有最大账号数
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有以太网端口
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                </div>
                <div class="screen-list" v-if="index == 0">
                    <div class="screen-list_text">
                        通讯协议：
                    </div>
                    <div class="screen-list_down1">
                        Wi-Fi
                    </div>
                    <div class="screen-list_down1">
                        蓝牙
                    </div>
                    <div class="screen-list_down1">
                        Wi-Fi + 蓝牙
                    </div>
                </div>


                <div class="screen-list" v-if="index == 1">
                    <div class="screen-list_text">
                        功能属性：
                    </div>
                    <div class="screen-list_down">
                        所有通话类型
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有最大线路数
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有最大账号数
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                </div>
                <div class="screen-list" v-if="index == 1">
                    <div class="screen-list_text">
                        通讯协议：
                    </div>
                    <div class="screen-list_down1">
                        Wi-Fi
                    </div>
                    <div class="screen-list_down1">
                        Wi-Fi + 蓝牙
                    </div>
                    <div class="screen-list_down1">
                        DECT基站
                    </div>
                </div>

                <div class="screen-list" v-if="index == 2">
                    <div class="screen-list_text">
                        功能属性：
                    </div>
                    <div class="screen-list_down">
                        音/视频通话
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有最大线路数
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <div class="screen-list_down">
                        所有最大账号数
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                </div>
            </div>

            <div class="product" v-if="!compare" @click="compare = true">
                产品比较
            </div>
            <div class="products" v-if="compare">
                选择对比的产品（{{num}}/3）
                <span class="products-button" @click="dialogTableVisible = true">确定</span>
            </div>
            <div class="product1">
                <div class="product1-list" v-for="(item, key) in product" :key="key">
                    <img :src="item.img" class="product1-list_img" @click="drawer = true">

                    <div class="product1-list_text" @click="drawer = true">
                        {{item.name}}
                    </div>
                    <div class="product1-list_text1" @click="drawer = true">
                        {{item.name1}}
                        <img src="../../../static/img/icon_right@2x.png" alt="">
                    </div>
                    <img :src="item.type ? './static/img/Checkbox1@2x.png' : './static/img/Checkbox@2x.png'"
                        alt="" class="choice" @click="add(item)" v-if="compare">
                </div>
            </div>
        </div>
        <el-drawer title="产品详情" style="overflow: auto;" :visible.sync="drawer" size="40%">
            <div class="details">
                <div class="details-text">GRP2601（P）</div>
                <div class="details-text1">专为满足现场或远程桌面工作人员的基本需求而打造，提供易于使用且易于部署的语音端点。</div>
                <img src="../../../static/img/GRP2601@2x.png" alt="" class="details-img">

                <div class="details-text2">产品特性</div>

                <div class="characteristic">
                    <div class="characteristic-list" v-for="(item, key) in characteristic" :key="key">
                        <div class="characteristic-list_img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="characteristic-list_text">{{item.name}}</div>
                        <div class="characteristic-list_text1">{{item.name1}}</div>
                    </div>

                </div>

                <div class="details-text2">推荐配件</div>

                <div class="parts">
                    <div class="parts-list" v-for="(item, key) in parts" :key="key">
                        <img :src="item.img" class="parts-list_img">

                        <div class="parts-list_text">
                            {{item.name}}
                        </div>
                        <div class="parts-list_text1">
                            {{item.name1}}
                        </div>
                    </div>

                </div>

                <div class="details-text2">相关产品</div>

                <div class="product2">
                    <div class="product2-list" v-for="(item, key) in product2" :key="key">
                        <img :src="item.img" class="product2-list_img">

                        <div class="product2-list_text">
                            {{item.name}}
                        </div>
                        <div class="product2-list_text1">
                            {{item.name1}}
                        </div>
                    </div>

                </div>
            </div>
        </el-drawer>

        <el-dialog title="突出差异" :visible.sync="dialogTableVisible">
            <el-switch v-model="value1" class="button"></el-switch>
            <div class="compare-content">
                <div class="compare-product">

                </div>
                <div class="compare-product_text">
                    基础
                </div>
                <div class="order"></div>

                <div class="basics">
                    <div class="basics-list" v-for="(item, key) in basics" :key='key'>
                        <p v-for="(item1, key) in item" :key='key' :style="{'background': item1.type ? '#ffefdc' : '#ffffff'}">{{item1.name}}</p>
                    </div>
                </div>

                <div class="compare-product_text">
                    外观
                </div>
                <div class="order"></div>

                <div class="basics">
                    <div class="basics-list" v-for="(item, key) in appearance" :key='key'>
                        <div v-for="(item1, key1) in item" :key='key1' :style="{'background': item1.type ? '#ffefdc' : '#ffffff'}" class="basics-list-p">
                            {{item1.name}}
                        </div>
                    </div>
                </div>

                <div class="compare-product_text">
                    通讯协议
                </div>
                <div class="order"></div>

                <div class="basics">
                    <div class="basics-list" v-for="(item, key) in agreement" :key='key'>
                        <p v-for="(item1, key) in item" :key='key' :style="{'background': item1.type ? '#ffefdc' : '#ffffff'}">{{item1.name}}</p>
                    </div>
                </div>

                <div class="compare-product_text">
                    电池和电源
                </div>
                <div class="order"></div>

                <div class="basics">
                    <div class="basics-list" v-for="(item, key) in battery" :key='key'>
                        <p v-for="(item1, key) in item" :key='key' :style="{'background': item1.type ? '#ffefdc' : '#ffffff'}">{{item1.name}}</p>
                    </div>
                </div>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                index: 0,
                header: false,
                drawer: false,
                compare: false,
                dialogTableVisible: false,
                value1: false,
                equipment: [{
                        name: '台式电话',
                        img: './static/img/icon_platform@2x.png',
                        img1: './static/img/icon_platform1@2x.png',
                    },
                    {
                        name: '手持电话',
                        img: './static/img/icon_hold@2x.png',
                        img1: './static/img/icon_hold1@2x.png'
                    },
                    {
                        name: '网络电话',
                        img: './static/img/icon_Telephone@2x.png',
                        img1: './static/img/icon_Telephone1@2x.png'
                    },
                    {
                        name: '扩展配件',
                        img: './static/img/icon_parts@2x.png',
                        img1: './static/img/icon_parts1@2x.png'
                    }
                ],
                product: [{
                        name: 'GRP 2601（P）',
                        name1: '黑白屏按键机',
                        img: './static/img/GRP2601@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2602（P/W）',
                        name1: '黑白屏按键机',
                        img: './static/img/GRP2602@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2603（P）',
                        name1: '黑白屏按键机',
                        img: './static/img/GRP2603@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2604（P）',
                        name1: '黑白屏按键机',
                        img: './static/img/GRP2604@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2612（P/W）',
                        name1: '彩屏按键机',
                        img: './static/img/GRP2612@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2613',
                        name1: '彩屏按键机',
                        img: './static/img/GRP2613@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2614',
                        name1: '彩屏按键机',
                        img: './static/img/GRP2614@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2615',
                        name1: '彩屏按键机',
                        img: './static/img/GRP2615@2x.png',
                        type: false
                    }
                ],
                product2: [{
                        name: 'GRP 2601（P）',
                        name1: '黑白屏按键机',
                        img: './static/img/GRP2601@2x.png',
                        type: false
                    },
                    {
                        name: 'GRP 2602（P/W）',
                        name1: '黑白屏按键机',
                        img: './static/img/GRP2602@2x.png',
                        type: false
                    }
                ],
                parts: [{
                    name: 'GDMS',
                    name1: '云配置和管理系统',
                    img: './static/img/GRP2601@2x.png',
                    type: false
                }],
                num: 0,
                characteristic: [{
                        name: '双线路',
                        name1: '2个SIP账号，2条线路。',
                        img: './static/img/icon_2line@2x.png'
                    },
                    {
                        name: 'GDMS管理',
                        name1: 'GDMS在线设备管理和资源调配。',
                        img: './static/img/icon_gdms@2x.png'
                    },
                    {
                        name: '5方会议',
                        name1: '5路音频会议，轻松召开电话会议。',
                        img: './static/img/icon_5-way@2x.png'
                    },
                    {
                        name: '隔音技术',
                        name1: '配备噪音屏蔽技术，将背景噪音降至最低',
                        img: './static/img/icon_noise shield@2x.png'
                    },
                    {
                        name: 'EHS耳机',
                        name1: 'Electronic Hook Switch (EHS)支持Plantronics、Jabra和Sennheiser耳机',
                        img: './static/img/icon_ehs@2x.png'
                    },
                    {
                        name: '加密安全',
                        name1: '企业级保护，包括安全引导、双固件映像和加密数据存储',
                        img: './static/img/icon_lock@2x.png'
                    },
                    {
                        name: 'PoE供电',
                        name1: '配备噪音屏蔽技术，将背景噪音降至最低',
                        img: './static/img/icon_poe@2x.png'
                    }
                ],
                basics: [
                    [
                        {
                          name: '最大帐号数：2个',
                          type: false
                        },
                        {
                          name: '最大线路数：2条',
                          type: false
                        },
                        {
                          name: '最大帐号数：6个',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '最大线路数：2条',
                          type: false
                        },
                        {
                          name: '最大线路数：2条',
                          type: false
                        },
                        {
                          name: '最大线路数：3条',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '5路音频会议',
                          type: false
                        },
                        {
                          name: '5路音频会议',
                          type: false
                        },
                        {
                          name: '5路音频会议',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '—',
                          type: false
                        },
                        {
                          name: '高清音频（听筒和扬声器支持带宽音频）',
                          type: false
                        },
                        {
                          name: '高清音频（听筒和扬声器支持带宽音频）',
                          type: false
                        }
                    ]
                ],

                appearance: [
                    [
                        {
                          name: '2.4 英寸 LCD黑白屏',
                          type: false
                        },
                        {
                          name: '2.4 英寸 背光LCD黑白屏',
                          type: false
                        },
                        {
                          name: '2.7 英寸 背光LCD黑白屏',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '132 × 48 像素分辨率',
                          type: false
                        },
                        {
                          name: '132 × 48 像素分辨率',
                          type: false
                        },
                        {
                          name: '132 × 64 像素分辨率',
                          type: false
                        }
                    ],

                    // 功能键
                    [
                        {
                          name: '线路键：—',
                          type: false
                        },
                        {
                          name: '线路键（双色LED）：2个',
                          type: false
                        },
                        {
                          name: '线路键（双色LED）：3个',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '可编程软键：4个',
                          type: false
                        },
                        {
                          name: '可编程软键：4个',
                          type: false
                        },
                        {
                          name: '可编程软键：4个',
                          type: false
                        }
                    ],
                    [
                        {
                          name: 'BLF键：—',
                          type: false
                        },
                        {
                          name: 'BLF键：—',
                          type: false
                        },
                        {
                          name: 'BLF键：—',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '专用功能键：8个 {信息（带LED）、转移、耳机、静音、 拨打/回拨、 免提、 音量+、音量-}',
                          type: false
                        },
                        {
                          name: '专用功能键：8个 {信息（带LED）、转移、耳机、静音、 拨打/回拨、 免提、 音量+、音量-}',
                          type: false
                        },
                        {
                          name: '专用功能键：9个 {信息（带LED）、转移、保持、耳机、 静音、拨打/回拨、 免提、 音量+、音量-}',
                          type: false
                        }
                    ],

                    //网络接口
                    [
                        {
                          name: '10/100 Mbps以太网端口，集成PoE （仅GRP2601P）',
                          type: false
                        },
                        {
                          name: '10/100 Mbps以太网端口，集成PoE （仅GRP2601P）',
                          type: false
                        },
                        {
                          name: '10/100/1000 Mbps以太网端口，集成PoE （仅GRP2603P）',
                          type: false
                        }
                    ],

                    // 辅组端口

                    [
                        {
                          name: 'RJ9耳机插孔 （支持 Plantronics、Jabra 和 Sennheiser 耳机）',
                          type: false
                        },
                        {
                          name: 'RJ9耳机插孔 （支持 Plantronics、Jabra 和 Sennheiser 耳机）',
                          type: false
                        },
                        {
                          name: 'RJ9耳机插孔 （支持 Plantronics、Jabra 和 Sennheiser 耳机）',
                          type: false
                        }
                    ],

                    // 底座
                    [
                        {
                          name: '桌面支架（45°角度）',
                          type: false
                        },
                        {
                          name: '桌面支架（45°角度）',
                          type: false
                        },
                        {
                          name: '桌面支架（39°和45°角度）',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '挂壁支架（单独出售）',
                          type: false
                        },
                        {
                          name: '挂壁支架（单独出售）',
                          type: false
                        },
                        {
                          name: '挂壁支架（单独出售）',
                          type: false
                        }
                    ],

                    // 尺寸和重量

                    [
                        {
                          name: '尺寸：208mm (长) x 180mm (宽) x 63.4mm (高)',
                          type: false
                        },
                        {
                          name: '尺寸：208mm (长) x 180mm (宽) x 63.4mm (高)',
                          type: false
                        },
                        {
                          name: '尺寸：214mm (长) x 206mm (宽) x 68mm (高)',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '重量：650g',
                          type: false
                        },
                        {
                          name: '重量：670g',
                          type: false
                        },
                        {
                          name: '重量：780g',
                          type: false
                        }
                    ]

                ],

                agreement: [
                    [
                        {
                          name: 'Wi-Fi',
                          type: false
                        },
                        {
                          name: 'Wi-Fi',
                          type: false
                        },
                        {
                          name: 'Wi-Fi',
                          type: false
                        }
                    ],
                    [
                        {
                          name: 'x',
                          type: false
                        },
                        {
                          name: '√ GRP 2602W，集成双频Wi-Fi 802.11 a/b/g/n/ac（2.4Ghz和5Ghz）',
                          type: false
                        },
                        {
                          name: 'x',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '蓝牙',
                          type: false
                        },
                        {
                          name: '蓝牙',
                          type: false
                        },
                        {
                          name: '蓝牙',
                          type: false
                        }
                    ],
                    [
                        {
                          name: 'x',
                          type: false
                        },
                        {
                          name: 'x',
                          type: false
                        },
                        {
                          name: 'x',
                          type: false
                        }
                    ]
                ],
                battery: [
                    [
                        {
                          name: '电源输入：100-240V，50-60Hz',
                          type: false
                        },
                        {
                          name: '电源输入：100-240V，50-60Hz',
                          type: false
                        },
                        {
                          name: '电源输入：100-240V，50-60Hz',
                          type: false
                        }
                    ],
                    [
                        {
                          name: '电源输出：+5V，600mA',
                          type: false
                        },
                        {
                          name: '电源输出：+5V，600mA',
                          type: false
                        },
                        {
                          name: '电源输出：+5V，600mA',
                          type: false
                        }
                    ],
                    [
                        {
                          name: 'PoE：IEEE802.3af Class 1, 3.84W IEEE802.3az (EEE)，（仅GRP2601P）',
                          type: false
                        },
                        {
                          name: 'PoE：IEEE802.3af Class 1, 3.84W IEEE802.3az (EEE)，（仅GRP2602P）',
                          type: false
                        },
                        {
                          name: 'PoE：IEEE802.3af Class 1, 3.84W IEEE802.3az (EEE)，（仅GRP2603P）',
                          type: false
                        }
                    ]
                ],

            }
        },
        methods: {
            Jump(key) {
                this.index = +key;
                if (key == 0) {
                    this.product = [{
                            name: 'GRP 2601（P）',
                            name1: '黑白屏按键机',
                            img: './static/img/GRP2601@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2602（P/W）',
                            name1: '黑白屏按键机',
                            img: './static/img/GRP2602@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2603（P）',
                            name1: '黑白屏按键机',
                            img: './static/img/GRP2603@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2604（P）',
                            name1: '黑白屏按键机',
                            img: './static/img/GRP2604@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2612（P/W）',
                            name1: '彩屏按键机',
                            img: './static/img/GRP2612@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2613',
                            name1: '彩屏按键机',
                            img: './static/img/GRP2613@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2614',
                            name1: '彩屏按键机',
                            img: './static/img/GRP2614@2x.png',
                            type: false
                        },
                        {
                            name: 'GRP 2615',
                            name1: '彩屏按键机',
                            img: './static/img/GRP2615@2x.png',
                            type: false
                        }
                    ]
                } else if (key == 1) {
                    this.product = [{
                            name: 'DP720',
                            name1: '便携式DECT IP电话',
                            img: './static/img/DP720@2x.png',
                            type: false
                        },
                        {
                            name: 'DP722',
                            name1: '便携式DECT IP电话',
                            img: './static/img/DP722@2x.png',
                            type: false
                        },
                        {
                            name: 'DP730',
                            name1: '便携式DECT IP电话',
                            img: './static/img/DP730@2x.png',
                            type: false
                        },
                        {
                            name: 'WP810',
                            name1: '便携式Wi-Fi电话',
                            img: './static/img/WP810@2x.png',
                            type: false
                        }
                    ]
                } else if (key == 2) {
                    this.product = [{
                            name: 'Wave',
                            name1: '支持在PC/iOS/Android端通话',
                            img: './static/img/Wave@2x.png',
                            type: false
                        },
                        {
                            name: 'Wave Lite',
                            name1: '支持iOS/Android端通话',
                            img: './static/img/Wave@2x.png',
                            type: false
                        }
                    ]
                } else if (key == 3) {
                    this.product = [{
                            name: 'DP760',
                            name1: '宽带DECT中继器',
                            img: './static/img/DP760@2x.png',
                            type: false
                        },
                        {
                            name: 'GBX20',
                            name1: '彩屏扩展分机模块',
                            img: './static/img/GBX20@2x.png',
                            type: false
                        },
                        {
                            name: 'GXP2200EXT',
                            name1: '黑白屏扩展分机模块',
                            img: './static/img/GXP2200EXT@2x.png',
                            type: false
                        }
                    ]
                }
            },
            add(res) {
                res.type = !res.type;
                this.num = 0;
                for (let i in this.product) {
                    if (this.product[i].type) {
                        if (this.num < 3) {
                            this.num += 1
                        } else {
                            alert('数量已到达上限')
                            res.type = false;
                        }
                    }
                }
            }

        },
        watch:{
            value1: function(res,res1) {

                if(res){
                    for(let i in this.basics){
                        if(this.basics[i].every(target=>target.name == this.basics[i][0].name)){
                              console.log('全等')
                              for(let j in this.basics[i]){
                                  this.basics[i][j].type = false
                              }
                         }else {
                             console.log('有不等的')
                             for(let j in this.basics[i]){
                                 this.basics[i][j].type = true
                             }
                        }
                    }

                    for(let i in this.appearance){
                        if(this.appearance[i].every(target=>target.name == this.appearance[i][0].name)){
                              console.log('全等')
                              for(let j in this.appearance[i]){
                                  this.appearance[i][j].type = false
                              }
                         }else {
                             console.log('有不等的')
                             for(let j in this.appearance[i]){
                                 this.appearance[i][j].type = true
                             }
                        }
                    }

                    for(let i in this.agreement){
                        if(this.agreement[i].every(target=>target.name == this.agreement[i][0].name)){
                              console.log('全等')
                              for(let j in this.agreement[i]){
                                  this.agreement[i][j].type = false
                              }
                         }else {
                             console.log('有不等的')
                             for(let j in this.agreement[i]){
                                 this.agreement[i][j].type = true
                             }
                        }
                    }

                    for(let i in this.battery){
                        if(this.battery[i].every(target=>target.name == this.battery[i][0].name)){
                              console.log('全等')
                              for(let j in this.battery[i]){
                                  this.battery[i][j].type = false
                              }
                         }else {
                             console.log('有不等的')
                             for(let j in this.battery[i]){
                                 this.battery[i][j].type = true
                             }
                        }
                    }
                }else{
                    for(let i in this.basics){
                       for(let j in this.basics[i]){
                           this.basics[i][j].type = false
                       }
                    }

                    for(let i in this.appearance){
                       for(let j in this.appearance[i]){
                           this.appearance[i][j].type = false
                       }
                    }

                    for(let i in this.agreement){
                       for(let j in this.agreement[i]){
                           this.agreement[i][j].type = false
                       }
                    }

                    for(let i in this.battery){
                       for(let j in this.battery[i]){
                           this.battery[i][j].type = false
                       }
                    }
                }
            }
        },
        mounted() {

        },
        components: {

        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .container {}

    .option {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        background: #182840;
    }

    .option-list {
        width: 48px;
        /* white-space: nowrap; */
        height: 62px;
        font-family: FZLTCHK, FZLTCHK-Regular;
        margin-left: 30px;
        margin-right: 30px;
        line-height: 14px;
        text-align: center;
        /* padding: 2px; */
    }

    .option-list>img {
        width: 44px;
        height: 44px;
        margin-bottom: 4px;
    }

    .screen {
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
        background: #ffffff;
        backdrop-filter: blur(8px);

    }

    .product {
        width: 100%;
        height: 40px;
        background: #ffffff;
        backdrop-filter: blur(8px);
        margin-top: 2px;
        font-size: 14px;
        font-family: FZLTCHK, FZLTCHK-Regular;
        font-weight: 400;
        text-align: center;
        color: #2e86ff;
        line-height: 40px;
    }

    .products {
        width: 100%;
        height: 40px;
        background: #ffffff;
        backdrop-filter: blur(8px);
        margin-top: 2px;
        font-size: 14px;
        font-family: FZLTCHK, FZLTCHK-Regular;
        font-weight: 400;
        text-align: center;
        color: black;
        line-height: 40px;
        position: relative;
    }

    .products-button {
        color: #2E86FF;
        position: absolute;
        right: 44px;
    }

    .content1 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        height: 924px;
        background: #fafafa;
        /* overflow: hidden; */
    }

    .product1 {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
        height: 722px;
        padding-left: 352px;
        padding-right: 332px;
        overflow: scroll;
        overflow: auto;
    }

    .product1-list {
        width: 280px;
        height: 258px;
        background: #ffffff;
        border-radius: 4px;
        margin-top: 24px;
       margin-left: 12px;
        margin-right: 12px;
        position: relative;
    }

    .product1-list_img {
        width: 280px;
        height: 186px;
    }

    .product1-list_text {
        width: 280px;
        height: 42px;
        font-size: 16px;
        font-family: FZLTHK, FZLTHK-Regular;
        line-height: 42px;
        color: #000000;
        text-indent: 12px;
    }

    .product1-list_text1 {
        width: 280px;
        height: 24px;
        font-size: 12px;
        font-family: FZLTHK, FZLTHK-Regular;
        line-height: 24px;
        color: #777777;
        text-indent: 12px;
    }

    .product1-list_text1>img {
        width: 24px;
        height: 24px;
        float: right;
        margin-right: 12px;
    }

    .screen-list {
        display: flex;
        flex-wrap: wrap;
        /* justify-content: center; */
        align-items: center;
        width: 100%;
        height: 32px;
        font-size: 14px;
        color: #000000;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .screen-list_text {
        margin-left: 364px;
        margin-right: 26px;
    }

    .screen-list_down {
       /* width: 160px; */
        padding-left: 16px;
        /* padding-right: 8px; */
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        background: #f8f8fa;
        border-radius: 20px;
        margin-left: 8px;
    }

    .screen-list_down>img {
        width: 24px;
        height: 24px;
        float: right;
        margin-left: ;
        margin-top: 4px;
    }

    .screen-list_down1 {
        padding-left: 12px;
        padding-right: 12px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        font-size: 12px;
        background: #f8f8fa;
        border-radius: 20px;
        margin-left: 8px;
    }

    /* .screen-list_down2 {
        width: 98px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        font-size: 12px;
        background: #f8f8fa;
        border-radius: 20px;
        margin-left: 8px;
    } */

    .choice {
        width: 32px;
        height: 32px;
        position: absolute;
        z-index: 9;
        top: 0;
        right: 0;
    }

    .details {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        width: 100%;
        height: 100%;
        /* overflow: scroll; */
        /* overflow-y: auto; */
    }

    .details-text {
        width: 100%;
        height: 27px;
        font-size: 24px;
        color: #000000;
        text-align: center;
    }

    .details-text1 {
        width: 400px;
        height: 42px;
        font-size: 18px;
        font-family: FZLTHK, FZLTHK-Regular;
        font-weight: 400;
        text-align: left;
        color: #000000;
        line-height: 21px;
        margin-top: 16px;
        margin-bottom: 8px;
    }

    .details-img {
        width: 589px;
        height: 392px;
    }

    .details-text2 {
        width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 24px;
        color: #000000;
        font-size: 14px;
        padding-left: 24px;
        padding-right: 24px;
        font-family: FZLTCHK, FZLTCHK-Regular;
    }

    .characteristic {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-left: 16px;
        padding-right: 16px;
        margin-bottom: 16px;
    }

    .characteristic-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        width: 152px;
        /* height: 122px; */
        padding: 8px;
        text-align: center;
        margin-top: 16px;
    }

    .characteristic-list_img>img {
        width: 32px;
        height: 32px;
    }

    .characteristic-list_img {
        width: 136px;
        margin-top: 4px;
        margin-bottom: 20px;
    }

    .characteristic-list_text {
        width: 136px;
        font-size: 14px;
        color: #000000;
        line-height: 17px;
        padding: 1px;
    }

    .characteristic-list_text1 {
        width: 136px;
        font-size: 12px;
        color: #777777;
        line-height: 18px;
        padding: 1px;
    }

    .product2 {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 16px;
    }

    .product2-list {
        width: 210px;
        height: 192px;
        border: 1px solid #f3f3f6;
        border-radius: 4px;
        margin-left: 23px;
        margin-top: 16px;
        /* margin-bottom: 16px; */
    }

    .product2-list_img {
        width: 210px;
        height: 140px;
    }

    .product2-list_text {
        width: 210px;
        height: 17px;
        font-size: 14px;
        font-family: FZLTHK, FZLTHK-Regular;
        line-height: 17px;
        color: #000000;
        text-indent: 12px;
        margin-top: 8px;
    }

    .product2-list_text1 {
        width: 210px;
        height: 14px;
        font-size: 12px;
        font-family: FZLTHK, FZLTHK-Regular;
        line-height: 14px;
        color: #777777;
        text-indent: 12px;
        margin-top: 4px;
    }

    .parts {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 16px;
    }

    .parts-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        width: 210px;
        height: 192px;
        border: 1px solid #f3f3f6;
        border-radius: 4px;
        margin-top: 16px;
        margin-left: 23px;
    }

    .parts-list_img {
        width: 96px;
        height: 96px;
        margin-top: 22px;
        margin-bottom: 30px;
    }

    .parts-list_text {
        width: 210px;
        height: 17px;
        line-height: 17px;
        text-indent: 12px;
        color: black;
        font-size: 14px;
    }

    .parts-list_text1 {
        width: 210px;
        height: 14px;
        line-height: 14px;
        text-indent: 12px;
        color: black;
        font-size: 12px;
        margin-top: 4px;
    }

    .button {
        width: 200px;
        position: absolute;
        top: 22px;
        left: 108px;
    }

    .compare-content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .compare-product {
        width: 100%;
        height: 64px;
        background: #f5f8ff;
    }

    .compare-product_text {
        width: 1050px;
        height: 64px;
        line-height: 64px;
        font-size: 18px;
        color: black;
        text-indent: 24px;

    }
    .order{
        width: 1002px;
        height: 1px;
        background: #dddfe4;
        margin-left: 24px;
        margin-bottom: 16px;
    }

    .basics {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .basics-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .basics-list>p {
        width: 326px;
        padding-top: 5px;
        padding-left: 24px;
        padding-bottom: 5px;
        font-size: 12px;
        color: #777777;
        line-height: 14px;
    }
    .basics-list-p{
        width: 326px;
        padding-top: 5px;
        padding-left: 24px;
        padding-bottom: 5px;
        font-size: 12px;
        color: #777777;
        line-height: 14px;
    }
    .basics-list-text{
        width: 326px;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: #000000;
    }
</style>
