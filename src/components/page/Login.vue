<template>
    <div class="login-wrap">
<!--        <div id="app" @mousedown="move">       &lt;!&ndash;绑定按下事件&ndash;&gt;-->
<!--            {{positionX}}-->
<!--            {{positionY}}-->
<!--        </div>-->
        <div class="ms-login">
            <div class="ms-title">Demo管理平台</div>
<!--            登录-->
            <el-form :model="accountForm" :rules="accountStyle" ref="accountForm" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input  placeholder="请输入账号" v-model="accountForm.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="accountForm.password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitAccountForm('accountForm')" >登录</el-button>
                </div>
            </el-form>
<!--            <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />-->
<!--            <el-button type="primary" @click="submit">提交</el-button>-->
        </div>
    </div>
</template>

<script>
// import { Goods } from '@/api/util' // 接口调用
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
    export default {
        data: function(){
            return {
                accountForm: {
                    account: 'admin',
                    password: '123456'
                },
                websock: null,
                // 判断输入框是否输入了对应的数据
                accountStyle:{
                    account:[
                        { required: true, message: '请输入用账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                name: '获取验证码',
                Prohibit: true,
                content: '',

                editorOption: {}
            }
        },
        methods: {
            // 登录
            submitAccountForm(formName){
                // this.$router.push('/dashboard')
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        localStorage.setItem('ms_username',this.accountForm.account); // 将用户名存入本地检验跳转权限
                        // console.log(this.accountForm.account); // 用户名
                        // console.log(md5(this.accountForm.password)); // 密码
                        const data = {
                            account: this.accountForm.account,
                            password: this.accountForm.password
                        }
                        this.$router.push('/mongo')
                        // let data1 = new FormData()
                        // data.append('video', '1')
                        // console.log(data1)
                        // this.$axios({
                        //   url: 'http://192.168.1.232:8088/users/login',
                        //   method: 'POST',
                        //   headers: {
                        //     // 'Content-Type': 'multipart/form-data'
                        //   },
                        //   data: data
                        // }).then((response) => {
                        //   // success
                        //     console.log(response);
                        // })
                        //   .catch((error) => {
                        //     // error
                        //     console.log(error)
                        //   })
                        // Signin2(data).then(response => {
                        //     console.log(response);
                        //     if (response.code === 0) {
                        //         localStorage.setItem('account', this.accountForm.account); // 将用户名存入本地
                        //         // localStorage.setItem('username', response.data.nickname); // 将姓名存入本地
                        //         // // localStorage.setItem('baseUrl',response.data.baseUrl); // 将文件访问基础地址存入本地baseUrl
                        //         localStorage.setItem('token', response.data.token); // 将token存入本地
                        //         // localStorage.setItem('baseUrl', response.data.baseUrl); // 将头像地址存入本地
                        //         // localStorage.setItem('roleId', response.data.roleId); // 将角色等级存入本地
                        //         this.$message({
                        //             message: '恭喜你，登录成功',
                        //             type: 'success'
                        //         });

                        //     } else if(response.code === 101){
                        //         this.$message.error('请注意，该用户不存在');
                        //     }else {

                        //         this.$message.error(response.msg)
                        //     }
                        // })
                    //     let datas = {
                    //         name: "条件触发",
                    //         type:1,
                    //         enable: 1,
                    //         condition: {
                    //             source: "EIB",
                    //             dataType: "1Bit",
                    //             groupAddress: "1/1/1",
                    //             value: 1
                    //         },
                    //         controls: [{
                    //             source: "EIB",
                    //             dataType: "1Bit",
                    //             groupAddress: "1/1/1",
                    //             value: 1
                    //         }]
                    //     }
                    //     Signin1(datas).then(res => {
                    //         console.log(res);
                    //     })
                    // }else{
                    //     console.log('error submit!!');
                    //     return false;
                    }
                });
            },
            submit () {
                const client = new net.Socket();
                // client.connect('8080', 'ws://192.168.1.232', function() {
                //
                //     // console.log('CONNECTED TO: ' + HOST + ':' + PORT); // 建立连接后立即向服务器发送数据，服务器将收到这些数据
                //
                //     client.write('I am client!');
                //
                // });
                //
                // client.on('data', function(data) {
                //
                //     console.log('DATA: ' + data); // 打印数据
                //
                // });
                //
                // client.on('close', function() { console.log('Connection closed');}); //关闭回调


            },
            /**
             * 建立socket连接，调用时间：
             * 1.首次进入页面，如果不是查看记录，请求出来初始数据后，建立socket连接
             * 2.调用数据库查询完毕后
             * */
            initWebSocket() { //初始化weosocket
                const wsuri = 'ws://192.168.1.232:8080/users/login'
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage
                this.websock.onopen = this.websocketonopen
                this.websock.onerror = this.websocketonerror
                this.websock.onclose = this.websocketclose
            },
            websocketonopen() { //连接建立之后执行send方法发送数据
                let actions = {'account': 'admin','password': '123456'};
                this.websocketsend(JSON.stringify(actions))
            },
            /**
             * 连接建立失败,断开连接
             * 1.查询一次数据库数据
             * 2.查询完后再次建立socket连接
             * */
            websocketonerror() {//连接建立失败重连
                let _this = this
                console.log('连接建立失败')
                //this.websock.onclose()
                // this.initWebSocket()
            },
            websocketonmessage(e) { //数据接收
                //const redata = JSON.parse(e.data)
                console.log(e.data)
                this.dealF2DataList(redata)
            },
            websocketsend(Data) {//数据发送
                this.websock.send(Data)
            },
            websocketclose(e) {  //关闭
                console.log('断开连接', e)
            },

        },
        mounted(){
            // this.initWebSocket()
            // this.$axios({
            //   url: 'http://192.168.131.111:3000/goods',
            //   method: 'get',
            //   headers: {
            //     // 'Content-Type': 'multipart/form-data'
            //   },
            //   // data: ''
            // }).then((response) => {
            //   // success
            //     console.log(response.data);
            // })
            // .catch((error) => {
            //     // error
            //     console.log(error)
            // })

            
        },
        components: {
            quillEditor
        }
    }
</script>

<style scoped>
    #app{
        position: relative;     /*定位*/
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #666;       /*设置一下背景*/
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /*background-image: url(../../assets/login-bg.jpg);*/
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        /* color: #fff; */
        color: black;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
    .login-style{
        text-align: right;
    }
    .login-style button{
        right:-60px;
        height:20px;
        margin-bottom: 10px;
    }
</style>
