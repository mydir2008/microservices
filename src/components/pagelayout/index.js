import Taro, { Component, getCurrentPages } from '@tarojs/taro';
import { View } from '@tarojs/components';
import redux from '@tarojs/redux'
import { applyPlugins } from '@/utils/plugin'
import { AtToast } from "taro-ui"
import './index.scss'

/**
 * 页面定义组件
 * static defaultProps = {
 *      //是否打开页面loading状态 0：关闭 1 打开 
        loading: 0
    }
    @author 聂维
 */
class PageLayout extends Component {
    static externalClasses = ['page-layout-class']
    static defaultProps = {
        loading: 0,
        //loading
        loadingText: '执行中...',
        loadingIcon: 'loading',
        openLoading: false,
        //result
        toastOption: {}
    }

    state = {
        notNeedCheckSession: false,
        hasNeedConverCanvasToImge: false
    }

    componentDidUpdate(){
        this.dyncConvertCanvasToImage()
    }

    /**
     * 动态转换执行图片与canvans的互转
     */
    dyncConvertCanvasToImage(){
        const hasNeedConverCanvasToImge = applyPlugins('decide-canvas-to-img-transform', () => ({
            props: this.props
        }))

        if (this.state.hasNeedConverCanvasToImge !== hasNeedConverCanvasToImge){
            const updateCanvansImageCount = (this.props.global.updateCanvansImageCount || 0) + 1
            this.props.dispatch({
                type: 'global/save',
                payload: {
                    updateCanvansImageCount: updateCanvansImageCount,
                    hasNeedConverCanvasToImge: hasNeedConverCanvasToImge
                }
            })
        }
        this.state.hasNeedConverCanvasToImge = hasNeedConverCanvasToImge
    }

    componentWillMount() {}

    componentDidMount() {
    }

    getLoginUser() {
        return redux.getStore().getState().global.user || this.state.notNeedCheckSession
    }

    hasLogined() {
        return redux.getStore().getState().loading['global/login'] === false || this.state.notNeedCheckSession
    }

    hasLogining() {
        return redux.getStore().getState().loading['global/login'] === true && this.state.notNeedCheckSession === false
    }
    

    //获取页面状态
    isLoading() {
        return this.hasLogining() || this.props.loading
    }

    render() {
        const { toastOption } = this.props;
        return <View className='pagelayout page-layout-class'>
            {this.props.children}
        </View>
    }
}
export const TOAST_LOADING = {status: 'loading', duration: 0, icon: 'loading', text: '操作中...', isOpened: true}
export const TOAST_SUCCESS = {status: '', duration: 2000, icon: 'success', text: '操作成功', isOpened: true}
export const TOAST_ERROR = {status: '', duration: 2000, icon: 'error', text: '操作失败', isOpened: true}
export default PageLayout;