<template>
  <v-app id="app">
    <LoadingIndicator v-if="isShowLoadingIndicator" />
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import LoadingIndicator from "./components/layouts/LoadingIndicator.vue";
import AppBar from "./components/AppBar.vue";

@Component({
  components: {
    LoadingIndicator,
    AppBar,
  },
})
export default class App extends Vue {
  get isShowLoadingIndicator() {
    return this.$store.state.isShowLoadingIndicator;
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
</style>
