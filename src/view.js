import { EventEmitter } from './helpers';

class View extends EventEmitter{
	constructor() {
		super();

		this.mainCurrency = document.querySelector('.main-currency');
		this.outputInfo = document.querySelector('.output');
		this.selectList = document.querySelector('.select-list');
	}

	renderOptionsList(currencies) {
		// let selectHTML =
		// 	Object.keys(currencies)
		// 	.map(item => this.optionTemplate(currencies[item]))
		// 	.join('');
		// console.log(currencies);
	}

	optionTemplate(currencyCode) {
		return `
			<option>${currencyCode}</option>
		`
	}
	//
	// outputTemplate() {
	//
	// 	if(){
	// 		return `${mainCurrency.value} BTC = ${compareCurrencyPrice * mainCurrency.value} ${compareCurrencyCode}`;
	//
	// 	}
	// }
	//
	// findSelectedOption(id) {
	// 	return this.list.querySelector(`[data-id="${id}"]`);
	// }
}

export default View;