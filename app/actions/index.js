import axios from 'axios'

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

export const CANCEL_UPDATE_KEY_FORM = 'CANCEL_UPDATE_KEY_FORM'
export const GET_VALUE_STARTED = 'GET_VALUE_STARTED'
export const GET_VALUE_FINISHED = 'GET_VALUE_FINISHED'
export const UPDATE_VALUE = 'UPDATE_VALUE'

export const SUBMIT_UPDATED_VALUE = 'SUBMIT_UPDATED_VALUE'
export const SUBMIT_UPDATED_VALUE_STARTED = 'SUBMIT_UPDATED_VALUE_STARTED'
export const SUBMIT_UPDATED_VALUE_FINISHED = 'SUBMIT_UPDATED_VALUE_FINISHED'

export const SET_SETTINGS = 'SET_SETTINGS'
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS'
export const SHOW_SETTINGS = 'SHOW_SETTINGS'

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
  return (dispatch, getState) => {
    const {address, token} = getState().settings

    dispatch(fetchKeysStarted)
    return axios.get(`${address}/kv/?token=${token}&keys`)
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
    newlyAddedIndex: (parentKeyIndex !== null) ? parentKeyIndex + 1 : parentKeyIndex
  }
}
export const submitNewKey = (parentKeyIndex, newKey, newValue) => {
  return (dispatch, getState) => {
    const {address, token} = getState().settings

    dispatch(submitNewKeyStarted)
    return axios.put(`${address}/kv/${newKey}?token=${token}`, newValue)
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
  return (dispatch, getState) => {
    const {address, token} = getState().settings

    dispatch(deleteKeyStarted)
    return axios.delete(`${address}/kv/${key}?token=${token}&recurse`)
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

// --------------------------------------------------------------------------------

const getValueStarted = (index, key, segmentIndex) => {
  return {
    type: GET_VALUE_STARTED,
    index: index,
    key: key,
    segmentIndex: segmentIndex
  }
}
const getValueFinished = (error, value = null) => {
  return {
    type: GET_VALUE_FINISHED,
    error: (error) ? `Error: ${error}` : error,
    value: value
  }
}
export const showUpdateKeyForm = (index, key, segmentIndex) => {
  return (dispatch, getState) => {
    const {address, token} = getState().settings

    dispatch(getValueStarted(index, key, segmentIndex))
    return axios.get(`${address}/kv/${key}?token=${token}&raw`)
      .then((resp) => {
        dispatch(getValueFinished(null, resp.data))
      })
      .catch((resp) => {
        if (resp instanceof Error) {
          dispatch(getValueFinished(resp.message))
        } else {
          dispatch(getValueFinished(resp.data))
        }
      })
  }
}
export const updateValue = (value) => ({type: UPDATE_VALUE, value: value})
export const cancelUpdateKeyForm = () => ({type: CANCEL_UPDATE_KEY_FORM})

const submitUpdatedValueStarted = {type: SUBMIT_UPDATED_VALUE_STARTED}
const submitUpdatedValueFinished = (error) => {
  return {
    type: SUBMIT_UPDATED_VALUE_FINISHED,
    error: (error) ? `Error: ${error}` : error
  }
}
export const submitUpdatedValue = (key, value) => {
  return (dispatch, getState) => {
    const {address, token} = getState().settings

    dispatch(submitUpdatedValueStarted)
    return axios.put(`${address}/kv/${key}?token=${token}`, value)
      .then((resp) => {
        dispatch(submitUpdatedValueFinished(null))
      })
      .catch((resp) => {
        if (resp instanceof Error) {
          dispatch(submitUpdatedValueFinished(resp.message))
        } else {
          dispatch(submitUpdatedValueFinished(resp.data))
        }
      })
  }
}

// --------------------------------------------------------------------------------

export const setSettings = (address, token) => {
  return {
    type: SET_SETTINGS,
    address: address,
    token: token
  }
}
export const closeSettings = () => ({type: CLOSE_SETTINGS})
export const showSettings = () => ({type: SHOW_SETTINGS})
