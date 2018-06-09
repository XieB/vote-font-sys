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

//临时保存code,把url规整下
export function setWxCode(code){
    sessionStorage.setItem('wxCode',code);
}

export function getWxCode(){
    return sessionStorage.getItem('wxCode');
}

export function clearWxCode(){
    sessionStorage.removeItem('wxCode');
}

export function testX(){
    return 'test';
}

export function reviseUrl(){
    let url = queryString.parse(location.search);
    if (url.code){
        let redirectUrl = location.href.replace(location.search,'');
        window.location.href = redirectUrl;     //如果不替换会有code参数
    }
}