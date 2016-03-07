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

export const fetchKeysStarted = {type: FETCH_KEYS_STARTED}
export const fetchKeysFinished = (status, data=[]) => {
  return {
    type: FETCH_KEYS_FINISHED,
    status: status,
    data: data
  }
}

export const fetchKeys = () => {
  return (dispatch) => {
    dispatch(fetchKeysStarted)
    return axios.get('http://192.168.99.100:8501/v1/kv/?token=admin&keys')
      .then((resp) => {
        dispatch(fetchKeysFinished('success', resp.data))
      })
      .catch((resp) => {
        console.log(resp)
        dispatch(fetchKeysFinished('failed'))
      })
  }
}

export const setKeyFilter = (filter) => ({type: SET_KEY_FILTER, filter: filter})
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
export const submitNewKey = () => {
  return (dispatch) => {
    dispatch(submitNewKeyStarted)
  }
}
