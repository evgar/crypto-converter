import React, { Component } from "react";
import "../App.css";
import AmountSelector from "./AmountSelector";
import CurrencySelector from "./CurrencySelector";
import Output from "./Output";

class App extends Component {
	constructor() {
		super();

		this.state = {
			isDataLoadedFromAPI: false,
			comparableCurrencySymbol: null,
			amount: 1,
			currentEquivalentToBTC: null
		};

		this.topCurrencies = [];
		this.mainCurrency = {};
	}

	componentWillMount() {
		this._fetchCurrencies();
	}

	_fetchCurrencies() {
		fetch("https://api.coinmarketcap.com/v2/ticker/")
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(currencies => {
				this.mainCurrency = this._getMainCurrency(currencies);
				this.topCurrencies = this._getTopCurrencies(currencies);
				this.setState({ isDataLoadedFromAPI: true });
			});
	}

	_getMainCurrency(currencies) {
		return Object.values(currencies.data).find(item => item.symbol === "BTC");
	}

	_getTopCurrencies(currencies) {
		return Object.values(currencies.data)
			.sort(
				(currency1, currency2) =>
					currency2.quotes.USD.price - currency1.quotes.USD.price
			)
			.filter(currency => currency.symbol !== "BTC")
			.splice(0, 10);
	}

	render() {
		return (
			<section>
				<h3>Currency converter</h3>
				<div className="form-control input-block">
					<AmountSelector
						symbol={this.mainCurrency.symbol}
						amount={this.state.amount}
						onAmmountSelectorChange={e => this._handleAmountChange(e)}
					/>
					<CurrencySelector
						currencies={this.topCurrencies}
						onCurrencySelectorChange={e => this._handleCurrencyChange(e)}
					/>
				</div>
				<Output
					amount={this.state.amount}
					mainSymbol={this.mainCurrency.symbol}
					equivalent={this.state.currentEquivalentToBTC}
					comparedSymbol={this.state.comparableCurrencySymbol}
				/>
			</section>
		);
	}

	_handleAmountChange(value) {
		this.setState({ amount: value });
	}

	_handleCurrencyChange(value) {
		let comparedCurrrency = this.topCurrencies.find(
			item => item.symbol === value
		);
		let equivalentToBTC =
			this.mainCurrency.quotes.USD.price / comparedCurrrency.quotes.USD.price;
		this.setState({
			currentEquivalentToBTC: equivalentToBTC,
			comparableCurrencySymbol: comparedCurrrency.symbol
		});
	}
}

export default App;
