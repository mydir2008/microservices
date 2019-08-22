import invariant from 'invariant';
import isPlainObject from 'is-plain-object';

/**
 *  定制一个插件工具，用于处理 数据逻辑转换、事件、权限的处理， 降低代码 model、view、service
 * 的耦合度,
 * 参考实现: dva-core/src/Plugin.js  umijs插件系统
 *
 *  @author 聂维
 * @email stevennie@aliyun.com
 */
const hooks = {}

/**
 * 注入插件
 * 
 */
function usePlugin(key, handler){
    invariant(
        (typeof handler === 'function'),
        'plugin.use: handler参数必须为函数'
    );
    const handlers = hooks[key] || []
    handlers.push(handler)
    hooks[key] = handlers
}


/**
 * 执行插件
 * @param {*} key 
 * @param {*} defaultHandler 
 */
function applyPlugins(key, defaultHandler){
    const resp = typeof defaultHandler === 'function' ? defaultHandler() : defaultHandler
    invariant(
        isPlainObject(resp),
        'plugin.apply: defaultHandler参数必须是一个函数且返回一个普通对象(defaultHandler也可以是普通对象)'
    );
    const useHooks = hooks[key] || []
    return useHooks.reduce((memo, fn) => {
        return fn(memo)
    }, resp)
}

export { usePlugin, applyPlugins }