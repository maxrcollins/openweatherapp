import Vue from 'vue';
import App from './App.vue';
import './store/index.js';
import './utils/util.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
