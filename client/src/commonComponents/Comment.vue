<template>
  <v-btn text icon>
    <v-icon>
      mdi-comment-minus-outline
    </v-icon>
    <span class="ml-1">{{ comment }}</span>
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
