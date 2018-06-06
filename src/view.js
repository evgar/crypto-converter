class View {
	constructor() {

		this.mainCurrency = document.querySelector('.main-currency');
		this.outputInfo = document.querySelector('.output');
		this.selectList = document.querySelector('.select-list');
	}

	// render() {
	//
	// }
	//
	// optionTemplate(currencyCode) {
	// 	return `
	// 		<option>${currencyCode}</option>
	// 	`
	// }
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