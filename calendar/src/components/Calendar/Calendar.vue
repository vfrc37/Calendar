<template>
  <div class="wrapper">
    <table>
      <tbody>
        <tr>
          <th v-for="label in calendar?.daysOrder" :key="label">{{ label }}</th>
        </tr>
        <tr v-for="week, i in calendar?.days" :key="i">
          <th v-for="day, j in week" :key="j">{{ day.day }}</th>
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
  data(): { calendar: CalendarModel | null } {
    return {
      calendar: null
    }    
  },
  methods: {
    updateCalendar(value?: string) {
      if (!value) return;
      this.calendar = new CalendarModel(value, this.$props.locale === 'en' ? 0 : 1);
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