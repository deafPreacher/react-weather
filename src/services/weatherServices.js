import axios from 'axios';
import config from '../utils/config.js';

const getWeatherOf = (city, units='metric') => {
	return axios
		.get(`${config.BASE_URL}/weather?q=${city}&appid=${config.APP_ID}&units=${units}`)
		.then(result => result.data)
}

const getForecastOf = (cityId, units='metric', cnt=5) => {
	return axios
		.get(`${config.BASE_URL}/forecast?id=${cityId}&appid=${config.APP_ID}&units=${units}&cnt=${cnt}`)
		.then(result => result.data)
}

export default {getWeatherOf, getForecastOf};