import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import dispath from '@/utils/decorator/dispath'
import page from '@/utils/create-page'
import Pagelayout from '@/components/pagelayout'
import ImageCanvans from '@/components/image-canvans'
import config from './_config'
import './index.scss'
import './_model'

@page(['testmodel'], {initLoading: false})
class Index extends Component {

  constructor(props){
    super(props)
    this.test = this.test.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }
  config = {
    navigationBarTitleText: '测试:首页'
  }

  state = {
    isShowModel: true
  }

  componentWillReceiveProps (nextProps) {}

  componentDidMount(option){}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  @dispath('global/user')
  @dispath('testmodel/dddddddd')
  test(){
    return {
      name: 'test',
      age: 345
    }
  }
  //注解引用dispath
  @dispath('testmodel/usermodel')
  requestTest(){
    return {
      id:'111'
    }
  }
  
  onEffectComplete(arg){}

  handleClose(){
    this.setState({
      isShowModel: false
    })
  }
  handleConfirm(){
    this.setState({
      isShowModel: false
    })
  }

  render () {
    const props = this.props
    const isShowModel = this.state.isShowModel
    const hasNeedConverCanvasToImge = isShowModel || (this.props.global && this.props.global.hasNeedConverCanvasToImge)
    const routeParam = this.$router
    return (
      <Pagelayout {...props} pageShowModel={isShowModel}>
        <View className='index'>
          <Button className='add_btn' onClick={this.test}>+</Button>
          <Button className='dec_btn'>-</Button>
          <Button className='dec_btn'>async</Button>
          <Button className='dec_btn' onClick={this.requestTest.bind(this)}>request测试</Button>
          <View><Text>Hello, World {this.props.global.time}</Text></View>
          <View><Text>Model, Service {this.props.testmodel.testUserlist.name}</Text></View>
          <View><Text>loading {this.props.loading.effects['global/user']}</Text></View>
          <View><Text>国际化 {this.props.global.locales.test.title}</Text></View>
        </View>
        <View className='index'>
          <View style='width:100%;height:400px;'>
            <ImageCanvans onCanvasInit={this.drawRadar.bind(this)} hasNeedConverCanvasToImge={hasNeedConverCanvasToImge}></ImageCanvans>
          </View>
        </View>
        <AtModal
          isOpened={isShowModel}
          title='标题'
          cancelText='取消'
          confirmText='确认'
          onClose={ this.handleClose }
          onCancel={ this.handleClose }
          onConfirm={ this.handleConfirm }
          content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
        />
      </Pagelayout>
    )
  }

  drawRadar(F2, canvas, width, height){
    const data = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 6 },
      { name: '选证择时能力', value: 6 },
      { name: '风险回报能力', value: 8 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      value: {
        min: 0,
        max: 10
      }
    });
    chart.coord('polar');
    chart.axis('value', {
      grid: {
        lineDash: null
      },
      label: null,
      line: null
    });
    chart.axis('name', {
      grid: {
        lineDash: null
      }
    });
    chart.area()
      .position('name*value')
      .color('#FE5C5B')
      .style({
        fillOpacity: 0.2
      })
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.line()
      .position('name*value')
      .color('#FE5C5B')
      .size(1)
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.point().position('name*value').color('#FE5C5B').animate({
      appear: {
        delay: 300
      }
    });
    chart.guide().text({
      position: ['50%', '50%'],
      content: '20',
      style: {
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#FE5C5B'
      }
    });
    chart.render();
  }
}

export default Index
