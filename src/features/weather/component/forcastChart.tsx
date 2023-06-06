import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const WeatherChart: FC<{ hourlyData: any[] }> = ({ hourlyData }) => {
	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const getAverageTemperaturesByDay = () => {
		const averageTemperatures = [];

		// Iterate through the daily temperature data and calculate average temperature by day
		for (let i = 0; i < hourlyData.length; i++) {
			let total = 0;
			let count = 0;

			// Iterate over each dataset to calculate the sum of temperatures for the day
			for (const dataset of hourlyData) {
				const temperature = hourlyData[i].day.avgtemp_c;
				total += temperature;
				count++;
			}

			const averageTemperature = total / count;
			averageTemperatures.push(averageTemperature);
		}

		return averageTemperatures;
	};

	const getAverageHumidityByDay = () => {
		const averageHumidity = [];
		for (let i = 0; i < hourlyData.length; i++) {
			let totalHumidity = 0;
			let count = 0;

			// Iterate over each dataset to calculate the sum of temperatures for the day
			for (const dataset of hourlyData) {
				const humidity = hourlyData[i].day.avghumidity;
				totalHumidity += humidity;
				count++;
			}
			const avgHumidity = totalHumidity / count;
			averageHumidity.push(avgHumidity);
		}
		return averageHumidity;
	};

	const averageTemperatures = getAverageTemperaturesByDay();
	const averageHumidity = getAverageHumidityByDay();

	const chartData = {
		labels: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Add more weeks as needed
		datasets: [
			{
				label: 'Average Temperature',
				data: averageTemperatures,
				fill: false,
				borderColor: getRandomColor()
			},
			{
				label: 'Humidity',
				data: averageHumidity,
				fill: false,
				borderColor: getRandomColor()
			}
		]
	};
	return (
		<div className='chart-wrapper border-radius--lg'>
			<h3 className='font-size--lg font--medium mt--30'>Average Weekly Temperature</h3>
			<Line style={{ width: '100%', height: '300px' }} className='m--0-auto' data={chartData} />
		</div>
	);
};
export default WeatherChart;
