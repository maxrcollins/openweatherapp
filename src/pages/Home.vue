<template>
  <main class="home">
    <div class="home__heading">
      <h1>Weather It's Nice Out</h1>
      <h2>
        Find out <i>weather</i> it's nice near you!
      </h2>
    </div>
    <div class="home__select" v-if="$store.selections">
      <div class="home__toggles">
        <DropdownToggle
          class="home__toggle"
          prefix="Select Your Language:"
          :label="$store.selections.language.name"
          v-slot:default="slotProps"
        >
          <button
            class="button button-secondary button-rounded home__dropdown-button"
            v-for="language in $actions.getLanguages()"
            :key="language.id"
            v-on:click="$actions.updateSelection({'language': language}); slotProps.toggleExpanded();"
          >
            {{ language.name }}
          </button>
        </DropdownToggle>
        <DropdownToggle
          class="home__toggle"
          prefix="Select Your Units:"
          :label="$store.selections.metric.measurement"
          v-slot:default="slotProps"
        >
          <button
            class="button button-secondary button-rounded home__dropdown-button"
            v-for="metric in $actions.getMetrics()"
            :key="metric.measurement"
            v-on:click="
              $actions.updateSelection({'metric': metric});
              if (weatherData){apiCall(`${weatherData.data.lat},${weatherData.data.lon}`)};
              slotProps.toggleExpanded();
            "
          >
            {{ metric.measurement }}
          </button>
        </DropdownToggle>
        <DropdownToggle
          class="home__toggle"
          prefix="View:"
          :label="$store.selections.view"
          v-slot:default="slotProps"
        >
          <button
            class="button button-secondary button-rounded home__dropdown-button"
            v-for="view in $actions.getView()"
            :key="view"
            v-on:click="$actions.updateSelection({'view': view}); slotProps.toggleExpanded();"
          >
            {{ view }}
          </button>
        </DropdownToggle>
      </div>
      <SearchBar :onSubmit="apiCall" />
    </div>
    <div class="home__results-container">
      <div class="home__results">
        <CurrentWeatherDisplay
          v-if="weatherData && $store.selections.view === 'Current'"
          :data="weatherData.data.current"
          :timeZone="{label:weatherData.data.timezone, offset: weatherData.data.timezone_offset}"
          :city="cityName"
        />
        <HourlyWeatherDisplay
          v-if="weatherData && $store.selections.view === 'Hourly'"
          :data="weatherData.data.hourly"
          :timeZone="{label:weatherData.data.timezone, offset: weatherData.data.timezone_offset}"
          :city="cityName"
        />
        <DailyWeatherDisplay
          v-if="weatherData && $store.selections.view === 'Daily'" :data="weatherData.data.daily"
          :timeZone="{label:weatherData.data.timezone, offset: weatherData.data.timezone_offset}"
          :city="cityName"
        />
        <div v-if="cities !== undefined && weatherData === undefined">
          <div v-for="city in cities" :key="city.lat">
            Did you mean: {{city.name}}
            <button
              v-on:click="
                cityName = city.name;
                cities = undefined;
                apiCall(`${city.coord.lat},${city.coord.lon}`)
              "
              class="a"
            >
              {{ city.name }}, {{ city.sys.country }}
            </button>(lat: {{ city.coord.lat }}, lon: {{ city.coord.lon }}?
          </div>
        </div>

        {{ (cities && cities.length === 0) ? 'No Results Found': null }}
      </div>
    </div>
  </main>
</template>

<script>
import { getDataByCoordinates, getDataByQuery } from '../api/openweather.js';
import DropdownToggle from '../components/DropdownToggle.vue';
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay.vue';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay.vue';
import DailyWeatherDisplay from '../components/DailyWeatherDisplay.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'Home',
  components: {
    CurrentWeatherDisplay,
    HourlyWeatherDisplay,
    DailyWeatherDisplay,
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
    clearWeatherCities() {
      this.weatherData = undefined;
      this.cities = undefined;
    },
    async apiCall(location) {
      this.clearWeatherCities();
      const isCoordinates = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;

      if (isCoordinates.test(location)) {
        const coordinates = location.split(',');
        this.weatherData = await getDataByCoordinates({
          lat: coordinates[0].trim(),
          lon: coordinates[1].trim(),
          language: this.$store.selections.language.id,
          metric: this.$store.selections.metric.measurement,
          view: this.$store.selections.view,
        });

      }
      else {
        const citiesResponse = await getDataByQuery(location);
        if (citiesResponse.data.list.length === 1) {
          //console.log('cities', citiesResponse.data.list[0].name)
          this.cityName = citiesResponse.data.list[0].name;
          this.weatherData = await getDataByCoordinates({
            lat: citiesResponse.data.list[0].coord.lat,
            lon: citiesResponse.data.list[0].coord.lon,
            language: this.$store.selections.language.id,
            metric: this.$store.selections.metric.measurement,
            view: this.$store.selections.view,
          });
        }
        else {
          this.cities = citiesResponse.data.list;
        }
      }
    },
  },
};
</script>

