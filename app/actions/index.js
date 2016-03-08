import axios from 'axios'

// const CONSUL_BASE_URL = 'http://192.168.99.100:8501/v1'
const CONSUL_BASE_URL = 'http://127.0.0.1:8500/v1'
const CONSUL_TOKEN = 'admin'

export const FETCH_KEYS = 'FETCH_KEYS'
export const FETCH_KEYS_STARTED = 'FETCH_KEYS_STARTED'
export const FETCH_KEYS_FINISHED = 'FETCH_KEYS_FINISHED'
export const SET_KEY_FILTER = 'SET_KEY_FILTER'

export const SHOW_ADD_KEY_FORM = 'SHOW_ADD_KEY_FORM'
export const CANCEL_ADD_KEY_FORM = 'CANCEL_ADD_KEY_FORM'
export const SET_NEW_KEY_VALUE = 'SET_NEW_KEY_VALUE'

export const SUBMIT_NEW_KEY = 'SUBMIT_NEW_KEY'
export const SUBMIT_NEW_KEY_STARTED = 'SUBMIT_NEW_KEY_STARTED'
export const SUBMIT_NEW_KEY_FINISHED = 'SUBMIT_NEW_KEY_FINISHED'
export const CLEAR_NEWLY_ADDED_KEY = 'CLEAR_NEWLY_ADDED_KEY'

// --------------------------------------------------------------------------------

export const fetchKeysStarted = {type: FETCH_KEYS_STARTED}
export const fetchKeysFinished = (error, data = []) => {
  return {
    type: FETCH_KEYS_FINISHED,
    error: (error) ? `Error: ${error}` : error,
    data: data
  }
}
export const fetchKeys = () => {
  return (dispatch) => {
    dispatch(fetchKeysStarted)
    return axios.get(`${CONSUL_BASE_URL}/kv/?token=${CONSUL_TOKEN}&keys`)
      .then((resp) => {
        dispatch(fetchKeysFinished(null, resp.data))
      })
      .catch((resp) => {
        if (resp instanceof Error) {
          dispatch(fetchKeysFinished(resp.message))
        } else {
          dispatch(fetchKeysFinished(resp.data, resp.message))
        }
      })
  }
}
export const setKeyFilter = (filter) => ({type: SET_KEY_FILTER, filter: filter})

// --------------------------------------------------------------------------------

export const showAddKeyForm = (parentKeyIndex, keyPrefix) => {
  return {
    type: SHOW_ADD_KEY_FORM,
    parentKeyIndex: parentKeyIndex,
    keyPrefix: keyPrefix
  }
}
export const cancelAddKeyForm = () => ({type: CANCEL_ADD_KEY_FORM})
export const setNewKeyValue = (newKey, newValue) => {
  return {
    type: SET_NEW_KEY_VALUE,
    newKey: newKey,
    newValue: newValue
  }
}

export const submitNewKeyStarted = {type: SUBMIT_NEW_KEY_STARTED}
export const submitNewKeyFinished = (error, parentKeyIndex = null, newKey = null) => {
  return {
    type: SUBMIT_NEW_KEY_FINISHED,
    error: error,
    parentKeyIndex: parentKeyIndex,
    newKey: newKey,
    newlyAddedIndex: parentKeyIndex + 1
  }
}
export const submitNewKey = (parentKeyIndex, newKey, newValue) => {
  return (dispatch) => {
    dispatch(submitNewKeyStarted)
    return axios.put(`${CONSUL_BASE_URL}/kv/${newKey}?token=${CONSUL_TOKEN}`, newValue)
      .then((resp) => {
        dispatch(submitNewKeyFinished(null, parentKeyIndex, newKey))
      })
      .catch((resp) => {
        if (resp instanceof Error) {
          dispatch(submitNewKeyFinished(resp.message))
        } else {
          dispatch(submitNewKeyFinished(resp.data, resp.message))
        }
      })
  }
}
export const clearNewlyAddedKey = () => ({type: CLEAR_NEWLY_ADDED_KEY})
