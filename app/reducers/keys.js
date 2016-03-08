import {
  FETCH_KEYS,
  FETCH_KEYS_STARTED,
  FETCH_KEYS_FINISHED,
  SET_KEY_FILTER,
  SUBMIT_NEW_KEY_FINISHED
} from '../actions'

const initialState = {
  isFetchingKeys: false,
  fetchError: null,
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
      fetchError: action.error,
      keys: action.data
    })
  case SET_KEY_FILTER:
    return Object.assign({}, state, {filter: action.filter})
  case SUBMIT_NEW_KEY_FINISHED:
    const keyExists = state.keys.indexOf(action.newKey) !== -1
    if (!action.error && !keyExists) {
      return Object.assign({}, state, {
        keys: [
          ...state.keys.slice(0, action.parentKeyIndex + 1),
          action.newKey,
          ...state.keys.slice(action.parentKeyIndex + 1)
        ]
      })
    }
  default:
    return state
  }
}

export default keys
