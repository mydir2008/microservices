/**
 * 网络请求工具库，封装了异常规范处理、请求规范，开放了以下方法
 * get 
 * post
 * postForm
 * setCurrentCookie
 * getCurrentCookie 获取当前会话
 * wxlogin: 微信登录 获取用户信息,opendId, unionId等等
 * createSessionCookie 创建会话
 * @author 聂维
 */

import Taro, { checkSession } from '@tarojs/taro';
import '@tarojs/async-await';
import { base_apiurl, base_pathUrl, HTTP_STATUS } from '../config';
import config from '../config';

let SESSION_COOKIE_VALUE = 'dddddddd';
const NOT_LOGIN_EXCEPTION = { code: 500, message: '未登录, 请重新登录', errorType: 'no_login' }

/**
 * 判断是否是异常及异常格式化
 * @param {*} data 
 * @param {*} type boolea  
 */
function decideForException(res, requestStatus) {
    let isSuccess = requestStatus
    let errMsg;
    if (!requestStatus) {
        if (res instanceof Error && res.errMsg && res.errMsg.indexOf('request:fail') > -1) {
            errMsg = '请求失败(请检查网络)'
        } else {
            const status = res.statusCode || res.data.status;
            errMsg = '服务端发生未知错误(' + status + ')'
        }
    } else {
        if (res.data.isException === true) {
            isSuccess = false
            errMsg = res.data.expInfo || '服务端发生未知错误'
        }
    }
    return isSuccess === true ? res : { code: 500, message: errMsg, isException: true }
}

/**
 * 创建请求
 * @param { } data 
 * @param {*} type 
 */
function _createRequest(type) {
    const methods = { post: 'POST', postForm: 'POST', get: 'GET' }
    const header = {}
    header['content-type'] = (type === 'post') ? 'application/json' : (type === 'postForm' ? 'application/x-www-form-urlencoded' : '')
    const option = {
        header: header,
        method: methods[type],
        dataType: 'json'
    }
    return async (url, datas, isAuther = true) => {
        try {
            if (isAuther === true && !SESSION_COOKIE_VALUE) {
                return Promise.reject(NOT_LOGIN_EXCEPTION)
            }

            header['Cookie'] = SESSION_COOKIE_VALUE
            const resp = await Taro.request({
                ...option,
                url,
                data: datas
            })
            const data = decideForException(resp, true)
            if (data.isException === true) {
                return Promise.reject(data)
            }
            return data
        } catch (error) {
            const _dataError = decideForException(error, false)
            return Promise.reject(_dataError)
        }
    }
}

/**
 * 保存会话cookie
 * @param {*} value 
 */
function setCurrentCookie(value) {
    SESSION_COOKIE_VALUE = value
}

/**
 * 获取用户回话
 */
function getCurrentCookie() {
    return SESSION_COOKIE_VALUE
}

const get = _createRequest('get')
const post = _createRequest('post')
const postForm = _createRequest('postForm')

/**
 * 格式化cookie,如果存在两个，则取第二个
 * @param { } cookie 
 */
function _getSessionKeyCookie(cookie) {
    let res = null;
    const r = cookie
    if (r) {
        res = r.split(',');
        res = res.length > 1 ? res[1] : r;
    }
    return res;
}

/**
 * 调用服务端接口创建会话
 */
async function createSessionCookie(url, data) {
    const resp = await get(url, data, false)
    const newSessionCookie = _getSessionKeyCookie(resp.header['Set-Cookie']);
    //缓存cookie
    setCurrentCookie(newSessionCookie)
    return newSessionCookie
}

/**
 * 微信登录， 用户服务端获取当前用户的微信参数信息，例如openid、unionId
 * @param {} url 
 * @param {*} data 
 */
async function wxlogin(url) {
    const wxlogin = await Taro.login();
    const loginCode = wxlogin.code
    const resp = await get(url, { code: loginCode })
    return resp.data
}

export { get, post, postForm, setCurrentCookie, getCurrentCookie, wxlogin, createSessionCookie }
