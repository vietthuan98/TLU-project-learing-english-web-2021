<template>
  <div class="not-found-page">
    <div>
      <h1 class="mb-10">404 Not found</h1>
      <v-btn link to="/home" text>Go back home</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class NotFoundPage extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped>
.not-found-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
