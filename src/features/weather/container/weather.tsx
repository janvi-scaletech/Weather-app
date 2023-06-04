import React, { useEffect, useState } from 'react';
import { API_CONFIG } from 'shared/constants/api';
import moment from 'moment';
import '../styles/forcast.scss';
import { debounce } from 'shared/util/utility';
import { isEmpty } from 'lodash';

const WeatherData = () => {
	const [lat, setLat] = useState(0);
	const [long, setLong] = useState(0);
	// const [weatherData, setWeatherData] = useState<any>([]);
	const [cityName, setCityName] = useState<any>(null);
	const [search, setSearch] = useState('surat');

	console.log('cityName', cityName);

	const fetchWeatherAPI = () => {
		// lat &&
		// 	long > 0 &&
		// fetch(
		// 	`${API_CONFIG.baseUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
		// )
		fetch(`${API_CONFIG.baseUrl}/weather?q=${search}&APPID=${process.env.REACT_APP_API_KEY}`)
			.then((res) => res.json())
			.then((result) => {
				// setWeatherData(result);
				setCityName(result);
				console.log(result);
			})
			.catch((err: Error) => {
				setCityName(null);
				console.error('Error', err);
			});
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});

		search && fetchWeatherAPI();
	}, [search]);

	const handleSearch = debounce((value: string) => setSearch(value));
	return (
		<div>
			{/* <h1>{weatherData && weatherData.name}</h1>
			<p>Temp: {weatherData && weatherData.main.temp}</p>
			<p>Description :{weatherData.weather[0].description}</p>
			<p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
			<p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
			<p>Humidity: {weatherData.main.humidity} %</p>

			<p>Day: {moment().format('dddd')}</p>
			<p>Date: {moment().format('LL')}</p>
			<p>visibility :{weatherData.visibility}</p> */}

			<h3>{search}</h3>
			<p>{cityName && cityName.main?.temp}</p>
			{!isEmpty(cityName) ? (
				<div>
					<input
						type='search'
						className='input'
						onChange={(e) => {
							handleSearch(e.target.value);
						}}
					/>
				</div>
			) : (
				<p>No Data</p>
			)}
		</div>
	);
};

export default WeatherData;
