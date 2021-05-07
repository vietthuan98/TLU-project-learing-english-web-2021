<template>
  <p>ExamListPage</p>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ExamListPage extends Vue {
  @Prop({ default: null }) private value!: string;
}
</script>

<style lang="scss" scoped></style>
