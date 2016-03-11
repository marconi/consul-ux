import {
  CANCEL_UPDATE_KEY_FORM,
  GET_VALUE_STARTED,
  GET_VALUE_FINISHED,
  SHOW_ADD_KEY_FORM,
  UPDATE_VALUE,
  SUBMIT_UPDATED_VALUE_STARTED,
  SUBMIT_UPDATED_VALUE_FINISHED
} from '../actions'

const initialState = {
  isShown: false,
  isGettingValue: false,
  isSubmitting: false,
  getValueError: null,
  updateError: null,
  updateKey: null,
  updateKeyIndex: null,
  updateKeySegmentIndex: null,
  updateValue: null
}

const updateKeyForm = (state = initialState, action) => {
  switch (action.type) {
    case GET_VALUE_STARTED:
      return Object.assign({}, state, {
        isShown: false,
        isGettingValue: true,
        getValueError: null,
        updateKey: action.key,
        updateKeyIndex: action.index,
        updateKeySegmentIndex: action.segmentIndex,
        updateValue: null
      })
    case GET_VALUE_FINISHED:
      return Object.assign({}, state, {
        isShown: true,
        isGettingValue: false,
        getValueError: action.error,
        updateValue: action.value
      })
    case CANCEL_UPDATE_KEY_FORM:
      return Object.assign({}, state, {
        isShown: false,
        isGettingValue: false,
        getValueError: null,
        updateKey: null,
        updateKeyIndex: null,
        updateKeySegmentIndex: null,
        updateValue: null
      })
    case UPDATE_VALUE:
      return Object.assign({}, state, {updateValue: action.value})
    case SUBMIT_UPDATED_VALUE_STARTED:
      return Object.assign({}, state, {isSubmitting: true})
    case SUBMIT_UPDATED_VALUE_FINISHED:
      let updateInfo = {
        isSubmitting: false,
        updateError: action.error,
      }
      if (!action.error) {
        updateInfo = Object.assign(updateInfo, {
          isShown: false,
          updateKey: null,
          updateKeyIndex: null,
          updateKeySegmentIndex: null,
          updateValue: null,
          updateError: null
        })
      }
      return Object.assign({}, state, updateInfo)
    case SHOW_ADD_KEY_FORM:
      return updateKeyForm(state, {type: CANCEL_UPDATE_KEY_FORM})
    default:
      return state
  }
}

export default updateKeyForm
