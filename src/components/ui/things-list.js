import React from 'react'
import { Thing } from './thing'

import { withRouter } from 'react-router'

import ReactTooltip from 'react-tooltip'

class ThingsList extends React.Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onQuit = this.onQuit.bind(this)
    }
    submit(e) {
        const { _message } = this.refs
        e.preventDefault()
        this.props.onSend(_message.value)
        _message.value = ''
        _message.focus()
    }
    onClick(thingId) {
        this.props.onToggle(thingId)
    }
    onQuit(){
        this.props.onQuit(this.props.history)
    }
    render() {
        const { panel, isConnected } = this.props
        const { things, openedThings } = panel
        const parentId = this.props.parentId
        return (
            <div className="things-wrapper">
                {
                    (!isConnected)
                    ?
                        <div className="panel-preloader"><i className="fa fa-spinner fa-spin fa-4x"></i></div>
                    :
                        ''
                }
                <div className="things-list">
                    {
                        things.map((thing, i) => {
                            
                            if(!thing.parents){
                                return ''
                            }
                            if(thing.parents.indexOf(parentId) !== -1 || (thing.parents.length === 0 && parentId === "")){
                               const isOpened = (openedThings.indexOf(thing.id) !== -1) && thing.online
                                return(
                                    <div key={thing.id} className={"thing " + (thing.online ? 'online' : '')}>
                                        <div className="thing-title">
                                            <h3 data-tip="tip" data-for={thing.id}>{ thing.name }</h3>
                                            <button className={(isOpened ? 'opened' : '')} onClick={() => {this.onClick(thing.id)}}>
                                                <i className="fa fa-angle-down"></i>
                                            </button> 
                                            <span></span>
                                        </div> 
                                        {
                                            (thing.description.length > 0)
                                            ?
                                                <ReactTooltip id={thing.id} type="light">{thing.description}</ReactTooltip>
                                            :
                                                ''
                                        }
                                        {(isOpened) ? <Thing thing={things[i]} /> : ''}
                                    </div>
                                ) 
                            }else{
                                return ''
                            }  
                        })
                    }
                </div>
            </div>
            
        )
    }
}

ThingsList.defaultProps={
    isConnected: true
}

export const ThingsListWithRouter = withRouter(ThingsList)