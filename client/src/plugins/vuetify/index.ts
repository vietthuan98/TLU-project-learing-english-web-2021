import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#D50000',
        // secondary: '#D50000',
        // accent: '#F9AA33',
        error: "#bd1e1e"
        // info: '#4A6572',
        // success: '#4A6572',
        // warning: '#F9AA33',
      }
    }
  }
});
