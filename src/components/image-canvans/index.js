import Taro, { Component, getCurrentPages } from '@tarojs/taro';
import { View } from '@tarojs/components';
import {F2Canvas} from 'taro-f2'
import F2 from '@antv/f2'
import f2fix from './canvass-fixf2'
import { AtToast } from "taro-ui"
import '@antv/f2/lib/plugin/legend'
import './index.scss'

/**
 * 扩展f2Canavas，支持图片与canvans转换
 * @author 聂维
 */
class Index extends Component {

    constructor(props){
        super(props)
        this.drawRadar = this.drawRadar.bind(this)
    }

    static defaultProps = {
        height: Number,
        tempPath: null
    }

    state = {
        notNeedCheckSession: false
    }

    componentDidUpdate(){}

    componentWillMount() {}

    componentDidMount() {
    }

    drawRadar(canvas, width, height, scope){
        const that = this
        setTimeout(() => {
            f2fix()
            this.props.onCanvasInit(F2, canvas, width, height, scope)
            //渲染图片
            setTimeout(function(){
                Taro.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    destWidth: width * F2.Global.pixelRatio,
                    destHeight: height * F2.Global.pixelRatio,
                    canvasId: scope.data.id,
                    success(res) {
                        that.setState({
                            tempPath: res.tempFilePath
                        })
                    },
                    fail(err){
                        that.setState({
                            tempPath: null
                        })
                    }
                }, scope)
            }, 1000)
        }, 1)
    }

    render() {
        const { hasNeedConverCanvasToImge } = this.props
        const leftRpx = hasNeedConverCanvasToImge ? '-1500rpx' : '0rpx'
        const imgLeftRpx = hasNeedConverCanvasToImge ? '0rpx' : '-1500rpx'
        const tempPath = this.state.tempPath
        return (<View className="image-canvans">
                <View className="canvans" style={{left: leftRpx}}>
                    <F2Canvas onCanvasInit={this.drawRadar} ref="f2canvas"></F2Canvas>
                </View>
                <View className="image"  style={{left: imgLeftRpx}}>
                {
                    <image style="width: 100%; height: 100%;" mode="aspectFill" src={tempPath}></image>
                }
                </View>
        </View>)
    }
}

export default Index;