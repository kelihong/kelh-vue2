
// 常量、 公共方法

// 判断开发环境
const IS_DEV = (process.env.NODE_ENV === 'development');

// 设置 cookie 
/**
 * 设置cookie
 * @param {String} cname cookie 名
 * @param {*} cvalue cookie 值
 * @param {*} exdays 有效天数
 */
function setCookie(cname, cvalue, exdays) {

    // 设置过期时间：
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + date.toGMTString()

    // 设置cookie
    document.cookie = cname + '=' + cvalue + ';' + expires

}

// 获取 cookie
/**
 * 
 * @param {String} cname cookie 名
 */
function getCookie(cname) {

    let name = cname + '='
    let carray = document.cookie.split(';')

    for (let i = 0; i < carray.length; i++) {

        let citem = carray[i].trim() // 注意去空格
        if (citem.indexOf(name) == 0) {
            return citem.substring(name.length, citem.length)
        }
    }
    return ''
}

// 设置 localstorage: 
/**
 * 
 * @param {String} key storageKey
 * @param {*} value 
 */
function setStorage(key,value) {
    window.localStorage.setItem(key,value)
}

module.exports = {
    IS_DEV, // 是否开发环境
}
