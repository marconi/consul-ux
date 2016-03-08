import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Radium from 'radium'
import {setKeyFilter} from '../actions'

@Radium
class KeysFilter extends React.Component {
  render() {
    return (
      <form style={[styles.form]}>
        <input
          disabled={this.props.isFetchingKeys}
          ref="filter"
          type="text"
          placeholder="Filter keys..."
          value={this.props.filter}
          onChange={() => this.props.actions.setKeyFilter(this.refs.filter.value)} />
      </form>
    )
  }
}

KeysFilter.propTypes = {
  isFetchingKeys: PropTypes.bool.isRequired,
  filter: PropTypes.string
}

const styles = {
  form: {
    margin: '0px'
  }
}

const mapStateToProps = (state) => {
  return {
    isFetchingKeys: state.keys.isFetchingKeys,
    filter: state.keys.filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({setKeyFilter}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeysFilter)
