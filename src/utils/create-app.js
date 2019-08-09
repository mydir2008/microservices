import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import userImmer from 'dva-immer';

let app
let store
let dispatch
let registered
let resolveApps = []
/**
 * 创建dva app实例, 
 * 配置参考详见:https://github.com/dvajs/dva/blob/master/packages/dva-core/src/index.js
 * @param {} opt 
 * @author 聂维
 */
function createApp(opt) {
  // redux日志
  opt.onAction = [createLogger()]
  app = create(opt)
  app.use(createLoading({}))
  app.use(userImmer())

  //启动dva实例:store的初始化、dva插件的实例化
  app.start()

  store = app._store
  app.getStore = () => store
  app.use({
    onError(err) {
      console.log(err)
    },
  })

  dispatch = store.dispatch

  app.dispatch = dispatch
  if (resolveApps.length > 0){
    resolveApps.forEach(r => r(app))
  }
  return app
}

function getApp() {
    if (app){
        return Promise.resolve(app);
    }
    return new Promise((resolve, reject) => {
        resolveApps.push(resolve)
    })
}

export default {
  createApp,
  getApp,
  getDispatch() {
    return app.dispatch
  }
}