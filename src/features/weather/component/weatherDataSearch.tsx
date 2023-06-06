import React, { FC } from 'react';
import { SearchIcon } from 'shared/components/icons/icons';

interface ISearchProps {
	handleSearch: (value: string) => void;
}
const WeatherDataSearch: FC<ISearchProps> = ({ handleSearch }) => {
	return (
		<div className='search-wrapper position--relative width--50 flex align-items--center justify-content--end'>
			<SearchIcon className='search-icon position--absolute ml--5' />
			<input
				type='text'
				className='search-input width--full'
				onChange={(e) => handleSearch(e.target.value)}
				placeholder='Search location here'
			/>
		</div>
	);
};

export default WeatherDataSearch;
