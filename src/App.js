import React, { Component } from 'react';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			topCurrencies: {},
			mainCurrency: {}
		}
	}

	componentWillMount() {
		this._fetchCurrencies();
	}

	_fetchCurrencies() {
		fetch('https://api.coinmarketcap.com/v2/ticker/')
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(currencies => {
				let mainCurrency = this._getMainCurrency(currencies);
				let topCurrencies = this._getTopCurrencies(currencies);
				this.setState({topCurrencies, mainCurrency});
			})
	}

	_getMainCurrency (currencies) {
		return  Object.values(currencies.data)
			.find(item => item.symbol === 'BTC');
	}

	_getTopCurrencies(currencies) {
		return Object.values(currencies.data)
			.sort((currency1, currency2) => currency2.quotes.USD.price - currency1.quotes.USD.price)
			.filter(cyrrency => cyrrency.symbol !== 'BTC')
			.splice(0, 10);
	}

	render() {
		return (
			<section>
				<p>Hello</p>
				<AmmountSelector symbol={this.state.mainCurrency.symbol} />
				<CurrencySelector currencies={this.state.topCurrencies} />
				<Output />
			</section>
		)
	}
}

class AmmountSelector extends Component {
	render() {
		return (
			<label>{this.props.symbol}
				<input type="number" min="1" defaultValue="1"/>
			</label>
		);
	}
}

class CurrencySelector extends Component {

	render() {
		console.log(this.props);
		return (
			<select>
				{Object.values(this.props.currencies).map((currency, i) => <option key={i}>{currency.symbol}</option>)}
			</select>
		);
	}
}

class Output extends Component {
	render() {
		return (
			<p>Choose currency, please</p>
		)
	}
}


export default App;
