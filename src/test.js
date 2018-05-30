const queryString = require('query-string');
const md5 = require('blueimp-md5');
const strRandom = '4856a89dfd6a39e0e47cd9fff4322fea';

/**
 * 获取加密串
 * @param params 原始参数串
 */
function getSign(params){
    let paramsObj = queryString.parse(params);
    let sortParams = queryString.stringify(paramsObj,{encode: false});  //这家伙可以排序
    return md5(md5(sortParams) + strRandom);
}


let res = getSign();
// console.log(res);
let baseUrl = 'http://a.api.com/v1/terminal/card/info';
console.log(queryString.parseUrl(baseUrl).query == false);