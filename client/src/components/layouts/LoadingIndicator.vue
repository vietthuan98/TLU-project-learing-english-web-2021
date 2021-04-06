<template>
  <v-progress-linear
    indeterminate
    top
    color="cyan"
    class="progress"
  ></v-progress-linear>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class LoadingIndicator extends Vue {
  //
}
</script>

<style lang="scss" scoped>
.progress {
  position: fixed;
}
</style>
