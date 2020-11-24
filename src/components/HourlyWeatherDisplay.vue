<template>
  <div class="hourly-weather">
    <div class="hourly-weather__body">
      <div v-for="hourData in data" :key="hourData.dt">
        <p>
          <span class="hourly-weather__date">{{ formatDateTime(hourData.dt, hourData.timezone_offset, hourData.timezone) }}</span>
          <span class="hourly-weather__data">
            {{ hourData.weather[0].description }},
            Temp: {{ hourData.temp }}&#176;{{ $store.selections.metric.unit }},
            Windspeed: {{ hourData.wind_speed }}{{ $store.selections.metric.speed }}
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
      const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
      const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

      return `${month}/${day} ${hours}:${minutes} ${this.timeZone.label}`;
    },
  },
};
</script>
