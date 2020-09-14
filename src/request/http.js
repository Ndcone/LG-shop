import axios from 'axios'
import store from '@/store'
import { Loading } from 'element-ui';
import { Toast } from 'vant';
export function request(config) {


    // 创建axios对象
    const service = axios.create({
        baseURL: 'http://www.hj0819.top:44369',  // 请求源地址
        timeout: 800000010120120100,// 请求过期时间
        // withCredentials: true,
    })

    service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    //请求拦截器
    service.interceptors.request.use((config) => {
        // const loading = Loading.service({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // });
        // setTimeout(() => {
        //     loading.close();
        // }, 2000);
        Toast.loading({
            message: '加载中...',
            forbidClick: false,
        });

        if (store.state.token) {
            config.headers.token = store.state.token
        }

        return config;
    }, err => {
        console.log(err)
    })

    //响应拦截器
    service.interceptors.response.use(res => {
        if (res.status && res.status !== 200) {
            // 登录超时,重新登录
            // if (res.status === 401) {
            //     store.dispatch('FedLogOut').then(() => {
            //         location.reload()
            //     })
            // }
        }
        return res.data
    }, err => {
        console.log(err)
    })
    return service(config)
} 