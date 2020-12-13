import moment from 'moment'


export const formatDate = (date: string, format = "DD.MM.YYYY HH:mm") => {
	return moment(date).format(format)
}

export const formatDateWithDay = (date: string, format = "HH:mm") => {
	let momentFormat = moment.unix(Date.parse(date) / 1000)
	let diff = momentFormat.diff( moment(), 'days');
	let dayPart = ''

	switch (diff) {
		case -2:
			dayPart =  'Позавчера'
			break;
		case -1:
			dayPart =  'Вчера'
			break;
		case 0:
			dayPart =  'Сегодня'
			break;
		case 1:
			dayPart =  'Завтра'
			break;
		case 2:
			dayPart =  'Послезавтра'
			break;
		default:
			dayPart = momentFormat.format(`DD.MM.YYYY `)
			break;
	}


	return `${dayPart} в ${moment(date).format(format)}`
}