import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import weatherServices from '../services/weatherServices.js';
import {getIconUrl} from '../utils/config.js';
import {DateTime} from 'luxon';
import {getNightClass} from '../utils/helpers.js';
import Error from './Error';
import './Weather.css';

const WeatherData = ({weather}) => {
	const history = useHistory();
	const localeStringFormat = {day : 'numeric', month : 'long', weekday : 'long'};

	return (
			<div className='WeatherData'>
				
				<div className='current'>
					<div className='curCity'>
						<h3>{weather.name}</h3>
						<p>{DateTime
								.fromSeconds(weather.dt)
								.toLocaleString(localeStringFormat)}
						</p>
					</div>

					<div className='curInfo'>
						<h1 className='temp'>
							{Math.floor(weather.main.temp)}
							<span className='unit'>°C</span>
						</h1>
						<h3 className='weather'>
							{weather.weather[0].main}
							<img src={getIconUrl(weather.weather[0].icon)}/>
						</h3>
					</div>

					<div className='details'>
						<table>
							<tbody>
								<tr>
									<td>minimum</td>
									<td>{weather.main.temp_min}<span className='unit'>°C</span></td>
								</tr>
								<tr>
									<td>pressure</td>
									<td>{weather.main.pressure}<span className='unit'>hPa</span></td>
								</tr>
								<tr>
									<td>humidity</td>
									<td>{weather.main.humidity}<span className='unit'>%</span></td>
								</tr>
								<tr>
									<td>wind</td>
									<td>
										{weather.wind.speed}<span className='unit'>m/s</span>
									</td>

								</tr>
							</tbody>
						</table>
					</div>

				</div>

				<button onClick={() => history.push(`/forecast/${weather.id}`)}>
					forecast
				</button>
			</div>
		);
}

const Weather = ({nightMode}) => {
	const city = useParams().city || '';

	const [weather, setWeather] = useState(null);

	useEffect(() => {
		weatherServices
			.getWeatherOf(city)
			.then(data => setWeather(data))
			.catch(err => setWeather({name : err.name, message : err.message}))
	}, [])

	if (!weather) { return null; }

	return (
			<div className={getNightClass('Weather', nightMode)}>
				{ (weather.cod === 200)? <WeatherData weather={weather} /> : <Error err={weather}/> }
			</div>
		);
}

export default Weather;