import axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://localhost:2512'

// const baseUrl = 'http://49.232.130.71'

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
    config => {

        // 请求等待超时：
        config.timeout = 10000

        return config
    },
    error => {
        return Promise.reject(error)
    }

)

axios.interceptors.response.use(
    responseConfig => {

        /**
         * 解构赋值
         */
        const { status, config, data: resData } = responseConfig

        // 请求失败：
        if (status !== 200) {
            return Promise.reject(responseConfig)
        }

        // 请求成功：

        // 执行请求成功后操作
        // ...some code... 例如直接返回 resData.data 的具体内容
        if (resData.code == 200) {

            console.log(' == 接口 =>', config.url, '请求成功，== 数据 ==>')
            return resData.data
        }

        // 返回结果
        console.log(' == 接口 =>', config.url, '请求失败，== 请求结果 ==>')
        return resData

    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * ！！！需要用 Promise 返回 ajax 请求结果
 */

// get 请求
export function get({
    url,
    data,
    headers,
}) {

    addHeader(headers)

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        }).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        });
    })

}

// post 请求
export function post({
    url,
    data,
    headers
}) {
    addHeader(headers)

    // 处理参数
    data = qs.stringify({
        ...data
    })

    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

// 个别请求新增请求头
function addHeader(headers = {}) {
    if (Object.keys(headers).length) {
        for (let key in headers) {
            axios.defaults.headers[key] = headers[key]
        }
    }
}
