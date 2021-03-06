import Vue from 'vue';
import App from './App';
import axios from 'axios';
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map';
import 'lib-flexible/flexible'
// import scheduleCalendar from './scheduleCalendar'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import sdp_tools from './sdp_tools.js'
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import '../static/css/icon.css';
// import "babel-polyfill";

import router from './router';

Vue.use(BaiduMap, {
    ak: 'UNdhyZsv9nE51VuEGyesyxbkGY7VBhmZ'
});
Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$sdp_tools = sdp_tools;

// Vue.component(scheduleCalendar.name, scheduleCalendar)

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = localStorage.getItem('ms_username');
//     if(!role && to.path !== '/login'){
//         next('/login');
//     }else if(to.meta.permission){
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     }else{
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         }else{
//             next();
//         }
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
