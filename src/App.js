import React, { Component } from 'react';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			list: [],
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
				this._getMainCurrency(currencies);
				this.setState({list: {currencies}})
			})
	}

	_getMainCurrency (currencies) {
		let mainCurrency =  Object.values(currencies.data).find(item => item.symbol === 'BTC');
		this.setState({mainCurrency});
	}

	render() {
		return (
			<section>
				<p>Hello</p>
				<AmmountSelector symbol={this.state.mainCurrency.symbol}/>
				<CurrencySelector />
				<Output />
			</section>
		)
	}
}

class AmmountSelector extends Component {
	render() {
		return (
			<label>{this.props.symbol}
				<input type="number" min="1" value="1" />
			</label>
		);
	}
}

class CurrencySelector extends Component {
	render() {
		return (
			<select>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
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
