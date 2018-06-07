import { getResponseFromAPI, EventEmitter} from './helpers';

class Model extends EventEmitter{
	constructor() {
		super();

		this.topCurrencies = null;
		this.mainCurrency = {
			symbol: null,
			price: null
		};
		this.counter = 1;
	}

	processResponse({data}) {
		this.getTopCurrencies(data);
		this.getMainCurrency(data);

		let mainCurrency = this.mainCurrency;
		let topCurrencies = this.topCurrencies;

		this.emit('initialLoad', {mainCurrency, topCurrencies});
	}

	getTopCurrencies(currencies) {
		this.topCurrencies = Object.values(currencies)
			.filter(item => item.symbol !== 'BTC')
			.sort((obj1, obj2) => obj2.quotes.USD.price - obj1.quotes.USD.price)
			.splice(0, 10)
			.map(item => item.symbol);
	}

	getMainCurrency(currencies) {
		let mainCurrency = Object.values(currencies).find(item => item.symbol === "BTC");
		this.mainCurrency.symbol = mainCurrency.symbol;
		this.mainCurrency.price = mainCurrency.quotes.USD.price;
	}

}

export default Model;