<template>
  <div class="daily-weather">
    <div class="daily-weather__body">
      <div v-for="dayData in data" :key="dayData.dt">
        <p>
          {{ formatDateTime(dayData.dt) }},
          {{ dayData.weather[0].description }},
          Day Temp: {{ dayData.temp.day }}&#176;{{ $store.selections.metric.unit }},
          Windspeed: {{ dayData.wind_speed }}{{ $store.selections.metric.speed }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyWeatherDisplay',
  props: {
    data: Array,
    city: String,
    timeZone: Object,
  },
  methods: {
    formatDateTime(UNIXdate) {
      const myOffsetInMinutes = new Date().getTimezoneOffset() * 60;
      const date = new Date((UNIXdate + (myOffsetInMinutes + this.timeZone.offset)) * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${month}/${day}`;
    },
  },
};
</script>
