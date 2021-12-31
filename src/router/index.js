import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        // {
        //     path: '/',
        //     component: resolve => require(['../components/common/Home.vue'], resolve),
        //     meta: { title: '自述文件' },
        //     children:[
        //         {
        //             path: '/mongo',
        //             component: resolve => require(['../components/mongo/index.vue'], resolve),
        //              meta: { title: 'Mongo' }
        //         },
        //         {
        //             path: '/dashboard',
        //             component: resolve => require(['../components/page/Dashboard.vue'], resolve),
        //             meta: { title: '数据中心' }
        //         },

        //         {
        //             path: '/404',
        //             component: resolve => require(['../components/page/404.vue'], resolve),
        //             meta: { title: '404' }
        //         },
        //         {
        //             path: '/403',
        //             component: resolve => require(['../components/page/403.vue'], resolve),
        //             meta: { title: '403' }
        //         }
        //     ]
        // },
        // {
        //     path: '/login',
        //     component: resolve => require(['../components/page/Login.vue'], resolve)
        // },
        // GS
        // {
        //     path: '/index',
        //     component: resolve => require(['../components/GS/index.vue'], resolve)
        // },
        // {
        //     path: '/ipTelephone',
        //     component: resolve => require(['../components/GS/ipTelephone.vue'], resolve)
        // },
        // CS
        {
            path: '/index',
            component: resolve => require(['../components/CS/index.vue'], resolve)
        },
        {
            path: '/index1',
            component: resolve => require(['../components/CS/index1.vue'], resolve)
        },
        
        {
            path: '*',
            redirect: '/404'
        },

    ]
})
