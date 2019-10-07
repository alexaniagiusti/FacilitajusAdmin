import Vue from 'vue';
import { rtdbPlugin } from 'vuefire';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import axios from 'axios';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(rtdbPlugin);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$api = 'https://facilitajus-api.herokuapp.com';
Vue.prototype.$headers = {
  headers: {
    Authorization: `Bearer ${store.getters.getToken}`,
  },
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
