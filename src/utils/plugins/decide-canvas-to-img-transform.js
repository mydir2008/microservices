/**
 * 判断是否需要Canvas转换image, 该方法主要在components/pagelayout.js 中调用
 * @author 聂维
 */

export default function(pagelayout){
    const data = pagelayout.props
    //是否发生页面滚动
    const pageScroll = data.global.pageScroll
    //是否发生页面浮动层
    const pageShowModel = data.pageShowModel
    //私有model 列表
    const models = data.__needModel__ //页面配置
    //是否存在loading
    let hasLoading = false
    const leffects = data.loading.effects || {}
    const keys = Object.keys(leffects);
    for (let i = 0; i < keys.length; i++) {
        const r = keys[i].split('\/');
        if (models && models.indexOf(r[0]) !== -1 && leffects[keys[i]] === true) {
            hasLoading = true
            break
        }
    }
    return (pageScroll || pageShowModel || hasLoading)
}