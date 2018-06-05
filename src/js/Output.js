import React, { Component } from "react";
import "../App.css";

class Output extends Component {
	render() {
		let allPropsAreSetted = Object.values(this.props).every(
			item => item !== null || undefined
		);
		let totalAmount = (this.props.equivalent * this.props.amount).toFixed(3);
		return (
			<div>
				{allPropsAreSetted ? (
					<p>
						{this.props.amount} {this.props.mainSymbol} = {totalAmount}
						{this.props.comparedSymbol}
					</p>
				) : (
					<p className="output">Select currency, please</p>
				)}
			</div>
		);
	}
}

export default Output;
