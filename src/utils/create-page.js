import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components';

/**
 * 定义Page高阶组件，简化page页面开发时的const、pagelayout的引入
 */
export default function Page(models, defProps = {}) {
    const mapStateToProps = function (all) {
        const _models = models || []
        if (_models.indexOf('loading') === -1) {
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

    return function pageComponent(Component) {
        const ConnectComponent = connect(mapStateToProps)(Component)
        return class extends ConnectComponent {
            constructor(props) {
                const privateModels = models.filter(r => (r !== 'global' && r !== 'loading'))
                super(Object.assign({ __needModel__: privateModels }, props, defProps))
            }

            /**
             * 判断当前页面订阅的model是否存在loading=true的状态
             * @param {*} silent Array,可以指定忽略Effects, [nameSpace, nameSpace/effectName]
             * @param {*} ingorInitLoading boolean,是否要忽略初始化状态 
             * @returns 0 初始化loading 1 正常交互loading
             */
            hasLoading(silents, ingorInitLoading) {
                const loading = this.props.loading || { effects: {} }
                const r = Object.keys(loading.effects)
                const _allModels = models || []
                const _silents = silents || []
                let cdack = null
                for (let i = 0; i < r.length; i++) {
                    const o = r[i];
                    const nameSpace = r[i].split('\/')[0];
                    const h = _silents.filter(s => (o === s || o.indexOf('s') !== -1));
                    if (h.length === 0 && loading.effects[o] === true && _allModels.indexOf(nameSpace) !== -1) {
                        cdack = !ingorInitLoading && this.initLoaded !== true ? 2 : 1
                    }
                }
                return cdack
            }

            onEffectComplete(args, method) {
                if ('componentDidMount' === method) {
                    this.initLoaded = true
                }
                super.onEffectComplete(args, method)
            }

            onPageScroll(e) {
                const dispatch = this.props.dispatch
                const prePos = this.page_croll_prepos || 0
                const pos = e.scrollTop

                if (Math.abs(pos - prePos) < 50) {
                    return
                }

                //更新global.state.pageScroll的状态
                if (!this.cance_page_croll_timer) {
                    dispatch({
                        type: 'global/save',
                        payload: {
                            pageScroll: true
                        }
                    })
                }

                if (this.cance_page_croll_timer) {
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

