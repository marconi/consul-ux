import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Radium from 'radium'
import {
  fetchKeys,
  showAddKeyForm,
  cancelAddKeyForm,
  setNewKeyValue,
  submitNewKey
} from '../actions'
import ConsulKey from './ConsulKey'

class ConsulKeys extends React.Component {
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
        {this.props.keys.map((key, i) => {
          if (!hasValidFilter || hasValidFilter && key.indexOf(this.props.filter) !== -1) {
            return <ConsulKey
                    key={i}
                    index={i}
                    consulKey={key}
                    addKeyForm={this.props.addKeyForm}
                    onShowAddKeyForm={this.props.actions.showAddKeyForm}
                    onCancelAddKeyForm={this.props.actions.cancelAddKeyForm}
                    onSetNewKeyValue={this.props.actions.setNewKeyValue}
                    onSubmitNewKey={this.props.actions.submitNewKey} />
          }
        })}

        {this.props.isFetchingKeys &&
          <p>Fetching keys, please wait...</p>}
      </div>
    )
  }

  _isFilterValid(filter) {
    return filter && filter.length >= 3
  }
}

ConsulKeys.propTypes = {
  isFetchingKeys: PropTypes.bool.isRequired,
  filter: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  addKeyForm: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.consul,
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
      submitNewKey
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsulKeys)
