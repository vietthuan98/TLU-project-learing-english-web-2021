<template>
  <v-progress-linear :value="value" height="25">
    <strong>{{ current + 1 }}/{{ total }}</strong>
  </v-progress-linear>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ExamProgress extends Vue {
  @Prop({ required: true }) private total!: number;
  @Prop({ required: true }) private current!: number;

  get value() {
    return ((this.current + 1) / this.total) * 100;
  }
}
</script>

<style lang="scss" scoped>
.exam-progress {
}
</style>
