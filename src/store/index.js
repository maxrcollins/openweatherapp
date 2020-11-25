import Vue from 'vue';
import { getLocalStore, setLocalStore } from './browser-local-store.js';
import {
  metrics,
  view,
  defaultSelections,
} from './store-consts.js';


// init local store
if (Object.keys(getLocalStore('selections')).length === 0) { setLocalStore('selections', defaultSelections) }

const store = Vue.observable(getLocalStore('selections'));

const actions = {
  updateSelections(newSelections) {
    store.selections = newSelections;
    setLocalStore('selections', store);
  },
  updateSelection(newSelection) {
    store.selections = { ...store.selections, ...newSelection };
    setLocalStore('selections', store);
  },
  getMetrics() { return metrics },
  getView() { return view },
};

Vue.prototype.$store = store;
Vue.prototype.$actions = actions;

