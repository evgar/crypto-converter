function getDataFromAPI() {
	fetch('https://api.coinmarketcap.com/v2/ticker/')
		.then(response =>  {
			console.log(response);
			response.json()
		})
		.then(data => data)
		.catch(error => console.log('Request failed' + error));
}

export {getDataFromAPI};