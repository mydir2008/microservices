import { get, post, postForm } from '../request'

const request = {get, post, postForm}


/**
 * 简化model和service定义
 * 
 * import ModeService from '@/utils/decorator/mode-service'
 * 
 * @ModeService('userList', 'get', 'http://localhost:8080/api', 'data')
 * @ModeService('roleList', 'get', 'http://localhost:8080/api', 'data')
 * class AService{}
 * 
 * @param {*} name 
 * @param {*} type 
 * @param {*} url 
 * @param {*} filed
 * 
 * @author 聂维
 * @email stevennie@aliyun.com
 */
function Service(name, type, url, filed) {
    return function (Constructor, key, desc) {
        Constructor[name] = createServiceStaticMethod({ name, type, url, filed })
        const methods = Constructor._$$$staticMethods || []
        methods.push({ name, type, url, filed })
        Constructor._$$$staticMethods = methods
    }
}

function Model(namespace) {
    return function (Constructor, key, desc) {
        if (!Constructor.__createModel__) {
            Constructor.__createModel__ = createModelImpl(Constructor, namespace)
        }
    }
}

function createServiceStaticMethod({ name, type, url, filed }) {
    return async function (...args) {
        console.log('serviceMethod:----', JSON.stringify(args))
        const r = await request[type](url, ...args)
        if (filed) {
            return r[filed]
        }
        return r
    }
}

function createModelImpl(Constructor, namespace) {
    return (Ssssss) => {
        const defMode = {
            namespace: namespace,
            state: {},
            effects: {},
            reducers: {}
        }
        //创建reducer
        defMode.reducers.save = createReducer()
        //获取staticMehtod列表
        const staticMethods = Constructor._$$$staticMethods || []
        //添加自定义方法列表
        const r = staticMethods.map(o => o.name)

        Object.getOwnPropertyNames(Constructor).forEach((m) => {
            if (m.endsWith('Func') && r.indexOf(m) === -1 && typeof Constructor[m] === 'function') {
                staticMethods.push({ name: m })
            }
        })
        //初始化state
        staticMethods.forEach(s => {
            defMode.state[s.name] = {}
        });
        //初始化effects
        staticMethods.forEach(s => {
            defMode.effects[s.name] = createEffects(s, Constructor)
        });
        return defMode
    }
}

function createReducer() {
    return function (state, { payload }) {
        return {
            ...state,
            ...payload
        }
    }
}

function createEffects(s, Constructor) {
    const serviceMethod = Constructor[s.name]
    return function* ({ payload, callback }, { select, call, put }) {
        try {
            console.log('-----------payload--------' + JSON.stringify(payload))
            const resp = yield call(serviceMethod, payload)
            callback && callback(resp, true)
            
            yield put({
                type: 'save',
                payload: {
                    [s.name]: resp
                }
            })
        } catch (err) {
            callback && callback(err, false)
        }
    }
}

export { Model, Service }