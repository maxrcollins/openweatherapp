<template>
  <div class="daily-weather">
    <div class="daily-weather__body">
      <div
        v-for="dayData in dateTableObject"
        :key="dayData.dt"
        class="daily-weather__column"
        :class="dayData.class"
        >
        <span class="bold">{{dayData.label}}</span>
        <div v-for="(dataPoint, key) in dayData.items" :key="key">{{dataPoint}} {{dayData.metric}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyWeatherDisplay',
  props: {
    weatherData: Array,
    city: String,
    timeZone: Object,
  },
  data() {
    return {
      dateTableObject: undefined,
    };
  },
  methods: {
    createDateTableObject() {
      const dateTableFramework = [
        {
          label: 'Date',
          items: [],
          class: 'daily-weather__column-sm',
        },
        {
          label: 'Weather',
          items: [],
          class: 'daily-weather__column-lg',
        },
        {
          label: 'Max Temp',
          metric: `°${this.$store.selections.metric.unit}`,
          items: [],
        },
        {
          label: 'Min Temp',
          metric: `°${this.$store.selections.metric.unit}`,
          items: [],
          class: 'd-sm-none',
        },
        {
          label: 'Wind Speed',
          metric: this.$store.selections.metric.speed,
          items: [],
          class: 'd-sm-none',
        },
      ];

      this.weatherData.map((dayData) => {
        dateTableFramework[0].items.push(this.$utils.formatDateObj(dayData.dt, this.timeZone, false, true, false));
        dateTableFramework[1].items.push(dayData.weather[0].description);
        dateTableFramework[2].items.push(dayData.temp.max);
        dateTableFramework[3].items.push(dayData.temp.min);
        dateTableFramework[4].items.push(dayData.wind_speed);
      });

      this.dateTableObject = dateTableFramework;
    },
  },
  mounted() {
    this.createDateTableObject();
  },
};
</script>
