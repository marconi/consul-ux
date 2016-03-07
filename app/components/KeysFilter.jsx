import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setKeyFilter} from '../actions'

class KeysFilter extends React.Component {
  render() {
    return (
      <form>
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

const mapStateToProps = (state) => {
  return {
    isFetchingKeys: state.consul.isFetchingKeys,
    filter: state.consul.filter,
  }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({setKeyFilter}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(KeysFilter)
