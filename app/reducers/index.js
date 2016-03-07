import {combineReducers} from 'redux'
import {
  FETCH_KEYS,
  FETCH_KEYS_STARTED,
  FETCH_KEYS_FINISHED,
  SET_KEY_FILTER,
  SHOW_ADD_KEY_FORM,
  CANCEL_ADD_KEY_FORM,
  SET_NEW_KEY_VALUE,
  SUBMIT_NEW_KEY_STARTED
} from '../actions'

const initialState = {
  consul: {
    isFetchingKeys: false,
    filter: null,
    keys: []
  },
  addKeyForm: {
    isSubmitting: false,
    parentKeyIndex: null,
    keyPrefix: null,
    newKey: null,
    newValue: null
  }
}

const addKeyForm = (state = initialState.addKeyForm, action) => {
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

const consul = (state = initialState.consul, action) => {
  switch (action.type) {
  case FETCH_KEYS_STARTED:
    return Object.assign({}, state, {isFetchingKeys: true})
  case FETCH_KEYS_FINISHED:
    return Object.assign({}, state, {
      isFetchingKeys: false,
      keys: action.data
    })
  case SET_KEY_FILTER:
    return Object.assign({}, state, {filter: action.filter})
  default:
    return state
  }
}

const rootReducer = combineReducers({addKeyForm, consul})

export default rootReducer
