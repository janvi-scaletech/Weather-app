import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { debounce } from 'shared/util/utility';
import HttpService from 'shared/services/http.service';
import { notify } from 'shared/components/notification/notification';
import {
	FeelLikeIcon,
	HumidityIcon,
	SunriseIcon,
	SunsetIcon,
	VisibilityIcon,
	WindIcon
} from 'shared/components/icons/icons';
import WeatherDescription from '../component/weatherDescription';
import HourlyForecast from '../component/hourlyForecast';
import SunriseSunset from '../component/SunriseSunset';
import WeatherForecast from '../component/weatherForecast';
import WeatherHeader from '../component/weatherHeader';
import '../styles/forcast.scss';
import WeeklyForecast from '../component/weeklyForcast';
import WeatherChart from '../component/forcastChart';

const WeatherData = () => {
	const [weatherData, setWeatherData] = useState<any>({});
	const [todayHourlyData, setTodayHourlyData] = useState([]);
	const [WeeklyHourlyData, setWeeklyHourlyData] = useState([]);

	const [weatherWidgetData, setWeatherWidgetData] = useState<any>([]);
	const [sunriseData, setSunriseData] = useState<any>([]);

	const fetchWeatherAPI = useCallback((searchWord?: string) => {
		HttpService.get(
			`http://api.weatherapi.com/v1/forecast.json?key=1a86c128f38d457aab4173347230506&q=${
				searchWord ? searchWord : 'Ahmedabad'
			}&days=10&aqi=no&alerts=no`
		)
			.then((res) => {
				console.log(res, 'res');
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
						icon: <FeelLikeIcon className='wind-icon mr--20 ml--10' />
					},
					{
						text: 'Humidity',
						data: `${res.current.humidity}%`,
						icon: <HumidityIcon className='wind-icon mr--20 ml--10' />
					},
					{
						text: 'Visibility',
						data: `${res.current.vis_km} km`,
						icon: <VisibilityIcon className='wind-icon mr--20 ml--10' />
					}
				]);
				setTodayHourlyData(res.forecast.forecastday[0].hour);
				setWeeklyHourlyData(res.forecast.forecastday);
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
						<div className='weather-description overflow--auto'>
							<WeatherHeader handleSearch={handleSearch} />
							<hr className='mt--20 mb--20' />
							<WeatherDescription weatherWidgetData={weatherWidgetData} />
							<hr className='mt--20 mb--20' />
							<WeeklyForecast WeeklyHourlyData={WeeklyHourlyData} />
							<hr className='mt--20 mb--20' />
							<WeatherChart hourlyData={WeeklyHourlyData} />
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
