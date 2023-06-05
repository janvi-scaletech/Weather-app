import { FC } from 'react';
import moment from 'moment';
import { CloudIcon } from 'shared/components/icons/icons';

interface IWeatherDataProps {
	weatherData: any;
}
const WeatherForecast: FC<IWeatherDataProps> = ({ weatherData }) => {
	return (
		<div>
			<div className='pt--15 flex justify-content--between'>
				<div>
					<h2 className='font-size--26 font--medium'>{weatherData?.location.name}</h2>
					<p>{weatherData.location.country}</p>
				</div>
				<h3 className='font-size--lg font--medium pt--40'>
					{moment.unix(weatherData?.current.last_updated_epoch).format('LT')}
				</h3>
			</div>
			<div className='mt--30'>
				<CloudIcon className='' />
				<div className='flex align-items--center justify-content--between'>
					<h3>{weatherData?.current?.temp_c}°C</h3>
					<p>{weatherData?.current.condition.text}</p>
				</div>
				<hr />
			</div>
		</div>
	);
};

export default WeatherForecast;
