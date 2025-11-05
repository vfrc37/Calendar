<template>
  <div class="wrapper">
    <table>
      <tbody>
        <tr>
          <th v-for="label in calendar?.daysOrder" :key="label">{{ label }}</th>
        </tr>
        <tr v-for="week, i in calendar?.days" :key="i">
          <th v-for="day, j in week" :key="j" @click="selectDate(day.day, day.month, day.year)">{{ day.day }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import { CalendarModel } from './CalendarModel';

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
    }    
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
    selectDate(day: number, month: number, year: number) {
      if (!this.calendar) return;
      const selectedValue = `${year}-${month + 1}-${day}`;
      this.updateCalendar(selectedValue);
    }
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
  .wrapper {
    border: 1px solid rgb(185, 185, 185);
    padding: 5px;
  }

  th {
    width: 30px;
    height: 30px;

    &.date {
      font-size: 1.1em;
    }
  }
</style>