import axios from 'axios'
import Qs from 'qs'

import {getToken} from "@/utils";
import router from '@/router';

var http = axios.create({
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
        if (error.response.status == '401') {  //过期失效
            router.replace({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
        return Promise.reject(error);
    }
);

/**
 * 管理员登录
 * @param username 用户名
 * @param password 密码
 * @returns {AxiosPromise<any>}
 */
export function adminLogin(username,password){
    return http.post('/v1/token/admin',{username:username,password:password});
}