import {
  FETCH_KEYS,
  FETCH_KEYS_STARTED,
  FETCH_KEYS_FINISHED,
  SET_KEY_FILTER,
  SUBMIT_NEW_KEY_FINISHED,
  DELETE_KEY_STARTED,
  DELETE_KEY_FINISHED
} from '../actions'

const initialState = {
  isFetchingKeys: false,
  fetchError: null,
  isDeleting: false,
  deleteError: null,
  deletedKey: null,
  filter: null,
  keys: []
}

const keys = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_KEYS_STARTED:
    return Object.assign({}, state, {
      isFetchingKeys: true,
      fetchError: null
    })
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
  case DELETE_KEY_STARTED:
    return Object.assign({}, state, {
      isDeleting: true,
      deleteError: null
    })
  case DELETE_KEY_FINISHED:
    const nonDeletedKeys = state.keys.filter((key) => {
      return key.substr(0, action.key.length) !== action.key
    })
    return Object.assign({}, state, {
      isDeleting: false,
      deleteError: action.error,
      keys: nonDeletedKeys,
      deletedKey: action.key
    })
  default:
    return state
  }
}

export default keys
