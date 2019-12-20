import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { apolloProvider } from "./plugins/vue-apollo";
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
