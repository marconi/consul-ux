import {
  SET_SETTINGS,
  CLOSE_SETTINGS,
  SHOW_SETTINGS
} from '../actions'

const initialState = {
  isShown: true,  // no address and token by default so show settings
  address: null,
  token: null
}

const settings = (state = initialState, action) => {
  switch (action.type) {
  case SET_SETTINGS:
    return Object.assign({}, state, {
      address: action.address,
      token: action.token
    })
  case CLOSE_SETTINGS:
    return Object.assign({}, state, {isShown: false})
  case SHOW_SETTINGS:
    return Object.assign({}, state, {isShown: true})
  default:
    return state
  }
}

export default settings
