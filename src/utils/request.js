import Taro from '@tarojs/taro';
import '@tarojs/async-await';
import { base_apiurl,base_pathUrl,HTTP_STATUS } from '../config';
import config from '../config';

export default {
    TaroRequest(params,method){
        let { url, data } = params
        let adUrl = ''
        let contentType = 'application/json'
        contentType = params.contentType || contentType
        if(url.indexOf('https://') != -1){
            adUrl = url
        }else{
            adUrl = config.base_apiurl + config.base_pathUrl + url
        }
        let extOptions = {}
        //config.setCurrCookie('niinininininin')
        extOptions['Cookie'] = config.getCurrCookie()
        return new Promise((resolve, reject) => {
            Taro.request({
                url: adUrl,
                data: data,
                method: method,
                header: {
                    ...extOptions,
                    'Accept': 'application/json',
                    'content-type': contentType
                },
                success(res){
                    resolve(res);
                },
                fail(err){
                    resolve({data:{code:500,message:'请求失败'}})
                }
            })
        })
    },
    async baseOptions(params, method = 'GET',showLoading=true){
        let requestData = await this.TaroRequest(params, method)
        if(config.HTTP_STATUS[requestData.statusCode]){
            Taro.showToast({
                title:config.HTTP_STATUS[requestData.statusCode],
                icon: 'none',
                duration: 2000
            })
            return false;
        }else{
            //是否需要框架提示出错
            if(showLoading){
                let reqData = false;
                try {
                    reqData = JSON.parse(JSON.stringify(requestData))
                    if(reqData.data.isException){
                        Taro.showToast({
                        title:reqData.data.expInfo || '服务端错误',
                        icon: 'none',
                        duration: 2000
                        })
                        return reqData
                    }
                } catch(err) {
                    Taro.showToast({
                        // title:requestData.data.message || requestData.data.errMsg,
                        title:'服务端错误',
                        icon: 'none',
                        duration: 2000
                    })
                    return reqData
                }finally{
                    return requestData.data
                }
            }else{
                let reqData = false;
                try {
                    reqData = JSON.parse(JSON.stringify(requestData.data.data))
                } catch(err) {
                    return reqData
                } finally {
                    return requestData.data
                }
            }
        }
    },
    get(url,data={},showLoading=true) {
        let option = { url, data }
        return this.baseOptions(option,'GET',showLoading)
    },
    post(url,data={},showLoading=true) {
        let params = { url, data }
        return this.baseOptions(params,'POST',showLoading)
    },
    postForm(){}
}
