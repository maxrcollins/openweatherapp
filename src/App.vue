<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './pages/Home.vue';
import './store/index.js';
export default {
  name: 'App',
  components: {
    Home,
  },
};
</script>

<style lang="scss">
  @import "./src/main.scss";
</style>
