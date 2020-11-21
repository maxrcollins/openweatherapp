<template>
  <div v-bind:class="classNames">
    <form v-on:submit.prevent="submitForm" class="search-bar">
      <label class="sr-only">Enter the name of a city</label>
      <input
        type="text"
        id="location-input"
        name="location-input"
        placeholder="Enter the name of a city"
        class="search-bar__input"
        ref="location_input"
      />
      <button class="button button-primary search-bar__search" type="submit">
        Search!
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    onSubmit: Function,
    classNames: String
  },
  methods: {
    submitForm: function () {
      this.onSubmit(this.$refs.location_input.value)
    }
  }
}
</script>
