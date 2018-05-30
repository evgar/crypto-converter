const CURRENCIES = {
	'Bit20': 'BCH',
	'Limited Coin': 'ETH',
	'Project-X': 'DASH',
	'42Coin': 'ZEC',
	'bitBTC': 'XMR',
	'Remicoin': 'LTC',
	'IDEX Membership': 'DCR',
	'SyncCoin': 'NEO',
	'YbCoin': 'BTG',
	'bitGold': 'ELA'
};

function renderOptionsList(currencies) {
	const SELECT_LIST = document.querySelector('#currenciesList');
	let selectHTML = Object.keys(currencies).map(item => optionTemplate(currencies[item])).join('');
	SELECT_LIST.innerHTML = selectHTML;
	eventHandlers(SELECT_LIST);
};

function getDataFromAPI(value) {
	fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=' + value)
		.then(response =>  response.json())
		.then(data => countCurrency(data[Object.keys(data)[0]]))
		.catch(error => alert('Request failed' + error));
}

function countCurrency(price) {
	const AMMOUNT_INPUT = document.querySelector('#comparableCurrency');
	console.log(price*AMMOUNT_INPUT.value);
}

function optionTemplate(currencyCode) {
	return `
	<option>${currencyCode}</option>
`
};

function eventHandlers(selectList) {
	console.log(selectList.value);
	selectList.addEventListener('change', event => getDataFromAPI(event.srcElement.value));
}

renderOptionsList(CURRENCIES);