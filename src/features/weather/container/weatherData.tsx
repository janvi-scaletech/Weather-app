import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { debounce } from 'shared/util/utility';
import HttpService from 'shared/services/http.service';
import { notify } from 'shared/components/notification/notification';
import { SunriseIcon, SunsetIcon, WindIcon } from 'shared/components/icons/icons';
import WeatherDescription from '../component/weatherDescription';
import HourlyForecast from '../component/hourlyForecast';
import SunriseSunset from '../component/SunriseSunset';
import WeatherForecast from '../component/weatherForecast';
import WeatherHeader from '../component/weatherHeader';
import '../styles/forcast.scss';

const WeatherData = () => {
	const [weatherData, setWeatherData] = useState<any>({});
	const [todayHourlyData, setTodayHourlyData] = useState([]);
	const [weatherWidgetData, setWeatherWidgetData] = useState<any>([]);
	const [sunriseData, setSunriseData] = useState<any>([]);

	console.log('weatherWidgetData', weatherWidgetData);

	const fetchWeatherAPI = useCallback((searchWord?: string) => {
		HttpService.get(
			`http://api.weatherapi.com/v1/forecast.json?key=1a86c128f38d457aab4173347230506&q=${
				searchWord ? searchWord : 'Ahmedabad'
			}&days=10&aqi=no&alerts=no`
		)
			.then((res) => {
				setWeatherData(res);
				setSunriseData([
					{
						text: 'Sunrise',
						value: res.forecast.forecastday[0].astro.sunrise,
						icon: <SunriseIcon className='sunrise-icon' />
					},
					{
						text: 'Sunset',
						value: res.forecast.forecastday[0].astro.sunset,
						icon: <SunsetIcon className='sunrise-icon' />
					}
				]);
				setWeatherWidgetData([
					{
						text: 'Wind Speed',
						data: `${res.current.vis_km} Km/h`,
						icon: <WindIcon className='wind-icon mr--20 ml--10' />
					},
					{
						text: 'Feels Like',
						data: `${res.current.feelslike_c}°C`,
						icon: <WindIcon className='wind-icon mr--20 ml--10' />
					},
					{
						text: 'Humidity',
						data: `${res.current.humidity}%`,
						icon: <WindIcon className='wind-icon mr--20 ml--10' />
					},
					{
						text: 'Visibility',
						data: `${res.current.vis_km} km`,
						icon: <WindIcon className='wind-icon mr--20 ml--10' />
					}
				]);
				setTodayHourlyData(res.forecast.forecastday[0].hour);
			})
			.catch((err: Error) => {
				console.log('err', err);
				notify('please enter valid city for search', 'error');
			});
	}, []);

	const handleSearch = debounce(
		useCallback((value: string) => {
			fetchWeatherAPI(value);
		}, [])
	);

	useEffect(() => {
		fetchWeatherAPI();
	}, []);

	return (
		<div>
			<div className='main-container'>
				{!isEmpty(weatherData) && (
					<div className='weather-info-wrapper flex '>
						<div className='weather-description'>
							<WeatherHeader handleSearch={handleSearch} />
							<hr className='mt--20 mb--20' />
							<WeatherDescription weatherWidgetData={weatherWidgetData} />

							{/* <div>
								<h3 className='font-size--lg font--medium'>Average Weekly Temperature</h3>
							</div> */}
						</div>
						<div className='weather-info overflow--auto-y'>
							<WeatherForecast weatherData={weatherData} />
							<HourlyForecast todayHourlyData={todayHourlyData} />
							<SunriseSunset sunriseData={sunriseData} />
						</div>

						<div></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default WeatherData;
