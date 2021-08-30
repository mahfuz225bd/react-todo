export default function getDateTimeValue(myDate) {
	const date = new Date(myDate);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date.toISOString().slice(0, 16);
}
