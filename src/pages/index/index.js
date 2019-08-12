import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import dispath from '@/utils/decorator/dispath'
import page from '@/utils/create-page'
import Pagelayout from '@/components/pagelayout'
import { Pcontent, Playout, Ppage } from '@/components/themes'
import config from './_config'
import _locale from './_locale'
import './index.scss'
import './_model'

//定义的page高阶组价参数
@page(['index_model'], {initLoading: false})
class Index_index extends Component {

  constructor(props){
    super(props)
    //函数scope绑定
    //this.test = this.test.bind(this)

    //绑定国际化
    this._locale = _locale
  }

  config = {
    navigationBarTitleText: '首页'
  }
  
  //@dispath('index_index/user')
  //@dispath('index_index/user1')
  //@dispath('index_index/user2')
  componentDidMount(option){

    //在这里初始化数据
    //return {
    //    user:{},
    //    user1:{},
    //    user2:{}
    //}
  }

  componentWillUnmount () {

     //在这里销毁资源

  }

  onShareAppMessage (res) {
    //if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    //}
    //return {
      //title: '自定义转发标题',
      //path: '/page/user?id=123'
    //}
  }

  //@dispath('index_index/user')
  test(){
    return {
      name: 'test',
      age: 345
    }
  }
  
  onEffectComplete(arg){
    
    //处理所有dispatch callback结果
    
  }

  render () {
    const props = this.props
    //获取路由参数
    ///const routeParam = this.$router
    return (
      <Pagelayout {...props} page-layout-class="page-layout-class">
        <Ppage p-page-class="p-page">
          <Playout  p-layout-class="p-layout">
            <AtCard note='小Tips'>
                <Pcontent p-content-class="p-content">
                  <View>初始页面</View>
                </Pcontent>
            </AtCard>
          </Playout>
        </Ppage>
      </Pagelayout>
    )
  }
}

export default Index_index
