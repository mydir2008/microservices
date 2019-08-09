import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard } from "taro-ui"
import dispath from '@/utils/decorator/dispath'
import page from '@/utils/create-page'
import Pagelayout from '@/components/pagelayout'
import { Pcontent, Playout, Ppage } from '@/components/themes'
import config from './_config'
import './index.scss'
import './_model'

@page(['testmodel'], {initLoading: false})
class Index extends Component {

  constructor(props){
    super(props)
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
  render () {
    const props = this.props
    return (
      <Pagelayout {...props} page-layout-class="page-layout-class">
        <Ppage p-page-class="p-page">
          <Playout  p-layout-class="p-layout">
            <AtCard title='测试' className="ddddddddd">
                <Pcontent p-content-class="p-content">
                    内容1
                </Pcontent>
                <Pcontent p-content-class="p-content">
                    内容2
                </Pcontent>
            </AtCard>
          </Playout>
        </Ppage>
      </Pagelayout>
    )
  }
}

export default Index
