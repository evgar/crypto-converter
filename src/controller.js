import { getDataFromAPI } from './helpers';

class Controller {
	constructor (model, view) {
		this.model = model;
		this.view = view;
	}

	addCurrencies() {
		let data= getDataFromAPI;
		console.log(data);

	}

}

export default Controller;