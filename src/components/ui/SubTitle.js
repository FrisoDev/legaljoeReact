import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SubTitle extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    level: PropTypes.number,
    className: PropTypes.string,
  }


  render() {
    return(
      <h2 style={this.props.style} className={ this.props.className }>
        { this.props.content }
      </h2>
    )
  }
}

export default SubTitle
