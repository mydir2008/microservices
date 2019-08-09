import { usePlugin, applyPlugins } from '@/utils/plugin'
import DecideCanvasToImgTransform from '@/utils/plugins/decide-canvas-to-img-transform'

//注入全局插件
//注册decide-canvas-to-img-transform插件
usePlugin('decide-canvas-to-img-transform', DecideCanvasToImgTransform)

export default {
    //api request请求地址
    base_apiurl: BASE_APIURL,
    //物理路径前缀
    base_pathUrl:BASE_PATHURL,
    //static request请求地址
    base_staticurl: BASE_STATICURL,
    //h5 request请求地址
    base_h5url: BASE_H5URL,
    // 是否开发环境
    IS_DEV: process.env.NODE_ENV === 'development',
    // 是否产品环境
    IS_PROD: process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test',
    // 是否测试环境
    IS_TEST: process.env.NODE_ENV === 'test',
    HTTP_STATUS: {
        '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        '401': '用户没有权限（令牌、用户名、密码错误）。',
        '403': '用户得到授权，但是访问是被禁止的。',
        '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        '406': '请求的格式不可得。',
        '410': '请求的资源被永久删除，且不会再得到的。',
        '414': '请求 - URI 太长',
        '422': '当创建一个对象时，发生一个验证错误。',
        '500': '服务器发生错误，请检查服务器。',
        '502': '网关错误。',
        '503': '服务不可用，服务器暂时过载或维护。',
        '504': '网关超时。'
    },
    currCookie:'',
    setCurrCookie(val){
        this.currCookie = val
    },
    getCurrCookie(){
        return this.currCookie
    }
}