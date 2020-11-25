<template>
  <div class="dropdown-toggle" v-bind:class="className">
    {{ prefix }}
    <button
      id="dropdownMenuButton"
      class="button button-primary dropdown-toggle__dropdown-button"
      type="button"
      :aria-expanded="isExpanded.toString()"
      @click="() => { toggleExpanded() }"
    >
      {{ label }}
    </button>
    <div
      class="dropdown-toggle__dropdown-menu"
      v-bind:class="!isExpanded && 'is-hidden'"
      aria-labelledby="dropdownMenuButton"
    >
      <slot v-bind:toggleExpanded="toggleExpanded" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownToggle',
  props: {
    className: String,
    label: String,
    prefix: String,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>
