<template>
  <v-app id="app">
    <LoadingIndicator v-if="isShowLoadingIndicator" />
    <router-view></router-view>
    <template v-for="(message, index) in popupMessage">
      <PopupMessage
        v-if="message.id"
        :key="message.id"
        :message="message"
        :index="index"
      />
    </template>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import LoadingIndicator from "./components/layouts/LoadingIndicator.vue";
import AppBar from "./components/AppBar.vue";
import PopupMessage from "./components/PopupMessage.vue";

@Component({
  components: {
    LoadingIndicator,
    AppBar,
    PopupMessage,
  },
})
export default class App extends Vue {
  get isShowLoadingIndicator() {
    return this.$store.state.isShowLoadingIndicator;
  }

  get popupMessage() {
    return this.$store.state?.popupMessage;
  }

  created() {
    document.title = "TEG English";
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
@import url("./plugins/css/swal.scss");

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 1rem;
  overflow-y: auto;
}
#app {
  font-family: "Rubik", sans-serif;
}

.required label::after {
  content: "*";
}
</style>
