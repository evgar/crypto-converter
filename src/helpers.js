function getResponseFromAPI() {
	return fetch('https://api.coinmarketcap.com/v2/ticker/')
		.then(response => response.json())
		.then(data => data)
		.catch(error => 'Request failed' + error);
}

class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(type, listener) {
		this.events[type] = this.events[type] || [];
		this.events[type].push(listener);
	}

	emit(type, arg) {
		if (this.events[type]) {
			this.events[type].forEach(listener => listener(arg));
		}
	}
}

export {getResponseFromAPI, EventEmitter};