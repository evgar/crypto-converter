import React, { Component } from 'react';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			isDataLoadedFromAPI: false,
			comparableCurrency: {},
			amount: 1,
			currentEquivalentToBTC: null
		};

		this.topCurrencies = [];
		this.mainCurrency = {};
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
				this.mainCurrency = this._getMainCurrency(currencies);
				this.topCurrencies = this._getTopCurrencies(currencies);
				this.setState({isDataLoadedFromAPI: true});
				// this.setState({mainCurrency, topCurrencies});
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
		// let newEquvalent = this.state.currentEquivalentToBTC * value;
		this.setState((prevState,props) => ({amount: value}));
	}

	_handleCurrencyChange(value, symbol) {

		let equivalentToBTC = Math.round(((value / this.mainCurrency.quotes.USD.price) * 1000)) / 1000;
		this.setState({comparableCurrency: {value, symbol}, currentEquivalentToBTC: {equivalentToBTC}});
	}

	render() {

		return (
			<section>
				<p>Hello</p>
				<AmmountSelector symbol={this.mainCurrency.symbol} amount={this.state.amount} onAmmountSelectorChange={this._handleAmountChange} />
				<CurrencySelector currencies={this.topCurrencies} onCurrencySelectorChange={this._handleCurrencyChange} />
				<Output amount={this.state.amount} mainSymbol={this.mainCurrency.symbol}
						equivalent={this.state.currentEquivalentToBTC} comparedSymbol={this.state.comparableCurrency.symbol}/>
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
				<input onChange={(e) => this._handleChange(e)} type="number" min="1" value={this.props.amount} />
			</label>
		);
	}
}

class CurrencySelector extends Component {

	constructor() {
		super();
		this.state = {
			selected: false
		}
	}

	_handleChange(event) {
		let targetOption = Array.from(event.target.options).find(option => event.target.value === option.value);
		this.props.onCurrencySelectorChange(targetOption.value, targetOption.attributes['symbol'].value);
		console.log(this.props);
	}

	render() {
		let visibility = this.state.selected ? '' : 'hidden';

		return (
			<select onChange={(e) => this._handleChange(e)} defaultValue='default'>
				<option disabled value='default' className={visibility}> Select currency </option>
				{Object.values(this.props.currencies)
				.map((currency, i) =>
					<option key={i} value={currency.quotes.USD.price} symbol={currency.symbol}>
						{currency.symbol}
					</option>)}
			</select>
		);
	}
}

class Output extends Component{
	_countEquivalent(amount, equivalent) {
		return Object.values(equivalent)[0] * amount;
	}

	render() {
		// let allPropsAreSetted = Object.values(this.props).every(item => item !== null || undefined);
		let allPropsAreSetted = Object.values(this.props).every(item => !!item);
		return (
		<div>
			{allPropsAreSetted
				? <p> {this.props.amount} {this.props.mainSymbol} = {this._countEquivalent(this.props.amount, this.props.equivalent)} {this.props.comparedSymbol}</p>
				: <p>Select currency, please</p>
			}
		</div>
		);
	}
}

export default App;
