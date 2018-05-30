export function getToken(){
    return sessionStorage.getItem('token');
}

export function setToken(tokenValue){
    sessionStorage.setItem('token',tokenValue);
}