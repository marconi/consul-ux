import {
  SHOW_UPDATE_KEY_FORM,
  CANCEL_UPDATE_KEY_FORM
} from '../actions'

const initialState = {
  isShown: false,
  updateKey: null,
  updateKeyIndex: null,
  updateValue: null
}

const updateKeyForm = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_UPDATE_KEY_FORM:
      return Object.assign({}, state, {
        isShown: true,
        updateKey: action.key,
        updateKeyIndex: action.index,
        updateValue: action.value
      })
    case CANCEL_UPDATE_KEY_FORM:
      return Object.assign({}, state, {
        isShown: false,
        updateKey: null,
        updateKeyIndex: null,
        updateValue: null
      }) 
    default:
      return state
  }
}

export default updateKeyForm
