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
          placeholder="leave empty for current location"
          class="search-bar__input"
          ref="location_input"
          v-model="inputValue"
        />
        <button class="button button-primary search-bar__search" type="submit">
          Search!
        </button>
      </div>
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
  data() {
    return {
      inputValue: this.$store.selections.inputValue,
    };
  },
  watch: {
    inputValue: function(value) {
      this.$actions.updateSelection({ inputValue: value });
    },
  },
  methods: {
    submitForm: async function() {
      this.onSubmit(this.$refs.location_input.value);
    },
  },
};
</script>
