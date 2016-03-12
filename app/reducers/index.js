import {combineReducers} from 'redux'
import addKeyForm from './addKeyForm'
import keys from './keys'
import updateKeyForm from './updateKeyForm'
import settings from './settings'

const rootReducer = combineReducers({addKeyForm, keys, updateKeyForm, settings})

export default rootReducer
