<template>
  <main class="home">
    <div class="home__heading">
      <h1>{{ msg }}</h1>
      <h2>
        Find out <i>weather</i> it's nice near you!
      </h2>
    </div>
    <div class="home__select">
      <div class="home__toggles">
        <DropdownToggle
          class="home__toggle"
          prefix="Select Your Language:"
          :label="$store.selections.language.name"
          v-slot:default="slotProps"
        >
          <button
            v-for="language in $actions.getLanguages()"
            :key="language.id"
            v-on:click="$actions.updateSelection({'language': language}); slotProps.toggleExpanded();"
          >
            {{language.name}}
          </button>
        </DropdownToggle>
        <DropdownToggle
          class="home__toggle"
          prefix="Select Your Units:"
          :label="$store.selections.metric.measurement"
          v-slot:default="slotProps"
        >
          <button
            v-for="metric in $actions.getMetrics()"
            :key="metric.measurement"
            v-on:click="$actions.updateSelection({'metric': metric}); slotProps.toggleExpanded();"
          >
            {{metric.measurement}}
          </button>
        </DropdownToggle>
        <DropdownToggle
          class="home__toggle"
          prefix="View:"
          :label="$store.selections.view"
          v-slot:default="slotProps"
        >
          <button
            v-for="view in $actions.getView()"
            :key="view"
            v-on:click="$actions.updateSelection({'view': view}); slotProps.toggleExpanded();"
          >
            {{view}}
          </button>
        </DropdownToggle>
      </div>
      <SearchBar :onSubmit="apiCall" />
    </div>
    <div class="home__results">
      <CurrentWeatherDisplay
        v-if="weatherData && $store.selections.view === 'current'" :data="weatherData.data.current"
        :city="cityName"
      />

      <div v-if="cities !== undefined && weatherData === undefined">
        <div v-for="city in cities" :key="city.lat">
          Did you mean:
          <button
            v-on:click="
              cityName = city.name;
              cities = undefined;
              apiCall(`${city.coord.lat},${city.coord.lon}`)
            "
            class="a"
          >
            {{city.name}}, {{city.sys.country}}
          </button>(lat: {{city.coord.lat}}, lon: {{city.coord.lon}}?
        </div>
      </div>

      {{(cities && cities.length === 0) ? 'No Results Found': null}}
    </div>
  </main>
</template>

<script>
import { getWeatherByLocation, returnCities } from '../api/openweather.js';
import DropdownToggle from './DropdownToggle.vue';
import CurrentWeatherDisplay from './CurrentWeatherDisplay.vue';
import SearchBar from './SearchBar.vue';
export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    CurrentWeatherDisplay,
    DropdownToggle,
    SearchBar,
  },
  data() {
    return {
      weatherData: undefined,
      cities: undefined,
      cityName: undefined,
    };
  },
  methods: {
    clearData() {
      this.weatherData = undefined;
      this.cities = undefined;
      this.cityName = undefined;
    },
    async apiCall(location) {
      this.clearData();
      const isCoordinates = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;

      if (isCoordinates.test(location)) {
        const coordinates = location.split(',');
        this.weatherData = await getWeatherByLocation({
          lat: coordinates[0].trim(),
          lon: coordinates[1].trim(),
          language: this.$store.selections.language.id,
          metric: this.$store.selections.metric.measurement,
          view: this.$store.selections.view,
        });
      }
      else {
        const citiesResponse = await returnCities(location);
        this.cities = citiesResponse.data.list;
      }
    },
  },
};
</script>

