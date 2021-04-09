<template>
  <v-btn text icon>
    {{ like }}
    <v-icon color="pink">
      mdi-cards-heart
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Heart extends Vue {
  @Prop({ default: null }) private value!: string;

  get like() {
    return this.value;
  }
}
</script>

<style lang="scss" scoped></style>
