import React, { Component } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import BaseButton from 'instructure-ui/lib/components/Button'

export default class Button extends Component {
  static propTypes = {
    theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types, react/require-default-props
    variant: PropTypes.string
  }

  static defaultProps = {
    variant: 'icon'
  }

  focus () {
    this._button.focus()
  }

  render () {
    const color = '#008ee2'
    const theme = {
      iconColor: color,
      iconFocusBoxShadow: `inset 0 0 0 1px ${color}`,
      iconHoverColor: color
    }
    return (
      <BaseButton ref={(c) => { this._button = c }} variant={this.props.variant} theme={theme} {...this.props} />
    )
  }
}
