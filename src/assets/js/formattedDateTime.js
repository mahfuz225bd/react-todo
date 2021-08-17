import moment from 'moment';

export default function formattedDateTime() {
	return moment().format('ddd, MMM DD YYYY, h:mm A');
}
