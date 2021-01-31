import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import weatherServices from '../services/weatherServices.js';
import {filterByTime, getNightClass} from '../utils/helpers.js'
import {getIconUrl} from '../utils/config.js';
import {DateTime} from 'luxon';
import Error from './Error';
import Page from './Page';
import './Forecast.css';

const ForecastData = ({forecast}) => {
	
	const localeStringFormat = {weekday : 'long'};
	const f = (g) => forecast.list.map(item => g(item))
	const getRowOf = (title, g) => {
		return (
			<tr>
				<th>{ title }</th>
				{ f(g) }
			</tr>
			);
	}

	return (
		<>
			<div className='header'>
				<h3>{forecast.city.name}</h3>
				<p>Weather forecast of {forecast.list.length} days.</p>
			</div>
			<div className='table-container'>
				<table>
					<thead>
						{ getRowOf( '', (item) => <th>{DateTime.fromSeconds(item.dt).toLocaleString(localeStringFormat)}</th> ) }
					</thead>
					<tbody>
						{ getRowOf( 'Temprature', (item) => <td>{item.main.temp}<span className='unit'>°C</span></td> ) }
						{ getRowOf( 'Weather', (item) => <td><img src={ getIconUrl( item.weather[0].icon ) }/></td> ) }
						{ getRowOf( 'Pressure', (item) => <td>{item.main.pressure}<span className='unit'>hPa</span></td> ) }
						{ getRowOf( 'Humidity', (item) => <td>{item.main.humidity}<span className='unit'>%</span></td> ) }
					</tbody>
				</table>
			</div>
		</>
		);
}

const Forecast = ({nightMode}) => {
	const cityId = useParams().cityId || null;

	const [forecast, setForecast] = useState(null);

	useEffect(() => {
		weatherServices
			.getForecastOf(cityId, 'metric', 40)
			.then(data => {
				setForecast({...data, list : filterByTime(data.list)});	
			})
			.catch(err => setForecast({name : err.name, message : err.message}))
	}, []);
	
	if (!forecast) 
		return null;

	return (
		<Page>
			<div className={getNightClass('Forecast', nightMode)}>
				{forecast.cod === '200' ? <ForecastData forecast={forecast} /> : <Error err={forecast}/>}				
			</div>
		</Page>
		);
}

export default Forecast;