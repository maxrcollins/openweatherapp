<template>
  <div class="timeframe-toggle" v-bind:class="className">
    <button
      id="dropdownMenuButton"
      class="button button-primary button-rounded timeframe-toggle__dropdown-button"
      type="button"
      aria-expanded="false   EDIT ME LATER *****"
      v-on:click="toggleExpanded()"
    >
      Dropdown button
    </button>
    <div class="timeframe-toggle__dropdown-menu" v-bind:class="!isExpanded && 'is-closed'" aria-labelledby="dropdownMenuButton">
      <!-- <a class="dropdown-item" href="#">Today</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a> -->
      <button class="timeframe-toggle__dropdown-item" v-on:click="onClick('1')">Button 1</button>
      <button class="timeframe-toggle__dropdown-item" v-on:click="onClick('2')">Button 2</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeframeToggle',
  props: {
    className: String
  },
  data () {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpanded () {
      this.isExpanded = !this.isExpanded
    },
    onClick: (number) => console.log('item ' + number)
  }
}
</script>
