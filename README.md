# Taiga 微信小程序开发框架 文档

> 看这边文档之前，你需要先熟悉 Taro、react、dva

Taiga是基于Taro框架实现一套属于我们自己业务规范的微信小程序开发框架，主要解决12个方面问题（未来会根据需求，不但的扩展）：

- 页面开发规范
- 封装Canvas与image的自动转换逻辑，避免原生canvas出现遮挡和抖动
- 多元环境的基础配置抽象
- 简化数据状态管理业务实现
- 简化页面与数据状态的代码实现
- 规范异常交互逻辑实现
- 提供灵活的权限交互规范
- 提供业务数据国际化
- 提供主题换肤方案
- 提供通用的用户行为日志采集
- 提供多样化的鉴权交互方案
- 封装登录

## 安装nodejs

首先得有[node](https://nodejs.org/en/)，并确保 node 版本是 10 或以上。（mac 下推荐使用 nvm 来管理 node 版本）


## 安装

可以采用npm或yarn安装， 建议使用yarn或者tyarn

- yarn 安装

```
# 国内源
$ npm i yarn tyarn -g
# 后面文档里的 yarn 换成 tyarn
$ tyarn -v
# 安装@tarojs/cli
$ tyarn global add @tarojs/cli
# 安装依赖
$ tyarn
```

npm 安装

```
# 配置阿里registry
$ npm config set registry=https://registry.npm.taobao.org/
# 安装 taro cli
$ npm install -g @tarojs/cli
# 安装依赖
$ npm install
```



## 页面开发规范

- 通过 npm run create:page [m 或 s[1~4]]:[路径] 创建页面，例如
	
```
# 在主包下创建test/helloword页面
$ npm run create:page m:test/helloword
# 在子包1下创建test/helloword1页面
$ npm run create:page s1:test/helloword1
# 在子包2下创建test/helloword2页面
$ npm run create:page s2:test/helloword2
# 在子包3下创建test/helloword3页面
$ npm run create:page s3:test/helloword3
# 在子包4下创建test/helloword4页面
$ npm run create:page s4:test/helloword4
```
注意不关注是主包还是子包 页面所在目录的名称不能重复

- 页面目录如下(npm run create:page m:test/helloword)

```
  - src
    - pages
      - test
        - helloword
          - _config.js  模块配置页面，例如 request url配置
          - _model.js model定义
          - _service.js service定义
          - index.js  页面定义
          - index.scss //页面样式定义
```

- _service.js 定义 service

生成的文件模板如下：

```
import { Model, Service } from '@/utils/decorator/mode-service'
import config from './_config'

@Service('testUserlist', 'get', 'url1', '')
@Service('testUserlist1', 'post', 'url2', '')
@Service('usermodel', 'post', '/user', '')
@Model('testmodel')
class _Service{}

export default _Service
    
```
@Service注解 是用于给service定义一个函数，并且通过参数指定改方法如何方法服务端业务接口以及如何格式化响应结果, 例如: 
> @Service('usermodel', 'post', '/api/user', 'list')
等价于以下代码

```
import request, {get, post, postForm} from '@/utils/request'
class _Service {
  async static usermodel(data){
  	 const resp = await post('/api/user', data)
     return resp.list
  }
}
```

@Model('testmodel')注解 是用于配置，并且用于基于service的静态方法列表来创建 model配置实例, 他会给Service 注入一个静态方法: __createModel__, ok， 让我们看一下_model.js文件的内容是啥

```
import { createModel } from '@/utils/create-model'
import Service from './_service'
const defModel = Service.__createModel__() //.__createModel__用于生成model定义

//如果你要扩展model，可以采用以下方式
/**
 * defModel.effects.helloword = function * ({ payload, callback }, { select, call, put }){
 *      try{
 *          const resp = yield call(Service.method, payload)
 *          yield put({
 *              type: 'save',
 *              payload:{
 *                  data: resp
 *              }
 *          })
 *          callback && callback(resp, true)
 *      }catch(error){
 *          callback && callback(error, false)
 *      }
 * }
 */

createModel(defModel)
 
```

- index.js 页面规范,详见代码

```
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard, AtIcon } from "taro-ui"
import dispath from '@/utils/decorator/dispath'
import page from '@/utils/create-page'
import Pagelayout from '@/components/pagelayout'
import { Pcontent, Playout, Ppage } from '@/components/themes'
import config from './_config'
import './index.scss'
import './_model'

// @Page([model列表], {自定义熟悉})
//每个页面都会自动注入global和loading,所不需要在model列表中指定
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
      /* 
      	props 来自于 @Page的配置 
        每个页面都必须采用Pagelayout作为根节点
      */
      <Pagelayout {...props} page-layout-class="page-layout-class">
      	/**  主题规范: 页面布局层, 用于维护页面背景图片会背景颜色 **/
        <Ppage p-page-class="p-page">
          /** 主题规范: 内容布局层, 用于维护内容局部背景色或背景图片 **/
          <Playout p-layout-class="p-layout">
            <AtCard title='测试'>
            	/** 主图规范: 内容层 用于维护内容字体大小、颜色 **/
                <Pcontent p-content-class="p-content">
                    内容1
                </Pcontent>
                <Pcontent p-content-class="p-content">
                    内容2 <View className="fa fa-camera-retro"></View>
                </Pcontent>
            </AtCard>
          </Playout>
        </Ppage>
      </Pagelayout>
    )
  }
}

export default Index
```

- 数据转换

  当页面订阅model数据时，经常需要转换数据，以便于简化页面的渲染逻辑，过去我们都是把这部分逻辑卸载view层 或者 model effect中，为了简化model和view层的业务逻辑代码的简单性、可读性、复用性，
  框架抽象出 plugin 的概念，规范及使用方式如下：
  - 定义插件名称
  > [model-namespace]-statefield-transform.js //通过文件名称可以看出该插件是用于转换 某个model下的state属性 
  - 插件实现逻辑代码
  
  ```
        /**
       * 数据转换插件实例，规范: 
       * 插件命名规范: [model.namespace]-[state.field].transform.js
       * 
       * 使用插件
       * 
       * 在_config.js
       * import { usePlugin } from '@/utils/plugin'
       * import namespaceDatafieldTransform from '@/utils/plugins/namespace-datafield-transform'
       * 
       * //注册插件
       * usePlugin('namespace-datafield-transform', namespaceDatafieldTransform)
       * 
       * 页面调用方式:
       * 
       *   import { applyPlugins } from '@/utils/plugin'
       * 
       *   @Page(['', ''], {})
       *   class TestPage extends Taro.component{
       *    
       *      render(){
       *         //调用方式
       *         const data = applyPlugins('namespace-datafield-transform', () => (this.props.test.data) 
       * 
       *          return <CustomerComponent cusProp={data}></CustomerComponent>      
       *     }
       * 
       *   }
       * 
       */
      export default function(data){
          //编写格式化逻辑代码
          return data
      }
  
  ```
  

## 封装Canvas与image的自动转换逻辑，避免原生canvas出现遮挡和抖动

   原生canvas组件层级太高，有时候出现抖动、遮挡浮动层的问题，框架也提供了优化方案：当页面滚动、页面订阅model的列表处于不稳定状态(loading)、页面出现浮动层时，
当前页面的所有canvas都会自动转换成图片，实现方案如下
    - 内置 global.hasNeedConverCanvasToImge状态： 用于标记是否出现页面滚动 以及 页面订阅的model列表是否属于不稳定状态
    - 实现代码
    ```
    import Taro, { Component } from '@tarojs/taro'
    import { View, Button, Text} from '@tarojs/components'
    import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
    import dispath from '@/utils/decorator/dispath'
    import Page from '@/utils/create-page'
    import Pagelayout from '@/components/pagelayout'
    import ImageCanvans from '@/components/image-canvans'
    import config from './_config'
    import './index.scss'
    import './_model'
    @Page(['', ''], {})
    class Index extends Component {
      render(){
        const isShowModel = this.state.isShowModel
        //获取是否需要转换图片
        const hasNeedToImge = (this.props.global && this.props.global.hasNeedConverCanvasToImge)
        return (
          <Pagelayout {...props} pageShowModel={isShowModel}>
            <View style='width:100%;height:400px;'>
            /* 必须需要ImageCanvans组件*/
              <ImageCanvans onCanvasInit={this.drawRadar.bind(this)} hasNeedConverCanvasToImge={hasNeedToImge}></ImageCanvans>
            </View>
          </Pagelayout>
         )
       }
      //绘制图表
      drawRadar(F2, canvas, width, height){}
    }
    ```

## 皮肤和国际化的收集和分发

#### 皮肤收集分发
```
# 收集主包和分包的_var.js皮肤变量文件
$ npm run themes
# 将themes的_var.js文件分发至主包和分包
$ npm run themes dis
```
  
#### 国际化收集分发
```
# 收集主包和分包的_locale.js国际化文件
$ npm run i18n
# 将i18n的config.json文件分发至主包和分包
$ npm run i18n dis
```

## 多元环境的基础配置抽象
- 详见
 
 
 