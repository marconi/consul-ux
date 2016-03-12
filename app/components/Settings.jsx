import React, {PropTypes} from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setSettings, closeSettings} from '../actions'

@Radium
class Settings extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="column column-50 column-offset-25">
          <form style={[styles.form]}>
            <input
              ref="address"
              type="text"
              placeholder="Consul address e.g. http://127.0.0.1:8500/v1"
              value={this.props.address}
              onChange={(e) => this.props.actions.setSettings(e.target.value, this.refs.token.value)} />
            <input
              ref="token"
              type="text"
              placeholder="Token"
              value={this.props.token}
              onChange={(e) => this.props.actions.setSettings(this.refs.address.value, e.target.value)} />

            <button
              type="button"
              className="button"
              onClick={this.props.actions.closeSettings}>Close</button>
          </form>
        </div>
      </div>
    )
  }
}

const styles = {
  form: {
    margin: '20px 0px'
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.settings.address,
    token: state.settings.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setSettings,
      closeSettings
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
