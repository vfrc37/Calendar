import { DAYS_IN_WEAK, LAST_MONTH_INDEX, MONTH_LABELS, WEEK_DAYS } from "./assets/constants";
import type { TCalendarDate } from "./types/Calendar";

// Вспомогательная функция для заполнения дней из соседних месяцев
// Генерирует массив данных по датам в диапазоне count элементов, начиная со start
const getDatesSequence = (year: number, month: number, count: number, start = 1) => [...Array(count)].map((e, i) => {
	const date: TCalendarDate = {
		year,
		month,
		day: start + i
	}
	return date;
});

const getNextMonthAndYear = (month: number, year: number) => {
	if (month === 11) {
		return { month: 0, year: year + 1 }
	} else {
		return { month: month + 1, year }
	}
}

const getPreviousMonthAndYear = (month: number, year: number) => {
	if (month === 0) {
		return { month: 11, year: year - 1 }
	} else {
		return { month: month - 1, year }
	}
}

export class CalendarModel {
	initDate: string; // начальная дата для первой отрисовки
	weekStartDay: number; // индекс первого дня недели, начиная с 0 (Sunday)
	days: Array<Array<TCalendarDate>>; // основное поле - массив данных дней. Отображение по 7 дней в строке
	currentMonth: number; // текущий месяц при переключении календаря
	currentYear: number; // текущий год при переключении календаря
	daysOrder: string[]; // порядок дней недели, начиная с 1-го дня в weekStartDay

	constructor(date: string, weekStartDay: number) {
		this.initDate = date;
		this.weekStartDay = weekStartDay;

		this.days = [];

		this.currentMonth = 0;
		this.currentYear = 0; 
		
		this.initCurrentDate(new Date(this.initDate));
		this.fill();

		this.daysOrder = [];
		this.defineDaysOrder();
	}

	initCurrentDate(day: Date): void {
		this.currentMonth = day.getMonth();
		this.currentYear = day.getFullYear();
	}

	defineDaysOrder() {
		this.daysOrder = [...WEEK_DAYS,...WEEK_DAYS].slice(this.weekStartDay, this.weekStartDay + DAYS_IN_WEAK);
	}

	getMonthLabel(month: number) {
		return MONTH_LABELS[month];
	}

	// Проверка совпадения переданной даты с датой, указанной при инициализации
	checkInitialDate(date: Date): boolean {
		const initDate = new Date(this.initDate);
		return initDate.getFullYear() === date.getFullYear() && initDate.getMonth() === date.getMonth() && initDate.getDate() === date.getDate();        
	}

	fill(): void {
		this.days = [];

		const year = this.currentYear;
		const month = this.currentMonth;

		const firstDay = new Date(year, month, 1).getDay();

		const firstDayShift = (firstDay - this.weekStartDay + DAYS_IN_WEAK) % DAYS_IN_WEAK;

		const previousMonthLastDate = (month === 0 ? new Date(year - 1, LAST_MONTH_INDEX, 0) : new Date(year, month, 0)).getDate();

		const monthLastDate = new Date(year, month + 1, 0).getDate();

		// Собираем данные:
		// в начале могут быть дни с прошлого месяца - записываем их
		if (firstDayShift) {
			const { month, year } = getPreviousMonthAndYear(this.currentMonth, this.currentYear);
			this.days.push(getDatesSequence(year, month, firstDayShift, previousMonthLastDate - firstDayShift + 1))
		} else {
			this.days.push([]);
		}

		// делаем проход по текущему месяцу
		let currentRow: Array<TCalendarDate> = [];

		for (let date = 1; date <= monthLastDate; date++) {
			currentRow = this.days[this.days.length - 1]!;

			const dateConfig: TCalendarDate = {
				day: date,
				month: this.currentMonth,
				year: this.currentYear
			}

			// заполняем текущую строку, а при достижении конца недели - создаём новую
			if (currentRow.length < DAYS_IN_WEAK) {
				currentRow.push(dateConfig);
			} else {
				this.days.push([ dateConfig ]);
			}
		}

		currentRow = this.days[this.days.length - 1]!;

		// проверяем, есть ли ещё место в последней строке (дни следующего месяца)
		const leftDays = DAYS_IN_WEAK - currentRow.length;

		if (leftDays > 0) {
			const { month, year } = getNextMonthAndYear(this.currentMonth, this.currentYear);
			currentRow.push(...getDatesSequence(year, month, leftDays, 1));
		}
	}

	reset(): void {
		this.initCurrentDate(new Date(this.initDate));
		this.fill();
	}
};
