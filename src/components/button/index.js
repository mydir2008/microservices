import Taro from '@tarojs/taro'
import { View, Button, Form } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { AtLoading } from 'taro-ui'
import AtComponent from '../common/component'
import "./index.scss";

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small',
}

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
}
const myBtnStyle = {
  backgroundImage: 'linear-gradient(-180deg, #C2E0FA 0%, #7EA9D5 100%)',
  borderRadius: '0',
  border: 'none',
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  color: '#fff'
}
export default class MyButton extends AtComponent {
  constructor() {
    super(...arguments)
    this.state = {
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
    }
  }

  onClick() {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(...arguments)
    }
  }

  onGetUserInfo() {
    this.props.onGetUserInfo && this.props.onGetUserInfo(...arguments)
  }

  onContact() {
    this.props.onContact && this.props.onContact(...arguments)
  }

  onGetPhoneNumber() {
    this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(...arguments)
  }

  onError() {
    this.props.onError && this.props.onError(...arguments)
  }

  onOpenSetting() {
    this.props.onOpenSetting && this.props.onOpenSetting(...arguments)
  }

  onSumit() {
    if (this.state.isWEAPP) {
      this.$scope.triggerEvent('submit', arguments[0].detail, {
        bubbles: true,
        composed: true,
      })
    }
  }

  onReset() {
    if (this.state.isWEAPP) {
      this.$scope.triggerEvent('reset', arguments[0].detail, {
        bubbles: true,
        composed: true,
      })
    }
  }

  render() {
    const {
      size = 'normal',
      type = '',
      circle,
      full,
      loading,
      disabled,
      customStyle,
      formType,
      openType,
      lang,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      showMessageCard,
      appParameter,
      isFixedBottom,
      isIpx,
    } = this.props
    const {
      isWEAPP,
      isALIPAY,
    } = this.state
    const rootClassName = ['my-button']
    const classObject = {
      [`my-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
      'my-button--disabled': disabled,
      [`my-button--${type}`]: TYPE_CLASS[type],
      'my-button--circle': circle,
      'my-button--full': full,
      'my-button--isIpx': isIpx && isFixedBottom
    }
    const loadingColor = type === 'primary' ? '#fff' : ''
    const loadingSize = size === 'small' ? '30' : 0
    let component
    if (loading) {
      component = <View className='my-button__icon'><AtLoading color={loadingColor} size={loadingSize} /></View>
      rootClassName.push('my-button--icon')
    }
    const button = <Button className='my-button__wxbutton'
      formType={formType}
      openType={openType}
      lang={lang}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      showMessageCard={showMessageCard}
      appParameter={appParameter}
      onGetUserInfo={this.onGetUserInfo.bind(this)}
      onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
      onOpenSetting={this.onOpenSetting.bind(this)}
      onError={this.onError.bind(this)}
      onContact={this.onContact.bind(this)}
    >
    </Button>
    return (
      <View>
        <View
          className={classNames(rootClassName, classObject, this.props.className)}
          style={isFixedBottom ? { ...myBtnStyle, ...customStyle } : customStyle}
          onClick={this.onClick.bind(this)}
        >
          {isWEAPP && !disabled && <Form reportSubmit onSubmit={this.onSumit.bind(this)} onReset={this.onReset.bind(this)}>{button}</Form>}
          {isALIPAY && !disabled && button}
          {component}<View className='my-button__text'>{this.props.children}</View>

        </View>
        {
          isFixedBottom && isIpx && <View className='ipx-overlay' />
        }
      </View>
    )
  }
}

MyButton.defaultProps = {
  size: 'normal',
  type: '',
  circle: false,
  full: false,
  loading: false,
  disabled: false,
  isFixedBottom: false,
  isIpx: false,
  customStyle: {},
  onClick: () => { },
  // Button props
  formType: '',
  openType: '',
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  appParameter: '',
  onGetUserInfo: () => { },
  onContact: () => { },
  onGetPhoneNumber: () => { },
  onError: () => { },
  onOpenSetting: () => { },
}

MyButton.propTypes = {
  size: PropTypes.oneOf(['normal', 'small']),
  type: PropTypes.oneOf(['primary', 'secondary', '']),
  circle: PropTypes.bool,
  full: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  formType: PropTypes.oneOf(['submit', 'reset', '']),
  openType: PropTypes.oneOf(['contact', 'share', 'getUserInfo', 'getPhoneNumber', 'launchApp', 'openSetting', 'feedback', 'getRealnameAuthInfo', '']),
  lang: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  showMessageCard: PropTypes.bool,
  appParameter: PropTypes.string,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func,
}