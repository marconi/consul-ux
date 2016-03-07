import React, {PropTypes} from 'react'
import Radium from 'radium'

@Radium
class AddNewKey extends React.Component {
  render() {
    return (
      <form style={[styles.addNewKeyForm]}>
        <table>
          <tbody>
            <tr>
              <td style={[styles.td, styles.tdPrefix]}>
                <span style={[styles.addKeyPrefix]}>{this.props.keyPrefix}/</span>
              </td>
              <td style={[styles.td]}>
                <input
                  disabled={this.props.isSubmitting}
                  ref="key"
                  style={[styles.addKeyInputKey]}
                  type="text"
                  placeholder="Key..."
                  value={this.props.newKey}
                  onChange={(e) => this.props.onSetNew(e.target.value, this.refs.value.value)} />
              </td>
            </tr>
            <tr>
              <td style={[styles.td]} colSpan="2">
                <textarea
                  disabled={this.props.isSubmitting}
                  ref="value"
                  style={[styles.addKeyTextarea]}
                  placeholder="Value..."
                  value={this.props.newValue}
                  onChange={(e) => this.props.onSetNew(this.refs.key.value, e.target.value)}></textarea>
              </td>
            </tr>
            <tr>
              <td style={[styles.td]} colSpan="2">
                <button
                  disabled={this.props.isSubmitting}
                  type="button"
                  className="button"
                  onClick={this.props.onSubmit}>
                  {this.props.isSubmitting ? 'Please wait...' : 'Submit'}
                </button>&nbsp;
                <button
                  disabled={this.props.isSubmitting}
                  type="button"
                  className="button button-outline"
                  onClick={this.props.onCancel}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

AddNewKey.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  parentKeyIndex: PropTypes.number.isRequired,
  keyPrefix: PropTypes.string.isRequired,
  newKey: PropTypes.string,
  newValue: PropTypes.string,
  onSetNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const styles = {
  td: {
    padding: '0px',
    border: 'none'
  },
  tdPrefix: {
    width: '20px'
  },
  addNewKeyForm: {
    margin: '20px 0px'
  },
  addKeyPrefix: {
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    padding: '6px 10px',
    fontSize: '16px',
    display: 'inline-block',
    height: '39px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px'
  },
  addKeyInputKey: {
    display: 'inline-block',
    width: '100%',
    margin: '0px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    height: '39px',
    minWidth: '300px'
  },
  addKeyTextarea: {
    margin: '10px 0px 0px 0px',
    minHeight: '100px'
  }
}

export default AddNewKey
