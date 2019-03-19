import { connect } from 'react-redux'
import { ThingsListWithRouter } from '../components/ui/things-list'

import C from '../redux/constants'
import { Item } from '../components/ui/items'
import { Method } from '../components/ui/methods'
import { ManagePanel } from '../components/ui/manage-panel'

export const ThingsListContainer = connect( 
    state => ({
        panel: state.panel,
        things: state.panel.things,
        user: state.user
    }),
    dispatch => ({
        async onSend(message) {
            dispatch({
                type: C.ADD_MESSAGE,
            })       
        },
        async onToggle(thingId) {
            dispatch({
                type: C.TOGGLE_THING,
                thingId
            }) 
        }
    })
)(ThingsListWithRouter)

// for future
export const ItemContainer = connect( 
    null,
    null
)(Item)

// for future
export const MethodContainer = connect( 
    null,
    null
)(Method)

export const ManagePanelContainer = connect( 
    state => ({
        panel: state.panel
    }),
    null
)(ManagePanel)



