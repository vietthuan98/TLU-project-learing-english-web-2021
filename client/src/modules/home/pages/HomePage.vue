<template>
  <div id="home-page">
    HomePage
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class HomePage extends Vue {
  async created() {
    await this.$store.dispatch("setLoading", true);
    await this.$store.dispatch("home/getHomeList", this.params);
    await this.$store.dispatch("setLoading", false);
  }

  get params() {
    return this.$store.state.home?.params || {};
  }
}
</script>

<style lang="scss" scoped>
#home-page {
  width: 100vw;
}
</style>
