require('popper.js').default;
import 'bootstrap';
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from 'apexcharts';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.config.globalProperties.$apexcharts = ApexCharts;
app.use(store).use(router).use(VueApexCharts).mount('#app');
