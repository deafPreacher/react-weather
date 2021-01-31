import React from 'react';
import {useHistory} from 'react-router-dom';
import {getNightClass} from '../utils/helpers.js';
import Page from './Page';
import './Home.css';

const Home = ({nightMode}) => {

	const history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();
		const city = e.target.searchQuery.value;
		console.log(city);
		history.push(`/weather/${city}`)
		e.target.searchQuery.value = '';
	}

	return (
			<Page>
				<div className={getNightClass('Home', nightMode)}>
					<form onSubmit={submitHandler}>
						<div>
							<input
								type='text'
								name='searchQuery'
								placeholder='e.g. london'
							/>
						</div>
					</form>
				</div>
			</Page>
		);
}

export default Home;