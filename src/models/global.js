import Taro from '@tarojs/taro';
import { createModel } from '@/utils/create-model'
import defLocale from '@/locale/index'

//获取设备信息
const deviceInfo = Taro.getSystemInfoSync()

async function dddd(){
    return new Promise((r,r1) => {
        setTimeout(() => {
            r(true)
        }, 5000);
    })
}

createModel({
    namespace: 'global',
    state:{
        time: '12344',

        //设备信息
        deviceInfo: {
            model: deviceInfo.model,
            //像素比
            pixelRatio: deviceInfo.pixelRatio,
            //可视宽度
            screenWidth: deviceInfo.screenWidth,
            //可视高度
            screenHeight: deviceInfo.screenHeight,
            //窗口宽度
            windowWidth: deviceInfo.windowWidth,
            //窗口高度
            windowHeight: deviceInfo.windowHeight,
            //状态栏高度
            statusBarHeight: deviceInfo.statusBarHeight,
            //微信字体设置大小
            fontSizeSetting: deviceInfo.fontSizeSetting,
            //是否isIpx
            isIpx:deviceInfo.model.indexOf('iPhone X') > -1 ? true : false
        },
        //当前用户数据
        userData: null,
        //国际化数据
        locales: {},
        //用户权限数据
        userPermits: {},
        //页面栈：用于解决交互问题，因为仅依靠小程序内置的页面栈在某些场景下，会无法正确返回
        pageHistory: [],
        //状态监控:滚动状态
        pageScroll: false,
        //页面是否存在遮罩
        pageShowModel: true,
        //更新次数
        updateCanvansImageCount: 0,
        //标记是否需要转换成图片
        hasNeedConverCanvasToImge: false
    },
    effects:{
        *user({ payload, callback }, { select, call, put }){
            try {
                yield call(dddd)
                yield put({
                    type: 'save',
                    payload: {
                        time: new Date().getTime()
                    }
                })
                callback && callback({data: 'ok'}, true)
            } catch (error) {
                callback && callback({data: 'error'}, false)
            }
        },
        //登录
        *login({ payload }, { select, call, put }){
           try {
            
           } catch (error) {
               
           }
        }
    },
    reducers:{
        save(state, { payload }){
            return {
                ...state,
                ...payload
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {
            const localeDatas = defLocale || {}
            dispatch({
                type: 'save',
                payload: {
                    locales: localeDatas
                }
            })
            dispatch({
                type: 'login',
                payload: {
                    
                }
            })
        }
    },
})