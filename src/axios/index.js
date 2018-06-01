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

/**
 * 获取已完成投票列表
 * @param isFinished 是否结束，1结束，2未结束
 * @param page 页码
 * @returns {*}
 */
export function getVote(isFinished,page){
    return http.get('/v1/vote',{
        params: {
            type: isFinished,
            page: page,
        }
    });
}

export function deleteVote(id){
    return http.delete('/v1/vote',{
        params: {
            id: id,
        }
    });
}

export function getOneVote(id){
    return http.get('/v1/vote/one',{
        params: {
            id: id,
        }
    });
}