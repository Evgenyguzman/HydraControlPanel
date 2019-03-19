import React, { Component } from 'react'
import PageTemplate from './pageTemplate'

import C from '../../redux/constants'

import { updateAllThings } from '../../redux/actions'
import { ThingsListContainer, ManagePanelContainer } from '../../containers/PanelContainers'
import HydraService from '../../services/HydraService'

import { Notification } from 'react-notification'

import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const customStyles = {
    content : {
        top                   : '20%',
        left                  : '20%',
        right                 : '20%',
        bottom                : '20%'
    }
}

class Panel extends Component {

    constructor(props){
        super(props)
        this.state = {
            isConnected: false, 
            showManagePanel: false, 
            notification: {
                thing: undefined,
                text: ''
            }
        }
    }

    render() {
        const store = this.props.store.getState()
        const user = store.user
        const { connections } = store.panel
        const { isConnected, notification } = this.state
        return (
            <PageTemplate>

                <div className="topbar">
                    <div className="logo"><h1>Hydra</h1></div>
                    <div className="user-panel">
                        {(isConnected && Object.keys(connections).length !== 0) ? <button onClick={()=>this.setState({showManagePanel: true})}>Managing</button> : ''}
                        <p>{user.user}</p>
                        <button className="quit-btn" onClick={() => { this.onQuit() }}>Выход</button>
                    </div>
                </div>
                
                <ThingsListContainer isConnected={isConnected} parentId="" />

                <ReactModal 
                    isOpen={this.state.showManagePanel}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                    onRequestClose={()=>this.setState({showManagePanel: false})}
                    shouldCloseOnOverlayClick={true}
                >
                    <ManagePanelContainer>
                        <button className="close-btn" onClick={()=>this.setState({showManagePanel: false})}> <i className="fa fa-close fa-2x"></i> </button>
                    </ManagePanelContainer> 
                </ReactModal>
               
                <Notification
                    isActive={(notification.thing) ? true : false}
                    message={notification.thing + " sent notification: " + notification.text}
                    action={'Закрыть'}
                    onClick={()=>{this.setState({notification:{thing: undefined, text: ''}})}}
                />

            </PageTemplate>
        )
    }

    onQuit(params='') {
        HydraService.getInstance().logout()
        this.props.store.dispatch({
            type: C.QUIT
        })
        this.props.history.push("/login" + params)
    }

    componentDidMount() {
        this.connectHydra()
    }

    async connectHydra(){

        const store = this.props.store.getState()
        const {user} = store
        const {connection} = store

        if (user.user || user.token) {
            
            let hydra = HydraService.getInstance()

            // const host = connection.host || 'localhost'
            const host = connection.host || '192.168.0.115'
            const port = connection.port || '7891'

            let res = await hydra.connect("ws://" + host + ":" + port)
            if (res) {
                
                let token = null

                if(user.user && user.password){
                    if(user.type === "registering"){
                        res = await hydra.register(user.user, user.password)
                        if(res){

                        }else{
                            this.onQuit('?error=register')
                            return
                        }
                    }
                }
                
                if(!user.token){
                    if(user.user && user.password){
                        res = await hydra.getToken(user.user, user.password)
                        if(res){
                            token = res
                            this.props.store.dispatch({
                                type: C.ADD_TOKEN,
                                user: user.user,
                                token: token
                            })
                        }else{
                            this.onQuit('?error=login')
                        }
                    }else{
                        this.props.history.push('/login')
                    }
                }else{
                    token = user.token
                }
                
                res = await hydra.login(token)
                if (res) {
                    
                    setTimeout(()=>{
                        this.setState({isConnected: true})
                    }, 500)

                    hydra.onHydraState = (thingConnection, userConnection) => {
                        this.props.store.dispatch({
                            type: C.UPDATE_CONNECTIONS,
                            connections: {
                                thingConnection,
                                userConnection
                            }
                        })
                    }
                    
                    hydra.onThingsData = (things) => {
                        this.props.store.dispatch(updateAllThings(things))
                    }

                    hydra.onThingOffline = (thingId) => {
                        this.props.store.dispatch({
                            type: C.THING_OFFLINE,
                            thingId
                        })
                    }

                    hydra.onThingOnline = (thing) => {
                        this.props.store.dispatch({
                            type: C.THING_ONLINE,
                            thing
                        })
                    }

                    hydra.onItemStateChanged = (thingId, itemId, state) => {
                        this.props.store.dispatch({
                            type: C.ITEM_CHANGE_STATE,
                            thingId,
                            itemId,
                            state
                        })
                    }

                    hydra.onItemValueChanged = (thingId, itemId, value) => {
                        this.props.store.dispatch({
                            type: C.ITEM_CHANGE_VALUE,
                            thingId,
                            itemId,
                            value
                        })
                    }

                    hydra.onMethodStateChanged = (thingId, methodId, state) => {
                        this.props.store.dispatch({
                            type: C.METHOD_CHANGE_STATE,
                            thingId,
                            methodId,
                            state
                        })
                    }

                    hydra.onNotification = (thingId, text) => {
                        this.setState({
                            notification: {
                                thing: thingId,
                                text: text
                            }
                        })
                    }

                    hydra.onDisconnect = () => {
                        hydra.log("disconnect")
                        this.setState({isConnected: false})
                        setTimeout(()=>{
                            this.connectHydra()
                        }, 5000)
                    }

                } else {
                    this.props.history.push('/login')
                }
            } else {
                this.setState({isConnected: false})
                setTimeout(()=>{
                    this.connectHydra()
                }, 5000)
            }
        } else { 
            this.props.history.push('/login')
        }

    }

}

export default Panel