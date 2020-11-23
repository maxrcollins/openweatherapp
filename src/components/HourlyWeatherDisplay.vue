<template>
  <div class="hourly-weather">
    <div class="hourly-weather__body">
      <div v-for="hourData in data" :key="hourData.dt">
        <p>
          {{hourData.dt}},
          {{hourData.weather[0].description}},
          Temp: {{hourData.temp}}&#176;{{$store.selections.metric.unit}},
          Windspeed: {{hourData.wind_speed}}{{$store.selections.metric.speed}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HourlyWeatherDisplay',
  props: {
    data: Array,
    city: String,
  },
};
</script>
