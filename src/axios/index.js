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
 * 删除投票项
 * @param value 名称
 * @param ownerId 归属id
 * @returns {*}
 */
export function deleteOption(value,ownerId){
    return http.delete('/admin/vote/option',{
        params: {
            name: value,
            ownerId: ownerId
        }
    });
}

/**
 * 编辑时添加投票项
 * @param ownerId 所属id
 * @param value 名称
 * @returns {AxiosPromise<any>}
 */
export function addOption(ownerId,value){
    return http.post('/admin/vote/option',{ownerId: ownerId,name: value});
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
 * 获取未审核人员列表
 */
export function getNoExamine(page){
    return http.get('/admin/system/noMember',{
        params : {
            page: page,
        }
    });
}

/**
 * 已审核成员列表
 * page 页码
 * @returns {*}
 */
export function getExamine(page){
    return http.get('/admin/system/member',{
        params : {
            page: page,
        }
    });
}

/**
 * 删除成员
 * @param id
 * @returns {*}
 */
export function deleteMember(id){
    return http.delete('/admin/system/member',{
        params:{
            id: id
        }
    });
}

/**
 * 审核成员
 * @param id
 * @returns {AxiosPromise<any> | IDBRequest | Promise<void>}
 */
export function examineUser(id){
    return http.put('/admin/system/member',{id: id});
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

/**
 * 用户获取投票
 * @param type 类型
 * @param page 分页
 * @returns {*}
 */
export function getUserVote(type,page){
    let _type;
    switch (type){
        case 'going':
            _type = '2';
            break;
        case 'end':
            _type = '1';
            break;
    }
    return http.get('/user/vote',{
        params:{
            type: _type,
            page: page,
        }
    });
}

/**
 * 更新个人信息
 * @param obj 提交对象
 * @returns {AxiosPromise<any> | IDBRequest | Promise<void>}
 */
export function updateUserInfo(obj){
    return http.put('/user/setting/user',obj);
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo(){
    return http.get('/user/setting/user');
}

/**
 * 通过id获取选项
 * @param id ownerId
 * @returns {*}
 */
export function getUserOptions(ownerId){
    return http.get('/user/option',{
        params: {
            ownerId: ownerId,
        }
    })
}

/**
 * 获取一条投票信息
 * @param id
 * @returns {*}
 */
export function getUserOneVote(id){
    return http.get('/user/vote/one',{
        params: {
            id: id,
        }
    })
}

/**
 * 单选投票
 * @param optionId 选项id
 * @param voteId voteId
 * @returns {AxiosPromise<any>}
 */
export function voteRadio(optionId,voteId){
    return http.post('/user/vote/radio',{id: optionId,ownerId: voteId});
}

/**
 * 复选投票
 * @param optionIdList optionId数组
 * @param voteId voteId
 * @returns {AxiosPromise<any>}
 */
export function voteCheckBox(optionIdList,voteId){
    return http.post('/user/vote/checkbox',{idList: optionIdList,ownerId: voteId});
}

/**
 * 查询用户是否已经投票
 * @param voteId
 * @returns {*}
 */
export function hasVote(voteId){
    return http.get('/user/vote/voted',{
        params: {
            ownerId: voteId,
        }
    })
}

/**
 * 获取投票结果
 * @param voteId
 * @returns {*}
 */
export function getVoteResult(voteId){
    return http.get('/user/vote/result',{
        params: {
            ownerId: voteId,
        }
    })
}

export function getAdminVoteResult(voteId){   //token不同的验证方式，方法不能共用
    return http.get('/admin/vote/result',{
        params: {
            ownerId: voteId,
        }
    })
}

/**
 * 获取投票参与人数
 * @param voteId
 * @returns {*}
 */
export function getVotePersonNums(voteId){
    return http.get('/user/vote/votePersonNums',{
        params: {
            ownerId: voteId,
        }
    })
}


export function getAdminVotePersonNums(voteId){
    return http.get('/admin/vote/votePersonNums',{
        params: {
            ownerId: voteId,
        }
    })
}