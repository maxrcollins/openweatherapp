<template>
  <div class="daily-weather-display">
    <div class="daily-weather-display__row">
      If you look up around{{city && ` ${city},` }} you will see: {{data.weather[0].description}}
    </div>
    <div>
      Local Temp: {{data.temp}}&#176;{{$store.selections.metric.unit}}
      Feels like: {{data.feels_like}}&#176;{{$store.selections.metric.unit}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyWeatherDisplay',
  props: {
    data: Object,
    city: String,
  },
};
</script>
