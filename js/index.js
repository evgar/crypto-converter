let compareCurrencyPrice;
let compareCurrencyCode;
let currencies = [];
let mainCurrency = document.querySelector('.comparable-currency');
let outputInfo = document.querySelector('.output');

function getTopToUSDCurrencies() {
		fetch('https://api.coinmarketcap.com/v2/ticker/')
		.then(response => response.json())
		.then(list => {
			currencies = Object.values(list.data)
					.filter(item => item.symbol !== 'BTC')
					.sort((obj1, obj2) => obj2.quotes.USD.price - obj1.quotes.USD.price)
					.splice(0, 10)
					.map(item => item.symbol);
			renderOptionsList(currencies);
		});
}

function renderOptionsList(currencies) {
	const selectList = document.querySelector('.currencies-list');
	let emptyOption = `<option disabled selected value> Select currency </option>`;
	let selectHTML = emptyOption + Object.keys(currencies).map(item => optionTemplate(currencies[item])).join('');
	selectList.innerHTML = selectHTML;
	eventHandlers(selectList);
}

function getDataFromAPI(value) {
	fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=' + value)
		.then(response =>  response.json())
		.then(data => {
			compareCurrencyPrice = data[Object.keys(data)[0]];
			compareCurrencyCode = Object.keys(data)[0];
			countCurrency();
		})
		.catch(error => console.log('Request failed' + error));
}

function countCurrency() {
	addOutput();
}

function removeEmptyOption () {
	let currenciesList = document.querySelector('.currencies-list');
	currenciesList.removeChild(currenciesList.childNodes[0]);
}

function optionTemplate(currencyCode) {
	return `
	<option>${currencyCode}</option>
`
}

function addOutput() {
	return outputInfo.innerHTML = outputTemplate();
}

function outputTemplate() {
	if(compareCurrencyPrice && compareCurrencyCode){
		return `${mainCurrency.value} BTC = ${compareCurrencyPrice * mainCurrency.value} ${compareCurrencyCode}`;

	}
	return 'Choose currency, please'

}

function eventHandlers(selectList) {
	selectList.addEventListener('change', event => {
		getDataFromAPI(event.target.value);
		removeEmptyOption();
	});
	mainCurrency.addEventListener('input', event => countCurrency())
}

getTopToUSDCurrencies();


