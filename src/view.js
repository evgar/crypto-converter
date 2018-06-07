import { EventEmitter } from './helpers';

class View extends EventEmitter{
	constructor() {
		super();

		this.mainCurrency = document.querySelector('.main-currency');
		this.outputInfo = document.querySelector('.output');
		this.selectList = document.querySelector('.select-list');

		this.addEventListeners();
	}

	renderOptionsList(currencies) {
		let optionsHTML =
			Object.keys(currencies)
			.map(item => this.optionTemplate(currencies[item]))
			.join('');
		this.selectList.innerHTML = optionsHTML;
	}

	renderOutput(props) {
		this.outputInfo.innerHTML = this.outputTemplate(props);
	}

	outputTemplate(props) {
		return `${props.counter} ${props.mainCurrencySymbol} = ${props.equivalent} ${props.comparedCurrencySymbol}`;
	}

	optionTemplate(currencyCode) {
		return `
			<option>${currencyCode}</option>
		`
	}

	addEventListeners(selectList, mainCurrency) {
		this.selectList.addEventListener('change', this.handleCurrencyChange.bind(this));
		this.mainCurrency.addEventListener('input', this.handleCounterChange.bind(this))
	}

	handleCurrencyChange({ target }) {
		this.emit('currencyChange', target );
	}

	handleCounterChange({ target }) {
		this.emit('counterChange', target);
	}
}

export default View;


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