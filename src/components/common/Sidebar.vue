<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <div slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </div>
                        <div v-for="(subItem, index) in item.subs" :key="index">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <div slot="title">{{ subItem.title }}</div>
                                <el-menu-item v-for="(threeItem, key) in subItem.subs" :key="key"
                                    :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :keys="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-picture',
                        index: 'Dashboard',
                        title: '录屏演示',
                    },
                    {
                        icon: 'el-icon-cpu',
                        index: '网络状态统计',
                        title: '录屏演示',
                    },
                    // 网关管理
                    {
                        icon: 'el-icon-cpu',
                        index: 'StoreQueryDetailed',
                        title: '白板演示',
                        // subs: [
                        //     {
                        //         index: 'Newhotel',
                        //         title: '自定义逻辑'
                        //     },
                        //     {
                        //         index: 'Newhotel',
                        //         title: '地暖逻辑'
                        //     }

                        // ]
                    },
                ]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            },
        },
        created() {
            // console.log(this.roleId);
            // if(localStorage.getItem("roleId") === "2"){
            //     this.items = this.item2
            // }else if(localStorage.getItem("roleId") === "1"){
            //     this.items = this.item1
            // }else if(localStorage.getItem("roleId") === "0"){
            //     this.items = this.item3
            // }
            // this.items = localStorage.getItem("roleId") === "2" ? this.item2 : this.item1;
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 100px;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 150px;
    }

    .sidebar>ul {
        height: 100%;
    }
</style>
