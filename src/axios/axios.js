import axios from 'axios'
import Qs from 'qs'

import {getToken,clearToken} from "@/utils";

import { Toast } from 'vant';

let http = axios.create({
    // baseURL: 'http://www.vote-tp.tt',
    baseURL: 'http://192.168.0.110',
    timeout: 2000,
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }]
})

// 添加请求拦截器
http.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.authorization = token;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

// 添加响应拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        switch (error.response.status){
            case 401:
                clearToken();   //清空token
                Toast('登录已过期，请重新登录');
                setTimeout(()=>{
                    // window.location.reload();   //刷新页面，路由文件判断跳转
                    window.router.push('/login');
                },2000);
                console.log('401');
                break;
            case 500:
                Toast('服务器内部错误');
                console.log('500');
                break;
        }
        return Promise.reject(error);
    }
);

export default http;