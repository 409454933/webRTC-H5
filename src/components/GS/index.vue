<template>
    <div>
        <div class="option">
            <div class="option-list" @click="index = 0" :style="{'color': index == 0 ? '#000000':'#9fa6b1'}">远程办公</div>
            <div class="option-list" @click="index = 1" :style="{'color': index == 1 ? '#000000':'#9fa6b1'}">安防监控</div>
            <div :class="index == 0 ? 'strip': 'strip1'"></div>
        </div>
        <div class="content1">
            <div class="content-left"></div>
            <div class="video">
                <video muted src="../../../static/img/video.mp4" autoplay loop></video>
            </div>
            <div class="content-right"></div>
        </div>
        <div class="product">
            <div v-for="(item, key) in equipment" :key="key" class="product-list">
                <img :src="item.img" >
                {{item.name}}
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                index: 0,
                equipment:[
                    {
                        name: 'UCM IP PBX',
                        img: './static/img/1@2x.png'
                    },
                    {
                        name: '路由器',
                        img: './static/img/2@2x.png'
                    },
                    {
                        name: 'IP台式电话',
                        img: './static/img/3@2x.png'
                    },
                    {
                        name: 'IP手持电话',
                        img: './static/img/4@2x.png'
                    },
                    {
                        name: '网络电话',
                        img: './static/img/5@2x.png'
                    },
                    {
                        name: '耳机',
                        img: './static/img/6@2x.png'
                    }
                ]
            }
        },
        methods: {


        },
        mounted(){

        },
        components: {

        }
    }
</script>

<style scoped>
 *{
     margin: 0;
     padding: 0;
 }
.option{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #ffffff;
    position: relative;
}
.option-list{
    width: 72px;
    height: 21px;
    font-size: 18px;
    font-family: FZLTCHK, FZLTCHK-Regular;
    margin-left: 60px;
    margin-right: 60px;
    line-height: 21px;
}
.content1{
    /* display: flex; */
    width: 100%;
    height: 624px;
    background: #ffffff;
    overflow: hidden;
    position: relative;
}
.content-left{
    width: 396px;
    height: 624px;
    background: linear-gradient(270deg,rgba(247,250,253,0.00), #f7fafd 28%);
    float: left;
    position: absolute;
    left: 0;
    z-index: 9;
}
.content-right{
    width: 420px;
    height: 624px;
    background: linear-gradient(90deg,rgba(247,250,253,0.00), #f7fafd 28%);
    position: absolute;
    left: 1500px;
    z-index: 9;
}
.product{
   display: flex;
   justify-content: center;
   width: 100%;
   height: 168px;
   background: #ffffff;
   backdrop-filter: blur(8px);
}
.product-list{
    width: 160px;
    height: 134px;
    font-size: 12px;
    font-family: FZLTHK, FZLTHK-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
   /* margin-left: 16px;
    margin-right: 16px; */
    line-height: 14px;
}
.product-list>img{
    width: 160px;
    height: 120px;
}
.video{
    width: 1382px;
    height: 624px;
    position: absolute;
    z-index: 1;
    left: 271px;
}
.video>video{
    width: 100% ;
    height: 100%;
    object-fit: fill;
}
.strip{
    width: 50px;
    height: 3px;
    background: #256cff;
    border-radius: 2px;
    position: absolute;
    top: 56px;
    left: 836px;
    transition: all .5s;
}
.strip1{
    width: 50px;
    height: 3px;
    background: #256cff;
    border-radius: 2px;
    position: absolute;
    top: 56px;
    left: 1032px;
    transition: all .5s;
}
</style>
