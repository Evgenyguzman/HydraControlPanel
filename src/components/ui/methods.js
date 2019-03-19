import React from 'react'
import { Item } from './items'
import { runMethod } from '../../redux/actions'

export class Method extends React.Component {
    constructor(props){
        super(props)
        let args = {}
        this.props.method.arguments.forEach(arg => {
            args[arg.id] = arg.value
        })
        this.state = {
            isOpen: !(this.props.method.arguments.length > 0),
            parameters: args
        }
        this.onChangeParameter = this.onChangeParameter.bind(this)
    }

    onChangeParameter(data){
        const {value, itemId} = data
        let {parameters} = this.state
        parameters[itemId] = value
        this.setState({parameters: parameters})
    }

    render() {
        const {parameters} = this.state
        const {method} = this.props
        const {thingId} = this.props
        const {isOpen} = this.state

        return (
            <ArgumentedMethod 
                method={method} 
                thingId={thingId} 
                isOpen={isOpen} 
                setState={data => this.setState(data)}
                onChangeParameter={data => this.onChangeParameter(data)} 
                onRunMethod={data => {
                    data.parameters = parameters
                    runMethod(data)
                } }
            />
        )
    }
}

export class SimpleMethod extends React.Component {

    render() {
        const {method} = this.props
        const {thingId} = this.props
        const {isOpen} = this.props

        let methodTitle, methodClass
        if (method.state === 'RUNNING') {
            methodTitle = <i className="fa fa-spinner fa-spin"></i>
            methodClass = 'running'
        } else if(method.state !== 'ENABLED'){
            methodTitle = ''
            methodClass = 'disabled'
        } else{
            methodTitle = <button onClick={()=>this.props.setState({isOpen: !isOpen})}>Open/Close</button>
            methodClass = ''
        }

        return (
            <div className={"method " + methodClass}>
                <div className="method-title">
                    <h4>{method.name}</h4>
                    {
                        methodTitle
                    }
                </div>
                {
                    (isOpen && method.state === 'ENABLED') 
                    ?
                        <div className="parameters-modal">
                            <div>
                                {
                                    method.arguments.map((parameter)=>
                                        <div key={parameter.id}>
                                            <Item item={ parameter } thingId={ thingId } onChangeValue={(data)=>{this.props.onChangeParameter(data)}} />
                                        </div>
                                    
                                    )
                                }
                            </div>
                            <div><button onClick={ ()=>{this.props.onRunMethod({thingId: thingId, methodId: method.id })} }>Run</button></div>
                        </div>
                    :
                        ''
                }
            </div>
        )
    }
}

export class ArgumentedMethod extends React.Component {

    render() {
        const {method} = this.props
        const {thingId} = this.props
        const {isOpen} = this.props

        let methodTitle, methodClass
        if (method.state === 'RUNNING') {
            methodTitle = <i className="fa fa-spinner fa-spin"></i>
            methodClass = 'running'
        } else if(method.state !== 'ENABLED'){
            methodTitle = ''
            methodClass = 'disabled'
        } else{
            methodTitle = <button onClick={()=>this.props.setState({isOpen: !isOpen})}>Open/Close</button>
            methodClass = ''
        }

        const modalClass = (isOpen && method.state === 'ENABLED') ? '' : 'hidden'

        return (
            <div className={"method " + methodClass}>
                <div className="method-title">
                    <h4>{method.name}</h4>
                    {
                        methodTitle
                    }
                </div>
                
                <div className={"parameters-modal " + modalClass }>
                    <div>
                        {
                            method.arguments.map((parameter)=>
                                <div key={parameter.id}>
                                    <Item item={ parameter } thingId={ thingId } onChangeValue={(data)=>{this.props.onChangeParameter(data)}} />
                                </div>
                            
                            )
                        }
                    </div>
                    <div><button onClick={ ()=>{this.props.onRunMethod({thingId: thingId, methodId: method.id })} }>Run</button></div>
                </div>
                
            </div>
        )
    }
}