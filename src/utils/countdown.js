/*
倒计时插件
开发者: 聂维
*/
class CountDown {
    constructor(page) {
      this.page = page;
      this.initSeconds = 60;
      this.page.setState({
        captchaTxt:'获取验证码',
        captchaDisabled:false
      })
    }
    start() {
      var that = this;
      var seconds = that.initSeconds;
      that.page.setState({
        captchaDisabled: true,
        captchaTxt: seconds+'秒'
      });
      let promise = new Promise((resolve, reject) => {
        let setTimer = setInterval(() => {
            seconds -= 1;
            that.page.setState({
              captchaTxt: seconds + '秒',
              captchaDisabled: true
            })
            if (seconds <= 0) {
              that.page.setState({
                captchaTxt: '获取验证码',
                captchaDisabled: false
              })
              resolve(setTimer)
            }
          }, 1000)
      })
      promise.then((setTimer) => {
        clearInterval(setTimer)
      })
  
    }
  }
  module.exports = CountDown;