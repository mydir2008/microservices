import dva from './create-app'
/**
 * 创建及加载model
 * @param {} defModel
 * @author 聂维 
 */
async function createModel(defModel){
    const app = await dva.getApp()
    app.model(defModel)
}

export { createModel }