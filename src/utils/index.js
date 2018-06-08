const queryString = require('query-string');
export function getToken(){
    return sessionStorage.getItem('token');
}

export function setToken(tokenValue){
    sessionStorage.setItem('token',tokenValue);
}

export function clearToken(){
    sessionStorage.removeItem('token');
}

export function reviseUrl(){
    let url = queryString.parse(location.search);
    if (url.code){
        let redirectUrl = location.href.replace(location.search,'');
        window.location.href = redirectUrl;     //如果不替换会有code参数
    }
}