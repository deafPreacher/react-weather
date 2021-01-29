export const filterByTime = (dataset, hours=12, minutes=0, seconds=0) => {
	return dataset.filter(item => {
		const item_date = new Date(item.dt_txt);
		const [ih, im, is] = [item_date.getHours(), item_date.getMinutes(), item_date.getSeconds()];
		return (ih === hours && im === minutes && is === seconds);
	})
}

export const getNightClass = (baseClass, nightMode) => {
	return `${baseClass} ${(nightMode) ? 'night' : ''}`;
}