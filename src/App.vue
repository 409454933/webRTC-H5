<template>
    <div id="app">
      <!--  <headNavigation></headNavigation> -->
        <router-view></router-view>
    </div>
</template>

<script>
import headNavigation from '@/components/common/HeadNavigation.vue'
export default {
    name: 'App',
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    components:{
        headNavigation
    },
    method: {
        reload (){
            this.isRouterAlive = false;
            this.$nextTick(function(){
                this.isRouterAlive = true
            })
        }
    }
}
</script>


<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    .el-table--border th.gutter:last-of-type {
        display: block!important;
        width: 17px!important;
    }
    #app{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .el-drawer{
        overflow: auto;
    }
    .el-switch__core{
        width: 40px !important;
    }
    .el-dialog__body{
        padding: 0;
    }
    .el-dialog{
        width: 1050px;
    }
</style>
