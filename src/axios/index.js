import http from './axios';
/**
 * 管理员登录
 * @param username 用户名
 * @param password 密码
 * @returns {AxiosPromise<any>}
 */
export function adminLogin(username,password){
    return http.post('/common/token/admin',{username:username,password:password});
}

/**
 * 添加投票
 * @param obj 提交对象
 * @returns {AxiosPromise<any>}
 */
export function addVote(obj){
    return http.post('/admin/vote',obj);
}

/**
 * 获取已完成投票列表
 * @param isFinished 是否结束，1结束，2未结束
 * @param page 页码
 * @returns {*}
 */
export function getVote(isFinished,page){
    return http.get('/admin/vote',{
        params: {
            type: isFinished,
            page: page,
        }
    });
}

/**
 * 删除
 * @param id
 * @returns {*}
 */
export function deleteVote(id){
    return http.delete('/admin/vote',{
        params: {
            id: id,
        }
    });
}

/**
 * 获取单条信息
 * @param id
 * @returns {*}
 */
export function getOneVote(id){
    return http.get('/admin/vote/one',{
        params: {
            id: id,
        }
    });
}

/**
 * 编辑
 * @param obj 提交对象
 * @returns {*}
 */
export function editVote(obj){
    return http.put('/admin/vote',obj);
}

/**
 * 重置密码
 * @param obj
 * @returns {AxiosPromise<any> | IDBRequest | Promise<void>}
 */
export function resetPass(obj){
    return http.put('/admin/system/pass',obj);
}


/**
 * 通过code获取token
 * @param code 微信code
 * @returns {*}
 */
export function getTokenFromWechatCode(code){
    return http.get('/common/token/user',{
        params: {
            code: code,
        }
    });
}

export function getUserVote(){
    return http.get('/user/vote');
}