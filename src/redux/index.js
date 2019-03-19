import { createStore,
    applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import mainReducer from './reducers'
import storeData from './initialState'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}
const saver = store => next => action => {
    let result = next(action)
    if(action.type === "SIGN_IN" || action.type === "ADD_TOKEN" || action.type === "QUIT" ){
        console.log(action)
        localStorage['redux-store'] = JSON.stringify(store.getState()) 
    }
    return result
}

const storeFactory = (initialState=storeData) =>{
    return applyMiddleware(thunkMiddleware, logger, saver)(createStore)(
        mainReducer,
        (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : storeData
    )
    
} 

export default storeFactory