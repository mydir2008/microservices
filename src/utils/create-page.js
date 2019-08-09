import Taro, {Component} from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components';

/**
 * 定义Page高阶组件，简化page页面开发时的const、pagelayout的引入
 */
export default function Page ( models, defProps = {} ){
    const mapStateToProps = function(all){
        const _models = models || []
        if (_models.indexOf('loading') === -1){
            _models.push('loading')
        }
        const p = {}
        _models.forEach(e => {
            p[e] = all[e]
        });
        //自动注入global 、loading
        p.global = all.global
        p.loading = all.loading
        return p
    }
    
    return function pageComponent(Component){
        const ConnectComponent = connect(mapStateToProps)(Component)
        return class extends ConnectComponent{
            constructor(props){ 
                const privateModels = models.filter(r => (r !== 'global' && r !== 'loading'))
                super(Object.assign({__needModel__: privateModels}, props, defProps))
            }
        
            onPageScroll(e){
                const dispatch = this.props.dispatch
                const prePos = this.page_croll_prepos || 0
                const pos = e.scrollTop

                if (Math.abs(pos - prePos) < 50){
                    return
                }

                //更新global.state.pageScroll的状态
                if (!this.cance_page_croll_timer){
                    dispatch({
                        type: 'global/save',
                        payload: {
                            pageScroll: true
                        }
                    })
                }
                
                if (this.cance_page_croll_timer){
                    clearTimeout(this.cance_page_croll_timer)
                    this.cance_page_croll_timer = null
                }
                
                this.cance_page_croll_timer = setTimeout(() => {
                    this.cance_page_croll_timer = null
                    console.log('更新pageScroll=false');
                    dispatch({
                        type: 'global/save',
                        payload: {
                            pageScroll: false
                        }
                    })
                }, 600)
            }
        }
    }
}

