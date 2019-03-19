import React from 'react'
import { MethodContainer } from '../../containers/PanelContainers'

export class MethodsList extends React.Component {
    render() {
        const { methods, thingId } = this.props
        const isHidden = (methods.length === 0) ? 'hidden' : ''
        return (
            <div className={"methods card " + isHidden}>
                <h4>Methods</h4>
                {
                    methods.map((method)=> 
                        <div key={method.id} className="method-wrapper">
                            <MethodContainer method={ method } thingId={ thingId } />
                        </div>
                    )
                }
            </div>
        )
    }
}
