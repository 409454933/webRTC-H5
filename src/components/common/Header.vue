<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
<!--        <div v-if="roleId === '3'" class="logo">忆泊酒店公司管理后台</div>-->
        <div class="logo">Demo管理平台</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
<!--                <div v-if="roleId !== '2'" class="btn-bell" @click="checkUnReadMessage">-->
<!--                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">-->
<!--                        <router-link to="/tabs">-->
<!--                            <i class="el-icon-bell"></i>-->
<!--                        </router-link>-->
<!--                    </el-tooltip>-->
<!--                    <span class="btn-bell-badge" v-if="message"></span>-->
<!--                </div>-->
                <!-- 用户头像 -->
                <div class="user-avator"><img :src="HeadPortrait"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
<!--                        <el-dropdown-item divided  command="changePassword">修改密码</el-dropdown-item>-->
                    </el-dropdown-menu>
                </el-dropdown>


            </div>
        </div>
        <div>
<!--            <audio controls="controls" autoplay="autoplay">-->
<!--                <source src="../../../static/img/Baidu-TTS.mp3" type="audio/mpeg" />-->
<!--                Your browser does not support the audio element.-->
<!--            </audio>-->
<!--            <buttom @click="handleCanplay()"> 按钮</buttom>-->
<!--            <audio src="../../../static/img/Baidu-TTS.mp3" controls  ref="audio" style="display: none"></audio>-->
<!--            <audio src="../../../static/img/Baidu-TTS (1).mp3" controls  ref="audio1" style="display: none"></audio>-->

        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'LongYu',
                // Name: JSON.parse(localStorage.getItem('hotelList'))[0].name,
                message: 0,
                roleId: localStorage.getItem('roleId'),
                HeadPortrait: 'https://cdn.rudolph-ibs.com/rudolph/logo/logo.png',
                websock: null,
                hotelName: '',
                ischangpwdView: false,
                Data: []
            }
        },


        computed:{
            username(){
                let username = localStorage.getItem('username');
                return username ? username : this.name;
            }
        },
        created() {
            // this.findAllToBeCheckedCounts()
            // this.checkRole();
            // setInterval(this.checkCounts, "3000")
            // this.checkCounts();
            if(localStorage.getItem("roleId") !== '3'){
                // this.initWebSocket();
            }
            // console.log(localStorage.getItem('ms_username'));


            // this.getName();
            bus.$on('headerChangePwd', msg => {
                this.ischangpwdView = msg;
                console.log('子组件接收-----'+this.ischangpwdView)
            })
        },
        // destroyed() {
        //     this.websock.close() //离开路由之后断开websocket连接
        // },
        methods:{
            handleCanplay(){
                let res = '';
                let page,size;
                page = 'page=1';
                size = 'size=50';
                let data = [page,size];
                for (var i = 0; i < data.length; i++){
                    if(data[i].split('=')[1] !== ""){
                        res += data[i] + '&'
                    }
                }
                res = res.substring(0, res.lastIndexOf('&'));
                QueryReserve(res).then(response =>{
                    this.Data = response.data.content
                });
                var _this = this;
                var int = setInterval(f,2000);
                function f() {
                    if(_this.Data.some(({status}) => status === 0)){
                        _this.$nextTick(() => {
                            _this.$refs.audio.play()
                        });
                    }else {
                        clearInterval(int)
                    }
                }
            },
            getName() {
                if (localStorage.getItem('roleId') === '2') {
                    return;
                }
                // getHotelName().then(res => {
                //     if (res.code === 0) {
                //         this.hotelName = res.data
                //     }
                // })
            },
            checkUnReadMessage() {
                this.message = null
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command === 'loginout'){
                    localStorage.removeItem('ms_username')
                    localStorage.removeItem('account')
                    localStorage.removeItem('username')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('token')
                    localStorage.removeItem('hotelId')
                    localStorage.removeItem('roleId')
                    // location.reload()
                    this.isRouterAlive = false
                    this.$nextTick(function() {
                        this.isRouterAlive = true
                    })
                    this.$router.push('/login');
                }
                if(command == 'changePassword'){
                    this.ischangpwdView = !this.ischangpwdView;
                    bus.$emit('changePwd', this.ischangpwdView);
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }


        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
