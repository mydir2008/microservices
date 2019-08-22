/**
 * 简化dispath开发
 * import dispath from '@/utils/decorator/dispath'
 * class Index extends Component {
 * 
 *   @dispath('global/test')
 *   handler(){
 *     return {
 *        //参数
 *     }
 *  }
 *   @dispath('global/test')
 *   @dispath('global/test1')
 *   handler(){
 *     return {
 *        test: {//参数},
 *        test1: {//参数}
 *     }
 *  }
 *  
 * //接收所有的dispath的回调, 替代过去的callback
 *  onEffectComplete(data){
 * 
 *  }
 * 
 * @param {*} type 
 * @param {*} options
 * @author 聂维
 * @email stevennie@aliyun.com 
 */
export default function(type, options){
    return (target, key, desc)=> {
        const oldFn = target[key]
        const _$$dispaths = oldFn._$$dispaths || []
        _$$dispaths.push({
            funcName: key,
            type,
            options
        })
        oldFn._$$dispaths = _$$dispaths
        oldFn._$$callbacks = []
        return {
            ...desc,
            value: createDispathProxy(target, key)
        }
    }
}

function createDispathProxy(target, key){
    const oldFn = target[key]
    return function(...args){
        const res = oldFn.call(this, ...args) || {}
        const _$$dispaths = oldFn._$$dispaths || []
        _$$dispaths.forEach(r => {
            const type = r.type
            const effectName = type.split('\/')[1]
            let payload
            if (_$$dispaths.length === 1){
                payload = res[effectName] || res
            } else {
                payload = res[effectName] || {}
            }
            this.props.dispatch({
                type: type,
                payload: payload,
                callback: (resp, isSuccess)=>{
                    oldFn._$$callbacks.push({
                        type: type,
                        data: resp,
                        isSuccess: isSuccess
                    })
                    if (oldFn._$$callbacks.length === oldFn._$$dispaths.length){
                        const xargs = oldFn._$$callbacks.length > 1 ? oldFn._$$callbacks : oldFn._$$callbacks[0]
                        if (this.onEffectComplete){
                            setTimeout(() => {
                              this.onEffectComplete(xargs, r.funcName)
                            }, 50)
                            
                        }
                    }
                }
            })
        })
    }
}