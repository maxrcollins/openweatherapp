<template>
  <div v-bind:class="classNames">
    <form v-on:submit.prevent="submitForm" class="search-bar">
      <label class="search-bar__label">
        Enter the name of a city, city/State Code/Country Code, city/Country Code, or
        longitude/latitude coordinates, separated by a comma.
        (eg. 'Stamford', 'Stamford, CT, US', 'Dublin, IR', or '-122.08,37.39')
      </label>
      <div class="search-bar__container">
        <input
          type="text"
          id="location-input"
          name="location-input"
          placeholder="leave empty for current"
          class="search-bar__input"
          ref="location_input"
          aria-describedby="search-bar-error"
        />
        <button class="button button-primary search-bar__search" type="submit">
          Search!
        </button>
      </div>
      <div class="error-message" id="search-bar-error">Please enter a location</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    onSubmit: Function,
    classNames: String,
  },
  methods: {
    submitForm: function() {
      this.$refs?.location_input?.value ?
        this.onSubmit(this.$refs.location_input.value) :
        console.log('Please enter a location'); // ADD Error handlingTHIS;
    },
  },
};
</script>
