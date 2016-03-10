import axios from 'axios'

// const CONSUL_BASE_URL = 'http://192.168.99.100:8501/v1'
const CONSUL_BASE_URL = 'http://127.0.0.1:8502/v1'
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
export const CLEAR_NEWLY_ADDED_KEY_INDEX = 'CLEAR_NEWLY_ADDED_KEY_INDEX'

export const DELETE_KEY_STARTED = 'DELETE_KEY_STARTED'
export const DELETE_KEY_FINISHED = 'DELETE_KEY_FINISHED'

export const SHOW_UPDATE_KEY_FORM = 'SHOW_UPDATE_KEY_FORM'
export const CANCEL_UPDATE_KEY_FORM = 'CANCEL_UPDATE_KEY_FORM'

// --------------------------------------------------------------------------------

const fetchKeysStarted = {type: FETCH_KEYS_STARTED}
const fetchKeysFinished = (error, data = []) => {
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
          dispatch(fetchKeysFinished(resp.data))
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

const submitNewKeyStarted = {type: SUBMIT_NEW_KEY_STARTED}
const submitNewKeyFinished = (error, parentKeyIndex = null, newKey = null) => {
  return {
    type: SUBMIT_NEW_KEY_FINISHED,
    error: (error) ? `Error: ${error}` : error,
    parentKeyIndex: parentKeyIndex,
    newKey: newKey,
    newlyAddedIndex: (parentKeyIndex) ? parentKeyIndex + 1 : parentKeyIndex
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
          dispatch(submitNewKeyFinished(resp.data))
        }
      })
  }
}
export const clearNewlyAddedKeyIndex = () => ({type: CLEAR_NEWLY_ADDED_KEY_INDEX})

// --------------------------------------------------------------------------------

const deleteKeyStarted = {type: DELETE_KEY_STARTED}
const deleteKeyFinished = (error, key) => {
  return {
    type: DELETE_KEY_FINISHED,
    error: (error) ? `Error: ${error}` : error,
    key: key
  }
}
export const deleteKey = (key) => {
  return (dispatch) => {
    dispatch(deleteKeyStarted)
    return axios.delete(`${CONSUL_BASE_URL}/kv/${key}?token=${CONSUL_TOKEN}&recurse`)
      .then((resp) => {
        dispatch(deleteKeyFinished(null, key))
      })
      .catch((resp) => {
        if (resp instanceof Error) {
          dispatch(deleteKeyFinished(resp.message, key))
        } else {
          dispatch(deleteKeyFinished(resp.data, key))
        }
      })
  }
}

export const showUpdateKeyForm = (index, key, value) => {
  return {
    type: SHOW_UPDATE_KEY_FORM,
    key: key,
    value: value,
    index: index
  }
}
export const cancelUpdateKeyForm = () => ({type: CANCEL_UPDATE_KEY_FORM})
