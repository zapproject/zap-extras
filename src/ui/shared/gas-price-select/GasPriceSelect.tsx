import * as React from 'react';
const style = require('./gas-price-select.css');

interface State {
	prices: Array<{name: string; value: string; wait: string}>;
}

interface Props {
	value: string;
	onSelect: (value: string) => void;
}

export class GasPriceSelect extends React.PureComponent<Props, State> {
	state = {
		prices: [],
	};

	componentDidMount() {
		this.getEstimateGasPrice();
	}

	getEstimateGasPrice() {
		fetch('https://ethgasstation.info/json/ethgasAPI.json').then(response => response.json()).then(json => {
			this.setState({
				prices: [
					{name: 'Fastest', value: '' + json.fastest, wait: json.fastestWait},
					{name: 'Fast', value: '' + json.fast, wait: json.fastWait},
					{name: 'Average', value: '' + json.average, wait: json.avgWait},
					{name: 'Safe Low', value: '' + json.safeLow, wait: json.safeLowWait},
				],
			});
			this.props.onSelect('' + json.average);
		});
	}

	render() {
		const { prices } = this.state;
		const { onSelect, value } = this.props;
		return (
			<div className={style['gas-price-select']}>
				{prices.map(price =>
					<button type="button" className={(value === price.value ? style['gas-price-selected'] : '') + ' ' + style['gas-price']} onClick={() => onSelect(price.value)} key={price.name+price.value}>
						<div>{price.name}</div>
						<div>~ {price.wait} sec</div>
						<div>
							{price.value} Gwei
						</div>
					</button>)}
			</div>
		);
	}
}
