import { get, post } from '../http'

export function test(){
    return get({
        url: '/fetchList',
        data: {
            name:1
        }
    })
}
export function test2(){
    return post({
        url: '/fetchList',
        data: {
            name:1
        }
    })
}