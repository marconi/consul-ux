import React, {PropTypes} from 'react'
import Radium from 'radium'
import KeySegment from './KeySegment'
import AddNewKey from './AddNewKey'

@Radium
class Key extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.addKeyForm.newlyAddedIndex === this.props.index) {
      this._fadeOutKey()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const hasCanShowMenuChanged = nextProps.addKeyForm.isSubmitting !== this.props.addKeyForm.isSubmitting
    const isMatchingParentKey = nextProps.addKeyForm.parentKeyIndex === this.props.index
    const isMatchingActiveParentKey = this.props.addKeyForm.parentKeyIndex === nextProps.index
    return hasCanShowMenuChanged || (isMatchingParentKey || isMatchingActiveParentKey)
  }

  handleAddNewKey(keyIndex, segmentIndex) {
    let prefix = ''
    if (segmentIndex !== null) {
      prefix = this._getSegments().splice(0, segmentIndex + 1).join('/')
    }
    this.props.onShowAddKeyForm(keyIndex, prefix)
  }

  render() {
    const keySegments = this._getSegments()
    const isShowForm = this.props.addKeyForm.parentKeyIndex === this.props.index
    return (
      <div ref="key" style={[styles.consulKey]}>
        {keySegments.map((segment, i) => {
          return <KeySegment
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

  _fadeOutKey() {
    const fadeEffect = setInterval(() => {
      if (!this.refs.key.style.opacity) {
        this.refs.key.style.opacity = 1
      }
      if (this.refs.key.style.opacity < 0.1) {
        this.refs.key.style.opacity = 1
        clearInterval(fadeEffect)
        this.props.onClearNewlyAddedKey()
      } else {
        this.refs.key.style.opacity -= 0.1
      }
    }, 40)
  }
}

Key.propTypes = {
  index: PropTypes.number.isRequired,
  consulKey: PropTypes.string.isRequired,
  addKeyForm: PropTypes.object.isRequired,
  newlyAddedIndex: PropTypes.number,
  onShowAddKeyForm: PropTypes.func.isRequired,
  onCancelAddKeyForm: PropTypes.func.isRequired,
  onSetNewKeyValue: PropTypes.func.isRequired,
  onSubmitNewKey: PropTypes.func.isRequired,
  onClearNewlyAddedKey: PropTypes.func.isRequired
}

const styles = {
  consulKey: {
    marginBottom: '2px',
  }
}

export default Key
