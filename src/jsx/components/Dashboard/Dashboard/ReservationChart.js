import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {toast} from "react-toastify";
import axios from "../../../../services/axios";
import {getDailyData, getMonthlyArray, getMonthlyData, getWeeklyData, getYearlyData} from "../../../../services/util";
import {token} from "../../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
const fs = require('fs')

const ReservationChart = props => {

	const [series, setSeries] = useState([{
		name: 'Views',
		data: []
	}, {
		name: 'Comments',
		data: []
	}]);

	const [options] = useState({
		chart: {
			height: 10,
			type:'area',
			toolbar:{
				show:false
			}
		},
		colors:["#1362FC","#FF6E5A"],
		dataLabels: {
			enabled: false
		},
		stroke: {
			width:6,
			curve: 'smooth',
		},
		legend:{
			show:false
		},
		grid:{
			borderColor: '#EBEBEB',
			strokeDashArray: 6,
		},
		markers:{
			strokeWidth: 6,
			hover: {
				size: 15,
			}
		},
		yaxis: {
			labels: {
				offsetX:-12,
				style: {
					colors: '#787878',
					fontSize: '13px',
					fontFamily: 'Poppins',
					fontWeight: 400
				}
			},
		},
		xaxis: {
			categories: Array(30).fill(0).map((item, index) => {
				// const date = new Date();
				// date.setDate(date.getDate() - index+1);
				return`${index+1}`
			}).reverse(),
			labels:{
				style: {
					colors: '#787878',
					fontSize: '13px',
					fontFamily: 'Poppins',
					fontWeight: 400
				},
			}
		},
		fill:{
			type:"solid",
			opacity:0.1
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm'
			},
		},
	});

	useEffect(async () => {
		await getData();
	}, []);

	const getData = async () => {
		try {
			const views = await axios.get('/views', {headers: {Authorization: props.token}});
			const comments = await axios.get('/comments', {headers: {Authorization: props.token}});

			console.log(getMonthlyArray(views.data))

			setSeries([{
				name: 'Views',
				data: getMonthlyArray(views.data)
			}, {
				name: 'Comments',
				data: getMonthlyArray(comments.data)
			}])
		}
		catch(err){
			if (err.response) {
				toast.error(err.response.data.message);
			} else {
				toast.error(err.message);
			}
		}
	}

	return(
		<div id="chart" >
			<ReactApexChart
				options={options}
				series={series}
				type="area"
				height={400}
			/>
		</div>
	)
}

const mapStateToProps = (state) => {
		return {
			token: token(state),
		};
	}
;

export default connect(mapStateToProps)(ReservationChart);