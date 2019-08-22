import Taro, { Component, getCurrentPages } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'
/**
 * 布局规范 -- 布局层
 * @author 聂维
 * @email stevennie@aliyun.com
 */
class Index extends Component {
    
    static externalClasses = ['p-layout-class']
    
    render() {
        return (
            <View className="p-layout p-layout-class">
                {this.props.children}
            </View>
        )
    }
}

export default Index;