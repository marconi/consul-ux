import {
  FETCH_KEYS,
  FETCH_KEYS_STARTED,
  FETCH_KEYS_FINISHED,
  SET_KEY_FILTER
} from '../actions'

const initialState = {
  isFetchingKeys: false,
  filter: null,
  keys: []
}

const keys = (state = initialState, action) => {
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

export default keys
