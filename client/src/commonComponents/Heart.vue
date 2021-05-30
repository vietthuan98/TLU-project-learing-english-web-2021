<template>
  <v-btn text icon>
    <v-icon color="primary">
      mdi-thumb-up
    </v-icon>
    <span class="ml-1">{{ like }}</span>
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
