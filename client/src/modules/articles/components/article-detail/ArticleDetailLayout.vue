<template>
  <v-card class="article-detail-content">
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="description"></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name="image"></slot>
      <slot></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="like"></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ArticleDetailLayout extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped>
.article-detail-conent {
  //   height: 100vh;
}
</style>
