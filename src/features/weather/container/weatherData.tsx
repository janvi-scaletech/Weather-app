import { useCallback, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
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
import { API_CONFIG } from 'shared/constants/api';
import Spinner from 'shared/components/spinner/spinner';
import { ISunriseData, IWeatherWidgetData } from '../interface/weather.interface';
import WeatherDescription from '../component/weatherDescription';
import HourlyForecast from '../component/hourlyForecast';
import SunriseSunset from '../component/SunriseSunset';
import WeatherForecast from '../component/weatherForecast';
import WeatherHeader from '../component/weatherHeader';
import WeeklyForecast from '../component/weeklyForecast';
import WeatherChart from '../component/forecastChart';
import '../styles/forecast.scss';

const WeatherData = () => {
	const [weatherData, setWeatherData] = useState<Record<string, any>>({});
	const [todayHourlyData, setTodayHourlyData] = useState([]);
	const [WeeklyHourlyData, setWeeklyHourlyData] = useState([]);

	const [weatherWidgetData, setWeatherWidgetData] = useState<IWeatherWidgetData[]>([]);
	const [sunriseData, setSunriseData] = useState<ISunriseData[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchWeatherAPI = useCallback((searchWord?: string) => {
		setIsLoading(true);
		HttpService.get(
			`${API_CONFIG.baseUrl}forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${
				searchWord ? searchWord : 'Ahmedabad'
			}&days=10&aqi=no&alerts=no`
		)
			.then((res) => {
				setWeatherData(res);
				setIsLoading(false);
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
				setIsLoading(false);
				notify('please enter valid city for search', 'error');
			});
	}, []);

	const handleSearch = debounce((value: string) => {
		fetchWeatherAPI(value);
	});

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
							<div className='flex'>
								<WeeklyForecast WeeklyHourlyData={WeeklyHourlyData} />
								<WeatherChart WeeklyHourlyData={WeeklyHourlyData} />
							</div>
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
			{isLoading && (
				<div className='display-flex-center height--full-viewport'>
					<Spinner />
				</div>
			)}

			{isEmpty(weatherData) && !isLoading && (
				<div className='display-flex-center pb--100'>
					<h3>No Data Found</h3>
				</div>
			)}
		</div>
	);
};

export default WeatherData;
