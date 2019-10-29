import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import axios from "axios";

import "./registerServiceWorker";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import Chart from "./components/charts/baseChart.vue";
import Confirm from "./components/core/Confirm.vue";
import Molde from "./templates/Molde.vue";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// Vue.prototype.$api = "https://api.facilitajus.com.br";
Vue.prototype.$api = "https://facilitajus-api.herokuapp.com";
Vue.prototype.$headers = {
  headers: {
    Authorization: `Bearer ${store.getters.getToken}`
  }
};

Vue.component("Chart", Chart);
Vue.component("Confirm", Confirm);
Vue.component("Molde", Molde);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
