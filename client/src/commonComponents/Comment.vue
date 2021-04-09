<template>
  <v-btn text icon>
    {{ comment }}
    <v-icon>
      mdi-comment-minus-outline
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Comment extends Vue {
  @Prop({ default: null }) private value!: string;

  get comment() {
    return this.value;
  }
}
</script>

<style lang="scss" scoped></style>
