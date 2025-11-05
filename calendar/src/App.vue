<script lang="ts">
  import CalendarWidget from "./components/Calendar/Calendar.vue";

  export default {
    name: 'app',
    components: {
      CalendarWidget,
    },
    data() {
      return {
        dateMocks: [
          {
            text: "Today", isCurrent: true
          },
          {
            text: "2025/12/06", value: "2025-12-6", isCurrent: false
          },
          {
            text: "1999/01/01", value: "1999-01-01", isCurrent: false
          }          
        ],
        currentMockId: 0,
        selectedLocale: 'en',
        locales: [
          { text: 'En', value: 'en' },
          { text: 'Ru', value: 'ru' },
        ]        
      }
    },
    methods: {
      selectMock(id: number) {
        if (this.currentMockId != id) {
          this.dateMocks[this.currentMockId]!.isCurrent = false;
          
          this.currentMockId = id;
          this.dateMocks[id]!.isCurrent = true;
        }
      },
      handleSelectDate(date: string) {
        console.log('App:selectDate', date);
      }
    },
    computed: {
      currentDate() {
        return this.dateMocks[this.currentMockId]?.value;
      },
    },
  }
</script>

<template>
  <div class="settings">
  <button v-for="button, i in dateMocks" :key="`button-${i}`" :class="{ current: button.isCurrent }" @click="selectMock(i)">
    {{  button.text }}
  </button>
  <span>  Locale: </span>
  <select v-model="selectedLocale">
    <option v-for="locale in locales" :value="locale.value" :key="locale.value">
      {{ locale.text }}
    </option>
  </select>
  </div>
  <div class="calendar-wrapper">
    <calendar-widget :date="currentDate" :locale="selectedLocale" @select-date="handleSelectDate"/>
  </div>
  
</template>

<style>
  #app {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .settings {
    height: 50px;
  }
  button {
    margin: 5px;
  }
  .current {
    background-color: lightblue;
  }
  .calendar-wrapper {
    margin: 50px auto;
  }
</style>
