<template>
  <div class="current-weather">
    <div class="current-weather__date-time">
      {{data.dt}}
    </div>
    <div class="current-weather__body">
      <p>If you look up{{city && ` around ${city},` }} you will see: {{data.weather[0].description}}</p>
      <p>Local Temp: {{data.temp}}&#176;{{$store.selections.metric.unit}}</p>
      <p>Feels like: {{data.feels_like}}&#176;{{$store.selections.metric.unit}}</p>
      <p>The sun rises at: {{data.sunrise}}</p>
      <p>The sun sets at: {{data.sunset}}</p>
      <p>Windspeed: {{data.wind_speed}}{{$store.selections.metric.speed}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeatherDisplay',
  props: {
    data: Object,
    city: String,
  },
};
</script>
