import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 150000 // 请求超时时间
});


// request拦截器
service.interceptors.request.use(config => {
    // const accountStr = localStorage.getItem('account')
  // if (accountStr) {
  //   const account = JSON.parse(accountStr)
  //   // console.log(account)
  //   config.headers['type'] = account.type
  //   config.headers['account'] = account.account
  //   config.headers['token'] = account.token
  // }
//       config.headers['account'] = '15757101403';
//       config.headers['token'] = '28a1aa4052c6459dba20f5cbaacb2bfd';
//     config.headers['account'] = localStorage.getItem('account');
//     config.headers['token'] = localStorage.getItem('token');
    // config.headers.Authorization = `token ${localStorage.getItem('account')}`;
    // config.headers.account = localStorage.getItem('account');
    // config.headers.token = localStorage.getItem('token');
    config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
    // console.log(config);
  // console.log('--1----'+localStorage.getItem('account')+'======='+localStorage.getItem('token'));
    return config
}, error => {

  // Do something with request error
  console.log('err' + error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    const res = response.data;

      if (res.msg.indexOf('登录超时') !== -1) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.errorcode === -1001 || res.errorcode === -1002 || res.errorcode === 50014) {
        localStorage.removeItem('ms_username');
        // store.dispatch('login').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug，返回登录页面
        // })
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
            callback: action => {
                // this.$router.push('/login')
                window.location.href = '/'
            }
        })
        // }).then(() => {
        //     window.location.href = '/EstablishCoupon'
        //     // location.reload();// 为了重新实例化vue-router对象 避免bug
        //
        //     // router.push('/login')
        // })
      // }
    }
      else if(res.msg.indexOf('暂无权限') !== -1 && localStorage.getItem("roleId") !== '3'){
          MessageBox.confirm('抱歉，你没有权限执行此操作', '权限不足', )
      }
      else {
        return res
    }

  },
  error => {
    // console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
