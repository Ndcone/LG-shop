import { request } from '../request/http.js'
import qs from 'qs'
//请求图片的接口
export function HomeClassify(params) {
    return request({
        url: '/api/Home/getHomeREC',
        method: 'get',
        params
    })
}

export function Homeshop(params) {
    return request({
        url: '/api/Home/getHomeShowGoods',
        method: 'get',
        params
    })
}
export function Homenavshop(params) {
    return request({
        url: '/api/Goods/GetGoodsInfo',
        method: 'get',
        params
    })
}
export function Classify(params) {
    return request({
        url: '/api/Goods/getCatsTree',
        method: 'get',
        params
    })
}
export function Classifyshop(params) {
    return request({
        url: '/api/Goods/getCadGoods',
        method: 'get',
        params
    })
}
export function Searchshop(params) {
    return request({
        url: '/api/Goods/getGoods',
        method: 'get',
        params
    })
}

export function Checkphone(params) {
    return request({
        url: '/api/Verify/GetPhone',
        method: 'get',
        params
    })
}
export function Checkname(params) {
    return request({
        url: '/api/Verify/LoginName',
        method: 'get',
        params
    })
}
export function sendmes(params) {
    return request({
        url: '/api/SMSCode/GetCode',
        method: 'get',
        params
    })
}
export function sendlogin(params) {
    return request({
        url: '/api/LoginPage/AddLogin',
        method: 'POST',
        params
    })
}
export function addlogin(params) {
    return request({
        url: '/api/LoginPage/Login',
        method: 'POST',
        params
    })
}
export function hotsearch(params) {
    return request({
        url: '/api/Goods/getSearchHot',
        method: 'get',
        params
    })
}
export function getUserData(params) {
    return request({
        url: '/api/UserInfo/getUserData',
        method: 'get',
        params
    })
}
export function addCart(params) {
    return request({
        url: '/api/Cart/addCart',
        method: 'POST',
        params
    })
}
export function getCart(params) {
    return request({
        url: '/api/Cart/getCart',
        method: 'get',
        params
    })
}
export function payment(params) {
    return request({
        url: '/api/Alipay/appWebPay',
        method: 'POST',
        params
    })
}
//用户是从购物车中进行下单操作时 需要获得用户购物车中是商品数量
export function payfromcard(data) {
    return request({
        url: '/api/Order/getGoodsInfoFromCart',
        method: 'get',
        data

    })
}
//添加用户的收货地址
export function addadress(data) {
    return request({
        url: '/api/UserInfo/addArea',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function getaddress(data) {
    return request({
        url: '/api/UserInfo/getArea',
        method: 'get',
        data
    })
}
export function getorder(params) {
    return request({
        url: '/api/Order/getOrderInfo',
        method: 'get',
        params
    })
}

export function delecart(params) {
    return request({
        url: '/api/Cart/DeleteCart',
        method: 'patch',
        params
    })
}
export function createorder(data) {
    return request({
        url: '/api/Order/cretaeOrder',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function verifypassword(data) {
    return request({
        url: '/api/Order/verifyPayPWD',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function getOrderByState(params) {
    return request({
        url: '/api/Order/getOrderByState',
        method: 'get',
        params: params
    })
}
export function payOrder(data) {
    return request({
        url: '/api/Order/payOrder',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function antpay(data) {
    return request({
        url: '/api/Alipay/appWebPay',
        method: 'post',
        data: qs.stringify(data)
    })
}