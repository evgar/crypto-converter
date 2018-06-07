import { getResponseFromAPI, EventEmitter} from './helpers';
class Controller {
	constructor (model, view) {
		this.model = model;
		this.view = view;

		model.on('initialLoad', this.setInitialState.bind(this));
		view.on('currencyChange', this.updateCurrency.bind(this));
		view.on('counterChange', this.updateCounter.bind(this));

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

	updateCurrency(target) {
		this.model.changeComparedCurrency(target);
		this.model.calculateEquivalent();
	}

	updateCounter(target) {
		this.model.changeCounter(target.value);
		this.model.calculateEquivalent();
	}


}

export default Controller;