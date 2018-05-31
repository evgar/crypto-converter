import React, { Component } from 'react';
import './App.css';


class App extends Component {
	render() {
		return (
			<section>
				<p>Hello</p>
				<AmmountSelector />
				<CurrencySelector />
				<Output />
			</section>)
	}
}

class AmmountSelector extends Component {
	render() {
		return (<input type="number" min="1" value="1" />);
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
