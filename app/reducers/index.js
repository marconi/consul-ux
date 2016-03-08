import {combineReducers} from 'redux'
import addKeyForm from './addKeyForm'
import keys from './keys'

const rootReducer = combineReducers({addKeyForm, keys})

export default rootReducer
