import React, { Component } from "react";
import "../App.css";

class AmountSelector extends Component {
	render() {
		return (
			<label>
				{this.props.symbol}
				<input
					value={this.props.amount}
					className="form-control"
					onChange={e => this._handleChange(e)}
					type="number"
					min="1"
				/>
			</label>
		);
	}

	_handleChange(event) {
		this.props.onAmmountSelectorChange(event.target.value);
	}
}

export default AmountSelector;
