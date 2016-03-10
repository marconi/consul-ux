import React, {PropTypes} from 'react'
import Radium from 'radium'
import KeySegment from './KeySegment'
import AddKeyForm from './AddKeyForm'
import UpdateKeyForm from './UpdateKeyForm'

@Radium
class Key extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowAddForm: false,
      isShowUpdateForm: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addKeyForm.newlyAddedIndex === this.props.index) {
      this._fadeOutKey()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isParentKeyDeleted = nextProps.deletedKey && this.props.consulKey.substr(0, nextProps.deletedKey.length) === nextProps.deletedKey
    const canShowPopupMenu = nextProps.addKeyForm.isSubmitting !== this.props.addKeyForm.isSubmitting
    const isMatchingParentKey = nextProps.addKeyForm.parentKeyIndex === this.props.index
    const isMatchingActiveParentKey = this.props.addKeyForm.parentKeyIndex === nextProps.index
    const toggleUpdateForm = this._isShowUpdateForm(nextProps) || !this._isShowUpdateForm(nextProps) && this.state.isShowUpdateForm
    return toggleUpdateForm || isParentKeyDeleted || canShowPopupMenu || (isMatchingParentKey || isMatchingActiveParentKey)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowUpdateForm: this._isShowUpdateForm(nextProps),
      isShowAddForm: this._isShowAddForm(nextProps)
    })
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
    return (
      <div ref="key" style={[styles.consulKey]}>
        {keySegments.map((segment, i) => {
          const fullKey = keySegments.slice(0, i + 1).join('/')
          return <KeySegment
                  key={i}
                  segment={segment}
                  canShowMenu={!this.props.addKeyForm.isSubmitting}
                  isFirstSegment={i === 0}
                  isLastSegment={i === keySegments.length - 1}
                  onAddNewKey={() => this.handleAddNewKey(this.props.index, i)}
                  onDeleteKey={() => this.props.onDeleteKey(fullKey)}
                  onUpdateKey={() => this.props.onShowUpdateKeyForm(this.props.index, this.props.consulKey, this.props.consulValue)} />
        })}

        {this.state.isShowAddForm &&
          <AddKeyForm
            {...this.props.addKeyForm}
            onCancel={this.props.onCancelAddKeyForm}
            onSetNew={this.props.onSetNewKeyValue}
            onSubmit={this.props.onSubmitNewKey} />}

        {this.state.isShowUpdateForm &&
          <UpdateKeyForm
            {...this.props.updateKeyForm}
            onCancel={this.props.onCancelUpdateKeyForm}
            onUpdateValue={this.props.onUpdateValue}
            onSubmit={this.props.onSubmitUpdate} />}
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
        this.props.clearNewlyAddedKeyIndex()
      } else {
        this.refs.key.style.opacity -= 0.1
      }
    }, 40)
  }

  _isShowAddForm(props) {
    return props.addKeyForm.isShown && props.addKeyForm.parentKeyIndex === this.props.index
  }

  _isShowUpdateForm(props) {
    return props.updateKeyForm.isShown && props.updateKeyForm.updateKeyIndex === this.props.index 
  }
}

Key.propTypes = {
  index: PropTypes.number.isRequired,
  consulKey: PropTypes.string.isRequired,
  consulValue: PropTypes.string,
  addKeyForm: PropTypes.object.isRequired,
  newlyAddedIndex: PropTypes.number,
  onShowAddKeyForm: PropTypes.func.isRequired,
  onCancelAddKeyForm: PropTypes.func.isRequired,
  onSetNewKeyValue: PropTypes.func.isRequired,
  onSubmitNewKey: PropTypes.func.isRequired,
  clearNewlyAddedKeyIndex: PropTypes.func.isRequired,
  onDeleteKey: PropTypes.func.isRequired,
  onShowUpdateKeyForm: PropTypes.func.isRequired
}

const styles = {
  consulKey: {
    marginBottom: '2px',
  }
}

export default Key
