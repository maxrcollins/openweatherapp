<template>
  <div v-bind:class="classNames">
    <form v-on:submit.prevent="submitForm" class="search-bar">
      <label class="search-bar__label">
        For best results, enter "city", "city, state code", "city, state code, country code",
        or "latitude, longitude".<br>
        (eg. 'Stamford', 'Stamford, CT, US', 'Dublin, IR', or '-22.08,37.39')
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
