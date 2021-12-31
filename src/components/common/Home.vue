<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view>
                        </router-view>
                    </keep-alive>
                </transition>

                <el-dialog title="修改密码" :visible.sync="ischangpwdViewState">
                     <el-form :model="form">
                        <el-form-item label="新密码" :label-width="formLabelWidth">
                            <el-input type="password" v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                         <el-button @click="cancleChangeState">取 消</el-button>
                         <el-button type="primary" @click="makeSureChangeState">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    // import {Change} from '../../api/util.js'
    import md5 from 'js-md5';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                ischangpwdViewState: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        methods: {
            cancleChangeState(){
                this.ischangpwdViewState = false;
                bus.$emit('headerChangePwd', this.ischangpwdViewState);

            },
            makeSureChangeState(){
                var dic = {
                    password: md5(this.form.name)
                }
                // console.log('修改密码参数-----'+ JSON.stringify(dic));
                Change(dic).then((res) => {
                    // console.log(res);
                    if(res.code === 0){
                        console.log('修改密码成功')
                    }
                })
                this.ischangpwdViewState = false;
                bus.$emit('headerChangePwd', this.ischangpwdViewState);
            }
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })

            bus.$on('changePwd', msg => {
                this.ischangpwdViewState = msg;
            })
        }
    }
</script>
