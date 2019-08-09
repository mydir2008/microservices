import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Camera, CoverView} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard, AtIcon } from "taro-ui"
import dispath from '@/utils/decorator/dispath'
import page from '@/utils/create-page'
import Pagelayout from '@/components/pagelayout'
import { Pcontent, Playout, Ppage } from '@/components/themes'
import IdcardCamera from '@/components/idcard-camera'
import config from './_config'
import './index.scss'
import './_model'

@page(['testmodel'], {initLoading: false})
class Index extends Component {

  constructor(props){
    super(props)
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this.state = {
      ctx: Taro.createCameraContext()
    }
  }
  config = {
    navigationBarTitleText: '测试:首页'
  }

  state = {}

  componentWillReceiveProps (nextProps) {}

  componentDidMount(option){}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  error(e) {
    console.log(e.detail)
  }
  success(e){
    console.log(e.tempImagePath)
  }

  render () {
    const props = this.props
    return (
      <Pagelayout {...props} page-layout-class="page-layout-class">
        <Ppage p-page-class="p-page">
          <Playout  p-layout-class="p-layout">
            <Pcontent p-content-class="p-content">
                <IdcardCamera devicePosition="front" success={this.success} error={this.error}></IdcardCamera>
            </Pcontent>
          </Playout>
        </Ppage>
      </Pagelayout>
    )
  }
}

export default Index
