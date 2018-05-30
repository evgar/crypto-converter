let compareCurrency;
let currencies = [];
const mainCurrency = document.querySelector('.comparable-currency');

function getTopToUSDCurrencies() {
		fetch('https://api.coinmarketcap.com/v2/ticker/')
		.then(response => response.json())
		.then(list => {
			Object.values(list.data).sort((obj1, obj2) =>  {
				return obj2.quotes.USD.price - obj1.quotes.USD.price;
			}).splice(0,10).forEach(item => currencies.push(item.symbol));
			renderOptionsList(currencies);
		});
}

function renderOptionsList(currencies) {
	const SELECT_LIST = document.querySelector('#currenciesList');
	let selectHTML = Object.keys(currencies).map(item => optionTemplate(currencies[item])).join('');
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
	console.log(compareCurrency * mainCurrency.value);
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


