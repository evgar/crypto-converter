import React, { Component } from 'react';
import '../App.css';

class AmountSelector extends Component {
	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this)
	}

	render() {
		return (
			<label>{this.props.symbol}
				<input className="form-control" onChange={(e) => this._handleChange(e)} type="number" min="1" value={this.props.amount} />
			</label>
		);
	}

	_handleChange(event) {
		this.props.onAmmountSelectorChange(event.target.value);
	}
}

export default AmountSelector;