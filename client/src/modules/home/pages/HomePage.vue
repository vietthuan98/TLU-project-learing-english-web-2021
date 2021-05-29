<template>
  <div id="home-page">
    HomePage
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class HomePage extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped>
#home-page {
  width: 100vw;
}
</style>
