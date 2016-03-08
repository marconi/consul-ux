import {
  SHOW_ADD_KEY_FORM,
  CANCEL_ADD_KEY_FORM,
  SET_NEW_KEY_VALUE,
  SUBMIT_NEW_KEY_STARTED
} from '../actions'

const initialState = {
  isSubmitting: false,
  parentKeyIndex: null,
  keyPrefix: null,
  newKey: null,
  newValue: null
}

const addKeyForm = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_KEY_FORM:
      return Object.assign({}, state, {
        parentKeyIndex: action.parentKeyIndex,
        keyPrefix: action.keyPrefix
      })
    case CANCEL_ADD_KEY_FORM:
      return Object.assign({}, state, {
        parentKeyIndex: null,
        keyPrefix: null,
        newKey: null,
        newValue: null
      })
    case SET_NEW_KEY_VALUE:
      return Object.assign({}, state, {
        newKey: action.newKey,
        newValue: action.newValue
      })
    case SUBMIT_NEW_KEY_STARTED:
      return Object.assign({}, state, {isSubmitting: true})
    default:
      return state
  }
}

export default addKeyForm
