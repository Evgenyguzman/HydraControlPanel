export default class HydraService {

    static instance = null

    static getInstance(){
        if(HydraService.instance === null){
            HydraService.instance = new HydraService()
        }
        return HydraService.instance
    }

	async connect(address) {
		this.log('connecting...')
		this.state = 'connecting'
		this.socket = new WebSocket(address)
	    this.socket.addEventListener('message', (event) => {
	        // this.log('received: ' + event.data)
	        let data = JSON.parse(event.data)
	        this.receive(data)
            if (this.state === 'getToken' && data.type === 'result') {
                this.state = data.code === 0 ? 'login-required' : 'login-required'
	        	this.token = data.token
	        	this.resolve(data.data)
            }
            if (this.state === 'login' && data.type === 'result') {
	        	this.state = data.code === 0 ? 'authorized' : 'login-required'
	        	this.token = data.token
	        	this.resolve(data.code === 0)
            }
            if (this.state === 'register' && data.type === 'result') {
	        	this.state = data.code === 0 ? 'login-required' : 'login-required'
	        	this.token = data.token
	        	this.resolve(data.code === 0)
            }
	    })
	    this.socket.addEventListener('open', (event) => {
	    	this.state = 'login-required'
			this.resolve(true)
		})
		this.socket.addEventListener('error', (event) => {
			if (this.state === 'connecting') this.resolve(false)
			if (this.state === 'authorized') {
				this.onDisconnect()
			}
	    	this.state = 'disconnected'
		})
		this.socket.addEventListener('close', (event) => {
			if (this.state === 'connecting') this.resolve(false)
			if (this.state === 'authorized') {
				this.onDisconnect()
			}
	    	this.state = 'disconnected'
		})
	    return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
    }

    async register(userId, password){
        this.log(this.state)
		if (this.state !== 'login-required') return false
		this.log(`register (${userId}, ${password})...`)
		this.state = 'register'
		let data = {'action': 'register', 'id': userId, 'password': password}
		this.socket.send(JSON.stringify(data))
		return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
    }

    async getToken(userId, password){
        this.log(this.state)
		if (this.state !== 'login-required') return false
		this.log(`get token (${userId}, ${password})...`)
		this.state = 'getToken'
		let data = {'action': 'get-token', 'id': userId, 'password': password}
		this.socket.send(JSON.stringify(data))
		return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
    }

	async login(token) {
        this.log(this.state)
		if (this.state !== 'login-required') return false
		this.log(`login (${token})...`)
		this.state = 'login'
		let data = {'action': 'login', 'token': token}
		this.socket.send(JSON.stringify(data))
		return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
	}

	logout() {
		if (this.state !== 'authorized') return
		this.state = 'login-required'
		this.socket.send(JSON.stringify({'action': 'logout'}))
    }

    // ____________________ //

	receive(data) {
		if(data.type !== 'item-value') console.log(data)
		switch (data.type) {
			case 'state': if (data['thing-connection'] !== undefined && data['user-connection'] !== undefined) this.onHydraState(data['thing-connection'], data['user-connection']); break
			case 'thing-connected': this.onThingOnline(data); break
			case 'things': if (data.things !== undefined) this.onThingsData(data.things); break
			case 'thing-disconnected': if (data.thing !== undefined) this.onThingOffline(data.thing); break
			case 'item-state': if (this.checkDefined(data, ['thing', 'item', 'state'])) this.onItemStateChanged(data.thing, data.item, data.state); break
			case 'item-value': if (this.checkDefined(data, ['thing', 'item', 'value'])) this.onItemValueChanged(data.thing, data.item, data.value); break
			case 'method-state': if (this.checkDefined(data, ['thing', 'method', 'state'])) this.onMethodStateChanged(data.thing, data.method, data.state); break
			case 'notification': if (this.checkDefined(data, ['thing', 'text'])) this.onNotification(data.thing, data.text); break
			default: break
		}
	}

	log(text) {
		console.log('Hydra: ', text)
	}

	onDisconnect() {
		this.log('suddenly disconnected')
	}

	onHydraState(thingConnection, userConnection) {
	}

	onThingsData(things) {
    }

	onThingOffline(thingId) {
    }

	onThingOnline(thing) {
    }

	onItemStateChanged(thingId, itemId, state) {
    }

	onItemValueChanged(thingId, itemId, value){
	}
	
	onMethodStateChanged(thingId, methodId, state){
	}
	
	onNotification(thing, text){
    }

	checkDefined(object, fields) {
		for (let i = 0; i < fields.length; i++)
			if (object[fields[i]] === undefined) return false
		return true
	}
    
	changeValue(thing, item, value){
		this.log(thing, item, value)
		this.socket.send(JSON.stringify({'action': 'set', 'thing': thing, 'item': item, 'value': value}))
	}
	
	runMethod(thing, method, parameters){
		this.log(thing, method, parameters)
		console.log(JSON.stringify({'action': 'call', 'thing': thing, 'method': method, 'arguments': parameters }))
        this.socket.send(JSON.stringify({'action': 'call', 'thing': thing, 'method': method, 'arguments': parameters }))
    }

}
