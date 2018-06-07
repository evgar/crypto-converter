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
		let emptyOption = `<option class="hidden" disabled selected value> Select currency </option>`;
		let optionsHTML =
			Object.keys(currencies)
			.map(item => this.optionTemplate(currencies[item]))
			.join('');
		this.selectList.innerHTML = emptyOption + optionsHTML;
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
		this.selectList.addEventListener('change', (event) => {
			this.handleCurrencyChange.bind(this);
			event.target[0].classList.add('hidden');
		});
		this.mainCurrency.addEventListener('input', this.handleCounterChange.bind(this))
		// document.querySelector('options[0]')
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