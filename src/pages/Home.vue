<template>
  <main class="home">
    <div class="home__heading">
      <h1>Weather It's Nice Out</h1>
      <h2>
        Find out <i>weather</i> it's nice near you!
      </h2>
    </div>
    <div class="home__select">
      <div class="home__toggles">
        <DropdownToggle
          class="home__toggle"
          prefix="Select Your Units:"
          :label="$store.selections.metric.measurement"
          v-slot:default="slotProps"
        >
          <button
            class="button button-secondary home__dropdown-button"
            v-for="metric in $actions.getMetrics()"
            :key="metric.measurement"
            @click="() => {
              $actions.updateSelection({'metric': metric});
              if (weatherData){apiCall(`${weatherData.data.lat},${weatherData.data.lon}`)};
              slotProps.toggleExpanded();
            }"
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
            class="button button-secondary home__dropdown-button"
            v-for="view in $actions.getView()"
            :key="view"
            @click="() => {
              $actions.updateSelection({'view': view});
              slotProps.toggleExpanded();
            }"
          >
            {{ view }}
          </button>
        </DropdownToggle>
      </div>
      <SearchBar :onSubmit="apiCall" />
      <div :class="!hasErrored && 'is-hidden'">There was an error retrieving your Data. Please try again later</div>
    </div>
    <div class="home__results-container">
      <div class="home__results">
        <CurrentWeatherDisplay
          v-if="weatherData && $store.selections.view === 'Current'"
          :weatherData="weatherData.data.current"
          :timeZone="{label:weatherData.data.timezone, offset: weatherData.data.timezone_offset}"
          :city="cityName"
        />
        <HourlyWeatherDisplay
          v-if="weatherData && $store.selections.view === 'Hourly'"
          :weatherData="weatherData.data.hourly"
          :timeZone="{label:weatherData.data.timezone, offset: weatherData.data.timezone_offset}"
          :city="cityName"
        />
        <DailyWeatherDisplay
          v-if="weatherData && $store.selections.view === 'Daily'"
          :weatherData="weatherData.data.daily"
          :timeZone="{label:weatherData.data.timezone, offset: weatherData.data.timezone_offset}"
          :city="cityName"
        />
        <div v-if="cities !== undefined && weatherData === undefined">
          <div v-for="city in cities" :key="city.lat" class="home__results-city">
            Did you mean: {{city.name}}
            <button
              @click="() => {
                cityName = city.name;
                cities = undefined;
                apiCall(`${city.coord.lat},${city.coord.lon}`)
              }"
              class="a"
            >
              {{ city.name }}, {{ city.sys.country }}
            </button> (lat: {{ city.coord.lat }}, lon: {{ city.coord.lon }})?
          </div>
        </div>

        {{ (cities && cities.length === 0) ? 'No Results Found': null }}
      </div>
    </div>
    <CelestialBody class="sun" />
    <CelestialBody class="moon" />
  </main>
</template>

<script>
import { getDataByCoordinates, getDataByQuery } from '../api/openweather.js';
import getGeoLocation from '../api/geolocation.js';
import DropdownToggle from '../components/DropdownToggle.vue';
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay.vue';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay.vue';
import DailyWeatherDisplay from '../components/DailyWeatherDisplay.vue';
import CelestialBody from '../components/CelestialBody.vue';
import SearchBar from '../components/SearchBar.vue';
export default {
  name: 'Home',
  components: {
    CurrentWeatherDisplay,
    HourlyWeatherDisplay,
    DailyWeatherDisplay,
    DropdownToggle,
    SearchBar,
    CelestialBody,
  },
  data() {
    return {
      weatherData: undefined,
      cities: undefined,
      cityName: undefined,
      hasErrored: false,
      currentCoordinates: undefined,
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

      try {

        if (location === '') {
          this.weatherData = await getDataByCoordinates({
            lat: this.currentCoordinates.lat,
            lon: this.currentCoordinates.lon,
            metric: this.$store.selections.metric.measurement,
            view: this.$store.selections.view,
          });
        }

        else if (isCoordinates.test(location)) {
          const coordinates = location.split(',');
          this.weatherData = await getDataByCoordinates({
            lat: coordinates[0].trim(),
            lon: coordinates[1].trim(),
            metric: this.$store.selections.metric.measurement,
            view: this.$store.selections.view,
          });
        }

        else {
          const citiesResponse = await getDataByQuery(location);

          if (citiesResponse.data.list.length === 1) {
            this.cityName = citiesResponse.data.list[0].name;
            this.weatherData = await getDataByCoordinates({
              lat: citiesResponse.data.list[0].coord.lat,
              lon: citiesResponse.data.list[0].coord.lon,
              metric: this.$store.selections.metric.measurement,
              view: this.$store.selections.view,
            });
          }

          else {
            this.cities = citiesResponse.data.list;
          }
        }

        this.hasErrored = false;
      }
      catch (e) {
        this.hasErrored = true;
      }
    },
    setCurrentLocation(position) {
      this.currentCoordinates = { lat: position.coords.latitude, lon: position.coords.longitude };
    },
  },
  mounted() {
    getGeoLocation(this.setCurrentLocation);
  },
};
</script>

