const APPID = 'wx9e74d5e50ed84c6e',
userLoginUrl = 'http://192.168.0.110:8080/#/user/login';
//用户授权方式
export const wxScope = 'snsapi_userinfo';
// export const wxScope = 'snsapi_base';
export const getCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + encodeURIComponent(userLoginUrl) + '&response_type=code&scope=' + wxScope + '&state=noUse#wechat_redirect';

export const admin = {

}

export const user = {

}

export const userErrorCode = {  //错误状态码
    'NOREVIEW': '1001', //未审核
}