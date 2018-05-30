const CURRENCIES = {
	'Bit20': 'BTWTY',
	'Limited Coin': 'LTD',
	'Project-X': 'NANOX',
	'42Coin': '42',
	'bitBTC': 'BITBTC',
	'Remicoin': 'RMC',
	'IDEX Membership': 'IDXM',
	'SyncCoin': 'SYNC',
	'YbCoin': 'YBC',
	'bitGold': 'BITGOLD'
};

function renderOptionsList(currencies) {
	const SELECTLIST = document.querySelector('#currenciesList');
	let selectHTML = Object.keys(currencies).map(item => optionTemplate(currencies[item])).join('');
	SELECTLIST.innerHTML = selectHTML;
};

function optionTemplate(currencyCode) {
	return `
	<option>${currencyCode}</option>
`
};

renderOptionsList(CURRENCIES);