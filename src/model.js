import { getResponseFromAPI, EventEmitter} from './helpers';

class Model extends EventEmitter{
	constructor() {
		super();

		this.topCurrencies = null;
		this.mainCurrency = {
			symbol: null,
			price: null
		};

		this.comparedCurrency = {
			symbol: null,
			price: null
		};

		this.equivalent = null;
		this.counter = 1;
	}

	processResponse({data}) {
		this.getTopCurrencies(data);
		this.getMainCurrency(data);

		let mainCurrency = this.mainCurrency;
		let topCurrencies = this.topCurrencies.map(currency => currency.symbol);

		this.emit('initialLoad', {mainCurrency, topCurrencies});
	}

	getTopCurrencies(currencies) {
		this.topCurrencies = Object.values(currencies)
			.filter(item => item.symbol !== 'BTC')
			.sort((obj1, obj2) => obj2.quotes.USD.price - obj1.quotes.USD.price)
			.splice(0, 10)
	}

	getMainCurrency(currencies) {
		let mainCurrency = Object.values(currencies).find(item => item.symbol === "BTC");
		this.mainCurrency.symbol = mainCurrency.symbol;
		this.mainCurrency.price = mainCurrency.quotes.USD.price;
	}

	changeComparedCurrency({ value }) {
		let selectedCurrency = this.topCurrencies.find(currency => currency.symbol === value);
		this.comparedCurrency.symbol = selectedCurrency.symbol;
		this.comparedCurrency.price = selectedCurrency.quotes.USD.price;
	}

	changeCounter(count) {
		this.counter = count;
	}

	calculateEquivalent() {
		let templatePrice = this.mainCurrency.price;
		let comparedPrice = this.comparedCurrency.price;

		this.equivalent = templatePrice && comparedPrice !== null || undefined ?
			((templatePrice / comparedPrice) * this.counter).toFixed(3) : null;

		this.getPropertiesForOutput();
	}

	getPropertiesForOutput() {
		let props = {
			counter: this.counter,
			mainCurrencySymbol: this.mainCurrency.symbol,
			equivalent: this.equivalent,
			comparedCurrencySymbol: this.comparedCurrency.symbol
		};

		let allPropsAreSetted = Object.values(props).every(
			item => item !== null || undefined
		);
		if(allPropsAreSetted) {
			this.emit('equivalentIsCounted', { props });
		}

	}

}

export default Model;