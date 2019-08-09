const mainpackage = require('./utils/pages')
const subpackage = require('./utils/subpackage')

const pages = mainpackage()
const subpackages = subpackage()

module.exports = {
    env: {
      NODE_ENV: '"development"'
    },
    defineConstants: {
        //子包列表
        SUBPACKAGE_PAGES: subpackages,
        //主包页面列表
        MAIN_PAGES: pages,
        //API请求地址
        BASE_APIURL: 'https://test.hccb.cc',
        //API请求基础路径
        BASE_PATHURL: '/path',
        //静态资源请求基础路径
        BASE_STATICURL: 'https://test.hccb.cc',
        //H5基础请求路径
        BASE_H5URL: 'https://test.hccb.cc'
    },
    weapp: {
      module: {
        postcss: {
          autoprefixer: {
            enable: true
          },
          // 小程序端样式引用本地资源内联配置
          url: {
            enable: true,
            config: {
              limit: 1024000 // 文件大小限制
            }
          }
        }
      }
    },
    h5: {}
  }
  