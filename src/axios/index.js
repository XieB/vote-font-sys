import http from './axios';
/**
 * 管理员登录
 * @param username 用户名
 * @param password 密码
 * @returns {AxiosPromise<any>}
 */
export function adminLogin(username,password){
    return http.post('/v1/token/admin',{username:username,password:password});
}

/**
 * 添加投票
 * @param obj 提交对象
 * @returns {AxiosPromise<any>}
 */
export function addVote(obj){
    return http.post('/v1/vote',obj);
}