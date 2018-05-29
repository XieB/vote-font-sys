import axios from 'axios'
import Qs from 'qs'

var http = axios.create({
    // baseURL: baseUlr,
    timeout: 2000,
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }]
})

/**
 * 管理员登录
 * @param username 用户名
 * @param password 密码
 * @returns {AxiosPromise<any>}
 */
export function adminLogin(username,password){
    return http.post('/v1/admin/login',{user:username,pass:password});
}