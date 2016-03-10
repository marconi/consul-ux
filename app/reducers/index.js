import {combineReducers} from 'redux'
import addKeyForm from './addKeyForm'
import keys from './keys'
import updateKeyForm from './updateKeyForm'

const rootReducer = combineReducers({addKeyForm, keys, updateKeyForm})

export default rootReducer
