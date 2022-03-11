import React from "react";
import ReactApexChart from "react-apexcharts";

class RadialDount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				chart: {
					type: 'radialBar',
					height: 150,
					sparkline: {
						enabled: true
					}
				},

				colors:['var(--primary)'],
				plotOptions: {
					radialBar: {
						hollow: {
							size: '35%',
						},
						dataLabels: {
							show: false,
						}
					},
				},
				labels: [''],

			},
		};
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={[this.props.series]}
				  type="radialBar"
				  height={150}
				/>
			</div>
		);
	}
}

export default RadialDount;