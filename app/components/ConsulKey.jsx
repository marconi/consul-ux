import React, {PropTypes} from 'react'
import Radium from 'radium'
import ConsulKeySegment from './ConsulKeySegment'
import AddNewKey from './AddNewKey'

@Radium
class ConsulKey extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const hasCanShowMenuChanged = nextProps.addKeyForm.isSubmitting !== this.props.addKeyForm.isSubmitting
    const isMatchingParentKey = nextProps.addKeyForm.parentKeyIndex === this.props.index
    const isMatchingActiveParentKey = this.props.addKeyForm.parentKeyIndex === nextProps.index
    return hasCanShowMenuChanged || (isMatchingParentKey || isMatchingActiveParentKey)
  }

  handleAddNewKey(keyIndex, segmentIndex) {
    let prefix = ''
    if (segmentIndex > 0) {
      prefix = this._getSegments().splice(0, segmentIndex + 1).join('/')
    }
    this.props.onShowAddKeyForm(keyIndex, prefix)
  }

  render() {
    const keySegments = this._getSegments()
    const isShowForm = this.props.addKeyForm.parentKeyIndex === this.props.index
    return (
      <div style={[styles.consulKey]}>
        {keySegments.map((segment, i) => {
          return <ConsulKeySegment
                  key={i}
                  segment={segment}
                  canShowMenu={!this.props.addKeyForm.isSubmitting}
                  isFirstSegment={i === 0}
                  isLastSegment={i === keySegments.length - 1}
                  onAddNewKey={() => this.handleAddNewKey(this.props.index, i)} />
        })}

        {isShowForm &&
          <AddNewKey
            {...this.props.addKeyForm}
            onCancel={this.props.onCancelAddKeyForm}
            onSetNew={this.props.onSetNewKeyValue}
            onSubmit={this.props.onSubmitNewKey} />}
      </div>
    )
  }

  _getSegments() {
    return this.props.consulKey.split('/').filter((segment) => segment.trim() !== '')
  }
}

ConsulKey.propTypes = {
  index: PropTypes.number.isRequired,
  consulKey: PropTypes.string.isRequired,
  addKeyForm: PropTypes.object.isRequired,
  onShowAddKeyForm: PropTypes.func.isRequired,
  onCancelAddKeyForm: PropTypes.func.isRequired,
  onSetNewKeyValue: PropTypes.func.isRequired,
  onSubmitNewKey: PropTypes.func.isRequired
}

const styles = {
  consulKey: {
    marginBottom: '2px',
  }
}

export default ConsulKey
