import { getResponseFromAPI, EventEmitter} from './helpers';
class Controller {
	constructor (model, view) {
		this.model = model;
		this.view = view;

		model.on('initialLoad', this.setInitialState.bind(this));

		this.getCurrencies();
	}

	getCurrencies() {
		getResponseFromAPI().then(response => {
			return this.model.processResponse(response);
		});
	}

	setInitialState({mainCurrency, topCurrencies}) {
		console.log(mainCurrency);
		console.log(topCurrencies);
	}



}

export default Controller;