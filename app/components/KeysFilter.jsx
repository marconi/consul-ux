import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Radium from 'radium'
import {setKeyFilter, showAddKeyForm} from '../actions'

@Radium
class KeysFilter extends React.Component {
  render() {
    return (
      <form style={[styles.form]}>
        <table style={[styles.table]}>
          <tbody>
            <tr>
              <td style={[styles.td]}>
                <input
                  disabled={this.props.isDisabled || this.props.isFetchingKeys}
                  ref="filter"
                  type="text"
                  placeholder="Filter keys..."
                  value={this.props.filter}
                  onChange={() => this.props.actions.setKeyFilter(this.refs.filter.value)} />
              </td>
              <td style={[styles.td, styles.tdAddButton]}>
                <button
                  style={[styles.addButton]}
                  disabled={this.props.isAddButtonShown}
                  type="button"
                  className="button"
                  onClick={() => this.props.actions.showAddKeyForm(null, null)}>+ Add key</button>  
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

KeysFilter.propTypes = {
  isFetchingKeys: PropTypes.bool.isRequired,
  filter: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired
}

const styles = {
  table: {
    margin: '0px'
  },
  td: {
    padding: '0px',
    border: 'none'
  },
  tdAddButton: {
    width: '10px'
  },
  addButton: {
    marginTop: '-5px',
    marginLeft: '10px'
  },
  form: {
    margin: '0px'
  }
}

const mapStateToProps = (state) => {
  return {
    isFetchingKeys: state.keys.isFetchingKeys,
    filter: state.keys.filter,
    isDisabled: state.keys.keys.length === 0,
    isAddButtonShown: state.addKeyForm.isShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setKeyFilter,
      showAddKeyForm
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeysFilter)
