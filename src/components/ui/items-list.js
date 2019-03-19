import React from 'react'
import { ItemContainer } from '../../containers/PanelContainers'

export class ItemsList extends React.Component {
    render() {
        const { items, thingId } = this.props
        const isHidden = (items.length === 0) ? 'hidden' : ''
        return (
            <div className={"items card " + isHidden}>
                <div className="items-title"><h4>Items</h4></div>
                {
                    items.map((item, i) => 
                        <div key={item.id} className="item-wrapper">
                            <ItemContainer item={ items[i] } thingId={ thingId } />
                        </div>
                    )
                }
            </div>
        )
    }
}
