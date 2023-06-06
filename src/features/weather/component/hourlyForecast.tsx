import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
interface IHourlyDataProps {
	todayHourlyData: any;
}
const HourlyForecast: FC<IHourlyDataProps> = ({ todayHourlyData }) => {
	return (
		<div>
			<h3 className='font-size--22 mb--20'>Hourly Forecast</h3>
			<div className='flex overflow--auto-x'>
				{!isEmpty(todayHourlyData) &&
					todayHourlyData.map((data: any) => {
						return (
							<div className='ml--20'>
								<p className='font-size--sm'>{moment.unix(data.time_epoch).format('LT')}</p>
								<img src={data.condition.icon} />
								<p className='font-size--sm'>{data.temp_c} °C</p>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default HourlyForecast;
