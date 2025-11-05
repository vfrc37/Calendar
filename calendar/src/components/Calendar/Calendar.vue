<template>
  <div class="wrapper">
    <table>
      <tbody>
        <tr>
          <th v-for="label in calendar?.daysOrder" :key="label">{{ label }}</th>
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
  },
  created() {
    // первая инициализация. если дата не передана, используется текущая дата
    this.updateCalendar(this.$props.date ?? this.todayDate);
  },
  computed: {
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
</style>