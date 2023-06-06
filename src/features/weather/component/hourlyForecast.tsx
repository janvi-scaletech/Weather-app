import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
interface IHourlyDataProps {
	todayHourlyData: Record<string, any>;
}
const HourlyForecast: FC<IHourlyDataProps> = ({ todayHourlyData }) => {
	return (
		<div className='hour-wrapper mt--60'>
			<h3 className='font-size--22 mb--30 mt--30'>Hourly Forecast</h3>
			<div className='hour-data flex overflow--auto-x'>
				{!isEmpty(todayHourlyData) &&
					todayHourlyData.map((data: any, index: number) => {
						return (
							<div className='ml--20' key={index}>
								<p className='font-size--sm'>{moment.unix(data.time_epoch).format('LT')}</p>
								<img src={data.condition.icon} />
								<p className='font-size--sm mb--20'>{data.temp_c} °C</p>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default HourlyForecast;
