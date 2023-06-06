import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const WeatherChart: FC<{ WeeklyHourlyData: Record<string, any>[] }> = ({ WeeklyHourlyData }) => {
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
		for (let i = 0; i < WeeklyHourlyData.length; i++) {
			let total = 0;
			let count = 0;

			// Iterate over each dataset to calculate the sum of temperatures for the day
			for (const dataset of WeeklyHourlyData) {
				const temperature = WeeklyHourlyData[i].day.avgtemp_c;
				total += temperature;
				count++;
			}

			const averageTemperature = total / count;
			averageTemperatures.push(averageTemperature);
		}

		return averageTemperatures;
	};

	const getAverageWindByDay = () => {
		const averageWind = [];

		// Iterate through the daily temperature data and calculate average temperature by day
		for (let i = 0; i < WeeklyHourlyData.length; i++) {
			let total = 0;
			let count = 0;

			// Iterate over each dataset to calculate the sum of temperatures for the day
			for (const dataset of WeeklyHourlyData) {
				const wind = WeeklyHourlyData[i].day.maxwind_kph;
				total += wind;
				count++;
			}

			const avgWind = total / count;
			averageWind.push(avgWind);
		}

		return averageWind;
	};

	const getAverageHumidityByDay = () => {
		const averageHumidity = [];
		for (let i = 0; i < WeeklyHourlyData.length; i++) {
			let totalHumidity = 0;
			let count = 0;

			// Iterate over each dataset to calculate the sum of temperatures for the day
			for (const dataset of WeeklyHourlyData) {
				const humidity = WeeklyHourlyData[i].day.avghumidity;
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
	const averageWind = getAverageWindByDay();

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
			},
			{
				label: 'Wind',
				data: averageWind,
				fill: false,
				borderColor: getRandomColor()
			}
		]
	};
	return (
		<div className='chart-wrapper border-radius--lg'>
			<h3 className='font-size--lg font--medium mb--10'>Average Weekly Temperature</h3>
			<Line style={{ maxWidth: '1150px', height: '400px' }} className='m--0-auto' data={chartData} />
		</div>
	);
};
export default WeatherChart;
