<template>
  <img :src="url">
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: String,
  },
  data() {
    return {
      url: `http://openweathermap.org/img/w/${this.icon}.png`,
    };
  },
};
</script>
