import moment from 'moment';

export default function formatedDateTime() {
	return moment().format('ddd, MMM DD YYYY, h:mm A');
}
