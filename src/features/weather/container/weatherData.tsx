import React, { useEffect, useState } from 'react';
import { API_CONFIG } from 'shared/constants/api';
import moment from 'moment';
import '../styles/forcast.scss';
import { debounce } from 'shared/util/utility';
import { isEmpty } from 'lodash';
import Image from 'assets/images/img1.avif';
import { CloudIcon, SunriseIcon, SunsetIcon, WindIcon } from 'shared/components/icons/icons';

const WeatherData = () => {
	const [lat, setLat] = useState(0);
	const [long, setLong] = useState(0);
	const [weatherData, setWeatherData] = useState<any>([]);
	const [cityName, setCityName] = useState<any>(null);
	const [search, setSearch] = useState('surat');

	const fetchWeatherAPI = () => {
		lat &&
			long > 0 &&
			fetch(
				`${API_CONFIG.baseUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
			)
				// fetch(`${API_CONFIG.baseUrl}/weather?q=${search}&APPID=${process.env.REACT_APP_API_KEY}`)
				.then((res) => res.json())
				.then((result) => {
					setWeatherData(result);
					// setCityName(result);
					console.log(result);
				})
				.catch((err: Error) => {
					// setCityName(null);
					console.log('err', err);
					// console.error('Error', err);
				});
	};

	const handleSearch = debounce((value: string) => setSearch(value));

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});

		fetchWeatherAPI();
	}, [lat, long]);

	return (
		<div>
			{/* <h3>{search}</h3>
			<p>{cityName && cityName.main?.temp}</p>
			{!isEmpty(cityName) && (
				<div>
					<input
						type='search'
						className='input'
						onChange={(e) => {
							handleSearch(e.target.value);
						}}
					/>
				</div>
			)} */}

			<div className='main-container'>
				<div className='weather-info-wrapper flex'>
					<div className='weather-description'>
						<div>
							<h3 className='font--extra-bold font-size--26'>
								{moment().format('MMMM')} {moment().format('YYYY')}
							</h3>
							<p className='date-info '>
								{' '}
								{moment().format('dddd')} {moment().format('LL')}
							</p>
						</div>
						<hr className='mt--20 mb--20' />
						<h3 className='font-size--lg mb--30 font--medium'>Today overview</h3>
						<div className='flex'>
							<div className='wind-information-wrapper mr--20 mb--20 flex'>
								<div className='display-flex-center'>
									<WindIcon className='wind-icon mr--20 ml--10' />
								</div>
								<div>
									<p className='date-info pt--10'>Wind Speed</p>
									<h3 className='font-size--26 font--semi-bold'>{weatherData.wind.speed}Km /h</h3>
								</div>
							</div>
							<div className='wind-information-wrapper mr--20 mb--20 flex'>
								<div className='display-flex-center'>
									<WindIcon className='wind-icon mr--20 ml--10' />
								</div>
								<div>
									<p className='date-info pt--10'>Feels Like</p>
									<h3 className='font-size--26 font--semi-bold'>{weatherData.main.feels_like}</h3>
								</div>
							</div>
						</div>
						<div className='flex'>
							<div className='wind-information-wrapper mr--20 mb--20 flex'>
								<div className='display-flex-center'>
									<WindIcon className='wind-icon mr--20 ml--10' />
								</div>
								<div>
									<p className='date-info pt--10'>Humidity</p>
									<h3 className='font-size--26 font--semi-bold'>{weatherData.main.humidity}%</h3>
								</div>
							</div>
							<div className='wind-information-wrapper mr--20 mb--20 flex'>
								<div className='display-flex-center'>
									<WindIcon className='wind-icon mr--20 ml--10' />
								</div>
								<div>
									<p className='date-info pt--10'>Visibility</p>
									<h3 className='font-size--26 font--semi-bold'>4 km</h3>
								</div>
							</div>
						</div>
						<div>
							<h3 className='font-size--lg font--medium'>Average Weekly Temperature</h3>
						</div>
					</div>
					<div className='weather-info '>
						<div className='pt--15 flex justify-content--between'>
							<div>
								<h2 className='font-size--26 font--medium'>{weatherData.name}</h2>
								<p>India</p>
							</div>
							<h3 className='font-size--lg font--medium pt--40'>{weatherData.timezone}</h3>
						</div>
						<div className='mt--30'>
							<CloudIcon className='' />
							<div className='flex align-items--center justify-content--between'>
								<h3>{weatherData.main.temp}</h3>
								<p>{weatherData.weather[0].description}</p>
							</div>
							<hr />
						</div>
						<div>
							<h3 className='font-size--22'>Sunrise & Sunset</h3>
							<div>
								<div className='sunrise-wrapper flex align-items--center justify-content--between'>
									<SunriseIcon className='sunrise-icon' />
									<div>
										<p>Sunrise</p>
										<p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
									</div>
									<p> 4 hour ago</p>
								</div>
								<div className='sunrise-wrapper flex align-items--center justify-content--between mt--20'>
									<SunsetIcon className='sunrise-icon' />
									<div>
										<p>Sunset</p>
										<p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
									</div>
									<p> in 9 hours </p>
								</div>
							</div>
						</div>
					</div>

					<div></div>
				</div>
			</div>
		</div>
	);
};

export default WeatherData;
