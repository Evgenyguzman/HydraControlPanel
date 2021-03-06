const storeData = {

    panel: {
        things: [
            {
                id: "thing2454231",
                name: "Thing 2454231",
                online: true,
                description: "Описание",
                users: [],
                items: [
                    {
                        id: "item1",
                        name: "Число",
                        state: "UNREACHABLE",
                        value: "10000",
                        type: "INTEGER",
                        readOnly: true,
                        constraints: {

                        },
                    },
                    {
                        id: "item2",
                        name: "Клапан воды",
                        state: "DISABLED",
                        value: "off",
                        type: "SWITCH",
                        readOnly: true,
                        constraints: {

                        },
                    },
                    {
                        id: "item3",
                        name: "Строка",
                        state: "ENABLED",
                        value: "Строка неизменяемая",
                        type: "TEXT",
                        readOnly: true,
                        constraints: {

                        },
                    },
                    {
                        id: "item4",
                        name: "Число",
                        state: "",
                        value: "56",
                        type: "INTEGER",
                        readOnly: false,
                        constraints: {

                        },
                    },
                    {
                        id: "item5",
                        name: "Клапан давления",
                        state: "",
                        value: "on",
                        type: "SWITCH",
                        readOnly: false,
                        constraints: {

                        },
                    },
                    {
                        id: "item6",
                        name: "Строка",
                        state: "",
                        value: "Строка изменяемая",
                        type: "TEXT",
                        readOnly: false,
                        constraints: {

                        },
                    }
                ],
                methods: [

                ],
                relatives: [

                ]
            },
            {
                id: "thing2454232",
                name: "Thing 2454232",
                online: false,
                description: "Описание",
                users: [],
                items: [],
                methods: [

                ],
                relatives: [

                ]
            }
        ],
        openedThings: [
            "thing2454231"
        ],
        connections: {
            thingConnection: {
                connections: [

                ]
            },
            userConnection: {
                connections: [
                    
                ]
            }
        }
    },

    user: {
        // user: "root",
        // password: 'root'
    },

    connection: {
        
    }
}

export default storeData