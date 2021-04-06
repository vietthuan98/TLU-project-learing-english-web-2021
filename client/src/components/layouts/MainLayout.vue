<template>
  <v-main class="main-layout">
    <AppBar />
    <router-view />
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppBar from "../AppBar.vue";

@Component({
  components: {
    AppBar,
  },
})
export default class AuthLayout extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped></style>
