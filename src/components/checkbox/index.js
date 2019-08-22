import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AtComponent from '../common/component'
import "./index.scss";

export default class MyCheckbox extends AtComponent {
  handleClick(idx) {
    const { selectedList, options } = this.props
    const option = options[idx]
    const { disabled, value } = option
    if (disabled) return

    const selectedSet = new Set(selectedList)
    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }
    this.props.onChange([...selectedSet])
  }

  render() {
    const {
      customStyle,
      className,
      options,
      selectedList,
    } = this.props

    const rootCls = classNames('my-checkbox', className)

    return <View className={rootCls} style={customStyle}>
      {options.map((option, idx) => {
        const { value, disabled, label, desc } = option
        const optionCls = classNames('my-checkbox__option', {
          'my-checkbox__option--disabled': disabled,
          'my-checkbox__option--selected': selectedList.includes(value)
        })

        return <View className={optionCls} key={value} onClick={this.handleClick.bind(this, idx)} >
          <View className='my-checkbox__option-wrap'>
            <View className='my-checkbox__option-cnt'>
              <View className='my-checkbox__icon-cnt'>
                <Text className='at-icon at-icon-check'></Text>
              </View>
              <View className='my-checkbox__title'>{label}</View>
            </View>
            {desc && <View className='my-checkbox__desc'>{desc}</View>}
          </View>
        </View>
      })}
    </View>
  }
}

MyCheckbox.defaultProps = {
  customStyle: '',
  className: '',
  options: [],
  selectedList: [],
  onChange() { },
}

MyCheckbox.propTypes = {
  customStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  className: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  options: PropTypes.array,
  selectedList: PropTypes.array,
  onChange: PropTypes.func,
}