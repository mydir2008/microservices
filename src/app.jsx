import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/create-app'
import './models'
import Index from './pages/index'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
//import "./assets/fonts/less/font-awesome.scss";
import './config'


const dvaApp = dva.createApp({
  initialState: {}
})
const store = dvaApp.getStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
class App extends Component {
  config = {
    pages: MAIN_PAGES,
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#E2F3FF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    subPackages: SUBPACKAGE_PAGES,
    tabBar: {
      color: '#888888',
      selectedColor: '#5676A1',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
        {
          'pagePath': 'pages/index/index',
          'text': '首页',
          'iconPath': 'assets/images/icon/gjd_index_menu_shouye_moren.png',
          'selectedIconPath': 'assets/images/icon/gjd_index_menu_shouye.png'
        },
        {
          'pagePath': 'pages/mine/index',
          'text': '我的',
          'iconPath': 'assets/images/icon/gjd_index_menu_wode.png',
          'selectedIconPath': 'assets/images/icon/gjd_index_menu_wode_anxia.png'
        }
      ]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
