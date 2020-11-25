<template>
  <div class="daily-weather">
    <div class="daily-weather__body">
      <div v-for="dayData in data" :key="dayData.dt">
        <p>
          <span class="bold">{{ $utils.formatDateObj(dayData.dt, timeZone, false, true, false) }}</span>,
          {{ dayData.weather[0].description }},
          <span class="bold">Day Temp:</span> {{ dayData.temp.day }}&#176;{{ $store.selections.metric.unit }},
          <span class="bold">Windspeed:</span> {{ dayData.wind_speed }}{{ $store.selections.metric.speed }}
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
};
</script>
