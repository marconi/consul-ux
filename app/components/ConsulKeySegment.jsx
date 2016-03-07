import React, {PropTypes} from 'react'
import Radium from 'radium'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

@Radium
class ConsulKeySegment extends React.Component {
  render() {
    const tooltipButtons = (
      <span>
        <button
          style={[
            styles.tooltipButton,
            styles.tooltipButtonPlus
          ]}
          onClick={this.props.onAddNewKey}>+</button>
        <button
          style={[
            styles.tooltipButton,
            styles.tooltipButtonMinus
          ]}>-</button>
      </span>
    )

    const link = (
      <a
        href="#"
        style={[
          styles.consulKeySegment,
          (this.props.isFirstSegment ? styles.consulKeySegmentFirst : null),
          (this.props.isLastSegment ? styles.consulKeySegmentLast : null)
        ]}
        onClick={(e) => e.preventDefault()}>{this.props.segment}</a>
    )

    return (
      <span>
        {this.props.canShowMenu ?
          <Tooltip
            placement="top"
            align={{offset: [0, 3]}}
            overlay={tooltipButtons}
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
            {link}
          </Tooltip> : link}
      </span>
    )
  }
}

ConsulKeySegment.propTypes = {
  segment: PropTypes.string.isRequired,
  canShowMenu: PropTypes.bool.isRequired,
  isFirstSegment: PropTypes.bool.isRequired,
  isLastSegment: PropTypes.bool.isRequired,
  onAddNewKey: PropTypes.func.isRequired
}

const styles = {
  consulKeySegment: {
    display: 'inline-block',
    marginRight: '2px',
    padding: '2px 7px',
    backgroundColor: '#606c76',
    textDecoration: 'none',
    color: '#fff',
    ':hover': {
      backgroundColor: '#9B4DCA'
    }
  },
  consulKeySegmentFirst: {
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px'
  },
  consulKeySegmentLast: {
    borderRight: '1px solid #ccc',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px'
  },
  tooltipButton: {
    margin: '0px',
    lineHeight: '5px',
    height: 'auto',
    padding: '10px',
    fontSize: '20px',
    border: '0px'
  },
  tooltipButtonPlus: {
    backgroundColor: '#21BA45',
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  tooltipButtonMinus: {
    backgroundColor: '#CC181E',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px'
  }
}

export default ConsulKeySegment
