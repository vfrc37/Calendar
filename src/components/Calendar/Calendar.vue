<template>
  <div class="wrapper">
    <div class="head">
      <div class="button button-back" @click="calendar?.switchPreviousMonth"><div class="button-arrow"></div></div>
      <div>{{ title }}</div>
      <div class="button button-forward" @click="calendar?.switchNextMonth"><div class="button-arrow"></div></div>
    </div>
    <table>
      <tbody>
        <tr>
          <th v-for="label in calendar?.daysOrder" :key="label">{{ getDayName(label) }}</th>
        </tr>
        <tr v-for="week, i in calendar?.days" :key="i">
          <th v-for="day, j in week" :key="j" :class="{ 'current-date': checkCurrentDay(day), 'current-month': checkCurrentMonth(day), date: true }" @click="selectDate(day.day, day.month, day.year)">{{ day.day }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import { CalendarModel } from './CalendarModel';
import { i18n } from './i18n/calendar';
import type { TCalendarDate } from './types/Calendar';

export default {
  name: 'CalendarWidget',
  props: {
    date: String,
    locale: String,
  },
  data(): { calendar: CalendarModel | null, selectedDate: string | null } {
    return {
      calendar: null,
      selectedDate: null,
    }    
  },
  watch: {
    date: {
      handler(value: string) {
        this.updateCalendar(value);
      },
    },
    locale() {
      this.updateCalendarLocale();
    },      
  },  
  methods: {
    updateCalendar(value?: string) {
      if (value) {
        this.selectedDate = value;
      } else {
        this.selectedDate = this.todayDate;
      }
      if (!this.selectedDate) return;
      this.calendar = new CalendarModel(this.selectedDate, this.$props.locale === 'en' ? 0 : 1);
    },
    updateCalendarLocale() {
      if (!this.selectedDate) return;
      this.calendar = new CalendarModel(this.selectedDate, this.$props.locale === 'en' ? 0 : 1);      
    },
    selectDate(day: number, month: number, year: number) {
      if (!this.calendar) return;
      const selectedValue = `${year}-${month + 1}-${day}`;
      this.updateCalendar(selectedValue);
      this.$emit('selectDate', selectedValue);
    },
    checkCurrentMonth(day: TCalendarDate) {
      if (!this.selectedDate) return false;
      return this.calendar?.currentMonth === day.month;
    },
    checkCurrentDay(day: TCalendarDate) {
      if (!this.selectedDate) return false;
      const selDate = new Date(this.selectedDate)
      return selDate.getDate() === day.day && selDate.getMonth() === day.month && selDate.getFullYear() === day.year;
    },
    getDayName(dayLabel: string) {
      return i18n(dayLabel, this.$props.locale ?? '');
    },
    getMonthName(monthLabel: string) {
      return i18n(monthLabel, this.$props.locale ?? '');
    }
  },
  created() {
    // первая инициализация. если дата не передана, используется текущая дата
    this.updateCalendar(this.$props.date ?? this.todayDate);
  },
  computed: {
    title() {
      if (!this.calendar) return '';
      const monthLabel = this.calendar.getMonthLabel(this.calendar.currentMonth) ?? '';
      return `${this.getMonthName(monthLabel)} ${this.calendar.currentYear}`
    },
    todayDate() {
      const today = new Date();
      return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }
  }
}
</script>

<style scoped lang="scss">

  $color-active: blue;
  $color-inactive: grey;

  .wrapper {
    border: 1px solid rgb(185, 185, 185);
    padding: 5px;
  }

  th {
    width: 30px;
    height: 30px;
    border: 1px solid transparent;

    &.current-date {
      border-color: $color-active;
    }

    &.date {
      font-size: 1.1em;

      &:hover {
        border-color: $color-active;
        cursor: pointer;
      }
    }

    &:not(.current-month) {
      color: $color-inactive;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    font-size: 1.1em;
  }

  .button {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  .button-back .button-arrow {
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 14px solid black;
  }
  .button-back:hover .button-arrow {
    border-right-color: $color-active;
  }

  .button-forward .button-arrow {
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 14px solid black;
  }
  .button-forward:hover .button-arrow  {
    border-left-color: $color-active;
  }
</style>