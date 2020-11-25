<template>
  <div class="hourly-weather">
    <div class="hourly-weather__body">
      <div v-for="hourData in weatherData" :key="hourData.dt">
        <p>
          <span class="hourly-weather__date">{{ $utils.formatDateObj(hourData.dt, timeZone, true, false, true) }}</span>
          <span class="hourly-weather__data">
            {{ hourData.weather[0].description }},
            <span class="bold">Temp:</span> {{ hourData.temp }}&#176;{{ $store.selections.metric.unit }},
            <span class="bold">Windspeed:</span> {{ hourData.wind_speed }}{{ $store.selections.metric.speed }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HourlyWeatherDisplay',
  props: {
    weatherData: Array,
    city: String,
    timeZone: Object,
  },
};
</script>
