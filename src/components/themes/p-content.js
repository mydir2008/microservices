import Taro, { Component, getCurrentPages } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'
/**
 * 布局规范 -- 内容布局
 * @author 聂维
 * @email stevennie@aliyun.com
 */
class Index extends Component {
    static externalClasses = ['p-content-class']
    render() {
        return (
            <View className="p-content p-content-class">
                {this.props.children}
            </View>
        )
    }
}

export default Index;