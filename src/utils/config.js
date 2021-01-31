const APP_ID = process.env.REACT_APP_APPID;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getIconUrl = (iconId) => {
	const iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;
	return iconUrl;
}

export default {APP_ID, BASE_URL}