import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ModalHeader extends Component {
  static propTypes = {
    children: PropTypes.node // eslint-disable-line react/require-default-props
  }
  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    )
  }
}
