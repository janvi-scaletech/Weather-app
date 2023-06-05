import isEmpty from 'lodash/isEmpty';
import React, { FC } from 'react';
interface IWeatherDescriptionProps {
	weatherWidgetData: any;
}
const WeatherDescription: FC<IWeatherDescriptionProps> = ({ weatherWidgetData }) => {
	return (
		<div>
			<h3 className='font-size--lg mb--30 font--medium'>Today overview</h3>
			<div className='flex flex--wrap'>
				{!isEmpty(weatherWidgetData) &&
					weatherWidgetData.map((data: any) => {
						return (
							<div className='wind-information-wrapper mr--20 mb--20 flex'>
								<div className='display-flex-center'>{data.icon}</div>
								<div>
									<p className='date-info pt--10'>{data.text}</p>
									<h3 className='font-size--26 font--semi-bold'>{data.data}</h3>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default WeatherDescription;
