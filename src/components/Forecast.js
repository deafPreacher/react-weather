import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import weatherServices from '../services/weatherServices.js';
import {filterByTime, getNightClass} from '../utils/helpers.js'
import {getIconUrl} from '../utils/config.js';
import {DateTime} from 'luxon';
import './Forecast.css';

const Forecast = ({nightMode}) => {
	const cityId = useParams().cityId || null;

	const [forecast, setForecast] = useState(null);

	const localeStringFormat = {weekday : 'long'};

	useEffect(() => {
		weatherServices
			.getForecastOf(cityId, 'metric', 40)
			.then(data => {
				data.list = filterByTime(data.list);
				console.log(data);
				setForecast(data);
			})
			.catch(err => console.error(err));
	}, []);

	const f = (g) => forecast.list.map(item => g(item))

	const getRowOf = (title, g) => {
		return (
			<tr>
				<th>{ title }</th>
				{ f(g) }
			</tr>
			);
	}
	
	if (!forecast) return null;

	return (
			<div className={getNightClass('Forecast', nightMode)}>
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
			</div>
		);
}

export default Forecast;