import { usePlugin, applyPlugins } from './plugin'

describe('测试Plugin', function () {
     it('验证插件注入是否正常', function () {
        const fn = data => ({name: 123})
        usePlugin('test-use-plugin', fn)
        expect(applyPlugins('test-use-plugin', fn)).toMatchObject({name: 123})
     });

    it('测试插件：格式化数据', function () {
        const sourceData = {
            name: 'xiufu.wang',
            age: '34'
        }
        const transformPlugin = function(data){
            return {
                _name: 'xiufu.wang',
                _age: '34'
            }
        }
        //注册插件
        usePlugin('test-transform-plugin', transformPlugin)
        const targetDaat = applyPlugins('test-transform-plugin', function(){
            return sourceData
        })
        expect(targetDaat).toMatchObject({
            _name: 'xiufu.wang',
            _age: '34'
        })
     });
});