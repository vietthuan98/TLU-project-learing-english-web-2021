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
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 1rem;
  overflow-y: auto;
  font-family: "arial";
}
#app {
}

.required label::after {
  content: "*";
}
</style>
