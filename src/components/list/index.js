import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AtComponent from '../common/component'
import './index.scss'

export default class MyList extends AtComponent {
  render() {
    const rootClass = classNames(
      'my-list',
      {
        'my-list--no-border': !this.props.hasBorder
      },
      this.props.className
    )

    return <View className={rootClass}>{this.props.children}</View>
  }
}

MyList.defaultProps = {
  hasBorder: true
}

MyList.propTypes = {
  hasBorder: PropTypes.bool
}