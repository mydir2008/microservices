import Taro, { Component, getCurrentPages } from '@tarojs/taro';
import { View, Camera, CoverImage,CoverView } from '@tarojs/components';
import {F2Canvas} from 'taro-f2'
import F2 from '@antv/f2'
import f2fix from './canvass-fixf2'
import { AtToast } from "taro-ui"
import '@antv/f2/lib/plugin/legend'
import './index.scss'
import front from './front.png'
import back from './back.png'
import persion from './persion.png'
import takephoto from './takephoto.png'

/**
 * 身份证Orc识别组件
 * ......有待扩展
 * @author 聂维
 */
class Index extends Component {

    constructor(props){
        super(props)
        this.state = {
            ctx: Taro.createCameraContext()
        }
        this.onTakPhoto = this.onTakPhoto
    }

    static defaultProps = {
        // front (正面) or back(反面) or persion(采集头像)
        devicePosition: 'front',
        width: 350,
        height: 700
    }
    state = {}
    componentDidUpdate(){}
    componentWillMount() {}
    
    /**
     * 间隔1S取采集一次 照片
     */
    componentDidMount() {
        const { success, error,  } = this.props
        const ctx = this.state.ctx
        this.timer = setTimeout(() => {
            ctx.takePhoto({
                success: success,
                fail: error
            }, 1000)
        })
    }
    
    componentWillUnmount(){
        if (this.timer){
            clearTimeout(this.timer)
        }
    }

    render() {
        const { devicePosition, width, height } = this.props
        const img = devicePosition === 'back' ? back : (devicePosition === 'front' ? front : persion) 
        const showBtn = devicePosition === 'persion'
        return (
        <Camera 
            className="idcard-camera"
            device-position="back"
            flash="off"
            style={{width: width, height: height}}
        >
            <CoverImage src={img} mode="aspectFill" style={{width: width, height: height}}></CoverImage>
            {
                showBtn && <CoverView className="take-photo"><CoverImage src={takephoto} className="take-photo__image"></CoverImage></CoverView>
            }
        </Camera>)
    }
}

export default Index;