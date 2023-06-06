import React, { FC } from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
interface IWeeklyProps {
	WeeklyHourlyData: Record<string, any>;
}
const WeeklyForecast: FC<IWeeklyProps> = ({ WeeklyHourlyData }) => {
	return (
		<div className='width--full'>
			<h3 className='font-size--lg mb--10 font--medium'>Weekly Forecast</h3>
			<div className='weekly-forecast-wrapper overflow--auto'>
				{!isEmpty(WeeklyHourlyData) &&
					WeeklyHourlyData.map((data: any, index: number) => {
						return (
							<div className='' key={index}>
								<div className='flex align-items--center'>
									<p className='width--25'>{moment(data.date).format('dddd')}</p>
									<img className='mr--30 weekly-icon' src={data.day.condition.icon} />
									<p className='mr--10 min-value'>{data.day.mintemp_c}°</p>
									<div className='progress'>
										<div className='progress-value'></div>
									</div>

									<p className='ml--10'>{data.day.maxtemp_c}°</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default WeeklyForecast;
