import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueYoutube from "vue-youtube";
Vue.use(VueYoutube);
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// import axios from "axios";
// import VueAxios from "vue-axios";
// Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
