<template>
    <div class="Head">
        <img src="../../../static/img/icon_logo@2x.png" alt="" class="logo">
        <div class="classification">
            <div class="classification-list" v-for="(item, key) in datas" :key="key" @click="Jump(item.url,key)">
                {{item.name}}
                <div class="strip" v-if="key == index"></div>
            </div>
            <!-- <div class="strip" :style="{'left': (0.9125*+key + 0.664063) + 'rem'}" v-for="(item, key) in datas" ></div> -->
        </div>
        <img src="../../../static/img/icon_search@2x.png" alt="" class="search">
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                datas: [
                    {
                        name: 'UCM IP PBX',
                        url: '/index'
                    },
                    {
                        name: '音视频会议',
                        url: ''
                    },
                    {
                        name: 'IP电话',
                        url: '/ipTelephone'
                    },
                    {
                        name: '云管理',
                        url: ''
                    },
                    {
                        name: '路由器',
                        url: ''
                    },
                    {
                        name: '语音网关',
                        url: ''
                    },
                    {
                        name: '门禁和对讲',
                        url: ''
                    },
                    {
                        name: '耳机',
                        url: ''
                    },
                    {
                        name: '摄像机',
                        url: ''
                    }
                ],
                index: 0
            }
        },
        methods: {
            Jump(url, key){
                if(url){
                   this.$router.push(url);
                }
                this.index = +key;
                localStorage.setItem('index', this.index)
            }

        },
        mounted(){
            this.index = localStorage.getItem('index') || 0
        },
        components: {

        }
    }
</script>

<style scoped>
.Head{
    display: flex;
    width: 100%;
    height: 56px;
    background: #0b1639;
}
.classification{
    display: flex;
    justify-content: center;
    /* width: 929px; */
    height: 56px;
    font-size: 14px;
    font-family: FZLTHK, FZLTHK-Regular;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    line-height: 17px;
}
.classification-list{
    white-space: nowrap;
    padding: 20px;
    position: relative;
}
.logo{
    width: 32px;
    height: 32px;
    margin-top: 12px;
    margin-left: 468px;
}
.search{
   width: 28px;
   height: 28px;
   margin-top: 14px;
   margin-left: 24px;
}
.strip{
    width: 48px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    position: absolute;
    top: 53px;
    left: 0;
    right: 0;
    margin: auto;
    transition: all .5s;
}
</style>
