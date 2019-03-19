import React from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

export class ManagePanel extends React.Component {
    render() {
        const {children} = this.props
        const { thingConnection, userConnection } = this.props.panel.connections
        return (
            <div className={"manage-panel "}>
                <Tabs>
                    <TabList>
                        <Tab>Things</Tab>
                        <Tab>Things Connections</Tab>
                        <Tab>User Connections</Tab>
                        <Tab>Users</Tab>
                    </TabList>
                    {children}
                    <TabPanel>
                        <h2>No content</h2>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h2>Thing Connections </h2> <h3> {thingConnection.address + " " + thingConnection['connections-count'] + " / " + thingConnection['max-connections']}</h3>
                            {
                                thingConnection.connections.map((conn, i)=>
                                    <div key={i}>
                                        <p>{conn.id} {conn.address}</p>
                                    </div>
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h2>User Connections <span>{userConnection['connections-count']}</span></h2>
                            <h3>Remote {userConnection.remote.address}</h3>
                            <h3>Local {userConnection.local.address}</h3>
                            {
                                userConnection.connections.map((conn, i)=>
                                    <div key={i}>
                                        <p>{conn.id} {conn.address}</p>
                                    </div>
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>No content</h2>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
