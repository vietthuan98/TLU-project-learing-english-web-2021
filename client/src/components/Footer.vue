<template>
  <v-footer padless app>
    <v-card class="flex" flat tile>
      <v-card-title class="py-0 caption">
        Get connected with us on social networks!
        <v-spacer></v-spacer>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="18">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-0 pb-1 caption text-center">
        {{ new Date().getFullYear() }} — <strong>DO AN CUOI NAM</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Footer extends Vue {
  @Prop({ default: null }) private value!: string;
  icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
}
</script>

<style lang="scss" scoped></style>
