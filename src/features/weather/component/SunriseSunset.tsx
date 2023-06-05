import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';

interface ISunriseSunsetProps {
	sunriseData: any;
}
const SunriseSunset: FC<ISunriseSunsetProps> = ({ sunriseData }) => {
	return (
		<div>
			<h3 className='font-size--22 mb--20'>Sunrise & Sunset</h3>
			<div>
				{!isEmpty(sunriseData) &&
					sunriseData.map(({ text, icon, value }: any) => {
						return (
							<div className='sunrise-wrapper flex align-items--center justify-content--between '>
								{icon}
								<div>
									<p>{text}</p>
									<p>{value}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SunriseSunset;
