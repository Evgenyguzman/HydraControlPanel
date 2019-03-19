import React from 'react'
import { ItemsList } from './items-list'
import { MethodsList } from './methods-list'
import { ThingsListContainer } from '../../containers/PanelContainers'

export class Thing extends React.Component {
    
    render() {
        const { thing } = this.props
        return (
            <div className="">
                <ItemsList items={ thing.items } thingId={ thing.id } />
                <MethodsList methods={ thing.methods } thingId={ thing.id } />
                <ThingsListContainer parentId={thing.id} />
            </div>
        )
    }
}