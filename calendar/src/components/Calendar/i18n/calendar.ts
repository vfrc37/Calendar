const config: {
	[key: string]: {
		[key: string]: string;
	};
} = {
	'Sunday': {
		'en': 'San',
		'ru': 'Вс',
	},
	'Monday': {
		'en': 'Mon',
		'ru': 'Пн',
	},
	'Tuesday': {
		'en': 'Tue',
		'ru': 'Вт',
	},
	'Wednesday': {
		'en': 'Wen',
		'ru': 'Ср',
	},
	'Thursday': {
		'en': 'Thu',
		'ru': 'Чт',
	},
	'Friday': {
		'en': 'Fri',
		'ru': 'Пт',
	},
	'Saturday': {
		'en': 'Sat',
		'ru': 'Сб',
	},
	'January': {
		'en': 'Jan',
		'ru': 'Янв',
	},
	'February': {
		'en': 'Feb',
		'ru': 'Фев',
	},
	'Marth': {
		'en': 'Mar',
		'ru': 'Мар',
	},
	'April': {
		'en': 'Apr',
		'ru': 'Апр',
	},
	'May': {
		'en': 'May',
		'ru': 'Май',
	},
	'June': {
		'en': 'Jun',
		'ru': 'Июн',
	},
	'July': {
		'en': 'Jul',
		'ru': 'Июл',
	},    
	'August': {
		'en': 'Aug',
		'ru': 'Авг',
	},
	'September': {
		'en': 'Sep',
		'ru': 'Сен',
	},
	'October': {
		'en': 'Oct',
		'ru': 'Окт',
	},
	'November': {
		'en': 'Nov',
		'ru': 'Ноя',
	},
	'December': {
		'en': 'Dec',
		'ru': 'Дек',
	},
}

export const i18n = (label: string, locale: string) => {
  if (!locale || !label) return null;
  return config[label]?.[locale] ?? '';
}