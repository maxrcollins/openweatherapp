<template>
  <div class="current-weather">
    <div class="current-weather__date-time">
      {{ $utils.formatDateObj(weatherData.dt, timeZone) }}
    </div>
    <div class="current-weather__image-container">
      <Icon :icon="weatherData.weather[0].icon" class="current-weather__image" />
    </div>
    <div class="current-weather__body">
      <p>If you look up{{ city && ` around ${city},` }} you will see: {{ weatherData.weather[0].description }}</p>
      <p>Local Temp: {{ weatherData.temp }}&#176;{{ $store.selections.metric.unit }}</p>
      <p>Feels like: {{ weatherData.feels_like }}&#176;{{ $store.selections.metric.unit }}</p>
      <p>The sun rises at: {{ $utils.formatDateObj(weatherData.sunrise, timeZone, true, false, false)}}</p>
      <p>The sun sets at: {{ $utils.formatDateObj(weatherData.sunset, timeZone, true, false, false)}}</p>
      <p>Windspeed: {{ weatherData.wind_speed }}{{ $store.selections.metric.speed }}</p>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'CurrentWeatherDisplay',
  components: {
    Icon,
  },
  props: {
    weatherData: Object,
    city: String,
    timeZone: Object,
  },
};
</script>
