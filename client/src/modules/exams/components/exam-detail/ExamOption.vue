<template>
  <v-card class="d-flex ma-4 mb-0 option">
    <div class="pa-3 option__answer">{{ answer }}</div>
    <div class="pa-3 option__text">{{ text }}</div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ANSWERS } from "../../constants";

@Component({})
export default class ExamOption extends Vue {
  @Prop({ default: null }) private value!: string;
  @Prop({ default: 0 }) private index!: number;
  @Prop({ default: "" }) text!: string;

  get answer() {
    return ANSWERS[this.index];
  }
}
</script>

<style lang="scss" scoped>
.option {
  background: whitesmoke;
  cursor: pointer;
  &__answer {
    font-weight: 700;
  }

  &__text {
    //
  }
  &:hover {
    background: whitesmoke;
  }
}
</style>
