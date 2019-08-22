import Taro, { Component, getCurrentPages } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'
/**
 * 布局规范 -- 页面层
 * @author 聂维
 * @email stevennie@aliyun.com
 */
class Index extends Component {
    
    static externalClasses = ['p-page-class']

    render() {
        return (
            <View className="p-page p-page-class">
                {this.props.children}
            </View>
        )
    }
}

export default Index;