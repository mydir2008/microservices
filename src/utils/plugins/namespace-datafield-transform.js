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
 * @author 聂维
 * @email stevennie@aliyun.com
 */
export default function(data){
    //编写格式化逻辑代码
    return data
}