<template>
  <div class="current-weather">
    <div class="current-weather__date-time">
      {{formatCurrentTime(data.dt)}}
    </div>
    <div class="current-weather__body">
      <p>If you look up{{ city && ` around ${city},` }} you will see: {{ data.weather[0].description }}</p>
      <p>Local Temp: {{ data.temp }}&#176;{{ $store.selections.metric.unit }}</p>
      <p>Feels like: {{ data.feels_like }}&#176;{{ $store.selections.metric.unit }}</p>
      <p>The sun rises at: {{ formatTime(data.sunrise) }}</p>
      <p>The sun sets at: {{ formatTime(data.sunset) }}</p>
      <p>Windspeed: {{ data.wind_speed }}{{ $store.selections.metric.speed }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeatherDisplay',
  props: {
    data: Object,
    city: String,
    timeZone: Object,
  },
  methods: {
    formatCurrentTime(UNIXdate) {
      const myOffsetInMinutes = new Date().getTimezoneOffset() * 60;
      const date = new Date((UNIXdate + (myOffsetInMinutes + this.timeZone.offset)) * 1000);
      return date.toLocaleString();
    },
    formatTime(UNIXdate) {
      const myOffsetInMinutes = new Date().getTimezoneOffset() * 60;
      const date = new Date((UNIXdate + (myOffsetInMinutes + this.timeZone.offset)) * 1000);
      const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
      const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

      return `${hours}:${minutes}`;

    }
  },
};
</script>
