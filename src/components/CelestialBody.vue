<template>
  <div :class="classNames">
  </div>
</template>

<script>

export default {
  name: 'CelestialBody',
  props: {
    classNames: String,
  },
};
</script>
