import { ReactElement } from 'react';

export interface IWeatherData {}
export interface IWeatherWidgetData {
	text: string;
	data: number | string;
	icon: ReactElement<SVGElement>;
}
export interface ISunriseData {
	text: string;
	value: number | string;
	icon: ReactElement<SVGElement>;
}
