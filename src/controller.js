import {getResponseFromAPI} from './helpers';

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		model.on('initialLoad', this.setInitialState.bind(this));
		view.on('currencyChange', this.updateCurrency.bind(this));
		view.on('counterChange', this.updateCounter.bind(this));
		model.on('equivalentIsCounted', this.updateOutput.bind(this));

		this.getCurrencies();
	}

	getCurrencies() {
		getResponseFromAPI().then(response => {
			return this.model.processResponse(response);
		});
	}

	setInitialState({topCurrencies}) {
		this.view.renderOptionsList(topCurrencies);
	}

	updateCurrency(target) {
		this.model.changeComparedCurrency(target);
		this.model.calculateEquivalent();
	}

	updateCounter({value}) {
		this.model.changeCounter(value);
		this.model.calculateEquivalent();
	}

	updateOutput({props}) {
		this.view.renderOutput(props);
	}
}

export default Controller;