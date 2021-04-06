// This file defines the app
import Vue from 'vue'
import App from './App.vue'
import Controls from './components/Controls.vue'
import Filters from './components/Filters.vue'
import Table from './components/Table.vue'
import Card from './components/Card.vue'

Vue.config.productionTip = false

Vue.component('app-controls', Controls);
Vue.component('app-filters', Filters);
Vue.component('app-table', Table);
Vue.component('app-card', Card);

export const bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
