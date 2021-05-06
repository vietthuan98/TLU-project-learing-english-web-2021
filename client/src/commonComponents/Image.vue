<template>
  <v-img
    :src="src"
    :lazy-src="lazySrc"
    :height="height"
    :maxHeight="maxHeight"
    :aspectRatio="aspectRatio"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Image extends Vue {
  @Prop({ default: "" }) src!: string;
  @Prop({ default: null }) height!: string;
  @Prop({ default: null }) maxHeight!: string;
  @Prop({ default: "" }) lazySrc!: string;
  @Prop({ default: false }) aspectRatio!: boolean;
}
</script>

<style lang="scss" scoped></style>
