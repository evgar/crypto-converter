import React, { Component } from "react";
import "../App.css";

class CurrencySelector extends Component {
	constructor() {
		super();
		this.state = {
			selected: false
		};
	}

	render() {
		let visibility = this.state.selected ? "" : "hidden";
		return (
			<select
				className="form-control"
				onChange={e => this._handleChange(e)}
				defaultValue="default"
			>
				<option disabled value="default" className={visibility}>
					Select currency
				</option>
				{Object.values(this.props.currencies).map((currency, i) => (
					<option key={i} value={currency.symbol}>
						{currency.symbol}
					</option>
				))}
			</select>
		);
	}

	_handleChange(event) {
		this.props.onCurrencySelectorChange(event.target.value);
	}
}

export default CurrencySelector;
