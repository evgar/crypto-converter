let compareCurrency;

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

function getTopToUSDCurrencies() {
		let allCurrencies = [];
		fetch('https://api.coinmarketcap.com/v2/ticker/')
		.then(response => response.json())
		.then(list => {
			allCurrencies = Object.values(list.data).sort((obj1, obj2) =>  {
				return obj2.quotes.USD.price - obj1.quotes.USD.price;
			}).splice(0,10);
			console.log(allCurrencies);
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
			compareCurrency = data[Object.keys(data)[0]]
			countCurrency(compareCurrency)})
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
	selectList.addEventListener('change', event => getDataFromAPI(event.target.value));
}

renderOptionsList(CURRENCIES);
getTopToUSDCurrencies();