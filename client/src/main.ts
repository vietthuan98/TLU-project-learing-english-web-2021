import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vClickOutSide from "v-click-outside";
import "./plugins/commonComponents";

import "./mixins/util.mixin";

Vue.use(vClickOutSide);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
