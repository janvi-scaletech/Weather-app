import React, { FC } from 'react';
import WeatherDataSearch from './weatherDataSearch';
import moment from 'moment';

interface IWeatherHeaderProps {
	handleSearch: (value: string) => void;
}

const WeatherHeader: FC<IWeatherHeaderProps> = ({ handleSearch }) => {
	return (
		<div className='flex justify-content--between width--full'>
			<div className='width--50'>
				<h3 className='font--extra-bold font-size--26'>
					{moment().format('MMMM')} {moment().format('YYYY')}
				</h3>
				<p className='date-info '>
					{moment().format('dddd')} {moment().format('LL')}
				</p>
			</div>
			<WeatherDataSearch handleSearch={handleSearch} />
		</div>
	);
};

export default WeatherHeader;
