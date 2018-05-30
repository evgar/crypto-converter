let compareCurrency;
let currencies = [];
let mainCurrency = document.querySelector('.comparable-currency');

function getTopToUSDCurrencies() {
		fetch('https://api.coinmarketcap.com/v2/ticker/')
		.then(response => response.json())
		.then(list => {
			currencies = Object.values(list.data)
					.filter(item => item.symbol !== 'BTC')
					.sort((obj1, obj2) => obj2.quotes.USD.price - obj1.quotes.USD.price)
					.splice(0, 10)
					.map(item => item.symbol);
			console.log(currencies);
			renderOptionsList(currencies);
		});
}

function renderOptionsList(currencies) {
	const SELECT_LIST = document.querySelector('.currencies-list');
	let emptyOption = `<option disabled selected value> Select currency </option>`;
	let selectHTML = emptyOption + Object.keys(currencies).map(item => optionTemplate(currencies[item])).join('');
	SELECT_LIST.innerHTML = selectHTML;
	eventHandlers(SELECT_LIST);
};

function getDataFromAPI(value) {
	fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=' + value)
		.then(response =>  response.json())
		.then(data => {
			compareCurrency = data[Object.keys(data)[0]];
			countCurrency(compareCurrency)})
		.catch(error => console.log('Request failed' + error));
}

function countCurrency() {
	removeEmptyOption();
	if(!compareCurrency) {
		console.log('Select currency to compare please');
	}else {
		console.log(compareCurrency * mainCurrency.value);
	}
}

function removeEmptyOption () {
	let currenciesList = document.querySelector('.currencies-list');
	currenciesList.removeChild(currenciesList.childNodes[0]);
}

function optionTemplate(currencyCode) {
	return `
	<option>${currencyCode}</option>
`
};

function eventHandlers(selectList) {
	selectList.addEventListener('change', event => getDataFromAPI(event.target.value));
	mainCurrency.addEventListener('change', event => countCurrency())
}

getTopToUSDCurrencies();


