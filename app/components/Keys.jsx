import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Radium from 'radium'
import {
  fetchKeys,
  showAddKeyForm,
  cancelAddKeyForm,
  setNewKeyValue,
  submitNewKey,
  clearNewlyAddedKeyIndex,
  deleteKey
} from '../actions'
import Key from './Key'
import AddNewKey from './AddNewKey'

@Radium
class Keys extends React.Component {
  componentDidMount() {
    this.props.actions.fetchKeys()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this._isFilterValid(nextProps.filter)) {
      setTimeout(() => this.forceUpdate(), 500)
      return false
    }
    return true
  }

  render() {
    const hasValidFilter = this._isFilterValid(this.props.filter)
    return (
      <div>
        {this.props.isFetchingKeys &&
          <p>Fetching keys, please wait...</p>}

        {this.props.fetchError &&
          <p style={[styles.error]}>{this.props.fetchError}</p>}

        {this.props.addKeyForm.isShown && this.props.addKeyForm.parentKeyIndex === null &&
          <AddNewKey
            {...this.props.addKeyForm}
            onCancel={this.props.actions.cancelAddKeyForm}
            onSetNew={this.props.actions.setNewKeyValue}
            onSubmit={this.props.actions.submitNewKey} />}

        {this.props.keys.map((key, i) => {
          if (!hasValidFilter || hasValidFilter && key.indexOf(this.props.filter) !== -1) {
            return <Key
                    key={i}
                    index={i}
                    consulKey={key}
                    addKeyForm={this.props.addKeyForm}
                    deletedKey={this.props.deletedKey}
                    onShowAddKeyForm={this.props.actions.showAddKeyForm}
                    onCancelAddKeyForm={this.props.actions.cancelAddKeyForm}
                    onSetNewKeyValue={this.props.actions.setNewKeyValue}
                    onSubmitNewKey={this.props.actions.submitNewKey}
                    clearNewlyAddedKeyIndex={this.props.actions.clearNewlyAddedKeyIndex}
                    onDeleteKey={this.props.actions.deleteKey} />
          }
        })}
      </div>
    )
  }

  _isFilterValid(filter) {
    return filter && filter.length >= 3
  }
}

Keys.propTypes = {
  isFetchingKeys: PropTypes.bool.isRequired,
  filter: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  addKeyForm: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const styles = {
  error: {
    color: '#CC181E'
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.keys,
    addKeyForm: state.addKeyForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fetchKeys,
      showAddKeyForm,
      cancelAddKeyForm,
      setNewKeyValue,
      submitNewKey,
      clearNewlyAddedKeyIndex,
      deleteKey
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keys)
