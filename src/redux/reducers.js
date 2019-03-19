import C from './constants'
import { combineReducers } from 'redux'

const things = (state = {}, action) => {
    let new_state = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case C.UPDATE_ALL_THINGS:
            new_state = action.things
            return new_state
        case C.QUIT:
            return []
        case C.THING_OFFLINE:
            {
                new_state.forEach((thing, i) => {
                    if(thing.id === action.thingId){
                        new_state[i].online = false
                    }
                })
                return new_state
            }
        case C.THING_ONLINE:
            {
                let flag = false
                new_state.forEach((thing, i) => {
                    if(thing.id === action.thing.id){
                        new_state[i] = action.thing
                        new_state[i].online = true
                        flag = true
                    }
                })
                if(!flag){
                    let {thing} = action
                    thing.online = true
                    new_state.push(thing)
                }

                return new_state
            }
        case C.ITEM_CHANGE_STATE:
            {
                new_state.forEach((thing, i) => {
                    if(thing.id === action.thingId){
                        thing.items.forEach((item, k) => {
                            if(item.id === action.itemId){
                                new_state[i].items[k].state = action.state
                            }
                        })
                    }
                })
                return new_state
            }
        case C.ITEM_CHANGE_VALUE:
            
            new_state.forEach((thing, i) => {
                if(thing.id === action.thingId){
                    thing.items.forEach((item, k) => {
                        if(item.id === action.itemId){
                            new_state[i].items[k].value = action.value
                        }
                    })
                }
            })
            return new_state
        case C.METHOD_CHANGE_STATE:
            {
                new_state.forEach((thing, i) => {
                    if(thing.id === action.thingId){
                        thing.methods.forEach((method, k) => {
                            if(method.id === action.methodId){
                                new_state[i].methods[k].state = action.state
                            }
                        })
                    }
                })
                return new_state
            }
        default :
            return state
    }
}

const openedThings = (state = {}, action) => {
    let new_state = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case C.QUIT:
            return []
        case C.TOGGLE_THING:
            const pos = state.indexOf(action.thingId)
            if(pos !== -1){
                new_state.splice(pos, 1)
            }else{
                new_state.push(action.thingId)
            }
            return new_state
        default :
            return state

    }
}

const connections = (state = {}, action) => {
    switch (action.type) {
        case C.UPDATE_CONNECTIONS:
            return action.connections
        case C.QUIT:
            return {}
        default :
            return state
    }
}



const user = (state = {}, action) => {
    switch (action.type) {
        case C.SIGN_UP:
            {
                const { user, password } = action
                return { user, password, type: "registering" }
            }
        case C.SIGN_IN:
            {
                const { user, password } = action
                return { user, password }
            }
        case C.ADD_TOKEN:
            {
                const { user, token } = action
                return { user, token }
            }
        case C.QUIT:
            return {}
        default:
            return state
    }
}

const connection = (state = {}, action) => {
    switch (action.type) {
        case C.SIGN_IN:
            {
                const { host, port } = action
                return { host, port }
            }
        case C.QUIT:
            return {}
        default:
            return state
    }
}

const panel = combineReducers({
    things,
    openedThings, 
    connections 
})

const mainReducer = combineReducers({
    panel,
    user,
    connection
})
export default mainReducer
