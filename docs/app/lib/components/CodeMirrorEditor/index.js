// based on https://raw.githubusercontent.com/JedWatson/react-codemirror/master/src/Codemirror.js
import CodeMirror from 'codemirror' // eslint-disable-line import/no-extraneous-dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'codemirror/lib/codemirror.css' // eslint-disable-line import/no-extraneous-dependencies
import 'codemirror/mode/jsx/jsx' // eslint-disable-line import/no-extraneous-dependencies

import styles from './styles.css'

export default class CodeMirrorEditor extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    onChange: PropTypes.func,
    onFocusChange: PropTypes.func,
    options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    path: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.oneOf(['playground', 'standalone'])
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    onChange: function () {},
    onFocusChange: function () {},
    style: 'standalone'
  };

  constructor (props) {
    super()
    this.state = {
      isFocused: false
    }
  }

  componentDidMount () {
    const textareaNode = this._textareaNode
    this.codeMirror = CodeMirror.fromTextArea(textareaNode, this.props.options)
    this.codeMirror.on('change', this.handleValueChanged)
    this.codeMirror.on('focus', this.handleFocusChanged.bind(this, true))
    this.codeMirror.on('blur', this.handleFocusChanged.bind(this, false))
    this._currentCodemirrorValue = this.props.value
    this.codeMirror.setValue(this.props.value)
  }

  componentWillUnmount () {
    // TODO: is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value)
    }
    if (typeof nextProps.options === 'object') {
      for (const optionName in nextProps.options) { // eslint-disable-line no-restricted-syntax
        // eslint-disable-next-line no-prototype-builtins
        if (nextProps.options.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, nextProps.options[optionName])
        }
      }
    }
  }

  getCodeMirror () {
    return this.codeMirror
  }

  focus () {
    if (this.codeMirror) {
      this.codeMirror.focus()
    }
  }

  handleFocusChanged (focused) {
    this.setState({
      isFocused: focused
    })
    this.props.onFocusChange && this.props.onFocusChange(focused)
  }

  handleValueChanged = (doc, change) => {
    const newValue = doc.getValue()
    this._currentCodemirrorValue = newValue
    this.props.onChange && this.props.onChange(newValue)
  };

  render () {
    const classes = {
      [styles.root]:           true,
      [styles[this.props.style]]: true,
      [styles['is-focused']]:  this.state.isFocused
    }

    return (
      <div className={classnames(classes)}>
        <textarea
          ref={(c) => { this._textareaNode = c }}
          name={this.props.path}
          defaultValue={''}
          autoComplete="off"
        />
      </div>
    )
  }
}
