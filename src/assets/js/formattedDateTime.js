import moment from 'moment';

export default function formattedDateTime(myDate) {
	return moment(myDate).format('ddd, MMM D YYYY, h:mm A');
}
