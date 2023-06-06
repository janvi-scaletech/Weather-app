import { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ISunriseData } from '../interface/weather.interface';

interface ISunriseSunsetProps {
	sunriseData: ISunriseData[];
}
const SunriseSunset: FC<ISunriseSunsetProps> = ({ sunriseData }) => {
	return (
		<div className='mt--60'>
			<h3 className='font-size--22 mb--20 mt--20'>Sunrise & Sunset</h3>
			<div>
				{!isEmpty(sunriseData) &&
					sunriseData.map(({ text, icon, value }: any, index: number) => {
						return (
							<div
								className='sunrise-wrapper flex align-items--center justify-content--between '
								key={index}
							>
								{icon}
								<div>
									<p className='font-size--26 font--medium'>{text}</p>
									<p className='font-size--24 font--bold '>{value}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SunriseSunset;
