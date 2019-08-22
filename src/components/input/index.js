import Taro from '@tarojs/taro'
import { View, Input, Label, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AtComponent from '../common/component'
import "./index.scss";

function getInputProps(props) {
  const actualProps = {
    type: props.type,
    maxLength: props.maxLength,
    disabled: props.disabled,
    password: false,
  }

  switch (actualProps.type) {
    case 'phone':
      actualProps.type = 'number'
      actualProps.maxLength = 11
      break
    case 'password':
      actualProps.password = true
      break
    default:
      break
  }
  if (!props.disabled && !props.editable) {
    actualProps.disabled = true
  }
  return actualProps
}

export default class MyInput extends AtComponent {
  onInput = event => this.props.onChange(event.target.value, event)

  onFocus = event => this.props.onFocus(event.target.value, event)

  onBlur = event => {
    this.props.onBlur(event.target.value, event)
    // fix # 583 MyInput 不触发 onChange 的问题
    this.props.onChange(event.target.value, event)
  }

  onConfirm = event => this.props.onConfirm(event.target.value, event)

  onClick = () => !this.props.editable && this.props.onClick()

  clearValue = () => this.props.onChange('')

  onErrorClick = () => this.props.onErrorClick()

  render() {
    const {
      className,
      customStyle,
      name,
      cursorSpacing,
      confirmType,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      border,
      title,
      error,
      clear,
      placeholder,
      placeholderStyle,
      placeholderClass,
      autoFocus,
      focus,
      value
    } = this.props
    const {
      type,
      maxLength,
      disabled,
      password,
    } = getInputProps(this.props)

    const rootCls = classNames(
      'my-input',
      {
        'my-input--without-border': !border,
      }, className
    )
    const containerCls = classNames(
      'my-input__container',
      {
        'my-input--error': error,
        'my-input--disabled': disabled
      }
    )
    const overlayCls = classNames(
      'my-input__overlay',
      {
        'my-input__overlay--hidden': !disabled
      }
    )
    const placeholderCls = classNames('placeholder', placeholderClass)

    return <View className={rootCls} style={customStyle}>
      <View className={containerCls}>
        <View className={overlayCls} onClick={this.onClick}></View>
        {title && <Label className='my-input__title' for={name}>{title}</Label>}
        <Input
          className='my-input__input'
          id={name}
          name={name}
          type={type}
          password={password}
          placeholderStyle={placeholderStyle}
          placeholderClass={placeholderCls}
          placeholder={placeholder}
          cursorSpacing={cursorSpacing}
          maxLength={maxLength}
          autoFocus={autoFocus}
          focus={focus}
          value={value}
          confirmType={confirmType}
          cursor={cursor}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          adjustPosition={adjustPosition}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onConfirm={this.onConfirm}
        />
        {clear && value && (
          <View className='my-input__icon' onTouchStart={this.clearValue}>
            <Text className='at-icon at-icon-close-circle my-input__icon-close'></Text>
          </View>
        )}
        {error && (
          <View className='my-input__icon' onTouchStart={this.onErrorClick}>
            <Text className='at-icon at-icon-alert-circle my-input__icon-alert'></Text>
          </View>
        )}
        <View className='my-input__children'>{this.props.children}</View>
      </View>
    </View>
  }
}

MyInput.defaultProps = {
  className: '',
  customStyle: '',
  value: '',
  name: '',
  placeholder: '',
  placeholderStyle: '',
  placeholderClass: '',
  title: '',
  cursorSpacing: 50,
  confirmType: '完成',
  cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  maxLength: 140,
  type: 'text',
  disabled: false,
  border: true,
  editable: true,
  error: false,
  clear: false,
  autoFocus: false,
  focus: false,
  onChange: () => { },
  onFocus: () => { },
  onBlur: () => { },
  onConfirm: () => { },
  onErrorClick: () => { },
  onClick: () => { },
}

MyInput.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  customStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.string,
  placeholderClass: PropTypes.string,
  title: PropTypes.string,
  confirmType: PropTypes.string,
  cursor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  selectionStart: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  selectionEnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  adjustPosition: PropTypes.bool,
  cursorSpacing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  maxLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  editable: PropTypes.bool,
  error: PropTypes.bool,
  clear: PropTypes.bool,
  backgroundColor: PropTypes.string,
  autoFocus: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
  onErrorClick: PropTypes.func,
  onClick: PropTypes.func,
}