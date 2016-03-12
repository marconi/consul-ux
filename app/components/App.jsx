import React from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import KeysFilter from './KeysFilter'
import Keys from './Keys'
import Settings from './Settings'
import {showSettings} from '../actions'

@Radium
class App extends React.Component {
  render() {
    let settingsLink = null
    if (!this.props.isShowSettings) {
      settingsLink = <a href="#" onClick={this.props.actions.showSettings}>[ settings ]</a>
    }

    return (
      <div>
        <h5 style={[styles.title]}>Consul-UX {settingsLink}</h5>
        {!this.props.isShowSettings ?
          [<KeysFilter key={0} />, <Keys key={1} />] : <Settings />}
      </div>
    )
  }
}

const styles = {
  title: {
    textAlign: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    isShowSettings: state.settings.isShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      showSettings
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
