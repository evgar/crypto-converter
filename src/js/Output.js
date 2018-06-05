import React, { Component } from 'react';
import '../App.css';

class Output extends Component{

	render() {
		let allPropsAreSetted = Object.values(this.props).every(item => item !== null || undefined);

		return (
			<div>
				{allPropsAreSetted
					? <p> {this.props.amount} {this.props.mainSymbol} = {this.props.equivalent * this.props.amount} {this.props.comparedSymbol}</p>
					: <p>Select currency, please</p>
				}
			</div>
		);
	}
}

export default Output