import React, {PropTypes} from 'react'
import Radium from 'radium'

@Radium
class UpdateKeyForm extends React.Component {
  componentDidMount() {
    this.refs.value.focus()
  }

  render() {
    return (
      <form style={[styles.form]}>
        <table style={[styles.table]}>
          <tbody>

            {this.props.updateError && 
              <tr>
                <td style={[styles.td]} colSpan="2">
                  <span style={[styles.error]}>{this.props.updateError}</span>
                </td>
              </tr>}

            <tr>
              <td style={[styles.td, styles.tdKey]}>
                <span style={[styles.key]}>{this.props.updateKey}</span>
              </td>
            </tr>

            {!this._isKeyFolder() &&
              <tr>
                <td style={[styles.td]} colSpan="2">
                  <textarea
                    disabled={this.props.isSubmitting}
                    ref="value"
                    style={[styles.valueTextarea]}
                    placeholder="Value..."
                    value={this.props.updateValue}
                    onChange={(e) => this.props.onUpdateValue(e.target.value)}></textarea>
                </td>
              </tr>}

            <tr>
              <td style={[styles.tdActions]} colSpan="2">
                <button
                  disabled={this.props.isSubmitting}
                  type="button"
                  className="button"
                  onClick={() => this.props.onSubmit(this.props.updateKey, this.props.updateValue)}>
                  {this.props.isSubmitting ? 'Please wait...' : 'Update'}
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

  _isKeyFolder() {
    return this.props.updateKey[this.props.updateKey.length - 1] === '/'
  }
}

const styles = {
  error: {
    color: '#CC181E'
  },
  td: {
    padding: '0px',
    border: 'none'
  },
  tdActions: {
    paddingTop: '10px 0px 0px 0px',
    border: 'none'
  },
  tdKey: {
    width: '100%'
  },
  form: {
    margin: '20px 0px 0px 0px'
  },
  table: {
    margin: '0px'
  },
  key: {
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    padding: '6px 10px',
    fontSize: '16px',
    display: 'inline-block',
    height: '39px',
    borderRadius: '4px',
    width: '100%'
  },
  valueTextarea: {
    margin: '10px 0px 0px 0px',
    minHeight: '100px'
  }
}

export default UpdateKeyForm
