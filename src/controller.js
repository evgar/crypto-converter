import { getResponseFromAPI, EventEmitter} from './helpers';
class Controller {
	constructor (model, view) {
		this.model = model;
		this.view = view;

		model.on('initialLoad', this.setInitialState.bind(this));

		view.on('currencyChange', this.changeCurrency.bind(this));
		view.on('counterChange', this.changeCounter.bind(this));

		this.getCurrencies();
	}

	getCurrencies() {
		getResponseFromAPI().then(response => {
			return this.model.processResponse(response);
		});
	}

	setInitialState({mainCurrency, topCurrencies}) {
		this.view.renderOptionsList(topCurrencies);
	}

	changeCurrency(some) {
		console.log(some.value);
	}

	changeCounter(some) {
		console.log(some.value);
	}


}

export default Controller;