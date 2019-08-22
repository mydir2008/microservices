/**
 * 埋点插件实现，
 * 1.概念
 *     埋点记录级别: 共计1~5级,前端会根据configUrl接口获取中台返回 “级别”参数，则小程序端只会记录当前及当前级别以上的埋点数据
 *     参数配置接口configUrl：需要服务端实现
 *     埋点保存接口recordUrl: 需要服务端实现
 *     enableLevel：启用记录级别
 * 2.埋点维度说明,
 *   暂且对数据内容的定义时(后期可以扩展，建议后台数据库表在设计的时候，多出几个扩展列): "什么人" 在" 什么时间" 在 "什么页面 "执行了 "什么操作"
 * 
 * 3.如何使用:
 *   采用注解的方式,
 *   对于page的hook注入，会由框架自动注入，开发不需要关心，具体的业务埋点注入，需要开发人员手动添加，例如: 
 *   
 *   import { sensorsdata, RECORD_LEVEL_1, RECORD_LEVEL_2, RECORD_LEVEL_3, RECORD_LEVEL_4, RECORD_LEVEL_5 } from '@/utils/sensorsdata/index'
 * 
 *   class SensorsDataPage extend Taro.compnent{
 *      constructor(props) {
 *          super(props)
 *          this.testClick = this.testClick.bind(this)
 *      }
 *     
 *     //标记埋点
 *     @sensorsdata(RECORD_LEVEL_1)  
 *     testClick(){
 *        return {
 *          sensorParams: {}//sensorParams 埋点扩展数据
 *        }
 *     }
 * 
 *     render(){
 *       return (
 *          <View onClick={this.testClick}>点击我测试埋点</View>
 *       )   
 *     }
 * 
 *   }
 * 
 * @author 聂维
 */
import { post, get } from '../request'
import { getCurrentPages } from '@tarojs/taro';
import dva from '../create-app'

 //埋点数据级别
const RECORD_LEVEL_1 = 1
const RECORD_LEVEL_2 = 2
const RECORD_LEVEL_3 = 3
const RECORD_LEVEL_4 = 4
const RECORD_LEVEL_5 = 5

let options = {
    configUrl: '',
    recordUrl: '',
    enableLevel: 1
}

/**
 * 配置插件参数
 */
function applyConfig(changOptions){
    options = {
        ...options,
        ...changOptions
    }
}

function createProxy(fn, opt){
    return async (...args) => {
        const params = fn.call(this, ...args) || {}
        if (opt.level < options.level){
            return true
        }
        const app = await dva.getApp()
        const store = app.getStore()
        //获取当前用户数据
        const userData = store && store.getState().global && store.getState().global.userData
        if (!userData){
            return true
        }
        const pageStacks = getCurrentPages()
        const currentPage = pageStacks && pageStacks.length > 0 ? pageStacks[pageStacks.length - 1].route : '---'

        const data = {
            methodName: opt.methodName, //方法
            currentPage: currentPage, //当前页面
            openId: userData.openId,//用户Id
            extendDatas: (params.sensorParams || {})//扩展参数
        }
        await post(opt.recordUrl, data)
    }
}

/**
 * 
 * @param {*} currentLevel 定义级别
 */
function laction(currentLevel){
    return (target, name, props) => {
        const {
            value,
            ...other
          } = props
        
        const fn = target[name]
        return {
            ...other,
            value: createProxy(fn, {level: currentLevel, methodName: name, ...options})
        }
    }
}

/**
 * 获取埋点配置
 */
async function getServerConfig(){
    return await get(options.configUrl)
}

export { getServerConfig, applyConfig, laction, RECORD_LEVEL_1, RECORD_LEVEL_2, RECORD_LEVEL_3, RECORD_LEVEL_4, RECORD_LEVEL_5 }

