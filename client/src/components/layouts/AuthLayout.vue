<template>
  <v-main class="auth-layout">
    <router-view />
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class AuthLayout extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped></style>
