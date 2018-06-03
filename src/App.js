import React, { Component } from 'react';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			topCurrencies: {},
			mainCurrency: {},
			comparableCurrency: {
				value: null,
				symbol: ''
			},
			equivalentToBTC: null
		};
		this._handleCurrencyChange = this._handleCurrencyChange.bind(this);
		this._handleAmountChange = this._handleAmountChange.bind(this);
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
				this.setState({mainCurrency, topCurrencies});
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

	_handleAmountChange(value) {
		console.log(value);
	}

	_handleCurrencyChange(value, symbol) {
		let equivalentToBTC = value/ this.state.mainCurrency.quotes.USD.price;
		this.setState({comparableCurrency: {value, symbol}, equivalentToBTC});
	}

	render() {
		return (
			<section>
				<p>Hello</p>
				<AmmountSelector symbol={this.state.mainCurrency.symbol} onAmmountSelectorChange={this._handleAmountChange} />
				<CurrencySelector currencies={this.state.topCurrencies} onCurrencySelectorChange={this._handleCurrencyChange} />
				<Output mainSymbol={this.state.mainCurrency.symbol} equivalent={this.state.equivalentToBTC} comparedSymbol={this.state.comparableCurrency.symbol}/>
			</section>
		)
	}
}

class AmmountSelector extends Component {
	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this)
	}

	_handleChange(event) {
		this.props.onAmmountSelectorChange(event.target.value);
	}

	render() {
		return (
			<label>{this.props.symbol}
				<input onChange={(e) => this._handleChange(e)} type="number" min="1" defaultValue="1"/>
			</label>
		);
	}
}

class CurrencySelector extends Component {
	constructor(props) {
		super(props);
	}

	_handleChange(event) {
		let targetOption = Array.from(event.target.options).find(option => event.target.value === option.value);
		this.props.onCurrencySelectorChange(targetOption.value, targetOption.innerHTML);
	}

	render() {
		return (
			<select onChange={(e) => this._handleChange(e)}>
				{Object.values(this.props.currencies)
				.map((currency, i) =>
					<option key={i} value={currency.quotes.USD.price}>
						{currency.symbol}
					</option>)}
			</select>
		);
	}
}

class Output extends Component{
	render() {
		return (
		<div>
			{this.props.mainSymbol && this.props.equivalent && this.props.comparedSymbol &&
			<p> 1 {this.props.mainSymbol} = {this.props.equivalent} {this.props.comparedSymbol}</p>
			|| <p>Select currency, please</p>}
		</div>
			);

	}
}

export default App;
